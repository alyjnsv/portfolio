"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { translations, type Locale } from "./i18n";

interface LangContextValue {
  locale: Locale;
  t: (typeof translations)[Locale];
  setLocale: (l: Locale) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ru");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-lang") as Locale | null;
    if (saved === "ru" || saved === "en") setLocaleState(saved);
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("portfolio-lang", l);
  };

  return (
    <LangContext.Provider value={{ locale, t: translations[locale], setLocale }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LangProvider");
  return ctx;
}
