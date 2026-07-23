"use client";

import { motion } from "framer-motion";

interface SkillCategory {
  name: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "AI / ML",
    skills: [
      "LangChain",
      "LangGraph",
      "OpenAI API",
      "ChromaDB",
      "RAG Pipelines",
      "Prompt Engineering",
    ],
  },
  {
    name: "Backend",
    skills: [
      "FastAPI",
      "Python",
      "PostgreSQL",
      "Redis",
      "SQLAlchemy",
      "REST APIs",
    ],
  },
  {
    name: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    name: "Cloud / DevOps",
    skills: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Railway",
      "AWS",
      "CI/CD",
    ],
  },
];

export default function SkillsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.45,
            delay: catIndex * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="card-base p-6 hover:border-white/20 transition-colors"
        >
          <h3
            className="text-[11px] uppercase tracking-[0.12em] text-accent mb-5"
            style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
          >
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span key={skill} className="tech-chip">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
