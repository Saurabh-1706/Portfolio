import json
import logging
from datetime import date, datetime
import redis.asyncio as aioredis
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.config import get_settings
from app.core.database import get_db
from app.github.sync import REDIS_KEY, compute_streak
from app.models.github_repo import RepoStats
from app.models.github_contribution import ContributionDay

logger = logging.getLogger(__name__)
settings = get_settings()

router = APIRouter(prefix="/github", tags=["github"])

@router.get("/stats")
async def get_github_stats(db: AsyncSession = Depends(get_db)):
    """
    Get aggregated GitHub activity statistics.
    Reads from Redis cache first; falls back to on-the-fly database aggregation on cache miss.
    """
    # 1. Try Redis Cache
    try:
        async with aioredis.from_url(settings.REDIS_URL) as redis_client:
            cached_val = await redis_client.get(REDIS_KEY)
        if cached_val:
            logger.info("GitHub stats: cache hit")
            return json.loads(cached_val.decode("utf-8"))
    except Exception as e:
        logger.error(f"Redis error in get_github_stats: {e}")

    # 2. Cache Miss: Fall back to PostgreSQL aggregation
    logger.info("GitHub stats: cache miss, performing database aggregation fallback")
    
    # Query featured repositories
    repos_query = await db.execute(
        select(RepoStats)
        .where(
            RepoStats.is_featured == True,
            RepoStats.is_private == False
        )
        .order_by(RepoStats.stars.desc())
    )
    featured_repos = repos_query.scalars().all()
    total_stars = sum(r.stars for r in featured_repos)
    repo_count = len(featured_repos)

    # Query contribution days
    contribs_query = await db.execute(
        select(ContributionDay)
        .order_by(ContributionDay.day.asc())
    )
    contrib_days = contribs_query.scalars().all()
    total_commits = sum(d.commit_count for d in contrib_days)
    
    # Calculate top languages
    lang_totals = {}
    for r in featured_repos:
        if r.is_fork:
            continue
        if r.languages:
            for l_name, l_bytes in r.languages.items():
                lang_totals[l_name] = lang_totals.get(l_name, 0) + l_bytes
                
    total_bytes = sum(lang_totals.values())
    top_languages = []
    if total_bytes > 0:
        sorted_langs = sorted(lang_totals.items(), key=lambda x: x[1], reverse=True)
        top_languages = [
            {"name": l_name, "percent": round((l_bytes / total_bytes) * 100, 1)}
            for l_name, l_bytes in sorted_langs[:5]
        ]

    # Format contribution days data for streak calculation
    calendar_data = [
        {
            "day": d.day,
            "commit_count": d.commit_count,
            "intensity_level": d.intensity_level
        }
        for d in contrib_days
    ]
    streak_val = compute_streak(calendar_data)

    # Build response payload
    frontend_repos = [
        {
            "name": r.name,
            "full_name": r.full_name,
            "description": r.description,
            "url": r.url,
            "primary_language": r.primary_language,
            "stars": r.stars,
            "forks": r.forks,
            "pushed_at": r.pushed_at.isoformat() if r.pushed_at else None
        }
        for r in featured_repos
    ]
    
    frontend_cal = [
        {
            "day": d["day"].isoformat(),
            "commit_count": d["commit_count"],
            "intensity_level": d["intensity_level"]
        }
        for d in calendar_data
    ]

    # Use actual last_synced_at from Postgres rows (not datetime.now — that would be misleading)
    last_synced = max(
        (r.last_synced_at for r in featured_repos if r.last_synced_at is not None),
        default=None
    )

    payload = {
        "summary": {
            "total_stars": total_stars,
            "total_repos": repo_count,
            "total_commits_12mo": total_commits,
            "current_streak_days": streak_val,
            "top_languages": top_languages
        },
        "contribution_calendar": frontend_cal,
        "repos": frontend_repos,
        "last_synced_at": last_synced.isoformat() if last_synced else None
    }
    
    return payload
