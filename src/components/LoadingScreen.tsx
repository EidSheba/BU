"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LoadingScreen.module.css";

export default function LoadingScreen({ ready }: { ready: boolean }) {
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(() => {
      setLeaving(true);
      setTimeout(() => setGone(true), 1100);
    }, 1200);
    return () => clearTimeout(t);
  }, [ready]);

  useEffect(() => {
    const BAR_DELAY = 1100;
    const BAR_DURATION = 2800;
    let raf: number;

    const timeout = setTimeout(() => {
      const start = performance.now();
      const tick = () => {
        const t = Math.min((performance.now() - start) / BAR_DURATION, 1);
        const value = t < 0.65 ? (t / 0.65) * 0.8 : 0.8 + ((t - 0.65) / 0.35) * 0.2;
        setPercent(Math.round(value * 100));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, BAR_DELAY);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (gone) return null;

  return (
    <>
      <div className={`${styles.panelTop}${leaving ? ` ${styles.panelTopLeaving}` : ""}`} />
      <div className={`${styles.panelBottom}${leaving ? ` ${styles.panelBottomLeaving}` : ""}`} />

      <div className={`${styles.content}${leaving ? ` ${styles.contentLeaving}` : ""}`}>

        <div className={styles.logo}>
          <Image
            src="/images/bu_logo_4.png"
            alt="Business Umbrella"
            fill
            className={styles.logoImg}
            priority
          />
        </div>

        <div className={styles.words}>
          <div className={styles.splitRow}>
            <span className={styles.business}>Business</span>
            <span className={styles.divider} />
            <span className={styles.umbrella}>Umbrella</span>
          </div>
          <span className={styles.tagline}>We Architect Human Experiences</span>
        </div>

        <div className={styles.barOuter}>
          <div className={styles.barWrap}>
            <div className={styles.bar} />
          </div>
          <span className={styles.percent}>{percent}%</span>
        </div>

      </div>
    </>
  );
}
