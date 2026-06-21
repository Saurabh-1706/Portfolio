"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { getGithubStats } from "@/lib/api";
import type { GithubStats } from "@/lib/types";

export default function GithubSummaryStrip() {
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGithubStats()
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching GitHub stats: ", err);
        setLoading(false);
      });
  }, []);

  const miniWeeks = useMemo(() => {
    if (!stats || !stats.contribution_calendar || stats.contribution_calendar.length === 0) {
      return [];
    }

    const calendar = stats.contribution_calendar;
    // Step 1: Pad so it starts on Sunday
    const paddedCalendar: (typeof calendar[0] | null)[] = [...calendar];
    const firstDayOfWeek = new Date(calendar[0].day).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      paddedCalendar.unshift(null);
    }

    // Step 2: Group into weeks
    const weeks: (typeof calendar[0] | null)[][] = [];
    for (let i = 0; i < paddedCalendar.length; i += 7) {
      weeks.push(paddedCalendar.slice(i, i + 7));
    }

    // Slice only the last 12 weeks for a compact preview
    return weeks.slice(-12);
  }, [stats]);

  if (loading) {
    return (
      <div className="w-full bg-bg-secondary border border-border-default rounded-2xl p-6 h-32 flex items-center justify-center animate-pulse">
        <span className="text-sm text-text-tertiary">Loading GitHub statistics...</span>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const { summary } = stats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Left Side: Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-grow">
          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
              Total Stars
            </span>
            <span className="text-2xl font-bold text-text-primary mt-1">
              ★ {summary.total_stars}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
              Active Streak
            </span>
            <span className="text-2xl font-bold text-accent mt-1">
              {summary.current_streak_days} days
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
              Commits (12mo)
            </span>
            <span className="text-2xl font-bold text-text-primary mt-1">
              {summary.total_commits_12mo}
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
              Public Repos
            </span>
            <span className="text-2xl font-bold text-text-primary mt-1">
              {summary.total_repos}
            </span>
          </div>
        </div>

        {/* Right Side: Mini Heatmap & CTA */}
        <div className="flex items-center gap-6 flex-shrink-0 justify-between sm:justify-start">
          {/* Mini Calendar */}
          <div className="hidden sm:flex gap-1 select-none border-l border-border-default pl-6">
            {miniWeeks.map((week, w_idx) => (
              <div key={w_idx} className="flex flex-col gap-1">
                {week.map((day, d_idx) => {
                  if (!day) {
                    return <div key={d_idx} className="w-2.5 h-2.5 bg-transparent" />;
                  }
                  return (
                    <div
                      key={day.day}
                      className={`w-2.5 h-2.5 rounded-sm ${
                        day.intensity_level === 0 ? "bg-bg-tertiary border border-border-default/40" :
                        day.intensity_level === 1 ? "bg-emerald-950/60" :
                        day.intensity_level === 2 ? "bg-emerald-800" :
                        day.intensity_level === 3 ? "bg-emerald-600" : "bg-emerald-400"
                      }`}
                      title={`${day.commit_count} commits on ${day.day}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Link to full page */}
          <Link href="/github">
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline cursor-pointer bg-bg-tertiary border border-border-default hover:bg-bg-secondary px-4 py-2.5 rounded-lg transition-all duration-150">
              View Activity
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
