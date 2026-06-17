"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./CareerHero.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    eyebrow: "Careers · Business Umbrella",
    sub: "Join a team that builds extraordinary experiences. We're looking for bold thinkers, relentless makers, and world-class performers.",
  },
  ar: {
    eyebrow: "وظائف · بيزنس أمبريلا",
    sub: "انضم إلى فريق يبني تجارب استثنائية. نبحث عن مفكرين جريئين وصانعين لا يكلّون ومنفذين عالميي المستوى.",
  },
};

export default function CareerHero() {
  const lang = useLanguage();
  const c = t[lang];

  const headRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current)     gsap.set(subRef.current,     { opacity: 0, y: 18 });

      const tl = gsap.timeline({ delay: 0.15 });

      if (lang === "en") {
        const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
        if (letters?.length) {
          gsap.set(letters, { y: "115%" });
          if (eyebrowRef.current)
            tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
          tl.to(letters, { y: "0%", duration: 1.25, ease: "power4.out", stagger: { amount: 0.32 } }, 0.1);
        }
      } else {
        const words = headRef.current?.querySelectorAll<HTMLElement>("[data-word]");
        if (words?.length) {
          gsap.set(words, { y: "100%", opacity: 0 });
          if (eyebrowRef.current)
            tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);
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
        <Image
          src="/images/parallax-2.jpg"
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

      <div className={styles.inner}>
        <span ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          {c.eyebrow}
        </span>

        {lang === "en" ? (
          <div ref={headRef} className={styles.headline} aria-label="Join Our Team">
            <div className={styles.hRow}>
              {"JOIN".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
            <div className={styles.hRow}>
              {"OUR TEAM".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch === " " ? " " : ch}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div ref={headRef} className={styles.headline} aria-label="انضم إلينا">
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>انضم</span>
              </span>
            </div>
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>إلينا</span>
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
