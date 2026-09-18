"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import CounterNumber from "@/components/ui/CounterNumber";

interface StatItem {
  index: string;
  tag: { en: string; ar: string };
  value: number;
  suffix: string;
  title: { en: string; ar: string };
  desc: { en: string; ar: string };
}

const STATS: StatItem[] = [
  {
    index: "01",
    tag: { en: "SCALE", ar: "النطاق" },
    value: 400,
    suffix: "+",
    title: { en: "Projects Delivered", ar: "مشروع منجز" },
    desc: {
      en: "Turnkey exhibitions, pavilions & brand activations",
      ar: "معارض متكاملة وأجنحة وتفعيلات نوعية استثنائية",
    },
  },
  {
    index: "02",
    tag: { en: "TRUST", ar: "الشركاء" },
    value: 100,
    suffix: "+",
    title: { en: "Clients & Partners", ar: "عميل وشريك نجاح" },
    desc: {
      en: "Government ministries, entities & global enterprises",
      ar: "وزارات وهيئات حكومية وشركات عالمية رائدة",
    },
  },
  {
    index: "03",
    tag: { en: "REACH", ar: "الجمهور" },
    value: 500,
    suffix: "K+",
    title: { en: "Event Attendees", ar: "زائر وحاضر لفعالياتنا" },
    desc: {
      en: "Audiences engaged in immersive live experiences",
      ar: "جمهور تفاعل في تجارب حية صنعت أثراً ممتداً",
    },
  },
  {
    index: "04",
    tag: { en: "EXECUTION", ar: "الإنتاج" },
    value: 200,
    suffix: "+",
    title: { en: "Mega Productions", ar: "فعالية ومعرض استثنائي" },
    desc: {
      en: "Flawless staging & technical operations kingdom-wide",
      ar: "تشغيل متكامل بأعلى معايير الدقة والاحترافية في المملكة",
    },
  },
];

const CONTENT = {
  en: {
    eyebrow: "03 / SCALE & IMPACT",
    heading: { left: "BU", right: "IN", bottom: "NUMBERS" },
    subtitle:
      "Engineered for monumental scale. Delivering transformative live experiences, summits, and exhibitions across Saudi Arabia.",
    footer: [
      "16+ YEARS OF EXCELLENCE",
      "KINGDOM OF SAUDI ARABIA",
      "FULL-SCALE OPERATION",
    ],
  },
  ar: {
    eyebrow: "٠٣ / الأثر بالأرقام",
    heading: { left: "مظلة", right: "الأعمال", bottom: "في أرقام" },
    subtitle:
      "صُممت لصناعة أثر استثنائي. ننفذ تجارب حية ومؤتمرات ومعارض متكاملة تترك انطباعاً دائماً في كافة أنحاء المملكة.",
    footer: [
      "١٦+ عاماً من التميز",
      "المملكة العربية السعودية",
      "تشغيل متكامل من الفكرة للواقع",
    ],
  },
};

export default function ArchitectSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLSpanElement>(null);
  const rightRef    = useRef<HTMLSpanElement>(null);
  const leftInRef   = useRef<HTMLSpanElement>(null);
  const rightInRef  = useRef<HTMLSpanElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);

  const lang = useLanguage();
  const c = CONTENT[lang];
  const h = c.heading;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      gsap = gsapModule.gsap;
      ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      const section  = sectionRef.current;
      const headline = headlineRef.current;
      const left     = leftRef.current;
      const right    = rightRef.current;
      const leftIn   = leftInRef.current;
      const rightIn  = rightInRef.current;
      const cards    = cardsRef.current;

      if (!section || !headline || !left || !right || !leftIn || !rightIn) return;

      // Slide the two row-1 words toward each other until one space apart
      const l = leftIn.getBoundingClientRect();
      const r = rightIn.getBoundingClientRect();
      const [first, second] = l.left < r.left ? [l, r] : [r, l];
      const space = first.height * 0.3;
      const gap   = Math.max(0, second.left - first.right - space);
      const dir   = l.left < r.left ? 1 : -1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top 25%",
          scrub: 2,
        },
      });

      tl.fromTo(headline, { rowGap: window.innerHeight * 0.08 }, { rowGap: 0, ease: "none" }, 0)
        .fromTo(left,  { x: 0 }, { x:  dir * gap / 2, ease: "none" }, 0)
        .fromTo(right, { x: 0 }, { x: -dir * gap / 2, ease: "none" }, 0);

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      // Stagger reveal cards on scroll entry
      if (cards) {
        const cardElements = cards.querySelectorAll(".architect-card");
        const cardsTween = gsap.fromTo(
          cardElements,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cards,
              start: "top 82%",
            },
          }
        );
        if (cardsTween.scrollTrigger) triggers.push(cardsTween.scrollTrigger);
      }
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, [lang]);

  return (
    <section ref={sectionRef} className="architect-section">
      {/* Background ambient lighting */}
      <div className="architect-glow architect-glow--top" aria-hidden="true" />
      <div className="architect-glow architect-glow--bottom" aria-hidden="true" />

      {/* Header Container */}
      <div className="architect-header-container">
        <div className="architect-eyebrow">
          <span className="architect-dot" />
          <span>{c.eyebrow}</span>
        </div>

        <div ref={headlineRef} className="architect-headline">
          <div className="architect-headline-row">
            <span ref={leftRef} className="architect-word architect-word--left">
              <span ref={leftInRef} className="ar-word-inner">{h.left}</span>
            </span>
            <span ref={rightRef} className="architect-word architect-word--right">
              <span ref={rightInRef} className="ar-word-inner">{h.right}</span>
            </span>
          </div>
          {h.bottom && (
            <span className="architect-word architect-word--bold architect-word--center">
              {h.bottom}
            </span>
          )}
        </div>

        <p className="architect-subtitle">{c.subtitle}</p>
      </div>

      {/* Cards Matrix */}
      <div className="architect-row">
        <div ref={cardsRef} className="architect-stats">
          {STATS.map((s) => (
            <div key={s.index} className="architect-card">
              {/* Corner crosshairs */}
              <span className="architect-crosshair architect-crosshair--tl">+</span>
              <span className="architect-crosshair architect-crosshair--tr">+</span>
              <span className="architect-crosshair architect-crosshair--bl">+</span>
              <span className="architect-crosshair architect-crosshair--br">+</span>

              {/* Card top bar: Index & Category */}
              <div className="architect-card-header">
                <span className="architect-card-index">{s.index} //</span>
                <span className="architect-card-tag">{s.tag[lang]}</span>
              </div>

              {/* Stat Value */}
              <div className="architect-stat-value-wrap">
                <span className="architect-stat-value">
                  <CounterNumber value={s.value} />
                </span>
                <span className="architect-stat-suffix">{s.suffix}</span>
              </div>

              {/* Label & Description */}
              <div className="architect-card-body">
                <h3 className="architect-stat-title">{s.title[lang]}</h3>
                <p className="architect-stat-desc">{s.desc[lang]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trust Strip Footer */}
      <div className="architect-trust-strip">
        {c.footer.map((item, idx) => (
          <span key={item} className="architect-trust-item">
            {idx > 0 && <span className="architect-trust-dot" aria-hidden="true" />}
            <span>{item}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
