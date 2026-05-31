"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delayChildren = 0,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Child item to use inside StaggerContainer
export function StaggerItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
