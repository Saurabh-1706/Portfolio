import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/api";
import ProjectCaseStudy from "./ProjectCaseStudy";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.short_desc || `Case study: ${project.title}`,
    openGraph: {
      title: project.title,
      description: project.short_desc || undefined,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
