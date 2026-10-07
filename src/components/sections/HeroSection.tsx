"use client";

import Image from "next/image";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import { useLang } from "@/contexts/LangContext";

export default function HeroSection() {
  const { lang } = useLang();
  const isAr = lang === "ar";

  return (
    <>
      <LoadingScreen ready />

      <section className="hero-section" id="hero">
        {/* Main Content Container */}
        <div className="hero-container">
          {/* Floating 3D Umbrella Graphic */}
          <div className="hero-umbrella-container">
            <div className="hero-umbrella-aura" aria-hidden="true" />
            <div className="hero-umbrella-wrapper">
              <Image
                src="/images/umbrella-clean.png"
                alt="Business Umbrella 3D Icon"
                width={320}
                height={320}
                priority
                className="hero-umbrella-img"
              />
            </div>
          </div>

          {/* Typography & Value Proposition */}
          <div className="hero-content">
            {/* Localized Headline */}
            <h1 className="hero-headline">
              <span className="hero-headline-primary">
                {isAr ? "تحت مظلة واحدة" : "Under One Umbrella"}
              </span>
            </h1>

            {/* Localized Subtitle / Value Proposition */}
            <p className="hero-subtitle">
              {isAr
                ? "نحول الرؤى إلى تجارب استثنائية وفعاليات ملهمة تترك أثراً لا يُنسى في المملكة وخارجها"
                : "Transforming visions into unforgettable live experiences, conferences, and brand activations across Saudi Arabia."}
            </p>

            {/* Touch-Friendly Action Buttons */}
            <div className="hero-actions">
              <Link href="/projects" className="hero-btn hero-btn--primary">
                <span>{isAr ? "استكشف مشاريعنا" : "Explore Our Work"}</span>
                <svg
                  className="hero-btn-arrow"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {isAr ? (
                    <>
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </>
                  ) : (
                    <>
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </>
                  )}
                </svg>
              </Link>

              <Link href="/contact" className="hero-btn hero-btn--secondary">
                <span>{isAr ? "تواصل معنا" : "Get In Touch"}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
