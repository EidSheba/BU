"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./ServicesListSection.module.css";
import { SERVICES_DATA } from "@/data/services";
import { useLanguage } from "@/hooks/useLanguage";

export default function ServicesListSection() {
  const gridRef       = useRef<HTMLDivElement>(null);
  const lang = useLanguage();

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
    };

    init();
    return () => triggers.forEach((tr) => tr.kill());
  }, [lang]);

  return (
    <section className={styles.section}>

      <div ref={gridRef} className={styles.grid}>
        {SERVICES_DATA.map((svc) => (
          <div
            key={svc.id}
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
              <h3 className={styles.cardTitle}>
                {lang === "ar" ? svc.title_ar : svc.title}
              </h3>
              <p className={styles.cardDesc}>
                {lang === "ar" ? svc.overview_ar : svc.overview}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
