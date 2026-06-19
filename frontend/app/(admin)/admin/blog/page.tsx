import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Admin",
};

export default function AdminBlogPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-white mb-1">Blog</h1>
        <p className="text-sm text-gray-500">Phase 2 — coming soon</p>
      </div>
      <div
        className="rounded-xl border p-12 text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#111111" }}
      >
        <div className="text-4xl mb-4 opacity-40">◎</div>
        <p className="text-sm text-gray-600">
          Blog management will be available in Phase 2 after the AI chatbot is
          built.
        </p>
      </div>
    </div>
  );
}
