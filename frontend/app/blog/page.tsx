import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Technical writing on AI, systems design, and software engineering.",
};

export default function BlogPage() {
  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-12 pb-20">
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-accent mb-2 block">
          Writing
        </span>
        <h1 className="text-4xl md:text-5xl font-medium text-text-primary leading-[1.1] mb-3">
          Blog
        </h1>
        <p className="text-base text-text-secondary max-w-xl leading-relaxed">
          Technical deep-dives, architecture decisions, and lessons learned
          from building production AI systems.
        </p>
      </div>

      {/* Coming soon */}
      <div className="bg-bg-secondary rounded-xl p-10 text-center border border-border-default">
        <p className="text-text-secondary text-sm">
          Blog posts coming soon. Check back after Phase 2 of the build.
        </p>
      </div>
    </div>
  );
}
