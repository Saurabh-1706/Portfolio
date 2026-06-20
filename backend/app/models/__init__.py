# Models package — import every model so Alembic's autogenerate can see them.
from app.models.project import Project
from app.models.blog import Blog
from app.models.skill import Skill
from app.models.timeline import TimelineEntry
from app.models.analytics import Analytics

# Chatbot data layer (Phase 1)
from app.models.resume_entry import ResumeEntry
from app.models.profile import Profile
from app.models.chat_log import ChatLog

__all__ = [
    "Project",
    "Blog",
    "Skill",
    "TimelineEntry",
    "Analytics",
    "ResumeEntry",
    "Profile",
    "ChatLog",
]
