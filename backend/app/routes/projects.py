"""
Public project routes.
GET /projects — list all projects (filterable)
GET /projects/{slug} — single project detail
"""
from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.models.project import Project
from app.schemas import ProjectResponse

router = APIRouter(prefix="/projects", tags=["projects"])


@router.get("", response_model=list[ProjectResponse])
async def list_projects(
    category: str | None = Query(None, description="Filter by category (AI, fullstack, cloud, ml)"),
    featured: bool | None = Query(None, description="Filter featured projects only"),
    db: AsyncSession = Depends(get_db),
):
    """List all projects, optionally filtered by category or featured status."""
    query = select(Project).order_by(Project.sort_order, Project.created_at.desc())

    if category:
        query = query.where(Project.category == category)
    if featured is not None:
        query = query.where(Project.featured == featured)

    result = await db.execute(query)
    projects = result.scalars().all()
    return projects


@router.get("/{slug}", response_model=ProjectResponse)
async def get_project(
    slug: str,
    db: AsyncSession = Depends(get_db),
):
    """Get a single project by its slug."""
    result = await db.execute(
        select(Project).where(Project.slug == slug)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project
