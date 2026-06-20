"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface ChatLogItem {
  id: string;
  conversation_id: string;
  question: string;
  answer: string;
  sources: string[] | null;
  feedback_positive: boolean | null;
  created_at: string;
}

interface PaginatedResponse {
  total: number;
  page: number;
  pages: number;
  per_page: number;
  items: ChatLogItem[];
}

function FeedbackBadge({ value }: { value: boolean | null }) {
  if (value === null) return <span className="cl-badge cl-badge--neutral">—</span>;
  return value ? (
    <span className="cl-badge cl-badge--positive">👍 Helpful</span>
  ) : (
    <span className="cl-badge cl-badge--negative">👎 Not helpful</span>
  );
}

export default function ChatLogsPage() {
  const [data, setData] = useState<PaginatedResponse | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/api/admin/chatlogs?page=${page}&per_page=20`)
      .then((r) => r.json())
      .then((d) => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page]);

  const toggleExpand = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <div className="cl-page">
      <div className="cl-header">
        <h1 className="cl-title">Chat Logs</h1>
        <p className="cl-subtitle">
          {data ? `${data.total} total exchanges` : "Loading…"}
        </p>
      </div>

      {loading ? (
        <div className="cl-loading">Loading chat logs…</div>
      ) : !data || data.items.length === 0 ? (
        <div className="cl-empty">No chat logs yet. Once visitors start chatting, logs appear here.</div>
      ) : (
        <>
          <div className="cl-table-wrapper">
            <table className="cl-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Question</th>
                  <th>Sources</th>
                  <th>Feedback</th>
                  <th>Conv. ID</th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((log) => (
                  <>
                    <tr
                      key={log.id}
                      className="cl-row"
                      onClick={() => toggleExpand(log.id)}
                    >
                      <td className="cl-td cl-td--time">
                        {new Date(log.created_at).toLocaleString()}
                      </td>
                      <td className="cl-td cl-td--question">{log.question}</td>
                      <td className="cl-td">
                        {log.sources?.length ? (
                          <div className="cl-sources">
                            {log.sources.map((s) => (
                              <span key={s} className="cl-source-chip">{s}</span>
                            ))}
                          </div>
                        ) : (
                          <span className="cl-no-sources">—</span>
                        )}
                      </td>
                      <td className="cl-td">
                        <FeedbackBadge value={log.feedback_positive} />
                      </td>
                      <td className="cl-td cl-td--conv">
                        <code>{log.conversation_id.slice(0, 8)}…</code>
                      </td>
                    </tr>

                    {/* Expanded answer row */}
                    {expanded === log.id && (
                      <tr key={`${log.id}-expanded`} className="cl-row-expanded">
                        <td colSpan={5}>
                          <div className="cl-answer">
                            <strong>Answer:</strong>
                            <p>{log.answer}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="cl-pagination">
            <button
              className="cl-page-btn"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Prev
            </button>
            <span className="cl-page-info">
              Page {data.page} of {data.pages}
            </span>
            <button
              className="cl-page-btn"
              disabled={page >= data.pages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next →
            </button>
          </div>
        </>
      )}

      <style>{`
        .cl-page { padding: 32px; max-width: 1100px; }
        .cl-header { margin-bottom: 24px; }
        .cl-title { font-size: 24px; font-weight: 700; color: var(--text-primary); margin: 0 0 4px; }
        .cl-subtitle { font-size: 14px; color: var(--text-secondary); margin: 0; }
        .cl-loading, .cl-empty { padding: 48px; text-align: center; color: var(--text-secondary); font-size: 14px; }
        .cl-table-wrapper { overflow-x: auto; border: 1px solid var(--border-default); border-radius: 10px; }
        .cl-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .cl-table th { padding: 10px 14px; text-align: left; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-secondary); background: var(--bg-secondary); border-bottom: 1px solid var(--border-default); }
        .cl-row { cursor: pointer; transition: background 0.1s; }
        .cl-row:hover { background: var(--bg-secondary); }
        .cl-row-expanded { background: var(--bg-tertiary); }
        .cl-td { padding: 10px 14px; border-bottom: 1px solid var(--border-default); vertical-align: top; color: var(--text-primary); }
        .cl-td--time { white-space: nowrap; font-size: 12px; color: var(--text-secondary); }
        .cl-td--question { max-width: 260px; }
        .cl-td--conv { font-size: 11px; color: var(--text-tertiary); }
        .cl-sources { display: flex; flex-wrap: wrap; gap: 4px; }
        .cl-source-chip { font-size: 11px; padding: 2px 7px; border-radius: 999px; background: var(--accent-light); color: var(--accent); }
        .cl-no-sources { color: var(--text-tertiary); }
        .cl-badge { font-size: 11px; padding: 2px 8px; border-radius: 4px; font-weight: 500; }
        .cl-badge--neutral { background: var(--bg-tertiary); color: var(--text-tertiary); }
        .cl-badge--positive { background: var(--success-light); color: var(--success); }
        .cl-badge--negative { background: #fef2f2; color: #dc2626; }
        .cl-answer { padding: 12px 14px; }
        .cl-answer strong { font-size: 12px; font-weight: 600; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.04em; }
        .cl-answer p { margin: 6px 0 0; font-size: 13px; line-height: 1.6; color: var(--text-primary); white-space: pre-wrap; }
        .cl-pagination { display: flex; align-items: center; gap: 16px; margin-top: 20px; }
        .cl-page-btn { padding: 7px 16px; border-radius: 7px; border: 1px solid var(--border-emphasis); background: var(--bg-primary); color: var(--text-primary); font-size: 13px; cursor: pointer; transition: background 0.15s; }
        .cl-page-btn:hover:not(:disabled) { background: var(--bg-secondary); }
        .cl-page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .cl-page-info { font-size: 13px; color: var(--text-secondary); }
      `}</style>
    </div>
  );
}
