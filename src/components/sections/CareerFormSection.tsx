"use client";

import { useState, useId } from "react";
import styles from "./CareerFormSection.module.css";
import { useLanguage } from "@/hooks/useLanguage";

/* ── Translation ────────────────────────────────────────────────── */
const t = {
  en: {
    title: "Apply Now",

    /* fields */
    name:           "Name",
    phone:          "Phone",
    email:          "Email",
    nationality:    "Nationality",
    dob:            "Date of Birth",
    maritalStatus:  "Marital Status",
    gender:         "Gender",
    education:      "Education",
    specialization: "Specialization",
    englishLevel:   "English Language Level",
    otherLangs:     "Other Languages",
    training:       "Training Courses",
    uploadCv:       "Upload CV",
    uploadPhoto:    "Upload Personal Photo",
    experience:     "Work Experience",
    phExperience:   "Companies, positions, dates and responsibilities",

    /* placeholders */
    phName:           "Full name",
    phPhone:          "Phone number",
    phEmail:          "Email address",
    phNationality:    "e.g. Saudi, Egyptian …",
    phSpecialization: "e.g. Marketing, Engineering …",
    phOtherLangs:     "e.g. French, German …",
    phTraining:       "List any relevant courses or certifications",

    /* select options */
    selectDefault:    "Select …",
    maritalOptions:   ["Single", "Married", "Divorced", "Widowed"],
    genderOptions:    ["Male", "Female"],
    educationOptions: ["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Other"],
    englishOptions:   ["Beginner", "Elementary", "Intermediate", "Upper Intermediate", "Advanced", "Fluent / Native"],

    /* experience */

    /* files */
    noFile:     "No file chosen",

    /* submit */
    submitBtn:  "Submit Application",
    errorRequired: "Please fill in all required fields.",

    /* success */
    successTitle: "Application Received!",
    successSub:   "Thank you for applying. Our team will review your application and reach out within 3 business days.",
    successBack:  "Submit Another Application",
  },
  ar: {
    title: "قدّم الآن",


    name:           "الاسم",
    phone:          "رقم الجوال",
    email:          "البريد الإلكتروني",
    nationality:    "الجنسية",
    dob:            "تاريخ الميلاد",
    maritalStatus:  "الحالة الاجتماعية",
    gender:         "الجنس",
    education:      "المؤهل العلمي",
    specialization: "التخصص",
    englishLevel:   "مستوى اللغة الإنجليزية",
    otherLangs:     "لغات أخرى",
    training:       "الدورات التدريبية",
    uploadCv:       "رفع السيرة الذاتية",
    uploadPhoto:    "رفع الصورة الشخصية",
    experience:     "الخبرة العملية",
    phExperience:   "الشركات والمسميات الوظيفية والتواريخ والمهام",

    phName:           "الاسم الكامل",
    phPhone:          "رقم الجوال",
    phEmail:          "البريد الإلكتروني",
    phNationality:    "مثال: سعودي، مصري …",
    phSpecialization: "مثال: تسويق، هندسة …",
    phOtherLangs:     "مثال: فرنسية، ألمانية …",
    phTraining:       "اذكر أي دورات أو شهادات ذات صلة",

    selectDefault:    "اختر …",
    maritalOptions:   ["أعزب / عزباء", "متزوج / متزوجة", "مطلق / مطلقة", "أرمل / أرملة"],
    genderOptions:    ["ذكر", "أنثى"],
    educationOptions: ["ثانوية عامة", "دبلوم", "بكالوريوس", "ماجستير", "دكتوراه", "أخرى"],
    englishOptions:   ["مبتدئ", "أساسي", "متوسط", "فوق المتوسط", "متقدم", "طلق / لغة أم"],


    noFile:    "لم يتم اختيار ملف",

    submitBtn:  "إرسال الطلب",
    errorRequired: "يرجى تعبئة جميع الحقول المطلوبة.",

    successTitle: "تم استلام طلبك!",
    successSub:   "شكراً لتقديمك. سيراجع فريقنا طلبك ويتواصل معك خلال 3 أيام عمل.",
    successBack:  "تقديم طلب آخر",
  },
};

/* ── Types ─────────────────────────────────────────────────────── */
type FormData = {
  name: string;
  phone: string;
  email: string;
  nationality: string;
  dob: string;
  maritalStatus: string;
  gender: string;
  education: string;
  specialization: string;
  englishLevel: string;
  otherLangs: string;
  experience: string;
  training: string;
  cvFile: File | null;
  photoFile: File | null;
};

const EMPTY_FORM: FormData = {
  name: "", phone: "", email: "", nationality: "",
  dob: "", maritalStatus: "", gender: "", education: "",
  specialization: "", englishLevel: "", otherLangs: "",
  experience: "",
  training: "", cvFile: null, photoFile: null,
};

/* ── Sub-components ─────────────────────────────────────────────── */
function Field({
  label,
  required,
  children,
  className,
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

function SelectField({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className={styles.selectWrap}>
      <select
        className={`${styles.select} ${value ? styles.hasValue : ""}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        required
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

function FileUploadField({
  id,
  label,
  accept,
  file,
  noFileText,
  required,
  onChange,
}: {
  id: string;
  label: string;
  accept: string;
  file: File | null;
  noFileText: string;
  required?: boolean;
  onChange: (f: File | null) => void;
}) {
  return (
    <div className={styles.fileField}>
      <input
        id={id}
        type="file"
        accept={accept}
        className={styles.fileInputHidden}
        required={required}
        onChange={(e) => onChange(e.target.files?.[0] ?? null)}
      />
      <label htmlFor={id} className={styles.fileLabel}>
        <span className={styles.fileLabelIcon}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M8 1v9M4 6l4-5 4 5M2 12h12v2H2v-2z" stroke="#057a02" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className={styles.fileLabelText}>
          <span className={`${styles.fileLabelMain} ${file ? styles.chosen : ""}`}>
            {file ? file.name : label}
          </span>
        </span>
      </label>
    </div>
  );
}

/* ── Main Component ─────────────────────────────────────────────── */
export default function CareerFormSection() {
  const lang = useLanguage();
  const c = t[lang];

  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const uid = useId();

  /* helpers */
  const set = <K extends keyof FormData>(key: K, val: FormData[K]) =>
    setForm((f) => ({ ...f, [key]: val }));

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    if (!formEl.checkValidity()) {
      setShowErrors(true);
      const firstInvalid = formEl.querySelector<HTMLElement>(":invalid");
      firstInvalid?.scrollIntoView({ behavior: "smooth", block: "center" });
      firstInvalid?.focus({ preventScroll: true });
      return;
    }
    setShowErrors(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <section className={styles.section}>
        <div className={styles.success}>
          <div className={styles.successIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <path d="M5 14l7 7L23 7" stroke="#057a02" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className={styles.successTitle}>{c.successTitle}</h2>
          <p className={styles.successSub}>{c.successSub}</p>
          <button
            type="button"
            className={styles.successBack}
            onClick={() => { setForm(EMPTY_FORM); setShowErrors(false); setSubmitted(false); }}
          >
            {c.successBack}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="apply-form" className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>{c.title}</h2>
      </div>

      <form
        className={`${styles.form} ${showErrors ? styles.showErrors : ""}`}
        onSubmit={handleSubmit}
        noValidate
      >

        <div className={styles.grid2}>
            <Field label={c.name} required>
              <input
                className={styles.input}
                type="text"
                placeholder={c.phName}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
              />
            </Field>

            <Field label={c.phone} required>
              <input
                className={styles.input}
                type="tel"
                placeholder={c.phPhone}
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                required
              />
            </Field>

            <Field label={c.email} required>
              <input
                className={styles.input}
                type="email"
                placeholder={c.phEmail}
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                required
              />
            </Field>

            <Field label={c.nationality} required>
              <input
                className={styles.input}
                type="text"
                placeholder={c.phNationality}
                value={form.nationality}
                onChange={(e) => set("nationality", e.target.value)}
                required
              />
            </Field>

            <Field label={c.dob} required>
              <input
                className={styles.input}
                type="date"
                aria-label={c.dob}
                value={form.dob}
                onChange={(e) => set("dob", e.target.value)}
                required
              />
            </Field>

            <Field label={c.maritalStatus} required>
              <SelectField
                value={form.maritalStatus}
                onChange={(v) => set("maritalStatus", v)}
                options={c.maritalOptions}
                placeholder={c.selectDefault}
              />
            </Field>

            <Field label={c.gender} required>
              <SelectField
                value={form.gender}
                onChange={(v) => set("gender", v)}
                options={c.genderOptions}
                placeholder={c.selectDefault}
              />
            </Field>

            <Field label={c.education} required>
              <SelectField
                value={form.education}
                onChange={(v) => set("education", v)}
                options={c.educationOptions}
                placeholder={c.selectDefault}
              />
            </Field>

            <Field label={c.specialization} required>
              <input
                className={styles.input}
                type="text"
                placeholder={c.phSpecialization}
                value={form.specialization}
                onChange={(e) => set("specialization", e.target.value)}
                required
              />
            </Field>
            <Field label={c.experience} required className={styles.colSpan2}>
              <textarea
                className={styles.textarea}
                placeholder={c.phExperience}
                value={form.experience}
                onChange={(e) => set("experience", e.target.value)}
                required
              />
            </Field>
            <Field label={c.englishLevel} required>
              <SelectField
                value={form.englishLevel}
                onChange={(v) => set("englishLevel", v)}
                options={c.englishOptions}
                placeholder={c.selectDefault}
              />
            </Field>

            <Field label={c.otherLangs} required>
              <input
                className={styles.input}
                type="text"
                placeholder={c.phOtherLangs}
                value={form.otherLangs}
                onChange={(e) => set("otherLangs", e.target.value)}
                required
              />
            </Field>

            <Field label={c.training} required className={styles.colSpan2}>
              <textarea
                className={styles.textarea}
                placeholder={c.phTraining}
                value={form.training}
                onChange={(e) => set("training", e.target.value)}
                required
              />
            </Field>
            <Field label={c.uploadCv} required>
              <FileUploadField
                id={`${uid}-cv`}
                label={c.uploadCv}
                accept=".pdf,.doc,.docx"
                file={form.cvFile}
                noFileText={c.noFile}
                required
                onChange={(f) => set("cvFile", f)}
              />
            </Field>

            <Field label={c.uploadPhoto} required>
              <FileUploadField
                id={`${uid}-photo`}
                label={c.uploadPhoto}
                accept="image/*"
                file={form.photoFile}
                noFileText={c.noFile}
                required
                onChange={(f) => set("photoFile", f)}
              />
            </Field>
        </div>

        {/* ── Submit ── */}
        {showErrors && (
          <p className={styles.errorMsg} role="alert">{c.errorRequired}</p>
        )}
        <div className={styles.submitRow}>
          <button type="submit" className={styles.submitBtn}>
            {c.submitBtn}
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

      </form>
    </section>
  );
}
