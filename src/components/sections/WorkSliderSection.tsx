"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./WorkSliderSection.module.css";
import { PROJECTS_DATA } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

const SLIDES = PROJECTS_DATA;
const N = SLIDES.length;

const t = {
  en: {
    eyebrow: "Selected Work · 13 Productions",
    h1: "PROJECTS", h2: "THAT SPEAK", h3: "FOR THEMSELVES",
    sub: "From government summits to extreme-sport spectacles, every name on this list is a different problem we were trusted to solve — on the ground, on schedule, and always at full scale.",
    cta: "View All Projects",
  },
  ar: {
    eyebrow: "أعمال مختارة · ١٣ إنتاجاً",
    h1: "مشاريع", h2: "تتحدث", h3: "عن نفسها",
    sub: "من قمم حكومية إلى مشاهد رياضية استثنائية، كل اسم في هذه القائمة مشكلة مختلفة وثقنا بنا لحلها — على أرض الواقع، في الوقت المحدد، وبالحجم الكامل دائماً.",
    cta: "عرض جميع المشاريع",
  },
};

export default function WorkSliderSection() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const trackRef  = useRef<HTMLDivElement>(null);
  const dotsRef   = useRef<(HTMLSpanElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);
  const lang = useLanguage();
  const c = t[lang];

  // Header entrance — fades/rises in once the header scrolls into view.
  useEffect(() => {
    let scrollTrigger: { kill: () => void } | undefined;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const header = headerRef.current;
      if (!header) return;

      const targets = header.querySelectorAll<HTMLElement>("[data-reveal]");
      gsap.set(targets, { opacity: 0, y: 24 });

      const tl = gsap.timeline({ paused: true });
      tl.to(targets, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.12 });

      scrollTrigger = ScrollTrigger.create({
        trigger: header,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(),
      });
    }

    init();
    return () => scrollTrigger?.kill();
  }, [lang]);

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
      <div ref={headerRef} className={styles.header}>
        <span data-reveal className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          {c.eyebrow}
        </span>

        <h2 data-reveal className={styles.headline}>
          <span className={styles.hRow}>{c.h1}</span>
          <span className={`${styles.hRow} ${styles.hRowAccent}`}>{c.h2}</span>
          <span className={styles.hRow}>{c.h3}</span>
        </h2>

        <p data-reveal className={styles.sub}>{c.sub}</p>

        <Link data-reveal href="/projects" className={styles.cta}>{c.cta}</Link>
      </div>

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
                  <span className={styles.category}>
                    {lang === "ar" ? proj.category_ar : proj.category} · {proj.year}
                  </span>
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
