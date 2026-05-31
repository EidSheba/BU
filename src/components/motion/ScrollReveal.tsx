"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { ANIMATION_DURATION, ANIMATION_EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Direction } from "@/types";

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 50 },
  down: { x: 0, y: -50 },
  left: { x: 50, y: 0 },
  right: { x: -50, y: 0 },
};

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  direction?: Direction;
  delay?: number;
  duration?: number;
  /** fraction of element visible before triggering (0–1) */
  threshold?: number;
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = ANIMATION_DURATION.slow,
  threshold = 0.15,
  ...props
}: ScrollRevealProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, delay, ease: ANIMATION_EASE.smooth }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
