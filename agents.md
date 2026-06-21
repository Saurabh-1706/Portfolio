# Agents.md — Portfolio Project Change Log & Context

> **Purpose**: This file tracks all changes made to the project by the AI agent. Check this file FIRST before making any changes to save tokens and avoid redundant work.

---

## Project Summary

- **Project**: AI Portfolio + CMS — Production-grade, AI-powered developer portfolio with headless CMS backend
- **Blueprint**: [AI_PORTFOLIO_BLUEPRINT (1).md](file:///d:/Project/Portfolio/AI_PORTFOLIO_BLUEPRINT%20(1).md)
- **Owner**: Saurabh
- **Started**: 2026-05-31

---

## Tech Stack (from Blueprint)

| Layer | Tech |
|---|---|
| **Frontend** | Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Recharts, Geist fonts |
| **Backend** | FastAPI, Pydantic v2, SQLAlchemy 2.0 (async), Alembic, Redis |
| **AI/ML** | LangChain, LangGraph, OpenAI API, ChromaDB (Phase 2) |
| **Database** | PostgreSQL 16, ChromaDB, Cloudinary, Redis 7 |
| **Auth** | Clerk (not yet integrated) |
| **Deployment** | Vercel (frontend), Railway (backend), GitHub Actions, Docker |

---

## Current Project State

- **Phase**: Terminal + GitHub Sync — ALL Phase 3 FEATURES COMPLETE ✅
- **Frontend**: ✅ Running on http://localhost:3000 — ChatLauncher & Terminal (/terminal) live
- **Backend**: ✅ Running — RAG pipeline, /chat SSE, /github/stats, public resume/skills/blogs APIs live
- **Admin CMS**: ✅ Built — /admin/dashboard (with GitHub sync & RAG reindex buttons), /admin/projects, /admin/chatlogs
- **Auth**: ✅ Clerk keys configured
- **Database**: ✅ Docker running — PostgreSQL + Redis + ChromaDB all up
- **Migrations**: ✅ `3f8dc8a03b0a` (head) — github tables created
- **Status**: Terminal component fully interactive, GitHub analytics live, and manual triggers active.

---

## Development Phases

### Phase 1 — Foundation (Week 1–2) — COMPLETE ✅
- [x] Set up Next.js project with Tailwind + design system
- [x] Set up FastAPI backend structure with SQLAlchemy models
- [x] Run Alembic migrations for all tables
- [x] Build admin dashboard with Clerk auth
- [x] Implement project CRUD API
- [x] Build dynamic project cards on homepage
- [ ] Deploy frontend to Vercel, backend to Railway

### Phase 2 — AI Chatbot (Week 3–4) — COMPLETE ✅
- [x] Set up ChromaDB vectorstore (HTTP client to Docker service)
- [x] Build LangChain ingestion pipeline (chunker + embedder + reindex)
- [x] Create POST /admin/reindex endpoint
- [x] Build LangGraph RAG pipeline (retrieve → grade → generate)
- [x] Create /chat SSE streaming endpoint
- [x] Build chatbot UI widget (launcher, panel, streaming messages)
- [x] Add source citations (chips under bot answers)
- [x] Add thumbs up/down feedback
- [x] Add admin chat log viewer (/admin/chatlogs)
- [x] Add rate limiting (10 req/5 min per IP, in-memory)
- [x] ContentMixin + ResumeEntry + Profile + ChatLog models

### Phase 3 — Terminal + GitHub (Week 5) — COMPLETE ✅
- [x] Build terminal component with command registry
- [x] Implement all commands with API integration
- [x] Add autocomplete and command history
- [x] Set up GitHub API integration with Redis cache
- [x] Build GitHub dashboard widgets
- [x] Add GitHub auto-sync button to admin

### Phase 4 — Playground + Polish (Week 6)
- [ ] Build 2–3 live AI demos
- [ ] Write first 2 blog posts
- [ ] Add build timeline section
- [ ] Add Framer Motion animations throughout
- [ ] Mobile responsiveness audit
- [ ] Lighthouse performance audit

---

## Files Created

### Session 1 — 2026-05-31

#### Backend (`backend/`)
| File | Purpose |
|---|---|
| `app/__init__.py` | Package init |
| `app/main.py` | FastAPI app entry point with CORS, health check, router registration |
| `app/schemas.py` | Pydantic v2 schemas for all models (Project, Blog, Skill, Timeline) |
| `app/core/__init__.py` | Core package init |
| `app/core/config.py` | Pydantic Settings for env var management |
| `app/core/database.py` | Async SQLAlchemy engine + session factory |
| `app/models/__init__.py` | Models package init, re-exports all models |
| `app/models/project.py` | Project SQLAlchemy model (UUID, ARRAY, JSONB fields) |
| `app/models/blog.py` | Blog model with MDX content support |
| `app/models/skill.py` | Skill model with proficiency check constraint |
| `app/models/timeline.py` | Timeline entry model |
| `app/models/analytics.py` | Analytics model with FK to projects |
| `app/routes/__init__.py` | Routes package init |
| `app/routes/projects.py` | Public project routes (GET /projects, GET /projects/{slug}) |
| `app/routes/admin.py` | Admin CRUD routes (POST/PUT/DELETE projects) |
| `app/services/__init__.py` | Services package init |
| `requirements.txt` | Python dependencies (pinned versions) |
| `.env` | Environment variables template |

#### Frontend (`frontend/`)
| File | Purpose |
|---|---|
| `app/globals.css` | Full design system — color palette, dark mode, animations, scrollbar |
| `app/layout.tsx` | Root layout with SEO metadata, fonts, Navigation + Footer |
| `app/page.tsx` | Homepage — Hero, Featured Projects, Skills, Terminal teaser, CTA |
| `app/projects/page.tsx` | Projects listing with SSR data fetching |
| `app/projects/ProjectsGrid.tsx` | Client component for category filtering + animated grid |
| `app/projects/[slug]/page.tsx` | Dynamic project page with SSG, metadata, 404 handling |
| `app/projects/[slug]/ProjectCaseStudy.tsx` | Full case study component with metrics, languages, challenges |
| `app/blog/page.tsx` | Blog placeholder page |
| `app/about/page.tsx` | About page with bio, specializations, contact |
| `components/Navigation.tsx` | Sticky nav with backdrop blur, mobile hamburger menu |
| `components/Hero.tsx` | Hero with availability dot, role title, CTAs |
| `components/ProjectCard.tsx` | Flat card with staggered animation, tech tags, stars |
| `components/Footer.tsx` | Minimal footer with social links |
| `components/SectionHeading.tsx` | Reusable section heading with scroll animation |
| `components/SkillsSection.tsx` | Skills grid organized by category |
| `lib/types.ts` | TypeScript interfaces for all data models |
| `lib/api.ts` | API client with mock data fallback |
| `.env.local` | Frontend env variables |

#### Root
| File | Purpose |
|---|---|
| `docker-compose.yml` | PostgreSQL 16 + Redis 7 + ChromaDB for local dev |
| `agents.md` | This file |

#### Installed npm packages
- `framer-motion` — animations
- `recharts` — charts (for GitHub dashboard)
- `@heroicons/react` — icons

### Session 2 — 2026-06-20 (AI Chatbot — All 5 Phases)

#### Backend — New Files
| File | Purpose |
|---|---|
| `app/models/mixins.py` | ContentMixin (is_published, is_indexed, updated_at) |
| `app/models/resume_entry.py` | ResumeEntry model (work/edu/cert/achievement) |
| `app/models/profile.py` | Profile singleton model (about me) |
| `app/models/chat_log.py` | ChatLog model (question, answer, sources, feedback) |
| `app/vectorstore.py` | ChromaDB HTTP client, portfolio_content collection |
| `app/ingestion/chunker.py` | RecursiveCharacterTextSplitter, 300–500 token chunks |
| `app/ingestion/embedder.py` | Batch OpenAI text-embedding-3-small calls |
| `app/ingestion/reindex.py` | Full orchestration: query → chunk → embed → upsert → mark indexed |
| `app/chat/prompts.py` | System prompts: grounding, citation, topic guard, fallback |
| `app/chat/rate_limit.py` | In-memory sliding window: 10 req/5 min per IP |
| `app/chat/graph.py` | LangGraph pipeline: retrieve → grade → generate (streaming) |
| `app/routers/chat.py` | POST /chat SSE endpoint + chat_log persistence |
| `app/routes/admin_chatlogs.py` | GET /admin/chatlogs (paginated) + PATCH feedback |
| `alembic/versions/7134732d2faa_add_chatbot_data_layer.py` | Migration: chatbot tables + ContentMixin fields |

#### Backend — Modified Files
| File | Change |
|---|---|
| `app/models/project.py` | Added ContentMixin (is_published, is_indexed) |
| `app/models/__init__.py` | Added ResumeEntry, Profile, ChatLog imports |
| `app/core/config.py` | Added CHROMA_HOST/PORT (replaced CHROMA_PERSIST_DIR) |
| `app/routes/admin.py` | Added POST /admin/reindex endpoint |
| `app/main.py` | Registered chat + admin_chatlogs routers |
| `requirements.txt` | Added langchain, langchain-openai, langchain-chroma==0.2.3, langgraph, chromadb==0.6.3, openai |
| `.env` | Updated CHROMA_HOST/PORT |

#### Frontend — New Files
| File | Purpose |
|---|---|
| `components/chatbot/useChatStream.ts` | SSE streaming hook, UUID session, [SOURCES] parsing |
| `components/chatbot/StarterPrompts.tsx` | 4 tappable suggested questions on empty state |
| `components/chatbot/ChatMessage.tsx` | Message bubble, typing indicator, source chips, feedback |
| `components/chatbot/ChatPanel.tsx` | Chat window with message list + textarea input |
| `components/chatbot/ChatLauncher.tsx` | Floating bottom-right button with pulse animation |
| `app/admin/chatlogs/page.tsx` | Admin table: paginated chat transcripts, expandable answers |

#### Frontend — Modified Files
| File | Change |
|---|---|
| `app/globals.css` | Added full chatbot CSS (launcher, panel, messages, chips, feedback) |
| `app/layout.tsx` | Mounted `<ChatLauncher />` globally |

---

## Change Log

### Session 1 — 2026-05-31

| Time | Action | Details |
|---|---|---|
| 19:29 | Created `agents.md` | Initial project tracking file |
| 19:30 | Created implementation plan | Phase 1 Foundation plan (approved) |
| 19:32 | Scaffolded Next.js frontend | `npx create-next-app@latest` with TypeScript, Tailwind, App Router |
| 19:33 | Created backend structure | FastAPI app with models, routes, schemas, core |
| 19:35 | Created all SQLAlchemy models | Project, Blog, Skill, Timeline, Analytics |
| 19:36 | Created API routes | Public project routes + Admin CRUD routes |
| 19:36 | Created Pydantic schemas | All request/response models |
| 19:36 | Created docker-compose.yml | PostgreSQL + Redis + ChromaDB |
| 19:37 | Installed frontend deps | framer-motion, recharts, @heroicons/react |
| 19:37 | Built design system | Full CSS custom properties + Tailwind v4 theme + animations |
| 19:38 | Built core components | Navigation, Hero, ProjectCard, Footer, SectionHeading, SkillsSection |
| 19:40 | Built all pages | Homepage, Projects listing, Project detail, Blog, About |
| 19:40 | Created API client | With mock data fallback for development without backend |
| 19:42 | Verified frontend | All pages return 200, mock data working correctly |

### Session 2 — 2026-06-20

| Time | Action | Details |
|---|---|---|
| 11:30 | Phase 1: Data layer | ContentMixin + ResumeEntry + Profile + ChatLog models |
| 11:35 | Phase 1: Migration | Alembic `7134732d2faa` applied. Git push `f30cc49` |
| 11:40 | Phase 2: Ingestion | vectorstore.py, chunker.py, embedder.py, reindex.py |
| 11:42 | Phase 2: /admin/reindex | Endpoint added to admin.py |
| 11:50 | Phase 3: RAG pipeline | prompts.py, rate_limit.py, graph.py (LangGraph) |
| 11:55 | Phase 3: /chat endpoint | SSE streaming + chat_log write after completion |
| 12:00 | Phase 4: Frontend | ChatLauncher, ChatPanel, ChatMessage, StarterPrompts, useChatStream |
| 12:05 | Phase 4: CSS + layout | 400 lines chatbot CSS added to globals.css, ChatLauncher mounted |
| 12:08 | Phase 5: Polish | Source chips, feedback buttons, error states (built into Phase 4) |
| 12:10 | Phase 5: Admin logs | /admin/chatlogs page + /api/admin/chatlogs backend |
| 12:18 | Verify + push | All imports OK, git push `1f70453` (Phases 2–5) |
| 21:30 | Report & Seeding | Generated `Portfolio_Project_Summary.docx`, upgraded chromadb client to `1.0.0` to resolve `_type` KeyError, created/ran `seed_data.py`, and completed initial vector reindexing (13 chunks loaded). |

### Session 3 — 2026-06-21

| Time | Action | Details |
|---|---|---|
| 19:30 | Phase 3: Public APIs | Created public `GET /api/skills`, `GET /api/resume`, and `GET /api/blogs` endpoints to serve the terminal. |
| 19:35 | Phase 3: DB Seeding | Updated `seed_data.py` to seed structured skills and a sample blog post. Executed seed. |
| 19:42 | Phase 3: Admin Actions | Integrated manual GitHub Sync and AI Chatbot Reindex trigger buttons with status displays on `/admin/dashboard`. |
| 19:50 | Phase 3: Terminal Console | Built `<TerminalConsole />` component at `/terminal` with tab autocomplete, arrow key history, and api-backed shell command registry. |
| 19:55 | Phase 3: Build & Push | Verified Next.js production compilation, committed, and pushed to `main` branch. |

---

## Key Decisions

1. **Tailwind v4**: Using `@theme inline` syntax (not v3 `tailwind.config.ts` — v4 is default in Next.js 16)
2. **Geist fonts**: Using Next.js default Geist + Geist Mono
3. **Mock data fallback**: Frontend works independently with realistic mock projects when backend is offline
4. **API prefix**: All backend routes prefixed with `/api`
5. **Clerk keys**: Configured (pk_test + sk_test) — Clerk auth guard not enforced on admin routes yet
6. **ChromaDB HTTP client**: Uses Docker-hosted ChromaDB at localhost:8001 (not in-process)
7. **Single ChromaDB collection**: `portfolio_content` with source_type metadata — no separate collections per type
8. **LangGraph over plain chain**: Future-proof for adding nodes (e.g., query rewriting, multi-hop retrieval)
9. **In-memory rate limiter**: Redis-backed rate limiting deferred until abuse is observed
10. **chromadb==1.0.0 Client Upgrade**: Upgraded local package to match ChromaDB server version `1.0.0` (resolving strict config parsing key error `_type`).

---

## Known Issues / Blockers

1. **Clerk auth not enforced**: /admin/reindex and /admin/chatlogs are currently open — add Clerk JWT middleware before deploying.

---

## Next Steps

1. **Test Terminal & Sync**: Try commands in `/terminal` and trigger sync/reindex via `/admin/dashboard`.
2. **Deploy**: Prepare Vercel and Railway production builds.
3. **Protect admin routes**: Integrate Clerk JWT verification on the backend admin endpoints.
4. **Proceed to Phase 4**: Build 2–3 live AI demos in the playground, write blog posts, and add the build timeline.
