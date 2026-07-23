"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

const NAV_LINKS = [
  { label: "Work", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
];

function AuthControls({ mobile = false }: { mobile?: boolean }) {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-7 h-7",
            },
          }}
        />
        <Link
          href="/admin/dashboard"
          className="text-xs text-text-tertiary hover:text-accent transition-colors font-mono tracking-wide"
        >
          CMS →
        </Link>
      </div>
    );
  }

  return (
    <div className={mobile ? "flex flex-col gap-2 pt-1" : "flex items-center gap-2"}>
      <SignInButton mode="modal">
        <button className="btn-ghost text-sm cursor-pointer px-3 py-1.5">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="btn-primary text-xs cursor-pointer px-4 py-2">
          Sign up
        </button>
      </SignUpButton>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-16 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold text-text-primary tracking-tighter hover:text-accent transition-colors"
        >
          SAURABH.DEV
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors relative group py-1"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-accent transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}

          {/* Hire Me CTA */}
          <a
            href="mailto:saurabhmojad2173@gmail.com"
            className="btn-primary"
          >
            Hire Me
          </a>

          <AuthControls />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] cursor-pointer p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-[1.5px] bg-text-primary transition-all duration-200 ${
              mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-text-primary transition-all duration-200 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-[1.5px] bg-text-primary transition-all duration-200 ${
              mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 glass-panel overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a href="mailto:saurabhmojad2173@gmail.com" className="btn-primary block text-center mt-2">
                Hire Me
              </a>
              <AuthControls mobile />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
