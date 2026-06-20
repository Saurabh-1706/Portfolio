"""
Text chunker for the ingestion pipeline.

Strategy:
  - RecursiveCharacterTextSplitter from LangChain.
  - ~400 character chunks (~100 tokens) with 50-char (~12 token) overlap.
  - Short texts (< MIN_CHUNK_SIZE chars) are returned as a single chunk
    without splitting — no need to fragment a 60-word summary.
"""
from typing import NamedTuple

from langchain_text_splitters import RecursiveCharacterTextSplitter

# Approx token targets: 400 chars ≈ 100 tokens, overlap 50 chars ≈ 12 tokens.
CHUNK_SIZE = 1200       # chars (≈300 tokens)
CHUNK_OVERLAP = 200     # chars (≈50 tokens)
MIN_CHUNK_SIZE = 150    # texts shorter than this are not split


class TextChunk(NamedTuple):
    text: str
    chunk_index: int


_splitter = RecursiveCharacterTextSplitter(
    chunk_size=CHUNK_SIZE,
    chunk_overlap=CHUNK_OVERLAP,
    length_function=len,
    separators=["\n\n", "\n", ". ", ", ", " ", ""],
)


def chunk_text(text: str) -> list[TextChunk]:
    """
    Split *text* into embeddable chunks.

    Returns a list of TextChunk(text, chunk_index) namedtuples.
    If the text is short enough to be a single chunk it's returned as-is.
    Empty / whitespace-only text returns an empty list.
    """
    text = (text or "").strip()
    if not text:
        return []

    if len(text) <= MIN_CHUNK_SIZE:
        return [TextChunk(text=text, chunk_index=0)]

    raw_chunks = _splitter.split_text(text)
    return [TextChunk(text=chunk, chunk_index=i) for i, chunk in enumerate(raw_chunks)]
