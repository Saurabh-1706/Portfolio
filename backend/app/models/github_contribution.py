from datetime import date
from sqlalchemy import Date, Integer
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base

class ContributionDay(Base):
    """Stores daily GitHub contribution metrics (commits and intensity levels)."""

    __tablename__ = "contribution_days"

    day: Mapped[date] = mapped_column(Date, primary_key=True)
    commit_count: Mapped[int] = mapped_column(Integer, default=0, nullable=False)
    intensity_level: Mapped[int] = mapped_column(Integer, default=0, nullable=False)  # 0 to 4
