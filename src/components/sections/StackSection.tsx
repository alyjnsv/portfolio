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
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none">
          <div className="glass text-xs text-[#cbd5e1] px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-[#1e2d40]">
            {content}
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-[#1e2d40]" />
        </div>
      )}
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  "AI / LLM": "from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-300 hover:border-emerald-400/60",
  "Техники": "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60",
  Techniques: "from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60",
  Backend: "from-violet-500/20 to-violet-600/10 border-violet-500/30 text-violet-300 hover:border-violet-400/60",
  "Автоматизация": "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300 hover:border-orange-400/60",
  Automation: "from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-300 hover:border-orange-400/60",
  "Инфраструктура": "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300 hover:border-blue-400/60",
  Infrastructure: "from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-300 hover:border-blue-400/60",
  Frontend: "from-pink-500/20 to-pink-600/10 border-pink-500/30 text-pink-300 hover:border-pink-400/60",
};

export function StackSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = t.stack.categories;
  const allLabels = categories.map((c) => c.label);

  return (
    <section id="stack" className="section bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-10 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.stack.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0]">
            {t.stack.title}
          </h2>
        </div>

        {/* Category filter pills */}
        <div
          className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
              activeCategory === null
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                : "border-[#1e2d40] text-[#64748b] hover:text-[#94a3b8]"
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
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer ${
                activeCategory === label
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "border-[#1e2d40] text-[#64748b] hover:text-[#94a3b8]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tech cloud */}
        <div className="space-y-6">
          {categories
            .filter((c) => !activeCategory || c.label === activeCategory)
            .map((cat, ci) => {
              const color =
                CATEGORY_COLORS[cat.label] ||
                "from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-300 hover:border-slate-400/60";
              return (
                <div
                  key={cat.label}
                  className={`transition-all duration-500 ${inView ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: inView ? `${ci * 80}ms` : "0ms" }}
                >
                  <div className="text-[10px] mono text-[#334155] uppercase tracking-widest mb-3">
                    {cat.label}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <Tooltip key={item.name} content={item.desc}>
                        <span
                          className={`inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold border bg-gradient-to-br transition-all duration-200 cursor-default ${color}`}
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
