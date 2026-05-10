"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { ArrowRight, MessageCircle } from "lucide-react";

/* ── Particle canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const COUNT = 60;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16, 185, 129, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ── Counter chip ── */
function StatChip({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  return (
    <div
      className="glass rounded-xl px-5 py-3 text-center animate-fade-up opacity-0"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div className="mono text-lg font-bold grad-text">{value}</div>
      <div className="text-[10px] text-[#64748b] mt-0.5 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

export function HeroSection() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const chips = [
    { value: "4+", label: t.hero.years },
    { value: "25+", label: t.hero.systems },
    { value: "10+", label: t.hero.agents },
  ];

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#0b0f19]"
    >
      {/* Particle background */}
      <ParticleCanvas />

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" />

      {/* Radial glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-emerald-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-emerald-500/20 text-xs font-medium text-emerald-400 mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow" />
            {t.hero.badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight mb-6">
            <span
              className={`block text-[#e2e8f0] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {t.hero.title1}{" "}
              <span className="grad-text">{t.hero.title2}</span>
            </span>
            <span
              className={`block text-[#e2e8f0] transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {t.hero.title3}
            </span>
            <span
              className={`block grad-text transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {t.hero.title4}
            </span>
          </h1>

          {/* Description */}
          <p
            className={`text-[#94a3b8] text-lg sm:text-xl max-w-2xl leading-relaxed mb-10 transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            {t.hero.description}
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-wrap gap-4 mb-14 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <a
              href="#stats"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-lg hover:shadow-emerald-500/25 hover:scale-105 transition-all duration-200"
            >
              {t.hero.cta_projects}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-0.5 transition-transform"
              />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm border border-[#1e2d40] text-[#94a3b8] hover:border-emerald-500/40 hover:text-[#e2e8f0] hover:bg-emerald-500/5 transition-all duration-200"
            >
              <MessageCircle size={16} />
              {t.hero.cta_contact}
            </a>
          </div>

          {/* Stat chips */}
          <div className="flex flex-wrap gap-3">
            {chips.map((c, i) => (
              <StatChip
                key={c.label}
                value={c.value}
                label={c.label}
                delay={600 + i * 100}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <div className="w-px h-10 bg-gradient-to-b from-transparent via-emerald-500/40 to-transparent" />
        <span className="text-[10px] text-[#334155] uppercase tracking-widest mono">
          scroll
        </span>
      </div>
    </section>
  );
}
