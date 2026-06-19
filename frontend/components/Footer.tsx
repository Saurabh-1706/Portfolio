import Link from "next/link";

const FOOTER_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/saurabh",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/saurabh",
    external: true,
  },
  {
    label: "Twitter",
    href: "https://twitter.com/saurabh",
    external: true,
  },
  {
    label: "Resume",
    href: "/resume.pdf",
    external: true,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-default mt-auto">
      <div className="max-w-[1100px] mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text-tertiary">
          © {new Date().getFullYear()} Saurabh. Built with Next.js, FastAPI &
          too much coffee.
        </p>
        <div className="flex items-center gap-5">
          {FOOTER_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs text-text-tertiary hover:text-text-primary transition-colors"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
