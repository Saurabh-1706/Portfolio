"use client";

import { useState } from "react";
import { ChatPanel } from "./ChatPanel";

export function ChatLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating launcher button */}
      <button
        className={["chat-launcher", open ? "chat-launcher--active" : ""].join(" ")}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        id="chat-launcher-btn"
      >
        {open ? (
          // X icon
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ) : (
          // Chat bubble icon
          <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        )}
        {/* Pulse ring when closed */}
        {!open && <span className="chat-launcher__pulse" aria-hidden />}
      </button>

      {/* Chat panel — conditionally rendered */}
      {open && <ChatPanel onClose={() => setOpen(false)} />}
    </>
  );
}
