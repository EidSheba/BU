"use client";

import { useId, useRef, useState } from "react";
import styles from "./QuoteFormSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

/* ── Option keys (language-independent, so switching language keeps selections) ── */
const PROJECT_TYPES = ["exhibition", "event", "conference", "launch", "activation", "other"] as const;
const VISITORS = ["lt500", "500-2k", "2k-10k", "10k-50k", "gt50k"] as const;
const BOOTH_SIDES = ["inline", "corner", "peninsula", "island", "unsure"] as const;
const BUDGETS = ["lt50", "50-100", "100-250", "250-500", "500-1m", "gt1m", "unsure"] as const;
const CONTACT_METHODS = ["phone", "email", "whatsapp"] as const;

type ProjectType = (typeof PROJECT_TYPES)[number];

/* ── Translation ────────────────────────────────────────────────── */
const t = {
  en: {
    label: "Request for Proposal",
    title: "Tell us about your project",
    sub: "Takes about 3 minutes. The more detail you share, the more accurate your quotation will be.",

    steps: ["Project", "Details", "Budget", "Contact", "Review"],
    stepOf: (a: number, b: number) => `Step ${a} of ${b}`,

    /* step 1 */
    projectTypeQ: "What are you planning?",
    projectTypes: {
      exhibition: ["Exhibition Booth", "Design & build of a stand at a trade show or expo"],
      event:      ["Corporate Event", "Galas, ceremonies, gatherings and celebrations"],
      conference: ["Conference / Forum", "Summits, seminars, panels and workshops"],
      launch:     ["Product Launch", "Reveal events and brand launches"],
      activation: ["Brand Activation", "Pop-ups, roadshows and experiential campaigns"],
      other:      ["Something Else", "Tell us more in the next steps"],
    } as Record<ProjectType, [string, string]>,

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
    visitorOpts: {
      "lt500": "Less than 500", "500-2k": "500 – 2,000", "2k-10k": "2,000 – 10,000",
      "10k-50k": "10,000 – 50,000", "gt50k": "More than 50,000",
    } as Record<(typeof VISITORS)[number], string>,
    boothTitle:     "Booth Specifications",
    boothArea:      "Booth Area (m²)",
    phBoothArea:    "e.g. 36",
    boothSides:     "Booth Type",
    sidesOpts: {
      inline: "Inline — 1 open side", corner: "Corner — 2 open sides",
      peninsula: "Peninsula — 3 open sides", island: "Island — 4 open sides", unsure: "Not sure yet",
    } as Record<(typeof BOOTH_SIDES)[number], string>,
    brief:          "Project Brief",
    phBrief:        "Describe your objectives, target audience, key requirements and any ideas or references you have in mind.",

    /* step 3 */
    budget:         "Estimated Budget (SAR)",
    budgetHint:     "Helps us propose the right solution for your scale — it stays confidential.",
    budgetOpts: {
      "lt50": "Under 50K", "50-100": "50K – 100K", "100-250": "100K – 250K", "250-500": "250K – 500K",
      "500-1m": "500K – 1M", "gt1m": "Over 1M", "unsure": "Not decided yet",
    } as Record<(typeof BUDGETS)[number], string>,
    deadline:       "When do you need the proposal?",
    attachment:     "Attachments",
    optional:       "Optional",
    attachHint:     "Brief, floor plan, brand guidelines · PDF, images, ZIP · max 10 MB",
    attachBtn:      "Upload files",
    notes:          "Additional Notes",
    phNotes:        "Anything else we should know?",

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
    contactVia:     "Preferred Contact Method",
    contactOpts: { phone: "Phone Call", email: "Email", whatsapp: "WhatsApp" } as Record<(typeof CONTACT_METHODS)[number], string>,

    /* step 5 */
    reviewTitle:    "Review your request",
    edit:           "Edit",
    notProvided:    "—",
    files:          (n: number) => `${n} file${n === 1 ? "" : "s"}`,
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
    summaryTitle:   "Your request",

    /* success */
    successTitle:   "Request received!",
    successSub:     "Thank you. A member of our team will contact you within one business day to discuss your project.",
    successRef:     "Reference number",
    successBack:    "Submit Another Request",
  },
  ar: {
    label: "طلب عرض سعر",
    title: "أخبرنا عن مشروعك",
    sub: "يستغرق حوالي 3 دقائق. كلما شاركت تفاصيل أكثر، كان عرض السعر أدق.",

    steps: ["المشروع", "التفاصيل", "الميزانية", "التواصل", "المراجعة"],
    stepOf: (a: number, b: number) => `الخطوة ${a} من ${b}`,

    projectTypeQ: "ما الذي تخطط له؟",
    projectTypes: {
      exhibition: ["جناح معرض", "تصميم وتنفيذ جناح في معرض أو إكسبو"],
      event:      ["فعالية مؤسسية", "حفلات، مراسم، لقاءات واحتفالات"],
      conference: ["مؤتمر / منتدى", "قمم، ندوات، جلسات حوارية وورش عمل"],
      launch:     ["إطلاق منتج", "فعاليات الإطلاق والكشف عن العلامات التجارية"],
      activation: ["تفعيل علامة تجارية", "متاجر مؤقتة، جولات وحملات تفاعلية"],
      other:      ["مشروع آخر", "أخبرنا المزيد في الخطوات التالية"],
    } as Record<ProjectType, [string, string]>,

    eventName:      "اسم المعرض / الفعالية",
    phEventName:    "مثال: ليب 2027، معرض الغذاء السعودي …",
    city:           "المدينة",
    phCity:         "مثال: الرياض، جدة …",
    venue:          "مكان الإقامة",
    phVenue:        "مثال: مركز الرياض للمعارض",
    startDate:      "تاريخ البداية",
    endDate:        "تاريخ النهاية",
    visitors:       "عدد الحضور المتوقع",
    visitorOpts: {
      "lt500": "أقل من 500", "500-2k": "500 – 2,000", "2k-10k": "2,000 – 10,000",
      "10k-50k": "10,000 – 50,000", "gt50k": "أكثر من 50,000",
    } as Record<(typeof VISITORS)[number], string>,
    boothTitle:     "مواصفات الجناح",
    boothArea:      "مساحة الجناح (م²)",
    phBoothArea:    "مثال: 36",
    boothSides:     "نوع الجناح",
    sidesOpts: {
      inline: "داخلي — واجهة مفتوحة واحدة", corner: "زاوية — واجهتان مفتوحتان",
      peninsula: "شبه جزيرة — 3 واجهات مفتوحة", island: "جزيرة — 4 واجهات مفتوحة", unsure: "غير محدد بعد",
    } as Record<(typeof BOOTH_SIDES)[number], string>,
    brief:          "وصف المشروع",
    phBrief:        "صف أهدافك، الجمهور المستهدف، المتطلبات الأساسية وأي أفكار أو مراجع لديك.",

    budget:         "الميزانية التقديرية (ريال سعودي)",
    budgetHint:     "تساعدنا على اقتراح الحل المناسب لحجم مشروعك — وتبقى سرية.",
    budgetOpts: {
      "lt50": "أقل من 50 ألف", "50-100": "50 – 100 ألف", "100-250": "100 – 250 ألف", "250-500": "250 – 500 ألف",
      "500-1m": "500 ألف – مليون", "gt1m": "أكثر من مليون", "unsure": "لم تحدد بعد",
    } as Record<(typeof BUDGETS)[number], string>,
    deadline:       "متى تحتاج عرض السعر؟",
    attachment:     "المرفقات",
    optional:       "اختياري",
    attachHint:     "ملف تعريفي، مخطط الأرضية، دليل الهوية · PDF، صور، ZIP · الحد الأقصى 10 ميجابايت",
    attachBtn:      "رفع الملفات",
    notes:          "ملاحظات إضافية",
    phNotes:        "هل هناك أي شيء آخر يجب أن نعرفه؟",

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
    contactVia:     "طريقة التواصل المفضلة",
    contactOpts: { phone: "اتصال هاتفي", email: "البريد الإلكتروني", whatsapp: "واتساب" } as Record<(typeof CONTACT_METHODS)[number], string>,

    reviewTitle:    "راجع طلبك",
    edit:           "تعديل",
    notProvided:    "—",
    files:          (n: number) => `${n} ${n === 1 ? "ملف" : "ملفات"}`,
    consent:        "أوافق على أن تتواصل معي بيزنس أمبريلا بخصوص هذا الطلب وأن تعالج المعلومات التي قدمتها.",

    back:           "رجوع",
    next:           "متابعة",
    submit:         "إرسال الطلب",
    selectDefault:  "اختر …",
    errorRequired:  "يرجى إكمال الحقول المحددة.",
    errorDates:     "لا يمكن أن يكون تاريخ النهاية قبل تاريخ البداية.",

    asideHelp:      "تفضّل التحدث معنا؟",
    asideCall:      "تواصل معنا",
    summaryTitle:   "طلبك",

    successTitle:   "تم استلام طلبك!",
    successSub:     "شكراً لك. سيتواصل معك أحد أعضاء فريقنا خلال يوم عمل واحد لمناقشة مشروعك.",
    successRef:     "الرقم المرجعي",
    successBack:    "إرسال طلب آخر",
  },
};

/* ── Form state ─────────────────────────────────────────────────── */
type QuoteForm = {
  projectType: ProjectType | "";
  eventName: string;
  city: string;
  venue: string;
  startDate: string;
  endDate: string;
  visitors: string;
  boothArea: string;
  boothSides: string;
  brief: string;
  budget: string;
  deadline: string;
  files: File[];
  notes: string;
  fullName: string;
  company: string;
  jobTitle: string;
  email: string;
  phone: string;
  contactVia: string;
  consent: boolean;
};

const EMPTY_FORM: QuoteForm = {
  projectType: "",
  eventName: "", city: "", venue: "", startDate: "", endDate: "", visitors: "",
  boothArea: "", boothSides: "", brief: "",
  budget: "", deadline: "", files: [], notes: "",
  fullName: "", company: "", jobTitle: "", email: "", phone: "", contactVia: "",
  consent: false,
};

const TOTAL_STEPS = 5;

/* ── Icons for project-type cards ───────────────────────────────── */
const TYPE_ICONS: Record<ProjectType, React.ReactNode> = {
  exhibition: <path d="M3 20V9l9-5 9 5v11M3 20h18M7 20v-6h10v6M9 10h6" />,
  event:      <path d="M12 3v3M5.6 5.6l2.1 2.1M3 12h3M18 12h3M16.3 7.7l2.1-2.1M8 21h8M10 21v-4a2 2 0 0 1 4 0v4M7 14a5 5 0 1 1 10 0" />,
  conference: <path d="M3 5h18v10H3zM8 19h8M12 15v4M7 9h6M7 12h10" />,
  launch:     <path d="M12 2c3 3 4.5 6.5 4.5 10.5L14 16h-4l-2.5-3.5C7.5 8.5 9 5 12 2zM10 16l-2 5 4-2 4 2-2-5M12 9.5v.01" />,
  activation: <path d="M4 10l14-6v16L4 14v-4zM4 10H2v4h2M8 15l1.5 5h3L11 16" />,
  other:      <path d="M12 5v14M5 12h14" />,
};

/* ── Sub-components ─────────────────────────────────────────────── */
function Field({
  label, required, optionalText, hint, children, className,
}: {
  label: string;
  required?: boolean;
  optionalText?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`${styles.field} ${className ?? ""}`}>
      <span className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
        {optionalText && <span className={styles.optional}>{optionalText}</span>}
      </span>
      {children}
      {hint && <span className={styles.hint}>{hint}</span>}
    </label>
  );
}

function Select({
  value, onChange, options, placeholder, required = true,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div className={styles.selectWrap}>
      <select
        className={`${styles.input} ${styles.select} ${value ? styles.hasValue : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(([k, l]) => <option key={k} value={k}>{l}</option>)}
      </select>
    </div>
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

  const isExhibition = form.projectType === "exhibition";

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
    if (step === 1 && form.startDate && form.endDate && form.endDate < form.startDate) {
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

  /* Review helpers */
  const labelOf = <T extends string>(map: Record<T, string>, k: string) =>
    k ? map[k as T] ?? k : c.notProvided;
  const reviewGroups: { step: number; title: string; rows: [string, string][] }[] = [
    {
      step: 0,
      title: c.steps[0],
      rows: [
        [c.projectTypeQ, form.projectType ? c.projectTypes[form.projectType][0] : c.notProvided],
      ],
    },
    {
      step: 1,
      title: c.steps[1],
      rows: [
        [c.eventName, form.eventName],
        [c.city, form.city],
        [c.venue, form.venue],
        [`${c.startDate} / ${c.endDate}`, `${form.startDate} → ${form.endDate}`],
        [c.visitors, labelOf(c.visitorOpts, form.visitors)],
        ...(isExhibition
          ? ([
              [c.boothArea, form.boothArea ? `${form.boothArea} m²` : c.notProvided],
              [c.boothSides, labelOf(c.sidesOpts, form.boothSides)],
            ] as [string, string][])
          : []),
        [c.brief, form.brief],
      ],
    },
    {
      step: 2,
      title: c.steps[2],
      rows: [
        [c.budget, labelOf(c.budgetOpts, form.budget)],
        [c.deadline, form.deadline],
        [c.attachment, form.files.length ? c.files(form.files.length) : c.notProvided],
        [c.notes, form.notes || c.notProvided],
      ],
    },
    {
      step: 3,
      title: c.steps[3],
      rows: [
        [c.fullName, form.fullName],
        [c.company, form.company],
        [c.jobTitle, form.jobTitle],
        [c.email, form.email],
        [c.phone, form.phone],
        [c.contactVia, labelOf(c.contactOpts, form.contactVia)],
      ],
    },
  ];

  return (
    <section ref={sectionRef} id="quote-form" className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <span className={styles.sectionLabel}>
          <span className={styles.labelDot} />
          {c.label}
        </span>
        <h2 className={styles.sectionTitle}>{c.title}</h2>
        <p className={styles.sectionSub}>{c.sub}</p>
      </div>

      <div className={`${styles.layout} ${!form.projectType ? styles.layoutSingle : ""}`}>
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

              {/* ── Step 1: Project ── */}
              {step === 0 && (
                <>
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.question}>
                      {c.projectTypeQ}<span className={styles.required}>*</span>
                    </legend>
                    <div className={styles.typeGrid}>
                      {PROJECT_TYPES.map((pt) => (
                        <label
                          key={pt}
                          className={`${styles.typeCard} ${form.projectType === pt ? styles.selected : ""}`}
                        >
                          <input
                            type="radio"
                            name={`${uid}-type`}
                            value={pt}
                            checked={form.projectType === pt}
                            onChange={() => set("projectType", pt)}
                            className={styles.srOnly}
                            required
                          />
                          <span className={styles.typeIcon}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                              {TYPE_ICONS[pt]}
                            </svg>
                          </span>
                          <span className={styles.typeTitle}>{c.projectTypes[pt][0]}</span>
                          <span className={styles.typeDesc}>{c.projectTypes[pt][1]}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {/* ── Step 2: Details ── */}
              {step === 1 && (
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
                      <Select value={form.visitors} onChange={(v) => set("visitors", v)}
                        options={VISITORS.map((k) => [k, c.visitorOpts[k]])} placeholder={c.selectDefault} />
                    </Field>
                  </div>

                  {isExhibition && (
                    <div className={styles.subCard}>
                      <p className={styles.subCardTitle}>{c.boothTitle}</p>
                      <div className={styles.grid2}>
                        <Field label={c.boothArea} required>
                          <input className={styles.input} type="number" min={1} inputMode="numeric"
                            placeholder={c.phBoothArea} value={form.boothArea}
                            onChange={(e) => set("boothArea", e.target.value)} required />
                        </Field>
                        <Field label={c.boothSides} required>
                          <Select value={form.boothSides} onChange={(v) => set("boothSides", v)}
                            options={BOOTH_SIDES.map((k) => [k, c.sidesOpts[k]])} placeholder={c.selectDefault} />
                        </Field>
                      </div>
                    </div>
                  )}

                  <Field label={c.brief} required>
                    <textarea className={styles.textarea} rows={5} placeholder={c.phBrief}
                      value={form.brief} onChange={(e) => set("brief", e.target.value)} required />
                  </Field>
                </>
              )}

              {/* ── Step 3: Budget ── */}
              {step === 2 && (
                <>
                  <fieldset className={styles.fieldset}>
                    <legend className={styles.question}>
                      {c.budget}<span className={styles.required}>*</span>
                      <span className={styles.questionHint}>{c.budgetHint}</span>
                    </legend>
                    <div className={styles.budgetGrid}>
                      {BUDGETS.map((b) => (
                        <label key={b} className={`${styles.budgetCard} ${form.budget === b ? styles.selected : ""}`}>
                          <input type="radio" name={`${uid}-budget`} value={b} checked={form.budget === b}
                            onChange={() => set("budget", b)} className={styles.srOnly} required />
                          {c.budgetOpts[b]}
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className={styles.grid2}>
                    <Field label={c.deadline} required>
                      <input className={styles.input} type="date" min={today || undefined}
                        value={form.deadline} onChange={(e) => set("deadline", e.target.value)} required />
                    </Field>

                    <div className={styles.field}>
                      <span className={styles.label}>
                        {c.attachment}<span className={styles.optional}>{c.optional}</span>
                      </span>
                      <input
                        id={`${uid}-files`}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png,.zip,.ppt,.pptx,.doc,.docx"
                        className={styles.srOnly}
                        onChange={(e) => set("files", Array.from(e.target.files ?? []))}
                      />
                      <label htmlFor={`${uid}-files`} className={styles.fileLabel}>
                        <span className={styles.fileIcon}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M8 1v9M4 6l4-5 4 5M2 12h12v2H2v-2z" stroke="#057a02" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className={styles.fileText}>
                          <span className={`${styles.fileMain} ${form.files.length ? styles.chosen : ""}`}>
                            {form.files.length
                              ? form.files.map((f) => f.name).join(", ")
                              : c.attachBtn}
                          </span>
                          <span className={styles.fileSub}>{c.attachHint}</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  <Field label={c.notes} optionalText={c.optional}>
                    <textarea className={styles.textarea} rows={4} placeholder={c.phNotes}
                      value={form.notes} onChange={(e) => set("notes", e.target.value)} />
                  </Field>
                </>
              )}

              {/* ── Step 4: Contact ── */}
              {step === 3 && (
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

                  <fieldset className={styles.fieldset}>
                    <legend className={styles.question}>
                      {c.contactVia}<span className={styles.required}>*</span>
                    </legend>
                    <div className={styles.segmented}>
                      {CONTACT_METHODS.map((m) => (
                        <label key={m} className={`${styles.segment} ${form.contactVia === m ? styles.selected : ""}`}>
                          <input type="radio" name={`${uid}-contact`} value={m} checked={form.contactVia === m}
                            onChange={() => set("contactVia", m)} className={styles.srOnly} required />
                          {c.contactOpts[m]}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {/* ── Step 5: Review ── */}
              {step === 4 && (
                <>
                  <p className={styles.question}>{c.reviewTitle}</p>
                  <div className={styles.review}>
                    {reviewGroups.map((g) => (
                      <div key={g.step} className={styles.reviewGroup}>
                        <div className={styles.reviewHead}>
                          <span>{g.title}</span>
                          <button type="button" className={styles.editBtn} onClick={() => goTo(g.step)}>
                            {c.edit}
                          </button>
                        </div>
                        <dl className={styles.reviewList}>
                          {g.rows.map(([k, v]) => (
                            <div key={k} className={styles.reviewRow}>
                              <dt>{k}</dt>
                              <dd>{v || c.notProvided}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    ))}
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

        {/* ── Aside ── */}
        {form.projectType && (
          <aside className={styles.aside}>
            <div className={styles.asideCard}>
              <p className={styles.asideTitle}>{c.summaryTitle}</p>
              <p className={styles.summaryType}>{c.projectTypes[form.projectType][0]}</p>
              {(form.eventName || form.city) && (
                <p className={styles.summaryMeta}>
                  {[form.eventName, form.city].filter(Boolean).join(" · ")}
                </p>
              )}
            </div>
          </aside>
        )}
      </div>
    </section>
  );
}
