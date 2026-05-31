"use client";

import { useEffect, useRef } from "react";

export default function SecretSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const revealRef  = useRef<HTMLDivElement>(null);

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

      // Use the sticky wrapper as trigger so fill spans entry + sticky phase
      const wrapper = section.closest<HTMLElement>(".secret-scroll-space");

      reveal.style.clipPath = "inset(0 100% 0 0)";

      const t = ScrollTrigger.create({
        trigger: wrapper ?? section,
        start:   "top 80%",
        end:     "top top",
        scrub:   0.5,
        onUpdate(self: { progress: number }) {
          reveal.style.clipPath = `inset(0 ${(1 - self.progress) * 100}% 0 0)`;
        },
      });

      triggers.push(t);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="secret-section">
      <div className="secret-text-wrap">
        <p className="secret-our secret-dim">OUR SECRET</p>
        <p className="secret-ing secret-dim">INGREDINT?</p>
      </div>
      <div ref={revealRef} className="secret-text-wrap secret-reveal-layer">
        <p className="secret-our secret-white">OUR SECRET</p>
        <p className="secret-ing secret-green">INGREDINT?</p>
      </div>
    </section>
  );
}
