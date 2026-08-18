"use client";

import { useLang } from "@/lib/lang-context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Send, Mail } from "lucide-react";

export function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F4F5F7] border-t border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#about" className="flex items-center gap-2 text-xl font-black tracking-tighter">
              <span className="text-[#0D0E25]">Aly</span>
              <span className="text-[#4B6BFF]">.dev</span>
            </a>
            <p className="text-sm font-medium text-[#6B7280]">{t.footer.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/alyjnsv"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#D1D5DB] text-[#4B5563] hover:text-white hover:bg-[#0D0E25] hover:border-[#0D0E25] transition-all duration-300 shadow-sm"
              aria-label="GitHub"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://t.me/broplemspb"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#D1D5DB] text-[#4B5563] hover:text-white hover:bg-[#0088CC] hover:border-[#0088CC] transition-all duration-300 shadow-sm"
              aria-label="Telegram"
            >
              <Send size={20} />
            </a>
            <a
              href="mailto:hello@alyjnsv.pro"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-[#D1D5DB] text-[#4B5563] hover:text-white hover:bg-[#B25EE2] hover:border-[#B25EE2] transition-all duration-300 shadow-sm"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <LanguageSwitcher />
            <p className="text-sm font-medium text-[#9CA3AF]">
              © {year} Алий Джансуев · {t.footer.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
