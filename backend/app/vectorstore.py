"""
ChromaDB client and collection setup.

Uses a single collection 'portfolio_content' for all content types.
Chunk metadata includes source_type, source_id, title, and chunk_index
so retrieval can be filtered or cited without separate collections.
"""
import logging

import chromadb
from chromadb import Collection

from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

_client: chromadb.ClientAPI | None = None
_collection: Collection | None = None

COLLECTION_NAME = "portfolio_content"


def get_chroma_client() -> chromadb.ClientAPI:
    """Return a ChromaDB HTTP client and validate connection immediately."""
    global _client
    if _client is None:
        try:
            client = chromadb.HttpClient(
                host=settings.CHROMA_HOST,
                port=settings.CHROMA_PORT,
            )
            # Fast connectivity check — raises immediately if server is down
            client.heartbeat()
            _client = client
        except Exception as e:
            _client = None  # Don't cache a broken client
            raise ConnectionError(
                f"ChromaDB is not reachable at {settings.CHROMA_HOST}:{settings.CHROMA_PORT}. "
                "Make sure Docker is running: `docker-compose up -d`"
            ) from e
    return _client


def get_collection() -> Collection:
    """Return (or create) the portfolio_content collection."""
    global _collection
    if _collection is None:
        client = get_chroma_client()
        _collection = client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},  # cosine distance for similarity grading
        )
    return _collection


def reset_collection_cache() -> None:
    """Force re-fetch of the collection on next call (used in tests / after reconnect)."""
    global _collection, _client
    _collection = None
    _client = None


def is_chroma_available() -> bool:
    """Quick non-throwing check — returns True if ChromaDB is reachable."""
    try:
        get_chroma_client()
        return True
    except Exception:
        return False
