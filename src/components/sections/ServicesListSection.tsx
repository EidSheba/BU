"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesListSection.module.css";
import { SERVICES_DATA } from "@/data/services";
import { useLanguage } from "@/hooks/useLanguage";

export default function ServicesListSection() {
  const gridRef       = useRef<HTMLDivElement>(null);
  const headTitleRef  = useRef<HTMLHeadingElement>(null);
  const headFillRef   = useRef<HTMLSpanElement>(null);
  const lang = useLanguage();

  const t = {
    en: {
      label: "Our Disciplines",
      heading1: "Everything you need.",
      heading2: "Under one roof.",
    },
    ar: {
      label: "تخصصاتنا",
      heading1: "كل ما تحتاجه.",
      heading2: "تحت سقف واحد.",
    },
  }[lang];

  useEffect(() => {
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards?.length) return;

      gsap.set(cards, { opacity: 0, y: 36, scale: 0.97 });

      const st = ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 82%",
        onEnter: () => {
          gsap.to(cards, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: "power3.out", stagger: 0.06 });
        },
      });
      triggers.push(st);

      const fillEl = headFillRef.current;
      if (fillEl) {
        const setClip = (progress: number) => {
          const hidden = (1 - progress) * 100;
          const clip = `inset(0 ${hidden}% 0 0)`;
          fillEl.style.clipPath = clip;
          (fillEl.style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath = clip;
        };
        setClip(0);

        const fillTrigger = ScrollTrigger.create({
          trigger: headTitleRef.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.4,
          onUpdate: (self: { progress: number }) => setClip(self.progress),
        });
        triggers.push(fillTrigger);
      }
    };

    init();
    return () => triggers.forEach((tr) => tr.kill());
  }, [lang]);

  return (
    <section className={styles.section}>

      <div className={styles.heading}>
        <span className={styles.headLabel}>{t.label}</span>
        <h2 ref={headTitleRef} className={styles.headTitle}>
          {t.heading1}<br />
          <span className={styles.headTitleWrap}>
            <span className={styles.headTitleMuted}>{t.heading2}</span>
            <span ref={headFillRef} className={styles.headTitleFill} aria-hidden="true">
              {t.heading2}
            </span>
          </span>
        </h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {SERVICES_DATA.map((svc) => (
          <Link
            key={svc.id}
            href={`/services/${svc.slug}`}
            data-card
            data-id={svc.id}
            className={styles.card}
          >
            <Image
              src={svc.heroImg}
              alt={lang === "ar" ? svc.title_ar : svc.title}
              fill
              className={styles.cardImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardAccent} />
            <div className={styles.cardContent}>
              <span className={styles.cardNum}>{svc.id}</span>
              <h3 className={styles.cardTitle}>
                {lang === "ar" ? svc.title_ar : svc.title}
              </h3>
              <p className={styles.cardDesc}>
                {(lang === "ar" ? svc.overview_ar : svc.overview).slice(0, 90) + "…"}
              </p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
