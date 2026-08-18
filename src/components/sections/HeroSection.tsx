"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { ArrowRight } from "lucide-react";
import { AiHeroBackground } from "@/components/ui/ai-hero-background";

export function HeroSection() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" className="relative min-h-screen pt-24 bg-[#E8F2FF] flex flex-col overflow-hidden">
      {/* Dynamic Background */}
      <AiHeroBackground />

      <div className="relative z-10 flex-grow flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 w-full pointer-events-none">
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 text-[#0D0E25] leading-tight">
            <span className={`block transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="text-[#4B6BFF]">{t.hero.title1} </span> 
              {t.hero.title2} 
            </span>
            <span className={`block transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              {t.hero.title3} <span className="text-[#4B6BFF]">{t.hero.title4}</span>
            </span>
          </h1>

          <p className={`text-lg sm:text-xl md:text-2xl text-[#2F3350] max-w-3xl mb-12 font-medium transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t.hero.description}
          </p>

          <div className={`flex flex-wrap gap-4 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} pointer-events-auto`}>
            <a href="#about-detail" className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0D0E25] text-white hover:bg-[#4B6BFF] transition-all duration-300">
              {t.hero.cta_projects}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm border border-[#0D0E25]/20 text-[#0D0E25] hover:border-[#4B6BFF] hover:text-[#4B6BFF] transition-all duration-300 bg-white/60 backdrop-blur-sm">
              {t.hero.cta_contact}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
