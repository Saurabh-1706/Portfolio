"""
Admin routes — protected CRUD endpoints for managing portfolio content.
In production, these should be behind Clerk JWT verification.
"""
import logging
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, delete

from app.core.database import get_db
from app.models.project import Project
from app.schemas import ProjectCreate, ProjectUpdate, ProjectResponse

logger = logging.getLogger(__name__)
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


# ──────────────────────────────────────────────
# Reindex (Phase 2)
# ──────────────────────────────────────────────

@router.post("/reindex")
async def trigger_reindex(db: AsyncSession = Depends(get_db)):
    """
    Trigger a full incremental reindex of all published, un-indexed content
    into ChromaDB. Returns a summary of how many rows were processed.

    In production this endpoint must be protected by Clerk admin auth.
    """
    try:
        from app.ingestion.reindex import run_reindex
        summary = await run_reindex(db)
        return {
            "reindexed": summary.reindexed,
            "skipped": summary.skipped,
            "errors": summary.errors,
        }
    except Exception as exc:
        logger.error("Reindex failed: %s", exc, exc_info=True)
        raise HTTPException(status_code=500, detail=f"Reindex failed: {exc}")


# ──────────────────────────────────────────────
# GitHub Sync (Phase 2)
# ──────────────────────────────────────────────

@router.post("/github/sync")
async def trigger_github_sync(db: AsyncSession = Depends(get_db)):
    """
    Manually trigger a sync of GitHub repositories and contribution days
    from the GitHub GraphQL API, updates PostgreSQL, and refreshes the Redis cache.
    """
    try:
        from app.github.sync import run_github_sync
        result = await run_github_sync(db)
        return {
            "status": "success",
            "details": result
        }
    except Exception as exc:
        logger.error("GitHub sync failed: %s", exc, exc_info=True)
        raise HTTPException(status_code=500, detail=f"GitHub sync failed: {exc}")

