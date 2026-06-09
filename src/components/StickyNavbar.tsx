"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

type Lang = "en" | "ar";

const navItems = {
  en: ["HOME", "ABOUT", "SERVICES", "PROJECTS", "CAREER", "CONTACT"],
  ar: ["الرئيسية", "من نحن", "خدماتنا", "مشاريعنا", "وظائف", "تواصل معنا"],
};

const navRoutes: Record<string, string> = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PROJECTS: "/projects",
  "الرئيسية": "/",
  "من نحن": "/about",
  "خدماتنا": "/services",
  "مشاريعنا": "/projects",
};

export default function StickyNavbar() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);

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
          {items.map((item, i) => {
            const href = navRoutes[item] ?? null;
            return (
              <button
                key={item}
                type="button"
                className={`sidebar-link sidebar-link--${i + 1}`}
                onClick={() => {
                  setMenuOpen(false);
                  if (href) router.push(href);
                }}
              >
                {item}
              </button>
            );
          })}
        </nav>
      </aside>

      <header className="sticky-nav sticky-nav--visible">
        <div className="sticky-nav-inner">
          <Link href="/" className="hero-logo">
            <Image
              src="/images/bu_logo_4.png"
              alt="Business Umbrella logo"
              width={160}
              height={52}
              className="hero-logo-img"
            />
          </Link>

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
