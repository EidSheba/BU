"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesShowcase.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    quote: "We don't just manage events —\nwe engineer moments that endure.",
    eyebrow: "Let's build something",
    title1: "Ready to create",
    title2: "something remarkable?",
    sub: "From concept to curtain call — we are your end-to-end event partner.",
    btnStart: "Start a project",
    btnAbout: "Learn about us",
  },
  ar: {
    quote: "نحن لا ندير الفعاليات فحسب —\nبل نهندس لحظات تبقى في الذاكرة.",
    eyebrow: "لنبني شيئاً",
    title1: "هل أنت مستعد لخلق",
    title2: "شيء استثنائي؟",
    sub: "من الفكرة إلى الستارة الأخيرة — نحن شريكك الشامل في الفعاليات.",
    btnStart: "ابدأ مشروعاً",
    btnAbout: "تعرف علينا",
  },
};

export default function ServicesShowcase() {
  const ctaRef   = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (ctaRef.current) {
        const els = ctaRef.current.querySelectorAll<HTMLElement>("[data-cta]");
        gsap.set(els, { opacity: 0, y: 28 });
        const st = ScrollTrigger.create({
          trigger: ctaRef.current,
          start: "top 78%",
          onEnter: () =>
            gsap.to(els, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 }),
        });
        triggers.push(st);
      }

      if (bannerRef.current) {
        const img = bannerRef.current.querySelector<HTMLElement>("[data-banner-img]");
        if (img) {
          const st = ScrollTrigger.create({
            trigger: bannerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
            onUpdate: (self) => {
              gsap.set(img, { yPercent: self.progress * 44 - 22 });
            },
          });
          triggers.push(st);
        }
      }
    };

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className={styles.section}>
      <div ref={bannerRef} className={styles.banner}>
        <div className={styles.bannerImgWrap}>
          <Image
            data-banner-img
            src="/images/parallax-1.jpg"
            alt="Events by Business Umbrella"
            fill
            className={styles.bannerImg}
            sizes="100vw"
          />
        </div>
        <div className={styles.bannerOverlay} />
        <p className={styles.bannerQuote}>
          &ldquo;{c.quote.split("\n").map((line, i) => (
            <span key={i}>{line}{i === 0 && <br />}</span>
          ))}&rdquo;
        </p>
      </div>

      <div ref={ctaRef} className={styles.cta}>
        <div className={styles.ctaInner}>
          <span data-cta className={styles.ctaEyebrow}>{c.eyebrow}</span>
          <h2 data-cta className={styles.ctaTitle}>
            {c.title1}<br />
            <em className={styles.ctaAccent}>{c.title2}</em>
          </h2>
          <p data-cta className={styles.ctaSub}>{c.sub}</p>
          <div data-cta className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBtnFill}>
              {c.btnStart} <span className={styles.arrow}>↗</span>
            </a>
            <a href="/about" className={styles.ctaBtnLine}>{c.btnAbout}</a>
          </div>
        </div>
        <div className={styles.ctaDots} aria-hidden="true" />
        <div className={styles.ctaGlow}  aria-hidden="true" />
      </div>
    </section>
  );
}
