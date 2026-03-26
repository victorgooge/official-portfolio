"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

const EMAIL = "vgooge1@student.gsu.edu";

interface OutputLine {
  type: "input" | "output" | "error" | "accent";
  text: string;
}

const HELP_TEXT = [
  "Available commands:",
  "  whoami     — who is this guy",
  "  skills     — tech stack",
  "  projects   — things I've built",
  "  contact    — how to reach me",
  "  hire       — let's talk",
  "  clear      — clear the terminal",
  "  exit       — close this window",
];

function processCommand(raw: string): OutputLine[] {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "whoami":
      return [
        { type: "output", text: "Victor Googe" },
        { type: "output", text: "CS Student @ Georgia State University" },
        { type: "output", text: "Systems programmer. Web engineer. Internship-seeking human." },
      ];
    case "skills":
      return [
        { type: "accent", text: "Languages:  C  C++  Python  TypeScript  JavaScript  SQL" },
        { type: "accent", text: "Systems:    Linux  POSIX  OS internals  GDB  Valgrind" },
        { type: "accent", text: "Web:        Next.js  React  Tailwind CSS  Framer Motion" },
        { type: "accent", text: "Tools:      Git  GitHub  Docker  Make  CMake  Vercel" },
      ];
    case "projects":
      return [
        { type: "output", text: "Process Scheduler Simulator" },
        { type: "output", text: "  → CPU scheduling algorithms in C (FCFS, SJF, RR, Priority)" },
        { type: "output", text: "  → github.com/vgooge/process-scheduler" },
        { type: "output", text: "" },
        { type: "output", text: "Student Score Tracker" },
        { type: "output", text: "  → Grade computation + CSV export CLI tool in C++" },
        { type: "output", text: "  → github.com/vgooge/student-score-tracker" },
        { type: "output", text: "" },
        { type: "output", text: "This Portfolio" },
        { type: "output", text: "  → Next.js 16 + Tailwind v4 + Framer Motion" },
        { type: "output", text: "  → github.com/vgooge/official-portfolio" },
      ];
    case "contact":
      return [
        { type: "output", text: `Email:    ${EMAIL}` },
        { type: "output", text: "GitHub:   github.com/vgooge" },
        { type: "output", text: "LinkedIn: linkedin.com/in/victorgooge" },
      ];
    case "hire":
      return [
        { type: "accent", text: "Great taste. Let's talk." },
        { type: "accent", text: `→ ${EMAIL}` },
        { type: "output", text: "Seeking Summer 2026 internships in software engineering." },
      ];
    case "help":
      return HELP_TEXT.map((t) => ({ type: "output" as const, text: t }));
    case "clear":
      return [{ type: "output", text: "__CLEAR__" }];
    case "exit":
      return [{ type: "output", text: "__EXIT__" }];
    case "":
      return [];
    default:
      return [
        { type: "error", text: `command not found: ${raw}` },
        { type: "output", text: 'Type "help" for available commands.' },
      ];
  }
}

const INITIAL_LINES: OutputLine[] = [
  { type: "accent", text: "victor@portfolio ~ " },
  { type: "output", text: 'Type "help" for available commands, "exit" to close.' },
  { type: "output", text: "" },
];

export default function TerminalEgg() {
  const [open, setOpen]     = useState(false);
  const [lines, setLines]   = useState<OutputLine[]>(INITIAL_LINES);
  const [input, setInput]   = useState("");
  const inputRef            = useRef<HTMLInputElement>(null);
  const bottomRef           = useRef<HTMLDivElement>(null);
  const reduce              = useReducedMotion();

  // Open on Ctrl+` (backtick)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "`") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const close = useCallback(() => setOpen(false), []);

  const submit = useCallback(() => {
    if (!input.trim() && input !== "") {
      setInput("");
      return;
    }
    const inputLine: OutputLine = { type: "input", text: input };
    const result = processCommand(input);

    if (result.length === 1 && result[0].text === "__EXIT__") {
      setOpen(false);
      setInput("");
      return;
    }
    if (result.length === 1 && result[0].text === "__CLEAR__") {
      setLines(INITIAL_LINES);
      setInput("");
      return;
    }

    setLines((prev) => [...prev, inputLine, ...result]);
    setInput("");
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") submit();
  };

  return (
    <>
      {/* Hint badge — visible only when closed */}
      <AnimatePresence>
        {!open && (
          <motion.button
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 right-6 z-40 text-xs font-mono px-3 py-1.5 rounded-full border border-[#00FFB2]/20 bg-[#0A0A0F]/80 text-[#00FFB2]/60 hover:text-[#00FFB2] hover:border-[#00FFB2]/40 backdrop-blur-sm transition-colors"
            aria-label="Open terminal"
          >
            ^` terminal
          </motion.button>
        )}
      </AnimatePresence>

      {/* Terminal overlay */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={close}
              aria-hidden
            />

            {/* Terminal window */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                         w-[90vw] max-w-2xl h-[70vh] max-h-[520px]
                         flex flex-col rounded-xl border border-white/[0.08] bg-[#0A0A0F]/95 backdrop-blur-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] shrink-0">
                <button
                  type="button"
                  onClick={close}
                  className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors"
                  aria-label="Close terminal"
                />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 flex-1 text-center text-xs text-[#6B7280] font-mono select-none">
                  victor@portfolio — terminal
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="text-[#6B7280] hover:text-[#F0F0F0] transition-colors"
                  aria-label="Close"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Output */}
              <div className="flex-1 overflow-y-auto p-4 font-mono text-sm flex flex-col gap-0.5 scroll-smooth">
                {lines.map((line, i) => (
                  <p
                    key={i}
                    className={
                      line.type === "input"
                        ? "text-[#F0F0F0]"
                        : line.type === "accent"
                        ? "text-[#00FFB2]"
                        : line.type === "error"
                        ? "text-red-400"
                        : "text-[#6B7280]"
                    }
                  >
                    {line.type === "input" && (
                      <span className="text-[#00FFB2] select-none">$ </span>
                    )}
                    {line.text}
                  </p>
                ))}
                <div ref={bottomRef} />
              </div>

              {/* Input row */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] shrink-0">
                <span className="text-[#00FFB2] font-mono text-sm select-none">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="type a command..."
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  className="flex-1 bg-transparent text-sm font-mono text-[#F0F0F0] placeholder-[#6B7280]/40 outline-none caret-[#00FFB2]"
                  aria-label="Terminal input"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
