"""
ResumeEntry model — work experience, education, certifications, achievements.
Each row can be chunked and embedded into ChromaDB for RAG retrieval.
"""
import enum
import uuid
from datetime import date, datetime

from sqlalchemy import Date, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import ContentMixin


class EntryType(str, enum.Enum):
    work = "work"
    education = "education"
    certification = "certification"
    achievement = "achievement"


class ResumeEntry(ContentMixin, Base):
    """One line/block on the resume."""

    __tablename__ = "resume_entries"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    entry_type: Mapped[str] = mapped_column(
        String(20), nullable=False, default=EntryType.work
    )
    title: Mapped[str] = mapped_column(Text, nullable=False)
    organization: Mapped[str | None] = mapped_column(Text, nullable=True)
    location: Mapped[str | None] = mapped_column(Text, nullable=True)
    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    end_date: Mapped[date | None] = mapped_column(
        Date, nullable=True
    )  # NULL means "present"
    description: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )  # bullet points / long text — this is what gets chunked
    sort_order: Mapped[int] = mapped_column(default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
