"""
ChromaDB client and collection setup.

Uses a single collection 'portfolio_content' for all content types.
Chunk metadata includes source_type, source_id, title, and chunk_index
so retrieval can be filtered or cited without separate collections.
"""
import chromadb
from chromadb import Collection

from app.core.config import get_settings

settings = get_settings()

_client: chromadb.ClientAPI | None = None
_collection: Collection | None = None

COLLECTION_NAME = "portfolio_content"


def get_chroma_client() -> chromadb.ClientAPI:
    """Return a persistent ChromaDB client (singleton)."""
    global _client
    if _client is None:
        _client = chromadb.HttpClient(
            host=settings.CHROMA_HOST,
            port=settings.CHROMA_PORT,
        )
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
    """Force re-fetch of the collection on next call (used in tests)."""
    global _collection
    _collection = None
