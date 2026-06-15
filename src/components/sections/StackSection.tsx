"use client";

import { useEffect, useRef } from "react";
import styles from "./StackSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  en: {
    heading: "What We Bring to Life",
    leftLabel: "Marketing",
    leftHead: "& Storytelling",
    leftBody: [
      "As a leading advertising powerhouse in the Middle East, we create bold, results-driven campaigns that fuse unforgettable storytelling with strategic, high-performance media.",
      "From high-impact advertising campaigns to multi-channel media planning and buying, we craft narratives and stories that connect deeply and amplify them across every platform that matters.",
      "Every campaign is powered by insights. Every channel is activated with purpose. Every impression is engineered for impact.",
      "We don’t just tell your story. We make sure the right people hear it loud and clear.",
    ],
    rightLabel: "Event Concept",
    rightHead: "& Design",
    rightBody: [
      "At entourage, we create large-scale event experiences where storytelling takes center stage. From global conferences to mega shows and iconic sporting and cultural events, we build narratives that spark dialogue, inspire emotion, and leave a lasting legacy.",
      "Every detail, agenda design, stage content, keynote curation, and show flow, is crafted to deliver meaning with momentum. We design the entire event journey to ensure every moment, from arrival to final impression, reinforces the message and deepens audience connection.",
      "We combine creative direction, scenography, immersive tech, and live show production to bring stories to life in unforgettable ways. Whether it’s a stadium-scale spectacle, a world-class forum, or a high-impact government summit, our events are built not just to impress but to influence.",
      "We don’t just build shows, we script experiences that resonate long after the curtain close.",
    ],
    btn: "Learn More",
  },
  ar: {
    heading: "ما نجسّده في الواقع",
    leftLabel: "التسويق",
    leftHead: "وسرد القصص",
    leftBody: [
      "بوصفنا قوة إعلانية رائدة في الشرق الأوسط، نبتكر حملات جريئة وفعّالة تمزج بين السرد المبهر والإعلام الاستراتيجي عالي الأداء.",
      "من حملات الإعلان الكبرى إلى التخطيط الإعلامي متعدد القنوات، نصوغ الروايات والقصص التي تصل إلى الأعماق ونضخّمها عبر كل منصة مؤثرة.",
      "كل حملة مدفوعة بالبيانات. كل قناة مُفعَّلة بهدف. كل انطباع مهندَس للأثر.",
      "نحن لا نروي قصتك فحسب — بل نضمن وصولها إلى الأشخاص المناسبين بوضوح لا يُنكَر.",
    ],
    rightLabel: "مفهوم الفعالية",
    rightHead: "والتصميم",
    rightBody: [
      "في أمبريلا، نصنع تجارب فعاليات واسعة النطاق تتصدّر المشهد السرد. من المؤتمرات العالمية إلى العروض الكبرى والفعاليات الثقافية الأيقونية، نبني روايات تُشعل الحوار وتُلهم المشاعر وترسّخ إرثاً باقياً.",
      "كل تفصيلة — تصميم جدول الأعمال ومحتوى المسرح وانتقاء الكلمات الرئيسية وتدفق العرض — مُصاغة لتمنح كل لحظة معنى ودفعاً. نصمم رحلة الفعالية بأكملها لضمان أن كل لحظة تُعزّز الرسالة وتُعمّق تواصل الجمهور.",
      "نجمع الإخراج الإبداعي والتصميم البيئي والتقنية الغامرة والإنتاج الحي لنُحيّي القصص بأساليب لا تُنسى. سواء أكان استعراضاً بحجم الملاعب أم منتدى عالمي الطراز، فعالياتنا مبنية لا لإثارة الإعجاب فحسب، بل للتأثير.",
      "نحن لا نبني عروضاً فقط — بل نكتب تجارب تتردّد في الأرجاء طويلاً بعد إسدال الستار.",
    ],
    btn: "اعرف أكثر",
  },
};

export default function StackSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const wrapper  = wrapperRef.current;
      const card     = cardRef.current;
      const leftCol  = leftColRef.current;
      const rightCol = rightColRef.current;
      if (!wrapper || !card || !leftCol || !rightCol) return;

      if (window.innerWidth < 768) {
        const vh = window.innerHeight;
        gsap.set(card, { y: vh });
        const t = gsap.fromTo(card, { y: vh }, {
          y: 0, ease: "none",
          scrollTrigger: { trigger: wrapper, start: "top top", end: "+=100vh", scrub: 2 },
        });
        if (t.scrollTrigger) triggers.push(t.scrollTrigger);
        return;
      }

      const vh = window.innerHeight;
      gsap.set(card, { y: vh });

      const tEnter = gsap.fromTo(card, { y: vh }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: wrapper, start: "top top", end: "+=100vh", scrub: 2 },
      });
      if (tEnter.scrollTrigger) triggers.push(tEnter.scrollTrigger);

      if (window.innerWidth >= 768) {
        const tExit = gsap.fromTo([leftCol, rightCol], { xPercent: 0 }, {
          xPercent: (i: number) => (i === 0 ? -115 : 115),
          ease: "none",
          scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: 1 },
        });
        if (tExit.scrollTrigger) triggers.push(tExit.scrollTrigger);
      }
    };

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={cardRef} className={styles.card}>
        <div className={styles.inner}>
          <h2 className={styles.heading}>{c.heading}</h2>
          <div className={styles.cols}>
            <div ref={leftColRef} className={styles.col}>
              <span className={styles.label}>{c.leftLabel}</span>
              <h3 className={styles.colHeading}>{c.leftHead}</h3>
              <div className={styles.body}>
                {c.leftBody.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div ref={rightColRef} className={styles.col}>
              <span className={styles.label}>{c.rightLabel}</span>
              <h3 className={styles.colHeading}>{c.rightHead}</h3>
              <div className={styles.body}>
                {c.rightBody.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.btn}>{c.btn}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
