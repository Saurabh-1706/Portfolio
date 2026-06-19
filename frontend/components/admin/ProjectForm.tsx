"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/lib/types";

interface ProjectFormProps {
  initialData?: Partial<Project>;
  projectId?: string; // If set, we're editing. If not, we're creating.
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function ProjectForm({
  initialData = {},
  projectId,
}: ProjectFormProps) {
  const router = useRouter();
  const isEditing = Boolean(projectId);

  const [form, setForm] = useState({
    title: initialData.title || "",
    slug: initialData.slug || "",
    short_desc: initialData.short_desc || "",
    full_desc: initialData.full_desc || "",
    tech_stack: initialData.tech_stack?.join(", ") || "",
    category: initialData.category || "AI",
    status: initialData.status || "in-progress",
    github_url: initialData.github_url || "",
    live_demo_url: initialData.live_demo_url || "",
    featured: initialData.featured ?? false,
    sort_order: initialData.sort_order ?? 0,
    challenges: initialData.challenges || "",
    lessons_learned: initialData.lessons_learned || "",
    metrics: initialData.metrics
      ? JSON.stringify(initialData.metrics, null, 2)
      : "",
    github_stars: initialData.github_stars ?? 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      // Auto-generate slug from title only if not editing or slug is empty/auto-generated
      ...((!isEditing || prev.slug === slugify(prev.title)) && {
        slug: slugify(title),
      }),
    }));
  }

  function set(field: string, value: string | boolean | number) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Parse and validate
    let metrics: Record<string, string> | null = null;
    if (form.metrics.trim()) {
      try {
        metrics = JSON.parse(form.metrics);
      } catch {
        setError('Invalid JSON in metrics field. Example: {"latency": "120ms"}');
        setSubmitting(false);
        return;
      }
    }

    const payload = {
      title: form.title,
      slug: form.slug,
      short_desc: form.short_desc || null,
      full_desc: form.full_desc || null,
      tech_stack: form.tech_stack
        ? form.tech_stack.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      category: form.category,
      status: form.status,
      github_url: form.github_url || null,
      live_demo_url: form.live_demo_url || null,
      featured: form.featured,
      sort_order: Number(form.sort_order),
      challenges: form.challenges || null,
      lessons_learned: form.lessons_learned || null,
      metrics,
      github_stars: Number(form.github_stars),
    };

    try {
      const apiBase =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const url = isEditing
        ? `${apiBase}/api/admin/projects/${projectId}`
        : `${apiBase}/api/admin/projects`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.detail || `HTTP ${res.status}`);
      }

      router.push("/admin/projects");
      router.refresh();
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save. Is the backend running?"
      );
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "w-full px-3 py-2.5 rounded-lg text-sm text-white placeholder-gray-600 border outline-none focus:border-[#a78bfa] transition-colors";
  const inputStyle = {
    background: "#1a1a1a",
    borderColor: "rgba(255,255,255,0.08)",
  };
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Error */}
      {error && (
        <div className="px-4 py-3 rounded-lg text-sm text-[#f87171] bg-[#450a0a] border border-[#7f1d1d]">
          {error}
        </div>
      )}

      {/* Title + Slug */}
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 md:col-span-1">
          <label className={labelClass}>
            Title <span className="text-[#a78bfa]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="LangGraph Incident Copilot"
            className={inputClass}
            style={inputStyle}
            value={form.title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="col-span-2 md:col-span-1">
          <label className={labelClass}>
            Slug <span className="text-[#a78bfa]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="langgraph-incident-copilot"
            className={inputClass}
            style={inputStyle}
            value={form.slug}
            onChange={(e) => set("slug", e.target.value)}
          />
        </div>
      </div>

      {/* Short Description */}
      <div>
        <label className={labelClass}>Short description</label>
        <input
          type="text"
          placeholder="One-line summary of the project"
          className={inputClass}
          style={inputStyle}
          value={form.short_desc}
          onChange={(e) => set("short_desc", e.target.value)}
          maxLength={280}
        />
      </div>

      {/* Full Description */}
      <div>
        <label className={labelClass}>Full description (Markdown supported)</label>
        <textarea
          rows={8}
          placeholder="Detailed description, architecture, key features..."
          className={`${inputClass} resize-y font-mono text-xs leading-relaxed`}
          style={inputStyle}
          value={form.full_desc}
          onChange={(e) => set("full_desc", e.target.value)}
        />
      </div>

      {/* Tech Stack */}
      <div>
        <label className={labelClass}>
          Tech stack{" "}
          <span className="text-gray-600 font-normal">(comma-separated)</span>
        </label>
        <input
          type="text"
          placeholder="LangChain, FastAPI, ChromaDB, Next.js"
          className={inputClass}
          style={inputStyle}
          value={form.tech_stack}
          onChange={(e) => set("tech_stack", e.target.value)}
        />
      </div>

      {/* Category + Status */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Category</label>
          <select
            className={inputClass}
            style={inputStyle}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            <option value="AI">AI</option>
            <option value="fullstack">Full Stack</option>
            <option value="cloud">Cloud</option>
            <option value="ml">ML</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select
            className={inputClass}
            style={inputStyle}
            value={form.status}
            onChange={(e) => set("status", e.target.value)}
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* GitHub + Live Demo URLs */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input
            type="url"
            placeholder="https://github.com/..."
            className={inputClass}
            style={inputStyle}
            value={form.github_url}
            onChange={(e) => set("github_url", e.target.value)}
          />
        </div>
        <div>
          <label className={labelClass}>Live demo URL</label>
          <input
            type="url"
            placeholder="https://..."
            className={inputClass}
            style={inputStyle}
            value={form.live_demo_url}
            onChange={(e) => set("live_demo_url", e.target.value)}
          />
        </div>
      </div>

      {/* GitHub Stars + Sort order + Featured */}
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>GitHub Stars</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            style={inputStyle}
            value={form.github_stars}
            onChange={(e) => set("github_stars", Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass}>Sort order</label>
          <input
            type="number"
            min={0}
            className={inputClass}
            style={inputStyle}
            value={form.sort_order}
            onChange={(e) => set("sort_order", Number(e.target.value))}
          />
        </div>
        <div>
          <label className={labelClass}>Featured</label>
          <button
            type="button"
            onClick={() => set("featured", !form.featured)}
            className={`w-full px-3 py-2.5 rounded-lg text-sm border transition-all ${
              form.featured
                ? "text-[#a78bfa] border-[#a78bfa] bg-[#2e1065]"
                : "text-gray-500 border-[rgba(255,255,255,0.08)] bg-[#1a1a1a]"
            }`}
          >
            {form.featured ? "✓ Featured" : "Not featured"}
          </button>
        </div>
      </div>

      {/* Challenges */}
      <div>
        <label className={labelClass}>Challenges</label>
        <textarea
          rows={3}
          placeholder="What was the hardest part? How did you solve it?"
          className={`${inputClass} resize-y`}
          style={inputStyle}
          value={form.challenges}
          onChange={(e) => set("challenges", e.target.value)}
        />
      </div>

      {/* Lessons Learned */}
      <div>
        <label className={labelClass}>Lessons learned</label>
        <textarea
          rows={3}
          placeholder="What would you do differently?"
          className={`${inputClass} resize-y`}
          style={inputStyle}
          value={form.lessons_learned}
          onChange={(e) => set("lessons_learned", e.target.value)}
        />
      </div>

      {/* Metrics */}
      <div>
        <label className={labelClass}>
          Metrics{" "}
          <span className="text-gray-600 font-normal">(JSON)</span>
        </label>
        <textarea
          rows={3}
          placeholder={'{"latency": "120ms", "accuracy": "94%", "users": "500+"}'}
          className={`${inputClass} resize-y font-mono text-xs`}
          style={inputStyle}
          value={form.metrics}
          onChange={(e) => set("metrics", e.target.value)}
        />
      </div>

      {/* Submit buttons */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors disabled:opacity-50"
          style={{ background: "#7c3aed" }}
        >
          {submitting
            ? "Saving…"
            : isEditing
            ? "Save changes"
            : "Create project"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/projects")}
          className="px-4 py-2.5 rounded-lg text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
