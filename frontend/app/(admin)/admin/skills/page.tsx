import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills — Admin",
};

export default function AdminSkillsPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-white mb-1">Skills</h1>
        <p className="text-sm text-gray-500">Phase 1 — coming soon</p>
      </div>
      <div
        className="rounded-xl border p-12 text-center"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "#111111" }}
      >
        <div className="text-4xl mb-4 opacity-40">◇</div>
        <p className="text-sm text-gray-600">
          Skills management will be available shortly. For now, update skills
          directly in the SkillsSection component.
        </p>
      </div>
    </div>
  );
}
