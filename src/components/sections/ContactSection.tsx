"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

const SERVICES_EN = [
  "Event Management", "Entertainment", "Event Personnel", "Crowd Management",
  "Conferences & Seminars", "Team Building", "Venue Sourcing", "Event Marketing",
  "Event Production", "Design Studio", "Event Giveaways", "Other",
];

const SERVICES_AR = [
  "إدارة الفعاليات", "الترفيه", "طاقم الفعاليات", "إدارة الحشود",
  "المؤتمرات والندوات", "بناء الفرق", "إيجاد الأماكن", "تسويق الفعاليات",
  "إنتاج الفعاليات", "استوديو التصميم", "هدايا الفعاليات", "أخرى",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export default function ContactSection() {
  const lang = useLanguage();
  const isAr = lang === "ar";

  const SERVICES = isAr ? SERVICES_AR : SERVICES_EN;

  const INITIAL_FORM: FormState = {
    name: "", email: "", phone: "",
    service: SERVICES[0],
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
    eyebrow: isAr ? "تواصل معنا" : "Get In Touch",
    heading: isAr ? "هل لديك مشروع؟\nلنحققه معاً." : "Have a project in mind?\nLet's make it happen.",
    lead: isAr
      ? "أخبرنا عن فعاليتك أو تفعيل علامتك التجارية أو حملتك — يرد فريقنا عادةً خلال يوم عمل واحد."
      : "Tell us about your event, brand activation, or campaign — our team typically responds within one business day.",
    emailLabel: isAr ? "البريد الإلكتروني" : "Email",
    phoneLabel: isAr ? "الهاتف" : "Phone",
    nameLabel:    isAr ? "الاسم الكامل"  : "Full Name",
    namePlaceholder: isAr ? "محمد أحمد"  : "John Doe",
    emailPlaceholder: isAr ? "name@company.com" : "john@company.com",
    phonePlaceholder: isAr ? "+966 5x xxx xxxx" : "+966 5x xxx xxxx",
    serviceLabel: isAr ? "الخدمة"  : "Service",
    messageLabel: isAr ? "رسالتك"  : "Message",
    messagePlaceholder: isAr ? "أخبرنا عن مشروعك..." : "Tell us about your project...",
    submitBtn: isAr ? "إرسال الرسالة" : "Send Message",
    successTitle: isAr ? "تم الإرسال" : "Message sent",
    successText:  isAr
      ? "شكراً للتواصل معنا — سيرد أحد أعضاء فريقنا قريباً."
      : "Thanks for reaching out — a member of our team will be in touch shortly.",
    successReset: isAr ? "إرسال رسالة أخرى" : "Send another message",
  };

  const headingLines = t.heading.split("\n");

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left: info ── */}
        <div className={styles.info}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            {t.eyebrow}
          </span>

          <h2 className={styles.heading}>
            {headingLines[0]}<br />{headingLines[1]}
          </h2>

          <p className={styles.lead}>{t.lead}</p>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.emailLabel}</span>
              <a href="mailto:hello@businessumbrella.com" className={styles.contactValue}>
                hello@businessumbrella.com
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>{t.phoneLabel}</span>
              <a href="tel:+966500000000" className={styles.contactValue}>+966 50 000 0000</a>
            </div>
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
                  <label htmlFor="service" className={styles.label}>{t.serviceLabel}</label>
                  <select
                    id="service" name="service"
                    value={form.service} onChange={handleChange}
                    className={styles.select}
                  >
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
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

      </div>
    </section>
  );
}
