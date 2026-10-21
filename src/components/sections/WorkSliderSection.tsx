"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./WorkSliderSection.module.css";
import { PROJECTS_DATA } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

const SLIDES = PROJECTS_DATA;
const N = SLIDES.length;

export default function WorkSliderSection() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const dotsRef   = useRef<(HTMLSpanElement | null)[]>([]);
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
    <section className={styles.wrap}>
      <div
        ref={outerRef}
        className={styles.outer}
        style={{ height: `${(N + 1) * 100}vh` }}
        dir="ltr"
      >
        <div className={styles.section}>
          <div ref={trackRef} className={styles.track} style={{ width: `${N * 100}vw` }}>
            {SLIDES.map((proj) => (
              <Link key={proj.slug} href={`/projects/${proj.slug}`} className={styles.card}>
                <div className={styles.imgWrap}>
                  <div className={styles.imgInner}>
                    <Image
                      src={proj.heroImg}
                      alt={lang === "ar" ? proj.title_ar : proj.title}
                      fill
                      sizes="65vw"
                      className={styles.img}
                      loading="eager"
                    />
                  </div>
                  <div className={styles.gradient} />
                </div>

                <div className={styles.text}>
                  <h3 className={styles.title}>
                    {lang === "ar" ? proj.title_ar : proj.title}
                  </h3>
                </div>
              </Link>
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
    </section>
  );
}
