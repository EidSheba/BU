"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./ProjectsHero.module.css";
import { PROJECTS_DATA } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

const REEL = PROJECTS_DATA;
const SLIDE_MS = 3200;

const t = {
  en: {
    eyebrow: "Selected Work · 13 Productions",
    rows: ["PROJECTS", "THAT SPEAK", "FOR THEMSELVES"],
    sub: "From government summits to extreme-sport spectacles, every name on this list is a different problem we were trusted to solve — on the ground, on schedule, and always at full scale.",
    stats: [
      { count: 13,  suffix: "",   label: "Projects"  },
      { count: 9,   suffix: "",   label: "Cities"    },
      { count: 500, suffix: "K+", label: "Attendees" },
    ],
  },
  ar: {
    eyebrow: "أعمال مختارة · ١٣ إنتاجاً",
    rows: ["مشاريع", "تتحدث", "عن نفسها"],
    sub: "من قمم حكومية إلى مشاهد رياضية استثنائية، كل اسم في هذه القائمة مشكلة مختلفة وثقنا بنا لحلها — على أرض الواقع، في الوقت المحدد، وبالحجم الكامل دائماً.",
    stats: [
      { count: 13,  suffix: "",   label: "مشاريع" },
      { count: 9,   suffix: "",   label: "مدن"    },
      { count: 500, suffix: "K+", label: "حضور"   },
    ],
  },
};

export default function ProjectsHero() {
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");

      if (eyebrowRef.current) gsap.set(eyebrowRef.current, { opacity: 0, y: 12 });
      if (subRef.current)     gsap.set(subRef.current,     { opacity: 0, y: 18 });
      if (statsRef.current)   gsap.set(statsRef.current,   { opacity: 0, y: 16 });

      const tl = gsap.timeline({ delay: 0.15 });
      if (eyebrowRef.current) tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 0);

      if (lang === "en") {
        const letters = headRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
        if (letters?.length) {
          gsap.set(letters, { y: "112%" });
          tl.to(letters, { y: "0%", duration: 1.15, ease: "power4.out", stagger: { amount: 0.3 } }, 0.1);
        }
      } else {
        const words = headRef.current?.querySelectorAll<HTMLElement>("[data-word]");
        if (words?.length) {
          gsap.set(words, { y: "100%", opacity: 0 });
          tl.to(words, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out", stagger: { amount: 0.3 } }, 0.1);
        }
      }

      if (subRef.current)   tl.to(subRef.current,   { opacity: 1, y: 0, duration: 0.85, ease: "power2.out" }, 0.5);
      if (statsRef.current) tl.to(statsRef.current,  { opacity: 1, y: 0, duration: 0.7,  ease: "power2.out" }, 0.65);

      if (statsRef.current) {
        const countEls = statsRef.current.querySelectorAll<HTMLElement>("[data-count]");
        countEls.forEach((el) => {
          const target = parseInt(el.dataset.count ?? "0", 10);
          const suffix = el.dataset.suffix ?? "";
          const obj = { val: 0 };
          tl.to(obj, {
            val: target,
            duration: 1.7,
            ease: "power2.out",
            onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
          }, 0.7);
        });
      }
    };
    init();
  }, [lang]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % REEL.length);
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <span ref={eyebrowRef} className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          {c.eyebrow}
        </span>

        {lang === "en" ? (
          <div ref={headRef} className={styles.headline} aria-label="Projects that speak for themselves">
            <div className={styles.hRow}>
              {"PROJECTS".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
            <div className={`${styles.hRow} ${styles.hRowAccent}`}>
              {"THAT SPEAK".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
            <div className={styles.hRow}>
              {"FOR THEMSELVES".split("").map((ch, i) => (
                <span key={i} className={styles.lWrap}>
                  <span data-letter className={styles.lChar}>{ch}</span>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div ref={headRef} className={styles.headline} aria-label="مشاريع تتحدث عن نفسها">
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>مشاريع</span>
              </span>
            </div>
            <div className={`${styles.hRow} ${styles.hRowAccent}`}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>تتحدث</span>
              </span>
            </div>
            <div className={styles.hRow}>
              <span className={styles.lWrap}>
                <span data-word className={styles.lChar}>عن نفسها</span>
              </span>
            </div>
          </div>
        )}

        <p ref={subRef} className={styles.sub}>{c.sub}</p>

        <div ref={statsRef} className={styles.statsRow}>
          {c.stats.map((s, i) => (
            <div key={i} className={styles.stat}>
              <b data-count={s.count} data-suffix={s.suffix}>0{s.suffix}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.reelDashes}>
          {REEL.map((_, i) => {
            const state =
              i < active ? styles.reelDashFillDone : i === active ? styles.reelDashFillActive : "";
            return (
              <span key={`${i}-${active}`} className={styles.reelDash}>
                <span className={`${styles.reelDashFill} ${state}`} />
              </span>
            );
          })}
        </div>

        <div className={styles.reelStage}>
          {REEL.map((proj, i) => (
            <div
              key={proj.slug}
              className={`${styles.reelSlide} ${i === active ? styles.reelSlideActive : ""}`}
            >
              <Image
                src={proj.heroImg}
                alt={proj.title}
                fill
                className={styles.reelImg}
                priority={i === 0}
                sizes="(max-width: 980px) 100vw, 50vw"
              />
            </div>
          ))}
          <div className={styles.reelGradLeft} />
          <div className={styles.reelGrad} />

          <div className={styles.reelCaption}>
            <span className={styles.reelNum}>{REEL[active].id} / {String(PROJECTS_DATA.length).padStart(2, "0")}</span>
            <span className={styles.reelTitle}>
              {lang === "ar" ? REEL[active].title_ar : REEL[active].title}
            </span>
            <span className={styles.reelMeta}>{REEL[active].category} · {REEL[active].year}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
