# alyjnsv.pro

Personal portfolio of **Alii Dzhansuev** — AI Automation Engineer.

**Live:** [alyjnsv.pro](https://alyjnsv.pro)

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript
- **Tailwind CSS v4** + shadcn/ui
- **three.js** — animated instanced-mesh hero background with post-processing (bloom, RGB shift)
- Deployed on **Railway**

## Features

- Bilingual (RU/EN) with a custom i18n context, no external libraries
- Contact form delivered straight to Telegram — with honeypot, per-IP rate limiting and input validation ([app/api/contact](app/api/contact/route.ts))
- Unique-visit notifications to Telegram ([app/api/visit](app/api/visit/route.ts))
- Scroll-driven section animations via a tiny `useInView` hook — no animation libraries

## Local development

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` to enable Telegram notifications:

| Variable | Purpose |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather |
| `TELEGRAM_CHAT_ID` | Chat that receives form submissions and visit notifications |

Without these, the site works fine — notifications are simply skipped.
