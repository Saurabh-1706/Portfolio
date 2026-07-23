import type { Project, GithubStats, ContributionDayItem, Skill, ResumeEntry, Blog } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ──────────────────────────────────────────────
// Mock Data (used when backend is not running)
// ──────────────────────────────────────────────

const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    title: "RAG Knowledge Assistant",
    slug: "rag-knowledge-assistant",
    short_desc:
      "An intelligent Retrieval-Augmented Generation system enabling accurate Q&A over documents using LangChain, OpenAI, and vector databases.",
    full_desc:
      "An intelligent RAG system that enables accurate question answering over documents using LangChain, OpenAI, and vector databases. Upload any document and ask questions in natural language — the system retrieves the most relevant context and streams an accurate, grounded answer.\n\n## Key Features\n- Document ingestion with intelligent chunking\n- Semantic vector search with ChromaDB\n- Streaming LLM responses with source citations\n- OpenAI text-embedding-3-small for embeddings\n- FastAPI backend with Next.js frontend",
    tech_stack: ["LangChain", "OpenAI", "ChromaDB", "TypeScript", "FastAPI"],
    category: "AI",
    github_url: "https://github.com/Saurabh-1706/rag-knowledge-assistant",
    live_demo_url: null,
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 0,
    github_languages: { TypeScript: 60, Python: 35, CSS: 5 },
    architecture_diagram: null,
    challenges:
      "Balancing retrieval precision with recall. Tuning chunk size and overlap for optimal context quality required extensive experimentation.",
    lessons_learned:
      "Chunking strategy is the most critical factor in RAG quality — more so than model choice. Overlapping chunks significantly improve answer coherence.",
    metrics: { latency: "~200ms", accuracy: "92%", docs: "any format" },
    status: "completed",
    sort_order: 0,
    created_at: "2026-06-22T16:01:53Z",
    updated_at: "2026-07-22T14:05:15Z",
  },
  {
    id: "2",
    title: "AgentSQL",
    slug: "agent-sql",
    short_desc:
      "Natural-language SQL agent platform. Connect any database, ask questions in plain English, and get paginated results — powered by a streaming LLM pipeline.",
    full_desc:
      "Natural-language SQL agent platform. Connect any database, ask questions in plain English, and get both a concise answer and a paginated, interactive table — powered by a streaming LLM pipeline with a real-time stage view.\n\n## Architecture\n- Natural language to SQL translation via LLM\n- Real-time streaming with stage visualization\n- Supports PostgreSQL, MySQL, SQLite\n- Paginated, sortable result tables\n- Schema introspection for accurate query generation",
    tech_stack: ["TypeScript", "LangChain", "OpenAI", "PostgreSQL", "Next.js"],
    category: "AI",
    github_url: "https://github.com/Saurabh-1706/AgentSQL",
    live_demo_url: null,
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 0,
    github_languages: { TypeScript: 70, Python: 25, CSS: 5 },
    architecture_diagram: null,
    challenges:
      "Generating syntactically correct SQL across different database dialects while keeping latency low. Schema-aware prompting dramatically improved accuracy.",
    lessons_learned:
      "Providing schema context in the system prompt is non-negotiable for SQL generation accuracy. Few-shot examples for edge cases reduced hallucinations by 60%.",
    metrics: { query_accuracy: "89%", latency: "~350ms", dbs: "3 supported" },
    status: "completed",
    sort_order: 1,
    created_at: "2026-06-22T05:57:34Z",
    updated_at: "2026-06-22T06:06:55Z",
  },
  {
    id: "3",
    title: "IntelliTrack",
    slug: "intellitrack",
    short_desc:
      "AI-powered GitHub issue management system that auto-triages, labels, and suggests resolutions for incoming tickets using LLM classification.",
    full_desc:
      "An AI-powered GitHub issue management platform that automatically triages, classifies, and suggests resolutions for incoming tickets. The system hooks into GitHub webhooks, classifies issue severity and category using an LLM, and routes tickets to the appropriate team.\n\n## Features\n- GitHub webhook integration\n- Automatic issue classification and labeling\n- LLM-powered resolution suggestions\n- Priority scoring based on impact analysis\n- Slack notifications for critical issues",
    tech_stack: ["TypeScript", "Next.js", "OpenAI", "GitHub API", "PostgreSQL"],
    category: "AI",
    github_url: "https://github.com/Saurabh-1706/AI_github_ticket_system",
    live_demo_url: "https://git-intellisolve.vercel.app/",
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 0,
    github_languages: { TypeScript: 75, CSS: 15, JavaScript: 10 },
    architecture_diagram: null,
    challenges:
      "Accurately classifying ambiguous GitHub issues with minimal context. Fine-tuning prompts for each issue category improved precision significantly.",
    lessons_learned:
      "Webhook reliability and idempotency are critical for production issue trackers. Building retry logic from day one saved significant debugging time.",
    metrics: { classification_accuracy: "87%", response_time: "<5s", issues_processed: "500+" },
    status: "completed",
    sort_order: 2,
    created_at: "2025-12-29T13:58:14Z",
    updated_at: "2026-06-26T06:06:22Z",
  },
  {
    id: "4",
    title: "AI Workout Tracker",
    slug: "ai-workout-tracker",
    short_desc:
      "Smart fitness tracking app built with React Native and Sanity.io — logs workouts, tracks progress, and provides intelligent insights.",
    full_desc:
      "A smart fitness tracking app built with React Native and Sanity.io that helps users log workouts, track progress, and receive intelligent insights. Features exercise logging, set tracking (reps, weight, completion), workout duration, and user activity stats — all managed with a clean UI.\n\n## Key Features\n- Exercise logging with sets, reps, and weight tracking\n- AI-powered workout insights and recommendations\n- Progress visualization with charts\n- Sanity.io CMS for exercise library management\n- Cross-platform iOS and Android support",
    tech_stack: ["React Native", "TypeScript", "Sanity.io", "Expo", "OpenAI"],
    category: "fullstack",
    github_url: "https://github.com/Saurabh-1706/Ai_workout_tracker",
    live_demo_url: null,
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 1,
    github_languages: { TypeScript: 80, JavaScript: 15, CSS: 5 },
    architecture_diagram: null,
    challenges:
      "Syncing offline workout data with the cloud CMS reliably. Implementing optimistic updates with conflict resolution improved UX dramatically.",
    lessons_learned:
      "Mobile users expect instant feedback. Optimistic updates paired with background sync is the gold standard for fitness apps.",
    metrics: { platforms: "iOS + Android", exercises: "200+", sync_latency: "<2s" },
    status: "completed",
    sort_order: 3,
    created_at: "2025-07-20T14:02:11Z",
    updated_at: "2026-07-09T05:31:41Z",
  },
  {
    id: "5",
    title: "FitSaaS",
    slug: "fitsaas",
    short_desc:
      "Full-stack gym management SaaS built with Next.js and MongoDB — handles member registration, subscriptions, attendance, and payments.",
    full_desc:
      "FitSaaS is a full-stack gym management SaaS built with Next.js and MongoDB to streamline member registration, subscriptions, attendance, and payments. Provides an intuitive dashboard for admins and users to manage gym operations efficiently.\n\n## Features\n- Member registration and profile management\n- Subscription and payment tracking\n- Attendance management with check-in/out\n- Admin dashboard with analytics\n- Role-based access control",
    tech_stack: ["Next.js", "TypeScript", "MongoDB", "Tailwind CSS", "Clerk"],
    category: "fullstack",
    github_url: "https://github.com/Saurabh-1706/Gym_management_system",
    live_demo_url: "https://gymsphere-hub.vercel.app/",
    image_url: null,
    video_url: null,
    featured: true,
    github_stars: 0,
    github_languages: { TypeScript: 70, CSS: 20, JavaScript: 10 },
    architecture_diagram: null,
    challenges:
      "Managing complex subscription states (active, paused, expired) across a distributed system with payment webhooks.",
    lessons_learned:
      "State machines are invaluable for modeling subscription lifecycles. Explicit state transitions prevented many edge-case bugs.",
    metrics: { members: "500+", uptime: "99.9%", payment_methods: "3" },
    status: "completed",
    sort_order: 4,
    created_at: "2025-09-15T12:26:25Z",
    updated_at: "2026-06-28T13:45:42Z",
  },
  {
    id: "6",
    title: "Portfolio CMS Platform",
    slug: "portfolio-cms",
    short_desc:
      "This very portfolio — a production-grade CMS with AI chatbot, terminal mode, GitHub analytics, and live project playground.",
    full_desc:
      "A production-grade developer portfolio with an integrated headless CMS. Features include an AI recruiter chatbot powered by RAG, a terminal interface for exploring the portfolio, GitHub analytics dashboard, and live project demos. Built with Next.js and FastAPI.",
    tech_stack: ["Next.js", "FastAPI", "PostgreSQL", "LangChain", "Tailwind CSS"],
    category: "fullstack",
    github_url: "https://github.com/Saurabh-1706/Portfolio",
    live_demo_url: null,
    image_url: null,
    video_url: null,
    featured: false,
    github_stars: 0,
    github_languages: { TypeScript: 55, Python: 35, CSS: 10 },
    architecture_diagram: null,
    challenges:
      "Building a system that serves both as a portfolio AND demonstrates engineering skills simultaneously. Every feature needed to be both functional and impressive.",
    lessons_learned:
      "The best portfolio projects are ones you actually use. Building a CMS for yourself ensures you maintain and improve it continuously.",
    metrics: { lighthouse: "96", build_time: "18s", pages: "15+" },
    status: "in-progress",
    sort_order: 5,
    created_at: "2026-06-19T06:02:34Z",
    updated_at: "2026-06-21T14:55:13Z",
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
    total_stars: 1,
    total_repos: 10,
    total_commits_12mo: 180,
    current_streak_days: 5,
    top_languages: [
      { name: "TypeScript", percent: 72.0 },
      { name: "Python", percent: 22.0 },
      { name: "CSS", percent: 4.0 },
      { name: "JavaScript", percent: 2.0 }
    ]
  },
  contribution_calendar: [],
  repos: [
    {
      name: "rag-knowledge-assistant",
      full_name: "Saurabh-1706/rag-knowledge-assistant",
      description: "An intelligent RAG system enabling accurate Q&A over documents using LangChain, OpenAI, and vector databases.",
      url: "https://github.com/Saurabh-1706/rag-knowledge-assistant",
      primary_language: "TypeScript",
      stars: 0,
      forks: 0,
      pushed_at: "2026-07-22T14:02:35Z"
    },
    {
      name: "AgentSQL",
      full_name: "Saurabh-1706/AgentSQL",
      description: "Natural-language SQL agent platform. Connect any database, ask questions in plain English, and get paginated results.",
      url: "https://github.com/Saurabh-1706/AgentSQL",
      primary_language: "TypeScript",
      stars: 0,
      forks: 0,
      pushed_at: "2026-06-22T06:06:50Z"
    },
    {
      name: "AI_github_ticket_system",
      full_name: "Saurabh-1706/AI_github_ticket_system",
      description: "AI-powered GitHub issue management — auto-triage, label, and suggest resolutions for incoming tickets.",
      url: "https://github.com/Saurabh-1706/AI_github_ticket_system",
      primary_language: "TypeScript",
      stars: 0,
      forks: 0,
      pushed_at: "2026-06-26T06:06:18Z"
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

