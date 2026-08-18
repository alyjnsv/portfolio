"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";

function AnimatedValue({
  value,
  started,
}: {
  value: string;
  started: boolean;
}) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!started) return;
    const match = value.match(/[\d.]+/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const target = parseFloat(match[0]);
    const prefix = value.slice(0, value.indexOf(match[0]));
    const suffix = value.slice(value.indexOf(match[0]) + match[0].length);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target * 10) / 10;
      const formatted = Number.isInteger(target)
        ? String(Math.round(current))
        : current.toFixed(1);
      setDisplay(`${prefix}${formatted}${suffix}`);
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [started, value]);

  return <>{display}</>;
}

export function StatsSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) setStarted(true);
  }, [inView, started]);

  return (
    <section id="stats" className="section bg-[#E8F2FF] border-y border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-16 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4B6BFF] uppercase tracking-widest mb-4">
            {t.stats.tag}
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0D0E25] tracking-tight">
            {t.stats.title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {t.stats.items.map((item, i) => (
            <div
              key={item.label}
              className={`bg-white rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center border border-[#D1D5DB] transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:border-[#4B6BFF]/50 group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-[#B25EE2] mb-3 group-hover:text-[#F73489] transition-colors">
                metric_0{i + 1}
              </div>
              <div className="text-4xl sm:text-5xl font-black text-[#0D0E25] mb-2">
                <AnimatedValue value={item.value} started={started} />
              </div>
              <div className="text-sm font-medium text-[#6B7280]">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
