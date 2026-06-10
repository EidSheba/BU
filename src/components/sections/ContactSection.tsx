"use client";

import { useState } from "react";
import styles from "./ContactSection.module.css";

const SERVICES = [
  "Event Management",
  "Entertainment",
  "Event Personnel",
  "Crowd Management",
  "Conferences & Seminars",
  "Team Building",
  "Venue Sourcing",
  "Event Marketing",
  "Event Production",
  "Design Studio",
  "Event Giveaways",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  phone: "",
  service: SERVICES[0],
  message: "",
};

export default function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setForm(INITIAL_FORM);
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* ── Left: info ── */}
        <div className={styles.info}>
          <span className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            Get In Touch
          </span>

          <h2 className={styles.heading}>
            Have a project in mind?
            <br />
            Let&apos;s make it happen.
          </h2>

          <p className={styles.lead}>
            Tell us about your event, brand activation, or campaign — our
            team typically responds within one business day.
          </p>

          <div className={styles.contactList}>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Email</span>
              <a href="mailto:hello@businessumbrella.com" className={styles.contactValue}>
                hello@businessumbrella.com
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Phone</span>
              <a href="tel:+966500000000" className={styles.contactValue}>
                +966 50 000 0000
              </a>
            </div>
          </div>
        </div>

        {/* ── Right: form ── */}
        <div className={styles.formWrap}>
          {submitted ? (
            <div className={styles.success}>
              <span className={styles.successIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#02E682" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className={styles.successTitle}>Message sent</h3>
              <p className={styles.successText}>
                Thanks for reaching out — a member of our team will be in
                touch shortly.
              </p>
              <button
                type="button"
                className={styles.successReset}
                onClick={() => setSubmitted(false)}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="name" className={styles.label}>Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="email" className={styles.label}>Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label htmlFor="phone" className={styles.label}>Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+966 5x xxx xxxx"
                    className={styles.input}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="service" className={styles.label}>Service</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="message" className={styles.label}>Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  className={styles.textarea}
                />
              </div>

              <button type="submit" className={styles.submit}>
                Send Message
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
