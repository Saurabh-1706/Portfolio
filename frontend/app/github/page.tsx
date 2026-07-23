import Link from "next/link";
import { getGithubStats } from "@/lib/api";
import ContributionHeatmap from "@/components/github/ContributionHeatmap";
import LanguageBreakdown from "@/components/github/LanguageBreakdown";
import RepoCard from "@/components/github/RepoCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub Activity — Saurabh",
  description:
    "Live GitHub analytics: contribution heatmap, language breakdown, and featured repositories.",
};

// Next.js ISR — revalidate every 2 hours (matches sync interval)
export const revalidate = 7200;

export default async function GithubPage() {
  const stats = await getGithubStats();
  const { summary, contribution_calendar, repos, last_synced_at } = stats;

  const syncedTimeStr = last_synced_at
    ? new Date(last_synced_at).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : null;

  const statCards = [
    {
      label: "Total Stars",
      value: `★ ${summary.total_stars}`,
      sub: "across featured repos",
      colorHex: "#a78bfa",
      icon: "★",
    },
    {
      label: "Current Streak",
      value: `${summary.current_streak_days}d`,
      sub: "consecutive days",
      colorHex: "#4ade80",
      icon: "⚡",
    },
    {
      label: "Commits (12mo)",
      value: summary.total_commits_12mo.toLocaleString(),
      sub: "past 12 months",
      colorHex: "#60a5fa",
      icon: "↑",
    },
    {
      label: "Repositories",
      value: summary.total_repos.toString(),
      sub: "public repos tracked",
      colorHex: "#fbbf24",
      icon: "⑂",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Back navigation */}
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-accent transition-colors mb-10"
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
            fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="group-hover:underline">Back to Home</span>
        </Link>

        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-bg-secondary border border-border-default flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                GitHub Activity
              </h1>
              <p className="text-sm text-text-secondary mt-1">
                Live-ish snapshot of code metrics, language distribution &amp; commits.
              </p>
            </div>
          </div>
          {syncedTimeStr && (
            <div className="inline-flex items-center gap-2 text-xs font-mono px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-default text-text-tertiary flex-shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Synced {syncedTimeStr}
            </div>
          )}
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="relative rounded-2xl p-5 overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg bg-bg-secondary border border-border-default"
            >
              {/* Glow overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-[0.06]"
                style={{
                  background: `radial-gradient(ellipse at top left, ${card.colorHex}, transparent 65%)`,
                }}
              />
              <div className="relative">
                <div
                  className="text-xl mb-3 w-9 h-9 rounded-lg flex items-center justify-center font-mono"
                  style={{ background: `${card.colorHex}18`, color: card.colorHex }}
                >
                  {card.icon}
                </div>
                <p
                  className="text-2xl font-bold font-mono mb-0.5"
                  style={{ color: card.colorHex }}
                >
                  {card.value}
                </p>
                <p className="text-xs font-medium text-text-secondary">{card.label}</p>
                <p className="text-xs text-text-tertiary mt-0.5 opacity-70">{card.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Heatmap + Languages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <ContributionHeatmap calendar={contribution_calendar} />
          </div>
          <div>
            <LanguageBreakdown languages={summary.top_languages} />
          </div>
        </div>

        {/* Featured Repos */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              Featured Repositories
            </h2>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-bg-secondary border border-border-default text-text-tertiary">
              {repos.length} repos
            </span>
          </div>

          {repos.length === 0 ? (
            <div className="rounded-2xl p-12 text-center bg-bg-secondary border border-border-default">
              <p className="text-sm text-text-tertiary">
                No repositories synced yet. Trigger a GitHub sync from{" "}
                <Link href="/admin/dashboard" className="underline text-accent">
                  admin dashboard
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {repos.map((repo, idx) => (
                <RepoCard key={repo.full_name} repo={repo} index={idx} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-xs text-center mt-12 font-mono text-text-tertiary opacity-40">
          Synced every 6 h via GitHub GraphQL API · Cached in Redis · Never rate-limited
        </p>
      </div>
    </div>
  );
}



