import type { Metadata } from "next";
import ProjectsGrid from "./ProjectsGrid";
import { getProjects } from "@/lib/api";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Explore AI, full-stack, cloud, and ML projects — each with architecture breakdowns, challenges, and live demos.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-20">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-accent mb-2 block">
          Portfolio
        </span>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary leading-[1.1] mb-3">
          All projects
        </h1>
        <p className="text-base text-text-secondary max-w-xl leading-relaxed">
          Systems I&apos;ve designed and built — from AI pipelines to cloud
          infrastructure. Click any project for the full case study.
        </p>
      </div>

      {/* Client component handles filtering and rendering */}
      <ProjectsGrid initialProjects={projects} />
    </div>
  );
}
