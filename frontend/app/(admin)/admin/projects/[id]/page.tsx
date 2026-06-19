import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects } from "@/lib/api";
import ProjectForm from "@/components/admin/ProjectForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Project — Admin",
};

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ id: p.id }));
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;

  // Try to find by ID — since mock data uses string IDs like "1", "2"
  // and real data uses UUIDs, we handle both
  const allProjects = await getProjects();
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <Link
          href="/admin/projects"
          className="text-sm text-gray-600 hover:text-gray-300 transition-colors"
        >
          ← Projects
        </Link>
        <span className="text-gray-700">/</span>
        <h1 className="text-xl font-medium text-white">Edit Project</h1>
      </div>
      <p className="text-sm text-gray-600 mb-8 ml-[calc(1.25rem+0.75rem+0.75rem)]">
        {project.title}
      </p>

      <ProjectForm initialData={project} projectId={id} />
    </div>
  );
}
