"use client";

import type { CSSProperties, ReactNode } from "react";
import { useParallax } from "@/hooks/useParallax";

type ParallaxProps = {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
};

export function Parallax({ children, speed = 0.2, className = "", style }: ParallaxProps) {
  const { ref, style: parallaxStyle } = useParallax(speed);

  return (
    <div ref={ref} className={className} style={{ ...style, ...parallaxStyle }}>
      {children}
    </div>
  );
}
