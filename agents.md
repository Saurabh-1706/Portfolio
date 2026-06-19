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

- **Phase**: Phase 1 — Foundation (COMPLETE — ready to deploy)
- **Frontend**: ✅ Running on http://localhost:3000
- **Backend**: ✅ Structure created, needs Python venv setup
- **Admin CMS**: ✅ Built — /admin/dashboard, /admin/projects (CRUD)
- **Auth**: ✅ Clerk integration built — needs real API keys from clerk.com
- **Database**: Docker Compose ready, not yet started
- **Status**: Full Phase 1 feature set built. Ready for deployment (Step 7).

---

## Development Phases

### Phase 1 — Foundation (Week 1–2) — CURRENT
- [x] Set up Next.js project with Tailwind + design system
- [x] Set up FastAPI backend structure with SQLAlchemy models
- [ ] Run Alembic migrations for all tables
- [x] Build admin dashboard with Clerk auth (Step 6 complete)
- [x] Implement project CRUD API (code written)
- [x] Build dynamic project cards on homepage
- [ ] Deploy frontend to Vercel, backend to Railway

### Phase 2 — AI Chatbot (Week 3–4)
- [ ] Prepare knowledge base documents
- [ ] Set up ChromaDB, run ingest.py
- [ ] Build LangChain RAG pipeline
- [ ] Create /chat streaming endpoint
- [ ] Build chatbot UI with streaming token display
- [ ] Add source citations

### Phase 3 — Terminal + GitHub (Week 5)
- [ ] Build terminal component with command registry
- [ ] Implement all commands with API integration
- [ ] Add autocomplete and command history
- [ ] Set up GitHub API integration with Redis cache
- [ ] Build GitHub dashboard widgets
- [ ] Add GitHub auto-sync button to admin

### Phase 4 — Playground + Polish (Week 6)
- [ ] Build 2–3 live AI demos
- [ ] Add rate limiting
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

---

## Key Decisions

1. **Tailwind v4**: Using `@theme inline` syntax (not v3 `tailwind.config.ts` — v4 is default in Next.js 16)
2. **Geist fonts**: Using Next.js default Geist + Geist Mono instead of Inter + JetBrains Mono (blueprint preference but Geist is the new standard)
3. **Mock data fallback**: Frontend works independently with realistic mock projects when backend is offline
4. **API prefix**: All backend routes prefixed with `/api` (e.g., `/api/projects`)
5. **No Clerk yet**: Admin pages created but auth guard not implemented — will add when Clerk keys are available

---

## Known Issues / Blockers

1. Database not started — needs Docker Desktop running + `docker compose up -d` for PostgreSQL + Redis + ChromaDB.
2. Migrations need to be run against the live database (once Docker runs PostgreSQL).

---

## Next Steps

1. Start Docker Desktop and run `docker compose up -d`
2. Run database migrations to set up schema (`.venv\Scripts\alembic revision --autogenerate -m "init tables"` then `.venv\Scripts\alembic upgrade head`)
3. Run uvicorn backend server
4. Run Next.js frontend dev server
5. Connect frontend to live backend API
6. Deploy to Vercel + Railway
