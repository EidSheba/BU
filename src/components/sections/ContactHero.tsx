"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ContactHero.module.css";

export default function ContactHero() {
  const headRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");

      const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
      if (!letters?.length) return;

      gsap.set(letters, { y: "115%" });
      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current) gsap.set(subRef.current, { opacity: 0, y: 18 });

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
    }
    init();
  }, []);

  return (
    <section className={styles.hero}>

      {/* Cinematic background */}
      <div className={styles.bg}>
        <Image
          src="/images/parallax-1.jpg"
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
          Contact &nbsp;·&nbsp; Let&apos;s Build Something Together
        </span>

        <div ref={headRef} className={styles.headline} aria-label="Get In Touch">
          <div className={styles.hRow}>
            {"GET IN".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c === " " ? " " : c}</span>
              </span>
            ))}
          </div>
          <div className={styles.hRow}>
            {"TOUCH".split("").map((c, i) => (
              <span key={i} className={styles.lWrap}>
                <span data-letter className={styles.lChar}>{c}</span>
              </span>
            ))}
          </div>
        </div>

        <p ref={subRef} className={styles.sub}>
          Whether you are planning your next big event, launching a campaign,
          or exploring a new partnership — our team is ready to bring your
          vision to life.
        </p>
      </div>

    </section>
  );
}
