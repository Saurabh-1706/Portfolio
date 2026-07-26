import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="bg-surface/80 backdrop-blur-md dark:bg-surface/80 text-primary dark:text-on-primary-fixed font-body-md text-body-md fixed top-0 w-full border-b border-border-hairline dark:border-outline z-50">
      <div className="flex justify-between items-center h-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Brand */}
        <Link href="/" className="font-headline-md text-headline-md font-bold text-primary dark:text-on-primary-fixed flex items-center gap-2">
          Saurabh Mojad
        </Link>
        
        {/* Links (Web) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-primary dark:text-on-primary-fixed font-semibold hover:text-primary dark:hover:text-on-primary-fixed transition-colors duration-200">
            About Me
          </Link>
          <Link href="#skills" className="text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-on-primary-fixed transition-colors duration-200">
            Skills
          </Link>
          <Link href="#portfolio" className="text-secondary dark:text-on-secondary-fixed-variant hover:text-primary dark:hover:text-on-primary-fixed transition-colors duration-200">
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
