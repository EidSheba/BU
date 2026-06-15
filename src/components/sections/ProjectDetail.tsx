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
    overview: "Overview",
    ctaTitle: (title: string) => `Have a project in mind\nlike ${title}?`,
    ctaBtn: "Start a project ↗",
    ctaBack: "← Back to all projects",
  },
  ar: {
    back: "← كل المشاريع",
    overview: "نظرة عامة",
    ctaTitle: (title: string) => `هل لديك مشروع في ذهنك\nمثل ${title}؟`,
    ctaBtn: "ابدأ مشروعاً ↗",
    ctaBack: "← العودة لجميع المشاريع",
  },
};

export default function ProjectDetail({ project }: { project: ProjectData }) {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const slides      = [project.heroImg, ...project.gallery];
  const [active, setActive]   = useState(0);
  const [paused, setPaused]   = useState(false);
  const lang = useLanguage();
  const c = ui[lang];

  const title    = lang === "ar" ? project.title_ar    : project.title;
  const tagline  = lang === "ar" ? project.tagline_ar  : project.tagline;
  const overview = lang === "ar" ? project.overview_ar : project.overview;

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const heroSubs = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-sub]");

      if (lang === "en") {
        const letters = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
        if (letters?.length) {
          gsap.set(letters, { y: "110%" });
          gsap.to(letters, { y: "0%", duration: 1.1, ease: "power4.out", stagger: { amount: 0.3 }, delay: 0.2 });
        }
      } else {
        const words = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-word]");
        if (words?.length) {
          gsap.set(words, { y: "100%", opacity: 0 });
          gsap.to(words, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out", stagger: { amount: 0.25 }, delay: 0.2 });
        }
      }

      if (heroSubs?.length) {
        gsap.set(heroSubs, { opacity: 0, y: 16 });
        gsap.to(heroSubs, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.6 });
      }

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

  const ctaLines = c.ctaTitle(title).split("\n");

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src={project.heroImg} alt={title} fill className={styles.heroBgImg} priority sizes="100vw" />
          <div className={styles.heroOverlay} />
          <div className={styles.heroOverlayBot} />
        </div>

        <div ref={heroTextRef} className={styles.heroInner}>
          <span data-sub className={styles.heroBack}>
            <Link href="/projects" className={styles.heroBackLink}>{c.back}</Link>
          </span>

          <div className={styles.heroHeadline}>
            {lang === "en" ? (
              title.split(" ").map((word, wi) => (
                <div key={wi} className={styles.heroWordRow}>
                  {word.split("").map((char, ci) => (
                    <span key={ci} className={styles.heroLBox}>
                      <span data-letter className={styles.heroLChar}>{char}</span>
                    </span>
                  ))}
                </div>
              ))
            ) : (
              title.split(" ").map((word, wi) => (
                <div key={wi} className={styles.heroWordRow}>
                  <span className={styles.heroLBox}>
                    <span data-word className={styles.heroLChar}>{word}</span>
                  </span>
                </div>
              ))
            )}
          </div>

          <div className={styles.heroMeta}>
            <span data-sub className={styles.heroNum}>{project.id}</span>
            <span data-sub className={styles.heroTagline}>{tagline}</span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div ref={bodyRef} className={styles.body}>

        {/* Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewLeft}>
            <span data-reveal className={styles.sectionLabel}>{c.overview}</span>
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
                  <Image
                    src={img}
                    alt={`${title} ${i + 1}`}
                    fill
                    className={styles.overviewImg}
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              ))}
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

        {/* CTA */}
        <section data-reveal className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {ctaLines[0]}<br />
            <span className={styles.ctaAccent}>{ctaLines[1]}</span>
          </h2>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBtn}>{c.ctaBtn}</a>
            <Link href="/projects" className={styles.ctaBack}>{c.ctaBack}</Link>
          </div>
        </section>

      </div>
    </>
  );
}
