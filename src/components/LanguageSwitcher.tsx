"use client";

import { useLang } from "@/lib/lang-context";
import type { Locale } from "@/lib/i18n";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useLang();

  const toggle = (l: Locale) => {
    if (l !== locale) setLocale(l);
  };

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-[#1e2d40] bg-[#111827] p-0.5 ${className ?? ""}`}
    >
      {(["ru", "en"] as Locale[]).map((l) => (
        <button
          key={l}
          onClick={() => toggle(l)}
          className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            locale === l
              ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-black shadow"
              : "text-[#64748b] hover:text-[#e2e8f0]"
          }`}
          aria-label={`Switch to ${l.toUpperCase()}`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
