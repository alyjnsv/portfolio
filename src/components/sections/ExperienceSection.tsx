"use client";

import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { MapPin, Briefcase } from "lucide-react";

export function ExperienceSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  return (
    <section id="experience" className="section bg-[#F4F5F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#B25EE2] uppercase tracking-widest mb-4">
            {t.experience.tag}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0D0E25] tracking-tight">
            {t.experience.title}
          </h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[#B25EE2] via-[#4B6BFF] to-transparent rounded-full" />

          <div className="space-y-10">
            {t.experience.items.map((item, i) => (
              <div
                key={item.company}
                className={`relative pl-12 md:pl-24 transition-all duration-700 ${
                  inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"
                }`}
                style={{ transitionDelay: inView ? `${i * 150}ms` : "0ms" }}
              >
                {/* Dot */}
                <div
                  className={`absolute left-[10px] md:left-[26px] top-8 w-6 h-6 rounded-full border-4 flex items-center justify-center bg-white ${
                    item.current
                      ? "border-[#B25EE2]"
                      : "border-[#D1D5DB]"
                  }`}
                >
                  {item.current && (
                    <div className="w-2 h-2 rounded-full bg-[#B25EE2] animate-pulse" />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`bg-white rounded-3xl p-8 border ${item.current ? "border-[#B25EE2]/30 shadow-lg" : "border-[#E5E7EB] shadow-sm"} hover:shadow-xl transition-shadow duration-300`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {item.current && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#B25EE2] bg-[#F5E8FF] px-3 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-[#B25EE2] animate-pulse" />
                            Current
                          </span>
                        )}
                        <span className="text-sm font-bold text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                      </div>
                      <h3 className="text-2xl font-black text-[#0D0E25]">
                        {item.company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="flex items-center gap-1.5 text-base text-[#4B6BFF] font-bold">
                          <Briefcase size={16} />
                          {item.role}
                        </span>
                        <span className="flex items-center gap-1.5 text-sm text-[#6B7280] font-medium">
                          <MapPin size={14} />
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-[#4B5563] mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#E8F2FF] text-[#4B6BFF]"
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
