"""
Simple in-memory sliding-window rate limiter.

Limits: 10 messages per 5 minutes per IP (or conversation_id as fallback).
Resets on every backend redeploy — acceptable for v1.
Use Redis-backed limiting only if abuse becomes a real problem.
"""
import time
from collections import defaultdict, deque
from threading import Lock

from fastapi import HTTPException, Request

# ─── config ───────────────────────────────────────────────────────────────────

MAX_REQUESTS = 10          # messages allowed per window
WINDOW_SECONDS = 5 * 60   # 5-minute sliding window

# ─── state ────────────────────────────────────────────────────────────────────

_windows: dict[str, deque] = defaultdict(deque)  # key → timestamps
_lock = Lock()


# ─── public API ───────────────────────────────────────────────────────────────

def check_rate_limit(key: str) -> None:
    """
    Check and record a request for *key*.

    Raises HTTPException(429) if the key has exceeded MAX_REQUESTS
    within the past WINDOW_SECONDS.
    """
    now = time.monotonic()
    cutoff = now - WINDOW_SECONDS

    with _lock:
        window = _windows[key]

        # Evict timestamps older than the window
        while window and window[0] < cutoff:
            window.popleft()

        if len(window) >= MAX_REQUESTS:
            raise HTTPException(
                status_code=429,
                detail=(
                    f"Rate limit exceeded: {MAX_REQUESTS} messages per "
                    f"{WINDOW_SECONDS // 60} minutes. Please wait a moment."
                ),
            )

        window.append(now)


def get_rate_limit_key(request: Request, conversation_id: str) -> str:
    """
    Build the rate-limit key from the request.

    Prefers the real client IP; falls back to conversation_id if the
    IP cannot be determined (e.g. behind a proxy that strips headers).
    """
    forwarded_for = request.headers.get("X-Forwarded-For")
    if forwarded_for:
        ip = forwarded_for.split(",")[0].strip()
    else:
        ip = request.client.host if request.client else ""

    return ip or conversation_id
