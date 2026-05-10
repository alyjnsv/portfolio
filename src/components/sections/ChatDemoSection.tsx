"use client";

import { useRef, useEffect } from "react";
import { useLang } from "@/lib/lang-context";
import { useInView } from "@/hooks/useInView";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { useChat } from "@ai-sdk/react";

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-slow"
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </div>
  );
}

export function ChatDemoSection() {
  const { t } = useLang();
  const { ref, inView } = useInView();
  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    append,
    setMessages,
  } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "greeting",
        role: "assistant",
        content: t.demo.assistant_name + " 👋\n\nВыберите вопрос ниже или напишите свой.",
      },
    ],
  });

  // Reset greeting on language change, but only if the user hasn't started chatting
  useEffect(() => {
    if (messages.length <= 1) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: t.demo.assistant_name + " 👋\n\nВыберите вопрос ниже или напишите свой.",
        },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t.demo.assistant_name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const sendPreset = (text: string) => {
    if (isLoading) return;
    append({ role: "user", content: text });
  };

  return (
    <section id="demo" className="section relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b0f19] via-[#0d1525] to-[#0b0f19] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`mb-10 text-center transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mono mb-3">
            {t.demo.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#e2e8f0] mb-3">
            {t.demo.title}
          </h2>
          <p className="text-sm text-[#475569] flex items-center justify-center gap-1.5">
            <Sparkles size={12} className="text-emerald-400/60" />
            {t.demo.subtitle}
          </p>
        </div>

        {/* Chat window */}
        <div
          className={`glass rounded-2xl overflow-hidden border-emerald-500/10 transition-all duration-700 delay-200 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Window bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-[#1e2d40] bg-[#0d1120]">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-green-500/60" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 text-xs text-[#475569] mono">
                <Bot size={12} className="text-emerald-400" />
                {t.demo.assistant_name}
              </div>
            </div>
            <div className="w-12" />
          </div>

          {/* Messages */}
          <div className="h-72 overflow-y-auto p-5 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                    msg.role === "assistant"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot size={14} />
                  ) : (
                    <User size={14} />
                  )}
                </div>

                {/* Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "assistant"
                      ? "bg-[#111827] border border-[#1e2d40] text-[#cbd5e1] rounded-tl-sm"
                      : "bg-gradient-to-br from-emerald-500/20 to-cyan-500/15 border border-emerald-500/20 text-[#e2e8f0] rounded-tr-sm"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-[#111827] border border-[#1e2d40] rounded-2xl rounded-tl-sm">
                  <TypingIndicator />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Preset questions */}
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {t.demo.preset_questions.map((q) => (
              <button
                key={q}
                onClick={() => sendPreset(q)}
                disabled={isLoading}
                className="text-xs px-3 py-1.5 rounded-full border border-[#1e2d40] text-[#64748b] hover:border-emerald-500/30 hover:text-emerald-400 hover:bg-emerald-500/5 transition-all duration-200 disabled:opacity-40 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-3 px-5 py-4 border-t border-[#1e2d40]"
          >
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder={t.demo.placeholder}
              disabled={isLoading}
              className="flex-1 bg-[#111827] border border-[#1e2d40] rounded-xl px-4 py-2.5 text-sm text-[#e2e8f0] placeholder-[#334155] focus:outline-none focus:border-emerald-500/40 transition-colors disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-lg hover:shadow-emerald-500/20 disabled:opacity-30 transition-all duration-200 cursor-pointer flex-shrink-0"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
