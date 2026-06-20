"""
POST /chat — Server-Sent Events streaming endpoint.

Flow:
  1. Rate-limit check (by IP).
  2. Run RAG pipeline (retrieve → grade → generate) via graph.stream_answer.
  3. Stream tokens to client as SSE.
  4. After stream completes, write one row to chat_logs.
"""
import json
import logging
import uuid

from fastapi import APIRouter, Depends, Request
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession

from app.chat.rate_limit import check_rate_limit, get_rate_limit_key
from app.core.database import get_db
from app.models.chat_log import ChatLog

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/chat", tags=["chat"])


# ─── request schema ───────────────────────────────────────────────────────────


class ChatRequest(BaseModel):
    message: str
    conversation_id: str = ""   # frontend generates UUID on first load


# ─── SSE helpers ──────────────────────────────────────────────────────────────


def _sse_line(data: str) -> str:
    """Format a single SSE data line."""
    return f"data: {data}\n\n"


def _sse_done() -> str:
    return "data: [DONE]\n\n"


# ─── endpoint ─────────────────────────────────────────────────────────────────


@router.post("")
async def chat_endpoint(
    body: ChatRequest,
    request: Request,
    db: AsyncSession = Depends(get_db),
):
    """
    Stream a RAG-grounded answer to the visitor's question.

    Returns a Server-Sent Events stream.
    Each event is a plain text token.
    The last meaningful event before [DONE] is a [SOURCES] JSON array.
    """
    # Assign a conversation_id if the frontend didn't send one
    conversation_id = body.conversation_id or str(uuid.uuid4())

    # Rate limit before doing any expensive work
    key = get_rate_limit_key(request, conversation_id)
    check_rate_limit(key)

    async def event_stream():
        from app.chat.graph import stream_answer

        full_answer_parts: list[str] = []
        sources: list[str] = []

        try:
            async for token in stream_answer(body.message):
                if token.startswith("\n[SOURCES]"):
                    # Parse out sources — this is the sentinel token
                    try:
                        raw = token.replace("\n[SOURCES]", "")
                        sources.extend(json.loads(raw))
                    except Exception:
                        pass
                    continue

                full_answer_parts.append(token)
                yield _sse_line(token)

        except Exception as exc:
            logger.error("Stream error: %s", exc, exc_info=True)
            yield _sse_line("[ERROR] Something went wrong. Please try again.")
        finally:
            yield _sse_done()

            # Write to chat_logs after stream completes
            full_answer = "".join(full_answer_parts)
            try:
                log_entry = ChatLog(
                    conversation_id=conversation_id,
                    question=body.message,
                    answer=full_answer,
                    sources=sources or None,
                )
                db.add(log_entry)
                await db.commit()
            except Exception as log_exc:
                logger.error("Failed to write chat_log: %s", log_exc)

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # disable nginx buffering
        },
    )
