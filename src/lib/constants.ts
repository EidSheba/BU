export const ANIMATION_DURATION = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.7,
} as const;

export const ANIMATION_EASE = {
  smooth: [0.25, 0.46, 0.45, 0.94],
  snappy: [0.68, -0.55, 0.27, 1.55],
  gentle: [0.4, 0, 0.2, 1],
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
