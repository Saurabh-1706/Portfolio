import type { Metadata } from "next";
import Link from "next/link";
import ProjectForm from "@/components/admin/ProjectForm";

export const metadata: Metadata = {
  title: "New Project — Admin",
};

export default function NewProjectPage() {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/admin/projects"
          className="text-sm text-gray-600 hover:text-gray-300 transition-colors"
        >
          ← Projects
        </Link>
        <span className="text-gray-700">/</span>
        <h1 className="text-xl font-medium text-white">New Project</h1>
      </div>

      <ProjectForm />
    </div>
  );
}
