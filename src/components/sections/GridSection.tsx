"use client";

import { useEffect, useRef } from "react";
import ProjectsHero from "./ProjectsHero";

export default function GridSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      ({ gsap }          = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const card    = cardRef.current;
      if (!wrapper || !card) return;

      const vh = window.innerHeight;
      gsap.set(card, { y: vh });

      const t = gsap.fromTo(
        card,
        { y: vh },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end:   "+=100vh",
            scrub: 2,
          },
        }
      );

      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    };

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={wrapperRef} className="gs-wrapper">
      <div ref={cardRef} className="gs-card">
        <ProjectsHero showCta triggerRef={wrapperRef} />
      </div>
    </div>
  );
}
