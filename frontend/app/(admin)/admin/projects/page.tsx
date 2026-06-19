import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/api";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";

export const metadata: Metadata = {
  title: "Projects — Admin",
};

export default async function AdminProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-medium text-white mb-1">Projects</h1>
          <p className="text-sm text-gray-500">{projects.length} total</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors"
          style={{ background: "#7c3aed" }}
        >
          + New Project
        </Link>
      </div>

      {/* Table */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 border-b text-xs font-medium uppercase tracking-wider text-gray-600"
          style={{ borderColor: "rgba(255,255,255,0.04)", background: "#0e0e0e" }}
        >
          <div className="col-span-5">Title</div>
          <div className="col-span-2">Category</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-center">★</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Rows */}
        {projects.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="text-gray-600 text-sm mb-3">No projects yet.</p>
            <Link
              href="/admin/projects/new"
              className="text-sm text-[#a78bfa] hover:underline"
            >
              Add your first project →
            </Link>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-12 gap-4 px-5 py-4 border-b last:border-b-0 hover:bg-[#111111] transition-colors items-center"
              style={{ borderColor: "rgba(255,255,255,0.04)" }}
            >
              {/* Title */}
              <div className="col-span-5 flex items-center gap-3 min-w-0">
                <div className="min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    {project.title}
                  </p>
                  <p className="text-xs text-gray-600 font-mono truncate">
                    /{project.slug}
                  </p>
                </div>
                {project.featured && (
                  <span className="text-[10px] text-[#a78bfa] bg-[#2e1065] px-1.5 py-0.5 rounded flex-shrink-0">
                    featured
                  </span>
                )}
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="text-xs font-mono text-gray-500">
                  {project.category || "—"}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span
                  className={`text-xs px-2 py-0.5 rounded-md font-mono ${
                    project.status === "completed"
                      ? "text-[#4ade80] bg-[#052e16]"
                      : project.status === "in-progress"
                      ? "text-[#fbbf24] bg-[#451a03]"
                      : "text-gray-500 bg-[#1a1a1a]"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              {/* Stars */}
              <div className="col-span-1 text-center">
                <span className="text-xs text-gray-600 font-mono">
                  {project.github_stars || 0}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="text-xs text-gray-600 hover:text-gray-300 transition-colors"
                  title="View live"
                >
                  ↗
                </Link>
                <Link
                  href={`/admin/projects/${project.id}`}
                  className="text-xs px-2.5 py-1 rounded border text-gray-400 hover:text-white transition-colors"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                >
                  Edit
                </Link>
                <DeleteProjectButton
                  projectId={project.id}
                  projectTitle={project.title}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
