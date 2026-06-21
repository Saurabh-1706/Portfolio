import json
import logging
from datetime import date, datetime, timezone
import dateutil.parser
import redis.asyncio as aioredis
from sqlalchemy.dialects.postgresql import insert as pg_insert
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func

from app.core.config import get_settings
from app.github.client import fetch_github_data
from app.models.github_repo import RepoStats
from app.models.github_contribution import ContributionDay

logger = logging.getLogger(__name__)
settings = get_settings()

REDIS_KEY = "github:dashboard:v1"
REDIS_TTL_SECONDS = 28800  # 8 hours

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        return super().default(obj)

def parse_iso_datetime(dt_str: str | None) -> datetime | None:
    if not dt_str:
        return None
    try:
        return dateutil.parser.isoparse(dt_str)
    except Exception as e:
        logger.error(f"Error parsing datetime {dt_str}: {e}")
        return None

def compute_streak(days: list[dict]) -> int:
    """
    Compute current contribution streak from daily logs.
    days is list of dicts, e.g. [{"day": date_obj, "commit_count": count}, ...]
    sorted by date descending.
    """
    if not days:
        return 0
        
    sorted_days = sorted(days, key=lambda x: x["day"], reverse=True)
    today = date.today()
    
    # Find start index
    start_idx = -1
    for i, d_item in enumerate(sorted_days):
        day_date = d_item["day"]
        commits = d_item["commit_count"]
        
        # If today has commits, start from today
        if day_date == today:
            if commits > 0:
                start_idx = i
                break
        # Else if yesterday has commits, start from yesterday
        elif (today - day_date).days == 1:
            if commits > 0:
                start_idx = i
                break
                
    if start_idx == -1:
        return 0
        
    streak = 0
    expected_date = sorted_days[start_idx]["day"]
    for i in range(start_idx, len(sorted_days)):
        d_item = sorted_days[i]
        day_date = d_item["day"]
        commits = d_item["commit_count"]
        
        # Check if consecutive and has commits
        if day_date == expected_date and commits > 0:
            streak += 1
            expected_date = day_date - date.resolution # subtract 1 day
        else:
            break
            
    return streak

async def run_github_sync(db: AsyncSession) -> dict:
    """
    Fetch GitHub statistics, write them to Postgres, aggregate them,
    and save them to Redis.
    """
    logger.info("Starting GitHub sync job...")
    
    # 1. Fetch raw data from GitHub
    user_data = await fetch_github_data()
    
    # 2. Process & Upsert Repositories
    repos_nodes = user_data.get("repositories", {}).get("nodes", [])
    synced_repos_count = 0
    for node in repos_nodes:
        repo_id = node.get("databaseId")
        if not repo_id:
            continue
            
        pushed_at = parse_iso_datetime(node.get("pushedAt"))
        created_at = parse_iso_datetime(node.get("createdAt"))
        
        # Aggregate languages
        languages_dict = {}
        for edge in node.get("languages", {}).get("edges", []):
            lang_name = edge.get("node", {}).get("name")
            lang_size = edge.get("size", 0)
            if lang_name:
                languages_dict[lang_name] = lang_size
                
        primary_lang = node.get("primaryLanguage", {})
        primary_lang_name = primary_lang.get("name") if primary_lang else None
        
        # pg_insert supports on_conflict_do_update upserts
        stmt = pg_insert(RepoStats).values(
            github_repo_id=repo_id,
            name=node.get("name"),
            full_name=node.get("nameWithOwner"),
            description=node.get("description"),
            url=node.get("url"),
            primary_language=primary_lang_name,
            languages=languages_dict,
            stars=node.get("stargazerCount", 0),
            forks=node.get("forkCount", 0),
            is_private=node.get("isPrivate", False),
            is_fork=node.get("isFork", False),
            is_featured=True, # default featured
            pushed_at=pushed_at,
            repo_created_at=created_at
        )
        
        stmt = stmt.on_conflict_do_update(
            index_elements=["github_repo_id"],
            set_={
                "name": stmt.excluded.name,
                "full_name": stmt.excluded.full_name,
                "description": stmt.excluded.description,
                "url": stmt.excluded.url,
                "primary_language": stmt.excluded.primary_language,
                "languages": stmt.excluded.languages,
                "stars": stmt.excluded.stars,
                "forks": stmt.excluded.forks,
                "is_private": stmt.excluded.is_private,
                "is_fork": stmt.excluded.is_fork,
                "pushed_at": stmt.excluded.pushed_at,
                "repo_created_at": stmt.excluded.repo_created_at,
                "last_synced_at": func.now()
            }
        )
        await db.execute(stmt)
        synced_repos_count += 1
        
    # 3. Process & Upsert Contribution Days
    cal = user_data.get("contributionsCollection", {}).get("contributionCalendar", {})
    total_commits = cal.get("totalContributions", 0)
    weeks = cal.get("weeks", [])
    
    level_map = {
        "NONE": 0,
        "FIRST_QUARTILE": 1,
        "SECOND_QUARTILE": 2,
        "THIRD_QUARTILE": 3,
        "FOURTH_QUARTILE": 4
    }
    
    contribution_days_data = []
    synced_days_count = 0
    
    for week in weeks:
        for day_node in week.get("contributionDays", []):
            day_str = day_node.get("date")
            if not day_str:
                continue
                
            try:
                day_val = date.fromisoformat(day_str)
            except ValueError:
                continue
                
            commits = day_node.get("contributionCount", 0)
            level_str = day_node.get("contributionLevel", "NONE")
            intensity = level_map.get(level_str, 0)
            
            contribution_days_data.append({
                "day": day_val,
                "commit_count": commits,
                "intensity_level": intensity
            })
            
            stmt = pg_insert(ContributionDay).values(
                day=day_val,
                commit_count=commits,
                intensity_level=intensity
            )
            stmt = stmt.on_conflict_do_update(
                index_elements=["day"],
                set_={
                    "commit_count": stmt.excluded.commit_count,
                    "intensity_level": stmt.excluded.intensity_level
                }
            )
            await db.execute(stmt)
            synced_days_count += 1
            
    await db.commit()
    logger.info(f"Durable Postgres sync complete: {synced_repos_count} repos, {synced_days_count} contribution days synced.")

    # 4. Generate Pre-Aggregated Front-End Payload
    # Query database to build aggregate statistics for Redis
    # Fetch all featured repos (public, non-forks by default)
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
    
    # Calculate top languages
    lang_totals = {}
    for r in featured_repos:
        if r.is_fork: # exclude forks from languages calculation
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

    # Contribution calendar stats
    streak_val = compute_streak(contribution_days_data)
    
    # Format repos list for frontend
    frontend_repos = [
        {
            "name": r.name,
            "full_name": r.full_name,
            "description": r.description,
            "url": r.url,
            "primary_language": r.primary_language,
            "stars": r.stars,
            "forks": r.forks,
            "pushed_at": r.pushed_at
        }
        for r in featured_repos
    ]
    
    # Format contribution days for frontend
    frontend_cal = [
        {
            "day": d["day"],
            "commit_count": d["commit_count"],
            "intensity_level": d["intensity_level"]
        }
        for d in sorted(contribution_days_data, key=lambda x: x["day"])
    ]

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
        "last_synced_at": datetime.now(timezone.utc)
    }

    # 5. Cache in Redis
    try:
        redis_client = aioredis.from_url(settings.REDIS_URL)
        payload_str = json.dumps(payload, cls=DateTimeEncoder)
        await redis_client.set(REDIS_KEY, payload_str, ex=REDIS_TTL_SECONDS)
        logger.info("Successfully updated pre-aggregated GitHub dashboard cache in Redis.")
    except Exception as e:
        logger.error(f"Failed to update Redis cache for GitHub stats: {e}")

    return {
        "repos_synced": synced_repos_count,
        "days_synced": synced_days_count,
        "streak": streak_val,
        "total_commits": total_commits
    }
