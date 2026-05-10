import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/lang-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Алий Джансуев — AI Automation Engineer",
  description:
    "Строю production-ready AI-системы: от архитектуры до деплоя. RAG, n8n, LLM-агенты, MCP. Реальные решения, измеримые результаты.",
  keywords: [
    "AI Engineer",
    "Automation",
    "LLM",
    "RAG",
    "n8n",
    "Production AI",
    "Алий Джансуев",
  ],
  authors: [{ name: "Алий Джансуев" }],
  openGraph: {
    title: "Алий Джансуев — AI Automation Engineer",
    description:
      "Production-ready AI системы: RAG, n8n автоматизация, LLM агенты.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
