"use client";

import Image from "next/image";
import styles from "./ClientsSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const LOGOS = [
  { src: "/images/clients/1.png", alt: "National Events Center" },
  { src: "/images/clients/2.png", alt: "Riyadh Season 2022" },
  { src: "/images/clients/3.png", alt: "Boulevard World" },
  { src: "/images/clients/4.png", alt: "Sela" },
  { src: "/images/clients/5.png", alt: "Mada" },
  { src: "/images/clients/6.png", alt: "International E-Commerce Expo" },
  { src: "/images/clients/7.png", alt: "Thiqah" },
  { src: "/images/clients/8.png", alt: "Riyadh Season" },
  { src: "/images/clients/9.png", alt: "Mawsim" },
  { src: "/images/clients/10.png", alt: "Camel Club" },
  { src: "/images/clients/11.png", alt: "World Women Games" },
  { src: "/images/clients/12.png", alt: "Rice Bull Riding Co." },
  { src: "/images/clients/13.png", alt: "Supercoppa" },
  { src: "/images/clients/14.png", alt: "Hajj Hackathon" },
  { src: "/images/clients/15.png", alt: "Saudi Chess Championship" },
  { src: "/images/clients/16.png", alt: "Arena" },
  { src: "/images/clients/17.png", alt: "WWE" },
  { src: "/images/clients/18.png", alt: "HQWS" },
  { src: "/images/clients/19.png", alt: "Brooke House College Riyadh" },
];

export default function ClientsSection() {
  const lang = useLanguage();
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{lang === "ar" ? "عملاؤنا" : "OUR CLIENTS"}</h2>
      </div>

      <div className={styles.track} aria-label="Client logos">
        {/* duplicate for seamless loop */}
        {[0, 1].map((copy) => (
          <ul key={copy} className={styles.list} aria-hidden={copy === 1}>
            {LOGOS.map((logo, i) => (
              <li key={i} className={styles.item}>
                <Image
                  src={logo.src}
                  alt={copy === 1 ? "" : logo.alt}
                  fill
                  sizes="180px"
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
