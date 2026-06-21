"use client";

interface LanguageItem {
  name: string;
  percent: number;
}

interface LanguageBreakdownProps {
  languages: LanguageItem[];
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  Rust: "#dea584",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555"
};

function getLangColor(name: string): string {
  return LANG_COLORS[name] || "#858585";
}

export default function LanguageBreakdown({ languages }: LanguageBreakdownProps) {
  if (!languages || languages.length === 0) {
    return (
      <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 text-center text-text-tertiary">
        No language metrics available.
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary border border-border-default rounded-2xl p-6 shadow-sm">
      <h3 className="text-lg font-medium text-text-primary mb-4">
        Languages Distribution
      </h3>

      {/* Stacked bar chart */}
      <div className="flex h-4 w-full rounded-full overflow-hidden bg-bg-tertiary shadow-inner mb-6">
        {languages.map((lang) => (
          <div
            key={lang.name}
            style={{
              width: `${lang.percent}%`,
              backgroundColor: getLangColor(lang.name),
            }}
            className="h-full transition-all duration-300"
            title={`${lang.name}: ${lang.percent}%`}
          />
        ))}
      </div>

      {/* Grid Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {languages.map((lang) => (
          <div key={lang.name} className="flex items-center gap-2">
            <span
              className="w-3.5 h-3.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: getLangColor(lang.name) }}
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-text-primary leading-none">
                {lang.name}
              </span>
              <span className="text-xs text-text-tertiary font-mono mt-1">
                {lang.percent}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
