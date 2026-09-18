"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import LoadingScreen from "@/components/LoadingScreen";

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Particle field — drifts, links nearby dots, pushed away by the cursor */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    const LINK = 120;
    const REPEL = 140;
    let w = 0, h = 0, raf = 0;
    let dots: { x: number; y: number; vx: number; vy: number }[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(Math.round((w * h) / 9000), 160);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x, dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REPEL && dist > 0) {
          const f = (1 - dist / REPEL) * 1.2;
          d.vx += (dx / dist) * f;
          d.vy += (dy / dist) * f;
        }
        // ponytail: damped random walk — light damping + steady noise keeps every
        // dot wandering forever instead of settling; bump noise if it reads too calm.
        d.vx *= 0.985; d.vy *= 0.985;
        d.vx += (Math.random() - 0.5) * 0.06;
        d.vy += (Math.random() - 0.5) * 0.06;
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) { d.vx *= -1; d.x = Math.max(0, Math.min(w, d.x)); }
        if (d.y < 0 || d.y > h) { d.vy *= -1; d.y = Math.max(0, Math.min(h, d.y)); }
      }
      // ponytail: O(n²) link pass, fine for ≤160 dots; grid-bucket it if the count grows
      ctx.lineWidth = 1;
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const a = dots[i], b = dots[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK) {
            ctx.strokeStyle = `rgba(74, 222, 128, ${(1 - dist / LINK) * 0.35})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      ctx.fillStyle = "#4ade80";
      for (const d of dots) {
        ctx.beginPath(); ctx.arc(d.x, d.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      if (!reduced) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const onResize = () => { resize(); if (reduced) frame(); };

    resize();
    frame();
    setReady(true);
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <LoadingScreen ready={ready} />

      <section className="hero-section">
        {/* ── Interactive particle & image background ── */}
        <div className="hero-bg">
          <Image
            src="/images/1umbrella.png"
            alt="Business Umbrella - Under One Umbrella"
            fill
            priority
            sizes="100vw"
            className="hero-bg-img"
          />
          <canvas ref={canvasRef} className="hero-particles" aria-hidden="true" />
        </div>

        {/* ── Bottom CTA ── */}
        <div className="hero-cta">
          <div className="hero-scroll-line" />
        </div>
      </section>
    </>
  );
}
