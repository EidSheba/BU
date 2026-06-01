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
    category: "MEDIA",
    client: ["SAUDI", "TOURISM AUTHORITY"],
    image: "/images/grid-media-1.jpg",
  },
  {
    category: "FILM & CONTENT",
    client: ["RED SEA", "FILM FESTIVAL"],
    image: "/images/grid-film-1.jpg",
  },
];

export default function WorkSliderSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
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
      const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);
      if (!outer || cards.length < 2) return;

      const n = cards.length;

      gsap.set(cards[0], { xPercent: 0 });
      cards.slice(1).forEach((c) => gsap.set(c, { xPercent: 100 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: outer,
          start: "top top",
          end: `+=${(n - 1) * window.innerHeight}`,
          scrub: 1,
          snap: {
            snapTo: 1 / (n - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.inOut",
          },
          onUpdate: (self: any) => {
            const idx = Math.round(self.progress * (n - 1));
            dotsRef.current.forEach((dot, j) => {
              if (!dot) return;
              dot.classList.toggle(styles.dotActive, j === idx);
            });
          },
        },
      });

      for (let i = 0; i < n - 1; i++) {
        tl.fromTo(
          cards[i],
          { xPercent: 0 },
          { xPercent: -100, ease: "none", duration: 1 },
          i
        );
        tl.fromTo(
          cards[i + 1],
          { xPercent: 100 },
          { xPercent: 0, ease: "none", duration: 1 },
          i
        );
      }

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={outerRef} className={styles.outer}>
      <div className={styles.section}>

        {SLIDES.map((slide, i) => (
          <div
            key={i}
            ref={(el) => { cardsRef.current[i] = el; }}
            className={styles.card}
          >
            {/* Image frame — smaller than the full section */}
            <div className={styles.imgWrap}>
              {/* position:relative wrapper for next/image fill */}
              <div className={styles.imgInner}>
                <Image
                  src={slide.image}
                  alt={slide.client.join(" ")}
                  fill
                  sizes="65vw"
                  className={styles.img}
                  priority={i === 0}
                />
              </div>

              {/* Gradient overlay for text readability */}
              <div className={styles.gradient} />

              {/* Text on top of image */}
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

        {/* Dots stay fixed in the dark left strip */}
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
