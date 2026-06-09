"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ServicesListSection.module.css";

/*
  Explicit grid placement on a 3-col × 6-row grid (no gaps, no black cells)

  Row 1: [01 c1-2] [02 c3]
  Row 2: [01 c1-2] [03 c3]
  Row 3: [04 c1  ] [05 c2-3]
  Row 4: [04 c1  ] [06 c2] [07 c3]
  Row 5: [08 c1-2] [09 c3]
  Row 6: [10 c1  ] [11 c2-3]
*/
import { SERVICES_DATA } from "@/data/services";

const SERVICES = SERVICES_DATA.map((s) => ({
  id: s.id,
  slug: s.slug,
  title: s.title,
  desc: s.overview.slice(0, 90) + "…",
  img: s.heroImg,
}));

export default function ServicesListSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const headTitleRef = useRef<HTMLHeadingElement>(null);
  const headFillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards?.length) return;

      gsap.set(cards, { opacity: 0, y: 36, scale: 0.97 });

      const st = ScrollTrigger.create({
        trigger: gridRef.current,
        start: "top 82%",
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1, y: 0, scale: 1,
            duration: 0.75, ease: "power3.out",
            stagger: 0.06,
          });
        },
      });

      triggers.push(st);

      // "Under one roof." fills in white via a clip-path wipe, scrubbed to scroll
      const fillEl = headFillRef.current;
      if (fillEl) {
        const setClip = (progress: number) => {
          const hidden = (1 - progress) * 100;
          const clip = `inset(0 ${hidden}% 0 0)`;
          fillEl.style.clipPath = clip;
          (fillEl.style as CSSStyleDeclaration & { webkitClipPath?: string }).webkitClipPath = clip;
        };
        setClip(0);

        const fillTrigger = ScrollTrigger.create({
          trigger: headTitleRef.current,
          start: "top 80%",
          end: "bottom 45%",
          scrub: 0.4,
          onUpdate: (self: { progress: number }) => setClip(self.progress),
        });
        triggers.push(fillTrigger);
      }
    };

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className={styles.section}>

      <div className={styles.heading}>
        <span className={styles.headLabel}>Our Disciplines</span>
        <h2 ref={headTitleRef} className={styles.headTitle}>
          Everything you need.<br />
          <span className={styles.headTitleWrap}>
            <span className={styles.headTitleMuted}>Under one roof.</span>
            <span ref={headFillRef} className={styles.headTitleFill} aria-hidden="true">
              Under one roof.
            </span>
          </span>
        </h2>
      </div>

      <div ref={gridRef} className={styles.grid}>
        {SERVICES.map((svc) => (
          <Link
            key={svc.id}
            href={`/services/${svc.slug}`}
            data-card
            data-id={svc.id}
            className={styles.card}
          >
            <Image
              src={svc.img}
              alt={svc.title}
              fill
              className={styles.cardImg}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardAccent} />
            <div className={styles.cardContent}>
              <span className={styles.cardNum}>{svc.id}</span>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardDesc}>{svc.desc}</p>
            </div>
          </Link>
        ))}
      </div>

    </section>
  );
}
