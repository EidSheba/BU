"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceData } from "@/data/services";
import styles from "./ServiceDetail.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const ui = {
  en: {
    back: "← All Services",
    backHref: "/services",
    overview: "Overview",
    included: "What's Included",
    gallery: "Gallery",
    ctaTitle: (title: string) => `Ready to get started\nwith ${title}?`,
    ctaBtn: "Start a project ↗",
    ctaBack: "← Back to all services",
  },
  ar: {
    back: "← كل الخدمات",
    backHref: "/services",
    overview: "نظرة عامة",
    included: "ما يشمله",
    gallery: "معرض الصور",
    ctaTitle: (title: string) => `هل أنت مستعد للبدء\nفي ${title}؟`,
    ctaBtn: "ابدأ مشروعاً ↗",
    ctaBack: "← العودة لجميع الخدمات",
  },
};

export default function ServiceDetail({ service }: { service: ServiceData }) {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const lang = useLanguage();
  const c = ui[lang];

  const title    = lang === "ar" ? service.title_ar    : service.title;
  const tagline  = lang === "ar" ? service.tagline_ar  : service.tagline;
  const overview = lang === "ar" ? service.overview_ar : service.overview;
  const features = lang === "ar" ? service.features_ar : service.features;

  useEffect(() => {
    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const heroSubs = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-sub]");

      if (lang === "en") {
        const letters = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
        if (letters?.length) {
          gsap.set(letters, { y: "110%" });
          gsap.to(letters, { y: "0%", duration: 1.1, ease: "power4.out", stagger: { amount: 0.3 }, delay: 0.2 });
        }
      } else {
        const words = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-word]");
        if (words?.length) {
          gsap.set(words, { y: "100%", opacity: 0 });
          gsap.to(words, { y: "0%", opacity: 1, duration: 1.1, ease: "power4.out", stagger: { amount: 0.25 }, delay: 0.2 });
        }
      }

      if (heroSubs?.length) {
        gsap.set(heroSubs, { opacity: 0, y: 16 });
        gsap.to(heroSubs, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.6 });
      }

      if (bodyRef.current) {
        const reveals = bodyRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { opacity: 0, y: 30 });
        reveals.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }),
          });
        });
      }
    };
    init();
  }, [lang]);

  const ctaLines = c.ctaTitle(title).split("\n");

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image src={service.heroImg} alt={title} fill className={styles.heroBgImg} priority sizes="100vw" />
          <div className={styles.heroOverlay} />
          <div className={styles.heroOverlayBot} />
        </div>

        <div ref={heroTextRef} className={styles.heroInner}>
          <span data-sub className={styles.heroBack}>
            <Link href={c.backHref} className={styles.heroBackLink}>{c.back}</Link>
          </span>

          <div className={styles.heroHeadline}>
            {lang === "en" ? (
              title.split(" ").map((word, wi) => (
                <div key={wi} className={styles.heroWordRow}>
                  {word.split("").map((char, ci) => (
                    <span key={ci} className={styles.heroLBox}>
                      <span data-letter className={styles.heroLChar}>{char}</span>
                    </span>
                  ))}
                </div>
              ))
            ) : (
              title.split(" ").map((word, wi) => (
                <div key={wi} className={styles.heroWordRow}>
                  <span className={styles.heroLBox}>
                    <span data-word className={styles.heroLChar}>{word}</span>
                  </span>
                </div>
              ))
            )}
          </div>

          <div className={styles.heroMeta}>
            <span data-sub className={styles.heroNum}>{service.id}</span>
            <span data-sub className={styles.heroTagline}>{tagline}</span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div ref={bodyRef} className={styles.body}>

        {/* Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewLeft}>
            <span data-reveal className={styles.sectionLabel}>{c.overview}</span>
            <p data-reveal className={styles.overviewText}>{overview}</p>
          </div>
          <div data-reveal className={styles.overviewRight}>
            <div className={styles.overviewImgWrap}>
              <Image
                src={service.gallery[0]}
                alt={title}
                fill
                className={styles.overviewImg}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.featuresSection}>
          <span data-reveal className={styles.sectionLabel}>{c.included}</span>
          <div className={styles.featuresGrid}>
            {features.map((feat, i) => (
              <div key={i} data-reveal className={styles.featureItem}>
                <span className={styles.featureNum}>0{i + 1}</span>
                <span className={styles.featureText}>{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className={styles.gallerySection}>
          <span data-reveal className={styles.sectionLabel}>{c.gallery}</span>
          <div className={styles.galleryGrid}>
            {service.gallery.map((img, i) => (
              <div key={i} data-reveal className={styles.galleryItem}>
                <Image
                  src={img}
                  alt={`${title} ${i + 1}`}
                  fill
                  className={styles.galleryImg}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section data-reveal className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>
            {ctaLines[0]}<br />
            <span className={styles.ctaAccent}>{ctaLines[1]}</span>
          </h2>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBtn}>{c.ctaBtn}</a>
            <Link href="/services" className={styles.ctaBack}>{c.ctaBack}</Link>
          </div>
        </section>

      </div>
    </>
  );
}
