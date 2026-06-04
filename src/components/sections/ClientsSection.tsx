"use client";

import Image from "next/image";
import styles from "./ClientsSection.module.css";

const LOGOS = [
  { src: "/images/suadia.png",   alt: "Saudi Arabia" },
  { src: "/images/uk.png",       alt: "United Kingdom" },
  { src: "/images/sa.svg",       alt: "SA" },
  { src: "/images/uk.svg",       alt: "UK" },
  { src: "/images/bu_logo_4.png", alt: "Business Umbrella" },
  { src: "/images/suadia.png",   alt: "Saudi Arabia" },
  { src: "/images/uk.png",       alt: "United Kingdom" },
  { src: "/images/sa.svg",       alt: "SA" },
  { src: "/images/uk.svg",       alt: "UK" },
  { src: "/images/bu_logo_4.png", alt: "Business Umbrella" },
];

export default function ClientsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>OUR CLIENTS</h2>
      </div>

      <div className={styles.track} aria-label="Client logos">
        {/* duplicate for seamless loop */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.list} aria-hidden={copy === 1 ? "true" : undefined}>
            {LOGOS.map((logo, i) => (
              <li key={i} className={styles.item}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={70}
                  className={styles.logo}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
