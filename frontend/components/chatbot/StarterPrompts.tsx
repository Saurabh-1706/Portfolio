"use client";

interface StarterPromptsProps {
  onSelect: (prompt: string) => void;
}

const STARTER_PROMPTS = [
  "What's your strongest project?",
  "Tell me about your RAG pipeline experience",
  "What's your academic background?",
  "What kind of role are you looking for?",
];

export function StarterPrompts({ onSelect }: StarterPromptsProps) {
  return (
    <div className="starter-prompts">
      <p className="starter-prompts__label">Try asking me…</p>
      <div className="starter-prompts__grid">
        {STARTER_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className="starter-prompts__chip"
            onClick={() => onSelect(prompt)}
            type="button"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
