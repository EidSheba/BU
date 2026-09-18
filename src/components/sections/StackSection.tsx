"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./StackSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  ar: {
    eyebrow: "عن مظلة الأعمال",
    heading: "الرؤية والرسالة",
    leftLabel: "01",
    leftBadge: "رؤيتنا",
    leftHead: "الرؤية",
    leftBody: [
      "أن نكون المرجع الأول في تصميم وتنفيذ المعارض والفعاليات، ونقود صناعة التجارب في المملكة من خلال حلول مبتكرة تخلق أثرًا حقيقيًا وتحقق قيمة مستدامة.",
    ],
    rightLabel: "02",
    rightBadge: "رسالتنا",
    rightHead: "الرسالة",
    rightBody: [
      "نقدّم في «مظلة الأعمال» حلولًا متكاملة لتخطيط وتنفيذ المعارض والفعاليات، تجمع بين الإبداع في التصميم والكفاءة في التشغيل، لنحوّل أفكار عملائنا إلى تجارب استثنائية تحقق أهدافهم وتترك أثرًا مستدامًا.",
    ],
    btn: "اعرف أكثر عنّا",
  },
  en: {
    eyebrow: "ABOUT BUSINESS UMBRELLA",
    heading: "Our Vision & Mission",
    leftLabel: "01",
    leftBadge: "VISION",
    leftHead: "Vision",
    leftBody: [
      "To be the primary reference in designing and implementing exhibitions and events, and to lead the experience industry in the Kingdom through innovative solutions that create real impact and achieve sustainable value.",
    ],
    rightLabel: "02",
    rightBadge: "MISSION",
    rightHead: "Mission",
    rightBody: [
      'At "Business Umbrella", we provide integrated solutions for planning and implementing exhibitions and events, combining creativity in design and efficiency in operation, to transform our clients\' ideas into exceptional experiences that achieve their goals and leave a sustainable impact.',
    ],
    btn: "Learn More About Us",
  },
};

export default function StackSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const footerRef   = useRef<HTMLDivElement>(null);
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
      const header   = headerRef.current;
      const leftCol  = leftColRef.current;
      const rightCol = rightColRef.current;
      const footer   = footerRef.current;
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
        const isRtl = lang === "ar";
        const tExit = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top top", end: "bottom top", scrub: 1 },
        });
        tExit.fromTo([leftCol, rightCol], { xPercent: 0 }, {
          xPercent: (i: number) => (isRtl ? (i === 0 ? 115 : -115) : (i === 0 ? -115 : 115)),
          ease: "none",
        }, 0);
        if (header) {
          tExit.fromTo(header, { opacity: 1, y: 0 }, { opacity: 0, y: -30, ease: "none" }, 0);
        }
        if (footer) {
          tExit.fromTo(footer, { opacity: 1, y: 0 }, { opacity: 0, y: 25, ease: "none" }, 0);
        }
        if (tExit.scrollTrigger) triggers.push(tExit.scrollTrigger);
      }
    };

    init();
    return () => triggers.forEach((t) => t.kill());
  }, [lang]);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={cardRef} className={styles.card}>
        <div className={styles.inner}>
          <div ref={headerRef} className={styles.header}>
            <span className={styles.eyebrow}>{c.eyebrow}</span>
            <h2 className={styles.heading}>{c.heading}</h2>
          </div>

          <div className={styles.cols}>
            <div ref={leftColRef} className={styles.col}>
              <div className={styles.cardTop}>
                <span className={styles.numberBadge}>{c.leftLabel}</span>
                <span className={styles.typeBadge}>{c.leftBadge}</span>
              </div>
              <h3 className={styles.colHeading}>{c.leftHead}</h3>
              <div className={styles.body}>
                {c.leftBody.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div ref={rightColRef} className={styles.col}>
              <div className={styles.cardTop}>
                <span className={styles.numberBadge}>{c.rightLabel}</span>
                <span className={styles.typeBadge}>{c.rightBadge}</span>
              </div>
              <h3 className={styles.colHeading}>{c.rightHead}</h3>
              <div className={styles.body}>
                {c.rightBody.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>

          <div ref={footerRef} className={styles.footer}>
            <Link href="/about" className={styles.btn}>
              <span>{c.btn}</span>
              <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
