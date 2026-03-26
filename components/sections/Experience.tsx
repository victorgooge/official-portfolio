import FadeUp from "@/components/animations/FadeUp";

interface TimelineEntry {
  role: string;
  org: string;
  period: string;
  location?: string;
  type: "work" | "education" | "course";
  bullets: string[];
}

const TIMELINE: TimelineEntry[] = [
  {
    role: "Lead Software Engineer Intern",
    org: "The Zoku App",
    period: "March 2025 — Present",
    location: "Atlanta, GA (Remote)",
    type: "work",
    bullets: [
      "Oversaw frontend development team, assuming full responsibility over frontend legacy code for the mobile application.",
      "Managed several interns, assigning tasks and delegating read-write permissions to the codebase.",
      "Designed and delivered Figma wireframes that guided a full UI overhaul, streamlining navigation and enhancing user onboarding.",
      "Partnered cross-functionally with the project manager in Agile sprints over 8 weeks to define requirements and prioritize feature development.",
      "Established a company-wide GitHub Org, improving version control and enabling smoother collaboration across current and future interns.",
      "Implemented 5+ new frontend features and optimized existing components, resulting in faster rendering and improved user engagement.",
      "Engineered an interactive geolocation system that enabled location-based app functionality.",
      "Refactored and modularized legacy code, improving reusability and cutting development time for new features.",
    ],
  },
  {
    role: "E3 Scholar",
    org: "CodePath",
    period: "April 2024 — Present",
    location: "Atlanta, GA",
    type: "course",
    bullets: [
      "Selected for CodePath's competitive E3 Scholars Program focused on industry-ready engineering skills.",
      "Completed Android Development (AND101) with Kotlin and Expo.",
      "Completed Cybersecurity fundamentals course (CYB102).",
      "Currently enrolled in Advanced Technical Interview Prep (TIP103) covering advanced DSA and system design.",
    ],
  },
  {
    role: "CS Student",
    org: "Georgia State University",
    period: "Aug. 2022 — Dec. 2026",
    location: "Atlanta, GA",
    type: "education",
    bullets: [
      "Bachelor of Science in Computer Science with a Certificate in Data Science — expected December 2026.",
      "Relevant coursework: Software Engineering, Data Structures & Algorithms, Machine Learning, Data Science, Big Data Programming, Operating Systems.",
    ],
  },
];

const typeColors = {
  work:      { dot: "#00FFB2", label: "Work"      },
  education: { dot: "#7B61FF", label: "Education" },
  course:    { dot: "#F0A500", label: "Program"   },
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

        <div className="relative">
          <div className="absolute left-3 top-2 bottom-2 w-px timeline-line hidden sm:block" aria-hidden />

          <div className="flex flex-col gap-10">
            {TIMELINE.map((entry, i) => {
              const { dot, label } = typeColors[entry.type];
              return (
                <FadeUp key={i} delay={i * 0.1}>
                  <div className="sm:pl-12 relative">
                    <div
                      className="hidden sm:block absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 border-[#0A0A0F] flex items-center justify-center"
                      style={{ backgroundColor: dot }}
                      aria-hidden
                    />

                    <div className="rounded-xl border border-white/[0.06] bg-[#0A0A0F] p-6 hover:border-white/10 transition-colors">
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

                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-4">
                        <p className="text-sm font-mono text-[#00FFB2]">{entry.org}</p>
                        {entry.location && (
                          <span className="text-xs font-mono text-[#6B7280] sm:before:content-['—'] sm:before:mx-2">{entry.location}</span>
                        )}
                      </div>

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
