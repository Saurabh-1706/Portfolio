"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface DeleteProjectButtonProps {
  projectId: string;
  projectTitle: string;
}

export default function DeleteProjectButton({
  projectId,
  projectTitle,
}: DeleteProjectButtonProps) {
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setDeleting(true);
    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${apiBase}/api/admin/projects/${projectId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Failed to delete project. Is the backend running?");
    } finally {
      setDeleting(false);
      setConfirming(false);
    }
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-1">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="text-xs px-2.5 py-1 rounded text-[#f87171] bg-[#450a0a] hover:bg-[#7f1d1d] transition-colors disabled:opacity-50"
        >
          {deleting ? "…" : "Confirm"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          ✕
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="text-xs px-2.5 py-1 rounded border text-gray-600 hover:text-[#f87171] hover:border-[#7f1d1d] transition-colors"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
      title={`Delete "${projectTitle}"`}
    >
      Del
    </button>
  );
}
