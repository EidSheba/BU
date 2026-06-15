"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ContactHero.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    eyebrow: "Contact · Let's Build Something Together",
    ariaLabel: "Get In Touch",
    rows: ["GET IN", "TOUCH"],
    sub: "Whether you are planning your next big event, launching a campaign, or exploring a new partnership — our team is ready to bring your vision to life.",
  },
  ar: {
    eyebrow: "تواصل معنا · لنبني شيئاً رائعاً معاً",
    ariaLabel: "تواصل معنا",
    rows: ["تواصل", "معنا"],
    sub: "سواء كنت تخطط لفعاليتك القادمة أو تطلق حملة أو تستكشف شراكة جديدة — فريقنا مستعد لتحقيق رؤيتك.",
  },
};

export default function ContactHero() {
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current)     gsap.set(subRef.current,     { opacity: 0, y: 18 });

      const tl = gsap.timeline({ delay: 0.15 });
      if (eyebrowRef.current) tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);

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

      if (subRef.current) tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.55);
    };
    init();
  }, [lang]);

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image src="/images/parallax-1.jpg" alt="" fill className={styles.bgImg} priority sizes="100vw" />
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
          <div ref={headRef} className={styles.headline} aria-label={c.ariaLabel}>
            {c.rows.map((row, ri) => (
              <div key={ri} className={styles.hRow}>
                {row.split("").map((ch, ci) => (
                  <span key={ci} className={styles.lWrap}>
                    <span data-letter className={styles.lChar}>{ch === " " ? " " : ch}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <div ref={headRef} className={styles.headline} aria-label={c.ariaLabel}>
            {c.rows.map((row, ri) => (
              <div key={ri} className={styles.hRow}>
                <span className={styles.lWrap}>
                  <span data-word className={styles.lChar}>{row}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        <p ref={subRef} className={styles.sub}>{c.sub}</p>
      </div>
    </section>
  );
}
