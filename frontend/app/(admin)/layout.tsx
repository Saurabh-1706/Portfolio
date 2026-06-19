import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  return (
    <div className="flex min-h-screen" style={{ background: "#0a0a0a" }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header
          className="h-14 flex items-center justify-between px-6 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <div />
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-500 font-mono">
              admin@saurabh.dev
            </span>
            <a
              href="/"
              className="text-xs px-3 py-1.5 rounded-md border text-gray-400 hover:text-white transition-colors"
              style={{ borderColor: "rgba(255,255,255,0.1)" }}
            >
              ← View site
            </a>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
