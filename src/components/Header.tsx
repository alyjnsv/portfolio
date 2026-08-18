"use client";

import { useState, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

const NAV_KEYS = [
  { key: "about" as const, href: "#about" },
  { key: "stats" as const, href: "#stats" },
  { key: "stack" as const, href: "#stack" },
  { key: "experience" as const, href: "#experience" },
  { key: "values" as const, href: "#values" },
  { key: "contact" as const, href: "#contact" },
];

export function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_KEYS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const navLink = (key: keyof typeof t.nav, href: string) => (
    <a
      key={key}
      href={href}
      onClick={() => setOpen(false)}
      className={`text-sm font-bold transition-all duration-200 px-3 py-2 rounded-lg hover:bg-gray-100 ${
        active === href.slice(1)
          ? "text-[#4B6BFF] bg-[#E8F2FF]"
          : "text-[#4B5563] hover:text-[#0D0E25]"
      }`}
    >
      {t.nav[key]}
    </a>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#D1D5DB] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a
            href="#about"
            className="flex items-center gap-2 text-xl font-black tracking-tighter"
          >
            <span className="text-[#0D0E25]">Aly</span>
            <span className="text-[#4B6BFF]">.dev</span>
          </a>

          <nav className="hidden lg:flex items-center gap-2">
            {NAV_KEYS.map(({ key, href }) => navLink(key, href))}
          </nav>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="https://github.com/alyjnsv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-sm font-bold px-5 py-2.5 rounded-full bg-[#0D0E25] text-white hover:bg-[#4B6BFF] transition-all duration-300 shadow-sm"
            >
              GitHub
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-[#0D0E25] hover:bg-gray-100 transition-colors"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-[#D1D5DB] bg-white shadow-lg absolute w-full">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
            {NAV_KEYS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-base font-bold text-[#4B5563] hover:text-[#0D0E25] hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors"
              >
                {t.nav[key]}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
