"""
Pydantic schemas for request/response validation.
"""
import uuid
from datetime import datetime
from pydantic import BaseModel, Field


# ──────────────────────────────────────────────
# Project Schemas
# ──────────────────────────────────────────────

class ProjectBase(BaseModel):
    title: str
    slug: str
    short_desc: str | None = None
    full_desc: str | None = None
    tech_stack: list[str] | None = None
    category: str | None = None
    github_url: str | None = None
    live_demo_url: str | None = None
    image_url: str | None = None
    video_url: str | None = None
    featured: bool = False
    architecture_diagram: str | None = None
    challenges: str | None = None
    lessons_learned: str | None = None
    metrics: dict | None = None
    status: str = "completed"
    sort_order: int = 0


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    title: str | None = None
    slug: str | None = None
    short_desc: str | None = None
    full_desc: str | None = None
    tech_stack: list[str] | None = None
    category: str | None = None
    github_url: str | None = None
    live_demo_url: str | None = None
    image_url: str | None = None
    video_url: str | None = None
    featured: bool | None = None
    architecture_diagram: str | None = None
    challenges: str | None = None
    lessons_learned: str | None = None
    metrics: dict | None = None
    status: str | None = None
    sort_order: int | None = None


class ProjectResponse(ProjectBase):
    id: uuid.UUID
    github_stars: int = 0
    github_languages: dict | None = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ──────────────────────────────────────────────
# Blog Schemas
# ──────────────────────────────────────────────

class BlogBase(BaseModel):
    title: str
    slug: str
    summary: str | None = None
    content: str | None = None
    tags: list[str] | None = None
    cover_image: str | None = None
    published: bool = False
    read_time: int | None = None


class BlogCreate(BlogBase):
    pass


class BlogResponse(BlogBase):
    id: uuid.UUID
    views: int = 0
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


# ──────────────────────────────────────────────
# Skill Schemas
# ──────────────────────────────────────────────

class SkillBase(BaseModel):
    name: str
    category: str | None = None
    proficiency: int | None = Field(None, ge=1, le=5)
    icon_url: str | None = None
    sort_order: int = 0


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    id: uuid.UUID

    model_config = {"from_attributes": True}


# ──────────────────────────────────────────────
# Timeline Schemas
# ──────────────────────────────────────────────

class TimelineBase(BaseModel):
    year: int
    title: str
    description: str | None = None
    type: str | None = None
    sort_order: int = 0


class TimelineCreate(TimelineBase):
    pass


class TimelineResponse(TimelineBase):
    id: uuid.UUID

    model_config = {"from_attributes": True}


# ──────────────────────────────────────────────
# Resume Entry & Profile Schemas
# ──────────────────────────────────────────────
from datetime import date

class ResumeEntryResponse(BaseModel):
    id: uuid.UUID
    entry_type: str
    title: str
    organization: str | None = None
    location: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    description: str | None = None
    sort_order: int = 0
    created_at: datetime

    model_config = {"from_attributes": True}


class ProfileResponse(BaseModel):
    id: uuid.UUID
    full_name: str
    headline: str | None = None
    summary: str | None = None
    looking_for: str | None = None
    skills: list[str] | None = None
    email: str | None = None
    github_url: str | None = None
    linkedin_url: str | None = None
    created_at: datetime

    model_config = {"from_attributes": True}

