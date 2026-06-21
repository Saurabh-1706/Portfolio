/**
 * TypeScript interfaces matching the backend database schema.
 */

export interface Project {
  id: string;
  title: string;
  slug: string;
  short_desc: string | null;
  full_desc: string | null;
  tech_stack: string[] | null;
  category: string | null;
  github_url: string | null;
  live_demo_url: string | null;
  image_url: string | null;
  video_url: string | null;
  featured: boolean;
  github_stars: number;
  github_languages: Record<string, number> | null;
  architecture_diagram: string | null;
  challenges: string | null;
  lessons_learned: string | null;
  metrics: Record<string, string> | null;
  status: "completed" | "in-progress" | "archived";
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  tags: string[] | null;
  cover_image: string | null;
  published: boolean;
  views: number;
  read_time: number | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string | null;
  proficiency: number | null;
  icon_url: string | null;
  sort_order: number;
}

export interface TimelineEntry {
  id: string;
  year: number;
  title: string;
  description: string | null;
  type: "work" | "project" | "learning" | "achievement" | null;
  sort_order: number;
}

export interface ServiceStatus {
  name: string;
  url: string;
  status: "online" | "offline";
  latency: number | null;
}

export type ProjectCategory = "AI" | "fullstack" | "cloud" | "ml";

export interface RepoStatItem {
  name: string;
  full_name: string;
  description: string | null;
  url: string;
  primary_language: string | null;
  stars: number;
  forks: number;
  pushed_at: string | null;
}

export interface ContributionDayItem {
  day: string;
  commit_count: number;
  intensity_level: number;
}

export interface GithubStats {
  summary: {
    total_stars: number;
    total_repos: number;
    total_commits_12mo: number;
    current_streak_days: number;
    top_languages: Array<{ name: string; percent: number }>;
  };
  contribution_calendar: ContributionDayItem[];
  repos: RepoStatItem[];
  last_synced_at: string;
}

