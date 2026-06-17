"use client";

export type { Lang } from "@/contexts/LangContext";
export { useLang as useLanguageCtx } from "@/contexts/LangContext";

import { useLang } from "@/contexts/LangContext";

export function useLanguage() {
  return useLang().lang;
}
