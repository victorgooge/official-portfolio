"use client";

import FadeUp        from "@/components/animations/FadeUp";
import PhotoLightbox from "@/components/ui/PhotoLightbox";
import { MapPin, Briefcase, BookOpen, Zap } from "lucide-react";

const TERMINAL_LINES = [
  { prompt: "$ whoami",           output: "victor-googe"                      },
  { prompt: "$ cat location.txt", output: "Atlanta, GA"                       },
  { prompt: "$ echo $SCHOOL",     output: "Georgia State University"          },
  { prompt: "$ echo $MAJOR",      output: "CS + Data Science Certificate"     },
  { prompt: "$ cat status.txt",   output: "Seeking Summer 2026 Internship"    },
  { prompt: "$ ls interests/",    output: "web  mobile  ML  systems  fintech" },
];

const currently = [
  { icon: MapPin,    text: "Georgia State University — CS, Dec. 2026"         },
  { icon: Briefcase, text: "Lead SWE Intern @ The Zoku App"                   },
  { icon: Briefcase, text: "Open to Summer 2026 internships"                  },
  { icon: BookOpen,  text: "Building: PolyCapital (fintech)"                  },
  { icon: Zap,       text: "CodePath E3 Scholar — TIP103"                     },
];

export default function About() {
  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs font-mono text-[#00FFB2] mb-2 tracking-widest uppercase">01 // About</p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — text */}
          <div>
            <FadeUp delay={0.05}>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F0F0F0] mb-6">
                The person behind the code
              </h2>
            </FadeUp>

            {/* Headshot */}
            <FadeUp delay={0.08}>
              <PhotoLightbox src="/headshot.png" alt="Victor Googe" thumbSize={96} />
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                I&apos;m Victor — a Computer Science student at Georgia State University
                pursuing a BS in CS with a Certificate in Data Science. I&apos;m currently
                working as a Lead Software Engineer Intern at The Zoku App, where I oversee
                frontend development and manage a team of interns building a React Native
                mobile application.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="text-[#6B7280] leading-relaxed mb-4">
                My work spans the full stack — from secure REST APIs with JWT auth and
                MongoDB on the backend, to polished cross-platform UIs in React and React
                Native on the frontend. I&apos;ve also applied machine learning in projects
                like PC Build Optimizer, and I&apos;m currently co-founding PolyCapital,
                a fintech app built for both web and mobile.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[#6B7280] leading-relaxed mb-8">
                Outside of code I&apos;m a CodePath E3 Scholar sharpening my interview
                prep and cybersecurity fundamentals, and I&apos;m always chasing the next
                problem worth building a solution for.
              </p>
            </FadeUp>

            {/* Currently block */}
            <FadeUp delay={0.25}>
              <div className="rounded-xl border border-white/[0.06] bg-[#111118] p-5">
                <p className="text-xs font-mono text-[#00FFB2] mb-4 tracking-widest uppercase">Currently</p>
                <ul className="flex flex-col gap-3">
                  {currently.map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-center gap-3 text-sm text-[#6B7280]">
                      <Icon size={14} className="text-[#00FFB2] shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeUp>
          </div>

          {/* Right — terminal window */}
          <FadeUp delay={0.15} className="md:sticky md:top-24">
            <div className="rounded-xl border border-white/[0.06] bg-[#111118] overflow-hidden font-mono text-sm">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0A0A0F]">
                <span className="w-3 h-3 rounded-full bg-red-500/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <span className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-[#6B7280]">victor@portfolio ~ </span>
              </div>
              <div className="p-5 flex flex-col gap-2">
                {TERMINAL_LINES.map(({ prompt, output }, i) => (
                  <div key={i}>
                    <p className="text-[#00FFB2]">{prompt}</p>
                    <p className="text-[#F0F0F0] pl-2">{output}</p>
                  </div>
                ))}
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-[#00FFB2]">$</span>
                  <span className="w-2 h-4 bg-[#00FFB2] animate-pulse ml-1" />
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
