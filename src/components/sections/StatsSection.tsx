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
    // Extract numeric part
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
      // easeOutExpo
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
    <section id="stats" className="section relative overflow-hidden">
      {/* Subtle gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1525] via-[#0b0f19] to-[#0d1525] pointer-events-none" />
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-14 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.stats.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0]">
            {t.stats.title}
          </h2>
        </div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {t.stats.items.map((item, i) => (
            <div
              key={item.label}
              className={`glass rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all duration-700 hover:border-emerald-500/30 hover:neon-emerald group ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: inView ? `${i * 60}ms` : "0ms" }}
            >
              {/* Terminal-style label */}
              <div className="text-[10px] mono text-[#334155] mb-2 group-hover:text-emerald-500/40 transition-colors">
                metric_{String(i + 1).padStart(2, "0")}
              </div>
              <div className="mono text-2xl sm:text-3xl font-black grad-text mb-1">
                <AnimatedValue value={item.value} started={started} />
              </div>
              <div className="text-xs text-[#64748b] leading-tight">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
