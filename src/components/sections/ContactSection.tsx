"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
};

export default function ContactSection() {
  const lang = useLanguage();
  const isAr = lang === "ar";

  const INITIAL_FORM: FormState = {
    name: "", email: "", phone: "", company: "",
    message: "",
  };

  const [form, setForm]           = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  }

  const t = {
    openMap: isAr ? "افتح في خرائط جوجل" : "Open in Google Maps",
    locationLabel: isAr ? "الموقع" : "Location",
    location: isAr
      ? "الدور الثاني، مبنى الحمراء سيتي، الرياض 13225، المملكة العربية السعودية"
      : "2nd Floor, Al Hamra City Building, Riyadh, SU 13225, Saudi Arabia",
    emailLabel: isAr ? "البريد الإلكتروني" : "Email",
    phoneLabel: isAr ? "الهاتف" : "Phone",
    nameLabel:    isAr ? "الاسم الكامل"  : "Full Name",
    namePlaceholder: isAr ? "محمد أحمد"  : "John Doe",
    emailPlaceholder: isAr ? "name@company.com" : "john@company.com",
    companyLabel: isAr ? "الشركة" : "Company",
    companyPlaceholder: isAr ? "اسم شركتك" : "Your company name",
    phonePlaceholder: isAr ? "+966 5x xxx xxxx" : "+966 5x xxx xxxx",
    messageLabel: isAr ? "رسالتك"  : "Message",
    messagePlaceholder: isAr ? "أخبرنا عن مشروعك..." : "Tell us about your project...",
    submitBtn: isAr ? "إرسال الرسالة" : "Send Message",
    successTitle: isAr ? "تم الإرسال" : "Message sent",
    successText:  isAr
      ? "شكراً للتواصل معنا — سيرد أحد أعضاء فريقنا قريباً."
      : "Thanks for reaching out — a member of our team will be in touch shortly.",
    successReset: isAr ? "إرسال رسالة أخرى" : "Send another message",
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left: info ── */}
        <div className={styles.info}>
          <div className={styles.map}>
            <iframe
              title={t.locationLabel}
              src="https://maps.google.com/maps?q=24.7850202,46.7906779&z=16&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <a
              href="https://maps.app.goo.gl/Sp6fKuhKxevjfxWFA"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}
            >
              {t.openMap}
              <span className={styles.mapBtnArrow} aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className={styles.formWrap}>
          {submitted ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#057a02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className={styles.successTitle}>{t.successTitle}</h3>
              <p className={styles.successText}>{t.successText}</p>
              <button type="button" className={styles.successReset} onClick={() => setSubmitted(false)}>
                {t.successReset}
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>{t.nameLabel}</label>
                  <input
                    id="name" name="name" type="text" required
                    value={form.name} onChange={handleChange}
                    placeholder={t.namePlaceholder} className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>{t.emailLabel}</label>
                  <input
                    id="email" name="email" type="email" required
                    value={form.email} onChange={handleChange}
                    placeholder={t.emailPlaceholder} className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>{t.phoneLabel}</label>
                  <input
                    id="phone" name="phone" type="tel"
                    value={form.phone} onChange={handleChange}
                    placeholder={t.phonePlaceholder} className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="company" className={styles.label}>{t.companyLabel}</label>
                  <input
                    id="company" name="company" type="text"
                    value={form.company} onChange={handleChange}
                    placeholder={t.companyPlaceholder} className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>{t.messageLabel}</label>
                <textarea
                  id="message" name="message" rows={5} required
                  value={form.message} onChange={handleChange}
                  placeholder={t.messagePlaceholder} className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submit}>
                {t.submitBtn}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
          )}
        </div>


        {/* ── Bottom: contact cards ── */}
        <div className={styles.contactList}>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{t.locationLabel}</span>
            <span className={styles.contactValue}>{t.location}</span>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{t.phoneLabel}</span>
            <a href="tel:+966112666627" dir="ltr" className={styles.contactValue}>+966 11 266 6627</a>
          </div>
          <div className={styles.contactItem}>
            <span className={styles.contactLabel}>{t.emailLabel}</span>
            <a href="mailto:hello@umbrella.sa" className={styles.contactValue}>
              hello@umbrella.sa
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
