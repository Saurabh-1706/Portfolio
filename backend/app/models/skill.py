"""
Skill model — matches the skills table from the blueprint.
"""
import uuid
from sqlalchemy import String, Text, Integer, CheckConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Skill(Base):
    __tablename__ = "skills"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    name: Mapped[str] = mapped_column(Text, nullable=False)
    category: Mapped[str | None] = mapped_column(String(50), nullable=True)  # 'AI', 'backend', 'frontend', 'cloud'
    proficiency: Mapped[int | None] = mapped_column(Integer, nullable=True)
    icon_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)

    __table_args__ = (
        CheckConstraint("proficiency BETWEEN 1 AND 5", name="check_proficiency_range"),
    )
