import type { ReactNode, CSSProperties } from "react";

export interface ChildrenProps {
  children: ReactNode;
}

export interface ClassNameProps {
  className?: string;
}

export interface StyleProps {
  style?: CSSProperties;
}

export type BaseProps = ChildrenProps & ClassNameProps & StyleProps;

// Animation direction types
export type Direction = "up" | "down" | "left" | "right";
export type AnimationVariant = "fade" | "slide" | "scale" | "blur";
