import Image from "next/image";
import styles from "./ComingExpoSection.module.css";

export default function ComingExpoSection() {
  return (
    <section className={styles.section}>
      <p className={styles.eyebrow}>Our Coming Expo</p>

      <a
        href="https://umbrella.sa/iec360/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.logoLink}
        aria-label="IEC 360 Expo"
      >
        <div className={styles.logoWrap}>
          <Image
            src="/images/IEC-logo-nav.png"
            alt="IEC 360 Expo"
            fill
            className={styles.logo}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 75vw, 60vw"
            priority
          />
        </div>
      </a>
    </section>
  );
}
