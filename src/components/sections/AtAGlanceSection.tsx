"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./AtAGlanceSection.module.css";

const PANELS = [
  {
    value: 200,
    suffix: "+",
    label: "PROFESSIONALS",
    photo: "/images/parallax-1.jpg",
    title: "WORLD-CLASS\nTEAM",
    desc: "Over 200 event specialists, creative directors, and production experts — all driven by a single goal: exceed your expectations.",
    index: "01",
  },
  {
    value: 26,
    suffix: "",
    label: "COUNTRIES",
    photo: "/images/parallax-2.jpg",
    title: "GLOBAL\nFOOTPRINT",
    desc: "From Riyadh to London, we deliver best-in-class events across 26 countries — bringing regional expertise to every stage.",
    index: "02",
  },
  {
    value: 150,
    suffix: "+",
    label: "EVENTS",
    photo: "/images/parallax-3.jpg",
    title: "EVENTS\nDELIVERED",
    desc: "Conferences, brand activations, integrated marketing campaigns, and social gatherings — every event crafted to leave a lasting impression.",
    index: "03",
  },
];

const PANEL_COUNT = PANELS.length;

export default function AtAGlanceSection() {
  const heroRef      = useRef<HTMLDivElement>(null);
  const driverRef    = useRef<HTMLDivElement>(null);
  const stickyRef    = useRef<HTMLDivElement>(null);
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const numWrapRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const copyRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const [activeIdx, setActiveIdx] = useState(-1);

  /* hero reveal */
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* GSAP ScrollTrigger for dark panels */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any, triggers: any[] = [];

    const init = async () => {
      ({ gsap }          = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const driver = driverRef.current;
      const sticky = stickyRef.current;
      if (!driver || !sticky) return;

      /* Inject photo CSS custom property — avoids JSX inline styles */
      numWrapRefs.current.forEach((el, i) => {
        el?.style.setProperty("--bg-photo", `url(${PANELS[i].photo})`);
      });

      /* Set up initial states */
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;
        gsap.set(panel, { opacity: i === 0 ? 1 : 0, pointerEvents: i === 0 ? "auto" : "none" });
      });
      numWrapRefs.current.forEach((el) => el && gsap.set(el, { y: 40 }));
      copyRefs.current.forEach((el)    => el && gsap.set(el, { x: 30, opacity: 0 }));

      /* Animate first panel in immediately */
      if (numWrapRefs.current[0]) gsap.to(numWrapRefs.current[0], { y: 0, duration: 1, ease: "power3.out", delay: 0.1 });
      if (copyRefs.current[0])    gsap.to(copyRefs.current[0],    { x: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3 });
      if (panelRefs.current[0])   panelRefs.current[0].classList.add(styles.active);
      setActiveIdx(0);

      /* Native CSS sticky handles pinning — GSAP only tracks scroll progress */
      const st = ScrollTrigger.create({
        trigger: driver,
        start: "top top",
        end: "bottom bottom",
        scrub: false,
        onUpdate: ({ progress }: { progress: number }) => {
          const panelF     = progress * PANEL_COUNT;
          const currentIdx = Math.min(Math.floor(panelF), PANEL_COUNT - 1);
          const panelProg  = panelF - Math.floor(panelF); // 0‑1 within current panel

          panelRefs.current.forEach((panel, i) => {
            if (!panel) return;
            const isActive = i === currentIdx;
            const wasActive = panel.classList.contains(styles.active);

            if (isActive && !wasActive) {
              /* Animate new panel in */
              gsap.killTweensOf([panel, numWrapRefs.current[i], copyRefs.current[i]]);
              gsap.set(numWrapRefs.current[i], { y: 50 });
              gsap.set(copyRefs.current[i],    { x: 40, opacity: 0 });
              gsap.to(panel,                   { opacity: 1, duration: 0.5, ease: "power2.out" });
              gsap.to(numWrapRefs.current[i],  { y: 0,  duration: 0.8, ease: "power3.out" });
              gsap.to(copyRefs.current[i],     { x: 0, opacity: 1, duration: 0.7, delay: 0.15, ease: "power3.out" });
              panel.classList.add(styles.active);
              panel.style.pointerEvents = "auto";

              setActiveIdx(i);
            }

            if (!isActive && wasActive) {
              gsap.killTweensOf([panel, numWrapRefs.current[i], copyRefs.current[i]]);
              gsap.to(panel, { opacity: 0, duration: 0.35, ease: "power2.in" });
              panel.classList.remove(styles.active);
              panel.style.pointerEvents = "none";
            }

            /* Subtle parallax on number while inside panel */
            if (isActive && numWrapRefs.current[i]) {
              gsap.to(numWrapRefs.current[i], {
                y: panelProg * -20,
                duration: 0.1,
                ease: "none",
                overwrite: "auto",
              });
            }
          });
        },
      });

      triggers.push(st);
    };

    init();
    return () => triggers.forEach(t => t.kill?.());
  }, []);

  return (
    <section className={styles.section}>

      {/* ── White intro ─────────────────────────────────────── */}
      <div className={styles.titleWrap}>
        <span className={styles.titleBold}>
          <span className={styles.titleLeft}>BUSINESS</span>
          {" "}
          <span className={styles.titleRight}>UMBRELLA</span>
        </span>
      </div>

      <div ref={heroRef} className={styles.heroStat}>
        <div className={styles.heroLeft}>
          <span className={styles.heroNumber}>16</span>
          <span className={styles.heroLabel}>YEARS</span>
        </div>
        <p className={styles.heroDesc}>
          <span className={styles.descLine}>OF CRAFTING</span>
          <span className={styles.descLine}>UNFORGETTABLE</span>
          <span className={styles.descLine}>EVENTS</span>
        </p>
      </div>

      {/* ── Dark pinned stats ───────────────────────────────── */}
      <div ref={driverRef} className={styles.scrollDriver}>
        <div ref={stickyRef} className={styles.sticky}>

          {PANELS.map((p, i) => (
            <div
              key={i}
              ref={el => { panelRefs.current[i] = el; }}
              className={styles.panel}
            >
              {/* Number — photo clipped through text */}
              <div ref={el => { numWrapRefs.current[i] = el; }} className={styles.numWrap}>
                <span className={styles.bigNum}>{p.value}{p.suffix}</span>
                <span className={styles.statLabel}>{p.label}</span>
              </div>

              {/* Copy */}
              <div ref={el => { copyRefs.current[i] = el; }} className={styles.copyBlock}>
                <span className={styles.copyIndex}>{p.index} / 0{PANEL_COUNT}</span>
                <span className={styles.copyTitle}>
                  {p.title.split("\n").map((line, j) => (
                    <span key={j} className={styles.descLine}>{line}</span>
                  ))}
                </span>
                <p className={styles.copyDesc}>{p.desc}</p>
              </div>
            </div>
          ))}

          {/* Progress dots */}
          <div className={styles.progress}>
            {PANELS.map((_, i) => (
              <div key={i} className={`${styles.dot} ${activeIdx === i ? styles.dotActive : ""}`} />
            ))}
          </div>

          {/* Panel counter */}
          <div className={styles.panelNum}>
            0{Math.max(activeIdx + 1, 1)}&nbsp;/&nbsp;0{PANEL_COUNT}
          </div>

        </div>
      </div>

    </section>
  );
}
