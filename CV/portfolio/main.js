/*ра ═══════════════════════════════════════════
   MAIN.JS — Portfolio Interactions & Animations
═══════════════════════════════════════════ */

'use strict';

// ─── CURSOR GLOW (passive, no rAF loop) ───
const cursorGlow = document.getElementById('cursorGlow');
if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    }, { passive: true });
}

// ─── HEADER SCROLL ───
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── HAMBURGER MENU ───
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
});

navLinks?.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger?.classList.remove('active');
    });
});

// ─── COUNTER ANIMATION (Hero Stats) ───
function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const steps = 60;
    const inc = target / steps;
    let current = 0;
    let frame = 0;

    const timer = setInterval(() => {
        frame++;
        current = Math.min(Math.round(inc * frame), target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
    }, duration / steps);
}

// Observer for hero stats
const statNumbers = document.querySelectorAll('.stat-number[data-target]');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => statObserver.observe(el));

// ─── SCROLL FADE-IN ───
const fadeEls = document.querySelectorAll(
    '.stack-card, .project-card, .auto-case, .auto-stat, .contact-card, .llm-row, .rag-block, .project-row, .bento-item, .project-card-modern, .btn-expand'
);

fadeEls.forEach(el => el.classList.add('fade-in-up'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay * 100);
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
    if (!el.dataset.delay) el.dataset.delay = i % 6;
    fadeObserver.observe(el);
});

// ─── WORKFLOW SLIDER ───
const wfTrack = document.getElementById('wfTrack');
const wfDots = document.querySelectorAll('.wf-dot');
const wfPrev = document.getElementById('wfPrev');
const wfNext = document.getElementById('wfNext');
const wfSlider = document.getElementById('wfSlider');
const totalSlides = 5;
let currentSlide = 0;

function goToSlide(idx) {
    currentSlide = ((idx % totalSlides) + totalSlides) % totalSlides;
    if (wfTrack) wfTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    wfDots.forEach(d => d.classList.toggle('active', +d.dataset.dot === currentSlide));
}

wfPrev?.addEventListener('click', () => goToSlide(currentSlide - 1));
wfNext?.addEventListener('click', () => goToSlide(currentSlide + 1));
wfDots.forEach(d => d.addEventListener('click', () => goToSlide(+d.dataset.dot)));

// Auto-advance every 6s, pause on hover
let autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
wfSlider?.addEventListener('mouseenter', () => clearInterval(autoTimer));
wfSlider?.addEventListener('mouseleave', () => {
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 6000);
});

// ─── SMOOTH ACTIVE NAV LINK ───
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navItems.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.style.color = 'var(--accent)';
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ─── TILT EFFECT on project cards ───
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const tiltX = dy * -6;
        const tiltY = dx * 6;
        card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// ─── STACK CARD HOVER GLOW ───
document.querySelectorAll('.stack-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(250,93,25,0.06) 0%, var(--bg-raised) 60%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// ─── CONTACT CARD RIPPLE ───
document.querySelectorAll('.contact-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = card.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      left: ${e.clientX - rect.left - size / 2}px;
      top:  ${e.clientY - rect.top - size / 2}px;
      border-radius: 50%;
      background: rgba(250,93,25,0.15);
      transform: scale(0);
      animation: ripple-anim 0.6s ease-out forwards;
      pointer-events: none;
      z-index: 10;
    `;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
    });
});

// Inject ripple keyframe
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple-anim {
    to { transform: scale(2); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

console.log('%c[AJ] Portfolio loaded ✓', 'color: #fa5d19; font-family: monospace; font-size: 14px;');

// ─── GLOBAL SYMBOLS CANVAS ANIMATION ───
const globalSymbolsCanvas = document.getElementById('globalSymbolsCanvas');
if (globalSymbolsCanvas) {
    const ctx = globalSymbolsCanvas.getContext('2d');
    const symbols = ['01', '10', 'AI', 'API', 'LLM', 'RAG', 'n8n', 'GPT', 'JSON', 'YAML'];
    let symbolParticles = [];

    function resizeCanvas() {
        globalSymbolsCanvas.width = window.innerWidth;
        globalSymbolsCanvas.height = window.innerHeight;
        initSymbols();
    }

    function initSymbols() {
        symbolParticles = [];
        const count = Math.floor((globalSymbolsCanvas.width * globalSymbolsCanvas.height) / 18000);

        for (let i = 0; i < count; i++) {
            symbolParticles.push({
                x: Math.random() * globalSymbolsCanvas.width,
                y: Math.random() * globalSymbolsCanvas.height,
                text: symbols[Math.floor(Math.random() * symbols.length)],
                size: 12 + Math.random() * 10,
                opacity: 0.03 + Math.random() * 0.05,
                speedX: (Math.random() - 0.5) * 0.2,
                speedY: (Math.random() - 0.5) * 0.2,
                baseOpacity: 0.03 + Math.random() * 0.05
            });
        }
    }

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateSymbols() {
        ctx.clearRect(0, 0, globalSymbolsCanvas.width, globalSymbolsCanvas.height);

        symbolParticles.forEach(p => {
            // Move
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = globalSymbolsCanvas.width;
            if (p.x > globalSymbolsCanvas.width) p.x = 0;
            if (p.y < 0) p.y = globalSymbolsCanvas.height;
            if (p.y > globalSymbolsCanvas.height) p.y = 0;

            // Mouse interaction
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 120;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                p.x -= dx * force * 0.015;
                p.y -= dy * force * 0.015;
                p.opacity = p.baseOpacity + force * 0.08;
            } else {
                p.opacity = p.baseOpacity;
            }

            // Draw - dark orange for light theme
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = 'rgba(200, 80, 20, 1)';
            ctx.font = `${p.size}px JetBrains Mono, monospace`;
            ctx.fillText(p.text, p.x, p.y);
            ctx.restore();
        });

        requestAnimationFrame(animateSymbols);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateSymbols();
}

// ─── WORKFLOW DATA ───
const workflowData = {
  'rag': {
    title: 'Enterprise RAG с LEANN',
    workflows: [
      {
        name: 'Ingest Pipeline',
        nodes: 45,
        api: 3,
        stateful: true,
        description: 'Полный цикл обработки документов: загрузка, парсинг, чанкинг, создание графов через LEANN и построение векторного индекса. Поддержка PDF, DOCX, Markdown и текстовых файлов.',
        services: ['Python', 'LangChain', 'OpenAI Embeddings', 'LEANN', 'ChromaDB']
      },
      {
        name: 'Search Pipeline',
        nodes: 38,
        api: 2,
        stateful: false,
        description: 'Гибридный поиск с re-ranking через LEANN, генерация ответов через LLM с guardrails для фильтрации некорректного контента. Время отклика < 2 секунды.',
        services: ['LEANN', 'Cross-Encoder', 'GPT-4', 'Guardrails']
      }
    ]
  },
  'multi-agent': {
    title: 'Многоагентная система на n8n',
    workflows: [
      {
        name: 'Autopril Prod',
        nodes: 167,
        api: 6,
        stateful: true,
        description: 'Полный CI/CD пайплайн: чтение задач из Jira, синхронизация файлов с Dropbox, AI-рефакторинг кода через Claude/Gemini и автоматический пуш в GitHub. State machine из 47 нод для Jira.',
        services: ['Jira API', 'Anthropic Claude', 'Google Gemini', 'Dropbox API', 'GitHub API', 'Webhooks']
      },
      {
        name: 'AppRefactoring Prod',
        nodes: 41,
        api: 3,
        stateful: true,
        description: 'Автоматический рефакторинг приложений: задача из Jira запускает скачивание из GitHub через JWT, запуск рефакторинг-API и прохождение QA state machine.',
        services: ['Jira API', 'GitHub API', 'JWT Auth', 'Webhooks', 'DataTable']
      },
      {
        name: 'TeamID Provisioning',
        nodes: 11,
        api: 2,
        stateful: false,
        description: 'Микросервис провижининга GitHub-команд: создание команды, добавление участников, скачивание ZIP-репозитория и запуск деплоя — всё за один webhook-вызов.',
        services: ['GitHub Teams API', 'JWT Auth', 'Webhooks', 'ZIP API']
      }
    ]
  },
  'telegram-brief': {
    title: 'Telegram Brief',
    workflows: [
      {
        name: 'Content Pipeline',
        nodes: 102,
        api: 7,
        stateful: true,
        description: 'Мульти-форматный приём контента (PDF, URL, Markdown, DOCX, PNG) через Telegram-бот. AI-агент извлекает структуру, классифицирует контент и публикует скелет статьи. 10 маршрутов входа.',
        services: ['Telegram API', 'Google Gemini', 'Google Sheets', 'Google Drive', 'Matrix', 'PDF Parser', 'OCR']
      }
    ]
  },
  'appstore': {
    title: 'AppStore Auto',
    workflows: [
      {
        name: 'Promo Generation',
        nodes: 52,
        api: 5,
        stateful: false,
        description: 'AI-driven генерация промо-материалов для мобильных приложений. Анализ скриншотов через Vision AI, генерация контента через LLM, создание 4K-баннеров и автоматическая заливка в Google Drive.',
        services: ['Gemini Vision', 'KieAI', 'OpenRouter', 'Google Drive', 'Edit Image']
      }
    ]
  }
};

// ─── WORKFLOW MODAL ───
const workflowDetails = document.getElementById('workflowDetails');
const workflowTitle = document.getElementById('workflowTitle');
const workflowTabs = document.getElementById('workflowTabs');
const workflowContent = document.getElementById('workflowContent');
const closeWorkflowBtn = document.getElementById('closeWorkflow');
const expandBtns = document.querySelectorAll('.btn-expand');

let currentProject = null;
let currentWorkflow = null;

function renderWorkflowServices(services) {
  return services.map(service => `
    <div class="wf-service-item">${service}</div>
  `).join('');
}

function renderWorkflow(workflow, isActive) {
  return `
    <div class="workflow-slide ${isActive ? 'workflow-slide-active' : ''}" data-workflow="${workflow.name}">
      <div class="workflow-slide-header">
        <div class="workflow-slide-badges">
          <span class="wf-badge wf-badge-nodes">${workflow.nodes} нод</span>
          <span class="wf-badge wf-badge-api">${workflow.api} API</span>
          <span class="wf-badge ${workflow.stateful ? 'wf-badge-stateful' : 'wf-badge-stateless'}">
            ${workflow.stateful ? 'Stateful' : 'Stateless'}
          </span>
        </div>
      </div>
      <div class="workflow-slide-description">
        ${workflow.description}
      </div>
      <div class="wf-services">
        <div class="wf-services-title">API и сервисы</div>
        <div class="wf-services-list">
          ${renderWorkflowServices(workflow.services)}
        </div>
      </div>
    </div>
  `;
}

function openWorkflow(projectId) {
  const project = workflowData[projectId];
  if (!project) return;

  currentProject = projectId;
  currentWorkflow = project.workflows[0].name;

  workflowTitle.textContent = project.title;

  // Render tabs
  workflowTabs.innerHTML = project.workflows.map((wf, index) => `
    <button class="workflow-tab ${index === 0 ? 'workflow-tab-active' : ''}" data-tab="${wf.name}">
      ${wf.name}
    </button>
  `).join('');

  // Render content
  workflowContent.innerHTML = project.workflows.map((wf, index) =>
    renderWorkflow(wf, index === 0)
  ).join('');

  workflowDetails.classList.add('workflow-details-open');
  document.body.style.overflow = 'hidden';
}

function closeWorkflow() {
  workflowDetails.classList.remove('workflow-details-open');
  document.body.style.overflow = '';
  currentProject = null;
  currentWorkflow = null;
}

function switchWorkflow(workflowName) {
  if (!currentProject) return;

  const project = workflowData[currentProject];
  currentWorkflow = workflowName;

  // Update tabs
  document.querySelectorAll('.workflow-tab').forEach(tab => {
    tab.classList.toggle('workflow-tab-active', tab.dataset.tab === workflowName);
  });

  // Update content
  document.querySelectorAll('.workflow-slide').forEach(slide => {
    slide.classList.toggle('workflow-slide-active', slide.dataset.workflow === workflowName);
  });
}

// Event listeners
expandBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const projectId = btn.dataset.expand;
    openWorkflow(projectId);
  });
});

closeWorkflowBtn.addEventListener('click', closeWorkflow);

workflowDetails.addEventListener('click', (e) => {
  if (e.target === workflowDetails) {
    closeWorkflow();
  }
});

workflowTabs.addEventListener('click', (e) => {
  if (e.target.classList.contains('workflow-tab')) {
    switchWorkflow(e.target.dataset.tab);
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && workflowDetails.classList.contains('workflow-details-open')) {
    closeWorkflow();
  }
});

// ─── SYMBOLS CANVAS ANIMATION ───
const symbolsCanvas = document.getElementById('symbolsCanvas');
if (symbolsCanvas) {
    const ctx = symbolsCanvas.getContext('2d');
    const symbols = ['01', '10', 'AI', 'API', 'LLM', 'RAG', 'n8n', 'GPT', 'JSON', 'YAML'];
    let symbolParticles = [];

    function resizeCanvas() {
        symbolsCanvas.width = symbolsCanvas.offsetWidth;
        symbolsCanvas.height = symbolsCanvas.offsetHeight;
        initSymbols();
    }

    function initSymbols() {
        symbolParticles = [];
        const count = Math.floor((symbolsCanvas.width * symbolsCanvas.height) / 15000);

        for (let i = 0; i < count; i++) {
            symbolParticles.push({
                x: Math.random() * symbolsCanvas.width,
                y: Math.random() * symbolsCanvas.height,
                text: symbols[Math.floor(Math.random() * symbols.length)],
                size: 10 + Math.random() * 8,
                opacity: 0.02 + Math.random() * 0.05,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                baseOpacity: 0.02 + Math.random() * 0.05
            });
        }
    }

    let mouseX = 0;
    let mouseY = 0;

    symbolsCanvas.addEventListener('mousemove', (e) => {
        const rect = symbolsCanvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    symbolsCanvas.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
    });

    function animateSymbols() {
        ctx.clearRect(0, 0, symbolsCanvas.width, symbolsCanvas.height);

        symbolParticles.forEach(p => {
            // Move
            p.x += p.speedX;
            p.y += p.speedY;

            // Wrap around
            if (p.x < 0) p.x = symbolsCanvas.width;
            if (p.x > symbolsCanvas.width) p.x = 0;
            if (p.y < 0) p.y = symbolsCanvas.height;
            if (p.y > symbolsCanvas.height) p.y = 0;

            // Mouse interaction
            const dx = mouseX - p.x;
            const dy = mouseY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 100;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist;
                p.x -= dx * force * 0.02;
                p.y -= dy * force * 0.02;
                p.opacity = p.baseOpacity + force * 0.1;
            } else {
                p.opacity = p.baseOpacity;
            }

            // Draw
            ctx.save();
            ctx.globalAlpha = p.opacity;
            ctx.fillStyle = 'rgba(200, 80, 20, 1)';
            ctx.font = `${p.size}px JetBrains Mono, monospace`;
            ctx.fillText(p.text, p.x, p.y);
            ctx.restore();
        });

        requestAnimationFrame(animateSymbols);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animateSymbols();
}
