"use client";

import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { Send, Mail, Phone, MapPin, Clock } from "lucide-react";

export function ContactSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const cards = [
    {
      id: "github",
      href: "https://github.com/alyjnsv",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      platform: "GitHub",
      handle: "github.com/alyjnsv",
      desc: t.contact.github_desc,
      color: "hover:border-[#94a3b8]/40 hover:shadow-white/5",
      iconColor: "text-[#94a3b8]",
      glowColor: "bg-[#94a3b8]/5",
    },
    {
      id: "telegram",
      href: "https://t.me/broplemspb",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      platform: "Telegram",
      handle: "@broplemspb",
      desc: t.contact.telegram_desc,
      color: "hover:border-cyan-500/40 hover:shadow-cyan-500/5",
      iconColor: "text-cyan-400",
      glowColor: "bg-cyan-500/5",
    },
    {
      id: "email",
      href: "mailto:wavva123123123@gmail.com",
      icon: <Mail size={22} />,
      platform: "Email",
      handle: "wavva123123123@gmail.com",
      desc: t.contact.email_desc,
      color: "hover:border-violet-500/40 hover:shadow-violet-500/5",
      iconColor: "text-violet-400",
      glowColor: "bg-violet-500/5",
    },
    {
      id: "phone",
      href: "tel:+79697241848",
      icon: <Phone size={22} />,
      platform: "Телефон",
      handle: "+7 (969) 724-18-48",
      desc: t.contact.phone_desc,
      color: "hover:border-emerald-500/40 hover:shadow-emerald-500/5",
      iconColor: "text-emerald-400",
      glowColor: "bg-emerald-500/5",
    },
  ];

  return (
    <section id="contact" className="section bg-[#0b0f19]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.contact.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] mb-4">
            {t.contact.title}
          </h2>
          <p className="text-[#64748b] max-w-xl mb-6">
            {t.contact.description}
          </p>
          <div className="flex flex-wrap gap-4 mb-12 text-sm">
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <MapPin size={13} className="text-emerald-400" />
              {t.contact.location}
            </span>
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <Clock size={13} className="text-cyan-400" />
              {t.contact.format}
            </span>
          </div>
        </div>

        {/* Contact cards 2x2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {cards.map((card, i) => (
            <a
              key={card.id}
              href={card.href}
              target={card.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              id={`contact-${card.id}`}
              className={`group glass rounded-2xl p-6 flex items-center gap-5 transition-all duration-300 hover:shadow-xl ${card.color} ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: inView ? `${i * 80}ms` : "0ms" }}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 w-12 h-12 rounded-xl ${card.glowColor} border border-[#1e2d40] flex items-center justify-center ${card.iconColor} group-hover:scale-110 transition-transform duration-200`}
              >
                {card.icon}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs text-[#475569] mb-0.5">
                  {card.platform}
                </div>
                <div className="text-sm font-semibold text-[#e2e8f0] truncate">
                  {card.handle}
                </div>
                <div className="text-xs text-[#475569] mt-0.5">{card.desc}</div>
              </div>

              <div className="text-[#1e2d40] group-hover:text-[#64748b] transition-colors">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </a>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          className={`glass rounded-2xl p-6 flex items-start gap-4 transition-all duration-700 delay-400 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="text-2xl flex-shrink-0">💡</div>
          <p className="text-sm text-[#64748b] leading-relaxed">
            {t.contact.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
