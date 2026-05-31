"use client";

import { useEffect, useRef } from "react";

const COPY_LINES = ["THAT MOVE", "HEARTS, SHIFT", "MINDS, AND", "DELIVER RESULTS."];

function CopyLines() {
  return (
    <>
      {COPY_LINES.map((line, i) => (
        <div key={i} className="copy-line">{line}</div>
      ))}
    </>
  );
}

export default function ArchitectSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const headlineRef     = useRef<HTMLDivElement>(null);
  const weRef           = useRef<HTMLSpanElement>(null);
  const architectRef    = useRef<HTMLSpanElement>(null);
  const humanRef        = useRef<HTMLSpanElement>(null);
  const experiencesRef  = useRef<HTMLSpanElement>(null);
  const copyBlackRef    = useRef<HTMLDivElement>(null);
  const copyWrapRef     = useRef<HTMLDivElement>(null);

  const weERef          = useRef<HTMLSpanElement>(null);
  const architectARef   = useRef<HTMLSpanElement>(null);
  const humanNRef       = useRef<HTMLSpanElement>(null);
  const experiencesERef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const section      = sectionRef.current;
      const headline     = headlineRef.current;
      const we           = weRef.current;
      const architect    = architectRef.current;
      const human        = humanRef.current;
      const experiences  = experiencesRef.current;
      const copyBlack    = copyBlackRef.current;
      const copyWrap     = copyWrapRef.current;
      const weE          = weERef.current;
      const architectA   = architectARef.current;
      const humanN       = humanNRef.current;
      const experiencesE = experiencesERef.current;

      if (
        !section || !headline || !copyBlack || !copyWrap ||
        !we || !architect || !human || !experiences ||
        !weE || !architectA || !humanN || !experiencesE
      ) return;

      // ── headline convergence ──────────────────────────────────
      const weELeft          = weE.getBoundingClientRect().left;
      const architectALeft   = architectA.getBoundingClientRect().left;
      const humanNLeft       = humanN.getBoundingClientRect().left;
      const experiencesELeft = experiencesE.getBoundingClientRect().left;

      const archGap = weELeft - architectALeft;
      const expGap  = humanNLeft - experiencesELeft;
      const gapPx   = window.innerHeight * 0.1;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end:   "top 30%",
          scrub: 3,
        },
      });

      tl.fromTo(headline,    { rowGap: gapPx }, { rowGap: 0,        ease: "none" }, 0)
        .fromTo(we,          { x: 0 },          { x: -archGap / 2,  ease: "none" }, 0)
        .fromTo(architect,   { x: 0 },          { x:  archGap / 2,  ease: "none" }, 0)
        .fromTo(human,       { x: 0 },          { x: -expGap  / 2,  ease: "none" }, 0)
        .fromTo(experiences, { x: 0 },          { x:  expGap  / 2,  ease: "none" }, 0);

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      // ── line-by-line fill reveal ──────────────────────────────
      // measure each .copy-line span to get exact line positions
      const elRect   = copyBlack.getBoundingClientRect();
      const lineEls  = Array.from(copyBlack.querySelectorAll<HTMLElement>(".copy-line"));
      const lineRects = lineEls.map((el) => {
        const r = el.getBoundingClientRect();
        return { top: r.top - elRect.top, bottom: r.bottom - elRect.top };
      });
      const elW = elRect.width;

      function buildPolygon(progress: number): string {
        if (progress <= 0 || !lineRects.length) return "polygon(0px 0px,0px 0px,0px 0px)";
        if (progress >= 1) return "none";

        const n    = lineRects.length;
        const step = 1 / n;
        const lineIdx     = Math.min(Math.floor(progress / step), n - 1);
        const lineProgress = Math.min((progress - lineIdx * step) / step, 1);
        const revealX = lineProgress * elW;
        const curr    = lineRects[lineIdx];

        if (lineIdx === 0) {
          return `polygon(0px ${curr.top}px,${revealX}px ${curr.top}px,${revealX}px ${curr.bottom}px,0px ${curr.bottom}px)`;
        }

        const prevBottom = lineRects[lineIdx - 1].bottom;
        return (
          `polygon(` +
          `0px 0px,` +
          `${elW}px 0px,` +
          `${elW}px ${prevBottom}px,` +
          `${revealX}px ${prevBottom}px,` +
          `${revealX}px ${curr.bottom}px,` +
          `0px ${curr.bottom}px)`
        );
      }

      copyBlack.style.clipPath = buildPolygon(0);

      const fillTrigger = ScrollTrigger.create({
        trigger: copyWrap,
        start: "top 80%",
        end:   "center 60%",
        scrub: 0.5,
        onUpdate(self: ScrollTrigger) {
          copyBlack.style.clipPath = buildPolygon(self.progress);
        },
      });

      triggers.push(fillTrigger);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} className="architect-section">
      <div ref={headlineRef} className="architect-headline">
        <span ref={weRef} className="architect-word architect-word--left">
          W<span ref={weERef}>E</span>
        </span>
        <span ref={architectRef} className="architect-word architect-word--right">
          <span ref={architectARef}>A</span>RCHITECT
        </span>
        <span ref={humanRef} className="architect-word architect-word--left architect-word--bold">
          HUMA<span ref={humanNRef}>N</span>
        </span>
        <span ref={experiencesRef} className="architect-word architect-word--right architect-word--bold">
          <span ref={experiencesERef}>E</span>XPERIENCES
        </span>
      </div>

      <div className="architect-row">
        <div className="architect-video-wrap">
          <video
            className="architect-video"
            src="/videos/backgroundVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
        <div className="architect-copy">
          <div ref={copyWrapRef} className="architect-text-reveal">
            <div className="architect-copy-primary architect-copy-grey">
              <CopyLines />
            </div>
            <div ref={copyBlackRef} className="architect-copy-primary architect-copy-black">
              <CopyLines />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
