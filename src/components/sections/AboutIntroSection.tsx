"use client";

import React, { useEffect, useRef } from "react";
import styles from "./AboutIntroSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const TEXT_EN =
  "At Business Umbrella, we are a specialized company in planning and executing exhibitions, conferences, and events of all types. We deliver integrated solutions that covers every stage from concept to execution. We don’t just organize events; we create exceptional experiences. By combining strategic planning with strong operational capabilities, supported by our in-house resources, we ensure the highest standards of quality, speed, and precision in every detail.";

const TEXT_AR =
  "نحن في مظلة الأعمال شركة متخصصة بإحترافية في تخطيط وتنفيذ المعارض، المؤتمرات، والفعاليات بمختلف أنواعها، حيث نقدم حلولاً متكاملة تبدأ من الفكرة وحتى التنفيذ. لا ننظم فعاليات فحسب، بل نصنع تجارب استثنائية. نجمع بين الفكر الاستراتيجي في التخطيط والقدرة التشغيلية الفائقة من خلال مواردنا الذاتية، لضمان أعلى معايير الجودة والسرعة.";

export default function AboutIntroSection() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const lang = useLanguage();

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.titleWrap}>
        <span className={styles.title}>
          <span className={styles.titleLeft}>{lang === "ar" ? "مظلة" : "BUSINESS"}</span>
          {" "}
          <span className={styles.titleRight}>{lang === "ar" ? "الأعمال" : "UMBRELLA"}</span>
        </span>
      </div>

      <div ref={bodyRef} className={styles.body}>
        <span className={styles.bar} />
        <p className={styles.text}>{lang === "ar" ? TEXT_AR : TEXT_EN}</p>
      </div>
    </section>
  );
}
