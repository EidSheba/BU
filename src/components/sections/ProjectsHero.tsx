"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProjectsHero.module.css";
import { PROJECTS_DATA } from "@/data/projects";
import { useLanguage } from "@/hooks/useLanguage";

const REEL = PROJECTS_DATA;
const SLIDE_MS = 3200;

const t = {
  en: {
    rows: ["PROJECTS", "THAT SPEAK", "FOR THEMSELVES"],
    sub: "From government summits to extreme-sport spectacles, every name on this list is a different problem we were trusted to solve — on the ground, on schedule, and always at full scale.",
    cta: "View All Projects",
  },
  ar: {
    rows: ["مشاريع", "تتحدث", "عن نفسها"],
    sub: "من قمم حكومية إلى مشاهد رياضية استثنائية، كل اسم في هذه القائمة مشكلة مختلفة وثقنا بنا لحلها — على أرض الواقع، في الوقت المحدد، وبالحجم الكامل دائماً.",
    cta: "عرض جميع المشاريع",
  },
};

type ProjectsHeroProps = {
  /** Shows the "View All Projects" CTA. Off by default (used when this hero doubles as a home-page teaser). */
  showCta?: boolean;
  /** When set, the intro timeline plays on scroll-into-view of this element instead of immediately. */
  triggerRef?: RefObject<HTMLElement | null>;
};

export default function ProjectsHero({ showCta = false, triggerRef }: ProjectsHeroProps) {
  const headRef  = useRef<HTMLDivElement>(null);
  const subRef   = useRef<HTMLParagraphElement>(null);
  const [active, setActive] = useState(0);
  const lang = useLanguage();
  const c = t[lang];

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let scrollTrigger: any;

    const init = async () => {
      const { gsap } = await import("gsap");

      if (subRef.current)   gsap.set(subRef.current,   { opacity: 0, y: 18 });

      const tl = gsap.timeline({
        delay: triggerRef ? 0 : 0.15,
        paused: !!triggerRef,
      });

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

      if (triggerRef?.current) {
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);
        scrollTrigger = ScrollTrigger.create({
          // wrapper is 200vh; the sticky card finishes sliding into place
          // 100vh (50% of the wrapper) into the scroll — start the intro there.
          trigger: triggerRef.current,
          start: "top+=50% top",
          once: true,
          onEnter: () => tl.play(),
        });
      }
    };
    init();
    return () => scrollTrigger?.kill();
  }, [lang, triggerRef]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((i) => (i + 1) % REEL.length);
    }, SLIDE_MS);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.left}>
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

        {showCta && (
          <Link href="/projects" className={styles.cta}>
            {c.cta}
          </Link>
        )}
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
            <span className={styles.reelTitle}>
              {lang === "ar" ? REEL[active].title_ar : REEL[active].title}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
