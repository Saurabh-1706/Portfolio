import Link from "next/link";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SkillsSection from "@/components/SkillsSection";
import GithubSummaryStrip from "@/components/github/GithubSummaryStrip";
import ChatCTA from "@/components/ChatCTA";
import { getProjects, getGithubStats } from "@/lib/api";

// ISR — revalidate every 2 hours
export const revalidate = 7200;

export default async function HomePage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured);

  let githubStats = null;
  try {
    githubStats = await getGithubStats();
  } catch {
    // Stats unavailable
  }

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Glowing divider after Hero */}
      <div className="max-w-[900px] mx-auto px-6">
        <hr className="divider-glow" />
      </div>

      {/* Featured Projects */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-16 py-24 overflow-hidden">
        {/* Ambient orb — blue top-left */}
        <div
          className="pointer-events-none absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(164,201,255,0.07) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <SectionHeading
                title="Selected Works"
                description="Deep dive into recent implementations of LLMs, agentic workflows, and scalable systems."
              />
            </div>
            {/* Filter tabs */}
            <div
              className="flex gap-1 bg-bg-secondary p-1 rounded-lg border border-white/10 self-start md:self-auto"
            >
              {["All", "AI", "Full Stack"].map((label) => (
                <button
                  key={label}
                  className={`px-4 py-1.5 rounded-md text-sm transition-all cursor-pointer ${
                    label === "All"
                      ? "bg-white/10 text-text-primary"
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  }`}
                  style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", letterSpacing: "0.04em", fontSize: "12px" }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredProjects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>

          {/* View all link */}
          <div className="mt-10 flex justify-center">
            <Link
              href="/projects"
              className="btn-secondary"
            >
              View all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Glowing divider */}
      <div className="max-w-[900px] mx-auto px-6">
        <hr className="divider-glow" />
      </div>

      {/* GitHub Stats */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-16 py-24 overflow-hidden">
        {/* Ambient orb — purple right */}
        <div
          className="pointer-events-none absolute -top-16 -right-32 w-[400px] h-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(221,183,255,0.07) 0%, transparent 65%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10">
          <GithubSummaryStrip stats={githubStats} />
        </div>
      </section>

      {/* Glowing divider */}
      <div className="max-w-[900px] mx-auto px-6">
        <hr className="divider-glow" />
      </div>

      {/* Tech Stack / Skills */}
      <section className="relative max-w-[1200px] mx-auto px-6 md:px-16 py-24 overflow-hidden">
        {/* Ambient orb — cyan bottom-left */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full"
          style={{
            background: "radial-gradient(ellipse, rgba(47,217,244,0.05) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div className="relative z-10">
          <SectionHeading
            title="Tech Stack"
            description="Tools and technologies I use to build production AI systems."
          />
          <SkillsSection />
        </div>
      </section>

      {/* Glowing divider */}
      <div className="max-w-[900px] mx-auto px-6">
        <hr className="divider-glow" />
      </div>

      {/* Terminal Teaser */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-16 py-24">
        <div className="rounded-xl overflow-hidden border border-white/10 glow-on-hover"
          style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          {/* macOS-style header */}
          <div className="bg-bg-elevated px-4 py-3 flex items-center justify-between select-none border-b border-white/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_6px_#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_6px_#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_6px_#28c840]" />
              <span
                className="ml-3 text-xs text-text-tertiary"
                style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
              >
                portfolio — bash
              </span>
            </div>
            <Link
              href="/terminal"
              className="text-xs text-accent hover:underline"
              style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
            >
              Launch interactive terminal ↗
            </Link>
          </div>

          {/* Terminal body */}
          <Link
            href="/terminal"
            className="block bg-terminal-bg p-6 font-mono text-sm min-h-[160px] hover:bg-[#0a0a0c] transition-colors cursor-pointer group"
          >
            <p className="text-text-tertiary mb-4">
              Welcome to saurabh.dev. Type{" "}
              <span className="text-accent">`help`</span> to start.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-terminal-green">~</span>
              <span className="text-accent">portfolio</span>
              <span className="text-text-tertiary">$</span>
              <span className="text-terminal-text ml-1">whoami</span>
            </div>
            <div className="text-text-secondary ml-4 mb-4 space-y-1">
              <p>
                <span className="text-terminal-green">→</span> Saurabh Mojad —
                Full-Stack AI Engineer
              </p>
              <p>
                <span className="text-terminal-green">→</span> Building RAG
                pipelines, multi-agent systems &amp; production APIs
              </p>
              <p>
                <span className="text-terminal-green">→</span> Open to AI/ML
                and Full-Stack opportunities
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">~</span>
                <span className="text-accent">portfolio</span>
                <span className="text-text-tertiary">$</span>
                <span className="w-2 h-4 bg-terminal-text inline-block animate-cursor-blink ml-1" />
              </div>
              <span className="text-xs text-text-tertiary group-hover:text-accent transition-colors font-sans">
                Click anywhere to start typing...
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-16 pb-32 text-center">
        <div className="relative rounded-2xl p-12 md:p-20 border border-white/10 bg-bg-secondary overflow-hidden"
          style={{ boxShadow: "0 8px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)" }}
        >
          {/* Rich gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.07] via-transparent to-secondary/[0.07] pointer-events-none" />
          {/* Glow orb center */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse, rgba(164,201,255,0.15) 0%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">
              Let&apos;s build something together
            </h2>
            <p className="text-base text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
              Have a question about my work? Ask my AI assistant or reach out
              directly.
            </p>
          <ChatCTA />
          </div>
        </div>
      </section>
    </>
  );
}
