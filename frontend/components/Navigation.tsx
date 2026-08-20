"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial load

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-200 ease-in-out font-body-md text-body-md text-primary ${
      isScrolled 
        ? "bg-[#F9F9F9]/85 backdrop-blur-[12px] border-b border-[#E5E5E5]" 
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary flex items-center gap-2">
          Saurabh Mojad
        </Link>
        
        {/* Links (Web) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-primary font-semibold hover:text-primary transition-colors duration-200">
            About Me
          </Link>
          <Link href="#skills" className="text-secondary hover:text-primary transition-colors duration-200">
            Skills
          </Link>
          <Link href="#experience" className="text-secondary hover:text-primary transition-colors duration-200">
            Experience
          </Link>
          <Link href="#work" className="text-secondary hover:text-primary transition-colors duration-200">
            Projects
          </Link>
        </div>
        
        {/* CTA */}
        <Link href="#contact" className="hidden md:flex items-center gap-2 bg-primary-container text-on-primary px-6 py-3 rounded-full hover:opacity-80 transition-opacity">
          Let's Connect
          <span className="material-symbols-outlined text-sm">arrow_outward</span>
        </Link>
        
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-primary">
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}
