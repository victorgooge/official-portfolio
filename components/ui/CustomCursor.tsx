"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const reduce   = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState(false);

  // Raw mouse position — motionValues, never triggers React re-renders
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot: tight spring — feels instant
  const dotX = useSpring(rawX, { stiffness: 900, damping: 40, mass: 0.4 });
  const dotY = useSpring(rawY, { stiffness: 900, damping: 40, mass: 0.4 });

  // Ring: looser spring — trails slightly behind
  const ringX = useSpring(rawX, { stiffness: 180, damping: 26, mass: 0.8 });
  const ringY = useSpring(rawY, { stiffness: 180, damping: 26, mass: 0.8 });

  useEffect(() => {
    // Only on non-touch, non-reduced-motion devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (reduce) return;

    setVisible(true);

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      // Pointer detection: check target element only (no getComputedStyle)
      const target = e.target as Element | null;
      setPointer(
        target !== null &&
        (target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null)
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce, rawX, rawY]);

  if (!visible) return null;

  return (
    <>
      {/* Dot — offset by half its own size (4px) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00FFB2] pointer-events-none mix-blend-difference"
        style={{ x: dotX, y: dotY, scale: pointer ? 1.8 : 1 }}
        transition={{ scale: { type: "spring", stiffness: 400, damping: 25 } }}
      />
      {/* Ring — offset by half its own size (16px) */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00FFB2]/30 pointer-events-none"
        style={{ x: ringX, y: ringY }}
        animate={{ scale: pointer ? 1.5 : 1, opacity: pointer ? 0.6 : 0.3 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />
    </>
  );
}
