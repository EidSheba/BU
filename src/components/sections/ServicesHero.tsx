"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesHero.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    sub: "We craft extraordinary experiences across every discipline — delivering bold, results-driven campaigns for our clients worldwide.",
  },
  ar: {
    sub: "نصنع تجارب استثنائية عبر كل التخصصات — نقدم حملات جريئة وفعّالة لعملائنا حول العالم.",
  },
};

export default function ServicesHero() {
  const headRef  = useRef<HTMLDivElement>(null);
  const subRef   = useRef<HTMLParagraphElement>(null);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      if (subRef.current)   gsap.set(subRef.current,   { opacity: 0, y: 18 });

      const tl = gsap.timeline({ delay: 0.15 });

      if (lang === "en") {
        const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
        if (letters?.length) {
          gsap.set(letters, { y: "115%" });
          tl.to(letters, { y: "0%", duration: 1.25, ease: "power4.out", stagger: { amount: 0.32 } }, 0.1);
        }
      } else {
        const words = headRef.current?.querySelectorAll<HTMLElement>("[data-word]");
        if (words?.length) {
          gsap.set(words, { y: "100%", opacity: 0 });
          tl.to(words, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out", stagger: { amount: 0.25 } }, 0.1);
        }
      }

      if (subRef.current)   tl.to(subRef.current,   { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.55);
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
        </div>
      </div>
    </section>
  );
}
