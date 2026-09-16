"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";
import CounterNumber from "@/components/ui/CounterNumber";

const STATS = [
  { value: 400, suffix: "+", en: "Projects", ar: "مشروع" },
  { value: 100, suffix: "+", en: "Clients", ar: "عميل" },
  { value: 500, suffix: "K+", en: "Visitors Across Our Events", ar: "زائر عبر فعالياتنا" },
  { value: 200, suffix: "+", en: "Events", ar: "فعالية" },
];

const HEADING = {
  en: { left: "BU", right: "IN", bottom: "NUMBERS" },
  ar: { left: "BU", right: "بالأرقام", bottom: "" },
};

export default function ArchitectSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const leftRef     = useRef<HTMLSpanElement>(null);
  const rightRef    = useRef<HTMLSpanElement>(null);
  const leftInRef   = useRef<HTMLSpanElement>(null);
  const rightInRef  = useRef<HTMLSpanElement>(null);

  const lang = useLanguage();
  const h = HEADING[lang];

  useEffect(() => {
    let trigger: { kill: () => void } | undefined;

    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section  = sectionRef.current;
      const headline = headlineRef.current;
      const left     = leftRef.current;
      const right    = rightRef.current;
      const leftIn   = leftInRef.current;
      const rightIn  = rightInRef.current;
      if (!section || !headline || !left || !right || !leftIn || !rightIn) return;

      // Slide the two row-1 words toward each other until one space apart (tight text rects)
      const l = leftIn.getBoundingClientRect();
      const r = rightIn.getBoundingClientRect();
      const [first, second] = l.left < r.left ? [l, r] : [r, l];
      const space = first.height * 0.3;
      const gap   = Math.max(0, second.left - first.right - space);
      const dir   = l.left < r.left ? 1 : -1;

      const tl = gsap.timeline({
        scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 3 },
      });
      tl.fromTo(headline, { rowGap: window.innerHeight * 0.1 }, { rowGap: 0, ease: "none" }, 0)
        .fromTo(left,  { x: 0 }, { x:  dir * gap / 2, ease: "none" }, 0)
        .fromTo(right, { x: 0 }, { x: -dir * gap / 2, ease: "none" }, 0);
      trigger = tl.scrollTrigger;
    }

    init();
    return () => trigger?.kill();
  }, [lang]);

  return (
    <section ref={sectionRef} className="architect-section">
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
          <span className="architect-word architect-word--bold architect-word--center">{h.bottom}</span>
        )}
      </div>

      <div className="architect-row">
        <div className="architect-copy">
          <div className="architect-stats">
            {STATS.map((s) => (
              <div key={s.en} className="architect-stat">
                <span className="architect-stat-value">
                  <CounterNumber value={s.value} suffix={s.suffix} />
                </span>
                <span className="architect-stat-label">{s[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
