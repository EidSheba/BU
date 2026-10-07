"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./CareerHero.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    eyebrow: "Request a Quote · Business Umbrella",
    sub: "Tell us about your exhibition, event or activation. Our team will study your brief and send a tailored proposal with a detailed cost breakdown.",
  },
  ar: {
    eyebrow: "طلب تسعيرة · بيزنس أمبريلا",
    sub: "أخبرنا عن معرضك أو فعاليتك أو حملتك التفعيلية، وسيدرس فريقنا متطلباتك ويرسل لك عرضاً مخصصاً مع تفصيل كامل للتكاليف.",
  },
};

export default function QuoteHero() {
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

      if (subRef.current) tl.to(subRef.current, { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.55);
    };
    init();
  }, [lang]);

  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <Image
          src="/images/parallax-3.jpg"
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
          <div ref={headRef} className={styles.headline} aria-label="Get a Quote">
            <div className={styles.hRow}>
              {"GET A".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch === " " ? " " : ch}</span>
                </span>
              ))}
            </div>
            <div className={styles.hRow}>
              {"QUOTE".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div ref={headRef} className={styles.headline} aria-label="اطلب تسعيرتك">
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>اطلب</span>
              </span>
            </div>
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>تسعيرتك</span>
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
