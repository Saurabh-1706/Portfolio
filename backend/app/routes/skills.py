from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.skill import Skill
from app.schemas import SkillResponse

router = APIRouter(prefix="/skills", tags=["skills"])


@router.get("", response_model=list[SkillResponse])
async def list_skills(db: AsyncSession = Depends(get_db)):
    """List all skills, ordered by category and sort_order."""
    query = select(Skill).order_by(Skill.category, Skill.sort_order, Skill.name)
    result = await db.execute(query)
    skills = result.scalars().all()
    return skills
