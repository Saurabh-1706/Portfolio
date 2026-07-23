import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Full-Stack AI Engineer building RAG pipelines, multi-agent systems, and production infrastructure.",
};

export default function AboutPage() {
  return (
    <div className="max-w-[720px] mx-auto px-6 pt-12 pb-20">
      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-accent mb-2 block">
          About
        </span>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary leading-[1.1] mb-4">
          Hey, I&apos;m Saurabh
        </h1>
        <p className="text-lg text-text-secondary leading-relaxed">
          Full-Stack AI Engineer passionate about building production-grade
          systems that solve real problems.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-4 text-[15px] text-text-secondary leading-[1.7] mb-12">
        <p>
          I specialize in building AI-powered applications — from RAG pipelines
          and multi-agent workflows to the full-stack infrastructure that runs
          them in production. My work sits at the intersection of machine
          learning engineering and software architecture.
        </p>
        <p>
          Currently, I&apos;m focused on building tools that make AI systems
          more reliable and production-ready. I believe the biggest challenge in
          AI today isn&apos;t the models — it&apos;s the engineering around
          them.
        </p>
        <p>
          When I&apos;m not coding, you&apos;ll find me writing technical
          deep-dives, contributing to open source, or exploring new frameworks
          before they hit the mainstream.
        </p>
      </div>

      {/* What I do */}
      <div className="mb-12">
        <h2 className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
          What I build
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {[
            {
              title: "AI / ML Systems",
              desc: "RAG pipelines, multi-agent architectures, embedding systems, and LLM-powered applications.",
            },
            {
              title: "Full-Stack Applications",
              desc: "End-to-end web applications with Next.js frontends and FastAPI backends, deployed to production.",
            },
            {
              title: "Cloud Infrastructure",
              desc: "Docker, CI/CD pipelines, serverless deployments, and infrastructure-as-code automation.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-bg-secondary rounded-xl p-5 border border-transparent hover:border-border-default transition-colors"
            >
              <h3 className="text-sm font-medium text-text-primary mb-1">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-bg-secondary rounded-xl p-6 border border-border-default">
        <h2 className="text-sm font-medium text-text-primary mb-3">
          Get in touch
        </h2>
        <div className="space-y-2 text-sm text-text-secondary">
          <p>
            📧{" "}
            <a
              href="mailto:saurabhmojad2173@gmail.com"
              className="text-accent hover:underline"
            >
              saurabhmojad2173@gmail.com
            </a>
          </p>
          <p>
            📞{" "}
            <a
              href="tel:+918805289118"
              className="text-accent hover:underline"
            >
              +91 88052 89118
            </a>
          </p>
          <p>📍 Nashik, Maharashtra, India</p>
          <p>
            🐙{" "}
            <a
              href="https://github.com/Saurabh-1706"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              github.com/Saurabh-1706
            </a>
          </p>
          <p>
            💼{" "}
            <a
              href="https://www.linkedin.com/in/saurabh-mojad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              linkedin.com/in/saurabh-mojad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
