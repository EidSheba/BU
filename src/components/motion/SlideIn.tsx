"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { ANIMATION_DURATION, ANIMATION_EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Direction } from "@/types";

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
};

interface SlideInProps extends HTMLMotionProps<"div"> {
  direction?: Direction;
  delay?: number;
  duration?: number;
}

export function SlideIn({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  ...props
}: SlideInProps) {
  const offset = directionOffset[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay, ease: ANIMATION_EASE.smooth }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
