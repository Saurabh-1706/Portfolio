"""
LangGraph RAG pipeline: retrieve → grade → generate.

Three nodes in sequence:
  1. retrieve  — embed question, similarity search ChromaDB (top-k=5)
  2. grade     — check cosine similarity threshold (0.75); use LLM grade
                 as secondary check for borderline cases
  3. generate  — GPT-4o-mini streaming completion grounded in context
                 OR honest fallback if grading failed

State flows through a TypedDict so each node reads/writes cleanly.
"""
import logging
from typing import AsyncIterator, TypedDict

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langgraph.graph import END, StateGraph

from app.chat.prompts import FALLBACK_PROMPT, GRADE_PROMPT, SYSTEM_PROMPT
from app.core.config import get_settings
from app.vectorstore import get_collection

logger = logging.getLogger(__name__)
settings = get_settings()

# ─── constants ────────────────────────────────────────────────────────────────

TOP_K = 5
SIMILARITY_THRESHOLD = 0.75   # cosine similarity (1 = identical, 0 = orthogonal)
GENERATION_MODEL = "gpt-4o-mini"
EMBEDDING_MODEL = "text-embedding-3-small"

# ─── state ────────────────────────────────────────────────────────────────────


class ChatState(TypedDict):
    question: str
    chunks: list[str]            # retrieved document texts
    metadatas: list[dict]        # ChromaDB metadata per chunk
    distances: list[float]       # cosine distances (0=identical, 2=opposite)
    relevant: bool               # result of grading
    answer: str                  # final generated answer
    sources: list[str]           # human-readable source labels for citation


# ─── helpers ──────────────────────────────────────────────────────────────────

_embeddings: OpenAIEmbeddings | None = None
_llm: ChatOpenAI | None = None


def _get_embeddings() -> OpenAIEmbeddings:
    global _embeddings
    if _embeddings is None:
        _embeddings = OpenAIEmbeddings(
            model=EMBEDDING_MODEL,
            openai_api_key=settings.OPENAI_API_KEY,
        )
    return _embeddings


def _get_llm(streaming: bool = False) -> ChatOpenAI:
    return ChatOpenAI(
        model=GENERATION_MODEL,
        openai_api_key=settings.OPENAI_API_KEY,
        streaming=streaming,
        temperature=0.3,
    )


def _distance_to_similarity(distance: float) -> float:
    """Convert ChromaDB cosine distance (0–2) to similarity (0–1)."""
    return 1.0 - (distance / 2.0)


def _build_context(chunks: list[str], metadatas: list[dict]) -> str:
    parts = []
    for i, (chunk, meta) in enumerate(zip(chunks, metadatas)):
        title = meta.get("title", "Unknown")
        source_type = meta.get("source_type", "")
        parts.append(f"[{i+1}] ({source_type}) {title}\n{chunk}")
    return "\n\n---\n\n".join(parts)


def _extract_sources(metadatas: list[dict]) -> list[str]:
    seen = set()
    sources = []
    for meta in metadatas:
        label = f"{meta.get('title', 'Unknown')} ({meta.get('source_type', '')})"
        if label not in seen:
            seen.add(label)
            sources.append(label)
    return sources


# ─── nodes ────────────────────────────────────────────────────────────────────

async def retrieve_node(state: ChatState) -> ChatState:
    """Embed the question and retrieve top-k chunks from ChromaDB.

    If ChromaDB is unreachable, returns empty context immediately so the
    pipeline falls through to the LLM fallback without a long TCP hang.
    """
    question = state["question"]

    try:
        embeddings_model = _get_embeddings()
        query_embedding = await embeddings_model.aembed_query(question)

        collection = get_collection()
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=TOP_K,
            include=["documents", "metadatas", "distances"],
        )

        chunks = results["documents"][0] if results["documents"] else []
        metadatas = results["metadatas"][0] if results["metadatas"] else []
        distances = results["distances"][0] if results["distances"] else []

    except Exception as e:
        # ChromaDB is down or unreachable — skip retrieval, go to fallback
        logger.warning("ChromaDB unavailable — skipping retrieval: %s", e)
        chunks, metadatas, distances = [], [], []

    return {
        **state,
        "chunks": chunks,
        "metadatas": metadatas,
        "distances": distances,
    }


async def grade_node(state: ChatState) -> ChatState:
    """
    Decide if retrieved chunks are relevant enough to answer the question.

    Step 1: cosine similarity threshold.
    Step 2 (if borderline): cheap LLM grade.
    """
    if not state["chunks"]:
        return {**state, "relevant": False}

    best_distance = min(state["distances"])
    best_similarity = _distance_to_similarity(best_distance)

    if best_similarity >= SIMILARITY_THRESHOLD:
        return {**state, "relevant": True}

    # Borderline — ask the LLM
    context_preview = state["chunks"][0][:500]
    grade_prompt = GRADE_PROMPT.format(
        question=state["question"],
        context=context_preview,
    )
    llm = _get_llm(streaming=False)
    response = await llm.ainvoke(grade_prompt)
    verdict = response.content.strip().lower()
    relevant = "relevant" in verdict and "irrelevant" not in verdict

    logger.debug(
        "Grade: similarity=%.3f llm_verdict=%s relevant=%s",
        best_similarity, verdict, relevant,
    )
    return {**state, "relevant": relevant}


async def generate_node(state: ChatState) -> ChatState:
    """Generate a grounded answer using the retrieved context."""
    llm = _get_llm(streaming=False)

    if not state["relevant"]:
        # Honest fallback
        prompt = FALLBACK_PROMPT.format(question=state["question"])
        response = await llm.ainvoke(prompt)
        return {
            **state,
            "answer": response.content,
            "sources": [],
        }

    context = _build_context(state["chunks"], state["metadatas"])
    sources = _extract_sources(state["metadatas"])
    system = SYSTEM_PROMPT.format(context=context)

    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": state["question"]},
    ]
    response = await llm.ainvoke(messages)

    return {
        **state,
        "answer": response.content,
        "sources": sources,
    }


# ─── streaming variant ────────────────────────────────────────────────────────

async def stream_answer(question: str) -> AsyncIterator[str]:
    """
    Run the full RAG pipeline and yield answer tokens as they arrive.

    Yields plain text tokens. The caller (SSE endpoint) wraps them in
    Server-Sent Event format.

    Also yields a final sentinel JSON line with the sources list:
        data: [SOURCES] ["IntelliTrack (project)", ...]
    """
    # Run retrieve + grade synchronously first (they don't stream)
    state: ChatState = {
        "question": question,
        "chunks": [],
        "metadatas": [],
        "distances": [],
        "relevant": False,
        "answer": "",
        "sources": [],
    }

    try:
        state = await retrieve_node(state)
        state = await grade_node(state)
    except Exception as e:
        logger.warning("RAG pipeline error — falling back to LLM-only mode: %s", e)
        state = {**state, "chunks": [], "metadatas": [], "distances": [], "relevant": False}

    llm = _get_llm(streaming=True)

    if not state["relevant"]:
        prompt = FALLBACK_PROMPT.format(question=question)
        async for chunk in llm.astream(prompt):
            if chunk.content:
                yield chunk.content
        import json
        yield f"\n[SOURCES]{json.dumps([])}"
        return

    context = _build_context(state["chunks"], state["metadatas"])
    sources = _extract_sources(state["metadatas"])
    system = SYSTEM_PROMPT.format(context=context)
    messages = [
        {"role": "system", "content": system},
        {"role": "user", "content": question},
    ]

    full_answer = []
    async for chunk in llm.astream(messages):
        if chunk.content:
            yield chunk.content
            full_answer.append(chunk.content)

    import json
    yield f"\n[SOURCES]{json.dumps(sources)}"
