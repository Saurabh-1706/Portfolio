"""
ContentMixin — shared fields for every table that feeds the chatbot.

  is_published : draft content is hidden from public API and the
                 ingestion pipeline until you flip this to True.
  updated_at   : lets the reindex job do incremental updates instead
                 of re-embedding everything on every run.
  is_indexed   : flipped to True after a row's chunks are in ChromaDB;
                 automatically reset to False on any edit (onupdate).
"""
from datetime import datetime

from sqlalchemy import Boolean, DateTime, func
from sqlalchemy.orm import Mapped, mapped_column


class ContentMixin:
    """Add publish / index tracking to any SQLAlchemy model."""

    is_published: Mapped[bool] = mapped_column(
        Boolean, default=True, nullable=False
    )
    is_indexed: Mapped[bool] = mapped_column(
        Boolean, default=False, nullable=False
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )
