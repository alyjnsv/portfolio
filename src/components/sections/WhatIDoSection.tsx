"use client";

import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";

export function WhatIDoSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const items = t.whatido.items;

  return (
    <section id="about-detail" className="section bg-white border-t border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative">
          
          {/* Sticky Left Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-32" ref={ref as React.RefObject<HTMLDivElement>}>
              <div
                className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F73489] uppercase tracking-widest mb-4">
                  {t.whatido.tag}
                </div>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0D0E25] leading-tight mb-6">
                  {t.whatido.title}
                </h2>
                <div className="w-16 h-1.5 bg-[#F73489] rounded-full mb-8"></div>
                <p className="text-[#6B7280] text-lg leading-relaxed">
                  Turning complex AI capabilities into reliable, production-ready systems that scale.
                </p>
              </div>
            </div>
          </div>

          {/* Scrolling Right Column (Cards) */}
          <div className="lg:w-2/3 space-y-6">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`bg-[#F4F5F7] rounded-3xl p-8 sm:p-10 border border-[#E5E7EB] hover:border-[#F73489]/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-1 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="mono text-sm font-bold text-[#F73489] px-4 py-2 rounded-full bg-white border border-[#E5E7EB] shadow-sm">
                    {item.metric}
                  </span>
                  <span className="text-xs font-bold text-[#6B7280] uppercase tracking-widest">
                    {item.metricLabel}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#0D0E25] mb-4">
                  {item.title}
                </h3>
                <p className="text-lg text-[#4B5563] leading-relaxed">
                  {item.content}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
