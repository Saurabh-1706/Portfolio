"""
Admin chat log routes — paginated view + feedback endpoint.
These endpoints let you review recent chatbot exchanges from the admin panel.
"""
import logging
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select, update, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.chat_log import ChatLog

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin/chatlogs", tags=["admin-chatlogs"])


class ChatLogResponse(BaseModel):
    id: uuid.UUID
    conversation_id: str
    question: str
    answer: str
    sources: Optional[list[str]]
    feedback_positive: Optional[bool]
    created_at: str

    model_config = {"from_attributes": True}


class FeedbackRequest(BaseModel):
    positive: bool


@router.get("")
async def list_chatlogs(
    page: int = 1,
    per_page: int = 20,
    db: AsyncSession = Depends(get_db),
):
    """
    Paginated list of all chat exchanges, newest first.
    Used by the admin /admin/chatlogs page.
    """
    offset = (page - 1) * per_page

    total_result = await db.execute(select(func.count()).select_from(ChatLog))
    total = total_result.scalar_one()

    logs_result = await db.execute(
        select(ChatLog)
        .order_by(ChatLog.created_at.desc())
        .offset(offset)
        .limit(per_page)
    )
    logs = logs_result.scalars().all()

    return {
        "total": total,
        "page": page,
        "per_page": per_page,
        "pages": (total + per_page - 1) // per_page,
        "items": [
            {
                "id": str(log.id),
                "conversation_id": log.conversation_id,
                "question": log.question,
                "answer": log.answer,
                "sources": log.sources,
                "feedback_positive": log.feedback_positive,
                "created_at": log.created_at.isoformat(),
            }
            for log in logs
        ],
    }


@router.patch("/{log_id}/feedback")
async def update_feedback(
    log_id: uuid.UUID,
    body: FeedbackRequest,
    db: AsyncSession = Depends(get_db),
):
    """Record thumbs up/down feedback for a chatbot answer."""
    result = await db.execute(select(ChatLog).where(ChatLog.id == log_id))
    log = result.scalar_one_or_none()
    if not log:
        raise HTTPException(status_code=404, detail="Chat log not found")

    await db.execute(
        update(ChatLog)
        .where(ChatLog.id == log_id)
        .values(feedback_positive=body.positive)
    )
    await db.commit()
    return {"ok": True}
