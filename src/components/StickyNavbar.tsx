"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

type Lang = "en" | "ar";

const navItems = {
  en: ["HOME", "ABOUT", "SERVICES", "PROJECTS", "CAREER", "CONTACT"],
  ar: ["الرئيسية", "من نحن", "خدماتنا", "مشاريعنا", "وظائف", "تواصل معنا"],
};

export default function StickyNavbar() {
  const [visible, setVisible] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const scrollingUp = currentY < lastScrollY.current;

      if (scrollingUp && currentY > 60) {
        setVisible(true);
      } else if (!scrollingUp) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const items = navItems[lang];
  const isAr = lang === "ar";

  return (
    <>
      {menuOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}
        aria-label="Navigation menu"
      >
        <button
          type="button"
          className="sidebar-close"
          aria-label={isAr ? "إغلاق القائمة" : "Close menu"}
          onClick={() => setMenuOpen(false)}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <line x1="2" y1="2" x2="18" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="18" y1="2" x2="2" y2="18" stroke="white" strokeWidth="2" strokeLinecap="round" />
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

      <header className={`sticky-nav${visible ? " sticky-nav--visible" : ""}`}>
        <div className="sticky-nav-inner">
          <div className="hero-logo">
            <Image
              src="/images/bu_logo_4.png"
              alt="Business Umbrella logo"
              width={160}
              height={52}
              className="hero-logo-img"
            />
          </div>

          <div className="hero-nav-right">
            <button
              type="button"
              className="hero-lang"
              aria-label={isAr ? "Switch to English" : "Switch to Arabic"}
              onClick={() => setLang(isAr ? "en" : "ar")}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={isAr ? "/images/uk.svg" : "/images/sa.svg"}
                alt={isAr ? "England flag" : "Saudi Arabia flag"}
                className={isAr ? "hero-flag-img hero-flag-img--uk" : "hero-flag-img"}
              />
              <span className="hero-lang-text">{isAr ? "EN" : "AR"}</span>
            </button>

            <button
              type="button"
              className="hero-hamburger"
              aria-label={isAr ? "فتح القائمة" : "Open menu"}
              onClick={() => setMenuOpen(true)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
