import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/api";
import AdminActions from "@/components/admin/AdminActions";

export const metadata: Metadata = {
  title: "Dashboard — Admin",
};

export default async function DashboardPage() {
  const projects = await getProjects();
  const featuredCount = projects.filter((p) => p.featured).length;
  const completedCount = projects.filter((p) => p.status === "completed").length;
  const inProgressCount = projects.filter(
    (p) => p.status === "in-progress"
  ).length;

  const stats = [
    {
      label: "Total Projects",
      value: projects.length,
      sub: `${featuredCount} featured`,
      color: "#a78bfa",
      href: "/admin/projects",
    },
    {
      label: "Completed",
      value: completedCount,
      sub: "shipped to production",
      color: "#4ade80",
      href: "/admin/projects",
    },
    {
      label: "In Progress",
      value: inProgressCount,
      sub: "currently building",
      color: "#fbbf24",
      href: "/admin/projects",
    },
    {
      label: "Blog Posts",
      value: 1, // Seeding added 1
      sub: "Phase 4 — draft available",
      color: "#60a5fa",
      href: "/admin/blog",
    },
  ];

  const recentProjects = projects.slice(0, 5);

  return (
    <div className="max-w-4xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-white mb-1">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Portfolio CMS — Phase 3 Terminal & Sync Complete
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl p-5 border transition-all hover:border-[rgba(255,255,255,0.12)]"
            style={{
              background: "#111111",
              borderColor: "rgba(255,255,255,0.06)",
            }}
          >
            <p
              className="text-3xl font-mono font-medium mb-1"
              style={{ color: stat.color }}
            >
              {stat.value}
            </p>
            <p className="text-sm font-medium text-white mb-0.5">
              {stat.label}
            </p>
            <p className="text-xs text-gray-600">{stat.sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="mb-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-600 mb-4">
          Quick actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ background: "#7c3aed" }}
          >
            <span>+</span> New Project
          </Link>
          <Link
            href="/admin/projects"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 border transition-colors hover:text-white"
            style={{ borderColor: "rgba(255,255,255,0.1)", background: "#1a1a1a" }}
          >
            View all projects
          </Link>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 border transition-colors hover:text-white"
            style={{ borderColor: "rgba(255,255,255,0.1)", background: "#1a1a1a" }}
          >
            View live site ↗
          </a>
        </div>
      </div>

      {/* System actions */}
      <div className="mb-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-600 mb-4">
          System Actions
        </h2>
        <AdminActions />
      </div>

      {/* Recent projects */}
      <div>
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-600 mb-4">
          Recent projects
        </h2>
        <div
          className="rounded-xl border overflow-hidden"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {recentProjects.map((project, i) => (
            <div
              key={project.id}
              className="flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-[#161616] transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-4 min-w-0">
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-mono flex-shrink-0 ${
                    project.status === "completed"
                      ? "text-[#4ade80] bg-[#052e16]"
                      : project.status === "in-progress"
                      ? "text-[#fbbf24] bg-[#451a03]"
                      : "text-gray-500 bg-[#1a1a1a]"
                  }`}
                >
                  {project.status}
                </span>
                <span className="text-sm text-white truncate">
                  {project.title}
                </span>
                {project.featured && (
                  <span className="text-xs text-[#a78bfa] bg-[#2e1065] px-2 py-0.5 rounded-md flex-shrink-0">
                     featured
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                <span className="text-xs text-gray-600 font-mono hidden sm:block">
                  {project.category}
                </span>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-xs text-gray-500 hover:text-[#a78bfa] transition-colors"
                >
                  Edit →
                </Link>
              </div>
            </div>
          ))}
          {projects.length === 0 && (
            <div className="px-5 py-10 text-center">
              <p className="text-sm text-gray-600">No projects yet.</p>
              <Link
                href="/admin/projects/new"
                className="text-sm text-[#a78bfa] hover:underline mt-2 inline-block"
              >
                Add your first project →
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Build phases */}
      <div className="mt-10">
        <h2 className="text-xs font-medium uppercase tracking-widest text-gray-600 mb-4">
          Build progress
        </h2>
        <div className="space-y-2">
          {[
            { phase: "Phase 1", label: "Foundation + CMS", done: true },
            { phase: "Phase 2", label: "AI Chatbot (RAG)", done: true },
            { phase: "Phase 3", label: "Terminal + GitHub", done: true },
            { phase: "Phase 4", label: "Playground + Polish", done: false },
          ].map((phase) => (
            <div
              key={phase.phase}
              className="flex items-center gap-4 px-4 py-3 rounded-lg"
              style={{ background: "#111111" }}
            >
              <span
                className={`text-sm font-mono ${
                  phase.done ? "text-[#4ade80]" : "text-gray-600"
                }`}
              >
                {phase.done ? "✓" : "○"}
              </span>
              <span className="text-xs font-medium text-gray-500 w-16 flex-shrink-0">
                {phase.phase}
              </span>
              <span
                className={`text-sm ${
                  phase.done ? "text-white" : "text-gray-600"
                }`}
              >
                {phase.label}
              </span>
              {phase.done && (
                <span className="ml-auto text-xs text-[#4ade80] bg-[#052e16] px-2 py-0.5 rounded-md">
                  active
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

