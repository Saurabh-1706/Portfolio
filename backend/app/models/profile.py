"""
Profile model — singleton "about me" row.

The admin panel should enforce there is only ever one row:
  - upsert on a known fixed UUID, or
  - check count(*) before allowing inserts.

Both summary and looking_for are chunked during ingestion.
"""
import uuid
from datetime import datetime

from sqlalchemy import DateTime, Text, func
from sqlalchemy.dialects.postgresql import ARRAY, UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base
from app.models.mixins import ContentMixin


class Profile(ContentMixin, Base):
    """Singleton row that represents 'about me' for the chatbot."""

    __tablename__ = "profile"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    full_name: Mapped[str] = mapped_column(Text, nullable=False)
    headline: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )  # short tagline — embedded as single chunk
    summary: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )  # long bio — gets chunked
    looking_for: Mapped[str | None] = mapped_column(
        Text, nullable=True
    )  # what kind of role — gets chunked
    skills: Mapped[list[str] | None] = mapped_column(
        ARRAY(Text), nullable=True
    )  # flat list of skill strings
    email: Mapped[str | None] = mapped_column(Text, nullable=True)
    github_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    linkedin_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
