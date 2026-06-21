# Completed Implementation Status — AI Portfolio & CMS

This document provides a comprehensive overview of all completed components, features, and database pipelines in the **AI-Powered Developer Portfolio + Headless CMS** project.

---

## 1. System Architecture & Tech Stack

The application runs on a decoupled client-server architecture with a relational database, vector database, and caching server running locally in containerized Docker environments.

| Layer | Technologies Used | Role |
|---|---|---|
| **Frontend** | Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Geist Fonts | User-facing portfolio interface, administrative dashboard pages, interactive floating chat widget, and SSE response rendering. |
| **Backend** | FastAPI (Python), Uvicorn, SQLAlchemy 2.0 (async), Pydantic v2, Alembic | REST APIs, Server-Sent Events (SSE) streaming, database models, database migration scripts, rate limiters. |
| **AI / ML** | LangChain, LangGraph, OpenAI API (`text-embedding-3-small` / `gpt-4o-mini`) | RAG orchestration pipeline, document relevance grading, conversational answer generation, vector chunking. |
| **Databases** | PostgreSQL 16, ChromaDB (v2 HTTP Client), Redis 7 | **Postgres**: Relational database for Projects, Blogs, Profiles, Resume Entries, and Chat Logs.<br>**ChromaDB**: Vector database storing document embeddings.<br>**Redis**: Session and analytical cache. |
| **Authentication** | Clerk (keys resolved) | Secure management of admin panel endpoints. |
| **Local Services** | Docker Compose | Containers for Postgres, Redis, and ChromaDB servers. |

---

## 2. Phase 1 — Foundation & Admin CMS (Completed)

*   **Database Models**: Added five primary SQLAlchemy models to map relational Postgres tables:
    *   `Project`: Slug-based projects with technologies list, challenges, lessons learned, cover image, and GitHub/live demo URLs.
    *   `Blog`: Articles supporting MDX formatting, tags, read times, and cover images.
    *   `Skill`: Skills grid items with category classification and proficiency constraints (1-100).
    *   `Timeline`: History events classified into work or education.
    *   `Analytics`: Interaction trackers tied to project rows.
*   **Admin CMS CRUD API**: Asynchronous endpoints under `/api/admin/projects` supporting full creation, updating, and deletion of projects.
*   **Next.js Frontend Pages**: Developed responsive, dark-themed pages:
    *   Homepage: Hero introduction, Skills grid, and Featured Projects cards.
    *   Projects Page: Categories filtering list and grid containing custom card designs.
    *   Project Details Page: SSR case study pages showing challenges, metrics, and technology badges.
    *   About Page: Bio detail and contact cards.
*   **Design System & Theme**: Built a premium dark-themed layout using Tailwind CSS v4 custom color HSL variables, glassmorphism backdrops, glow effects, and custom scrollbars in [globals.css](file:///d:/Project/Portfolio/frontend/app/globals.css).

---

## 3. Phase 2 — AI Recruiter Chatbot (Completed)

The AI chatbot serves as an intelligent recruiter assistant, answering professional questions using data indexed from the database.

### 3.1 Chatbot Data Layer (Phase 2.1)
*   **`ContentMixin`**: Added columns `is_published`, `is_indexed`, and `updated_at` to mark which items must be synchronized to the vector store.
*   **`Profile`**: Singleton record storing name, bio summary, headlines, flat list of skills, and social links.
*   **`ResumeEntry`**: Stores work experience, education, certifications, and achievements.
*   **`ChatLog`**: Stores user questions, generated responses, cited sources list, session UUID, and sentiment thumbs feedback.
*   **Alembic Migration**: Upgraded database schema utilizing version `7134732d2faa`.

### 3.2 Ingestion Pipeline (Phase 2.2)
*   **ChromaDB Client**: Established HttpClient connection to containerized ChromaDB (port `8001`) with cosine similarity metric configured.
*   **Chunker**: Implemented [chunker.py](file:///d:/Project/Portfolio/backend/app/ingestion/chunker.py) using `RecursiveCharacterTextSplitter` splitting long contents into chunks of 1200 characters (~300 tokens) with 200 character overlap. Short texts (<150 chars) are kept as single chunks.
*   **Embedder**: Implemented [embedder.py](file:///d:/Project/Portfolio/backend/app/ingestion/embedder.py) sending batch embeddings to OpenAI's `text-embedding-3-small` in single API calls.
*   **Reindex Job Orchestrator**: Developed [reindex.py](file:///d:/Project/Portfolio/backend/app/ingestion/reindex.py) to sync PostgreSQL rows to ChromaDB vectors and flag rows as `is_indexed = True`.
*   **Endpoint `POST /api/admin/reindex`**: Created FastAPI administrative route to trigger reindexing.

### 3.3 RAG Decision Pipeline (Phase 2.3)
*   **LangGraph Pipeline**: Orchestrated conversational states in [graph.py](file:///d:/Project/Portfolio/backend/app/chat/graph.py):
    1.  `Retriever Node`: Queries ChromaDB for the 4 most similar chunks.
    2.  `Grader Node`: Validates document relevance using a cosine similarity threshold (`0.75`) and a grading LLM prompt to filter irrelevant results.
    3.  `Generator Node`: Queries `gpt-4o-mini` to construct a first-person response grounded only on the approved chunks.
    4.  `Fallback Node`: Invoked if no relevant chunks are found. Returns a message asking the user to reach out to Saurabh directly.
*   **Rate Limiter**: sliding-window rate limiter limiting clients to 10 requests per 5 minutes per IP address.
*   **Streaming SSE Endpoint**: `POST /api/chat` streams chatbot tokens to the client in real-time. It appends citations and logs conversation sessions to Postgres upon completion.

### 3.4 Chat UI Widget (Phase 2.4)
*   **`ChatLauncher`**: Bottom-right floating button utilizing a glowing pulse animation.
*   **`ChatPanel`**: Responsive fly-out panel with typing indicators, starter prompts, and auto-scroll message lists.
*   **`useChatStream` Hook**: React hook parsing the SSE streams and mapping text and `[SOURCES]` strings.
*   **`ChatMessage`**: Styled message bubbles supporting markdown, custom bullets, source chips, and thumbs feedback triggers.

### 3.5 Admin Chat Log Dashboard (Phase 2.5)
*   **`GET /api/admin/chatlogs`**: Paginated backend route querying logs and user feedback.
*   **Admin Dashboard View**: Expanded `/admin/chatlogs` page displaying chronological logs, expandable transcripts, session grouping, and user sentiment badges.

---

## 4. Codebase Directory Tree

```
Project/
├── backend/
│   ├── alembic/                 # Alembic migration scripts
│   ├── app/
│   │   ├── chat/
│   │   │   ├── graph.py        # LangGraph state machine & nodes
│   │   │   ├── prompts.py      # Grounding prompts & guidelines
│   │   │   └── rate_limit.py   # Sliding-window rate limiter
│   │   ├── core/
│   │   │   ├── config.py       # Pydantic Settings env parser
│   │   │   └── database.py     # SQLAlchemy Async engine
│   │   ├── ingestion/
│   │   │   ├── chunker.py      # RecursiveCharacterTextSplitter
│   │   │   ├── embedder.py     # OpenAI embedding client
│   │   │   └── reindex.py      # Relational-to-Vector sync job
│   │   ├── models/
│   │   │   ├── chat_log.py     # Conversational logs model
│   │   │   ├── mixins.py       # ContentMixin helper
│   │   │   ├── profile.py      # About-me singleton model
│   │   │   └── resume_entry.py # Work & education model
│   │   ├── routes/
│   │   │   ├── admin.py        # Admin CRUD & /reindex endpoint
│   │   │   ├── admin_chatlogs.py # Admin log query routes
│   │   │   └── chat.py         # Server-Sent Events chat route
│   │   ├── vectorstore.py      # ChromaDB HttpClient singleton
│   │   └── main.py             # FastAPI entrypoint
│   ├── requirements.txt        # Backend dependencies
│   └── seed_data.py            # Postgres content seeding script
│
├── frontend/
│   ├── app/
│   │   ├── admin/chatlogs/
│   │   │   └── page.tsx        # Chat transcripts log dashboard
│   │   ├── layout.tsx          # Mounted ChatLauncher floating UI globally
│   │   └── globals.css         # Injected chatbot CSS styles
│   ├── components/chatbot/
│   │   ├── ChatLauncher.tsx    # Floating launcher action button
│   │   ├── ChatPanel.tsx       # Fly-out messaging container
│   │   ├── ChatMessage.tsx     # Message bubble, chips & feedback buttons
│   │   ├── StarterPrompts.tsx  # Suggestion onboarding chips
│   │   └── useChatStream.ts    # SSE React stream hook
│   └── package.json            # Frontend node dependencies
```

---

## 5. Current Operation Instructions

1.  **Launch Docker Containers**:
    ```powershell
    docker compose up -d
    ```
2.  **Seeding Database (Postgres)**:
    ```powershell
    cd backend
    .\.venv\Scripts\activate
    python seed_data.py
    ```
3.  **Ingest Content (Reindex)**:
    *   Make sure `OPENAI_API_KEY` is set in `backend/.env`.
    *   Send a POST request to `/api/admin/reindex` (or run reindexing scripts) to populate the vector store.
4.  **Run Dev Servers**:
    *   **Backend**: `uvicorn app.main:app --reload`
    *   **Frontend**: `npm run dev`
