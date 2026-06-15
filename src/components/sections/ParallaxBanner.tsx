"use client";

import { useEffect, useRef } from "react";
import styles from "./ParallaxBanner.module.css";
import { useLanguage } from "@/hooks/useLanguage";

interface Props {
  image: string;
  text: string;
  arText?: string;
  textColor?: string;
}

export default function ParallaxBanner({ image, text, arText, textColor }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLSpanElement>(null);
  const lang = useLanguage();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    let trigger: { kill: () => void } | null = null;

    async function init() {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const imageEl = imageRef.current;
      const textEl  = textRef.current;
      if (!section || !imageEl) return;

      imageEl.style.backgroundImage = `url(${image})`;
      if (textEl && textColor) textEl.style.color = textColor;

      const t = gsap.fromTo(
        imageEl,
        { yPercent: -25 },
        {
          yPercent: 25,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end:   "bottom top",
            scrub: true,
          },
        }
      );
      trigger = t.scrollTrigger ?? null;
    }

    init();
    return () => { trigger?.kill(); };
  }, [image, textColor]);

  const displayText = lang === "ar" && arText ? arText : text;

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={imageRef} className={styles.image} />
      <span ref={textRef} className={styles.text}>{displayText}</span>
    </section>
  );
}
