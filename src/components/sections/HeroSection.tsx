"use client";

import { useState, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

type Lang = "en" | "ar";

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
  },
};

export default function HeroSection() {
  const [lang, setLang] = useState<Lang>("en");
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const update = () => {
      const { dir } = document.documentElement;
      setLang(dir === "rtl" ? "ar" : "en");
    };
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
    return () => observer.disconnect();
  }, []);

  const t = content[lang];

  return (
    <>
      <LoadingScreen ready={videoReady} />

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
