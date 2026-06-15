"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./WorkSliderSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const SLIDES = [
  {
    category_en: "ADVERTISING",
    category_ar: "إعلانات",
    client_en: ["MINISTRY OF TOURISM", "EGYPT"],
    client_ar: ["وزارة السياحة", "مصر"],
    image: "/images/grid-event-1.jpg",
  },
  {
    category_en: "CREATIVE",
    category_ar: "إبداع",
    client_en: ["NILE", "HOSPITALITY GROUP"],
    client_ar: ["مجموعة", "نايل للضيافة"],
    image: "/images/grid-creative-1.jpg",
  },
  {
    category_en: "EVENTS",
    category_ar: "فعاليات",
    client_en: ["WORLD FUTURE", "ENERGY SUMMIT"],
    client_ar: ["قمة الطاقة", "العالمية المستقبلية"],
    image: "/images/grid-perf-1.jpg",
  },
  {
    category_en: "FILM & CONTENT",
    category_ar: "أفلام ومحتوى",
    client_en: ["RED SEA", "FILM FESTIVAL"],
    client_ar: ["مهرجان البحر", "الأحمر السينمائي"],
    image: "/images/grid-film-1.jpg",
  },
];

const N = SLIDES.length;

export default function WorkSliderSection() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotsRef  = useRef<(HTMLSpanElement | null)[]>([]);
  const lang = useLanguage();

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
    <div ref={outerRef} className={styles.outer} dir="ltr">
      <div className={styles.section}>
        <div ref={trackRef} className={styles.track}>
          {SLIDES.map((slide, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imgWrap}>
                <div className={styles.imgInner}>
                  <Image
                    src={slide.image}
                    alt={slide.client_en.join(" ")}
                    fill
                    sizes="65vw"
                    className={styles.img}
                    loading="eager"
                  />
                </div>
                <div className={styles.gradient} />
              </div>

              <div className={styles.text}>
                <span className={styles.category}>
                  {lang === "ar" ? slide.category_ar : slide.category_en}
                </span>
                <h2 className={styles.title}>
                  {(lang === "ar" ? slide.client_ar : slide.client_en).map((line, k) => (
                    <span key={k} className={styles.titleLine}>{line}</span>
                  ))}
                </h2>
              </div>
            </div>
          ))}
        </div>

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
