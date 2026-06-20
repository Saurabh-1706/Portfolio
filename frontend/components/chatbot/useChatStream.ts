"use client";

/**
 * useChatStream — manages the SSE connection and message state for the chatbot.
 *
 * Key decisions:
 *  - Uses fetch + ReadableStream (not EventSource) for full header control.
 *  - conversation_id is a UUID generated once per session (in-memory).
 *  - Parses the [SOURCES] sentinel token from the stream to extract citations.
 *  - Returns a stable `sendMessage` function that is safe to call concurrently.
 */

import { useCallback, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";
const CONVERSATION_ID = uuidv4(); // one UUID per page load, stays in memory

export type MessageRole = "user" | "assistant";

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  sources: string[];
  isStreaming?: boolean;
  isError?: boolean;
  isFallback?: boolean;
}

interface UseChatStreamReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  sendMessage: (text: string) => Promise<void>;
  clearMessages: () => void;
}

export function useChatStream(): UseChatStreamReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const clearMessages = useCallback(() => setMessages([]), []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content: text.trim(),
      sources: [],
    };

    const assistantId = uuidv4();
    const assistantMsg: ChatMessage = {
      id: assistantId,
      role: "assistant",
      content: "",
      sources: [],
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setIsLoading(true);

    // Cancel any previous in-flight request
    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim(), conversation_id: CONVERSATION_ID }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const errText = res.status === 429
          ? "You've sent too many messages. Please wait a moment."
          : "Something went wrong. Please try again.";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? { ...m, content: errText, isStreaming: false, isError: true }
              : m
          )
        );
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";
      let fullContent = "";
      let sources: string[] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        // Process complete SSE lines
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);

          if (data === "[DONE]") break;

          // Parse sources sentinel
          if (data.includes("[SOURCES]")) {
            try {
              const raw = data.replace("[SOURCES]", "").trim();
              sources = JSON.parse(raw);
            } catch {
              // ignore parse errors
            }
            continue;
          }

          fullContent += data;
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? { ...m, content: fullContent, sources }
                : m
            )
          );
        }
      }

      // Finalise message — stop streaming indicator
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: fullContent, sources, isStreaming: false }
            : m
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;

      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? {
                ...m,
                content: "Having trouble connecting. Please try again in a moment.",
                isStreaming: false,
                isError: true,
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  return { messages, isLoading, sendMessage, clearMessages };
}
