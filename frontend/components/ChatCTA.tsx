"use client";

/**
 * Thin client wrapper that triggers the chat launcher from a server page.
 * Keeps page.tsx as a server component while allowing onClick interactivity.
 */
export default function ChatCTA() {
  const openChat = () => {
    const chatBtn = document.getElementById(
      "chat-launcher-btn"
    ) as HTMLButtonElement | null;
    chatBtn?.click();
  };

  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <button className="btn-primary cursor-pointer" onClick={openChat}>
        Chat with AI ✦
      </button>
      <a href="mailto:saurabhmojad2173@gmail.com" className="btn-secondary">
        Get in touch
      </a>
    </div>
  );
}
