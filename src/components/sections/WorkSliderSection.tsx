"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./WorkSliderSection.module.css";

const SLIDES = [
  {
    category: "ADVERTISING",
    client: ["MINISTRY OF TOURISM", "EGYPT"],
    image: "/images/grid-event-1.jpg",
  },
  {
    category: "CREATIVE",
    client: ["NILE", "HOSPITALITY GROUP"],
    image: "/images/grid-creative-1.jpg",
  },
  {
    category: "EVENTS",
    client: ["WORLD FUTURE", "ENERGY SUMMIT"],
    image: "/images/grid-perf-1.jpg",
  },
  {
    category: "FILM & CONTENT",
    client: ["RED SEA", "FILM FESTIVAL"],
    image: "/images/grid-film-1.jpg",
  },
];

const N = SLIDES.length;

export default function WorkSliderSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef  = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      ({ gsap }          = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const outer = outerRef.current;
      const track = trackRef.current;
      if (!outer || !track) return;

      // Slide the whole track left: 0% → −(N−1)/N × 100%
      const endXPercent = -((N - 1) / N) * 100;

      const anim = gsap.fromTo(
        track,
        { xPercent: 0 },
        {
          xPercent: endXPercent,
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: `+=${(N - 1) * window.innerHeight}`,
            scrub: 0.6,
            snap: {
              snapTo: 1 / (N - 1),
              duration: { min: 0.3, max: 0.6 },
              delay: 0.1,
              ease: "power1.inOut",
            },
            onUpdate: (self: any) => {
              const idx = Math.round(self.progress * (N - 1));
              dotsRef.current.forEach((dot, j) => {
                if (!dot) return;
                dot.classList.toggle(styles.dotActive, j === idx);
              });
            },
          },
        }
      );

      if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={outerRef} className={styles.outer}>
      <div className={styles.section}>

        {/* Single track — all cards sit side-by-side, track slides left */}
        <div
          ref={trackRef}
          className={styles.track}
        >
          {SLIDES.map((slide, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imgWrap}>
                <div className={styles.imgInner}>
                  <Image
                    src={slide.image}
                    alt={slide.client.join(" ")}
                    fill
                    sizes="65vw"
                    className={styles.img}
                    loading="eager"
                  />
                </div>
                <div className={styles.gradient} />
                <div className={styles.text}>
                  <span className={styles.category}>{slide.category}</span>
                  <h2 className={styles.title}>
                    {slide.client.map((line, k) => (
                      <span key={k} className={styles.titleLine}>{line}</span>
                    ))}
                  </h2>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots stay fixed — never move with the track */}
        <div className={styles.dots}>
          {SLIDES.map((_, j) => (
            <span
              key={j}
              ref={(el) => { dotsRef.current[j] = el; }}
              className={`${styles.dot}${j === 0 ? ` ${styles.dotActive}` : ""}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
