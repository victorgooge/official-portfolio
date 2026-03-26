import FadeUp from "@/components/animations/FadeUp";

interface TimelineEntry {
  role: string;
  org: string;
  period: string;
  type: "work" | "education" | "course";
  bullets: string[];
}

const TIMELINE: TimelineEntry[] = [
  {
    role: "CS Student",
    org: "Georgia State University",
    period: "2023 — Present",
    type: "education",
    bullets: [
      "Bachelor of Science in Computer Science, on track for Spring 2026 graduation",
      "Relevant coursework: Operating Systems, Web Programming, Data Structures & Algorithms, Systems Programming, Databases",
      "Dean's List recognition for academic performance",
    ],
  },
  {
    role: "Operating Systems",
    org: "GSU — CSC 4320",
    period: "2024",
    type: "course",
    bullets: [
      "Implemented CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority) in C",
      "Studied process synchronization, deadlock detection, and memory management strategies",
      "Built a process scheduler simulator with Gantt chart output as the semester project",
    ],
  },
  {
    role: "Systems Programming",
    org: "GSU — CSC 3320",
    period: "2024",
    type: "course",
    bullets: [
      "Low-level C programming with POSIX APIs, file I/O, and system calls",
      "Topics: process creation (fork/exec), signals, pipes, shared memory",
      "Completed assignments in shell implementation and inter-process communication",
    ],
  },
];

const typeColors = {
  work:      { dot: "#00FFB2", label: "Work"      },
  education: { dot: "#7B61FF", label: "Education" },
  course:    { dot: "#F0F0F0", label: "Course"    },
};

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 bg-[#111118]/50">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs font-mono text-[#00FFB2] mb-2 tracking-widest uppercase">04 // Experience</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F0F0F0] mb-14">
            Background
          </h2>
        </FadeUp>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-3 top-2 bottom-2 w-px timeline-line hidden sm:block" aria-hidden />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((entry, i) => {
              const { dot, label } = typeColors[entry.type];
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="sm:pl-12 relative">
                    {/* Dot */}
                    <div
                      className="hidden sm:block absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-[#0A0A0F] flex items-center justify-center"
                      style={{ backgroundColor: dot }}
                      aria-hidden
                    />

                    {/* Card */}
                    <div className="rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-6 hover:border-white/10 transition-colors">
                      {/* Top row */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="text-xs font-mono px-2 py-0.5 rounded"
                            style={{ color: dot, backgroundColor: `${dot}14`, border: `1px solid ${dot}30` }}
                          >
                            {label}
                          </span>
                          <h3 className="font-display font-semibold text-[#F0F0F0]">{entry.role}</h3>
                        </div>
                        <span className="text-xs font-mono text-[#6B7280]">{entry.period}</span>
                      </div>

                      <p className="text-sm font-mono text-[#00FFB2] mb-4">{entry.org}</p>

                      <ul className="flex flex-col gap-2">
                        {entry.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3 text-sm text-[#6B7280]">
                            <span className="text-[#00FFB2] shrink-0 mt-0.5">▹</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
