import type { Project, GithubStats, ContributionDayItem, Skill, ResumeEntry, Blog } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ──────────────────────────────────────────────
// Mock Data (used when backend is not running)
// ──────────────────────────────────────────────

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "LangGraph Incident Copilot",
    slug: "langgraph-incident-copilot",
    short_desc:
      "Multi-agent DevOps assistant that triages incidents, queries runbooks, and drafts resolution steps autonomously.",
    full_desc:
      "A production-grade incident management system powered by LangGraph's multi-agent architecture. The system automatically classifies incoming incidents, retrieves relevant runbooks from a vector database, and orchestrates multiple AI agents to draft resolution steps. Built with FastAPI for the backend, React for the dashboard, and ChromaDB for semantic search over runbooks.\n\n## Architecture\n\nThe system uses a supervisor agent pattern where a central orchestrator delegates tasks to specialized agents:\n- **Triage Agent**: Classifies incident severity and category\n- **Runbook Agent**: Searches ChromaDB for relevant procedures\n- **Resolution Agent**: Drafts step-by-step resolution plans\n- **Communication Agent**: Generates stakeholder updates",
    tech_stack: ["LangGraph", "FastAPI", "ChromaDB", "React", "PostgreSQL"],
    category: "AI",
    github_url: "https://github.com/saurabh/langgraph-copilot",
    live_demo_url: "https://copilot.saurabh.dev",
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 142,
    github_languages: { Python: 65, TypeScript: 30, Shell: 5 },
    architecture_diagram: null,
    challenges:
      "Managing state across multiple AI agents was the biggest challenge. LangGraph's state machine approach solved this elegantly, but required careful design of the state schema.",
    lessons_learned:
      "Multi-agent systems need clear boundaries between agents. Over-decomposition leads to excessive inter-agent communication overhead.",
    metrics: { latency: "120ms", accuracy: "94%", users: "500+" },
    status: "completed",
    sort_order: 0,
    created_at: "2025-06-01T00:00:00Z",
    updated_at: "2025-08-15T00:00:00Z",
  },
  {
    id: "2",
    title: "RAG PDF Chat Engine",
    slug: "rag-pdf-chat",
    short_desc:
      "Upload any PDF and chat with it using a retrieval-augmented generation pipeline with source citations.",
    full_desc:
      "A full-stack RAG application that allows users to upload PDF documents and ask questions about them in natural language. The system chunks documents, creates embeddings using OpenAI's text-embedding-3-small, stores them in ChromaDB, and retrieves relevant context for each query.\n\n## Key Features\n- PDF upload and processing with intelligent chunking\n- Semantic search over document embeddings\n- Streaming responses with real-time token display\n- Source citations linking answers to specific document pages\n- Conversation memory for follow-up questions",
    tech_stack: ["LangChain", "FastAPI", "ChromaDB", "Next.js", "OpenAI"],
    category: "AI",
    github_url: "https://github.com/saurabh/rag-pdf-chat",
    live_demo_url: "https://pdf-chat.saurabh.dev",
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 89,
    github_languages: { Python: 58, TypeScript: 38, CSS: 4 },
    architecture_diagram: null,
    challenges:
      "Chunking strategy significantly impacts retrieval quality. Recursive character splitting with 500-token chunks and 50-token overlap gave the best results after extensive testing.",
    lessons_learned:
      "Embedding model choice matters less than chunking strategy. Also, streaming is essential for UX — users abandon if they wait more than 3 seconds for a response.",
    metrics: { latency: "280ms", chunks_per_doc: "~150", retrieval_accuracy: "91%" },
    status: "completed",
    sort_order: 1,
    created_at: "2025-04-01T00:00:00Z",
    updated_at: "2025-07-20T00:00:00Z",
  },
  {
    id: "3",
    title: "Portfolio CMS Platform",
    slug: "portfolio-cms",
    short_desc:
      "This very portfolio — a full-stack CMS with AI chatbot, terminal mode, and live project playground.",
    full_desc:
      "A production-grade developer portfolio with an integrated headless CMS. Features include an AI recruiter chatbot powered by RAG, a terminal interface for exploring the portfolio, GitHub analytics dashboard, and live project demos. Built with Next.js 14 and FastAPI.",
    tech_stack: ["Next.js", "FastAPI", "PostgreSQL", "LangChain", "Tailwind CSS"],
    category: "fullstack",
    github_url: "https://github.com/saurabh/portfolio-cms",
    live_demo_url: null,
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 67,
    github_languages: { TypeScript: 55, Python: 35, CSS: 10 },
    architecture_diagram: null,
    challenges:
      "Building a system that serves both as a portfolio AND demonstrates engineering skills simultaneously. Every feature needed to be both functional and impressive.",
    lessons_learned:
      "The best portfolio projects are ones you actually use. Building a CMS for yourself ensures you maintain and improve it continuously.",
    metrics: { lighthouse: "96", build_time: "18s", pages: "15+" },
    status: "in-progress",
    sort_order: 2,
    created_at: "2025-09-01T00:00:00Z",
    updated_at: "2026-05-31T00:00:00Z",
  },
  {
    id: "4",
    title: "Cloud Infrastructure Orchestrator",
    slug: "cloud-orchestrator",
    short_desc:
      "Terraform + Pulumi automation tool that provisions and manages multi-cloud infrastructure from a single dashboard.",
    full_desc:
      "A DevOps automation platform that simplifies multi-cloud infrastructure management. Users define their desired state through a visual dashboard, and the system generates and applies Terraform/Pulumi configurations automatically.",
    tech_stack: ["Go", "Terraform", "Pulumi", "React", "Docker", "AWS"],
    category: "cloud",
    github_url: "https://github.com/saurabh/cloud-orchestrator",
    live_demo_url: null,
    image_url: null,
    video_url: null,
    featured: false,
    github_stars: 34,
    github_languages: { Go: 60, TypeScript: 25, HCL: 15 },
    architecture_diagram: null,
    challenges: "Managing state drift between the dashboard representation and actual cloud resources required implementing a robust reconciliation loop.",
    lessons_learned: "Infrastructure as Code tools are powerful but need a UX layer for teams that don't want to write HCL all day.",
    metrics: { deploy_time: "~3min", clouds: "AWS, GCP, Azure" },
    status: "completed",
    sort_order: 3,
    created_at: "2025-02-01T00:00:00Z",
    updated_at: "2025-05-10T00:00:00Z",
  },
];

// ──────────────────────────────────────────────
// API Functions
// ──────────────────────────────────────────────

async function fetchWithFallback<T>(
  url: string,
  fallback: T
): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } }); // 5 min cache
    if (!res.ok) throw new Error(`API ${res.status}`);
    return await res.json();
  } catch {
    console.warn(`API unavailable, using mock data for: ${url}`);
    return fallback;
  }
}

export async function getProjects(
  category?: string,
  featured?: boolean
): Promise<Project[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (featured !== undefined) params.set("featured", String(featured));

  const queryStr = params.toString();
  const url = `${API_BASE}/api/projects${queryStr ? `?${queryStr}` : ""}`;

  let projects = await fetchWithFallback<Project[]>(url, MOCK_PROJECTS);

  // Apply filters to mock data too
  if (projects === MOCK_PROJECTS) {
    if (category) {
      projects = projects.filter((p) => p.category === category);
    }
    if (featured !== undefined) {
      projects = projects.filter((p) => p.featured === featured);
    }
  }

  return projects;
}

export async function getProject(slug: string): Promise<Project | null> {
  const url = `${API_BASE}/api/projects/${slug}`;
  const fallback = MOCK_PROJECTS.find((p) => p.slug === slug) || null;
  return fetchWithFallback<Project | null>(url, fallback);
}

const MOCK_GITHUB_STATS: GithubStats = {
  summary: {
    total_stars: 298,
    total_repos: 5,
    total_commits_12mo: 450,
    current_streak_days: 7,
    top_languages: [
      { name: "TypeScript", percent: 45.5 },
      { name: "Python", percent: 35.2 },
      { name: "Go", percent: 12.0 },
      { name: "CSS", percent: 7.3 }
    ]
  },
  contribution_calendar: [],
  repos: [
    {
      name: "langgraph-incident-copilot",
      full_name: "saurabh/langgraph-incident-copilot",
      description: "Multi-agent DevOps assistant that triages incidents, queries runbooks, and drafts resolution steps autonomously.",
      url: "https://github.com/saurabh/langgraph-incident-copilot",
      primary_language: "TypeScript",
      stars: 142,
      forks: 24,
      pushed_at: new Date().toISOString()
    },
    {
      name: "rag-pdf-chat",
      full_name: "saurabh/rag-pdf-chat",
      description: "Upload any PDF and chat with it using a retrieval-augmented generation pipeline with source citations.",
      url: "https://github.com/saurabh/rag-pdf-chat",
      primary_language: "Python",
      stars: 89,
      forks: 12,
      pushed_at: new Date().toISOString()
    },
    {
      name: "portfolio-cms",
      full_name: "saurabh/portfolio-cms",
      description: "This very portfolio — a full-stack CMS with AI chatbot, terminal mode, and live project playground.",
      url: "https://github.com/saurabh/portfolio-cms",
      primary_language: "TypeScript",
      stars: 67,
      forks: 8,
      pushed_at: new Date().toISOString()
    }
  ],
  last_synced_at: new Date().toISOString()
};

export async function getGithubStats(): Promise<GithubStats> {
  const url = `${API_BASE}/api/github/stats`;
  
  // Clone mock stats and fill the calendar dynamically
  const fallback = { ...MOCK_GITHUB_STATS };
  if (fallback.contribution_calendar.length === 0) {
    const calendar: ContributionDayItem[] = [];
    const today = new Date();
    // Go back 365 days
    for (let i = 365; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dayStr = d.toISOString().split("T")[0];
      // Generate some mock commits
      const rand = Math.random();
      let commitCount = 0;
      let intensityLevel = 0;
      if (rand > 0.7) {
        commitCount = Math.floor(Math.random() * 6) + 1;
        intensityLevel = commitCount > 4 ? 4 : commitCount;
      }
      calendar.push({
        day: dayStr,
        commit_count: commitCount,
        intensity_level: intensityLevel
      });
    }
    fallback.contribution_calendar = calendar;
  }

  return fetchWithFallback<GithubStats>(url, fallback);
}

// ──────────────────────────────────────────────
// Additional Mock Data
// ──────────────────────────────────────────────

const MOCK_SKILLS: Skill[] = [
  { id: "1", name: "LangChain", category: "AI / ML", proficiency: 5, icon_url: null, sort_order: 0 },
  { id: "2", name: "LangGraph", category: "AI / ML", proficiency: 5, icon_url: null, sort_order: 1 },
  { id: "3", name: "OpenAI API", category: "AI / ML", proficiency: 5, icon_url: null, sort_order: 2 },
  { id: "4", name: "ChromaDB", category: "AI / ML", proficiency: 4, icon_url: null, sort_order: 3 },
  { id: "5", name: "RAG Pipelines", category: "AI / ML", proficiency: 5, icon_url: null, sort_order: 4 },
  { id: "6", name: "Prompt Engineering", category: "AI / ML", proficiency: 4, icon_url: null, sort_order: 5 },
  
  { id: "7", name: "FastAPI", category: "Backend", proficiency: 5, icon_url: null, sort_order: 0 },
  { id: "8", name: "Python", category: "Backend", proficiency: 5, icon_url: null, sort_order: 1 },
  { id: "9", name: "PostgreSQL", category: "Backend", proficiency: 5, icon_url: null, sort_order: 2 },
  { id: "10", name: "Redis", category: "Backend", proficiency: 4, icon_url: null, sort_order: 3 },
  { id: "11", name: "SQLAlchemy", category: "Backend", proficiency: 4, icon_url: null, sort_order: 4 },
  { id: "12", name: "REST APIs", category: "Backend", proficiency: 5, icon_url: null, sort_order: 5 },

  { id: "13", name: "Next.js", category: "Frontend", proficiency: 4, icon_url: null, sort_order: 0 },
  { id: "14", name: "React", category: "Frontend", proficiency: 4, icon_url: null, sort_order: 1 },
  { id: "15", name: "TypeScript", category: "Frontend", proficiency: 4, icon_url: null, sort_order: 2 },
  { id: "16", name: "Tailwind CSS", category: "Frontend", proficiency: 5, icon_url: null, sort_order: 3 },
  { id: "17", name: "Framer Motion", category: "Frontend", proficiency: 3, icon_url: null, sort_order: 4 },

  { id: "18", name: "Docker", category: "Cloud / DevOps", proficiency: 4, icon_url: null, sort_order: 0 },
  { id: "19", name: "GitHub Actions", category: "Cloud / DevOps", proficiency: 4, icon_url: null, sort_order: 1 },
  { id: "20", name: "Vercel", category: "Cloud / DevOps", proficiency: 4, icon_url: null, sort_order: 2 },
  { id: "21", name: "Railway", category: "Cloud / DevOps", proficiency: 4, icon_url: null, sort_order: 3 },
  { id: "22", name: "AWS", category: "Cloud / DevOps", proficiency: 3, icon_url: null, sort_order: 4 },
  { id: "23", name: "CI/CD", category: "Cloud / DevOps", proficiency: 4, icon_url: null, sort_order: 5 }
];

const MOCK_RESUME: ResumeEntry[] = [
  {
    id: "1",
    entry_type: "work",
    title: "Senior Full-Stack Engineer",
    organization: "Innovate AI Tech",
    location: "Remote",
    start_date: "2024-01-01",
    end_date: null,
    description: "Led development of core SaaS dashboards using Next.js and FastAPI. Implemented vector database RAG pipelines that reduced customer support response times by 40%. Optimized SQL queries and database indexes, accelerating load times by 25%.",
    sort_order: 0,
    created_at: new Date().toISOString()
  },
  {
    id: "2",
    entry_type: "work",
    title: "Software Engineer",
    organization: "WebSolutions Corp",
    location: "New York, NY",
    start_date: "2022-06-15",
    end_date: "2023-12-31",
    description: "Built and maintained responsive react components. Developed REST APIs in Django. Collaborated with UI/UX designers to implement clean layouts. Managed CI/CD pipelines via GitHub Actions.",
    sort_order: 1,
    created_at: new Date().toISOString()
  },
  {
    id: "3",
    entry_type: "education",
    title: "Bachelor of Technology in Computer Science",
    organization: "Technical University",
    location: "Boston, MA",
    start_date: "2018-08-01",
    end_date: "2022-05-30",
    description: "Graduated with Honors. Specialization in Software Engineering and Database Management Systems.",
    sort_order: 2,
    created_at: new Date().toISOString()
  }
];

const MOCK_BLOGS: Blog[] = [
  {
    id: "1",
    title: "Building a Multi-Agent DevOps Copilot with LangGraph",
    slug: "multi-agent-devops-copilot-langgraph",
    summary: "A deep dive into orchestration, agent state coordination, and implementing reliable recovery loops in autonomous AI systems.",
    content: "Autonomous AI agents are transforming DevOps...",
    tags: ["LangGraph", "AI", "DevOps", "FastAPI"],
    cover_image: null,
    published: true,
    views: 142,
    read_time: 5,
    created_at: "2026-06-19T18:00:00Z",
    updated_at: "2026-06-19T18:00:00Z"
  }
];

// ──────────────────────────────────────────────
// API Fetching Functions
// ──────────────────────────────────────────────

export async function getSkills(): Promise<Skill[]> {
  const url = `${API_BASE}/api/skills`;
  return fetchWithFallback<Skill[]>(url, MOCK_SKILLS);
}

export async function getResume(): Promise<ResumeEntry[]> {
  const url = `${API_BASE}/api/resume`;
  return fetchWithFallback<ResumeEntry[]>(url, MOCK_RESUME);
}

export async function getBlogs(): Promise<Blog[]> {
  const url = `${API_BASE}/api/blogs`;
  return fetchWithFallback<Blog[]>(url, MOCK_BLOGS);
}

