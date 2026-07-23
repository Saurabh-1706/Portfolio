import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Saurabh-1706" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/saurabh-mojad" },
  { label: "Resume", href: "/Saurabh_Mojad_Resume.pdf" },
];

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-bg-secondary mt-auto">
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left */}
        <div>
          <div className="text-xl font-bold text-text-primary tracking-tighter mb-3">
            SAURABH.DEV
          </div>
          <p className="text-sm text-text-tertiary leading-relaxed max-w-xs">
            © {new Date().getFullYear()} Saurabh. Built with Technical Luxury.
            <br />
            Next.js · FastAPI · LangChain
          </p>
          <div className="flex gap-3 mt-5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-text-tertiary hover:text-accent transition-colors"
                style={{ fontFamily: "var(--font-jetbrains-mono, monospace)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col md:items-end justify-between gap-6">
          <div className="flex gap-6 flex-wrap md:justify-end">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-secondary hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="text-xs text-text-tertiary md:text-right">
            Powered by AI · Open Source
          </p>
        </div>
      </div>
    </footer>
  );
}
