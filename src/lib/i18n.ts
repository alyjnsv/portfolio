export type Locale = "ru" | "en";

export const translations = {
  ru: {
    nav: {
      about: "О себе",
      stats: "Цифры",
      stack: "Стек",
      experience: "Опыт",
      values: "Подход",
      demo: "AI Демо",
      contact: "Контакты",
    },
    hero: {
      badge: "Доступен для проектов",
      title1: "Не экспериментирую",
      title2: "с AI.",
      title3: "Автоматизирую",
      title4: "бизнес.",
      description:
        "Строю production-ready AI-системы: от архитектуры до деплоя и мониторинга. Специализируюсь на интеграции LLM в реальные бизнес-процессы — не демо, а рабочие системы.",
      cta_projects: "Смотреть проекты",
      cta_contact: "Связаться",
      years: "лет в IT",
      systems: "production-систем",
      agents: "AI-агентов в проде",
    },
    whatido: {
      tag: "/ Экспертиза",
      title: "Что я делаю лучше большинства",
      items: [
        {
          id: "production",
          title: "Довожу AI до production, а не до демо",
          content:
            "Большинство останавливается на «подключил GPT». Я стабилизирую вывод: JSON-schema, retry-логика, flow control, валидация, observability. Повысил precision 10 AI-агентов с 57% до 73% за 4 итерации — не переписывая архитектуру, а системно улучшая контекст, промпты и инфраструктуру.",
          metric: "57% → 73%",
          metricLabel: "precision AI-агентов",
        },
        {
          id: "pressure",
          title: "Решаю проблемы под pressure",
          content:
            "7 production-эндпоинтов возвращали 500 из-за SQL-timeout'ов. За один день: диагностировал root cause, поднял statement_timeout для тяжёлых RPC, добавил лимиты в unbounded queries, внедрил пагинацию с капом. Все эндпоинты вернули 200 OK.",
          metric: "7 за 1 день",
          metricLabel: "эндпоинтов починено",
        },
        {
          id: "fullcycle",
          title: "Full-cycle: от SQL до кнопки в UI",
          content:
            "Не разделяю «придумать» и «сделать». Пишу Edge Functions на Deno, оптимизирую PostgreSQL, собираю React-компоненты, интегрирую AI-чат с реальными данными — и всё это в одном пайплайне без передачи задач между командами.",
          metric: "1 пайплайн",
          metricLabel: "от SQL до UI",
        },
        {
          id: "infra",
          title: "Инфраструктура для AI-агентов",
          content:
            "Настроил MCP-экосистему: кастомный сервер с Jira + Pinecone RAG, Figma MCP, GitHub MCP. Разработчик в Cursor получил zero-context-switch доступ к задачам, документации, дизайну и коду. Onboarding сокращён с часов до минут.",
          metric: "4 MCP",
          metricLabel: "серверов настроено",
        },
      ],
    },
    stats: {
      tag: "/ Dashboard",
      title: "Цифры, которые говорят",
      items: [
        { value: "57→73%", label: "Precision AI-агентов" },
        { value: "25+", label: "Production систем" },
        { value: "10+", label: "AI-агентов в проде" },
        { value: "4", label: "MCP-серверов" },
        { value: "97%", label: "Экономия хранилища" },
        { value: "40%", label: "Сокращение рутины" },
        { value: "7", label: "Эндпоинтов за 1 день" },
        { value: "4+", label: "Лет в IT" },
      ],
    },
    stack: {
      tag: "/ Технологии",
      title: "Технологический стек",
      categories: [
        {
          label: "AI / LLM",
          items: [
            { name: "GPT-4o", desc: "Основной LLM для production-агентов" },
            { name: "Claude 3.5", desc: "Длинный контекст, аналитика" },
            { name: "Gemini 2.5", desc: "Vision, мультимодальные задачи" },
            { name: "LLaMA", desc: "Локальный деплой, приватность" },
            { name: "Mistral", desc: "Быстрые локальные модели" },
            { name: "Qwen", desc: "Мультиязычные задачи" },
          ],
        },
        {
          label: "Техники",
          items: [
            { name: "Prompt Engineering", desc: "Системные промпты, few-shot" },
            { name: "RAG", desc: "Retrieval-Augmented Generation" },
            { name: "Function Calling", desc: "Structured tool use" },
            { name: "MCP", desc: "Model Context Protocol" },
            { name: "JSON-schema", desc: "Валидация вывода LLM" },
            { name: "Guardrails", desc: "Безопасность и ограничения" },
          ],
        },
        {
          label: "Backend",
          items: [
            { name: "Python", desc: "Основной язык бэкенда" },
            { name: "TypeScript", desc: "Edge Functions, API" },
            { name: "FastAPI", desc: "REST API для AI-сервисов" },
            { name: "PostgreSQL", desc: "Оптимизация тяжёлых запросов" },
            { name: "Supabase", desc: "Edge Functions + Auth + DB" },
            { name: "Deno", desc: "Runtime для Edge Functions" },
          ],
        },
        {
          label: "Автоматизация",
          items: [
            { name: "n8n", desc: "Low-code workflow автоматизация" },
            { name: "REST API", desc: "Интеграции с внешними сервисами" },
            { name: "Webhooks", desc: "Event-driven триггеры" },
            { name: "OAuth 2.0", desc: "Аутентификация API" },
            { name: "ETL", desc: "Пайплайны обработки данных" },
          ],
        },
        {
          label: "Инфраструктура",
          items: [
            { name: "Docker", desc: "Контейнеризация сервисов" },
            { name: "Linux", desc: "Серверное администрирование" },
            { name: "CI/CD", desc: "Автодеплой и тестирование" },
            { name: "Pinecone", desc: "Vector DB для RAG" },
          ],
        },
        {
          label: "Frontend",
          items: [
            { name: "React", desc: "Компонентная архитектура UI" },
            { name: "React Query", desc: "Кэширование и синхронизация" },
            { name: "Tailwind CSS", desc: "Utility-first стилизация" },
            { name: "Next.js", desc: "Full-stack React фреймворк" },
          ],
        },
      ],
    },
    experience: {
      tag: "/ Опыт",
      title: "Карьерный путь",
      items: [
        {
          company: "RED AI",
          location: "Дубай, удалённо",
          role: "AI Automation Engineer",
          period: "Апрель 2026 — настоящее время",
          current: true,
          description:
            "AI-агенты, мониторинг инфраструктуры, SQL-оптимизация, ETL, production stability.",
          tags: ["AI Agents", "SQL", "ETL", "Monitoring"],
        },
        {
          company: "Softintermob LLC",
          location: "Москва",
          role: "AI Engineer",
          period: "Август 2025 — Апрель 2026",
          current: false,
          description:
            "MCP-инфраструктура, многоагентная автоматизация n8n, локальные LLM, менторинг команды.",
          tags: ["MCP", "n8n", "Local LLM", "Mentoring"],
        },
        {
          company: "TBG",
          location: "Россия",
          role: "Data Engineer",
          period: "Ноябрь 2024 — Июль 2025",
          current: false,
          description:
            "ETL-пайплайны, автоматизация обработки данных, Docker, дашборды для аналитики.",
          tags: ["ETL", "Docker", "Dashboards", "Python"],
        },
      ],
    },
    values: {
      tag: "/ Подход",
      title: "Как я работаю",
      items: [
        {
          icon: "Shield",
          title: "Самостоятельность и ownership",
          description:
            "Не жду указаний — анализирую проблему, предлагаю решение, реализую, измеряю результат.",
        },
        {
          icon: "Brain",
          title: "Системное мышление",
          description:
            "Вижу end-to-end: от боли бизнеса до конечной метрики. Дроблю сложные задачи на этапы.",
        },
        {
          icon: "Zap",
          title: "Production-first",
          description:
            "Retry, лимиты, observability, аудит-логи — закладываю сразу, а не «потом допилим».",
        },
        {
          icon: "Rocket",
          title: "Стартапный темп",
          description:
            "Привык к неидеальным вводным: плохо описан процесс, данные лежат неровно — всё равно довожу до рабочей конструкции.",
        },
      ],
    },
    demo: {
      tag: "/ AI Demo",
      title: "Спроси AI-ассистента",
      subtitle: "Демо-режим с предустановленными ответами",
      placeholder: "Напиши свой вопрос...",
      send: "Отправить",
      preset_questions: [
        "Какие AI-проекты ты запускал в production?",
        "Как ты повысил precision AI-агентов до 73%?",
        "Расскажи про MCP-инфраструктуру, которую ты настраивал",
      ],
      answers: {
        "Какие AI-проекты ты запускал в production?":
          "В production у меня работают: система мониторинга инфраструктуры с 4 типами аномалий, 10 AI-агентов с precision 73%, Enterprise RAG с экономией хранилища 97%, и многоагентная система на n8n со 219 нодами. Все системы обрабатывают реальные бизнес-задачи, не демо.",
        "Как ты повысил precision AI-агентов до 73%?":
          "За 4 итерации: сначала диагностировал каждого агента отдельно, нашёл баги в Edge Functions. Затем расширил контекст, улучшил промпты с JSON-schema валидацией, добавил retry-логику. Результат: 57% → 73% без переписывания архитектуры — только системная оптимизация.",
        "Расскажи про MCP-инфраструктуру, которую ты настраивал":
          "Настроил 4 MCP-сервера: кастомный с интеграцией Jira + Pinecone RAG, Figma MCP для дизайн-токенов, GitHub MCP для кода, и корпоративный с документацией. Разработчик в Cursor получил zero-context-switch доступ ко всему. Onboarding сократился с часов до минут.",
      },
      default_answer:
        "Отличный вопрос! Готов обсудить детали в личной беседе. Напишите мне в Telegram @broplemspb — расскажу про конкретный кейс с цифрами и деталями реализации.",
      assistant_name: "Алий — AI ассистент",
    },
    contact: {
      tag: "/ Контакты",
      title: "Готов к сотрудничеству",
      description:
        "Ищу роль AI Automation Engineer / Applied AI Engineer в продуктовой команде. Удалённо, full-time, USD.",
      location: "Санкт-Петербург (UTC+3)",
      format: "Удалённо · Full-time · USD",
      github_desc: "Активный репозиторий с AI-проектами",
      telegram_desc: "Для оперативной связи",
      email_desc: "Деловая переписка",
      phone_desc: "Позвонить напрямую",
      disclaimer:
        "Все проекты реализованы в production. Готов предоставить технические детали, code review или live-демонстрацию.",
    },
    footer: {
      rights: "Все права защищены",
      tagline: "Production AI · Санкт-Петербург",
    },
  },
  en: {
    nav: {
      about: "About",
      stats: "Stats",
      stack: "Stack",
      experience: "Experience",
      values: "Values",
      demo: "AI Demo",
      contact: "Contact",
    },
    hero: {
      badge: "Available for projects",
      title1: "I don't",
      title2: "experiment",
      title3: "with AI. I",
      title4: "automate business.",
      description:
        "I build production-ready AI systems: from architecture to deployment and monitoring. I specialize in integrating LLMs into real business processes — not demos, but working systems that handle load and impact metrics.",
      cta_projects: "View projects",
      cta_contact: "Contact me",
      years: "years in IT",
      systems: "production systems",
      agents: "AI agents in prod",
    },
    whatido: {
      tag: "/ Expertise",
      title: "What I do better than most",
      items: [
        {
          id: "production",
          title: "I bring AI to production, not just demos",
          content:
            "Most people stop at 'connected GPT'. I stabilize the output: JSON-schema, retry logic, flow control, validation, observability. Raised precision of 10 AI agents from 57% to 73% in 4 iterations — not by rewriting the architecture, but by systematically improving context, prompts and infrastructure.",
          metric: "57% → 73%",
          metricLabel: "AI agent precision",
        },
        {
          id: "pressure",
          title: "I solve problems under pressure",
          content:
            "7 production endpoints were returning 500 due to SQL timeouts. In one day: diagnosed root cause, raised statement_timeout for heavy RPCs, added limits to unbounded queries, implemented pagination with a cap. All endpoints returned 200 OK.",
          metric: "7 in 1 day",
          metricLabel: "endpoints fixed",
        },
        {
          id: "fullcycle",
          title: "Full-cycle: from SQL to UI button",
          content:
            "I don't separate 'design' from 'build'. I write Edge Functions in Deno, optimize PostgreSQL, build React components, integrate AI chat with real data — all in one pipeline without handing off tasks between teams.",
          metric: "1 pipeline",
          metricLabel: "SQL to UI",
        },
        {
          id: "infra",
          title: "Infrastructure for AI agents",
          content:
            "Set up an MCP ecosystem: custom server with Jira + Pinecone RAG, Figma MCP, GitHub MCP. Developers in Cursor got zero-context-switch access to tasks, documentation, design and code. Onboarding reduced from hours to minutes.",
          metric: "4 MCP",
          metricLabel: "servers configured",
        },
      ],
    },
    stats: {
      tag: "/ Dashboard",
      title: "Numbers that speak",
      items: [
        { value: "57→73%", label: "AI Agent Precision" },
        { value: "25+", label: "Production Systems" },
        { value: "10+", label: "AI Agents in Prod" },
        { value: "4", label: "MCP Servers" },
        { value: "97%", label: "Storage Savings" },
        { value: "40%", label: "Routine Reduction" },
        { value: "7", label: "Endpoints in 1 Day" },
        { value: "4+", label: "Years in IT" },
      ],
    },
    stack: {
      tag: "/ Technologies",
      title: "Technology Stack",
      categories: [
        {
          label: "AI / LLM",
          items: [
            { name: "GPT-4o", desc: "Primary LLM for production agents" },
            { name: "Claude 3.5", desc: "Long context, analytics" },
            { name: "Gemini 2.5", desc: "Vision, multimodal tasks" },
            { name: "LLaMA", desc: "Local deployment, privacy" },
            { name: "Mistral", desc: "Fast local models" },
            { name: "Qwen", desc: "Multilingual tasks" },
          ],
        },
        {
          label: "Techniques",
          items: [
            { name: "Prompt Engineering", desc: "System prompts, few-shot" },
            { name: "RAG", desc: "Retrieval-Augmented Generation" },
            { name: "Function Calling", desc: "Structured tool use" },
            { name: "MCP", desc: "Model Context Protocol" },
            { name: "JSON-schema", desc: "LLM output validation" },
            { name: "Guardrails", desc: "Safety and constraints" },
          ],
        },
        {
          label: "Backend",
          items: [
            { name: "Python", desc: "Primary backend language" },
            { name: "TypeScript", desc: "Edge Functions, API" },
            { name: "FastAPI", desc: "REST API for AI services" },
            { name: "PostgreSQL", desc: "Heavy query optimization" },
            { name: "Supabase", desc: "Edge Functions + Auth + DB" },
            { name: "Deno", desc: "Edge Functions runtime" },
          ],
        },
        {
          label: "Automation",
          items: [
            { name: "n8n", desc: "Low-code workflow automation" },
            { name: "REST API", desc: "External service integrations" },
            { name: "Webhooks", desc: "Event-driven triggers" },
            { name: "OAuth 2.0", desc: "API authentication" },
            { name: "ETL", desc: "Data processing pipelines" },
          ],
        },
        {
          label: "Infrastructure",
          items: [
            { name: "Docker", desc: "Service containerization" },
            { name: "Linux", desc: "Server administration" },
            { name: "CI/CD", desc: "Auto-deploy and testing" },
            { name: "Pinecone", desc: "Vector DB for RAG" },
          ],
        },
        {
          label: "Frontend",
          items: [
            { name: "React", desc: "Component architecture" },
            { name: "React Query", desc: "Caching and sync" },
            { name: "Tailwind CSS", desc: "Utility-first styling" },
            { name: "Next.js", desc: "Full-stack React framework" },
          ],
        },
      ],
    },
    experience: {
      tag: "/ Experience",
      title: "Career Path",
      items: [
        {
          company: "RED AI",
          location: "Dubai, remote",
          role: "AI Automation Engineer",
          period: "April 2026 — present",
          current: true,
          description:
            "AI agents, infrastructure monitoring, SQL optimization, ETL, production stability.",
          tags: ["AI Agents", "SQL", "ETL", "Monitoring"],
        },
        {
          company: "Softintermob LLC",
          location: "Moscow",
          role: "AI Engineer",
          period: "August 2025 — April 2026",
          current: false,
          description:
            "MCP infrastructure, multi-agent n8n automation, local LLMs, team mentoring.",
          tags: ["MCP", "n8n", "Local LLM", "Mentoring"],
        },
        {
          company: "TBG",
          location: "Russia",
          role: "Data Engineer",
          period: "November 2024 — July 2025",
          current: false,
          description:
            "ETL pipelines, automated data processing, Docker, analytics dashboards.",
          tags: ["ETL", "Docker", "Dashboards", "Python"],
        },
      ],
    },
    values: {
      tag: "/ Approach",
      title: "How I work",
      items: [
        {
          icon: "Shield",
          title: "Autonomy & ownership",
          description:
            "I don't wait for instructions — I analyze the problem, propose a solution, implement it, measure the result.",
        },
        {
          icon: "Brain",
          title: "Systems thinking",
          description:
            "I see end-to-end: from business pain to final metric. I break complex tasks into stages and choose the pragmatic path.",
        },
        {
          icon: "Zap",
          title: "Production-first",
          description:
            "Retry, limits, observability, audit logs — I build them in from the start, not 'we'll add it later'.",
        },
        {
          icon: "Rocket",
          title: "Startup pace",
          description:
            "Used to imperfect inputs: poorly described process, messy data, limited access — I still deliver a working solution.",
        },
      ],
    },
    demo: {
      tag: "/ AI Demo",
      title: "Ask the AI assistant",
      subtitle: "Demo mode with preset answers",
      placeholder: "Write your question...",
      send: "Send",
      preset_questions: [
        "What AI projects have you shipped to production?",
        "How did you raise AI agent precision to 73%?",
        "Tell me about the MCP infrastructure you set up",
      ],
      answers: {
        "What AI projects have you shipped to production?":
          "In production I have: an infrastructure monitoring system with 4 anomaly types, 10 AI agents with 73% precision, Enterprise RAG with 97% storage savings, and a multi-agent n8n system with 219 nodes. All systems handle real business tasks, not demos.",
        "How did you raise AI agent precision to 73%?":
          "Over 4 iterations: first diagnosed each agent individually, found bugs in Edge Functions. Then expanded context, improved prompts with JSON-schema validation, added retry logic. Result: 57% → 73% without rewriting the architecture — only systematic optimization.",
        "Tell me about the MCP infrastructure you set up":
          "Set up 4 MCP servers: custom one with Jira + Pinecone RAG integration, Figma MCP for design tokens, GitHub MCP for code, and a corporate one with documentation. Developers in Cursor got zero-context-switch access to everything. Onboarding reduced from hours to minutes.",
      },
      default_answer:
        "Great question! I'm happy to discuss details in a personal conversation. Message me on Telegram @broplemspb — I'll tell you about the specific case with numbers and implementation details.",
      assistant_name: "Aliy — AI assistant",
    },
    contact: {
      tag: "/ Contact",
      title: "Ready to collaborate",
      description:
        "Looking for an AI Automation Engineer / Applied AI Engineer role in a product team. Remote, full-time, USD.",
      location: "Saint Petersburg (UTC+3)",
      format: "Remote · Full-time · USD",
      github_desc: "Active repository with AI projects",
      telegram_desc: "For quick communication",
      email_desc: "Business correspondence",
      phone_desc: "Call directly",
      disclaimer:
        "All projects are in production. Happy to provide technical details, code review or live demo.",
    },
    footer: {
      rights: "All rights reserved",
      tagline: "Production AI · Saint Petersburg",
    },
  },
} as const;

export type TranslationKey = typeof translations;
