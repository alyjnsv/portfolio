import { NextRequest, NextResponse } from "next/server";

// Naive per-IP rate limit; fine for a single long-running Railway instance
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: NextRequest) {
  try {
    const { name, contact, message, website } = await req.json();

    // Honeypot: bots fill the hidden field — pretend success
    if (website) return NextResponse.json({ ok: true });

    if (
      typeof name !== "string" || !name.trim() || name.length > 100 ||
      typeof contact !== "string" || !contact.trim() || contact.length > 200 ||
      typeof message !== "string" || message.trim().length < 10 || message.length > 2000
    ) {
      return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "rate_limit" }, { status: 429 });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) {
      console.error("[contact] Telegram env vars are not configured");
      return NextResponse.json({ ok: false, error: "config" }, { status: 500 });
    }

    const date = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
    const text = [
      "✉️ <b>Новая заявка с сайта</b>",
      "",
      `📅 <b>Дата:</b> ${date} (МСК)`,
      `👤 <b>Имя:</b> ${escapeHtml(name.trim())}`,
      `📮 <b>Контакт:</b> ${escapeHtml(contact.trim())}`,
      "💬 <b>Сообщение:</b>",
      escapeHtml(message.trim()),
    ].join("\n");

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });

    if (!telegramRes.ok) {
      console.error("[contact] Telegram error:", await telegramRes.text());
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ ok: false, error: "internal" }, { status: 500 });
  }
}
