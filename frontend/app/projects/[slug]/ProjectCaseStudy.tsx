"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCaseStudyProps {
  project: Project;
}

export default function ProjectCaseStudy({ project }: ProjectCaseStudyProps) {
  const fadeIn = {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  };

  return (
    <article className="max-w-[720px] mx-auto px-6 pt-12 pb-20">
      {/* Back link */}
      <motion.div {...fadeIn}>
        <Link
          href="/projects"
          className="text-sm text-text-secondary hover:text-text-primary transition-colors inline-flex items-center gap-1 mb-8"
        >
          ← All projects
        </Link>
      </motion.div>

      {/* Hero */}
      <motion.div
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.05 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium uppercase tracking-wide text-accent">
            {project.category}
          </span>
          <span className="text-xs text-text-tertiary">·</span>
          <span
            className={`text-xs font-medium ${
              project.status === "completed"
                ? "text-success"
                : project.status === "in-progress"
                ? "text-warning"
                : "text-text-tertiary"
            }`}
          >
            {project.status === "in-progress" ? "In progress" : project.status}
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-medium text-text-primary leading-[1.2] mb-3">
          {project.title}
        </h1>
        <p className="text-base text-text-secondary leading-relaxed mb-6">
          {project.short_desc}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-3 mb-10">
          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors"
            >
              Live demo ↗
            </a>
          )}
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg border border-border-default text-sm text-text-secondary hover:bg-bg-secondary transition-colors"
            >
              GitHub ↗
            </a>
          )}
          {project.github_stars > 0 && (
            <span className="text-xs text-text-tertiary font-mono">
              ★ {project.github_stars}
            </span>
          )}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        {...fadeIn}
        transition={{ ...fadeIn.transition, delay: 0.1 }}
        className="mb-10"
      >
        <h2 className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
          Tech stack
        </h2>
        <div className="flex flex-wrap gap-2">
          {project.tech_stack?.map((tech) => (
            <span
              key={tech}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-secondary text-text-secondary border border-border-default"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Full Description */}
      {project.full_desc && (
        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.15 }}
          className="mb-10"
        >
          <h2 className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
            Overview
          </h2>
          <div className="prose prose-sm max-w-none text-text-secondary leading-relaxed whitespace-pre-wrap">
            {project.full_desc}
          </div>
        </motion.div>
      )}

      {/* Metrics */}
      {project.metrics && Object.keys(project.metrics).length > 0 && (
        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.2 }}
          className="mb-10"
        >
          <h2 className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
            Metrics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Object.entries(project.metrics).map(([key, value]) => (
              <div
                key={key}
                className="bg-terminal-bg rounded-lg p-4 border border-[rgba(255,255,255,0.05)]"
              >
                <p className="text-xl font-mono font-medium text-white">
                  {value}
                </p>
                <p className="text-xs text-gray-500 mt-1 capitalize">{key}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* GitHub Languages */}
      {project.github_languages &&
        Object.keys(project.github_languages).length > 0 && (
          <motion.div
            {...fadeIn}
            transition={{ ...fadeIn.transition, delay: 0.25 }}
            className="mb-10"
          >
            <h2 className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
              Language breakdown
            </h2>
            <div className="space-y-2">
              {Object.entries(project.github_languages).map(([lang, pct]) => (
                <div key={lang} className="flex items-center gap-3">
                  <span className="text-sm text-text-secondary w-24 font-mono">
                    {lang}
                  </span>
                  <div className="flex-1 bg-bg-tertiary rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-accent h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-xs text-text-tertiary font-mono w-10 text-right">
                    {pct}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      {/* Challenges */}
      {project.challenges && (
        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.3 }}
          className="mb-10"
        >
          <h2 className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
            Challenges
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.challenges}
          </p>
        </motion.div>
      )}

      {/* Lessons Learned */}
      {project.lessons_learned && (
        <motion.div
          {...fadeIn}
          transition={{ ...fadeIn.transition, delay: 0.35 }}
          className="mb-10"
        >
          <h2 className="text-xs font-medium uppercase tracking-widest text-text-tertiary mb-3">
            Lessons learned
          </h2>
          <p className="text-sm text-text-secondary leading-relaxed">
            {project.lessons_learned}
          </p>
        </motion.div>
      )}
    </article>
  );
}
