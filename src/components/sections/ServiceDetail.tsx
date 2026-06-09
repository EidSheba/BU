"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServiceData } from "@/data/services";
import styles from "./ServiceDetail.module.css";

export default function ServiceDetail({ service }: { service: ServiceData }) {
  const heroTextRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function init() {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      // Hero text entrance
      const letters = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
      const heroSubs = heroTextRef.current?.querySelectorAll<HTMLElement>("[data-sub]");
      if (letters?.length) {
        gsap.set(letters, { y: "110%" });
        gsap.to(letters, {
          y: "0%",
          duration: 1.1,
          ease: "power4.out",
          stagger: { amount: 0.3 },
          delay: 0.2,
        });
      }
      if (heroSubs?.length) {
        gsap.set(heroSubs, { opacity: 0, y: 16 });
        gsap.to(heroSubs, {
          opacity: 1, y: 0,
          duration: 0.8, ease: "power2.out",
          stagger: 0.1, delay: 0.6,
        });
      }

      // Body scroll reveals
      if (bodyRef.current) {
        const reveals = bodyRef.current.querySelectorAll<HTMLElement>("[data-reveal]");
        gsap.set(reveals, { opacity: 0, y: 30 });
        reveals.forEach((el) => {
          ScrollTrigger.create({
            trigger: el,
            start: "top 88%",
            onEnter: () =>
              gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }),
          });
        });
      }
    }
    init();
  }, []);

  const words = service.title.split(" ");

  return (
    <>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src={service.heroImg}
            alt={service.title}
            fill
            className={styles.heroBgImg}
            priority
            sizes="100vw"
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroOverlayBot} />
        </div>

        <div ref={heroTextRef} className={styles.heroInner}>
          <span data-sub className={styles.heroBack}>
            <Link href="/services" className={styles.heroBackLink}>
              ← All Services
            </Link>
          </span>

          <div className={styles.heroHeadline}>
            {words.map((word, wi) => (
              <div key={wi} className={styles.heroWordRow}>
                {word.split("").map((char, ci) => (
                  <span key={ci} className={styles.heroLBox}>
                    <span data-letter className={styles.heroLChar}>{char}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>

          <div className={styles.heroMeta}>
            <span data-sub className={styles.heroNum}>{service.id}</span>
            <span data-sub className={styles.heroTagline}>{service.tagline}</span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <div ref={bodyRef} className={styles.body}>

        {/* Overview */}
        <section className={styles.overviewSection}>
          <div className={styles.overviewLeft}>
            <span data-reveal className={styles.sectionLabel}>Overview</span>
            <p data-reveal className={styles.overviewText}>{service.overview}</p>
          </div>
          <div data-reveal className={styles.overviewRight}>
            <div className={styles.overviewImgWrap}>
              <Image
                src={service.gallery[0]}
                alt={service.title}
                fill
                className={styles.overviewImg}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.featuresSection}>
          <span data-reveal className={styles.sectionLabel}>What&apos;s Included</span>
          <div className={styles.featuresGrid}>
            {service.features.map((feat, i) => (
              <div key={i} data-reveal className={styles.featureItem}>
                <span className={styles.featureNum}>0{i + 1}</span>
                <span className={styles.featureText}>{feat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Gallery */}
        <section className={styles.gallerySection}>
          <span data-reveal className={styles.sectionLabel}>Gallery</span>
          <div className={styles.galleryGrid}>
            {service.gallery.map((img, i) => (
              <div key={i} data-reveal className={styles.galleryItem}>
                <Image
                  src={img}
                  alt={`${service.title} ${i + 1}`}
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
            Ready to get started<br />
            <span className={styles.ctaAccent}>with {service.title}?</span>
          </h2>
          <div className={styles.ctaActions}>
            <a href="/contact" className={styles.ctaBtn}>
              Start a project ↗
            </a>
            <Link href="/services" className={styles.ctaBack}>
              ← Back to all services
            </Link>
          </div>
        </section>

      </div>
    </>
  );
}
