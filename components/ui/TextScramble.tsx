"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$@%&!?";

interface Props {
  text: string;
  className?: string;
  /** How many animation frames per character reveal (higher = slower) */
  speed?: number;
}

export default function TextScramble({ text, className, speed = 2.8 }: Props) {
  const [display, setDisplay] = useState(text);
  const ref    = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!inView || reduce) return;

    const chars       = text.split("");
    const totalFrames = Math.ceil(chars.length * speed);
    let frame = 0;
    let raf:  number;

    const tick = () => {
      const next = chars
        .map((char, i) => {
          if (char === " " || char === "'" || char === "\u2019") return char;
          const revealAt = Math.floor((i / chars.length) * totalFrames * 0.6);
          if (frame > revealAt) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(next);
      frame++;

      if (frame <= totalFrames) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, text, reduce, speed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
