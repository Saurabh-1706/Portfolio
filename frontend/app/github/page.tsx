import Link from "next/link";
import { getGithubStats } from "@/lib/api";
import ContributionHeatmap from "@/components/github/ContributionHeatmap";
import LanguageBreakdown from "@/components/github/LanguageBreakdown";
import RepoCard from "@/components/github/RepoCard";

// Next.js ISR - Revalidate every 2 hours (7200 seconds)
export const revalidate = 7200;

export default async function GithubPage() {
  const stats = await getGithubStats();

  const { summary, contribution_calendar, repos, last_synced_at } = stats;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Navigation */}
      <Link
        href="/"
        className="group inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent transition-colors mb-8 font-medium cursor-pointer"
      >
        <svg
          className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Home
      </Link>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-10 gap-3 border-b border-border-default pb-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight">
            GitHub Activity & Analytics
          </h1>
          <p className="text-sm text-text-secondary mt-2 leading-relaxed">
            Live-ish snapshot of my open-source code metrics, language distribution, and commits.
          </p>
        </div>
        {last_synced_at && (
          <span className="text-xs text-text-tertiary font-mono">
            Last synced: {new Date(last_synced_at).toLocaleTimeString(undefined, {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
            })}
          </span>
        )}
      </div>

      {/* Main Stats Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
        <div className="bg-bg-secondary border border-border-default rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
            Total Stars
          </span>
          <p className="text-2xl font-bold text-text-primary mt-2">
            ★ {summary.total_stars}
          </p>
        </div>

        <div className="bg-bg-secondary border border-border-default rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
            Current Streak
          </span>
          <p className="text-2xl font-bold text-accent mt-2">
            {summary.current_streak_days} days
          </p>
        </div>

        <div className="bg-bg-secondary border border-border-default rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
            Commits (12mo)
          </span>
          <p className="text-2xl font-bold text-text-primary mt-2">
            {summary.total_commits_12mo}
          </p>
        </div>

        <div className="bg-bg-secondary border border-border-default rounded-2xl p-5 shadow-sm">
          <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">
            Repositories
          </span>
          <p className="text-2xl font-bold text-text-primary mt-2">
            {summary.total_repos}
          </p>
        </div>
      </div>

      {/* Heatmap & Languages section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-2">
          <ContributionHeatmap calendar={contribution_calendar} />
        </div>
        <div>
          <LanguageBreakdown languages={summary.top_languages} />
        </div>
      </div>

      {/* Repositories Grid Section */}
      <div>
        <h2 className="text-xl font-bold text-text-primary mb-6">
          Featured Repositories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {repos.map((repo, idx) => (
            <RepoCard key={repo.full_name} repo={repo} index={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}
