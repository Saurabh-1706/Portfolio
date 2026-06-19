"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SignInButton, SignUpButton, UserButton, useAuth } from "@clerk/nextjs";

const NAV_LINKS = [
  { label: "Projects", href: "/projects" },
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
          className="text-xs text-text-tertiary hover:text-accent transition-colors font-mono"
        >
          CMS →
        </Link>
      </div>
    );
  }

  return (
    <div className={mobile ? "flex flex-col gap-2 pt-1" : "flex items-center gap-2"}>
      <SignInButton mode="modal">
        <button className="text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer">
          Sign in
        </button>
      </SignInButton>
      <SignUpButton mode="modal">
        <button className="text-sm px-3 py-1.5 rounded-md bg-accent text-white hover:bg-accent-dark transition-colors cursor-pointer">
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
          ? "backdrop-blur-md border-b border-border-default bg-bg-primary/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-sm font-medium text-text-primary hover:text-accent transition-colors"
        >
          saurabh.dev
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <button className="text-sm px-3 py-1.5 rounded-md border border-border-default hover:bg-bg-secondary hover:border-border-emphasis transition-all cursor-pointer">
            Chat with AI ✦
          </button>

          {/* Auth: sign in/up when logged out, avatar + CMS link when logged in */}
          <AuthControls />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`w-5 h-0.5 bg-text-primary transition-all ${
              mobileOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-text-primary transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-text-primary transition-all ${
              mobileOpen ? "-rotate-45 -translate-y-1.5" : ""
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
            className="md:hidden border-b border-border-default bg-bg-primary/95 backdrop-blur-md overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <button className="w-full text-sm px-3 py-2 rounded-md border border-border-default hover:bg-bg-secondary transition-all text-left cursor-pointer">
                Chat with AI ✦
              </button>
              {/* Mobile auth controls */}
              <AuthControls mobile />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
