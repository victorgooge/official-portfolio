"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, ChevronDown, Download } from "lucide-react";
import { GithubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";

const ROLES = [
  "CS Student",
  "Systems Developer",
  "Web Engineer",
  "Open to Internships",
];

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/vgooge",
    renderIcon: () => <GithubIcon width={13} height={13} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/victorgooge",
    renderIcon: () => <LinkedInIcon width={13} height={13} />,
  },
  {
    label: "Email",
    href: "mailto:vgooge1@student.gsu.edu",
    renderIcon: () => <Mail size={13} />,
  },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(id);
  }, [reduce]);

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center bg-grid overflow-hidden"
    >
      {/* Radial glow */}
      <div
        aria-hidden
        className="hero-glow pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
      />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Status badge */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#00FFB2]/20 bg-[#00FFB2]/5 text-xs font-mono text-[#00FFB2]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FFB2] animate-pulse" />
          Open to Summer 2026 Internships
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={reduce ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl tracking-tight text-[#F0F0F0] leading-none mb-4"
        >
          Victor{" "}
          <span className="text-accent text-glow">Googe</span>
        </motion.h1>

        {/* Cycling role */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="h-8 flex items-center justify-center mb-8"
        >
          <span className="text-[#6B7280] font-mono text-base mr-2">~/</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={reduce ? {} : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? {} : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-base text-[#F0F0F0]"
            >
              {ROLES[roleIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="ml-0.5 w-0.5 h-5 bg-[#00FFB2] animate-pulse" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-[#6B7280] text-base sm:text-lg max-w-lg leading-relaxed mb-10"
        >
          CS student at Georgia State University. I build things from bare-metal
          systems to polished web interfaces.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <button
            type="button"
            onClick={() => handleScroll("#projects")}
            className="px-6 py-3 rounded-lg bg-[#00FFB2] text-[#0A0A0F] font-display font-semibold text-sm hover:bg-[#00e6a0] transition-colors glow-accent"
          >
            View My Work
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/10 text-[#F0F0F0] font-mono text-sm hover:border-[#00FFB2]/30 hover:bg-white/[0.03] transition-colors"
          >
            <Download size={15} />
            Download Resume
          </a>
        </motion.div>

        {/* Social pills */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex gap-3"
        >
          {socials.map(({ label, href, renderIcon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs font-mono text-[#6B7280] hover:text-[#F0F0F0] hover:border-white/20 transition-colors"
            >
              {renderIcon()}
              {label}
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        onClick={() => handleScroll("#about")}
        aria-label="Scroll to About"
        initial={reduce ? {} : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#6B7280] hover:text-[#00FFB2] transition-colors group"
      >
        <span className="text-xs font-mono">scroll</span>
        <ChevronDown size={18} className="animate-bounce group-hover:text-[#00FFB2]" />
      </motion.button>
    </section>
  );
}
