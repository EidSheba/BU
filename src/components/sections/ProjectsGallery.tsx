"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectsGallery.module.css";
import { PROJECTS_DATA } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

export default function ProjectsGallery() {
  const gridRef  = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const lang = useLanguage();

  useEffect(() => {
    const triggers: { kill: () => void }[] = [];

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: "110%" },
          { y: "0%", duration: 1.1, ease: "power4.out", delay: 0.15 },
        );
      }

      const cards = gridRef.current?.querySelectorAll<HTMLElement>("[data-card]");
      if (!cards?.length) return;
      gsap.set(cards, { opacity: 0, y: 40 });
      cards.forEach((card, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: card,
            start: "top 92%",
            once: true,
            onEnter: () =>
              gsap.to(card, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", delay: (i % 3) * 0.08 }),
          }),
        );
      });
    })();

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.titleWrap}>
        <h1 className={styles.title}>
          <span ref={titleRef} className={styles.titleInner}>
            {lang === "ar" ? (
              "مشاريعنا"
            ) : (
              <>
                OUR <span className={styles.titleAccent}>PROJECTS</span>
              </>
            )}
          </span>
        </h1>
        <span className={styles.bar} />
      </div>

      <div ref={gridRef} className={styles.grid}>
        {PROJECTS_DATA.map((proj, i) => (
          <Link key={proj.slug} href={`/projects/${proj.slug}`} data-card className={styles.card}>
            <Image
              src={proj.heroImg}
              alt={lang === "ar" ? proj.title_ar : proj.title}
              fill
              className={styles.cardImg}
              priority={i < 3}
              sizes="(max-width: 560px) 100vw, (max-width: 980px) 50vw, 33vw"
            />
            <div className={styles.cardOverlay} />
            <div className={styles.cardAccent} />
            <div className={styles.cardBody}>
              <h2 className={styles.cardTitle}>{lang === "ar" ? proj.title_ar : proj.title}</h2>
              <span className={styles.cardAction}>
                {lang === "ar" ? "عرض المشروع" : "View Project"}
                <span className={styles.cardArrow} aria-hidden="true">↗</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
