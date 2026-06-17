"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

export type Lang = "en" | "ar";

const LANG_KEY = "bu-lang";

interface LangCtx {
  lang: Lang;
  changeLang: (l: Lang) => void;
}

const LangContext = createContext<LangCtx>({ lang: "en", changeLang: () => {} });

export function LangProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLang] = useState<Lang>(initialLang);
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  function changeLang(next: Lang) {
    setLang(next);
    window.localStorage.setItem(LANG_KEY, next);
    document.cookie = `${LANG_KEY}=${next}; path=/; max-age=31536000; SameSite=Lax`;
  }

  return (
    <LangContext.Provider value={{ lang, changeLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangCtx {
  return useContext(LangContext);
}
