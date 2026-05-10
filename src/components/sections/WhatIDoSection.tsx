"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import { ChevronDown } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export function WhatIDoSection() {
  const { t } = useLang();
  const [open, setOpen] = useState<string | null>("production");
  const { ref, inView } = useInView();

  const items = t.whatido.items;

  return (
    <section id="about-detail" className="section bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.whatido.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0]">
            {t.whatido.title}
          </h2>
        </div>

        {/* 2×2 accordion grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item, i) => {
            const isOpen = open === item.id;
            return (
              <div
                key={item.id}
                className={`glass rounded-2xl overflow-hidden transition-all duration-500 ${
                  isOpen ? "neon-emerald border-emerald-500/30" : "hover:border-[#2a3f58]"
                } ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{
                  transitionDelay: inView ? `${i * 80}ms` : "0ms",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="w-full flex items-start justify-between gap-4 p-6 text-left cursor-pointer"
                >
                  <div className="flex-1">
                    {/* Metric badge */}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="mono text-xs font-bold grad-text px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                        {item.metric}
                      </span>
                      <span className="text-[10px] text-[#475569] uppercase tracking-wider">
                        {item.metricLabel}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#e2e8f0] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown
                    size={18}
                    className={`text-[#475569] flex-shrink-0 mt-1 transition-transform duration-300 ${isOpen ? "rotate-180 text-emerald-400" : ""}`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-48" : "max-h-0"}`}
                >
                  <p className="px-6 pb-6 text-sm text-[#94a3b8] leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
