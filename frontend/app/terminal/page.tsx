import type { Metadata } from "next";
import Link from "next/link";
import TerminalConsole from "@/components/terminal/TerminalConsole";

export const metadata: Metadata = {
  title: "Terminal — Portfolio",
  description: "An interactive monospace terminal interface to explore Saurabh's developer portfolio.",
};

export default function TerminalPage() {
  return (
    <div className="max-w-[900px] mx-auto px-4 md:px-6 pt-8 pb-20 flex flex-col min-h-[calc(100vh-10rem)]">
      {/* Back link */}
      <div className="mb-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs font-mono text-gray-500 hover:text-[#a78bfa] transition-colors"
        >
          &lt;- Back to homepage
        </Link>
        <span className="text-xs font-mono text-gray-600 font-bold">
          guest@saurabh.dev:~
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <TerminalConsole />
      </div>
    </div>
  );
}
