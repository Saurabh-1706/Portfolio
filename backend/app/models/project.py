"""
Project model — matches the projects table from the blueprint.
Uses ContentMixin to participate in the chatbot ingestion pipeline.
"""
import uuid
from datetime import datetime
from sqlalchemy import String, Text, Boolean, Integer, DateTime, func
from sqlalchemy.dialects.postgresql import UUID, ARRAY, JSONB
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import ContentMixin


class Project(ContentMixin, Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    title: Mapped[str] = mapped_column(Text, nullable=False)
    slug: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    short_desc: Mapped[str | None] = mapped_column(Text, nullable=True)
    full_desc: Mapped[str | None] = mapped_column(Text, nullable=True)
    tech_stack: Mapped[list[str] | None] = mapped_column(ARRAY(Text), nullable=True)
    category: Mapped[str | None] = mapped_column(String(50), nullable=True)
    github_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    live_demo_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    video_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    featured: Mapped[bool] = mapped_column(Boolean, default=False)
    github_stars: Mapped[int] = mapped_column(Integer, default=0)
    github_languages: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    architecture_diagram: Mapped[str | None] = mapped_column(Text, nullable=True)
    challenges: Mapped[str | None] = mapped_column(Text, nullable=True)
    lessons_learned: Mapped[str | None] = mapped_column(Text, nullable=True)
    metrics: Mapped[dict | None] = mapped_column(JSONB, nullable=True)
    status: Mapped[str] = mapped_column(String(20), default="completed")
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )

