"use client";

import React, { useState, useEffect, useRef } from "react";
import { getProjects, getGithubStats, getSkills, getResume, getBlogs } from "@/lib/api";
import type { Project, GithubStats, Skill, ResumeEntry, Blog } from "@/lib/types";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "error" | "system";
  content: React.ReactNode;
}

const COMMANDS = [
  "help",
  "whoami",
  "projects",
  "skills",
  "experience",
  "contact",
  "github",
  "blog",
  "clear",
  "easter",
  "sudo hire"
];

export default function TerminalConsole() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal welcome message
  useEffect(() => {
    setLines([
      {
        id: "welcome-1",
        type: "system",
        content: "Welcome to saurabh.dev [Version 1.0.0]"
      },
      {
        id: "welcome-2",
        type: "system",
        content: "Type 'help' to view all available commands. Tab autocomplete is supported."
      }
    ]);
  }, []);

  // Auto-scroll to bottom on new lines
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [lines]);

  // Focus input on container click
  function handleContainerClick() {
    inputRef.current?.focus();
  }

  // Handle command submission
  async function handleCommand(rawCmd: string) {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    // Add command to history
    setCommandHistory(prev => {
      const filtered = prev.filter(c => c !== trimmed);
      return [...filtered, trimmed];
    });
    setHistoryIndex(-1);

    // Render the prompt row
    const promptLineId = Math.random().toString();
    setLines(prev => [
      ...prev,
      {
        id: promptLineId,
        type: "input",
        content: (
          <div className="flex items-center gap-2">
            <span className="text-terminal-green">~</span>
            <span className="text-terminal-purple">portfolio</span>
            <span className="text-gray-500">$</span>
            <span className="text-terminal-text ml-1">{trimmed}</span>
          </div>
        )
      }
    ]);

    setInput("");
    setLoading(true);

    const args = trimmed.split(" ");
    const command = args[0].toLowerCase();
    const subArg = args.slice(1).join(" ").trim();

    const outputId = Math.random().toString();
    let outputContent: React.ReactNode = null;

    try {
      switch (command) {
        case "help":
          outputContent = (
            <div className="grid grid-cols-[120px_1fr] gap-x-4 gap-y-1 text-gray-400 mt-2 font-mono text-xs md:text-sm">
              <div className="text-terminal-purple font-medium">help</div>
              <div>List all available commands</div>
              <div className="text-terminal-purple font-medium">whoami</div>
              <div>Fun summary of who I am</div>
              <div className="text-terminal-purple font-medium">projects</div>
              <div>List all projects (optional category: projects ai)</div>
              <div className="text-terminal-purple font-medium">skills</div>
              <div>Show categorized technical skills</div>
              <div className="text-terminal-purple font-medium">experience</div>
              <div>Show work experience and education history</div>
              <div className="text-terminal-purple font-medium">contact</div>
              <div>Show contact details and social links</div>
              <div className="text-terminal-purple font-medium">github</div>
              <div>Show live GitHub statistics</div>
              <div className="text-terminal-purple font-medium">blog</div>
              <div>List published blog articles</div>
              <div className="text-terminal-purple font-medium">clear</div>
              <div>Clear the terminal screen</div>
              <div className="text-terminal-purple font-medium">easter</div>
              <div>Reveal a hidden easter egg 🥚</div>
              <div className="text-terminal-purple font-medium">sudo hire</div>
              <div>Initiate the hiring sequence</div>
            </div>
          );
          break;

        case "whoami":
          outputContent = (
            <div className="space-y-2 text-gray-300 mt-2 max-w-2xl font-mono text-xs md:text-sm">
              <p className="text-terminal-green font-medium">Saurabh — Full-Stack AI Engineer</p>
              <p>I build production-grade web applications and AI-powered systems. Specialized in Next.js, FastAPI, PostgreSQL, Redis, and LLM orchestration (LangChain/LangGraph).</p>
              <p>Passionate about system architecture, databases, clean code, and making RAG pipelines highly reliable.</p>
            </div>
          );
          break;

        case "projects":
          const projects = await getProjects();
          if (subArg) {
            // Check if looking for a specific project details or a category filter
            const singleProj = projects.find(p => p.slug.toLowerCase() === subArg.toLowerCase());
            if (singleProj) {
              outputContent = (
                <div className="space-y-2 mt-2 max-w-2xl font-mono text-xs md:text-sm">
                  <h3 className="text-white font-medium text-base">{singleProj.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{singleProj.short_desc}</p>
                  <div className="grid grid-cols-[110px_1fr] gap-y-1 text-gray-400 mt-2">
                    <span className="font-semibold text-gray-500">Tech Stack:</span>
                    <span>{singleProj.tech_stack?.join(", ")}</span>
                    <span className="font-semibold text-gray-500">Status:</span>
                    <span className="text-terminal-green">{singleProj.status}</span>
                    {singleProj.metrics && (
                      <>
                        <span className="font-semibold text-gray-500">Metrics:</span>
                        <span>
                          {Object.entries(singleProj.metrics)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                  {singleProj.challenges && (
                    <div className="mt-2">
                      <span className="font-semibold text-gray-500 block">Challenges Faced:</span>
                      <p className="text-gray-400 mt-0.5">{singleProj.challenges}</p>
                    </div>
                  )}
                  {singleProj.lessons_learned && (
                    <div className="mt-2">
                      <span className="font-semibold text-gray-500 block">Lessons Learned:</span>
                      <p className="text-gray-400 mt-0.5">{singleProj.lessons_learned}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-xs">
                    {singleProj.github_url && (
                      <a href={singleProj.github_url} target="_blank" rel="noopener noreferrer" className="text-terminal-purple hover:underline font-bold">
                        Code ↗
                      </a>
                    )}
                    {singleProj.live_demo_url && (
                      <a href={singleProj.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-terminal-purple hover:underline font-bold">
                        Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              );
              break;
            }

            // Otherwise check if it's a category filter
            const filtered = projects.filter(
              p => p.category?.toLowerCase() === subArg.toLowerCase()
            );

            if (filtered.length === 0) {
              outputContent = (
                <div className="text-gray-500 mt-2 font-mono text-xs md:text-sm">
                  No projects found in category &apos;{subArg}&apos;. Try: ai, fullstack, cloud, ml. Or pass a project slug to view details.
                </div>
              );
            } else {
              outputContent = renderProjectList(filtered);
            }
          } else {
            outputContent = renderProjectList(projects);
          }
          break;

        case "skills":
          const skills = await getSkills();
          const groupedSkills: Record<string, Skill[]> = {};
          skills.forEach(s => {
            const cat = s.category || "General";
            if (!groupedSkills[cat]) groupedSkills[cat] = [];
            groupedSkills[cat].push(s);
          });

          outputContent = (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 max-w-2xl font-mono text-xs md:text-sm">
              {Object.entries(groupedSkills).map(([cat, list]) => (
                <div key={cat} className="space-y-1.5">
                  <h4 className="text-terminal-green font-medium uppercase tracking-widest text-[11px]">
                    {cat}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {list.map(s => (
                      <span
                        key={s.id}
                        className="px-2 py-0.5 rounded bg-[#161616] text-gray-300 border border-white/5 flex items-center gap-1"
                      >
                        {s.name}
                        <span className="text-[10px] text-terminal-purple">
                          {"★".repeat(s.proficiency || 0)}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
          break;

        case "experience":
          const resumeEntries = await getResume();
          outputContent = (
            <div className="space-y-4 mt-2 max-w-2xl font-mono text-xs md:text-sm text-gray-300">
              {resumeEntries.map(e => (
                <div key={e.id} className="border-l border-[rgba(255,255,255,0.06)] pl-3 space-y-1 py-1">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-white font-medium text-sm">{e.title}</span>
                    <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                      {e.start_date ? new Date(e.start_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : ""} -{" "}
                      {e.end_date ? new Date(e.end_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short' }) : "Present"}
                    </span>
                  </div>
                  <div className="text-xs text-terminal-purple">
                    {e.organization} {e.location && `| ${e.location}`}
                  </div>
                  <p className="text-xs text-gray-400 mt-1 leading-relaxed">{e.description}</p>
                </div>
              ))}
            </div>
          );
          break;

        case "contact":
          outputContent = (
            <div className="space-y-1 text-gray-300 mt-2 font-mono text-xs md:text-sm">
              <p>
                📧 Email:{" "}
                <a href="mailto:saurabh@example.com" className="text-terminal-purple hover:underline">
                  saurabh@example.com
                </a>
              </p>
              <p>
                🐙 GitHub:{" "}
                <a
                  href="https://github.com/Saurabh-1706"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-purple hover:underline"
                >
                  github.com/Saurabh-1706
                </a>
              </p>
              <p>
                💼 LinkedIn:{" "}
                <a
                  href="https://linkedin.com/in/saurabh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-terminal-purple hover:underline"
                >
                  linkedin.com/in/saurabh
                </a>
              </p>
            </div>
          );
          break;

        case "github":
          const stats = await getGithubStats();
          if (subArg === "-web") {
            window.open("/github", "_blank");
            outputContent = <div className="text-gray-500 mt-1 font-mono text-xs">Opening /github dashboard page in new tab...</div>;
          } else {
            outputContent = (
              <div className="space-y-2 mt-2 max-w-2xl font-mono text-xs md:text-sm text-gray-300">
                <p className="text-terminal-green font-medium">GitHub Analytics Summary</p>
                <p>⭐ Total Stars: <span className="text-white">{stats.summary.total_stars}</span></p>
                <p>📁 Total Repositories: <span className="text-white">{stats.summary.total_repos}</span></p>
                <p>🔥 Current Streak: <span className="text-white">{stats.summary.current_streak_days} days</span></p>
                <p>📊 Top Languages:</p>
                <ul className="list-disc pl-5 text-gray-400 space-y-0.5">
                  {stats.summary.top_languages.map(l => (
                    <li key={l.name}>
                      {l.name}: <span className="text-white">{l.percent}%</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-gray-500 mt-2">
                  Type <span className="text-terminal-purple">github -web</span> or visit{" "}
                  <a href="/github" className="text-terminal-purple hover:underline">
                    /github
                  </a>{" "}
                  to view the contribution heatmap and repository breakdown.
                </p>
              </div>
            );
          }
          break;

        case "blog":
          const blogs = await getBlogs();
          outputContent = (
            <div className="space-y-3 mt-2 max-w-2xl font-mono text-xs md:text-sm">
              {blogs.map(b => (
                <div key={b.id} className="border-b border-[rgba(255,255,255,0.04)] pb-2 last:border-0">
                  <div className="flex justify-between items-start gap-4">
                    <a
                      href={`/blog/${b.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:underline"
                    >
                      {b.title}
                    </a>
                    <span className="text-xs text-gray-500 font-mono flex-shrink-0">
                      {b.read_time} min read
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{b.summary}</p>
                  <div className="text-[10px] text-terminal-green font-mono mt-1">
                    Tags: {b.tags?.join(", ")}
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <p className="text-gray-500">No blog posts published yet.</p>
              )}
            </div>
          );
          break;

        case "clear":
          setLines([]);
          setLoading(false);
          return;

        case "easter":
          outputContent = (
            <div className="space-y-2 mt-2 font-mono text-xs text-terminal-purple">
              <pre className="leading-tight text-terminal-purple">
{`   ▲
  ▲ ▲
 ▲ ▲ ▲   THE TRIFORCE OF CODING:
▲ ▲ ▲ ▲  FastAPI, Next.js, OpenAI, LangGraph`}
              </pre>
              <p className="text-sm text-gray-300">
                You discovered a secret! Try typing{" "}
                <span className="text-terminal-green">sudo hire saurabh</span> to unlock final clearance.
              </p>
            </div>
          );
          break;

        case "sudo":
          if (subArg.toLowerCase() === "hire" || subArg.toLowerCase() === "hire saurabh") {
            outputContent = (
              <div className="mt-2 space-y-2 font-mono text-xs md:text-sm text-terminal-green animate-pulse">
                <p>🔓 ACCESS GRANTED: INITIALIZING HIRE PROTOCOL...</p>
                <p className="text-white">
                  Congratulations! You have bypassed the firewall and initiated the hire response.
                </p>
                <p className="text-gray-300">
                  To proceed with scheduling an interview or making an offer, please email:
                </p>
                <p className="text-white font-bold">
                  <a href="mailto:saurabh@example.com" className="hover:underline">
                    saurabh@example.com
                  </a>
                </p>
                <p className="text-gray-500">
                  Or type <span className="text-terminal-purple">contact</span> to reveal LinkedIn and other channels.
                </p>
              </div>
            );
          } else {
            outputContent = (
              <div className="text-red-400 mt-2 font-mono text-xs md:text-sm">
                usage: sudo hire saurabh
              </div>
            );
          }
          break;

        case "rm":
          if (subArg.startsWith("-rf")) {
            outputContent = (
              <div className="mt-2 text-red-500 font-mono text-xs md:text-sm">
                💣 Nice try! Permission denied. Self-destruct sequence aborted.
              </div>
            );
          } else {
            outputContent = (
              <div className="text-gray-500 mt-2 font-mono text-xs">
                Permission denied.
              </div>
            );
          }
          break;

        default:
          outputContent = (
            <div className="text-red-400 mt-1 font-mono text-xs">
              command not found: {command}. Type &apos;help&apos; to view all available commands.
            </div>
          );
      }
    } catch (err) {
      console.error(err);
      outputContent = (
        <div className="text-red-400 mt-1 font-mono text-xs">
          Error executing command. Is the API backend running?
        </div>
      );
    }

    setLines(prev => [
      ...prev,
      {
        id: outputId,
        type: outputContent ? "output" : "system",
        content: outputContent
      }
    ]);
    setLoading(false);
  }

  // Render project list item helper
  function renderProjectList(projectList: Project[]) {
    return (
      <div className="space-y-4 mt-2 font-mono text-xs md:text-sm">
        {projectList.map(p => (
          <div key={p.id} className="border-l-2 border-terminal-purple pl-3 space-y-1 py-0.5">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-white font-medium text-sm">{p.title}</span>
              <span className="text-xs text-gray-500">/{p.slug}</span>
              <span className="text-xs text-terminal-purple">[{p.category}]</span>
              {p.github_stars > 0 && (
                <span className="text-xs text-yellow-500 font-bold">★ {p.github_stars}</span>
              )}
            </div>
            <p className="text-xs text-gray-400 max-w-2xl leading-relaxed">{p.short_desc}</p>
            <div className="text-[11px] text-terminal-green">
              Tech: {p.tech_stack?.join(", ")}
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold pt-1">
              {p.github_url && (
                <a href={p.github_url} target="_blank" rel="noopener noreferrer" className="text-terminal-purple hover:underline">
                  Code ↗
                </a>
              )}
              {p.live_demo_url && (
                <a href={p.live_demo_url} target="_blank" rel="noopener noreferrer" className="text-terminal-purple hover:underline">
                  Demo ↗
                </a>
              )}
              <a href={`/projects/${p.slug}`} target="_blank" rel="noopener noreferrer" className="text-terminal-purple hover:underline">
                Case Study ↗
              </a>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Keyboard navigation & Tab autocomplete
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex = historyIndex + 1;
      if (newIndex < commandHistory.length) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const newIndex = historyIndex - 1;
      if (newIndex >= 0) {
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const trimmed = input.trim().toLowerCase();
      if (!trimmed) return;

      const matches = COMMANDS.filter(c => c.startsWith(trimmed));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        // Output alternatives
        setLines(prev => [
          ...prev,
          {
            id: Math.random().toString(),
            type: "input",
            content: (
              <div className="flex items-center gap-2">
                <span className="text-terminal-green">~</span>
                <span className="text-terminal-purple">portfolio</span>
                <span className="text-gray-500">$</span>
                <span className="text-terminal-text ml-1">{input}</span>
              </div>
            )
          },
          {
            id: Math.random().toString(),
            type: "system",
            content: <div className="text-gray-500 font-mono text-xs mt-1">{matches.join("    ")}</div>
          }
        ]);
      }
    }
  }

  return (
    <div
      onClick={handleContainerClick}
      className="flex-1 flex flex-col bg-terminal-bg border border-terminal-border rounded-xl overflow-hidden shadow-2xl h-[550px] cursor-text"
    >
      {/* OS window border */}
      <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 flex-shrink-0 select-none">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-xs text-gray-500 font-mono">saurabh — bash</span>
      </div>

      {/* Output screen */}
      <div
        ref={containerRef}
        className="flex-1 p-5 overflow-y-auto font-mono text-sm space-y-3 scrollbar-thin scrollbar-thumb-white/10"
      >
        {lines.map(line => (
          <div
            key={line.id}
            className={`${
              line.type === "error"
                ? "text-red-400"
                : line.type === "system"
                ? "text-gray-500"
                : "text-terminal-text"
            }`}
          >
            {line.content}
          </div>
        ))}

        {/* Current Command Line Prompt */}
        <div className="flex items-center gap-2 pt-1">
          <span className="text-terminal-green font-bold">~</span>
          <span className="text-terminal-purple font-bold">portfolio</span>
          <span className="text-gray-500 font-bold">$</span>
          <div className="flex-1 relative flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className="w-full bg-transparent border-none outline-none font-mono text-sm text-terminal-text caret-terminal-green pl-1"
              autoComplete="off"
              autoCapitalize="off"
              spellCheck="false"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
