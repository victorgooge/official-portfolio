"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          whileHover={reduce ? {} : { scale: 1.1, y: -2 }}
          whileTap={reduce ? {} : { scale: 0.92 }}
          className="fixed bottom-8 right-6 z-[150] p-3 rounded-full border border-[#00FFB2]/30 bg-[#0A0A0F]/90 text-[#00FFB2] backdrop-blur-sm hover:border-[#00FFB2]/70 hover:bg-[#00FFB2]/10 hover:shadow-[0_0_20px_rgba(0,255,178,0.2)] transition-colors"
        >
          <ArrowUp size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
