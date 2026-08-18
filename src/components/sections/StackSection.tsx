"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";

function Tooltip({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none">
          <div className="bg-[#0D0E25] text-white text-xs px-4 py-2 rounded-xl whitespace-nowrap shadow-xl font-medium">
            {content}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#0D0E25]" />
        </div>
      )}
    </div>
  );
}

const CATEGORY_STYLES: Record<string, string> = {
  "AI / LLM": "bg-[#E8F2FF] border-[#4B6BFF]/20 text-[#4B6BFF] hover:border-[#4B6BFF]",
  "Техники": "bg-[#F5E8FF] border-[#B25EE2]/20 text-[#B25EE2] hover:border-[#B25EE2]",
  Techniques: "bg-[#F5E8FF] border-[#B25EE2]/20 text-[#B25EE2] hover:border-[#B25EE2]",
  Backend: "bg-[#E6F8F0] border-[#2CB67D]/20 text-[#2CB67D] hover:border-[#2CB67D]",
  "Автоматизация": "bg-[#FFF0E6] border-[#F57B36]/20 text-[#F57B36] hover:border-[#F57B36]",
  Automation: "bg-[#FFF0E6] border-[#F57B36]/20 text-[#F57B36] hover:border-[#F57B36]",
  "Инфраструктура": "bg-[#F3F4F6] border-[#6B7280]/20 text-[#4B5563] hover:border-[#6B7280]",
  Infrastructure: "bg-[#F3F4F6] border-[#6B7280]/20 text-[#4B5563] hover:border-[#6B7280]",
  Frontend: "bg-[#FFE8F0] border-[#F73489]/20 text-[#F73489] hover:border-[#F73489]",
};

export function StackSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = t.stack.categories;
  const allLabels = categories.map((c) => c.label);

  return (
    <section id="stack" className="section bg-white border-b border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#2CB67D] uppercase tracking-widest mb-4">
            {t.stack.tag}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0D0E25] tracking-tight">
            {t.stack.title}
          </h2>
        </div>

        <div
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 cursor-pointer ${
              activeCategory === null
                ? "bg-[#0D0E25] border-[#0D0E25] text-white"
                : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#0D0E25] hover:text-[#0D0E25]"
            }`}
          >
            All
          </button>
          {allLabels.map((label) => (
            <button
              key={label}
              onClick={() =>
                setActiveCategory(activeCategory === label ? null : label)
              }
              className={`px-5 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 cursor-pointer ${
                activeCategory === label
                  ? "bg-[#0D0E25] border-[#0D0E25] text-white"
                  : "bg-white border-[#E5E7EB] text-[#6B7280] hover:border-[#0D0E25] hover:text-[#0D0E25]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="space-y-10">
          {categories
            .filter((c) => !activeCategory || c.label === activeCategory)
            .map((cat, ci) => {
              const color =
                CATEGORY_STYLES[cat.label] ||
                "bg-[#F3F4F6] border-[#6B7280]/20 text-[#4B5563] hover:border-[#6B7280]";
              return (
                <div
                  key={cat.label}
                  className={`transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
                  style={{ transitionDelay: inView ? `${ci * 100}ms` : "0ms" }}
                >
                  <div className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">
                    {cat.label}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {cat.items.map((item) => (
                      <Tooltip key={item.name} content={item.desc}>
                        <span
                          className={`inline-flex px-4 py-2 rounded-full text-sm font-bold border transition-all duration-300 cursor-default ${color}`}
                        >
                          {item.name}
                        </span>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
