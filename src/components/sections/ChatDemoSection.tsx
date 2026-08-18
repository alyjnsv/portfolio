"use client";

import { useRef, useEffect, useState } from "react";
import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";

const greetingMessage = (text: string): UIMessage => ({
  id: "greeting",
  role: "assistant",
  parts: [{ type: "text", text: text + " 👋\n\nВыберите вопрос ниже или напишите свой." }],
});

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-[#4B6BFF] animate-pulse"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </div>
  );
}

export function ChatDemoSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const {
    messages,
    sendMessage,
    setMessages,
    status,
    error,
  } = useChat({
    messages: [greetingMessage(t.demo.assistant_name)],
  });

  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([greetingMessage(t.demo.assistant_name)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.demo.assistant_name]);

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isLoading]);

  const sendPreset = (text: string) => {
    if (isLoading) return;
    sendMessage({ text });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const currentInput = input;
    setInput("");
    sendMessage({ text: currentInput });
  };

  return (
    <section id="demo" className="section bg-[#F4F5F7] border-y border-[#D1D5DB]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-12 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#4B6BFF] uppercase tracking-widest mb-4">
            {t.demo.tag}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0D0E25] tracking-tight mb-4">
            {t.demo.title}
          </h2>
          <p className="text-lg text-[#6B7280] flex items-center justify-center gap-2">
            <Sparkles size={16} className="text-[#4B6BFF]" />
            {t.demo.subtitle}
          </p>
        </div>

        <div
          className={`bg-white rounded-3xl overflow-hidden border border-[#D1D5DB] shadow-lg transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] bg-[#F9FAFB]">
            <div className="flex gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#EF4444]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#10B981]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 text-sm font-bold text-[#0D0E25]">
                <Bot size={16} className="text-[#4B6BFF]" />
                {t.demo.assistant_name}
              </div>
            </div>
            <div className="w-16" />
          </div>

          <div ref={scrollRef} className="h-96 overflow-y-auto p-6 sm:p-8 space-y-6 bg-white">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    msg.role === "assistant"
                      ? "bg-[#E8F2FF] text-[#4B6BFF]"
                      : "bg-[#0D0E25] text-white"
                  }`}
                >
                  {msg.role === "assistant" ? <Bot size={18} /> : <User size={18} />}
                </div>

                <div
                  className={`max-w-[75%] px-5 py-4 text-base leading-relaxed whitespace-pre-line shadow-sm ${
                    msg.role === "assistant"
                      ? "bg-[#F4F5F7] text-[#0D0E25] rounded-3xl rounded-tl-sm"
                      : "bg-[#0D0E25] text-white rounded-3xl rounded-tr-sm"
                  }`}
                >
                  {msg.parts?.map((p) => (p.type === "text" ? p.text : "")).join("")}
                </div>
              </div>
            ))}

            {error && (
              <div className="flex justify-center">
                <div className="text-sm text-[#EF4444] bg-[#FEF2F2] border border-[#FECACA] rounded-2xl px-4 py-2">
                  Не удалось получить ответ. Попробуйте ещё раз чуть позже.
                </div>
              </div>
            )}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E8F2FF] text-[#4B6BFF] flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <div className="bg-[#F4F5F7] rounded-3xl rounded-tl-sm">
                  <TypingIndicator />
                </div>
              </div>
            )}
          </div>

          <div className="px-6 pb-4 bg-white">
            <div className="flex flex-wrap gap-2">
              {t.demo.preset_questions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendPreset(q)}
                  disabled={isLoading}
                  className="text-sm font-medium px-4 py-2 rounded-full border border-[#D1D5DB] text-[#4B5563] hover:border-[#4B6BFF] hover:text-[#4B6BFF] hover:bg-[#E8F2FF] transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <form
            onSubmit={handleFormSubmit}
            className="flex items-center gap-3 px-6 py-5 border-t border-[#E5E7EB] bg-[#F9FAFB]"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.demo.placeholder}
              disabled={isLoading}
              className="flex-1 bg-white border border-[#D1D5DB] rounded-2xl px-5 py-4 text-base text-[#0D0E25] placeholder-[#9CA3AF] focus:outline-none focus:border-[#4B6BFF] focus:ring-2 focus:ring-[#4B6BFF]/20 transition-all disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-4 rounded-2xl bg-[#0D0E25] text-white hover:bg-[#4B6BFF] disabled:opacity-50 transition-colors duration-300 cursor-pointer flex-shrink-0"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
