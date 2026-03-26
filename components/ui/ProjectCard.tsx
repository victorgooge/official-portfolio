"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import type { Project } from "@/content/projects";

interface ProjectCardProps {
  project:   Project;
  featured?: boolean;
  index?:    number;
}

const categoryColors: Record<string, string> = {
  Web:     "text-[#00FFB2] border-[#00FFB2]/30 bg-[#00FFB2]/5",
  Systems: "text-[#7B61FF] border-[#7B61FF]/30 bg-[#7B61FF]/5",
  Tools:   "text-amber-400 border-amber-400/30 bg-amber-400/5",
  ML:      "text-sky-400 border-sky-400/30 bg-sky-400/5",
  Other:   "text-[#6B7280] border-[#6B7280]/30 bg-[#6B7280]/5",
};

const statusLabel: Record<string, string> = {
  "complete":    "",
  "in-progress": "In Progress",
  "archived":    "Archived",
};

export default function ProjectCard({ project, featured = false, index = 0 }: ProjectCardProps) {
  const reduce = useReducedMotion();

  // 3-D tilt values
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const sx   = useSpring(rawX, { stiffness: 200, damping: 22 });
  const sy   = useSpring(rawY, { stiffness: 200, damping: 22 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [7, -7]);
  const glareX  = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const glareY  = useTransform(sy, [-0.5, 0.5], [0, 100]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <div
      className={`card-3d ${featured ? "md:col-span-2" : ""}`}
    >
      <motion.article
        initial={{ opacity: 0, y: reduce ? 0 : 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : index * 0.1 }}
        style={
          reduce
            ? undefined
            : { rotateX, rotateY, transformStyle: "preserve-3d" }
        }
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="group relative flex flex-col rounded-xl border bg-[#111118] p-6 transition-colors duration-300 border-white/[0.06] hover:border-[#00FFB2]/20 hover:glow-accent"
      >
        {/* Glare overlay */}
        {!reduce && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(0,255,178,0.07) 0%, transparent 60%)`,
            }}
          />
        )}

        {/* Top row */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex flex-wrap gap-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded border ${categoryColors[project.category] ?? categoryColors.Other}`}>
              {project.category}
            </span>
            {project.status !== "complete" && (
              <span className="text-xs font-mono px-2 py-0.5 rounded border border-amber-400/30 bg-amber-400/5 text-amber-400">
                {statusLabel[project.status]}
              </span>
            )}
          </div>
          <div className="flex gap-3 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} GitHub`}
                className="text-[#6B7280] hover:text-[#F0F0F0] transition-colors"
              >
                <GithubIcon width={17} height={17} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="text-[#6B7280] hover:text-[#00FFB2] transition-colors"
              >
                <ExternalLink size={17} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg font-semibold text-[#F0F0F0] mb-2 group-hover:text-[#00FFB2] transition-colors">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-[#6B7280] leading-relaxed mb-5 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs font-mono text-[#6B7280] bg-white/[0.04] px-2 py-0.5 rounded"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowRight size={16} className="text-[#00FFB2]" />
        </div>
      </motion.article>
    </div>
  );
}
