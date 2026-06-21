import logging
from apscheduler.schedulers.asyncio import AsyncIOScheduler
from apscheduler.triggers.interval import IntervalTrigger

from app.core.database import async_session
from app.github.sync import run_github_sync

logger = logging.getLogger(__name__)

# Singleton scheduler instance
scheduler = AsyncIOScheduler()

async def sync_github_job():
    """Wrapper function to get database session and run the sync job."""
    logger.info("Executing scheduled GitHub synchronization task...")
    async with async_session() as db:
        try:
            res = await run_github_sync(db)
            logger.info(f"Scheduled GitHub sync completed: {res}")
        except Exception as e:
            logger.error(f"Error during scheduled GitHub sync: {e}", exc_info=True)

def start_scheduler():
    """Starts the background scheduler and registers the intervals."""
    if not scheduler.running:
        # Run every 6 hours
        scheduler.add_job(
            sync_github_job,
            trigger=IntervalTrigger(hours=6),
            id="github_sync_job",
            name="Sync GitHub activity metrics",
            replace_existing=True
        )
        scheduler.start()
        logger.info("APScheduler initialized: GitHub sync job registered to run every 6 hours.")

def shutdown_scheduler():
    """Gracefully shuts down the background scheduler."""
    if scheduler.running:
        scheduler.shutdown()
        logger.info("APScheduler shut down successfully.")
