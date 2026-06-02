"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

type Lang = "en" | "ar";

const navItems = {
  en: ["HOME", "ABOUT", "SERVICES", "PROJECTS", "CAREER", "CONTACT"],
  ar: ["الرئيسية", "من نحن", "خدماتنا", "مشاريعنا", "وظائف", "تواصل معنا"],
};

const content = {
  en: {
    headline: (
      <>
        creative experiential
        <br />
        powerhouse
      </>
    ),
    showreel: "WATCH OUR SHOWREEL",
    menuLabel: "Open menu",
    closeLabel: "Close menu",
    switchLabel: "Switch to Arabic",
    switchCode: "AR",
    switchFlag: "/images/sa.svg",
    switchFlagAlt: "Saudi Arabia flag",
    switchFlagClass: "hero-flag-img",
  },
  ar: {
    headline: (
      <>
        قوة إبداعية استثنائية
        <br />
        لا مثيل لها
      </>
    ),
    showreel: "شاهد شريل أعمالنا",
    menuLabel: "فتح القائمة",
    closeLabel: "إغلاق القائمة",
    switchLabel: "Switch to English",
    switchCode: "EN",
    switchFlag: "/images/uk.svg",
    switchFlagAlt: "England flag",
    switchFlagClass: "hero-flag-img hero-flag-img--uk",
  },
};

export default function HeroSection() {
  const [lang, setLang] = useState<Lang>("en");
  const [videoReady, setVideoReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  // close menu on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const t = content[lang];
  const items = navItems[lang];

  return (
    <>
      <LoadingScreen ready={videoReady} />

      {/* ── Sidebar overlay ── */}
      {menuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}
        aria-label="Navigation menu"
      >
        <button
          type="button"
          className="sidebar-close"
          aria-label={t.closeLabel}
          onClick={() => setMenuOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line
              x1="2"
              y1="2"
              x2="18"
              y2="18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <line
              x1="18"
              y1="2"
              x2="2"
              y2="18"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <nav className="sidebar-nav">
          {items.map((item, i) => (
            <a
              key={item}
              href="#"
              className="sidebar-link"
              style={{ animationDelay: `${i * 60}ms` }}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </nav>
      </aside>

      <section className="hero-section">
        {/* ── Cinematic video background ── */}
        <div className="hero-bg">
          <video
            className={`hero-video${videoReady ? " hero-video--ready" : ""}`}
            src="/videos/backgroundVideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
          />
          <div className="hero-overlay" />
          <div className="hero-glow" />
        </div>

        {/* ── Navbar ── */}
        <nav className="hero-nav">
          <div className="hero-logo">
            <Image
              src="/images/bu_logo_4.png"
              alt="Business Umbrella logo"
              width={160}
              height={52}
              priority
              className="hero-logo-img"
            />
          </div>

          <div className="hero-nav-right">
            {/* Language switcher */}
            <button
              type="button"
              className="hero-lang"
              aria-label={t.switchLabel}
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.switchFlag}
                alt={t.switchFlagAlt}
                className={t.switchFlagClass}
              />
              <span className="hero-lang-text">{t.switchCode}</span>
            </button>

            {/* Hamburger */}
            <button
              type="button"
              className="hero-hamburger"
              aria-label={t.menuLabel}
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>

        {/* ── Centre headline ── */}
        <div className="hero-content">
          <h1 className="hero-headline">{t.headline}</h1>
        </div>

        {/* ── Bottom CTA ── */}
        <div className="hero-cta">
          <button className="hero-showreel">
            <span className="hero-showreel-icon"></span>
            <span>{t.showreel}</span>
          </button>
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}
