"use client";

import { useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "sending" | "success" | "error" | "validation";

function ContactForm() {
  const { t } = useLang();
  const f = t.contact.form;
  const [status, setStatus] = useState<FormStatus>("idle");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || message.trim().length < 10) {
      setStatus("validation");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, message, website }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setName("");
      setContact("");
      setMessage("");
    } catch (err) {
      console.error("[contact-form]", err);
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-white border border-[#D1D5DB] rounded-2xl px-5 py-4 text-base text-[#0D0E25] placeholder-[#9CA3AF] focus:outline-none focus:border-[#4B6BFF] focus:ring-2 focus:ring-[#4B6BFF]/20 transition-all disabled:opacity-50";

  if (status === "success") {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-12">
        <div className="w-16 h-16 rounded-full bg-[#E6F8F0] text-[#2CB67D] flex items-center justify-center">
          <CheckCircle2 size={32} />
        </div>
        <p className="text-lg font-bold text-[#0D0E25]">{f.success}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={f.name_placeholder}
          maxLength={100}
          disabled={status === "sending"}
          className={inputCls}
        />
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={f.contact_placeholder}
          maxLength={200}
          disabled={status === "sending"}
          className={inputCls}
        />
      </div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={f.message_placeholder}
        maxLength={2000}
        rows={4}
        disabled={status === "sending"}
        className={`${inputCls} resize-none`}
      />
      {/* Honeypot: hidden from humans, tempting for bots */}
      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {(status === "error" || status === "validation") && (
        <p className="text-sm font-medium text-[#EF4444]">
          {status === "error" ? f.error : f.validation}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm bg-[#0D0E25] text-white hover:bg-[#4B6BFF] disabled:opacity-60 transition-all duration-300 sm:self-start cursor-pointer"
      >
        {status === "sending" ? f.sending : f.submit}
        <Send size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}

export function ContactSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();

  const cards = [
    {
      id: "github",
      href: "https://github.com/alyjnsv",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      platform: "GitHub",
      handle: "github.com/alyjnsv",
      desc: t.contact.github_desc,
      color: "hover:border-[#0D0E25] hover:shadow-xl",
      iconColor: "text-white",
      glowColor: "bg-[#0D0E25]",
    },
    {
      id: "telegram",
      href: "https://t.me/broplemspb",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
      platform: "Telegram",
      handle: "@broplemspb",
      desc: t.contact.telegram_desc,
      color: "hover:border-[#0088CC] hover:shadow-xl",
      iconColor: "text-white",
      glowColor: "bg-[#0088CC]",
    },
    {
      id: "email",
      href: "mailto:hello@alyjnsv.pro",
      icon: <Mail size={24} />,
      platform: "Email",
      handle: "hello@alyjnsv.pro",
      desc: t.contact.email_desc,
      color: "hover:border-[#B25EE2] hover:shadow-xl",
      iconColor: "text-white",
      glowColor: "bg-[#B25EE2]",
    },
    {
      id: "phone",
      href: "tel:+79697241848",
      icon: <Phone size={24} />,
      platform: "Телефон",
      handle: "+7 (969) 724-18-48",
      desc: t.contact.phone_desc,
      color: "hover:border-[#2CB67D] hover:shadow-xl",
      iconColor: "text-white",
      glowColor: "bg-[#2CB67D]",
    },
  ];

  return (
    <section id="contact" className="section bg-white border-y border-[#D1D5DB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          <div className="md:w-1/3">
            <div
              ref={ref as React.RefObject<HTMLDivElement>}
              className={`mb-8 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#F73489] uppercase tracking-widest mb-4">
                {t.contact.tag}
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#0D0E25] mb-6">
                {t.contact.title}
              </h2>
              <p className="text-lg text-[#6B7280] mb-8">
                {t.contact.description}
              </p>
              
              <div className="flex flex-col gap-4 text-base font-medium">
                <span className="flex items-center gap-3 text-[#4B5563]">
                  <div className="w-10 h-10 rounded-full bg-[#E8F2FF] text-[#4B6BFF] flex items-center justify-center">
                    <MapPin size={18} />
                  </div>
                  {t.contact.location}
                </span>
                <span className="flex items-center gap-3 text-[#4B5563]">
                  <div className="w-10 h-10 rounded-full bg-[#E6F8F0] text-[#2CB67D] flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  {t.contact.format}
                </span>
              </div>
            </div>
            
            <div
              className={`bg-[#F4F5F7] rounded-3xl p-6 mt-10 flex items-start gap-4 transition-all duration-700 delay-200 border border-[#E5E7EB] ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="text-2xl flex-shrink-0">💡</div>
              <p className="text-sm font-medium text-[#6B7280] leading-relaxed">
                {t.contact.disclaimer}
              </p>
            </div>
          </div>

          <div className="md:w-2/3 flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map((card, i) => (
                <a
                  key={card.id}
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  id={`contact-${card.id}`}
                  className={`group bg-white border border-[#D1D5DB] rounded-3xl p-8 flex flex-col gap-6 transition-all duration-300 ${card.color} ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: inView ? `${i * 100}ms` : "0ms" }}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex-shrink-0 w-16 h-16 rounded-2xl ${card.glowColor} flex items-center justify-center ${card.iconColor} shadow-md group-hover:scale-110 transition-transform duration-300`}
                    >
                      {card.icon}
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#F4F5F7] text-[#6B7280] flex items-center justify-center group-hover:bg-[#0D0E25] group-hover:text-white transition-colors">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#9CA3AF] uppercase tracking-wider mb-1">
                      {card.platform}
                    </div>
                    <div className="text-xl font-bold text-[#0D0E25] mb-2 truncate">
                      {card.handle}
                    </div>
                    <div className="text-sm font-medium text-[#6B7280] leading-relaxed">
                      {card.desc}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div
              className={`bg-[#F4F5F7] border border-[#E5E7EB] rounded-3xl p-8 sm:p-10 transition-all duration-700 delay-300 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <h3 className="text-2xl font-black text-[#0D0E25] mb-2">
                {t.contact.form.title}
              </h3>
              <p className="text-sm font-medium text-[#6B7280] mb-6">
                {t.contact.form.subtitle}
              </p>
              <ContactForm />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
