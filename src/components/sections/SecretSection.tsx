"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

export default function SecretSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef  = useRef<HTMLDivElement>(null);
  const lang = useLanguage();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      const { gsap } = await import("gsap");
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const reveal  = revealRef.current;
      if (!section || !reveal) return;

      const wrapper = section.closest<HTMLElement>(".secret-scroll-space");
      const isRtl   = lang === "ar";

      // RTL: reveal sweeps right→left; LTR: left→right
      const hidden  = isRtl ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";
      const visible = "inset(0 0 0 0)";

      reveal.style.clipPath = hidden;

      const t = ScrollTrigger.create({
        trigger: wrapper ?? section,
        start:   "top 80%",
        end:     "top top",
        scrub:   0.5,
        onUpdate(self: { progress: number }) {
          const p = self.progress;
          reveal.style.clipPath = isRtl
            ? `inset(0 0 0 ${(1 - p) * 100}%)`
            : `inset(0 ${(1 - p) * 100}% 0 0)`;
        },
      });

      triggers.push(t);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, [lang]);

  const line1 = lang === "ar" ? "سرّنا"      : "OUR SECRET";
  const line2 = lang === "ar" ? "المكوّن؟"   : "INGREDIENT?";

  return (
    <section ref={sectionRef} className="secret-section">
      <div className="secret-text-wrap">
        <p className="secret-our secret-dim">{line1}</p>
        <p className="secret-ing secret-dim">{line2}</p>
      </div>
      <div ref={revealRef} className="secret-text-wrap secret-reveal-layer">
        <p className="secret-our secret-white">{line1}</p>
        <p className="secret-ing secret-green">{line2}</p>
      </div>
    </section>
  );
}
