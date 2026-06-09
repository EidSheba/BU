"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./ProjectsIndexSection.module.css";
import { PROJECTS_DATA } from "@/data/projects";

export default function ProjectsIndexSection() {
  const listRef = useRef<HTMLDivElement>(null);

  // Scroll reveal for rows
  useEffect(() => {
    let triggers: { kill: () => void }[] = [];
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const rows = listRef.current?.querySelectorAll<HTMLElement>("[data-row]");
      if (!rows?.length) return;
      gsap.set(rows, { opacity: 0, y: 28 });
      rows.forEach((row, i) => {
        const st = ScrollTrigger.create({
          trigger: row,
          start: "top 92%",
          onEnter: () =>
            gsap.to(row, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", delay: Math.min(i * 0.04, 0.3) }),
        });
        triggers.push(st);
      });
    })();
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section className={styles.section}>

      <div ref={listRef} className={styles.list}>
        {PROJECTS_DATA.map((proj) => (
          <Link
            key={proj.slug}
            href={`/projects/${proj.slug}`}
            data-row
            className={styles.row}
          >
            <span className={styles.rowNum}>{proj.id}</span>
            <span className={styles.rowTitleWrap}>
              <span className={styles.rowTitle}>{proj.title}</span>
            </span>
            <span className={styles.rowAction}>
              View Project
              <span className={styles.rowActionArrow} aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}
