# AI Portfolio + CMS — Complete Project Blueprint

> A production-grade, AI-powered developer portfolio with a headless CMS backend.  
> Built to feel like a startup product, not a student website.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Full Feature List](#2-full-feature-list)
3. [Tech Stack](#3-tech-stack)
4. [UI Style & Design System](#4-ui-style--design-system)
5. [System Architecture](#5-system-architecture)
6. [Database Schema](#6-database-schema)
7. [Feature Implementation Guide](#7-feature-implementation-guide)
   - 7.1 [AI Recruiter Chatbot](#71-ai-recruiter-chatbot)
   - 7.2 [Terminal Interface Mode](#72-terminal-interface-mode)
   - 7.3 [GitHub Analytics Dashboard](#73-github-analytics-dashboard)
   - 7.4 [Live Project Playground](#74-live-project-playground)
   - 7.5 [Admin CMS Dashboard](#75-admin-cms-dashboard)
   - 7.6 [Dynamic Project Pages](#76-dynamic-project-pages)
   - 7.7 [Blog System](#77-blog-system)
   - 7.8 [Personalized Recruiter Mode](#78-personalized-recruiter-mode)
   - 7.9 [Real-Time Deployment Status](#79-real-time-deployment-status)
   - 7.10 [Build Timeline](#710-build-timeline)
8. [Folder Structure](#8-folder-structure)
9. [API Endpoints](#9-api-endpoints)
10. [Environment Variables](#10-environment-variables)
11. [Deployment Guide](#11-deployment-guide)
12. [Development Phases & Timeline](#12-development-phases--timeline)
13. [Performance & SEO Checklist](#13-performance--seo-checklist)
14. [Future Enhancements](#14-future-enhancements)

---

## 1. Project Overview

### What is this?

A fully dynamic, database-driven developer portfolio with a built-in CMS admin panel. Instead of hardcoding projects into source files, everything lives in a PostgreSQL database. You manage content through a protected admin dashboard — add a project once, and it instantly appears on the live site.

On top of the CMS, an AI layer powers a recruiter chatbot, project summaries, and semantic search — all trained on your actual resume, projects, and GitHub activity.

### Goals

- **Recruiter experience**: Answer "why hire you?" within 30 seconds, without reading a resume.
- **Engineering signal**: Every feature demonstrates a real system-building skill.
- **Zero-friction updates**: Add new projects via the admin panel, no code deploys needed.
- **AI-first**: Chatbot, semantic search, auto-summaries — not bolted on, but central.

### Target Roles

- AI / ML Engineer
- Full-Stack Engineer
- Backend / API Engineer
- DevOps / Cloud Engineer

---

## 2. Full Feature List

### Core Portfolio Features

| Feature | Priority | Complexity |
|---|---|---|
| Dynamic project cards (CMS-powered) | Must Have | Low |
| Individual project case study pages | Must Have | Medium |
| AI Recruiter Chatbot (RAG) | Must Have | High |
| Terminal Interface Mode | Must Have | Medium |
| GitHub Analytics Dashboard | Must Have | Medium |
| Live Project Playground | Must Have | High |
| Admin CMS Dashboard | Must Have | High |
| Blog / Technical Writing (MDX) | Should Have | Medium |
| Build Timeline | Should Have | Low |
| Personalized Recruiter Mode | Should Have | High |
| Real-Time Deployment Status | Should Have | Medium |
| AI Voice Agent | Nice to Have | High |
| 3D Interactive Elements | Nice to Have | High |
| Easter Eggs (Konami code, hidden commands) | Nice to Have | Low |
| Real-Time Visitor Analytics | Nice to Have | Medium |
| Dark / Light / Hacker theme modes | Should Have | Low |
| AI Resume Optimizer | Nice to Have | High |
| Open Source Contributions section | Should Have | Low |
| Performance Dashboard (Lighthouse) | Should Have | Low |

---

## 3. Tech Stack

### Frontend

| Tool | Purpose | Why |
|---|---|---|
| **Next.js 14** (App Router) | Framework | SSR, SSG, API routes, file-based routing |
| **Tailwind CSS** | Styling | Rapid UI, responsive by default |
| **Framer Motion** | Animations | Smooth transitions, scroll effects |
| **React Three Fiber** | 3D elements | Neural network / particle effects |
| **Recharts** | Data charts | GitHub stats, contribution graphs |
| **xterm.js** | Terminal UI | Full in-browser terminal emulator |
| **MDX** | Blog rendering | Write in Markdown, render React components |
| **shadcn/ui** | UI components | Accessible, unstyled component primitives |

### Backend

| Tool | Purpose | Why |
|---|---|---|
| **FastAPI** | REST API | Fast, async, Python, great for AI integrations |
| **Pydantic v2** | Data validation | Type-safe request/response models |
| **SQLAlchemy** | ORM | PostgreSQL async queries |
| **Alembic** | DB migrations | Schema versioning |
| **Redis** | Caching | GitHub API cache, session store |
| **Celery** | Background tasks | GitHub sync, AI summary generation |

### AI / ML

| Tool | Purpose | Why |
|---|---|---|
| **LangChain** | RAG pipeline | Document loading, retrieval, chaining |
| **LangGraph** | Agent workflows | Multi-step AI reasoning flows |
| **OpenAI API** | Embeddings + LLM | `text-embedding-3-small`, `gpt-4o` |
| **ChromaDB** | Vector database | Store and query project embeddings |
| **ElevenLabs** | Voice synthesis | AI voice agent feature |
| **Whisper API** | Speech-to-text | Voice input for chatbot |

### Database & Storage

| Tool | Purpose |
|---|---|
| **PostgreSQL** | Primary database (projects, blogs, skills, analytics) |
| **ChromaDB** | Vector store (resume, project embeddings) |
| **Cloudinary** | Image and video hosting |
| **Redis** | Cache layer + rate limiting |

### Auth & Admin

| Tool | Purpose |
|---|---|
| **Clerk** | Authentication for admin panel |
| **NextAuth.js** | Alternative if staying in JS ecosystem |
| **JWT** | Token-based API auth |

### DevOps & Deployment

| Tool | Purpose |
|---|---|
| **Vercel** | Frontend deployment (Next.js) |
| **Railway** | Backend + database hosting (FastAPI + PostgreSQL + Redis) |
| **GitHub Actions** | CI/CD pipeline |
| **Docker** | Local development containers |
| **Cloudflare** | DNS, CDN, DDoS protection |

---

## 4. UI Style & Design System

### Chosen Style: Premium Minimal

The portfolio uses a **Premium Minimal** design language — clean white surfaces, sharp typography, generous whitespace. Think Vercel, Linear, or Notion's own site. This style is timeless, loads fast, and lets the AI features stand out rather than competing with the aesthetic.

Two other styles were considered and deliberately rejected:

| Style | Why rejected |
|---|---|
| Dark terminal / hacker | Trendy now, dated in 12–18 months. Alienates non-developer recruiters. |
| AI ops dashboard (deep navy) | Features blend into the dark aesthetic and look decorative rather than functional. |

**The rule**: Premium Minimal as the base. Monospace and dark accents used *surgically* — only in the terminal component, code blocks, tech stack tags, and deployment status widget.

---

### Color Palette

```
Primary background    #ffffff  (white)
Secondary background  #f9fafb  (off-white surface, cards)
Tertiary background   #f3f4f6  (page bg, input fills)

Primary text          #0f0f0f  (near black)
Secondary text        #6b7280  (muted labels, descriptions)
Tertiary text         #9ca3af  (hints, placeholders)

Border default        rgba(0,0,0,0.08)   (0.5px — almost invisible)
Border emphasis       rgba(0,0,0,0.16)   (hover states)

Accent — purple       #7c3aed  (primary CTA, active states, links)
Accent — purple light #ede9fe  (badge fills, tag backgrounds)
Accent — purple dark  #5b21b6  (hover on CTAs)

Success green         #16a34a  (availability dot, uptime indicators)
Success green light   #dcfce7  (badge fill)

Info blue             #2563eb  (GitHub stats, info badges)
Info blue light       #dbeafe  (badge fill)

Warning amber         #d97706  (in-progress status)
Warning amber light   #fef3c7  (badge fill)

-- Terminal / mono accents (used only in specific components) --
Terminal bg           #0e0e0e
Terminal text         #e0e0e0
Terminal green        #4ade80  (prompt, online status)
Terminal purple       #a78bfa  (active nav item)
Terminal border       #2a2a2a
```

---

### Typography

```
Primary font      Inter (or Geist — Next.js default)
Monospace font    JetBrains Mono (terminal, code blocks, tech tags)

-- Scale --
Hero heading      56px / 500 weight / line-height 1.1
Section heading   36px / 500 weight / line-height 1.2
Card title        18px / 500 weight / line-height 1.3
Body              15px / 400 weight / line-height 1.7
Small / label     13px / 400 weight / line-height 1.5
Eyebrow           11px / 500 weight / letter-spacing 0.08em / uppercase
Code / mono       13px / JetBrains Mono

-- Usage rules --
- Never use font-weight 600 or 700 — too heavy, use 500 for bold
- Sentence case everywhere — no ALL CAPS except eyebrow labels
- Max line length: 65 characters for body text (use max-width: 640px)
```

---

### Spacing System

```
Base unit: 4px

4px   — xs  (icon gaps, tight inline spacing)
8px   — sm  (between label and value, tag padding)
12px  — md  (card internal gap, between related elements)
16px  — lg  (card padding, section internal gap)
24px  — xl  (between cards in a grid)
40px  — 2xl (section padding top/bottom)
80px  — 3xl (major section breaks)
```

---

### Component Patterns

#### Navigation

```tsx
// Minimal top nav — no background, no shadow
// Sticks to top on scroll with backdrop blur (only acceptable blur use)

<nav className="sticky top-0 z-50 backdrop-blur-sm border-b border-black/5">
  <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
    <span className="text-sm font-medium">saurabh.dev</span>
    <div className="flex items-center gap-6">
      <a className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Projects</a>
      <a className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Blog</a>
      <a className="text-sm text-gray-500 hover:text-gray-900 transition-colors">About</a>
      <button className="text-sm px-3 py-1.5 rounded-md border border-black/10 hover:bg-gray-50">
        Chat with AI ✦
      </button>
    </div>
  </div>
</nav>
```

#### Hero Section

```tsx
// Clean, centered, no decorative noise
// Availability dot + role eyebrow → big name → one-liner → two CTAs

<section className="max-w-5xl mx-auto px-6 pt-24 pb-20">
  <div className="flex items-center gap-2 mb-6">
    <span className="w-2 h-2 rounded-full bg-green-500" />
    <span className="text-xs font-medium uppercase tracking-widest text-gray-400">
      Available for opportunities
    </span>
  </div>
  <h1 className="text-5xl font-medium text-gray-950 leading-tight mb-4">
    Full-Stack AI Engineer
  </h1>
  <p className="text-lg text-gray-500 max-w-xl leading-relaxed mb-8">
    I build AI-powered systems — RAG pipelines, multi-agent workflows,
    and the full-stack infrastructure that runs them in production.
  </p>
  <div className="flex items-center gap-3">
    <button className="px-5 py-2.5 rounded-lg bg-gray-950 text-white text-sm font-medium hover:bg-gray-800 transition-colors">
      View projects
    </button>
    <button className="px-5 py-2.5 rounded-lg border border-black/10 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
      Chat with AI ✦
    </button>
  </div>
</section>
```

#### Project Cards

```tsx
// Flat card — secondary bg, no border on default, subtle border on hover
// Tech stack tags in monospace — the ONE place mono appears outside terminal

<div className="group bg-gray-50 rounded-xl p-5 hover:bg-white hover:border hover:border-black/8 transition-all cursor-pointer">
  <div className="flex items-start justify-between mb-3">
    <div>
      <span className="text-xs text-purple-600 font-medium uppercase tracking-wide">AI · Featured</span>
      <h3 className="text-base font-medium text-gray-900 mt-1">LangGraph Incident Copilot</h3>
    </div>
    <span className="text-xs text-gray-400 font-mono">★ 142</span>
  </div>
  <p className="text-sm text-gray-500 leading-relaxed mb-4">
    Multi-agent DevOps assistant that triages incidents, queries runbooks,
    and drafts resolution steps autonomously.
  </p>
  <div className="flex flex-wrap gap-1.5">
    {['LangGraph', 'FastAPI', 'ChromaDB', 'React'].map(tag => (
      <span className="text-xs font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-500 border border-black/5">
        {tag}
      </span>
    ))}
  </div>
</div>
```

#### Terminal Component

```tsx
// The ONE component that breaks from minimal — full dark treatment
// Sits inside a minimal page as a contained, purposeful block

<div className="rounded-xl overflow-hidden border border-black/8">
  {/* macOS-style traffic lights header */}
  <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
    <span className="ml-3 text-xs text-gray-500 font-mono">portfolio — bash</span>
  </div>
  {/* Terminal body */}
  <div className="bg-[#0e0e0e] p-5 font-mono text-sm min-h-64">
    <p className="text-gray-500 mb-4">Welcome to saurabh.dev. Type `help` to start.</p>
    <div className="flex items-center gap-2">
      <span className="text-[#4ade80]">~</span>
      <span className="text-[#a78bfa]">portfolio</span>
      <span className="text-gray-500">$</span>
      <span className="text-gray-200 ml-1">help</span>
    </div>
  </div>
</div>
```

#### Metric / Status Cards

```tsx
// Used for: GitHub stats, deployment status, visitor analytics
// Dark card variant — mono font, green dot for online

<div className="bg-[#0e0e0e] rounded-lg p-4 border border-white/5">
  <div className="flex items-center gap-2 mb-1">
    <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
    <span className="text-xs text-gray-500 font-mono uppercase tracking-widest">live</span>
  </div>
  <p className="text-2xl font-mono font-medium text-white">142ms</p>
  <p className="text-xs text-gray-600 mt-1">avg response time</p>
</div>
```

#### AI Chatbot UI

```tsx
// Minimal chat bubble style — no heavy chrome
// User messages right-aligned gray, AI messages left-aligned white card

<div className="max-w-2xl mx-auto space-y-4">
  {/* AI message */}
  <div className="flex gap-3">
    <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
      <span className="text-xs text-purple-700">✦</span>
    </div>
    <div className="bg-white border border-black/8 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-gray-700 leading-relaxed max-w-md">
      Saurabh has built 3 AI projects using RAG architecture...
    </div>
  </div>
  {/* User message */}
  <div className="flex justify-end">
    <div className="bg-gray-900 rounded-xl rounded-tr-sm px-4 py-3 text-sm text-white max-w-sm">
      What AI projects has he built?
    </div>
  </div>
</div>
```

---

### Tailwind Config

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['Inter', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      colors: {
        accent: {
          DEFAULT: '#7c3aed',
          light:   '#ede9fe',
          dark:    '#5b21b6',
        },
        terminal: {
          bg:     '#0e0e0e',
          border: '#2a2a2a',
          green:  '#4ade80',
          purple: '#a78bfa',
          text:   '#e0e0e0',
        },
      },
      borderRadius: {
        xl:  '12px',
        '2xl': '16px',
      },
      maxWidth: {
        content: '65ch',
        layout:  '1100px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

### Animation Rules (Framer Motion)

```
-- What to animate --
✅ Page entry fade-in (opacity 0→1, y 16→0, duration 0.4s)
✅ Card hover lift (y -2px, shadow subtle)
✅ Staggered project cards (0.05s delay per card)
✅ Terminal cursor blink (CSS only — no JS)
✅ AI chat streaming text appearance
✅ Section headings on scroll (whileInView, once: true)

-- What NOT to animate --
❌ Background particles or mesh
❌ Continuous looping animations on the hero
❌ Page transitions (too slow, hurts perceived performance)
❌ Hover effects on every element (overwhelming)
❌ 3D transforms on cards

-- Standard enter animation --
initial={{ opacity: 0, y: 16 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
```

---

### Dark Mode

The portfolio uses **system dark mode** only (`prefers-color-scheme`). No manual toggle needed — keep it simple.

In dark mode, the minimal theme inverts cleanly:

```
Background primary    #0a0a0a
Background secondary  #111111
Background tertiary   #1a1a1a
Border default        rgba(255,255,255,0.06)
Text primary          #f0f0f0
Text secondary        #9ca3af
Text tertiary         #4b5563
Accent purple         #a78bfa  (lighter in dark for contrast)
```

The terminal component looks **identical** in both modes since it already uses hardcoded dark colors.

---

### Page-by-Page Style Notes

| Page | Style notes |
|---|---|
| Homepage | White bg, hero full-width, project cards in 2-col grid, no decorative elements |
| `/projects` | Filter bar (category pills), masonry or equal-height card grid |
| `/projects/[slug]` | Editorial layout, max-width 720px, architecture diagram full-width, metrics in dark cards |
| `/blog` | List layout — date + title + read time, no cover images on the list |
| `/blog/[slug]` | Prose-focused, max-width 680px, syntax highlighted code blocks |
| `/terminal` | Full dark page — the ONE page that breaks the minimal rule entirely |
| `/admin` | Functional dashboard, no decorative styling, data density over whitespace |

---

## 5. System Architecture

```
Recruiter / Visitor (Browser)
         │
         ▼
  Next.js Frontend (Vercel)
  ┌──────────────────────────────┐
  │  AI Chatbot UI               │
  │  Terminal Mode               │
  │  GitHub Dashboard            │
  │  Live Playground             │
  │  Blog (MDX)                  │
  │  Project Case Study Pages    │
  └─────────────┬────────────────┘
                │ REST API calls
                ▼
     FastAPI Backend (Railway)
  ┌──────────────────────────────┐
  │  /projects  CRUD             │
  │  /chat      RAG endpoint     │
  │  /github    analytics sync   │
  │  /blogs     MDX management   │
  │  /admin     protected routes │
  └────┬──────────┬──────────────┘
       │          │
  ┌────▼───┐  ┌───▼────────┐
  │Postgres│  │  ChromaDB  │
  │Projects│  │  Embeddings│
  │Blogs   │  │  Resume    │
  │Skills  │  │  Projects  │
  └────────┘  └────────────┘
       │
  ┌────▼──────┐   ┌──────────────┐
  │  Redis    │   │  Cloudinary  │
  │  Cache    │   │  Images/Vids │
  └───────────┘   └──────────────┘
       │
  ┌────▼────────────────────────┐
  │  AI Layer                   │
  │  LangChain · LangGraph      │
  │  OpenAI · ElevenLabs        │
  └─────────────────────────────┘
       │
  ┌────▼────────────────────────┐
  │  Admin CMS (protected)      │
  │  Clerk Auth                 │
  │  Add / Edit / Delete        │
  │  GitHub Auto-Sync           │
  │  AI Summary Generator       │
  └─────────────────────────────┘
```

---

## 6. Database Schema

### `projects` table

```sql
CREATE TABLE projects (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,             -- URL: /projects/langchain-copilot
  short_desc      TEXT,                             -- One-liner for cards
  full_desc       TEXT,                             -- Markdown for case study page
  tech_stack      TEXT[],                           -- ['LangGraph', 'FastAPI', 'React']
  category        TEXT,                             -- 'AI', 'fullstack', 'cloud', 'ml'
  github_url      TEXT,
  live_demo_url   TEXT,
  image_url       TEXT,                             -- Cloudinary URL
  video_url       TEXT,                             -- Loom / YouTube embed
  featured        BOOLEAN DEFAULT false,
  github_stars    INT DEFAULT 0,
  github_languages JSONB,                           -- {"Python": 72, "TypeScript": 28}
  architecture_diagram TEXT,                        -- Cloudinary URL or Mermaid string
  challenges      TEXT,                             -- Markdown
  lessons_learned TEXT,                             -- Markdown
  metrics         JSONB,                            -- {"latency": "120ms", "users": 500}
  status          TEXT DEFAULT 'completed',         -- 'completed', 'in-progress', 'archived'
  sort_order      INT DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);
```

### `blogs` table

```sql
CREATE TABLE blogs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  summary     TEXT,
  content     TEXT,                                 -- MDX string
  tags        TEXT[],
  cover_image TEXT,
  published   BOOLEAN DEFAULT false,
  views       INT DEFAULT 0,
  read_time   INT,                                  -- minutes
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);
```

### `skills` table

```sql
CREATE TABLE skills (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  category    TEXT,                                 -- 'AI', 'backend', 'frontend', 'cloud'
  proficiency INT CHECK (proficiency BETWEEN 1 AND 5),
  icon_url    TEXT,
  sort_order  INT DEFAULT 0
);
```

### `timeline` table

```sql
CREATE TABLE timeline (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year        INT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  type        TEXT,                                 -- 'work', 'project', 'learning', 'achievement'
  sort_order  INT DEFAULT 0
);
```

### `analytics` table

```sql
CREATE TABLE analytics (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page        TEXT NOT NULL,
  project_id  UUID REFERENCES projects(id),
  country     TEXT,
  referrer    TEXT,
  visited_at  TIMESTAMPTZ DEFAULT now()
);
```

---

## 7. Feature Implementation Guide

---

### 7.1 AI Recruiter Chatbot

**What it does**: Recruiters type natural language questions. The chatbot answers using your resume, project descriptions, and GitHub data — with citations.

**Example interactions**:
- *"What AI projects has Saurabh built?"*
- *"Explain the RAG architecture in his copilot project."*
- *"What cloud technologies does he know?"*

**How to build it**:

**Step 1 — Prepare the knowledge base**

Collect these documents:
- Your resume (PDF or text)
- All project descriptions, architecture notes, and lessons learned
- Your blog posts
- Your GitHub README files

**Step 2 — Embed and store in ChromaDB**

```python
# scripts/ingest.py
from langchain.document_loaders import PyPDFLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma

docs = []
docs += PyPDFLoader("resume.pdf").load()
docs += TextLoader("projects.md").load()

splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
chunks = splitter.split_documents(docs)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vectorstore = Chroma.from_documents(chunks, embeddings, persist_directory="./chroma_db")
```

**Step 3 — Build the RAG endpoint**

```python
# app/routes/chat.py
from fastapi import APIRouter
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA

router = APIRouter()

@router.post("/chat")
async def chat(question: str):
    llm = ChatOpenAI(model="gpt-4o", streaming=True)
    retriever = vectorstore.as_retriever(search_kwargs={"k": 5})
    chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever)
    return StreamingResponse(chain.astream(question))
```

**Step 4 — Stream responses in Next.js**

```typescript
// Frontend: stream tokens as they arrive
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ question }),
});
const reader = response.body?.getReader();
// Append chunks to UI as they stream in
```

**Upgrades**:
- Add conversation memory with `ConversationBufferMemory`
- Add source citations by returning `source_documents` from the chain
- Add voice input via Whisper + voice output via ElevenLabs

---

### 7.2 Terminal Interface Mode

**What it does**: A styled terminal on the portfolio where visitors type commands to explore your profile.

**Commands to implement**:

```
> help          — list all commands
> projects      — list all projects with links
> projects ai   — filter by category
> skills        — show skills by category
> resume        — open resume PDF
> contact       — show contact info
> github        — open GitHub profile
> experience    — show work history
> blog          — list blog posts
> clear         — clear terminal
> whoami        — fun intro about you
> easter        — 🥚 hidden easter egg
```

**How to build it**:

Use `xterm.js` for a real terminal feel, or build a custom component:

```tsx
// components/Terminal.tsx
const [history, setHistory] = useState<string[]>(['Welcome. Type `help` to start.']);
const [input, setInput] = useState('');

const handleCommand = async (cmd: string) => {
  const args = cmd.trim().toLowerCase().split(' ');
  switch (args[0]) {
    case 'projects':
      const projects = await fetch('/api/projects').then(r => r.json());
      setHistory(prev => [...prev, formatProjects(projects)]);
      break;
    case 'skills':
      // fetch and render skills
      break;
    // ... other commands
  }
};
```

**Styling**: Use a monospace font (`JetBrains Mono`), dark background (`#0d0d0d`), green or amber text. Add a blinking cursor CSS animation.

**Autocomplete**: Store a command registry array, filter on `Tab` keypress.

**Easter eggs**:
- Konami code (`↑↑↓↓←→←→BA`) triggers a special animation
- `sudo hire saurabh` returns a funny output
- `rm -rf /` returns `Nice try.`

---

### 7.3 GitHub Analytics Dashboard

**What it does**: Live widget showing your GitHub activity — contributions, top languages, repo stats, commit heatmap.

**How to build it**:

**Step 1 — Fetch from GitHub API**

```python
# app/routes/github.py
import httpx, os
from fastapi import APIRouter

router = APIRouter()
GH_TOKEN = os.getenv("GITHUB_TOKEN")
GH_USER  = os.getenv("GITHUB_USERNAME")

@router.get("/github/stats")
async def github_stats():
    headers = {"Authorization": f"Bearer {GH_TOKEN}"}
    async with httpx.AsyncClient() as client:
        repos = await client.get(
            f"https://api.github.com/users/{GH_USER}/repos?per_page=100",
            headers=headers
        )
        user  = await client.get(
            f"https://api.github.com/users/{GH_USER}",
            headers=headers
        )
    return {
        "repos": repos.json(),
        "profile": user.json(),
        "total_stars": sum(r["stargazers_count"] for r in repos.json()),
    }
```

**Step 2 — Cache with Redis** (GitHub API rate limit: 5000 req/hr)

```python
import redis.asyncio as redis

r = redis.from_url(os.getenv("REDIS_URL"))

async def get_cached_github():
    cached = await r.get("github_stats")
    if cached:
        return json.loads(cached)
    data = await fetch_github_stats()
    await r.setex("github_stats", 3600, json.dumps(data))  # 1hr cache
    return data
```

**Step 3 — Render in Next.js**

```tsx
// Use GitHub's contribution graph SVG embed (no API needed):
<img src={`https://ghchart.rshah.org/${username}`} alt="Contribution graph" />

// Or use recharts for language breakdown:
<PieChart>
  <Pie data={languages} dataKey="percentage" nameKey="language" />
</PieChart>
```

**What to display**:
- Total stars across all repos
- Top 5 repositories (by stars)
- Language breakdown (pie chart)
- Contribution heatmap
- Total commits, PRs, issues

---

### 7.4 Live Project Playground

**What it does**: Recruiters interact with your actual AI projects directly in the browser — no setup required.

**Examples**:

| Demo | What recruiters do |
|---|---|
| RAG PDF Chat | Upload any PDF, ask questions about it |
| AI Agent | Type a task, watch the LangGraph agent execute steps |
| Text Summarizer | Paste an article, get a structured summary |
| Code Reviewer | Paste code, get AI feedback |

**How to build it**:

Each demo is a FastAPI endpoint + a React UI widget:

```python
# app/routes/playground.py
@router.post("/playground/pdf-chat")
async def pdf_chat(file: UploadFile, question: str):
    content = await file.read()
    # Load into temp ChromaDB collection
    # Run RAG query
    # Return streamed answer
    ...
```

```tsx
// components/playground/PDFChat.tsx
export function PDFChatDemo() {
  const [file, setFile] = useState<File | null>(null);
  const [answer, setAnswer] = useState('');

  const handleAsk = async (question: string) => {
    const form = new FormData();
    form.append('file', file!);
    form.append('question', question);
    const res = await fetch('/api/playground/pdf-chat', {
      method: 'POST', body: form
    });
    // stream response into `answer`
  };
  // render file upload + chat UI
}
```

**Rate limit** playground endpoints with Redis to prevent abuse:
```python
# Max 10 requests per IP per hour
```

---

### 7.5 Admin CMS Dashboard

**What it does**: A protected `/admin` route where you manage all portfolio content without touching code.

**Pages in the admin**:

```
/admin                  — dashboard overview (counts, recent activity)
/admin/projects         — list all projects
/admin/projects/new     — add project form
/admin/projects/[id]    — edit project
/admin/blogs            — list blogs
/admin/blogs/new        — write blog (MDX editor)
/admin/skills           — manage skills list
/admin/timeline         — manage timeline entries
/admin/analytics        — view visitor analytics
```

**Auth with Clerk**:

```tsx
// middleware.ts (Next.js)
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/projects(.*)", "/blog(.*)"],
  ignoredRoutes: ["/api/public(.*)"],
});
```

**Add Project Form fields**:
- Title, Slug (auto-generated), Short description
- Full description (MDX editor with preview)
- Tech stack (tag input)
- Category (dropdown: AI / Full Stack / Cloud / ML)
- GitHub URL → "Auto-Sync" button fetches stars + languages
- Live demo URL
- Image upload (→ Cloudinary)
- Video embed URL
- Featured toggle
- Architecture diagram upload
- Challenges, Lessons learned (Markdown textareas)
- Metrics (key-value pairs)
- Status (Completed / In Progress / Archived)

**GitHub Auto-Sync** (on button click):
```python
@router.post("/admin/projects/{id}/sync-github")
async def sync_github(id: UUID, github_url: str):
    repo = github_url.split("github.com/")[-1]
    data = await fetch_github_repo(repo)
    await db.execute(
        "UPDATE projects SET github_stars=$1, github_languages=$2 WHERE id=$3",
        data["stars"], data["languages"], id
    )
```

**AI Summary Generator** (on project save):
```python
async def generate_summary(project: Project) -> str:
    prompt = f"""
    Write a 2-sentence recruiter-friendly summary of this project:
    Title: {project.title}
    Tech: {', '.join(project.tech_stack)}
    Description: {project.full_desc[:500]}
    """
    response = await openai.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content
```

---

### 7.6 Dynamic Project Pages

**What it does**: Each project gets its own deep-dive page at `/projects/[slug]`.

**Page structure**:

```
/projects/langchain-copilot

├── Hero — title, short desc, live demo + GitHub buttons
├── Tech Stack — icon grid
├── Problem Statement — what problem this solves
├── Architecture — diagram or animation
├── Screenshots / Video — Cloudinary media
├── Challenges Faced — what was hard
├── How I Solved It — key decisions
├── Metrics — latency, users, accuracy etc
├── Lessons Learned
└── Related Projects
```

**Next.js dynamic routing**:

```tsx
// app/projects/[slug]/page.tsx
export async function generateStaticParams() {
  const projects = await fetchAllProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const project = await fetchProject(params.slug);
  return <ProjectCaseStudy project={project} />;
}
```

---

### 7.7 Blog System

**What it does**: Technical writing section. Blogs are written in MDX, stored in the database, rendered with full React component support.

**How to build it**:

```tsx
// Render MDX stored in DB
import { MDXRemote } from 'next-mdx-remote/rsc';

export default function BlogPost({ content }) {
  return (
    <MDXRemote
      source={content}
      components={{ CodeBlock, Callout, ArchitectureDiagram }}
    />
  );
}
```

**Custom MDX components**:
- `<CodeBlock>` — syntax highlighted code with copy button
- `<Callout type="info">` — info / warning / tip boxes
- `<ArchitectureDiagram>` — render a Mermaid diagram inline
- `<Metric label="Latency" value="120ms">` — metric badges

**Auto-generate read time**:
```python
def read_time(content: str) -> int:
    words = len(content.split())
    return max(1, round(words / 200))  # 200 wpm average
```

---

### 7.8 Personalized Recruiter Mode

**What it does**: Detects what kind of role the visitor is interested in and dynamically reorders the homepage.

**How to build it**:

```tsx
// Detect from URL param: portfolio.saurabh.dev?for=ai
// Or from a landing modal asking the visitor's role

const params = useSearchParams();
const role = params.get('for'); // 'ai' | 'frontend' | 'backend' | 'fullstack'

const projectOrder = {
  ai:       ['langchain-copilot', 'rag-pipeline', 'langGraph-agent'],
  frontend: ['portfolio-cms', 'dashboard-ui', 'react-components'],
  backend:  ['fastapi-service', 'postgres-design', 'redis-cache'],
};

// Reorder featured projects based on role
const orderedProjects = role
  ? [...projects].sort((a, b) =>
      (projectOrder[role].indexOf(a.slug) ?? 99) -
      (projectOrder[role].indexOf(b.slug) ?? 99)
    )
  : projects;
```

**Shareable URLs**:
- `portfolio.dev?for=ai` — share with AI companies
- `portfolio.dev?for=backend` — share with backend teams

---

### 7.9 Real-Time Deployment Status

**What it does**: A live status widget showing your deployed projects are actually running.

```
● AI Copilot API          Online   142ms
● Portfolio Backend       Online    38ms
● RAG Playground          Online   280ms
● Blog Service            Online    61ms
```

**How to build it**:

```python
# app/routes/status.py
import httpx, asyncio

SERVICES = [
  {"name": "AI Copilot API",    "url": "https://copilot.railway.app/health"},
  {"name": "Portfolio Backend", "url": "https://api.railway.app/health"},
]

@router.get("/status")
async def get_status():
    async def ping(service):
        try:
            start = time.time()
            r = await httpx.AsyncClient().get(service["url"], timeout=5)
            latency = round((time.time() - start) * 1000)
            return {**service, "status": "online", "latency": latency}
        except:
            return {**service, "status": "offline", "latency": None}

    return await asyncio.gather(*[ping(s) for s in SERVICES])
```

**Frontend**: Poll every 60 seconds, show a pulsing green dot for online, red for offline.

---

### 7.10 Build Timeline

**What it does**: Visual chronological story of your learning and building journey.

**Data example**:

```json
[
  { "year": 2023, "title": "Started MERN Stack", "type": "learning" },
  { "year": 2024, "title": "Built first AI chatbot", "type": "project" },
  { "year": 2024, "title": "Joined XYZ as SDE Intern", "type": "work" },
  { "year": 2025, "title": "Built LangGraph multi-agent system", "type": "project" },
  { "year": 2026, "title": "Open sourced portfolio CMS", "type": "achievement" }
]
```

**Rendering**: A vertical timeline with alternating left/right cards. Color-code by type. Animate with Framer Motion on scroll (`whileInView`).

---

## 8. Folder Structure

```
portfolio/
├── frontend/                        # Next.js App
│   ├── app/
│   │   ├── (public)/
│   │   │   ├── page.tsx             # Homepage
│   │   │   ├── projects/
│   │   │   │   ├── page.tsx         # All projects
│   │   │   │   └── [slug]/page.tsx  # Case study
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   └── terminal/page.tsx
│   │   └── (admin)/
│   │       ├── layout.tsx           # Auth guard
│   │       ├── dashboard/page.tsx
│   │       ├── projects/page.tsx
│   │       └── blogs/page.tsx
│   ├── components/
│   │   ├── chat/                    # AI chatbot components
│   │   ├── terminal/                # Terminal emulator
│   │   ├── github/                  # GitHub dashboard widgets
│   │   ├── playground/              # Live demo components
│   │   ├── admin/                   # CMS form components
│   │   └── ui/                      # shadcn/ui primitives
│   └── lib/
│       ├── api.ts                   # API client
│       └── types.ts                 # TypeScript types
│
├── backend/                         # FastAPI App
│   ├── app/
│   │   ├── main.py
│   │   ├── models/                  # SQLAlchemy models
│   │   ├── routes/
│   │   │   ├── projects.py
│   │   │   ├── chat.py
│   │   │   ├── github.py
│   │   │   ├── blogs.py
│   │   │   ├── playground.py
│   │   │   ├── status.py
│   │   │   └── admin.py
│   │   ├── services/
│   │   │   ├── rag.py               # LangChain RAG pipeline
│   │   │   ├── embeddings.py        # ChromaDB operations
│   │   │   ├── github.py            # GitHub API service
│   │   │   └── ai_summary.py        # Auto-summary generation
│   │   └── core/
│   │       ├── config.py            # Settings + env vars
│   │       ├── database.py          # SQLAlchemy async setup
│   │       └── cache.py             # Redis client
│   ├── alembic/                     # DB migrations
│   ├── scripts/
│   │   └── ingest.py                # Embed resume + projects
│   ├── Dockerfile
│   └── requirements.txt
│
├── docker-compose.yml               # Local dev: postgres + redis + chroma
└── .github/
    └── workflows/
        ├── frontend.yml             # Deploy to Vercel
        └── backend.yml              # Deploy to Railway
```

---

## 9. API Endpoints

### Public endpoints

```
GET  /projects                    — list all projects (with filters: category, featured)
GET  /projects/{slug}             — single project detail
GET  /blogs                       — list published blogs
GET  /blogs/{slug}                — single blog post
GET  /skills                      — list skills by category
GET  /timeline                    — build journey timeline
GET  /github/stats                — cached GitHub analytics
GET  /status                      — deployment status of all services
POST /chat                        — AI chatbot (streaming)
POST /playground/pdf-chat         — RAG demo
POST /playground/summarize        — text summarize demo
```

### Admin endpoints (requires Clerk JWT)

```
POST   /admin/projects            — create project
PUT    /admin/projects/{id}       — update project
DELETE /admin/projects/{id}       — delete project
POST   /admin/projects/{id}/sync  — sync GitHub data
POST   /admin/blogs               — create blog
PUT    /admin/blogs/{id}          — update blog
POST   /admin/skills              — add skill
GET    /admin/analytics           — view visitor data
```

---

## 10. Environment Variables

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
```

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql+asyncpg://user:pass@host/db
REDIS_URL=redis://default:pass@host:6379
CHROMA_PERSIST_DIR=./chroma_db

OPENAI_API_KEY=sk-...
ELEVENLABS_API_KEY=...

GITHUB_TOKEN=ghp_...
GITHUB_USERNAME=yourusername

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

CLERK_SECRET_KEY=sk_live_...
ALLOWED_ORIGINS=https://yourdomain.com
```

---

## 11. Deployment Guide

### Frontend → Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# From /frontend directory
vercel --prod

# Set env vars in Vercel dashboard or:
vercel env add NEXT_PUBLIC_API_URL production
```

### Backend → Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and init
railway login
railway init

# Deploy
railway up

# Add PostgreSQL and Redis from Railway dashboard
# Copy connection strings into env vars
```

### Database migrations

```bash
# Run from /backend
alembic upgrade head
```

### Embed knowledge base (first-time setup)

```bash
# Run from /backend
python scripts/ingest.py
```

### GitHub Actions CI/CD

```yaml
# .github/workflows/backend.yml
name: Deploy Backend
on:
  push:
    branches: [main]
    paths: ['backend/**']
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: railwayapp/railway-github-action@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
```

---

## 12. Development Phases & Timeline

### Phase 1 — Foundation (Week 1–2)

- [ ] Set up Next.js 14 project with Tailwind + shadcn/ui
- [ ] Set up FastAPI backend with SQLAlchemy + PostgreSQL
- [ ] Run Alembic migrations for all tables
- [ ] Build admin dashboard with Clerk auth
- [ ] Implement project CRUD API
- [ ] Build dynamic project cards on homepage
- [ ] Deploy frontend to Vercel, backend to Railway

**Milestone**: Add a project in admin → appears on live site instantly.

### Phase 2 — AI Chatbot (Week 3–4)

- [ ] Prepare knowledge base documents (resume, project descriptions)
- [ ] Set up ChromaDB, run `ingest.py`
- [ ] Build LangChain RAG pipeline
- [ ] Create `/chat` streaming endpoint
- [ ] Build chatbot UI with streaming token display
- [ ] Add source citations from retrieved documents

**Milestone**: Recruiter can ask questions and get accurate answers about your work.

### Phase 3 — Terminal + GitHub (Week 5)

- [ ] Build terminal component with command registry
- [ ] Implement all commands with API integration
- [ ] Add autocomplete and command history
- [ ] Set up GitHub API integration with Redis cache
- [ ] Build GitHub dashboard widgets (stats, heatmap, language chart)
- [ ] Add GitHub auto-sync button to admin

**Milestone**: Terminal is usable, GitHub dashboard shows live stats.

### Phase 4 — Playground + Polish (Week 6)

- [ ] Build 2–3 live AI demos (PDF chat, summarizer, agent)
- [ ] Add rate limiting to playground endpoints
- [ ] Write first 2 blog posts
- [ ] Add build timeline section
- [ ] Add Framer Motion animations throughout
- [ ] Mobile responsiveness audit
- [ ] Lighthouse performance audit and fixes

**Milestone**: Full portfolio live, all features working, mobile-ready.

---

## 13. Performance & SEO Checklist

- [ ] Lighthouse score ≥ 90 across all categories
- [ ] Images served via Next.js `<Image>` (auto-optimization)
- [ ] Static pages (homepage, projects) use `generateStaticParams` for SSG
- [ ] API responses cached with Redis (GitHub stats: 1hr, projects: 5min)
- [ ] `robots.txt` and `sitemap.xml` generated dynamically
- [ ] OpenGraph + Twitter meta tags on every page
- [ ] JSON-LD schema markup on project pages
- [ ] Font loading with `next/font` (no layout shift)
- [ ] No unused JavaScript (check with `@next/bundle-analyzer`)
- [ ] Playground API endpoints rate-limited per IP

---

## 14. Future Enhancements

### AI Voice Agent
Use ElevenLabs for voice synthesis and OpenAI Whisper for speech-to-text. Recruiters can speak questions and hear answers in your voice style.

### Multi-Tenant SaaS
Allow other developers to create their own AI portfolios using your platform at `yourname.dev/create`. This turns your portfolio into a product — extremely strong in interviews.

### AI Resume Optimizer
Recruiter uploads a job description. Your AI scores your resume against it, highlights matching skills, and shows a relevance percentage.

### 3D Neural Network
React Three Fiber particle system on the hero section — subtle, not overwhelming. Represents your AI focus visually.

### Real-Time Visitor Analytics
Show live stats (visitors today, countries, most-viewed project) using WebSockets or Server-Sent Events. Makes the site feel alive.

---

*Last updated: 2026*  
*Built by: Saurabh*  
*Stack: Next.js · FastAPI · PostgreSQL · ChromaDB · LangChain · Vercel · Railway*
