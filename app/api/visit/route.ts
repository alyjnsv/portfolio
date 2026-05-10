import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { timestamp, userAgent, language } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      // Env vars not configured — silently succeed so site doesn't break
      return NextResponse.json({ ok: true });
    }

    const device = getUserDevice(userAgent ?? "");
    const lang = language ?? "unknown";
    const date = new Date(timestamp ?? Date.now()).toLocaleString("ru-RU", {
      timeZone: "Europe/Moscow",
    });

    const text = [
      "🌐 <b>Новое уникальное посещение</b>",
      "",
      `📅 <b>Дата:</b> ${date} (МСК)`,
      `📱 <b>Устройство:</b> ${device}`,
      `🌍 <b>Язык браузера:</b> ${lang}`,
      `🔗 <b>User-Agent:</b> <code>${(userAgent ?? "").slice(0, 120)}</code>`,
    ].join("\n");

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
      }
    );

    if (!telegramRes.ok) {
      const err = await telegramRes.text();
      console.error("[visit] Telegram error:", err);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[visit] Unexpected error:", err);
    // Never let this break the site
    return NextResponse.json({ ok: true });
  }
}

function getUserDevice(ua: string): string {
  if (/mobile|android|iphone|ipad/i.test(ua)) {
    if (/iphone/i.test(ua)) return "iPhone (iOS)";
    if (/ipad/i.test(ua)) return "iPad (iOS)";
    if (/android/i.test(ua)) return "Android Mobile";
    return "Mobile";
  }
  if (/macintosh|mac os x/i.test(ua)) return "Mac (Desktop)";
  if (/windows/i.test(ua)) return "Windows (Desktop)";
  if (/linux/i.test(ua)) return "Linux (Desktop)";
  return "Unknown";
}
