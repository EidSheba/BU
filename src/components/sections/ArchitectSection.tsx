"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/hooks/useLanguage";

const COPY = {
  en: ["THAT MOVE", "HEARTS, SHIFT", "MINDS, AND", "DELIVER RESULTS."],
  ar: ["تحرّك القلوب", "وتهزّ العقول", "وتُحقق", "النتائج."],
};

function CopyLines({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="copy-line">{line}</div>
      ))}
    </>
  );
}

export default function ArchitectSection() {
  const sectionRef      = useRef<HTMLElement>(null);
  const headlineRef     = useRef<HTMLDivElement>(null);
  const copyBlackRef    = useRef<HTMLDivElement>(null);
  const copyWrapRef     = useRef<HTMLDivElement>(null);

  // English word refs (outer = animation target, inner letter = measurement)
  const weRef           = useRef<HTMLSpanElement>(null);
  const architectRef    = useRef<HTMLSpanElement>(null);
  const humanRef        = useRef<HTMLSpanElement>(null);
  const experiencesRef  = useRef<HTMLSpanElement>(null);
  const weERef          = useRef<HTMLSpanElement>(null);
  const architectARef   = useRef<HTMLSpanElement>(null);
  const humanNRef       = useRef<HTMLSpanElement>(null);
  const experiencesERef = useRef<HTMLSpanElement>(null);

  // Arabic word refs (outer = animation target)
  const arW0Ref = useRef<HTMLSpanElement>(null);
  const arW1Ref = useRef<HTMLSpanElement>(null);
  const arW2Ref = useRef<HTMLSpanElement>(null);
  const arW3Ref = useRef<HTMLSpanElement>(null);
  // Arabic inner text refs (inline-block for tight-rect measurement)
  const arI0Ref = useRef<HTMLSpanElement>(null);
  const arI1Ref = useRef<HTMLSpanElement>(null);
  const arI2Ref = useRef<HTMLSpanElement>(null);
  const arI3Ref = useRef<HTMLSpanElement>(null);

  const lang = useLanguage();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const section   = sectionRef.current;
      const headline  = headlineRef.current;
      const copyBlack = copyBlackRef.current;
      const copyWrap  = copyWrapRef.current;

      if (!section || !headline || !copyBlack || !copyWrap) return;

      if (lang === "en") {
        const we           = weRef.current;
        const architect    = architectRef.current;
        const human        = humanRef.current;
        const experiences  = experiencesRef.current;
        const weE          = weERef.current;
        const architectA   = architectARef.current;
        const humanN       = humanNRef.current;
        const experiencesE = experiencesERef.current;

        if (!we || !architect || !human || !experiences ||
            !weE || !architectA || !humanN || !experiencesE) return;

        const weELeft          = weE.getBoundingClientRect().left;
        const architectALeft   = architectA.getBoundingClientRect().left;
        const humanNLeft       = humanN.getBoundingClientRect().left;
        const experiencesELeft = experiencesE.getBoundingClientRect().left;

        const archGap = weELeft - architectALeft;
        const expGap  = humanNLeft - experiencesELeft;
        const gapPx   = window.innerHeight * 0.1;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 3 },
        });

        tl.fromTo(headline,    { rowGap: gapPx }, { rowGap: 0, ease: "none" }, 0)
          .fromTo(we,          { x: 0 },          { x: -archGap / 2, ease: "none" }, 0)
          .fromTo(architect,   { x: 0 },          { x:  archGap / 2, ease: "none" }, 0)
          .fromTo(human,       { x: 0 },          { x: -expGap  / 2, ease: "none" }, 0)
          .fromTo(experiences, { x: 0 },          { x:  expGap  / 2, ease: "none" }, 0);

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);

      } else {
        // Arabic: same convergence animation as English
        // arW0 = نصمم (left-aligned, left side), arW1 = تجارب (right-aligned, right side)
        // arW2 = إنسانية (left side), arW3 = لا تُنسى (right side)
        const arW0 = arW0Ref.current;
        const arW1 = arW1Ref.current;
        const arW2 = arW2Ref.current;
        const arW3 = arW3Ref.current;
        const arI0 = arI0Ref.current;
        const arI1 = arI1Ref.current;
        const arI2 = arI2Ref.current;
        const arI3 = arI3Ref.current;

        if (!arW0 || !arW1 || !arW2 || !arW3 || !arI0 || !arI1 || !arI2 || !arI3) return;

        // Tight text rects: r0/r2 are on the left, r1/r3 are on the right
        const r0 = arI0.getBoundingClientRect();
        const r1 = arI1.getBoundingClientRect();
        const r2 = arI2.getBoundingClientRect();
        const r3 = arI3.getBoundingClientRect();

        // gap = rightEdge_of_leftWord - leftEdge_of_rightWord (negative = separated)
        const gap1  = r0.right - r1.left;
        const gap2  = r2.right - r3.left;
        const gapPx = window.innerHeight * 0.1;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 30%", scrub: 3 },
        });

        tl.fromTo(headline, { rowGap: gapPx }, { rowGap: 0, ease: "none" }, 0)
          .fromTo(arW0, { x: 0 }, { x: -gap1 / 2, ease: "none" }, 0)
          .fromTo(arW1, { x: 0 }, { x:  gap1 / 2, ease: "none" }, 0)
          .fromTo(arW2, { x: 0 }, { x: -gap2 / 2, ease: "none" }, 0)
          .fromTo(arW3, { x: 0 }, { x:  gap2 / 2, ease: "none" }, 0);

        if (tl.scrollTrigger) triggers.push(tl.scrollTrigger);
      }

      // ── Copy lines fill reveal (works for both languages) ──
      const isRtl   = lang === "ar";
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
        const n          = lineRects.length;
        const step       = 1 / n;
        const lineIdx    = Math.min(Math.floor(progress / step), n - 1);
        const lineProg   = Math.min((progress - lineIdx * step) / step, 1);
        const curr       = lineRects[lineIdx];

        if (!isRtl) {
          // LTR: reveal left → right
          const revealX = lineProg * elW;
          if (lineIdx === 0) {
            return `polygon(0px ${curr.top}px,${revealX}px ${curr.top}px,${revealX}px ${curr.bottom}px,0px ${curr.bottom}px)`;
          }
          const prevBottom = lineRects[lineIdx - 1].bottom;
          return (
            `polygon(0px 0px,${elW}px 0px,${elW}px ${prevBottom}px,` +
            `${revealX}px ${prevBottom}px,${revealX}px ${curr.bottom}px,0px ${curr.bottom}px)`
          );
        } else {
          // RTL: reveal right → left (revealX starts at elW, goes to 0)
          const revealX = (1 - lineProg) * elW;
          if (lineIdx === 0) {
            return `polygon(${revealX}px ${curr.top}px,${elW}px ${curr.top}px,${elW}px ${curr.bottom}px,${revealX}px ${curr.bottom}px)`;
          }
          const prevBottom = lineRects[lineIdx - 1].bottom;
          return (
            `polygon(0px 0px,${elW}px 0px,${elW}px ${curr.bottom}px,` +
            `${revealX}px ${curr.bottom}px,${revealX}px ${prevBottom}px,0px ${prevBottom}px)`
          );
        }
      }

      const setClipPath = (val: string) => {
        copyBlack.style.clipPath = val;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (copyBlack.style as any).webkitClipPath = val;
      };

      setClipPath(buildPolygon(0));

      const fillTrigger = ScrollTrigger.create({
        trigger: copyWrap,
        start: "top 80%",
        end:   "center 60%",
        scrub: 0.5,
        onUpdate(self: ScrollTrigger) {
          setClipPath(buildPolygon(self.progress));
        },
      });
      triggers.push(fillTrigger);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, [lang]);

  const copyLines = COPY[lang];

  return (
    <section ref={sectionRef} className="architect-section">

      {lang === "en" ? (
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
      ) : (
        <div ref={headlineRef} className="architect-headline architect-headline--ar">
          <span ref={arW0Ref} className="architect-word architect-word--right ar-word">
            <span ref={arI0Ref} className="ar-word-inner">نصمم</span>
          </span>
          <span ref={arW1Ref} className="architect-word architect-word--left ar-word">
            <span ref={arI1Ref} className="ar-word-inner">تجارب</span>
          </span>
          <span ref={arW2Ref} className="architect-word architect-word--right architect-word--bold ar-word">
            <span ref={arI2Ref} className="ar-word-inner">إنسانية</span>
          </span>
          <span ref={arW3Ref} className="architect-word architect-word--left architect-word--bold ar-word">
            <span ref={arI3Ref} className="ar-word-inner">لا تُنسى</span>
          </span>
        </div>
      )}

      <div className="architect-row">
        <div className="architect-video-wrap">
          <video className="architect-video" src="/videos/backgroundVideo.mp4" autoPlay muted loop playsInline />
        </div>
        <div className="architect-copy">
          <div ref={copyWrapRef} className="architect-text-reveal">
            <div className="architect-copy-primary architect-copy-grey">
              <CopyLines lines={copyLines} />
            </div>
            <div ref={copyBlackRef} className="architect-copy-primary architect-copy-black">
              <CopyLines lines={copyLines} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
