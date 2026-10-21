"use client";

import { useId, useRef, useState } from "react";
import styles from "./QuoteFormSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

/* ── Option keys (language-independent, so switching language keeps selections) ── */

/* ── Translation ────────────────────────────────────────────────── */
const t = {
  en: {
    steps: ["Details", "Contact"],
    stepOf: (a: number, b: number) => `Step ${a} of ${b}`,

    /* step 2 */
    eventName:      "Exhibition / Event Name",
    phEventName:    "e.g. LEAP 2027, Saudi Food Show …",
    city:           "City",
    phCity:         "e.g. Riyadh, Jeddah …",
    venue:          "Venue",
    phVenue:        "e.g. Riyadh Front Exhibition Centre",
    startDate:      "Start Date",
    endDate:        "End Date",
    visitors:       "Expected Attendance",
    phVisitors:     "e.g. 500",
    brief:          "Project Brief",
    phBrief:        "Describe your objectives, target audience, key requirements and any ideas or references you have in mind.",

    /* step 3 */
    budget:         "Estimated Budget (SAR)",
    phBudget:       "e.g. 250000",

    /* step 4 */
    fullName:       "Full Name",
    phFullName:     "Your full name",
    company:        "Company",
    phCompany:      "Company / organisation name",
    jobTitle:       "Job Title",
    phJobTitle:     "e.g. Marketing Manager",
    email:          "Business Email",
    phEmail:        "name@company.com",
    phone:          "Phone",
    phPhone:        "+966 5X XXX XXXX",

    /* step 5 */
    consent:        "I agree that Business Umbrella may contact me regarding this request and process the information I provided.",

    /* nav */
    back:           "Back",
    next:           "Continue",
    submit:         "Submit Request",
    selectDefault:  "Select …",
    errorRequired:  "Please complete the highlighted fields.",
    errorDates:     "End date can't be before the start date.",

    /* aside */
    asideHelp:      "Prefer to talk?",
    asideCall:      "Contact us",

    /* success */
    successTitle:   "Request received!",
    successSub:     "Thank you. A member of our team will contact you within one business day to discuss your project.",
    successRef:     "Reference number",
    successBack:    "Submit Another Request",
  },
  ar: {
    steps: ["التفاصيل", "التواصل"],
    stepOf: (a: number, b: number) => `الخطوة ${a} من ${b}`,

    eventName:      "اسم المعرض / الفعالية",
    phEventName:    "مثال: ليب 2027، معرض الغذاء السعودي …",
    city:           "المدينة",
    phCity:         "مثال: الرياض، جدة …",
    venue:          "مكان الإقامة",
    phVenue:        "مثال: مركز الرياض للمعارض",
    startDate:      "تاريخ البداية",
    endDate:        "تاريخ النهاية",
    visitors:       "عدد الحضور المتوقع",
    phVisitors:     "مثال: 500",
    brief:          "وصف المشروع",
    phBrief:        "صف أهدافك، الجمهور المستهدف، المتطلبات الأساسية وأي أفكار أو مراجع لديك.",

    budget:         "الميزانية التقديرية (ريال سعودي)",
    phBudget:       "مثال: 250000",

    fullName:       "الاسم الكامل",
    phFullName:     "اسمك الكامل",
    company:        "الشركة",
    phCompany:      "اسم الشركة / الجهة",
    jobTitle:       "المسمى الوظيفي",
    phJobTitle:     "مثال: مدير التسويق",
    email:          "البريد الإلكتروني للعمل",
    phEmail:        "name@company.com",
    phone:          "رقم الجوال",
    phPhone:        "+966 5X XXX XXXX",

    consent:        "أوافق على أن تتواصل معي بيزنس أمبريلا بخصوص هذا الطلب وأن تعالج المعلومات التي قدمتها.",

    back:           "رجوع",
    next:           "متابعة",
    submit:         "إرسال الطلب",
    selectDefault:  "اختر …",
    errorRequired:  "يرجى إكمال الحقول المحددة.",
    errorDates:     "لا يمكن أن يكون تاريخ النهاية قبل تاريخ البداية.",

    asideHelp:      "تفضّل التحدث معنا؟",
    asideCall:      "تواصل معنا",

    successTitle:   "تم استلام طلبك!",
    successSub:     "شكراً لك. سيتواصل معك أحد أعضاء فريقنا خلال يوم عمل واحد لمناقشة مشروعك.",
    successRef:     "الرقم المرجعي",
    successBack:    "إرسال طلب آخر",
  },
};

/* ── Form state ─────────────────────────────────────────────────── */
type QuoteForm = {
  eventName: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
  visitors: string;
  brief: string;
  budget: string;
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  consent: boolean;
};

const EMPTY_FORM: QuoteForm = {
  eventName: "", city: "", venue: "", startDate: "", endDate: "", visitors: "",
  brief: "",
  budget: "",
  fullName: "", company: "", jobTitle: "", email: "", phone: "",
  consent: false,
};

const TOTAL_STEPS = 2;

/* ── Sub-components ─────────────────────────────────────────────── */
function Field({
  label, required, children, className,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`${styles.field} ${className ?? ""}`}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </span>
      {children}
    </label>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function QuoteFormSection() {
  const lang = useLanguage();
  const c = t[lang];
  const uid = useId();

  const [form, setForm] = useState<QuoteForm>(EMPTY_FORM);
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [refNo, setRefNo] = useState("");
  const [today] = useState(() => new Date().toISOString().slice(0, 10));

  const sectionRef = useRef<HTMLElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof QuoteForm>(key: K, val: QuoteForm[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  const scrollToTop = () =>
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  /* Validate the fields rendered in the current step */
  function validateStep(): boolean {
    const el = stepRef.current;
    if (!el) return true;

    const firstInvalid = el.querySelector<HTMLElement>(":invalid");
    if (firstInvalid) {
      setShowErrors(true);
      setError(c.errorRequired);
      firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid.focus({ preventScroll: true });
      return false;
    }
    if (step === 0 && form.startDate && form.endDate && form.endDate < form.startDate) {
      setShowErrors(true);
      setError(c.errorDates);
      return false;
    }
    setShowErrors(false);
    setError("");
    return true;
  }

  function goTo(i: number) {
    setStep(i);
    setShowErrors(false);
    setError("");
    scrollToTop();
  }

  function next() {
    if (validateStep()) goTo(step + 1);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (step < TOTAL_STEPS - 1) {
      next();
      return;
    }
    if (!validateStep()) return;
    // eslint-disable-next-line react-hooks/purity -- runs only inside this submit handler, never during render
    const stamp = Math.random().toString(36).toUpperCase().slice(2, 7);
    setRefNo(`BU-Q-${stamp}`);
    scrollToTop();
  }

  function reset() {
    setForm(EMPTY_FORM);
    setStep(0);
    setRefNo("");
    setShowErrors(false);
    setError("");
  }

  /* ── Success ── */
  if (refNo) {
    return (
      <section ref={sectionRef} className={styles.section}>
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 14l7 7L23 7" stroke="#057a02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>{c.successTitle}</h2>
          <p className={styles.successSub}>{c.successSub}</p>
          <div className={styles.successRef}>
            <span>{c.successRef}</span>
            <strong dir="ltr">{refNo}</strong>
          </div>
          <button type="button" className={styles.ghostBtn} onClick={reset}>
            {c.successBack}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="quote-form" className={styles.section}>
      <div className={`${styles.layout} ${styles.layoutSingle}`}>
        {/* ── Main card ── */}
        <div className={styles.card}>
          {/* Stepper */}
          <ol className={styles.stepper} aria-label={c.stepOf(step + 1, TOTAL_STEPS)}>
            {c.steps.map((s, i) => (
              <li
                key={s}
                className={`${styles.stepItem} ${i === step ? styles.stepActive : ""} ${i < step ? styles.stepDone : ""}`}
                aria-current={i === step ? "step" : undefined}
              >
                <button
                  type="button"
                  className={styles.stepBtn}
                  disabled={i >= step}
                  onClick={() => goTo(i)}
                >
                  <span className={styles.stepNum}>
                    {i < step ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M2.5 6.2l2.3 2.3L9.5 3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : i + 1}
                  </span>
                  <span className={styles.stepLabel}>{s}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className={styles.progress}>
            <span style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }} />
          </div>
          <p className={styles.stepCounter}>{c.stepOf(step + 1, TOTAL_STEPS)}</p>

          <form
            className={`${styles.form} ${showErrors ? styles.showErrors : ""}`}
            onSubmit={handleSubmit}
            noValidate
          >
            <div ref={stepRef} key={step} className={styles.stepBody}>

              {/* ── Step 1: Details ── */}
              {step === 0 && (
                <>
                  <div className={styles.grid2}>
                    <Field label={c.eventName} required className={styles.colSpan2}>
                      <input className={styles.input} type="text" placeholder={c.phEventName}
                        value={form.eventName} onChange={(e) => set("eventName", e.target.value)} required />
                    </Field>
                    <Field label={c.city} required>
                      <input className={styles.input} type="text" placeholder={c.phCity}
                        value={form.city} onChange={(e) => set("city", e.target.value)} required />
                    </Field>
                    <Field label={c.venue} required>
                      <input className={styles.input} type="text" placeholder={c.phVenue}
                        value={form.venue} onChange={(e) => set("venue", e.target.value)} required />
                    </Field>
                    <Field label={c.startDate} required>
                      <input className={styles.input} type="date" min={today || undefined}
                        value={form.startDate} onChange={(e) => set("startDate", e.target.value)} required />
                    </Field>
                    <Field label={c.endDate} required>
                      <input className={styles.input} type="date" min={form.startDate || today || undefined}
                        value={form.endDate} onChange={(e) => set("endDate", e.target.value)} required />
                    </Field>
                    <Field label={c.visitors} required className={styles.colSpan2}>
                      <input className={styles.input} type="number" min={1} inputMode="numeric"
                        placeholder={c.phVisitors} value={form.visitors}
                        onChange={(e) => set("visitors", e.target.value)} required />
                    </Field>
                  </div>

                  <Field label={c.brief} required>
                    <textarea className={styles.textarea} rows={5} placeholder={c.phBrief}
                      value={form.brief} onChange={(e) => set("brief", e.target.value)} required />
                  </Field>

                  <Field label={c.budget} required>
                    <input className={styles.input} type="number" min={1} inputMode="numeric"
                      placeholder={c.phBudget} value={form.budget}
                      onChange={(e) => set("budget", e.target.value)} required />
                  </Field>
                </>
              )}

              {/* ── Step 2: Contact ── */}
              {step === 1 && (
                <>
                  <div className={styles.grid2}>
                    <Field label={c.fullName} required>
                      <input className={styles.input} type="text" autoComplete="name" placeholder={c.phFullName}
                        value={form.fullName} onChange={(e) => set("fullName", e.target.value)} required />
                    </Field>
                    <Field label={c.company} required>
                      <input className={styles.input} type="text" autoComplete="organization" placeholder={c.phCompany}
                        value={form.company} onChange={(e) => set("company", e.target.value)} required />
                    </Field>
                    <Field label={c.jobTitle} required>
                      <input className={styles.input} type="text" autoComplete="organization-title" placeholder={c.phJobTitle}
                        value={form.jobTitle} onChange={(e) => set("jobTitle", e.target.value)} required />
                    </Field>
                    <Field label={c.email} required>
                      <input className={styles.input} type="email" autoComplete="email" dir="ltr" placeholder={c.phEmail}
                        value={form.email} onChange={(e) => set("email", e.target.value)} required />
                    </Field>
                    <Field label={c.phone} required className={styles.colSpan2}>
                      <input className={styles.input} type="tel" autoComplete="tel" dir="ltr" placeholder={c.phPhone}
                        pattern="[+0-9\s\-\(\)]{7,}" value={form.phone}
                        onChange={(e) => set("phone", e.target.value)} required />
                    </Field>
                  </div>

                  <label className={styles.consent}>
                    <input type="checkbox" checked={form.consent}
                      onChange={(e) => set("consent", e.target.checked)} required />
                    <span>{c.consent}</span>
                  </label>
                </>
              )}
            </div>

            {error && <p className={styles.errorMsg} role="alert">{error}</p>}

            {/* Nav */}
            <div className={styles.navRow}>
              <div className={styles.navEnd}>
                <button type="submit" className={styles.primaryBtn}>
                  {step === TOTAL_STEPS - 1 ? c.submit : c.next}
                  <svg className={styles.flip} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <a href="/contact" className={styles.helpInline}>
                  <span className={styles.helpIcon}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 5c0 8.284 6.716 15 15 15l1-4-5-2-2 2c-2.5-1-4-2.5-5-5l2-2-2-5-4 1z" />
                    </svg>
                  </span>
                  <span className={styles.helpText}>
                    <strong>{c.asideHelp}</strong>
                  </span>
                </a>
              </div>

              {step > 0 && (
                <button type="button" className={styles.ghostBtn} onClick={() => goTo(step - 1)}>
                  <svg className={styles.flip} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M12 7H2M7 2L2 7l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {c.back}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
