"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesHero.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    eyebrow: "11 Disciplines · Full-Spectrum Event Solutions",
    sub: "We craft extraordinary experiences across every discipline — delivering bold, results-driven campaigns for our clients worldwide.",
    stats: [
      { count: 500, suffix: "+", label: "Events" },
      { count: 15,  suffix: "+", label: "Countries" },
      { count: 10,  suffix: "+", label: "Years" },
    ],
  },
  ar: {
    eyebrow: "١١ تخصصاً · حلول فعاليات شاملة",
    sub: "نصنع تجارب استثنائية عبر كل التخصصات — نقدم حملات جريئة وفعّالة لعملائنا حول العالم.",
    stats: [
      { count: 500, suffix: "+", label: "فعالية" },
      { count: 15,  suffix: "+", label: "دولة" },
      { count: 10,  suffix: "+", label: "سنوات" },
    ],
  },
};

export default function ServicesHero() {
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current)     gsap.set(subRef.current,     { opacity: 0, y: 18 });
      if (statsRef.current)   gsap.set(statsRef.current,   { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });

      if (lang === "en") {
        const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
        if (letters?.length) {
          gsap.set(letters, { y: "115%" });
          if (eyebrowRef.current) tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
          tl.to(letters, { y: "0%", duration: 1.25, ease: "power4.out", stagger: { amount: 0.32 } }, 0.1);
        }
      } else {
        const words = headRef.current?.querySelectorAll<HTMLElement>("[data-word]");
        if (words?.length) {
          gsap.set(words, { y: "100%", opacity: 0 });
          if (eyebrowRef.current) tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
          tl.to(words, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out", stagger: { amount: 0.25 } }, 0.1);
        }
      }

      if (subRef.current)   tl.to(subRef.current,   { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.55);
      if (statsRef.current) tl.to(statsRef.current,  { opacity: 1, y: 0, duration: 0.7,  ease: "power2.out" }, 0.7);

      if (statsRef.current) {
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
    };
    init();
  }, [lang]);

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/parallax-4.jpg" alt="" fill className={styles.bgImg} priority sizes="100vw" />
        <div className={styles.bgGrad} />
        <div className={styles.bgGradBot} />
        <div className={styles.bgNoise} />
      </div>

      <div className={styles.inner}>
        <span ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          {c.eyebrow}
        </span>

        {lang === "en" ? (
          <div ref={headRef} className={styles.headline} aria-label="Our Services">
            <div className={styles.hRow}>
              {"OUR".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
            <div className={styles.hRow}>
              {"SERVICES".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div ref={headRef} className={styles.headline} aria-label="خدماتنا">
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>خدماتنا</span>
              </span>
            </div>
          </div>
        )}

        <div className={styles.bottomRow}>
          <p ref={subRef} className={styles.sub}>{c.sub}</p>
          <div ref={statsRef} className={styles.heroStats}>
            {c.stats.map((s, i) => (
              <div key={i} className={styles.hStat}>
                <b data-count={s.count} data-suffix={s.suffix}>0{s.suffix}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
