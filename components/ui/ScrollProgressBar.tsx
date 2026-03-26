"use client";

import { useScroll, motion, useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#00FFB2] z-[200] origin-left pointer-events-none"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
