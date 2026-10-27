"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectData } from "@/data/projects";
import styles from "./ProjectDetail.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const SLIDE_MS = 3600;

const ui = {
  en: {
    back: "← All Projects",
    prev: "Previous",
    next: "Next",
  },
  ar: {
    back: "← كل المشاريع",
    prev: "السابق",
    next: "التالي",
  },
};

export default function ProjectDetail({ project }: { project: ProjectData }) {
  const bodyRef     = useRef<HTMLDivElement>(null);
  const videos      = project.videos ?? [];
  const slides      = videos.length ? videos : [project.heroImg, ...project.gallery];
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>([]);
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const lang = useLanguage();
  const c = ui[lang];

  const title    = lang === "ar" ? project.title_ar    : project.title;
  const overview = lang === "ar" ? project.overview_ar : project.overview;

  useEffect(() => {
    if (videos.length || paused || slides.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length, videos.length]);

  // Videos advance when the current one ends; only the active one plays.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [active]);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (bodyRef.current) {
        const reveals = bodyRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { opacity: 0, y: 30 });
        reveals.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }),
          });
        });
      }
    };
    init();
  }, [lang]);

  return (
    <>
      {/* ── Body ── */}
      <div ref={bodyRef} className={styles.body}>

        {/* Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewLeft}>
            <Link data-reveal href="/projects" className={styles.backLink}>{c.back}</Link>
            <h1 data-reveal className={styles.title}>{title}</h1>
            <p data-reveal className={styles.overviewText}>{overview}</p>
          </div>
          <div data-reveal className={styles.overviewRight}>
            <div
              className={styles.overviewImgWrap}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slides.map((img, i) => (
                <div key={i} className={`${styles.overviewSlide} ${i === active ? styles.overviewSlideActive : ""}`}>
                  {videos.length ? (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={img}
                      className={styles.overviewImg}
                      style={{ width: "100%", height: "100%" }}
                      autoPlay={i === 0}
                      muted
                      playsInline
                      preload="auto"
                      loop={videos.length === 1}
                      onEnded={() => setActive((a) => (a + 1) % slides.length)}
                    />
                  ) : (
                    <Image
                      src={img}
                      alt={`${title} ${i + 1}`}
                      fill
                      className={styles.overviewImg}
                      sizes="(max-width: 768px) 100vw, 45vw"
                    />
                  )}
                </div>
              ))}
              {slides.length > 1 && (
                <div className={styles.overviewArrows} dir="ltr">
                  <button
                    type="button"
                    className={styles.overviewArrow}
                    aria-label={c.prev}
                    onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 5l-7 7 7 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className={styles.overviewArrow}
                    aria-label={c.next}
                    onClick={() => setActive((i) => (i + 1) % slides.length)}
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
              {slides.length > 1 && (
                <div className={styles.overviewDots}>
                  {slides.map((_, i) => (
                    <span key={i} className={`${styles.overviewDot} ${i === active ? styles.overviewDotActive : ""}`} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
