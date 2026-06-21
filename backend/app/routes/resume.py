from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.resume_entry import ResumeEntry
from app.schemas import ResumeEntryResponse

router = APIRouter(prefix="/resume", tags=["resume"])


@router.get("", response_model=list[ResumeEntryResponse])
async def list_resume_entries(db: AsyncSession = Depends(get_db)):
    """List all published resume entries sorted by sort_order and start_date descending."""
    query = (
        select(ResumeEntry)
        .where(ResumeEntry.is_published == True)
        .order_by(ResumeEntry.sort_order, ResumeEntry.start_date.desc())
    )
    result = await db.execute(query)
    entries = result.scalars().all()
    return entries
