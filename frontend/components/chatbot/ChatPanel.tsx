"use client";

import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "./ChatMessage";
import { StarterPrompts } from "./StarterPrompts";
import { useChatStream } from "./useChatStream";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

interface ChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: ChatPanelProps) {
  const { messages, isLoading, sendMessage } = useChatStream();
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isLoading) return;
    setInput("");
    await sendMessage(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFeedback = async (messageId: string, positive: boolean) => {
    // Best-effort — fire and forget, no UI state change needed for v1
    try {
      await fetch(`${API_URL}/api/admin/chatlogs/${messageId}/feedback`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positive }),
      });
    } catch {
      // silently ignore — feedback is optional instrumentation
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-panel" role="dialog" aria-label="AI Portfolio Assistant">
      {/* Header */}
      <div className="chat-panel__header">
        <div className="chat-panel__header-info">
          <span className="chat-panel__avatar">AI</span>
          <div>
            <p className="chat-panel__title">Portfolio Assistant</p>
            <p className="chat-panel__subtitle">Ask me anything about Saurabh</p>
          </div>
        </div>
        <button
          className="chat-panel__close"
          onClick={onClose}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="chat-panel__messages" aria-live="polite">
        {isEmpty ? (
          <StarterPrompts onSelect={(p) => { setInput(p); sendMessage(p); }} />
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onFeedback={handleFeedback}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="chat-panel__input-area">
        <textarea
          ref={inputRef}
          className="chat-panel__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about projects, skills, experience…"
          rows={1}
          disabled={isLoading}
          aria-label="Chat input"
          id="chat-input"
        />
        <button
          className="chat-panel__send"
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
          id="chat-send-btn"
        >
          {isLoading ? (
            <span className="chat-panel__send-spinner" />
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
