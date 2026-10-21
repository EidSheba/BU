"use client";

import { useEffect, useRef } from "react";
import styles from "./ContactHero.module.css";
import { useLanguage } from "@/hooks/useLanguage";

export default function ContactHero() {
  const titleRef = useRef<HTMLSpanElement>(null);
  const lang = useLanguage();

  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      if (!titleRef.current) return;
      gsap.fromTo(
        titleRef.current,
        { y: "110%" },
        { y: "0%", duration: 1.1, ease: "power4.out", delay: 0.15 },
      );
    })();
  }, [lang]);

  return (
    <section className={styles.section}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>
          <span ref={titleRef} className={styles.titleInner}>
            {lang === "ar" ? (
              "تواصل معنا"
            ) : (
              <>
                GET IN <span className={styles.titleAccent}>TOUCH</span>
              </>
            )}
          </span>
        </h1>
        <span className={styles.bar} />
      </div>
    </section>
  );
}
