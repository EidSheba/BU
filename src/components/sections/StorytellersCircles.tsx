"use client";

import { useEffect, useRef } from "react";
import styles from "./StorytellersCircles.module.css";

const WORD = "STORYTELLERS";

interface RingProps {
  radius: number;
  fontSize: number;
}

function Ring({ radius, fontSize }: RingProps) {
  const letters = WORD.split("");
  const angleStep = 360 / letters.length;
  const size = (radius + fontSize * 1.4) * 2;
  const half = size / 2;

  return (
    <svg
      className={styles.svg}
      width={size}
      height={size}
      viewBox={`${-half} ${-half} ${size} ${size}`}
    >
      {letters.map((letter, i) => {
        const angle = i * angleStep - 90;
        return (
          <text
            key={i}
            transform={`rotate(${angle}) translate(0, ${-radius})`}
            textAnchor="middle"
            dominantBaseline="auto"
            fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
            fontSize={fontSize}
            fontWeight="900"
            fill="#d0d0d0"
          >
            {letter}
          </text>
        );
      })}
    </svg>
  );
}

const RINGS = [
  { radius: 480, fontSize: 110 },
  { radius: 340, fontSize: 82 },
  { radius: 220, fontSize: 56 },
  { radius: 125, fontSize: 34 },
  { radius: 58,  fontSize: 18 },
  { radius: 18,  fontSize:  8 },
];

// Container = 380vh, scrollable = 280vh → 280/380 ≈ 73.7% of container height.
// Each ring takes 40% of scroll to fully appear.
// Next ring starts when the previous is at 30% of its animation.
const SCROLL_SPAN   = 0.40;
const SCROLL_OFFSET = 0.30 * SCROLL_SPAN; // = 0.12

export default function StorytellersCircles() {
  const ringRefs = useRef<(HTMLDivElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());

      const el = containerRef.current;
      if (!el) return;

      // Container = 380vh, scrollable = 280vh → 280/380 ≈ 73.7% of container height
      const p = (f: number) => `top+=${Math.min(f, 1) * 73.7}% top`;

      RINGS.forEach((_, i) => {
        const ref = ringRefs.current[i];
        if (!ref) return;

        const startFrac = i * SCROLL_OFFSET;
        const endFrac   = startFrac + SCROLL_SPAN;
                const fromScale    = 0.05;
        const fromOpacity  = 0;
        // Alternate rotation direction per ring so each one spins a different way
        const fromRotation = i % 2 === 0 ? 180 : -180;

        gsap.set(ref, { scale: fromScale, opacity: fromOpacity, rotation: fromRotation });

        const t = gsap.fromTo(
          ref,
          { scale: fromScale, opacity: fromOpacity, rotation: fromRotation },
          {
            scale: 1,
            opacity: 1,
            rotation: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: p(startFrac),
              end:   p(endFrac),
              scrub: 1.5,
            },
          }
        );
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
      });
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        {RINGS.map((ring, i) => (
          <div
            key={i}
            ref={(el) => { ringRefs.current[i] = el; }}
            className={`${styles.ring} ${i === 0 ? styles.ringOuter : styles.ringInner}`}
          >
            <Ring radius={ring.radius} fontSize={ring.fontSize} />
          </div>
        ))}
      </div>
    </div>
  );
}
