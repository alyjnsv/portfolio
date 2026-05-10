"use client";

import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { MapPin, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f19] via-[#0d1120] to-[#0b0f19] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.experience.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0]">
            {t.experience.title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/40 via-[#1e2d40] to-transparent" />

          <div className="space-y-8">
            {t.experience.items.map((item, i) => (
              <div
                key={item.company}
                className={`relative pl-12 md:pl-20 transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                }`}
                style={{ transitionDelay: inView ? `${i * 120}ms` : "0ms" }}
              >
                {/* Dot */}
                <div
                  className={`absolute left-2.5 md:left-6 top-6 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    item.current
                      ? "border-emerald-500 bg-emerald-500/20"
                      : "border-[#1e2d40] bg-[#0b0f19]"
                  }`}
                >
                  {item.current && (
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`glass rounded-2xl p-6 ${item.current ? "border-emerald-500/20 neon-emerald" : ""}`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {item.current && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
                            Current
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-[#e2e8f0]">
                        {item.company}
                      </h3>
                      <div className="flex items-center gap-3 mt-1 flex-wrap">
                        <span className="flex items-center gap-1 text-sm text-emerald-400 font-medium">
                          <Briefcase size={12} />
                          {item.role}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-[#475569]">
                          <MapPin size={11} />
                          {item.location}
                        </span>
                      </div>
                    </div>
                    <span className="mono text-xs text-[#475569] bg-[#111827] border border-[#1e2d40] px-3 py-1 rounded-full whitespace-nowrap">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-[#94a3b8] mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2.5 py-0.5 rounded-md bg-[#1a2236] border border-[#1e2d40] text-[#94a3b8]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
