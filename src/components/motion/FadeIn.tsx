"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { ANIMATION_DURATION, ANIMATION_EASE } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FadeInProps extends HTMLMotionProps<"div"> {
  delay?: number;
  duration?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = ANIMATION_DURATION.normal,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay, ease: ANIMATION_EASE.gentle }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
