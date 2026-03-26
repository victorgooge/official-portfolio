"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  strength?: number;
}

export default function MagneticButton({
  children,
  className,
  onClick,
  type = "button",
  strength = 0.28,
}: Props) {
  const ref    = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x    = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.5 });
  const y    = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.5 });

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left - rect.width  / 2) * strength);
    rawY.set((e.clientY - rect.top  - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={reduce ? undefined : { x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
