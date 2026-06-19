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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {SKILL_CATEGORIES.map((category, catIndex) => (
        <motion.div
          key={category.name}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{
            duration: 0.4,
            delay: catIndex * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-bg-secondary rounded-xl p-5 border border-transparent hover:border-border-default transition-colors"
        >
          <h3 className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
            {category.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-bg-tertiary text-text-secondary border border-border-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
