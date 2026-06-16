"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

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
  CONTACT: "/contact",
  "الرئيسية": "/",
  "من نحن": "/about",
  "خدماتنا": "/services",
  "مشاريعنا": "/projects",
  "تواصل معنا": "/contact",
};

const LANG_STORAGE_KEY = "bu-lang";

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANG_STORAGE_KEY) as Lang | null;
  if (stored === "ar" || stored === "en") return stored;
  return document.documentElement.dir === "rtl" ? "ar" : "en";
}

export default function StickyNavbar() {
  const router = useRouter();
  const [lang, setLang] = useState<Lang>("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(getInitialLang());
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

    // Flipping dir swaps which side the closed sidebar sits off-screen on
    // (translateX(110%) <-> translateX(-110%)). Without this, the CSS
    // transition animates that sign flip, sliding it across the viewport.
    const el = sidebarRef.current;
    if (el) {
      el.style.transition = "none";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "";
        });
      });
    }
  }, [lang]);

  const changeLang = (next: Lang) => {
    setLang(next);
    window.localStorage.setItem(LANG_STORAGE_KEY, next);
  };

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
        ref={sidebarRef}
        className={`sidebar ${menuOpen ? "sidebar--open" : ""}`}
        aria-label="Navigation menu"
      >
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
              onClick={() => changeLang(isAr ? "en" : "ar")}
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
              aria-label={
                menuOpen
                  ? (isAr ? "إغلاق القائمة" : "Close menu")
                  : (isAr ? "فتح القائمة" : "Open menu")
              }
              onClick={() => setMenuOpen((open) => !open)}
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
