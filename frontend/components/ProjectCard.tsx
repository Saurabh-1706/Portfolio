"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

const STATUS_STYLES: Record<string, string> = {
  completed: "text-success",
  "in-progress": "text-warning",
  archived: "text-text-tertiary",
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <Link href={`/projects/${project.slug}`}>
        <div className="group bg-bg-secondary rounded-xl p-5 hover:bg-bg-primary hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] border border-transparent hover:border-border-default transition-all duration-200 cursor-pointer">
          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="text-xs text-accent font-medium uppercase tracking-wide">
                {project.category}
                {project.featured ? " · Featured" : ""}
              </span>
              <h3 className="text-base font-medium text-text-primary mt-1 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
            </div>
            {project.github_stars > 0 && (
              <span className="text-xs text-text-tertiary font-mono flex items-center gap-1">
                ★ {project.github_stars}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2">
            {project.short_desc}
          </p>

          {/* Footer: Tech tags + Status */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {project.tech_stack?.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-bg-tertiary text-text-secondary border border-border-default"
                >
                  {tag}
                </span>
              ))}
              {(project.tech_stack?.length ?? 0) > 4 && (
                <span className="text-xs text-text-tertiary">
                  +{(project.tech_stack?.length ?? 0) - 4}
                </span>
              )}
            </div>
            <span
              className={`text-xs font-medium ${
                STATUS_STYLES[project.status] || ""
              }`}
            >
              {project.status === "in-progress" ? "In progress" : ""}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
