"""
Admin routes — protected CRUD endpoints for managing portfolio content.
In production, these should be behind Clerk JWT verification.
"""
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.database import get_db
from app.models.project import Project
from app.schemas import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter(prefix="/admin", tags=["admin"])


# ──────────────────────────────────────────────
# Project CRUD
# ──────────────────────────────────────────────

@router.post("/projects", response_model=ProjectResponse, status_code=201)
async def create_project(
    project_data: ProjectCreate,
    db: AsyncSession = Depends(get_db),
):
    """Create a new project."""
    # Check for duplicate slug
    existing = await db.execute(
        select(Project).where(Project.slug == project_data.slug)
    )
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Project with this slug already exists")

    project = Project(**project_data.model_dump())
    db.add(project)
    await db.flush()
    await db.refresh(project)
    return project


@router.put("/projects/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: uuid.UUID,
    project_data: ProjectUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update an existing project."""
    result = await db.execute(
        select(Project).where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    update_dict = project_data.model_dump(exclude_unset=True)
    for key, value in update_dict.items():
        setattr(project, key, value)

    await db.flush()
    await db.refresh(project)
    return project


@router.delete("/projects/{project_id}", status_code=204)
async def delete_project(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """Delete a project by ID."""
    result = await db.execute(
        select(Project).where(Project.id == project_id)
    )
    project = result.scalar_one_or_none()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    await db.delete(project)
