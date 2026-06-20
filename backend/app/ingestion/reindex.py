"""
Reindex orchestrator — the core of the ingestion pipeline.

For each un-indexed published row across projects, resume_entries, profile:
  1. Delete any existing ChromaDB chunks for that source_id (stale cleanup).
  2. Chunk the embeddable text fields.
  3. Batch-embed all chunks via OpenAI.
  4. Upsert into ChromaDB with rich metadata.
  5. Flip is_indexed = True in PostgreSQL.

Returns a ReindexSummary with counts for the admin endpoint response.
"""
import logging
import uuid
from dataclasses import dataclass, field

from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession

from app.ingestion.chunker import chunk_text
from app.ingestion.embedder import embed_texts
from app.models.profile import Profile
from app.models.project import Project
from app.models.resume_entry import ResumeEntry
from app.vectorstore import get_collection

logger = logging.getLogger(__name__)


@dataclass
class ReindexSummary:
    reindexed: int = 0
    skipped: int = 0
    errors: list[str] = field(default_factory=list)


# ─── helpers ──────────────────────────────────────────────────────────────────

def _make_chunk_ids(source_id: str, count: int) -> list[str]:
    """Generate stable, unique IDs for each chunk of a source row."""
    return [f"{source_id}__chunk__{i}" for i in range(count)]


def _delete_source_chunks(collection, source_id: str) -> None:
    """Remove all previously embedded chunks for this source from ChromaDB."""
    try:
        collection.delete(where={"source_id": source_id})
    except Exception as exc:
        # ChromaDB raises if no docs match — silently ignore
        logger.debug("delete_source_chunks: %s (source_id=%s)", exc, source_id)


async def _upsert_chunks(
    collection,
    chunks: list[str],
    embeddings: list[list[float]],
    source_id: str,
    source_type: str,
    title: str,
) -> None:
    """Upsert chunks + embeddings + metadata into ChromaDB."""
    ids = _make_chunk_ids(source_id, len(chunks))
    metadatas = [
        {
            "source_type": source_type,
            "source_id": source_id,
            "title": title,
            "chunk_index": i,
        }
        for i in range(len(chunks))
    ]
    collection.upsert(
        ids=ids,
        embeddings=embeddings,
        documents=chunks,
        metadatas=metadatas,
    )


# ─── per-model ingestors ───────────────────────────────────────────────────────

async def _ingest_row(
    collection,
    source_id: str,
    source_type: str,
    title: str,
    texts_to_chunk: list[str],   # one or more text fields to chunk together
    texts_single: list[str],      # short fields embedded as single chunks each
) -> int:
    """
    Chunk, embed, and upsert one content row.
    Returns the number of chunks produced.
    """
    all_chunks: list[str] = []

    # Long texts → split
    for text in texts_to_chunk:
        for tc in chunk_text(text):
            all_chunks.append(tc.text)

    # Short texts → embed as-is
    for text in texts_single:
        cleaned = (text or "").strip()
        if cleaned:
            all_chunks.append(cleaned)

    if not all_chunks:
        return 0

    # Batch embed everything at once
    embeddings = await embed_texts(all_chunks)

    _delete_source_chunks(collection, source_id)
    await _upsert_chunks(collection, all_chunks, embeddings, source_id, source_type, title)
    return len(all_chunks)


# ─── main entry point ─────────────────────────────────────────────────────────

async def run_reindex(db: AsyncSession) -> ReindexSummary:
    """
    Run a full incremental reindex across all published, un-indexed content.
    Called by POST /admin/reindex.
    """
    summary = ReindexSummary()
    collection = get_collection()

    # ── Projects ──────────────────────────────────────────────────────────────
    projects = (
        await db.execute(
            select(Project).where(
                Project.is_published == True,
                Project.is_indexed == False,
            )
        )
    ).scalars().all()

    for project in projects:
        try:
            source_id = str(project.id)
            count = await _ingest_row(
                collection=collection,
                source_id=source_id,
                source_type="project",
                title=project.title,
                texts_to_chunk=[
                    project.full_desc or "",
                    project.challenges or "",
                    project.lessons_learned or "",
                ],
                texts_single=[project.short_desc or ""],
            )
            if count:
                await db.execute(
                    update(Project)
                    .where(Project.id == project.id)
                    .values(is_indexed=True)
                )
                summary.reindexed += 1
            else:
                summary.skipped += 1
        except Exception as exc:
            logger.error("Error indexing project %s: %s", project.id, exc)
            summary.errors.append(f"project:{project.id}: {exc}")

    # ── ResumeEntries ─────────────────────────────────────────────────────────
    entries = (
        await db.execute(
            select(ResumeEntry).where(
                ResumeEntry.is_published == True,
                ResumeEntry.is_indexed == False,
            )
        )
    ).scalars().all()

    for entry in entries:
        try:
            source_id = str(entry.id)
            label = f"{entry.title} @ {entry.organization or 'N/A'} ({entry.entry_type})"
            count = await _ingest_row(
                collection=collection,
                source_id=source_id,
                source_type="resume_entry",
                title=label,
                texts_to_chunk=[entry.description or ""],
                texts_single=[entry.title],
            )
            if count:
                await db.execute(
                    update(ResumeEntry)
                    .where(ResumeEntry.id == entry.id)
                    .values(is_indexed=True)
                )
                summary.reindexed += 1
            else:
                summary.skipped += 1
        except Exception as exc:
            logger.error("Error indexing resume_entry %s: %s", entry.id, exc)
            summary.errors.append(f"resume_entry:{entry.id}: {exc}")

    # ── Profile ───────────────────────────────────────────────────────────────
    profiles = (
        await db.execute(
            select(Profile).where(
                Profile.is_published == True,
                Profile.is_indexed == False,
            )
        )
    ).scalars().all()

    for profile in profiles:
        try:
            source_id = str(profile.id)
            count = await _ingest_row(
                collection=collection,
                source_id=source_id,
                source_type="profile",
                title=profile.full_name,
                texts_to_chunk=[
                    profile.summary or "",
                    profile.looking_for or "",
                ],
                texts_single=[profile.headline or ""],
            )
            if count:
                await db.execute(
                    update(Profile)
                    .where(Profile.id == profile.id)
                    .values(is_indexed=True)
                )
                summary.reindexed += 1
            else:
                summary.skipped += 1
        except Exception as exc:
            logger.error("Error indexing profile %s: %s", profile.id, exc)
            summary.errors.append(f"profile:{profile.id}: {exc}")

    await db.commit()
    logger.info(
        "Reindex complete: reindexed=%d skipped=%d errors=%d",
        summary.reindexed,
        summary.skipped,
        len(summary.errors),
    )
    return summary
