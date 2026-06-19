/**
 * API client for communicating with the FastAPI backend.
 * Falls back to mock data when the backend is unavailable.
 */
import type { Project } from "./types";

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
