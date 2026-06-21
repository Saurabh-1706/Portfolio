"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminActions() {
  const [syncing, setSyncing] = useState(false);
  const [reindexing, setReindexing] = useState(false);
  
  const [syncResult, setSyncResult] = useState<{ success: boolean; message: string } | null>(null);
  const [reindexResult, setReindexResult] = useState<{ success: boolean; message: string } | null>(null);

  async function handleSync() {
    setSyncing(true);
    setSyncResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/github/sync`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setSyncResult({
        success: true,
        message: `Successfully synchronized ${data.details?.repo_count || 0} repositories and ${data.details?.contribution_count || 0} contribution days!`,
      });
    } catch (err) {
      console.error(err);
      setSyncResult({
        success: false,
        message: err instanceof Error ? err.message : "Failed to run GitHub sync",
      });
    } finally {
      setSyncing(false);
    }
  }

  async function handleReindex() {
    setReindexing(true);
    setReindexResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/admin/reindex`, {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setReindexResult({
        success: true,
        message: `Successfully reindexed AI content! Processed: ${data.reindexed || 0}, Skipped: ${data.skipped || 0}, Errors: ${data.errors || 0}.`,
      });
    } catch (err) {
      console.error(err);
      setReindexResult({
        success: false,
        message: err instanceof Error ? err.message : "Failed to run AI reindexing",
      });
    } finally {
      setReindexing(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50 cursor-pointer"
          style={{ background: "#7c3aed" }}
        >
          {syncing ? (
            <>
              <span className="animate-spin inline-block mr-1">↻</span> Syncing GitHub...
            </>
          ) : (
            "Sync GitHub Stats"
          )}
        </button>

        <button
          onClick={handleReindex}
          disabled={reindexing}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-300 border transition-colors hover:text-white disabled:opacity-50 cursor-pointer"
          style={{ borderColor: "rgba(255,255,255,0.1)", background: "#1a1a1a" }}
        >
          {reindexing ? (
            <>
              <span className="animate-spin inline-block mr-1">↻</span> Reindexing...
            </>
          ) : (
            "Reindex AI Chatbot"
          )}
        </button>
      </div>

      {/* Notifications */}
      <div className="space-y-2 max-w-xl">
        {syncResult && (
          <div
            className={`px-4 py-3 rounded-lg text-sm border ${
              syncResult.success
                ? "text-[#4ade80] bg-[#052e16] border-[#064e3b]"
                : "text-[#f87171] bg-[#450a0a] border-[#7f1d1d]"
            }`}
          >
            {syncResult.message}
          </div>
        )}
        {reindexResult && (
          <div
            className={`px-4 py-3 rounded-lg text-sm border ${
              reindexResult.success
                ? "text-[#4ade80] bg-[#052e16] border-[#064e3b]"
                : "text-[#f87171] bg-[#450a0a] border-[#7f1d1d]"
            }`}
          >
            {reindexResult.message}
          </div>
        )}
      </div>
    </div>
  );
}
