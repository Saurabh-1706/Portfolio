"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// Project placeholder images — cycling through Stitch design images
const FALLBACK_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC97AW2-tM7mFfLT336s8IRdn9WRTgrqS_6E9p6mU9CCQUnB5yKZDR_EpkvC6tzHLOTAs8wI7ryn26eu_0ZlndLBoXSH9ubo4zjyNnkhX4BeLxdYuOQLgPR3KLLGw5JUy1E5R9bK3JkTeyH-A1EDKxoEbuqw9EY5-XxD2LUzx7aNQ1vM-3tZB-40cIJ4ol9yg5BsUPCoIWK0CCsnLCgVrAagb8TqcJwwLWGVDmDefmOINmu-H8Jnbonm7WO0lVajCsDc-ObOss9XSyR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrzefzaSzAQWAWtiJrB6nE5H7k2mGaDD8y88Mk4b-D7Tgxju4VfQyp6-BEjULqGbtBUxt78IpLqhEX_-dtuBA_fWdg9NsgeP5dDQbDO8JC3j_wvvppPizRfv6a0-zSdOBdXBYaELibY7qcrHWCPDcjcCxhepjd6ZA5BkWDmRTWjaaDftMaw982T8f4vuVpbmS-kVVvWPlt2vzJ6SfJZ689_q4DjZibQNEjVLWPPOSEHd0uePjUiZIE_hpBVdrZK3dQFbahCy_s80o",
];

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const imageSrc = project.image_url || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const isFeatured = project.featured;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`h-full ${isFeatured ? "card-gradient-border" : ""}`}
    >
      <Link href={`/projects/${project.slug}`} className="block h-full">
        <div
          className={`group cursor-pointer h-[480px] flex flex-col rounded-xl overflow-hidden border transition-all duration-300 ${
            isFeatured
              ? "bg-bg-primary border-transparent"
              : "card-base hover:border-white/20"
          }`}
        >
          {/* Image area */}
          <div className="flex-1 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent z-10" />
            <img
              src={imageSrc}
              alt={project.title}
              className="object-cover w-full h-full opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
            />
          </div>

          {/* Content area */}
          <div className="p-6 md:p-8 relative z-20 bg-bg-primary border-t border-white/[0.06]">
            <div className="flex justify-between items-start mb-3">
              <div>
                {project.category && (
                  <span
                    className="text-[11px] uppercase tracking-[0.1em] text-accent mb-1 block"
                    style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
                  >
                    {project.category}
                    {project.featured ? " · Featured" : ""}
                  </span>
                )}
                <h3 className="text-[22px] font-semibold text-text-primary leading-tight tracking-tight">
                  {project.title}
                </h3>
              </div>
              {/* Arrow icon */}
              <span className="text-text-tertiary group-hover:text-accent transition-colors ml-3 mt-1 flex-shrink-0 text-lg">
                ↗
              </span>
            </div>

            <p className="text-sm text-text-secondary leading-relaxed mb-5 line-clamp-2">
              {project.short_desc}
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap gap-1.5 items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stack?.slice(0, 3).map((tag) => (
                  <span key={tag} className="tech-chip">
                    {tag}
                  </span>
                ))}
                {(project.tech_stack?.length ?? 0) > 3 && (
                  <span className="tech-chip bg-bg-elevated">
                    +{(project.tech_stack?.length ?? 0) - 3}
                  </span>
                )}
              </div>

              {project.github_stars > 0 && (
                <span
                  className="text-xs text-text-tertiary flex items-center gap-1"
                  style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
                >
                  ★ {project.github_stars}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
