"use client";

import { useEffect, useRef } from "react";
import styles from "./ScrollRevealText.module.css";

interface Props {
  group1: string[];
  group2: string[];
}

export default function ScrollRevealText({ group1, group2 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const g1Refs       = useRef<(HTMLParagraphElement | null)[]>([]);
  const g2Refs       = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const s = Math.max(0, -el.getBoundingClientRect().top);

      // group1: reveal staggered, exit upward
      g1Refs.current.forEach((line, i) => {
        if (!line) return;
        const revealStart = i * 80;
        const revealEnd   = revealStart + 150;
        const exitStart   = 350 + i * 60;
        const exitEnd     = exitStart + 150;
        let clip: number, ty: number;
        if (s < revealStart)    { clip = 100; ty =  30; }
        else if (s < revealEnd) { const p = (s - revealStart)/(revealEnd - revealStart); clip = (1-p)*100; ty = (1-p)*30; }
        else if (s < exitStart) { clip = 0;   ty =   0; }
        else if (s < exitEnd)   { const p = (s - exitStart)/(exitEnd - exitStart); clip = p*100; ty = -p*30; }
        else                    { clip = 100; ty = -30; }
        line.style.clipPath  = s >= exitStart ? `inset(${clip}% 0 0 0)` : `inset(0 0 ${clip}% 0)`;
        line.style.transform = `translateY(${ty}px)`;
      });

      // group2
      g2Refs.current.forEach((line, i) => {
        if (!line) return;
        const wrapper     = line.parentElement as HTMLElement | null;
        const revealStart = 700 + i * 80;
        const revealEnd   = revealStart + 150;

        if (i === 0) {
          // "we are strategy-led" → exits upward
          const exitStart = 1200;
          const exitEnd   = 1450;
          let clip: number, ty: number;
          if (s < revealStart)    { clip = 100; ty =  30; }
          else if (s < revealEnd) { const p = (s-revealStart)/(revealEnd-revealStart); clip=(1-p)*100; ty=(1-p)*30; }
          else if (s < exitStart) { clip = 0; ty = 0; }
          else if (s < exitEnd)   { const p = (s-exitStart)/(exitEnd-exitStart); clip=p*100; ty=-p*40; }
          else                    { clip = 100; ty = -40; }
          line.style.clipPath  = s >= exitStart ? `inset(${clip}% 0 0 0)` : `inset(0 0 ${clip}% 0)`;
          line.style.transform = `translateY(${ty}px)`;
          line.style.opacity   = "1";
          if (wrapper) wrapper.style.overflow = "hidden";

        } else {
          // "storytellers" → shrinks to nothing (end of page)
          const shrinkStart = 1500;
          const shrinkEnd   = 2000;
          if (s < revealStart) {
            line.style.clipPath  = "inset(0 0 100% 0)";
            line.style.transform = "translateY(30px) scale(1)";
            line.style.opacity   = "1";
            if (wrapper) wrapper.style.overflow = "hidden";
          } else if (s < revealEnd) {
            const p = (s-revealStart)/(revealEnd-revealStart);
            line.style.clipPath  = `inset(0 0 ${(1-p)*100}% 0)`;
            line.style.transform = `translateY(${(1-p)*30}px) scale(1)`;
            line.style.opacity   = "1";
            if (wrapper) wrapper.style.overflow = "hidden";
          } else if (s < shrinkStart) {
            line.style.clipPath  = "none";
            line.style.transform = "translateY(0) scale(1)";
            line.style.opacity   = "1";
            if (wrapper) wrapper.style.overflow = "visible";
          } else if (s < shrinkEnd) {
            const p = (s-shrinkStart)/(shrinkEnd-shrinkStart);
            line.style.clipPath  = "none";
            line.style.transform = `scale(${1 - p})`;
            line.style.opacity   = `${1 - p}`;
            if (wrapper) wrapper.style.overflow = "visible";
          } else {
            line.style.clipPath  = "none";
            line.style.transform = "scale(0)";
            line.style.opacity   = "0";
            if (wrapper) wrapper.style.overflow = "visible";
          }
        }
      });
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        update();
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.textCenter}>
          <div className={styles.group}>
            {group1.map((line, i) => (
              <div key={i} className={styles.lineWrapper}>
                <p ref={(el) => { g1Refs.current[i] = el; }} className={styles.line}>
                  {line}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.group}>
            {group2.map((line, i) => (
              <div key={i} className={styles.lineWrapper}>
                <p
                  ref={(el) => { g2Refs.current[i] = el; }}
                  className={`${styles.line} ${i === 1 ? styles.storytellers : ""}`}
                >
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
