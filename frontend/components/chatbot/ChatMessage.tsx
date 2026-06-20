"use client";

import type { ChatMessage as ChatMessageType } from "./useChatStream";

interface ChatMessageProps {
  message: ChatMessageType;
  onFeedback?: (id: string, positive: boolean) => void;
}

/** Typing indicator — three bouncing dots */
function TypingIndicator() {
  return (
    <span className="chat-msg__typing" aria-label="Typing">
      <span />
      <span />
      <span />
    </span>
  );
}

/** Source attribution chips */
function SourceChips({ sources }: { sources: string[] }) {
  if (!sources.length) return null;
  return (
    <div className="chat-msg__sources">
      <span className="chat-msg__sources-label">Sources:</span>
      {sources.map((src) => (
        <span key={src} className="chat-msg__source-chip">
          {src}
        </span>
      ))}
    </div>
  );
}

/** Thumbs up / down feedback buttons */
function FeedbackButtons({
  messageId,
  onFeedback,
}: {
  messageId: string;
  onFeedback: (id: string, positive: boolean) => void;
}) {
  return (
    <div className="chat-msg__feedback">
      <button
        className="chat-msg__feedback-btn"
        onClick={() => onFeedback(messageId, true)}
        title="Helpful"
        aria-label="Mark as helpful"
      >
        👍
      </button>
      <button
        className="chat-msg__feedback-btn"
        onClick={() => onFeedback(messageId, false)}
        title="Not helpful"
        aria-label="Mark as not helpful"
      >
        👎
      </button>
    </div>
  );
}

export function ChatMessage({ message, onFeedback }: ChatMessageProps) {
  const isUser = message.role === "user";
  const isEmpty = !message.content && message.isStreaming;

  return (
    <div
      className={[
        "chat-msg",
        isUser ? "chat-msg--user" : "chat-msg--bot",
        message.isError ? "chat-msg--error" : "",
        message.isFallback ? "chat-msg--fallback" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="chat-msg__avatar" aria-hidden>
          AI
        </div>
      )}

      <div className="chat-msg__body">
        {/* Bubble */}
        <div className="chat-msg__bubble">
          {isEmpty ? (
            <TypingIndicator />
          ) : (
            <span className="chat-msg__text">{message.content}</span>
          )}
        </div>

        {/* Source chips (bot only, after streaming) */}
        {!isUser && !message.isStreaming && (
          <SourceChips sources={message.sources} />
        )}

        {/* Feedback (bot only, after streaming, no error) */}
        {!isUser && !message.isStreaming && !message.isError && onFeedback && (
          <FeedbackButtons messageId={message.id} onFeedback={onFeedback} />
        )}
      </div>
    </div>
  );
}
