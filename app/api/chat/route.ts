import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Normalize UI messages to pure text CoreMessages for OpenRouter compatibility
    const coreMessages = messages.map((msg: any) => ({
      role: msg.role,
      content: msg.parts?.map((p: any) => p.text).join("") || msg.content || "",
    }));

    // Extract the latest user message
    const lastMessage = coreMessages[coreMessages.length - 1];

    // Fire and forget Telegram notification
    if (lastMessage && lastMessage.role === "user") {
      sendTelegramNotification(lastMessage.content).catch(console.error);
    }

    const systemPrompt = `Ты — AI-ассистент Алия Джансуева (Aliy Dzhansuev), AI Automation Engineer.
Твоя задача — отвечать на вопросы о его опыте, навыках и проектах кратко, профессионально и по делу. 

Краткая выжимка из резюме:
- Роль: AI Automation Engineer / Applied AI Engineer.
- Опыт: 4+ года в IT. Доводит AI до production. Настраивал MCP, RAG, n8n, Edge Functions.
- Метрики: Повысил precision 10 AI-агентов с 57% до 73%. Запускал 25+ production систем.
- Стек: GPT-4o, Claude 3.5, Gemini, Python, TypeScript, n8n, SQL, Deno, FastAPI, PostgreSQL, Supabase, Docker.
- Текущая работа: RED AI (Дубай, удалённо) с апреля 2026.
- Как работает: Самостоятельность, системное мышление, production-first подход.
- Цель: Ищет работу удалённо, full-time, USD.
- Контакты: Telegram @broplemspb, Почта hello@alyjnsv.pro.

Если вопрос выходит за рамки профессионального опыта Алия, вежливо верни разговор к его навыкам.
Отвечай кратко, емко, желательно 1-3 абзацами.`;

    const result = streamText({
      model: openrouter.chat("meta-llama/llama-3.2-3b-instruct:free"),
      system: systemPrompt,
      messages: coreMessages,
      maxOutputTokens: 500,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error("[chat] Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}

async function sendTelegramNotification(question: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const date = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const text = [
    "🤖 <b>Новый вопрос в AI Chat</b>",
    "",
    `📅 <b>Дата:</b> ${date} (МСК)`,
    `💬 <b>Вопрос:</b>`,
    `<i>${question}</i>`
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
    }),
  });
}
