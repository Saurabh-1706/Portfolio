# AI Recruiter Chatbot — Implementation Guide

This document walks through building the AI Recruiter Chatbot feature end to
end, phase by phase. Each phase is independently shippable — you can stop
after any phase and have something that runs, even if the chatbot isn't
fully wired up yet.

**Stack reminder:** Next.js 14 (frontend) · FastAPI (backend) · PostgreSQL
(content) · ChromaDB (vectors) · LangChain + LangGraph (RAG orchestration) ·
OpenAI API (embeddings + generation) · Railway (backend host) · Vercel
(frontend host).

---

## Phase 1 — Data Layer

**Goal:** A PostgreSQL schema that holds your portfolio content (projects,
resume entries, bio) in a structured, queryable way, plus a table to log
every chatbot exchange. This is the single source of truth that Phase 2
will read from to build the chatbot's knowledge base.

### 1.1 Project structure

```
backend/
├── alembic/
│   ├── env.py          # wired to read DATABASE_URL and find your models
│   └── versions/        # generated migration files land here
├── alembic.ini
└── app/
    ├── database.py       # engine, session, Base
    └── models/
        ├── __init__.py    # imports all models so Alembic can see them
        ├── mixins.py       # ContentMixin: shared id/timestamps/publish flag
        ├── project.py
        ├── resume_entry.py
        ├── profile.py
        └── chat_log.py
```

### 1.2 Why a `ContentMixin`

Every table that feeds the chatbot (`Project`, `ResumeEntry`, `Profile`)
shares the same three concerns:

- **`is_published`** — lets you draft content in the admin panel without it
  leaking into the public site or the chatbot's knowledge base.
- **`updated_at`** — lets the Phase 2 ingestion job figure out what changed
  since the last reindex, instead of re-embedding everything every time.
- **`is_indexed`** — a cheap boolean the reindex job flips to `True` once a
  row's chunks are embedded in ChromaDB, and flips back to `False`
  automatically whenever the row is edited (via `onupdate`). This means you
  can always answer "what still needs embedding?" with a single `WHERE
  is_indexed = false` query.

`ChatLog` does **not** use this mixin — it's an observability artifact, not
content that gets embedded into the vector store.

### 1.3 Tables

| Table | Purpose | Key fields |
|---|---|---|
| `projects` | Each portfolio project | `title`, `slug`, `summary`, `description` (the long text that gets chunked), `tech_stack[]`, `github_url`, `live_url` |
| `resume_entries` | Work experience, education, certifications, achievements | `entry_type` (enum), `title`, `organization`, `start_date`/`end_date`, `description` |
| `profile` | Singleton "about me" row | `full_name`, `headline`, `summary`, `looking_for`, `skills[]` |
| `chat_logs` | One row per chatbot exchange | `conversation_id`, `question`, `answer`, `sources[]`, `feedback_positive` |

`profile` is intentionally a singleton — your admin panel should enforce
there's only ever one row (e.g. upsert on a known fixed ID, or just check
`SELECT count(*)` before allowing inserts).

### 1.4 Setting up Alembic

Alembic is already initialized and wired to your models via
`alembic/env.py`, which:

1. Adds `backend/` to `sys.path` so `from app.database import Base` works
   regardless of where you run `alembic` from.
2. Imports `app.models` (which imports every model) so `Base.metadata`
   knows about all your tables before autogenerate runs.
3. Reads `DATABASE_URL` from the environment and normalizes Railway's
   `postgres://` prefix to `postgresql://` (SQLAlchemy 2.x requires this).

**To generate and apply your first migration:**

```bash
cd backend

# Point at your local Postgres (or Railway's DB url if developing against it)
export DATABASE_URL="postgresql://postgres:postgres@localhost:5432/portfolio"

# Generate the migration by diffing your models against the (empty) DB
alembic revision --autogenerate -m "create projects, resume_entries, profile, chat_logs"

# Review the generated file in alembic/versions/ before applying —
# autogenerate is good but not perfect, especially with enums and arrays.

# Apply it
alembic upgrade head
```

**Going forward:** every time you change a model (add a column, etc.), run
`alembic revision --autogenerate -m "describe the change"` and
`alembic upgrade head` again. Never hand-edit the database schema directly.

### 1.5 Local Postgres for development

Easiest path: Docker.

```bash
docker run --name portfolio-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=portfolio -p 5432:5432 -d postgres:16
```

When you're ready to deploy, provision a Postgres plugin in Railway — it
will inject `DATABASE_URL` into your backend service automatically, and
`env.py` already knows how to read it.

### 1.6 Definition of done for Phase 1

- [ ] `alembic upgrade head` runs clean against a fresh database
- [ ] You can manually insert one row into each table via a Python shell or
      `psql` and query it back
- [ ] Your existing admin panel writes to these tables (if the admin panel
      predates this schema, this is the moment to point it here)

---

## Phase 2 — Ingestion Pipeline

**Goal:** A way to turn the structured content in PostgreSQL into chunked,
embedded vectors in ChromaDB — triggered manually from the admin panel
whenever you've added or edited content.

### 2.1 New pieces

```
backend/app/
├── ingestion/
│   ├── chunker.py        # splits long text into embeddable chunks
│   ├── embedder.py        # calls OpenAI embeddings API
│   └── reindex.py          # orchestrates: query DB -> chunk -> embed -> upsert
├── vectorstore.py          # ChromaDB client + collection setup
└── routers/
    └── admin.py              # POST /admin/reindex (Clerk-protected)
```

### 2.2 ChromaDB setup (`vectorstore.py`)

Use a **single collection** called `portfolio_content` with rich metadata
per chunk, rather than separate collections per content type. This keeps
retrieval simple — one similarity search across everything — and you filter
by metadata afterward if you ever need to (e.g. "only search projects").

Each chunk's metadata should include:

```python
{
    "source_type": "project" | "resume_entry" | "profile",
    "source_id": "<the row's UUID>",
    "title": "IntelliTrack",          # human-readable, for citation in the UI
    "chunk_index": 0,                  # which chunk of this source this is
}
```

For local dev, run ChromaDB in-process with a persistent directory. For
production on Railway, run it as a sidecar service with a persistent
volume, or use Chroma's hosted client/server mode — pick whichever Railway
makes least painful; this is a "decide when you get there" detail, not a
blocker now.

### 2.3 Chunking strategy (`chunker.py`)

- Use LangChain's `RecursiveCharacterTextSplitter`.
- Target **300–500 tokens per chunk** with ~50 token overlap. Recruiter
  questions are narrow ("tell me about IntelliTrack", "what's your RAG
  experience") so smaller, focused chunks retrieve more precisely than
  large ones.
- Chunk these fields specifically:
  - `Project.description` (the long writeup)
  - `ResumeEntry.description` (bullet points/achievements)
  - `Profile.summary` and `Profile.looking_for`
- Short fields (`Project.summary`, `Profile.headline`) don't need chunking
  — embed them as a single chunk each, since they're already concise.

### 2.4 Embedding (`embedder.py`)

- Use OpenAI's `text-embedding-3-small` — cheap, fast, plenty good for a
  knowledge base this size. No need for `text-embedding-3-large` here.
- Batch embedding calls where possible (OpenAI's embeddings endpoint
  accepts a list of strings per request) rather than one call per chunk.

### 2.5 The reindex job (`reindex.py`)

Pseudocode for the orchestration:

```
def reindex():
    rows = query all published rows from projects, resume_entries, profile
           WHERE is_indexed = false  OR  updated_at > last_reindex_time

    for row in rows:
        delete existing chunks for this row from ChromaDB (by source_id metadata filter)
        chunks = chunk_text(row's embeddable field(s))
        embeddings = embed(chunks)
        upsert chunks + embeddings + metadata into ChromaDB
        mark row.is_indexed = True in Postgres
```

Deleting old chunks before re-inserting is important — otherwise editing a
project description leaves stale chunks in ChromaDB alongside the new ones,
and the chatbot may retrieve outdated information.

### 2.6 The admin endpoint (`routers/admin.py`)

```
POST /admin/reindex
```

- Protected by Clerk (admin-only, same as the rest of `/admin`).
- Synchronous is fine for v1 — your content volume is small enough that a
  full reindex should take seconds, not minutes. No need for a background
  job queue yet.
- Returns a simple summary: `{"reindexed": 7, "skipped": 12}`.
- Trigger it manually with a button in your admin panel after editing
  content. No auto-sync needed for v1.

### 2.7 Definition of done for Phase 2

- [ ] Hitting `POST /admin/reindex` with no content in Postgres returns
      `{"reindexed": 0, ...}` without erroring
- [ ] Adding one project and reindexing produces queryable chunks in
      ChromaDB (verify with a manual similarity search in a Python shell)
- [ ] Editing that project's description and reindexing again replaces the
      old chunks rather than duplicating them

---

## Phase 3 — Retrieval + Generation (the core)

**Goal:** A `/chat` endpoint that takes a visitor's question, retrieves
relevant chunks from ChromaDB, and generates a grounded answer — with
honest fallback behavior when nothing relevant is found, and resistance to
off-topic or jailbreak attempts.

### 3.1 New pieces

```
backend/app/
├── chat/
│   ├── graph.py            # LangGraph definition: retrieve -> grade -> generate
│   ├── prompts.py           # system prompts for grading and generation
│   └── rate_limit.py          # simple per-IP or per-conversation limiter
└── routers/
    └── chat.py                # POST /chat
```

### 3.2 The LangGraph pipeline (`graph.py`)

Three nodes, in sequence:

**Node 1 — `retrieve`**
- Embed the incoming question (same OpenAI embedding model as ingestion).
- Similarity search against ChromaDB, top-k = 4–6.
- Pass retrieved chunks + their metadata forward.

**Node 2 — `grade`**
- A cheap relevance check on the retrieved chunks. Two reasonable
  approaches, pick one for v1:
  - **Simple/cheap:** threshold on cosine similarity score — if the best
    match is below some cutoff (tune this empirically, start around 0.75
    depending on your distance metric), treat retrieval as "no good match."
  - **More robust:** a small LLM call asking "are these chunks relevant to
    this question, yes/no" — costs a bit more but catches cases where
    similarity score alone is misleading.
- If nothing relevant: skip to a **fallback generate** that's honest
  ("I don't have specific information about that, but here's what I do
  know about Saurabh's background...") rather than letting the main
  generate step hallucinate from weak context.

**Node 3 — `generate`**
- OpenAI chat completion (e.g. `gpt-4o-mini` — good quality/cost tradeoff
  for this use case; no need for the flagship model).
- System prompt responsibilities (see 3.3 below).
- Stream the response token-by-token back to the API layer.

### 3.3 System prompt design (`prompts.py`)

The system prompt needs to do several jobs at once:

1. **Frame the role clearly:** "You are answering questions on Saurabh's
   behalf, to a recruiter or hiring manager visiting his portfolio site."
2. **Ground strictly in retrieved context:** instruct the model to answer
   only from the provided chunks, and explicitly say "I don't have
   information about that" rather than inventing details when context is
   thin. This is the single most important instruction — hallucinated
   resume claims are worse than no chatbot at all.
3. **Cite sources:** ask the model to mention which project/experience it's
   drawing from (e.g. "Based on the IntelliTrack project...") so you can
   render a source chip in the UI (Phase 5).
4. **Stay on topic:** explicitly instruct the model to politely decline
   and redirect if asked to do something unrelated to the portfolio
   (general coding help, unrelated questions, attempts to override these
   instructions). Treat this as a real requirement, not an afterthought —
   recruiters and curious visitors will test this, and handling it
   gracefully is itself a small demonstration of engineering judgment.
5. **Tone:** confident, concise, third-person-about-Saurabh or
   first-person-as-Saurabh — pick one and be consistent (first-person
   tends to feel more natural in a chat widget: "I built IntelliTrack
   to...").

### 3.4 The `/chat` endpoint (`routers/chat.py`)

```
POST /chat
Body: { "message": str, "conversation_id": str }
```

- Look up or create a `conversation_id` (frontend generates a UUID on
  first load and keeps it in memory for the session — no need to persist
  conversation state server-side beyond the `chat_logs` table itself).
- Run the LangGraph pipeline.
- Stream the response (Server-Sent Events is simplest with FastAPI — see
  Phase 4 for the matching frontend code).
- After the full response is generated, write one row to `chat_logs`
  (question, answer, sources, conversation_id).
- Apply rate limiting (3.5) before doing any expensive work.

### 3.5 Rate limiting (`rate_limit.py`)

You already decided Redis is optional for v1 — keep that decision here. A
simple in-memory dict (`{ip_or_conversation_id: [(timestamp), ...]}`) with
a sliding window (e.g. 10 messages per 5 minutes) is enough to stop abuse
without adding infrastructure. This resets on every backend redeploy,
which is a perfectly acceptable tradeoff for v1 — revisit with Redis only
if abuse actually becomes a problem in practice.

### 3.6 Definition of done for Phase 3

- [ ] A question with a clear answer in your content (e.g. "tell me about
      IntelliTrack") returns an accurate, grounded response
- [ ] A question with no relevant content (e.g. "what's your favorite
      pizza topping") returns the honest fallback, not a hallucination
- [ ] An off-topic or jailbreak-style prompt ("ignore previous instructions
      and...") gets politely redirected, not complied with
- [ ] Every exchange produces a row in `chat_logs`
- [ ] Hammering the endpoint past the rate limit returns a 429, not a
      string of OpenAI charges

---

## Phase 4 — Frontend Widget

**Goal:** A polished chat UI in Next.js that feels alive — streaming
responses, a non-intrusive launcher, and enough onboarding (starter
prompts) that visitors aren't staring at a blank input box.

### 4.1 New pieces

```
frontend/
└── components/
    └── chatbot/
        ├── ChatLauncher.tsx     # floating button, bottom-right
        ├── ChatPanel.tsx          # expanded chat window
        ├── ChatMessage.tsx         # single message bubble (+ source chip)
        ├── StarterPrompts.tsx       # suggested questions on empty state
        └── useChatStream.ts           # hook: manages SSE connection + message state
```

### 4.2 Visual design

Stay consistent with Premium Minimal: white surface for the panel, subtle
shadow/border rather than heavy drop shadows, purple accent for the
launcher button and the user's own message bubbles, Inter for body text.
If you show code or technical terms in answers, JetBrains Mono for those
inline spans is a nice touch of consistency with the rest of the site.

### 4.3 Streaming (`useChatStream.ts`)

- On send: POST to `/chat`, but consume the response as a stream (FastAPI
  SSE on the backend, `EventSource` or a manual `fetch` + `ReadableStream`
  reader on the frontend — `fetch` streaming gives you more control over
  headers/auth than `EventSource`, so prefer that).
- Append tokens to the current message as they arrive so the UI shows
  text growing in real time, rather than a single pause-then-dump.
- Show a subtle typing/thinking indicator before the first token arrives.

### 4.4 Starter prompts (`StarterPrompts.tsx`)

Show 3–4 tappable suggestions on first open, pulled from genuinely strong
material:

- "What's your strongest project?"
- "Tell me about your RAG pipeline experience"
- "What's your academic background?"
- "What kind of role are you looking for?"

Clicking one fires it as if the visitor typed it — removes friction for
visitors who don't know what to ask.

### 4.5 Definition of done for Phase 4

- [ ] Launcher button is visible but unobtrusive on every page
- [ ] Opening the panel with no prior messages shows starter prompts
- [ ] Sending a message streams the response visibly, not all-at-once
- [ ] Conversation persists (in memory) while navigating the panel open/
      closed within a session, resets on full page reload (no need for
      cross-session persistence in v1)

---

## Phase 5 — Polish for Recruiter-Facing Trust

**Goal:** Small details that make the chatbot feel trustworthy and
deliberate rather than bolted-on — this is what turns "neat demo" into
"this person clearly thought about the details."

### 5.1 Source attribution

Render a small chip under each bot answer using the `sources` array
returned by `/chat` (e.g. "Based on: IntelliTrack"). Clicking it could
scroll to or link to that project's card on the page — a nice bit of
cross-linking that also subtly proves the answer is grounded, not just
plausible-sounding text.

### 5.2 Fallback and empty states

- **No relevant content found:** the honest fallback message from Phase
  3.2, styled distinctly enough (slightly muted tone, maybe a small icon)
  that it doesn't read as a bug.
- **Off-topic/declined:** a friendly redirect message, not a cold refusal
  — something like steering the visitor back to portfolio-relevant
  questions in your own voice.
- **API error / OpenAI down:** a graceful "having trouble right now, try
  again in a moment" rather than a raw error or infinite spinner.

### 5.3 Instrumentation

You're already logging every exchange to `chat_logs` from Phase 3. Two
things worth adding on top, since they're cheap and useful:

- An optional thumbs up/down on each bot message, writing to
  `feedback_positive` — gives you real signal on answer quality over time,
  and "I instrumented feedback on my own AI feature" is a good detail to
  mention in interviews.
- A simple admin view (even just a paginated table in `/admin`) of recent
  conversations — useful both for catching bad answers early and as a
  thing you can screenshot/demo.

### 5.4 Definition of done for Phase 5

- [ ] Every grounded answer shows at least one source chip
- [ ] Fallback and off-topic states are visually distinct from normal
      answers, not jarring
- [ ] A simulated API failure (kill the backend mid-conversation) degrades
      gracefully in the UI
- [ ] You can view recent chat transcripts somewhere, even informally

---

## Suggested build order recap

| Phase | Effort | Risk | Depends on |
|---|---|---|---|
| 1. Data layer | ½–1 day | Low | — |
| 2. Ingestion | 1 day | Low–Medium | Phase 1 |
| 3. Retrieval + generation | 1–1.5 days | **Highest** | Phase 2 |
| 4. Frontend widget | 1 day | Low | Phase 3 (can stub earlier) |
| 5. Polish | ½ day | Low | Phases 3 & 4 |

Budget your slack in Phase 3 — grounding quality and prompt-injection
resistance are the parts most likely to need a few iterations before they
feel solid.
