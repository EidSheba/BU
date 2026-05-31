"use client";

import { useReducedMotion as useMotionReducedMotion } from "motion/react";

/** Returns true if the user has enabled "reduce motion" in their OS settings */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false;
}
