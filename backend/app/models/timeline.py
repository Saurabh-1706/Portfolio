"""
Timeline model — matches the timeline table from the blueprint.
"""
import uuid
from sqlalchemy import String, Text, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class TimelineEntry(Base):
    __tablename__ = "timeline"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    type: Mapped[str | None] = mapped_column(String(50), nullable=True)  # 'work', 'project', 'learning', 'achievement'
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
