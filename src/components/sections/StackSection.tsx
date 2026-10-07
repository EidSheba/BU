"use client";

import Link from "next/link";
import styles from "./StackSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const t = {
  ar: {
    eyebrow: "عن مظلة الأعمال",
    heading: "الرؤية والرسالة",
    leftLabel: "01",
    leftBadge: "رؤيتنا",
    leftHead: "الرؤية",
    leftBody: [
      "أن نكون المرجع الأول في تصميم وتنفيذ المعارض والفعاليات، ونقود صناعة التجارب في المملكة من خلال حلول مبتكرة تخلق أثرًا حقيقيًا وتحقق قيمة مستدامة.",
    ],
    rightLabel: "02",
    rightBadge: "رسالتنا",
    rightHead: "الرسالة",
    rightBody: [
      "نقدّم في «مظلة الأعمال» حلولًا متكاملة لتخطيط وتنفيذ المعارض والفعاليات، تجمع بين الإبداع في التصميم والكفاءة في التشغيل، لنحوّل أفكار عملائنا إلى تجارب استثنائية تحقق أهدافهم وتترك أثرًا مستدامًا.",
    ],
    btn: "اعرف أكثر عنّا",
  },
  en: {
    eyebrow: "ABOUT BUSINESS UMBRELLA",
    heading: "Our Vision & Mission",
    leftLabel: "01",
    leftBadge: "VISION",
    leftHead: "Vision",
    leftBody: [
      "To be the primary reference in designing and implementing exhibitions and events, and to lead the experience industry in the Kingdom through innovative solutions that create real impact and achieve sustainable value.",
    ],
    rightLabel: "02",
    rightBadge: "MISSION",
    rightHead: "Mission",
    rightBody: [
      'At "Business Umbrella", we provide integrated solutions for planning and implementing exhibitions and events, combining creativity in design and efficiency in operation, to transform our clients\' ideas into exceptional experiences that achieve their goals and leave a sustainable impact.',
    ],
    btn: "Learn More About Us",
  },
};

export default function StackSection() {
  const lang = useLanguage();
  const c = t[lang];

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>{c.eyebrow}</span>
            <h2 className={styles.heading}>{c.heading}</h2>
          </div>

          <div className={styles.cols}>
            <div className={styles.col}>
              <div className={styles.cardTop}>
                <span className={styles.numberBadge}>{c.leftLabel}</span>
                <span className={styles.typeBadge}>{c.leftBadge}</span>
              </div>
              <h3 className={styles.colHeading}>{c.leftHead}</h3>
              <div className={styles.body}>
                {c.leftBody.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>

            <div className={styles.col}>
              <div className={styles.cardTop}>
                <span className={styles.numberBadge}>{c.rightLabel}</span>
                <span className={styles.typeBadge}>{c.rightBadge}</span>
              </div>
              <h3 className={styles.colHeading}>{c.rightHead}</h3>
              <div className={styles.body}>
                {c.rightBody.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <Link href="/about" className={styles.btn}>
              <span>{c.btn}</span>
              <svg className={styles.btnArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
