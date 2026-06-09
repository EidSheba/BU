"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesShowcase.module.css";

export default function ServicesShowcase() {
  const ctaRef   = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // CTA
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

      // Banner parallax
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

      {/* ── Parallax banner image ── */}
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
          &ldquo;We don&apos;t just manage events —<br />
          we engineer moments that endure.&rdquo;
        </p>
      </div>

      {/* ── CTA ── */}
      <div ref={ctaRef} className={styles.cta}>
        <div className={styles.ctaInner}>
          <span data-cta className={styles.ctaEyebrow}>Let&apos;s build something</span>
          <h2 data-cta className={styles.ctaTitle}>
            Ready to create<br />
            <em className={styles.ctaAccent}>something remarkable?</em>
          </h2>
          <p data-cta className={styles.ctaSub}>
            From concept to curtain call — we are your end-to-end event partner.
          </p>
          <div data-cta className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBtnFill}>
              Start a project <span className={styles.arrow}>↗</span>
            </a>
            <a href="/about" className={styles.ctaBtnLine}>
              Learn about us
            </a>
          </div>
        </div>

        {/* decorative dot grid */}
        <div className={styles.ctaDots} aria-hidden="true" />
        <div className={styles.ctaGlow}  aria-hidden="true" />
      </div>

    </section>
  );
}
