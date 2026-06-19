"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: "◈",
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: "◉",
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: "◎",
  },
  {
    label: "Skills",
    href: "/admin/skills",
    icon: "◇",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 flex-shrink-0 flex flex-col border-r min-h-screen"
      style={{
        background: "#111111",
        borderColor: "rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo / Brand */}
      <div
        className="h-14 flex items-center px-5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[#a78bfa] text-lg font-mono">⬡</span>
          <span className="text-white text-sm font-medium">CMS</span>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-[#1e1e1e] text-white"
                  : "text-gray-500 hover:text-gray-300 hover:bg-[#1a1a1a]"
              }`}
            >
              <span
                className={`text-base ${isActive ? "text-[#a78bfa]" : ""}`}
              >
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1 h-4 rounded-full bg-[#a78bfa]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div
        className="p-3 border-t"
        style={{ borderColor: "rgba(255,255,255,0.06)" }}
      >
        <div className="px-3 py-2 rounded-lg bg-[#1a1a1a] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
          <span className="text-xs text-gray-500">Phase 1 — Active</span>
        </div>
      </div>
    </aside>
  );
}
