"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Availability badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Available for opportunities
          </span>
        </div>

        {/* Role title */}
        <h1 className="text-5xl md:text-[56px] font-medium text-text-primary leading-[1.1] mb-4">
          Full-Stack AI Engineer
        </h1>

        {/* Description */}
        <p className="text-lg text-text-secondary max-w-xl leading-relaxed mb-8">
          I build AI-powered systems — RAG pipelines, multi-agent workflows,
          and the full-stack infrastructure that runs them in production.
        </p>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/projects"
            className="px-5 py-2.5 rounded-lg bg-text-primary text-bg-primary text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View projects
          </Link>
          <button className="px-5 py-2.5 rounded-lg border border-border-default text-sm text-text-secondary hover:bg-bg-secondary hover:border-border-emphasis transition-all cursor-pointer">
            Chat with AI ✦
          </button>
        </div>
      </motion.div>
    </section>
  );
}
