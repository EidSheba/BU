"use client";

import { useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

interface UseScrollAnimationReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  y: MotionValue<number>;
}

/**
 * Tracks scroll progress of a container element and returns
 * derived motion values for opacity, scale, and y-offset.
 */
export function useScrollAnimation(): UseScrollAnimationReturn {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return { ref, scrollYProgress, opacity, scale, y };
}
