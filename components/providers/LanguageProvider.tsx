"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "es" | "en";

/** A bilingual value; `tr()` resolves it to the active language. */
export type Bi = { es: string; en: string };

type LangValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  /** resolve a bilingual value (or pass through a plain string) */
  tr: (v: Bi | string) => string;
};

const Ctx = createContext<LangValue | null>(null);
const STORAGE_KEY = "mia-lang";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "es" || saved === "en") {
        setLangState(saved);
        document.documentElement.lang = saved;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(
    () => setLang(lang === "es" ? "en" : "es"),
    [lang, setLang],
  );

  const tr = useCallback(
    (v: Bi | string) => (typeof v === "string" ? v : v[lang]),
    [lang],
  );

  const value = useMemo<LangValue>(
    () => ({ lang, setLang, toggle, tr }),
    [lang, setLang, toggle, tr],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLang(): LangValue {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
