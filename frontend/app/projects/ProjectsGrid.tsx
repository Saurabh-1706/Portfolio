"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import type { Project, ProjectCategory } from "@/lib/types";

const CATEGORIES: { label: string; value: string | null }[] = [
  { label: "All", value: null },
  { label: "AI", value: "AI" },
  { label: "Full Stack", value: "fullstack" },
  { label: "Cloud", value: "cloud" },
  { label: "ML", value: "ml" },
];

interface ProjectsGridProps {
  initialProjects: Project[];
}

export default function ProjectsGrid({ initialProjects }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? initialProjects.filter((p) => p.category === activeCategory)
    : initialProjects;

  return (
    <>
      {/* Category filter pills */}
      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActiveCategory(cat.value)}
            className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
              activeCategory === cat.value
                ? "bg-accent text-white border-accent"
                : "bg-transparent text-text-secondary border-border-default hover:border-border-emphasis hover:text-text-primary"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-text-secondary">
            No projects in this category yet.
          </p>
        </div>
      )}
    </>
  );
}
