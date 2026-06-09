"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesHero.module.css";


export default function ServicesHero() {
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");

      const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
      if (!letters?.length) return;

      gsap.set(letters, { y: "115%" });
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 0, y: 18 });
      if (statsRef.current) gsap.set(statsRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });

      if (eyebrowRef.current) {
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
      }
      tl.to(letters, {
        y: "0%",
        duration: 1.25,
        ease: "power4.out",
        stagger: { amount: 0.32 },
      }, 0.1);
      if (subRef.current) {
        tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.55);
      }
      if (statsRef.current) {
        tl.to(statsRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0.7);

        // Count-up each number
        const countEls = statsRef.current.querySelectorAll<HTMLElement>("[data-count]");
        countEls.forEach((el) => {
          const target = parseInt(el.dataset.count ?? "0", 10);
          const suffix = el.dataset.suffix ?? "";
          const obj = { val: 0 };
          tl.to(obj, {
            val: target,
            duration: 1.8,
            ease: "power2.out",
            onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          }, 0.75);
        });
      }
    }
    init();
  }, []);

  return (
    <section className={styles.hero}>

      {/* Cinematic background */}
      <div className={styles.bg}>
        <Image
          src="/images/parallax-4.jpg"
          alt=""
          fill
          className={styles.bgImg}
          priority
          sizes="100vw"
        />
        <div className={styles.bgGrad} />
        <div className={styles.bgGradBot} />
        <div className={styles.bgNoise} />
      </div>

      {/* Main content — pinned to bottom */}
      <div className={styles.inner}>
        <span ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          11 Disciplines &nbsp;·&nbsp; Full-Spectrum Event Solutions
        </span>

        <div ref={headRef} className={styles.headline} aria-label="Our Services">
          <div className={styles.hRow}>
            {"OUR".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c}</span>
              </span>
            ))}
          </div>
          <div className={styles.hRow}>
            {"SERVICES".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c}</span>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.bottomRow}>
          <p ref={subRef} className={styles.sub}>
            We craft extraordinary experiences across every discipline —
            delivering bold, results-driven campaigns for our clients worldwide.
          </p>
          <div ref={statsRef} className={styles.heroStats}>
            <div className={styles.hStat}><b data-count="500" data-suffix="+">0+</b><span>Events</span></div>
            <div className={styles.hStat}><b data-count="15"  data-suffix="+">0+</b><span>Countries</span></div>
            <div className={styles.hStat}><b data-count="10"  data-suffix="+">0+</b><span>Years</span></div>
          </div>
        </div>
      </div>


    </section>
  );
}
