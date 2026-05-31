"use client";

import { useEffect, useRef } from "react";
import styles from "./StackSection.module.css";

export default function StackSection() {
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const cardRef     = useRef<HTMLDivElement>(null);
  const leftColRef  = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    async function init() {
      ({ gsap } = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const wrapper  = wrapperRef.current;
      const card     = cardRef.current;
      const leftCol  = leftColRef.current;
      const rightCol = rightColRef.current;
      if (!wrapper || !card || !leftCol || !rightCol) return;

      gsap.set(card, { yPercent: 100 });

      // Enter: card slides up
      const tEnter = gsap.fromTo(
        card,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end:   "+=60vh",
            scrub: 1.5,
          },
        }
      );
      if (tEnter.scrollTrigger) triggers.push(tEnter.scrollTrigger);

      // Exit: scrubbed against the card's natural scroll-away (top→bottom leaves viewport)
      const tExit = gsap.fromTo(
        [leftCol, rightCol],
        { xPercent: 0 },
        {
          xPercent: (i: number) => (i === 0 ? -115 : 115),
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end:   "bottom top",
            scrub: 1,
          },
        }
      );
      if (tExit.scrollTrigger) triggers.push(tExit.scrollTrigger);
    }

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={cardRef} className={styles.card}>
        <div className={styles.inner}>

          <h2 className={styles.heading}>What We Bring to Life</h2>

          <div className={styles.cols}>

            {/* Left column */}
            <div ref={leftColRef} className={styles.col}>
              <span className={styles.label}>Marketing</span>
              <h3 className={styles.colHeading}>&amp; Storytelling</h3>
              <div className={styles.body}>
                <p>
                  As a leading advertising powerhouse in the Middle East, we create bold,
                  results-driven campaigns that fuse unforgettable storytelling with
                  strategic, high-performance media.
                </p>
                <p>
                  From high-impact advertising campaigns to multi-channel media planning
                  and buying, we craft narratives and stories that connect deeply and
                  amplify them across every platform that matters.
                </p>
                <p>
                  Every campaign is powered by insights. Every channel is activated with
                  purpose. Every impression is engineered for impact.
                </p>
                <p>We don&apos;t just tell your story. We make sure the right people hear it loud and clear.</p>
              </div>
            </div>

            {/* Right column */}
            <div ref={rightColRef} className={styles.col}>
              <span className={styles.label}>Event Concept</span>
              <h3 className={styles.colHeading}>&amp; Design</h3>
              <div className={styles.body}>
                <p>
                  At entourage, we create large-scale event experiences where storytelling
                  takes center stage. From global conferences to mega shows and iconic
                  sporting and cultural events, we build narratives that spark dialogue,
                  inspire emotion, and leave a lasting legacy.
                </p>
                <p>
                  Every detail, agenda design, stage content, keynote curation, and show
                  flow, is crafted to deliver meaning with momentum. We design the entire
                  event journey to ensure every moment, from arrival to final impression,
                  reinforces the message and deepens audience connection.
                </p>
                <p>
                  We combine creative direction, scenography, immersive tech, and live show
                  production to bring stories to life in unforgettable ways. Whether it&apos;s a
                  stadium-scale spectacle, a world-class forum, or a high-impact government
                  summit, our events are built not just to impress but to influence.
                </p>
                <p>We don&apos;t just build shows, we script experiences that resonate long after the curtain close.</p>
              </div>
            </div>

          </div>

          <div className={styles.footer}>
            <button type="button" className={styles.btn}>Learn More</button>
          </div>

        </div>
      </div>
    </div>
  );
}
