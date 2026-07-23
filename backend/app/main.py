"""
FastAPI application entry point.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routes import projects, admin, admin_chatlogs, github, skills, resume, blogs
from app.routers import chat

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application startup and shutdown events."""
    # Startup
    print(f"[START] {settings.APP_NAME} v{settings.APP_VERSION} starting...")
    try:
        from app.github.scheduler import start_scheduler
        start_scheduler()
    except Exception as e:
        print(f"Failed to start GitHub sync scheduler: {e}")
        
    yield
    
    # Shutdown
    print(f"[STOP] {settings.APP_NAME} shutting down...")
    try:
        from app.github.scheduler import shutdown_scheduler
        shutdown_scheduler()
    except Exception as e:
        print(f"Failed to stop GitHub sync scheduler: {e}")


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="AI-powered developer portfolio backend API",
    lifespan=lifespan,
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(projects.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(admin_chatlogs.router, prefix="/api")  # Phase 5: /api/admin/chatlogs
app.include_router(chat.router, prefix="/api")  # Phase 3: /api/chat
app.include_router(github.router, prefix="/api")  # GitHub stats
app.include_router(skills.router, prefix="/api")
app.include_router(resume.router, prefix="/api")
app.include_router(blogs.router, prefix="/api")




@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }


@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.APP_VERSION,
        "docs": "/docs",
    }
