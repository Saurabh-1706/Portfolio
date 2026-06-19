"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="mb-8"
    >
      {eyebrow && (
        <span className="text-xs font-medium uppercase tracking-widest text-accent mb-2 block">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-medium text-text-primary leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p className="text-base text-text-secondary mt-2 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
