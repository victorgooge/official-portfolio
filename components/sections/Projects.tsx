"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeUp       from "@/components/animations/FadeUp";
import TextScramble from "@/components/ui/TextScramble";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/content/projects";
import type { ProjectCategory } from "@/content/projects";

const FILTERS = ["All", "Web", "ML", "Systems", "Tools"] as const;
type Filter = (typeof FILTERS)[number];

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");

  const visible = active === "All"
    ? projects
    : projects.filter((p) => p.category === active);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeUp>
          <p className="text-xs font-mono text-[#00FFB2] mb-2 tracking-widest uppercase">03 // Projects</p>
        </FadeUp>
        <FadeUp delay={0.05}>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#F0F0F0] mb-3">
            <TextScramble text="Things I've built" />
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="text-[#6B7280] text-sm mb-10 max-w-lg">
            A selection of personal projects across full-stack web, mobile, and machine learning.
          </p>
        </FadeUp>

        {/* Filter tabs */}
        <FadeUp delay={0.12}>
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map((f) => (
              <button
                type="button"
                key={f}
                onClick={() => setActive(f)}
                className={`text-xs font-mono px-4 py-1.5 rounded-full border transition-colors
                  ${active === f
                    ? "border-[#00FFB2] bg-[#00FFB2]/10 text-[#00FFB2]"
                    : "border-white/[0.08] text-[#6B7280] hover:border-white/20 hover:text-[#F0F0F0]"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>
        </FadeUp>

        {/* Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 gap-5"
        >
          {visible.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              featured={project.featured}
              index={i}
            />
          ))}
        </motion.div>

        {visible.length === 0 && (
          <p className="text-center text-[#6B7280] font-mono text-sm py-16">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
