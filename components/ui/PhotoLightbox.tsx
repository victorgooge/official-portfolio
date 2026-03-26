"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  thumbSize?: number;
}

export default function PhotoLightbox({ src, alt, thumbSize = 96 }: Props) {
  const [open, setOpen]   = useState(false);
  const reduce            = useReducedMotion();

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Thumbnail */}
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="View full photo"
        whileHover={reduce ? {} : { scale: 1.06 }}
        whileTap={reduce ? {} : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="mb-6 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFB2] group relative"
      >
        <div
          className="rounded-full overflow-hidden border-2 border-[#00FFB2]/30 group-hover:border-[#00FFB2]/70 transition-colors duration-300"
          style={{ width: thumbSize, height: thumbSize }}
        >
          <Image
            src={src}
            alt={alt}
            width={thumbSize}
            height={thumbSize}
            className="object-cover w-full h-full"
            priority
          />
        </div>
        {/* "click to expand" hint */}
        <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-mono text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          click to expand
        </span>
      </motion.button>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[1000] bg-black/80 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />

            {/* Photo */}
            <motion.div
              key="photo"
              className="fixed inset-0 z-[1001] flex items-center justify-center p-6 pointer-events-none"
              initial={reduce ? {} : { opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? {} : { opacity: 0, scale: 0.6 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <div className="relative pointer-events-auto rounded-full overflow-hidden border-4 border-[#00FFB2]/40 shadow-[0_0_80px_rgba(0,255,178,0.2)]"
                style={{ width: "min(360px, 80vw)", height: "min(360px, 80vw)" }}>
                <Image
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="360px"
                />
              </div>
            </motion.div>

            {/* Close button */}
            <motion.button
              key="close"
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close photo"
              className="fixed top-5 right-5 z-[1002] p-2 rounded-full border border-white/10 bg-[#0A0A0F]/80 text-[#6B7280] hover:text-[#F0F0F0] hover:border-[#00FFB2]/40 transition-colors"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ delay: 0.1 }}
            >
              <X size={18} />
            </motion.button>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
