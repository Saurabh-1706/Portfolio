import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import SkillsSection from "@/components/SkillsSection";
import { getProjects } from "@/lib/api";

export default async function HomePage() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <Hero />

      {/* Featured Projects */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <SectionHeading
          eyebrow="Selected work"
          title="Featured projects"
          description="Production-grade systems I've designed and built — from AI pipelines to full-stack platforms."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <SectionHeading
          eyebrow="Expertise"
          title="Tech stack"
          description="Tools and technologies I use to build production systems."
        />
        <SkillsSection />
      </section>

      {/* Terminal Teaser */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20">
        <div className="rounded-xl overflow-hidden border border-border-default">
          {/* macOS-style header */}
          <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-xs text-gray-500 font-mono">
              portfolio — bash
            </span>
          </div>
          {/* Terminal body */}
          <div className="bg-terminal-bg p-5 font-mono text-sm min-h-[160px]">
            <p className="text-gray-500 mb-4">
              Welcome to saurabh.dev. Type{" "}
              <span className="text-terminal-text">`help`</span> to start.
            </p>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-terminal-green">~</span>
              <span className="text-terminal-purple">portfolio</span>
              <span className="text-gray-500">$</span>
              <span className="text-terminal-text ml-1">whoami</span>
            </div>
            <div className="text-gray-400 ml-4 mb-3 space-y-1">
              <p>
                <span className="text-terminal-green">→</span> Saurabh —
                Full-Stack AI Engineer
              </p>
              <p>
                <span className="text-terminal-green">→</span> Building RAG
                pipelines, multi-agent systems & production APIs
              </p>
              <p>
                <span className="text-terminal-green">→</span> Open to
                AI/ML and Full-Stack opportunities
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-terminal-green">~</span>
              <span className="text-terminal-purple">portfolio</span>
              <span className="text-gray-500">$</span>
              <span className="w-2 h-4 bg-terminal-text inline-block animate-cursor-blink ml-1" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-[1100px] mx-auto px-6 pb-20 text-center">
        <div className="bg-bg-secondary rounded-2xl p-10 md:p-16 border border-border-default">
          <h2 className="text-2xl md:text-3xl font-medium text-text-primary mb-3">
            Let&apos;s build something together
          </h2>
          <p className="text-base text-text-secondary mb-6 max-w-md mx-auto">
            Have a question about my work? Ask my AI assistant or reach out
            directly.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button className="px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-dark transition-colors cursor-pointer">
              Chat with AI ✦
            </button>
            <a
              href="mailto:saurabh@example.com"
              className="px-5 py-2.5 rounded-lg border border-border-default text-sm text-text-secondary hover:bg-bg-tertiary transition-colors"
            >
              Get in touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
