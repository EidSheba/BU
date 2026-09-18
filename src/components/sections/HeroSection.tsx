"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";
import { useLang } from "@/contexts/LangContext";

export default function HeroSection() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Particle field — drifts, links nearby dots, pushed away by cursor/touch */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let w = 0, h = 0, raf = 0;
    let dots: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Adapt dot density: fewer on mobile (35-45) for performance and cleaner look
      const isMobile = w < 640;
      const count = isMobile
        ? Math.min(Math.round((w * h) / 16000), 45)
        : Math.min(Math.round((w * h) / 9500), 130);

      dots = Array.from({ length: Math.max(count, 25) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      const LINK = w < 640 ? 95 : 120;
      const REPEL = w < 640 ? 90 : 135;

      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL && dist > 0) {
          const f = (1 - dist / REPEL) * 1.2;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        d.vx *= 0.985;
        d.vy *= 0.985;
        d.vx += (Math.random() - 0.5) * 0.05;
        d.vy += (Math.random() - 0.5) * 0.05;
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > w) { d.vx *= -1; d.x = Math.max(0, Math.min(w, d.x)); }
        if (d.y < 0 || d.y > h) { d.vy *= -1; d.y = Math.max(0, Math.min(h, d.y)); }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${(1 - dist / LINK) * 0.32})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = "#4ade80";
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const r = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - r.left;
        mouse.y = e.touches[0].clientY - r.top;
      }
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onResize = () => { resize(); if (reduced) frame(); };

    resize();
    frame();
    setReady(true);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onLeave);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onLeave);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <LoadingScreen ready={ready} />

      <section className="hero-section" id="hero">
        {/* Interactive glowing particle field */}
        <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />

        {/* Ambient Dark Luxury Glows */}
        <div className="hero-radial-glow hero-radial-glow--center" aria-hidden="true" />
        <div className="hero-radial-glow hero-radial-glow--bottom" aria-hidden="true" />

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
            {/* Eyebrow badge */}
            <div className="hero-eyebrow">
              <span className="hero-eyebrow-dot" />
              <span>
                {isAr
                  ? "بيزنس أمبريلا • لإدارة الفعاليات"
                  : "BUSINESS UMBRELLA • CREATIVE AGENCY"}
              </span>
            </div>

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

        {/* Desktop Scroll Indicator */}
        <a
          href="#coming-expo"
          className="hero-scroll-wrap"
          aria-label={isAr ? "انتقل إلى القسم التالي" : "Scroll to next section"}
        >
          <span className="hero-scroll-text">{isAr ? "مرر للأسفل" : "SCROLL"}</span>
          <div className="hero-scroll-track">
            <div className="hero-scroll-dot" />
          </div>
        </a>
      </section>
    </>
  );
}
