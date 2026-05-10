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
  { key: "demo" as const, href: "#demo" },
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
      className={`text-sm font-medium transition-colors duration-200 ${
        active === href.slice(1)
          ? "text-emerald-400"
          : "text-[#64748b] hover:text-[#e2e8f0]"
      }`}
    >
      {t.nav[key]}
    </a>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0b0f19]/90 backdrop-blur-xl border-b border-[#1e2d40]/80 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#about"
            className="flex items-center gap-1 text-sm font-bold tracking-wider"
          >
            <span className="text-[#64748b] font-mono">[</span>
            <span className="grad-text font-mono text-base">AJ</span>
            <span className="text-[#64748b] font-mono">]</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_KEYS.map(({ key, href }) => navLink(key, href))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <a
              href="https://github.com/alyjnsv"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/20 transition-all duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden p-2 rounded-lg text-[#64748b] hover:text-[#e2e8f0] hover:bg-[#111827] transition-colors"
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-[#1e2d40] bg-[#0b0f19]/95 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-4">
            {NAV_KEYS.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-[#94a3b8] hover:text-[#e2e8f0] transition-colors py-1"
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
