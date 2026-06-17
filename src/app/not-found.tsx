"use client";

import Link from "next/link";
import StickyNavbar from "@/components/StickyNavbar";
import FooterSection from "@/components/sections/FooterSection";
import { useLanguage } from "@/hooks/useLanguage";
import styles from "./not-found.module.css";

export default function NotFound() {
  const lang = useLanguage();
  const isAr = lang === "ar";

  return (
    <>
      <StickyNavbar />

      <main className={styles.root} dir={isAr ? "rtl" : "ltr"}>
        {/* Background layers */}
        <div className={styles.grid} />
        <div className={styles.noise} />
        <div className={styles.scanline} />
        <div className={styles.vignette} />

        {/* Corner coordinates */}
        <span className={styles.coords}>24°41′N 46°43′E</span>
        <span className={`${styles.coords} ${styles.coordsRight}`}>
          {isAr ? "أعمال المظلة" : "BUSINESS UMBRELLA"}
        </span>

        <div className={styles.content}>
          {/* Eyebrow */}
          <div className={styles.eyebrow}>
            <span className={styles.dot} />
            {isAr ? "خطأ · الصفحة غير موجودة" : "ERROR · PAGE NOT FOUND"}
          </div>

          {/* Giant glitching number */}
          <span className={styles.number}>404</span>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Heading */}
          <h1 className={styles.heading}>
            {isAr ? "ضاعت في الفراغ." : "Lost in the void."}
          </h1>

          {/* Subtitle */}
          <p className={styles.sub}>
            {isAr
              ? "هذه الصفحة اختفت أو لم تعد موجودة — لكننا لا نزال هنا."
              : "This page has vanished into thin air — but we're still here."}
          </p>

          {/* CTA */}
          <Link href="/" className={styles.btn}>
            <span className={styles.btnText}>
              {isAr ? "العودة للرئيسية" : "Back to Home"}
            </span>
            <span className={styles.btnArrow}>{isAr ? "←" : "→"}</span>
          </Link>
        </div>
      </main>

      <FooterSection />
    </>
  );
}
