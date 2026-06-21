"use client";

import { motion } from "framer-motion";
import type { RepoStatItem } from "@/lib/types";

interface RepoCardProps {
  repo: RepoStatItem;
  index: number;
}

export default function RepoCard({ repo, index }: RepoCardProps) {
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
      <a
        href={repo.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group h-full bg-bg-secondary rounded-xl p-5 hover:bg-bg-primary hover:shadow-[0_1px_3px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] border border-transparent hover:border-border-default transition-all duration-200 cursor-pointer"
      >
        <div className="flex flex-col h-full justify-between">
          <div>
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-base font-semibold text-text-primary group-hover:text-accent transition-colors break-words max-w-[80%]">
                {repo.name}
              </h3>
              <div className="flex items-center gap-2 text-xs font-mono text-text-tertiary">
                <span className="flex items-center gap-0.5">
                  ★ {repo.stars}
                </span>
                <span className="flex items-center gap-0.5">
                  ⑂ {repo.forks}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-text-secondary leading-relaxed mb-4 line-clamp-3">
              {repo.description || "No description provided."}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-2">
            {repo.primary_language && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{
                    backgroundColor: repo.primary_language === "TypeScript" ? "#3178c6" :
                                     repo.primary_language === "JavaScript" ? "#f1e05a" :
                                     repo.primary_language === "Python" ? "#3572A5" :
                                     repo.primary_language === "Go" ? "#00ADD8" :
                                     repo.primary_language === "HTML" ? "#e34c26" :
                                     repo.primary_language === "CSS" ? "#563d7c" : "#858585"
                  }}
                />
                {repo.primary_language}
              </span>
            )}
            <span className="text-xs text-accent font-medium group-hover:underline flex items-center gap-1">
              View on GitHub
              <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </div>
        </div>
      </a>
    </motion.div>
  );
}
