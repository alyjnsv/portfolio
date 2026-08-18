"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { Shield, Brain, Zap, Rocket } from "lucide-react";

const ICONS = { Shield, Brain, Zap, Rocket } as const;

export function ValuesSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const THEMES = [
    { bg: "bg-[#F5E8FF]", text: "text-[#B25EE2]", stroke: "outline-text" },
    { bg: "bg-[#E6F8F0]", text: "text-[#2CB67D]", stroke: "outline-text" },
    { bg: "bg-[#E8EEFF]", text: "text-[#4B6BFF]", stroke: "outline-text" },
    { bg: "bg-[#FFF0E6]", text: "text-[#F57B36]", stroke: "outline-text" },
  ];

  return (
    <section id="values" className="section bg-[#F4F5F7] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4B6BFF] uppercase tracking-widest mb-4">
            {t.values.tag}
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#0D0E25] tracking-tight max-w-3xl">
            {t.values.title}
          </h2>
        </div>

        <div className="flex flex-col gap-0 border border-[#D1D5DB] rounded-3xl overflow-hidden bg-white shadow-sm">
          {t.values.items.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Shield;
            const isActive = activeIndex === i;
            const theme = THEMES[i % THEMES.length];

            return (
              <div 
                key={item.title} 
                className={`border-b border-[#D1D5DB] last:border-b-0 transition-colors duration-300 ${isActive ? theme.bg : 'hover:bg-gray-50'}`}
              >
                <button
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  className="w-full text-left py-8 px-6 sm:px-10 flex items-center justify-between group"
                >
                  <h3 className={`text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase transition-all duration-300 ${isActive ? theme.text : theme.stroke}`}>
                    {item.title}
                  </h3>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-white shadow-sm ' + theme.text : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>
                    <Icon size={24} />
                  </div>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="pb-10 px-6 sm:px-10 flex flex-col sm:flex-row gap-6 md:gap-12">
                    <div className="flex-1">
                      <p className={`text-lg md:text-xl font-medium leading-relaxed ${isActive ? theme.text : 'text-gray-600'}`}>
                        {item.description}
                      </p>
                    </div>
                    <div className="w-full sm:w-1/3 flex justify-end items-end">
                      <div className={`text-[120px] font-black leading-none opacity-20 ${isActive ? theme.text : ''}`}>
                        0{i + 1}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
