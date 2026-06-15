"use client";
import { useState, useEffect } from "react";

export type Lang = "en" | "ar";

export function useLanguage(): Lang {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const update = () =>
      setLang(document.documentElement.dir === "rtl" ? "ar" : "en");
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["dir"],
    });
    return () => obs.disconnect();
  }, []);

  return lang;
}
