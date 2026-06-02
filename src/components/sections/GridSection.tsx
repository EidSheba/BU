"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type ImgCell  = { type: "img";  srcs: string[]; alt: string };
type TextCell = { type: "text"; label: string;  heading: string };
type Cell = ImgCell | TextCell;

const CELLS: Cell[] = [
  // Row 1 — img | text | img
  {
    type: "img", alt: "event stage",
    srcs: [
      "/images/grid-event-1.jpg",
      "/images/grid-event-2.jpg",
      "/images/grid-event-3.jpg",
      "/images/grid-event-4.jpg",
      "/images/grid-event-5.jpg",
    ],
  },
  { type: "text", label: "", heading: "STRATEGY" },
  {
    type: "img", alt: "creative",
    srcs: [
      "/images/grid-creative-1.jpg",
      "/images/grid-creative-2.jpg",
      "/images/grid-creative-3.jpg",
      "/images/grid-creative-4.jpg",
      "/images/grid-creative-5.jpg",
    ],
  },
  // Row 2 — text | img | text
  { type: "text", label: "", heading: "CREATIVE" },
  {
    type: "img", alt: "performance",
    srcs: [
      "/images/grid-perf-1.jpg",
      "/images/grid-perf-2.jpg",
      "/images/grid-perf-3.jpg",
      "/images/grid-perf-4.jpg",
      "/images/grid-perf-5.jpg",
    ],
  },
  { type: "text", label: "", heading: "EVENTS" },
  // Row 3 — img | text | img
  {
    type: "img", alt: "media",
    srcs: [
      "/images/grid-media-1.jpg",
      "/images/grid-media-2.jpg",
      "/images/grid-media-3.jpg",
      "/images/grid-media-4.jpg",
      "/images/grid-media-5.jpg",
    ],
  },
  { type: "text", label: "", heading: "MEDIA" },
  {
    type: "img", alt: "design",
    srcs: [
      "/images/grid-design-1.jpg",
      "/images/grid-design-2.jpg",
      "/images/grid-design-3.jpg",
      "/images/grid-design-4.jpg",
      "/images/grid-design-5.jpg",
    ],
  },
  // Row 4 — text | img | text
  { type: "text", label: "", heading: "CULTURE" },
  {
    type: "img", alt: "film",
    srcs: [
      "/images/grid-film-1.jpg",
      "/images/grid-film-2.jpg",
      "/images/grid-media-3.jpg",
      "/images/grid-film-3.jpg",
      "/images/grid-film-4.jpg",
    ],
  },
  { type: "text", label: "", heading: "IMPACT" },
];

export default function GridSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef    = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  // Cycle images every 500ms
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => i + 1), 500);
    return () => clearInterval(id);
  }, []);

  // Card slide-in via GSAP ScrollTrigger
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let gsap: any, ScrollTrigger: any;
    const triggers: { kill: () => void }[] = [];

    const init = async () => {
      ({ gsap }          = await import("gsap"));
      ({ ScrollTrigger } = await import("gsap/ScrollTrigger"));
      gsap.registerPlugin(ScrollTrigger);

      const wrapper = wrapperRef.current;
      const card    = cardRef.current;
      if (!wrapper || !card) return;

      const vh = window.innerHeight;
      gsap.set(card, { y: vh });

      const t = gsap.fromTo(
        card,
        { y: vh },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end:   "+=100vh",
            scrub: 2,
          },
        }
      );

      if (t.scrollTrigger) triggers.push(t.scrollTrigger);
    };

    init();
    return () => triggers.forEach((t) => t.kill());
  }, []);


  return (
    <div ref={wrapperRef} className="gs-wrapper">
      <div ref={cardRef} className="gs-card">
        <div className="gs-container">
          <div className="gs-inner">
            {CELLS.map((cell, i) =>
              cell.type === "img" ? (
                <div key={i} className="gs-cell">
                  {cell.srcs.map((src, j) => (
                    <Image
                      key={j}
                      src={src}
                      alt={cell.alt}
                      fill
                      sizes="33vw"
                      className="gs-img"
                      style={{
                        opacity: idx % cell.srcs.length === j ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div key={i} className="gs-cell gs-text-cell">
                  <h3 className="gs-heading">{cell.heading}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
