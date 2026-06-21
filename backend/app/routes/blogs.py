from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.blog import Blog
from app.schemas import BlogResponse

router = APIRouter(prefix="/blogs", tags=["blogs"])


@router.get("", response_model=list[BlogResponse])
async def list_blogs(db: AsyncSession = Depends(get_db)):
    """List all published blogs, sorted by created_at descending."""
    query = (
        select(Blog)
        .where(Blog.published == True)
        .order_by(Blog.created_at.desc())
    )
    result = await db.execute(query)
    blogs = result.scalars().all()
    return blogs
