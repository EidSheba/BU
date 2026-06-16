"use client";

import { useLanguage } from "@/hooks/useLanguage";
import styles from "./WhatsAppButton.module.css";

const PHONE = "966541164491";

const MESSAGE = {
  en: "Hello, I'd like to know more about Business Umbrella's services.",
  ar: "مرحباً، أرغب في معرفة المزيد عن خدمات بيزنس أمبريلا.",
};

export default function WhatsAppButton() {
  const lang = useLanguage();
  const href = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE[lang])}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.button}
      aria-label={lang === "ar" ? "تواصل معنا على واتساب" : "Chat with us on WhatsApp"}
    >
      <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
        <path d="M19.05 4.91A9.816 9.816 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.78 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.89-7.01zm-7.01 15.24c-1.5 0-2.97-.4-4.25-1.16l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.24 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.81-.78.97-.14.17-.29.19-.53.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.14-.24-.02-.38.11-.51.12-.12.27-.31.41-.47.14-.15.18-.26.27-.43.09-.18.04-.33-.04-.46-.08-.13-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53-.18-.01-.39-.01-.6-.01-.21 0-.55.08-.84.39-.29.31-1.1 1.07-1.1 2.62 0 1.54 1.12 3.03 1.28 3.24.16.21 2.15 3.28 5.21 4.47 2.58 1.01 3.1.81 3.66.76.56-.05 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.08-.13-.25-.21-.5-.33z" />
      </svg>
    </a>
  );
}
