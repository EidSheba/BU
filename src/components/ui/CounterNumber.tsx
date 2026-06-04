"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** When provided, IntersectionObserver is skipped — counting starts when this flips to true */
  started?: boolean;
}

function runCount(value: number, duration: number, onTick: (n: number) => void) {
  const startTime = performance.now();
  const tick = (now: number) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    onTick(Math.floor(eased * value));
    if (progress < 1) requestAnimationFrame(tick);
    else onTick(value);
  };
  requestAnimationFrame(tick);
}

export default function CounterNumber({
  value,
  suffix = "",
  duration = 1800,
  className,
  started,
}: Props) {
  const [count, setCount] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const fired   = useRef(false);

  /* Mode A — external trigger (GSAP panels) */
  useEffect(() => {
    if (started === undefined || !started || fired.current) return;
    fired.current = true;
    runCount(value, duration, setCount);
  }, [started, value, duration]);

  /* Mode B — IntersectionObserver (standalone use) */
  useEffect(() => {
    if (started !== undefined) return;
    const el = spanRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || fired.current) return;
        fired.current = true;
        obs.disconnect();
        runCount(value, duration, setCount);
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [started, value, duration]);

  return (
    <span ref={spanRef} className={className}>
      {count}{suffix}
    </span>
  );
}
