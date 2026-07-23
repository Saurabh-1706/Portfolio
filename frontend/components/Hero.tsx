"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const TECH_CHIPS = [
  "Python", "FastAPI", "Next.js", "React",
  "TypeScript", "Docker", "OpenAI", "LangChain",
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/saurabh-mojad",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Saurabh-1706",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
      </svg>
    ),
  },
];

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center pt-8 pb-24 overflow-hidden">
      {/* === Ambient background orbs === */}
      {/* Blue top-left — behind headline */}
      <div className="absolute -top-32 -left-32 w-[700px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(164,201,255,0.10) 0%, transparent 60%)", filter: "blur(60px)" }} />
      {/* Purple top-right — behind profile photo */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(221,183,255,0.09) 0%, transparent 60%)", filter: "blur(60px)" }} />
      {/* Cyan bottom center glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(47,217,244,0.06) 0%, transparent 70%)", filter: "blur(50px)" }} />
      {/* Subtle center spotlight */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(164,201,255,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
      {/* Bottom fade to page bg */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-16 w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left content */}
        <motion.div
          className="md:col-span-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Availability badge */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-success opacity-70" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
            </span>
            <span
              className="text-xs font-medium uppercase tracking-[0.12em] text-text-tertiary"
              style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
            >
              Available for opportunities
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-[clamp(48px,7vw,72px)] font-extrabold text-text-primary leading-[1.05] tracking-[-0.04em]"
          >
            AI Full Stack{" "}
            <br />
            <span className="text-gradient">Engineer</span>
          </h1>

          {/* Description */}
          <p className="text-[18px] text-text-secondary leading-relaxed max-w-2xl">
            Building intelligent web applications powered by AI. Merging deep
            learning models with scalable full-stack architectures for
            next-generation digital experiences.
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-2 mt-2">
            {TECH_CHIPS.map((chip) => (
              <span key={chip} className="tech-chip">
                {chip}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <Link href="/projects" className="btn-primary">
              View Projects
            </Link>
            <a
              href="/Saurabh_Mojad_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Download Resume
            </a>
            <a href="mailto:saurabhmojad2173@gmail.com" className="btn-ghost">
              Contact Me
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-text-tertiary hover:text-accent transition-all duration-200 group"
                aria-label={link.label}
              >
                <span className="group-hover:scale-110 transition-transform duration-200">
                  {link.icon}
                </span>
                <span className="text-xs font-medium" style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}>
                  {link.label}
                </span>
              </a>
            ))}
            <span className="text-white/10 text-xs">|</span>
            <span className="text-xs text-text-tertiary" style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}>
              saurabh-mojad
            </span>
          </div>
        </motion.div>

        {/* Right — Developer portrait */}
        <motion.div
          className="md:col-span-4 hidden md:block"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 glow-on-hover">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-secondary/10 mix-blend-overlay z-10" />
            {/* Bottom name tag */}
            <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent p-4">
              <p className="text-white font-semibold text-sm">Saurabh Mojad</p>
              <p className="text-text-tertiary text-xs" style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}>Full Stack AI Engineer</p>
            </div>
            {/* Developer image */}
            <Image
              src="/saurabh-profile.jpg"
              alt="Saurabh Mojad — Full Stack AI Engineer"
              fill
              priority
              className="object-cover object-top hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
