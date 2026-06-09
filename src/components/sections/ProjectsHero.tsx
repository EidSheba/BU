"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProjectsHero.module.css";
import { PROJECTS_DATA } from "@/data/projects";

const REEL = PROJECTS_DATA;
const SLIDE_MS = 3200;

export default function ProjectsHero() {
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");

      const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
      if (!letters?.length) return;

      gsap.set(letters, { y: "112%" });
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 0, y: 18 });
      if (statsRef.current) gsap.set(statsRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });
      if (eyebrowRef.current) {
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
      }
      tl.to(letters, {
        y: "0%",
        duration: 1.15,
        ease: "power4.out",
        stagger: { amount: 0.3 },
      }, 0.1);
      if (subRef.current) {
        tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.5);
      }
      if (statsRef.current) {
        tl.to(statsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.65);
        const countEls = statsRef.current.querySelectorAll<HTMLElement>("[data-count]");
        countEls.forEach((el) => {
          const target = parseInt(el.dataset.count ?? "0", 10);
          const suffix = el.dataset.suffix ?? "";
          const obj = { val: 0 };
          tl.to(obj, {
            val: target,
            duration: 1.7,
            ease: "power2.out",
            onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          }, 0.7);
        });
      }
    }
    init();
  }, []);

  // Auto-advancing reel
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % REEL.length);
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Selected Work · 13 Productions
        </span>

        <div ref={headRef} className={styles.headline} aria-label="Projects that speak for themselves">
          <div className={styles.hRow}>
            {"PROJECTS".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c}</span>
              </span>
            ))}
          </div>
          <div className={`${styles.hRow} ${styles.hRowAccent}`}>
            {"THAT SPEAK".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c === " " ? " " : c}</span>
              </span>
            ))}
          </div>
          <div className={styles.hRow}>
            {"FOR THEMSELVES".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c === " " ? " " : c}</span>
              </span>
            ))}
          </div>
        </div>

        <p ref={subRef} className={styles.sub}>
          From government summits to extreme-sport spectacles, every name on
          this list is a different problem we were trusted to solve — on the
          ground, on schedule, and always at full scale.
        </p>

        <div ref={statsRef} className={styles.statsRow}>
          <div className={styles.stat}><b data-count="13" data-suffix="">0</b><span>Projects</span></div>
          <div className={styles.stat}><b data-count="9" data-suffix="">0</b><span>Cities</span></div>
          <div className={styles.stat}><b data-count="500" data-suffix="K+">0</b><span>Attendees</span></div>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.reelDashes}>
          {REEL.map((_, i) => {
            const state =
              i < active ? styles.reelDashFillDone : i === active ? styles.reelDashFillActive : "";
            return (
              <span key={`${i}-${active}`} className={styles.reelDash}>
                <span className={`${styles.reelDashFill} ${state}`} />
              </span>
            );
          })}
        </div>

        <div className={styles.reelStage}>
          {REEL.map((proj, i) => (
            <div
              key={proj.slug}
              className={`${styles.reelSlide} ${i === active ? styles.reelSlideActive : ""}`}
            >
              <Image
                src={proj.heroImg}
                alt={proj.title}
                fill
                className={styles.reelImg}
                priority={i === 0}
                sizes="(max-width: 980px) 100vw, 50vw"
              />
            </div>
          ))}
          <div className={styles.reelGradLeft} />
          <div className={styles.reelGrad} />

          <div className={styles.reelCaption}>
            <span className={styles.reelNum}>{REEL[active].id} / {String(PROJECTS_DATA.length).padStart(2, "0")}</span>
            <span className={styles.reelTitle}>{REEL[active].title}</span>
            <span className={styles.reelMeta}>{REEL[active].category} · {REEL[active].year}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
