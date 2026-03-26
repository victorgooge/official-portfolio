"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Drop this inside any `relative` container.
 * It renders a radial glow that follows the mouse within that container.
 */
export default function CursorSpotlight({
  color = "0,255,178",
  size  = 700,
  opacity = 0.055,
}: {
  color?:   string;
  size?:    number;
  opacity?: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(${size}px circle at ${x}px ${y}px, rgba(${color},${opacity}), transparent 55%)`;
    };

    const onLeave = () => { el.style.background = "none"; };

    parent.addEventListener("mousemove", onMove, { passive: true });
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce, color, size, opacity]);

  if (reduce) return null;
  return <div ref={ref} className="absolute inset-0 pointer-events-none z-[1] rounded-[inherit]" aria-hidden />;
}
