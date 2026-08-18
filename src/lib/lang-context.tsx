"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { translations, type Locale } from "./i18n";

interface LangContextValue {
  locale: Locale;
  t: (typeof translations)[Locale];
  setLocale: (l: Locale) => void;
}

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "portfolio-lang";
const CHANGE_EVENT = "portfolio-lang-change";

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Locale {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved === "en" || saved === "ru" ? saved : "ru";
}

function getServerSnapshot(): Locale {
  return "ru";
}

export function LangProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = (l: Locale) => {
    localStorage.setItem(STORAGE_KEY, l);
    window.dispatchEvent(new Event(CHANGE_EVENT));
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
