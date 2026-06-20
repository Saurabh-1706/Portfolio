"""
OpenAI embedder for the ingestion pipeline.

Uses text-embedding-3-small — cheap, fast, high quality for a
knowledge base of this size. Batches all chunks in a single API call.
"""
from openai import AsyncOpenAI

from app.core.config import get_settings

settings = get_settings()

EMBEDDING_MODEL = "text-embedding-3-small"

_client: AsyncOpenAI | None = None


def _get_client() -> AsyncOpenAI:
    global _client
    if _client is None:
        _client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    return _client


async def embed_texts(texts: list[str]) -> list[list[float]]:
    """
    Embed a batch of strings in a single OpenAI API call.

    Returns a list of float vectors in the same order as *texts*.
    Raises openai.OpenAIError on API failures — callers should handle.
    """
    if not texts:
        return []

    client = _get_client()
    response = await client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=texts,
    )
    # response.data is sorted by index
    return [item.embedding for item in sorted(response.data, key=lambda x: x.index)]


async def embed_single(text: str) -> list[float]:
    """Convenience wrapper for embedding one string (e.g. a query)."""
    results = await embed_texts([text])
    return results[0]
