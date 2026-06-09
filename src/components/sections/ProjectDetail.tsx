"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectData } from "@/data/projects";
import styles from "./ProjectDetail.module.css";

const SLIDE_MS = 3600;

export default function ProjectDetail({ project }: { project: ProjectData }) {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  const slides = [project.heroImg, ...project.gallery];
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Hero text entrance
      const letters = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
      const heroSubs = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-sub]");
      if (letters?.length) {
        gsap.set(letters, { y: "110%" });
        gsap.to(letters, {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
          stagger: { amount: 0.3 },
          delay: 0.2,
        });
      }
      if (heroSubs?.length) {
        gsap.set(heroSubs, { opacity: 0, y: 16 });
        gsap.to(heroSubs, {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power2.out",
          stagger: 0.1, delay: 0.6,
        });
      }

      // Body scroll reveals
      if (bodyRef.current) {
        const reveals = bodyRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { opacity: 0, y: 30 });
        reveals.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () =>
              gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }),
          });
        });
      }
    }
    init();
  }, []);

  const words = project.title.split(" ");

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={project.heroImg}
            alt={project.title}
            fill
            className={styles.heroBgImg}
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroOverlayBot} />
        </div>

        <div ref={heroTextRef} className={styles.heroInner}>
          <span data-sub className={styles.heroBack}>
            <Link href="/projects" className={styles.heroBackLink}>
              ← All Projects
            </Link>
          </span>

          <div className={styles.heroHeadline}>
            {words.map((word, wi) => (
              <div key={wi} className={styles.heroWordRow}>
                {word.split("").map((char, ci) => (
                  <span key={ci} className={styles.heroLBox}>
                    <span data-letter className={styles.heroLChar}>{char}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.heroMeta}>
            <span data-sub className={styles.heroNum}>{project.id}</span>
            <span data-sub className={styles.heroTagline}>{project.tagline}</span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div ref={bodyRef} className={styles.body}>

        {/* Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewLeft}>
            <span data-reveal className={styles.sectionLabel}>Overview</span>
            <p data-reveal className={styles.overviewText}>{project.overview}</p>
          </div>
          <div data-reveal className={styles.overviewRight}>
            <div
              className={styles.overviewImgWrap}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slides.map((img, i) => (
                <div
                  key={i}
                  className={`${styles.overviewSlide} ${i === active ? styles.overviewSlideActive : ""}`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} ${i + 1}`}
                    fill
                    className={styles.overviewImg}
                    sizes="(max-width: 768px) 100vw, 45vw"
                  />
                </div>
              ))}
              {slides.length > 1 && (
                <div className={styles.overviewDots}>
                  {slides.map((_, i) => (
                    <span
                      key={i}
                      className={`${styles.overviewDot} ${i === active ? styles.overviewDotActive : ""}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section data-reveal className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            Have a project in mind<br />
            <span className={styles.ctaAccent}>like {project.title}?</span>
          </h2>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBtn}>
              Start a project ↗
            </a>
            <Link href="/projects" className={styles.ctaBack}>
              ← Back to all projects
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
