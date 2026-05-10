"use client";

import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { Shield, Brain, Zap, Rocket } from "lucide-react";

const ICONS = { Shield, Brain, Zap, Rocket } as const;

export function ValuesSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const GRADIENTS = [
    "from-emerald-500/10 to-emerald-600/5",
    "from-cyan-500/10 to-cyan-600/5",
    "from-violet-500/10 to-violet-600/5",
    "from-orange-500/10 to-orange-600/5",
  ];
  const ICON_COLORS = [
    "text-emerald-400",
    "text-cyan-400",
    "text-violet-400",
    "text-orange-400",
  ];
  const GLOW_COLORS = [
    "group-hover:shadow-emerald-500/10",
    "group-hover:shadow-cyan-500/10",
    "group-hover:shadow-violet-500/10",
    "group-hover:shadow-orange-500/10",
  ];

  return (
    <section id="values" className="section bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.values.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0]">
            {t.values.title}
          </h2>
        </div>

        {/* 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {t.values.items.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS] ?? Shield;
            return (
              <div
                key={item.title}
                className={`group glass rounded-2xl p-7 bg-gradient-to-br ${GRADIENTS[i]} hover:border-[#2a3f58] hover:shadow-xl ${GLOW_COLORS[i]} transition-all duration-500 ${
                  inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: inView ? `${i * 90}ms` : "0ms" }}
              >
                {/* Icon */}
                <div
                  className={`mb-5 w-11 h-11 rounded-xl glass flex items-center justify-center ${ICON_COLORS[i]}`}
                >
                  <Icon size={22} />
                </div>

                {/* Index */}
                <div className="mono text-[10px] text-[#334155] mb-2">
                  0{i + 1}.
                </div>

                <h3 className="text-base font-bold text-[#e2e8f0] mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-[#64748b] leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
