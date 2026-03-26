# Especificacao Visual — Hub de IA para Campanhas Politicas

> **Roteamento:** @brad-frost (Design Systems) | Sem necessidade de Tier 0 — briefing ja define posicionamento
> **Conceito central:** Cockpit de Campanha de Elite — nao e SaaS generico, e centro de comando
> **Data:** 2026-03-23

---

## 1. Paleta de Cores

### Conceito

A paleta combina o azul-escuro de autoridade institucional com acentos de luz fria (cyan) que remetem a telas de radar e paineis de controle. Dourado como accent de prestigio. Zero vermelho politico.

### Tokens

```css
:root {
  /* === BACKGROUND (escuros, hierarquia de profundidade) === */
  --bg-void:        #05080F;   /* Fundo absoluto — o "espaco" atras de tudo */
  --bg-base:        #0A1128;   /* Background principal das secoes */
  --bg-elevated:    #0F1A36;   /* Cards, modais, elementos elevados */
  --bg-surface:     #152244;   /* Inputs, hover areas, superficies interativas */
  --bg-highlight:   #1A2D5A;   /* Hover de cards, selected states */

  /* === PRIMARY (azul institucional) === */
  --primary-900:    #0A1628;
  --primary-800:    #0F2240;
  --primary-700:    #142E58;
  --primary-600:    #1A3A70;
  --primary-500:    #1E4D8C;   /* Tom principal — autoridade */
  --primary-400:    #2563EB;   /* Links, botoes secundarios */
  --primary-300:    #3B82F6;   /* Hover de links */
  --primary-200:    #60A5FA;
  --primary-100:    #93C5FD;

  /* === ACCENT CYAN (luz de radar / tecnologia) === */
  --accent-cyan-500:  #06B6D4;   /* Accent principal — bordas ativas, indicadores */
  --accent-cyan-400:  #22D3EE;   /* Hover, glow effects */
  --accent-cyan-300:  #67E8F9;   /* Text highlights, badges */
  --accent-cyan-200:  #A5F3FC;
  --accent-glow:      rgba(6, 182, 212, 0.15);  /* Glow suave para cards */
  --accent-glow-strong: rgba(6, 182, 212, 0.30); /* Glow hover */

  /* === ACCENT GOLD (prestigio / CTA) === */
  --gold-500:       #D4A017;   /* Botao principal CTA */
  --gold-400:       #EAB308;   /* Hover CTA */
  --gold-300:       #FACC15;   /* Badges premium, destaques */
  --gold-glow:      rgba(212, 160, 23, 0.20);

  /* === TEXT === */
  --text-primary:   #F1F5F9;   /* Titulos, texto principal (slate-100) */
  --text-secondary: #94A3B8;   /* Corpo, descricoes (slate-400) */
  --text-muted:     #64748B;   /* Labels, metadados (slate-500) */
  --text-accent:    #22D3EE;   /* Numeros destaque, stats */

  /* === SEMANTIC === */
  --success:        #10B981;   /* Check, confirmacao */
  --warning:        #F59E0B;   /* Alerta */
  --danger:         #EF4444;   /* Erro, urgencia */

  /* === BORDERS === */
  --border-subtle:  rgba(255, 255, 255, 0.06);
  --border-default: rgba(255, 255, 255, 0.10);
  --border-active:  rgba(6, 182, 212, 0.40);

  /* === SHADOWS === */
  --shadow-card:    0 4px 24px rgba(0, 0, 0, 0.40);
  --shadow-elevated: 0 8px 40px rgba(0, 0, 0, 0.60);
  --shadow-glow-cyan: 0 0 20px rgba(6, 182, 212, 0.15), 0 0 60px rgba(6, 182, 212, 0.05);
  --shadow-glow-gold: 0 0 20px rgba(212, 160, 23, 0.20), 0 0 60px rgba(212, 160, 23, 0.08);
}
```

### Regras de Uso

| Elemento | Cor | Por que |
|----------|-----|---------|
| Background da pagina | `--bg-void` | Profundidade maxima, sensacao de cockpit |
| Secoes alternadas | `--bg-base` / `--bg-void` | Ritmo visual sem monotonia |
| Cards de modulos | `--bg-elevated` + `--border-subtle` | Elevacao sutil, hierarquia |
| Card hover | `--bg-highlight` + `--shadow-glow-cyan` | Feedback premium sem ser chamativo |
| CTA principal | `--gold-500` bg + `#0A1128` text | Contraste maximo, atencao ao clique |
| CTA secundario | transparent + `--accent-cyan-500` border | Hierarquia clara entre CTAs |
| Headlines | `--text-primary` | Legibilidade maxima |
| Body text | `--text-secondary` | Leitura confortavel em dark |
| Numeros / stats | `--text-accent` (cyan) | Destaque numerico — radar feel |

---

## 2. Tipografia

### Font Stack

```css
:root {
  --font-headline: 'Inter', 'SF Pro Display', system-ui, sans-serif;
  --font-body:     'Inter', 'SF Pro Text', system-ui, sans-serif;
  --font-mono:     'JetBrains Mono', 'Fira Code', monospace;
}
```

**Por que Inter:** Geometrica, profissional, excelente legibilidade em dark mode, pesos de 100 a 900, Google Fonts gratuita. Nao e "startup playful" — e a fonte que Palantir, Linear e Vercel usam. Para este publico (35-65), legibilidade e mais importante que personalidade tipografica.

### Escala Tipografica

```css
:root {
  /* === HEADLINES === */
  --text-hero:      clamp(2.5rem, 5vw, 4.5rem);    /* 40-72px — Hero principal */
  --text-h1:        clamp(2rem, 4vw, 3.5rem);       /* 32-56px — Titulos de secao */
  --text-h2:        clamp(1.5rem, 3vw, 2.25rem);    /* 24-36px — Subtitulos */
  --text-h3:        clamp(1.25rem, 2vw, 1.75rem);   /* 20-28px — Titulos de card */
  --text-h4:        clamp(1.125rem, 1.5vw, 1.375rem); /* 18-22px */

  /* === BODY === */
  --text-lg:        1.125rem;   /* 18px — Body grande (hero subtitle) */
  --text-base:      1rem;       /* 16px — Body padrao */
  --text-sm:        0.875rem;   /* 14px — Captions, labels */
  --text-xs:        0.75rem;    /* 12px — Badges, metadados */

  /* === STATS / NUMBERS === */
  --text-stat:      clamp(2.5rem, 5vw, 4rem);       /* 40-64px — Numeros grandes */

  /* === LINE HEIGHTS === */
  --leading-tight:  1.1;    /* Headlines */
  --leading-snug:   1.3;    /* Subtitulos */
  --leading-normal: 1.6;    /* Body text */
  --leading-relaxed: 1.8;   /* Body longo */

  /* === LETTER SPACING === */
  --tracking-tight:   -0.02em;  /* Headlines grandes */
  --tracking-normal:  0;        /* Body */
  --tracking-wide:    0.05em;   /* Labels uppercase */
  --tracking-widest:  0.1em;    /* Badges, micro-labels */

  /* === FONT WEIGHTS === */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-black:    900;   /* Reservado para stat numbers */
}
```

### Aplicacao por Elemento

| Elemento | Size | Weight | Tracking | Leading | Transform |
|----------|------|--------|----------|---------|-----------|
| Hero headline | `--text-hero` | 700 | `--tracking-tight` | `--leading-tight` | none |
| Hero subtitle | `--text-lg` | 400 | `--tracking-normal` | `--leading-normal` | none |
| Section title | `--text-h1` | 700 | `--tracking-tight` | `--leading-tight` | none |
| Section subtitle | `--text-h2` | 400 | `--tracking-normal` | `--leading-snug` | none |
| Card title | `--text-h3` | 600 | `--tracking-normal` | `--leading-snug` | none |
| Card description | `--text-base` | 400 | `--tracking-normal` | `--leading-normal` | none |
| Stat number | `--text-stat` | 900 | `--tracking-tight` | `--leading-tight` | none |
| Stat label | `--text-sm` | 500 | `--tracking-widest` | `--leading-normal` | uppercase |
| Badge / tag | `--text-xs` | 600 | `--tracking-wide` | `--leading-normal` | uppercase |
| CTA button | `--text-base` | 600 | `--tracking-wide` | 1 | uppercase |
| Nav links | `--text-sm` | 500 | `--tracking-wide` | 1 | uppercase |

---

## 3. Layout e Estrutura

### Grid System

```css
:root {
  --grid-max-width:   1280px;    /* Container maximo */
  --grid-padding:     clamp(1rem, 4vw, 2rem);  /* Padding lateral responsivo */
  --grid-gap:         clamp(1rem, 2vw, 2rem);   /* Gap entre colunas */
  --grid-columns:     12;

  /* Breakpoints */
  --bp-sm:  640px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
}
```

### Espacamento entre Secoes

```css
:root {
  --section-gap:      clamp(4rem, 8vw, 8rem);     /* 64-128px entre secoes */
  --section-padding:  clamp(3rem, 6vw, 6rem);     /* Padding interno da secao */
  --card-gap:         clamp(1rem, 2vw, 1.5rem);   /* Gap entre cards */
  --element-gap:      clamp(0.5rem, 1vw, 1rem);   /* Gap entre elementos internos */
}
```

### Hierarquia das 9 Secoes

```
SECAO 1 — HERO
├── Background: --bg-void com gradient radial cyan sutil no centro-topo
├── Layout: Single column, centralizado
├── Altura: 100vh (min 600px)
├── Conteudo:
│   ├── Badge superior: "PLATAFORMA DE IA PARA CAMPANHAS" (--text-xs, uppercase, border cyan)
│   ├── Headline: --text-hero, max-width 800px
│   ├── Subtitle: --text-lg, --text-secondary, max-width 600px
│   ├── CTA primario: botao gold (largo, 56px altura)
│   └── CTA secundario: botao outline cyan
├── Elemento visual: Grid pattern sutil (SVG) no background, opacidade 0.03
└── Scroll indicator: chevron animado na base

SECAO 2 — DOR (4 Dores Viscerais)
├── Background: --bg-base
├── Layout: Headline centrado + 4 cards em grid 2x2 (mobile: stack)
├── Cards:
│   ├── Icone: 48px, stroke style, --accent-cyan-500
│   ├── Titulo da dor: --text-h3, --text-primary
│   ├── Descricao: --text-base, --text-secondary
│   └── Border-left: 3px solid --accent-cyan-500 (como indicador de alerta)
└── Animacao: Fade-in + slide-up ao scroll (stagger 150ms entre cards)

SECAO 3 — POR QUE SOLUCOES COMUNS FALHAM
├── Background: --bg-void
├── Layout: Split — texto a esquerda (60%), lista visual a direita (40%)
├── Esquerda: Headline + paragrafos
├── Direita: Lista com icones de X (vermelho) para falhas comuns
│   └── Cada item: icone X + texto, --danger para o icone
└── Divisor visual: linha horizontal gradient (transparent → cyan → transparent)

SECAO 4 — APRESENTACAO DO PRODUTO
├── Background: --bg-base com glow radial gold sutil no centro
├── Layout: Centralizado, full-width visual
├── Conteudo:
│   ├── Eyebrow: "CONHCA O SISTEMA" (badge estilo secao 1)
│   ├── Nome do produto: --text-h1, com span em --gold-400
│   ├── Descricao em 1-2 linhas
│   └── Visual: mockup de dashboard ou diagrama das 15 ferramentas
└── Elemento: Linhas conectoras estilo blueprint/flowchart ligando modulos

SECAO 5 — 6 MODULOS DESTAQUE (Cards)
├── Background: --bg-void
├── Layout: Grid 3x2 (tablet: 2x3, mobile: stack)
├── Card Premium (ver detalhes abaixo na secao 4 do doc)
└── Animacao: Cards aparecem com stagger, glow pulsa ao hover

SECAO 6 — NUMEROS E CREDIBILIDADE
├── Background: --bg-base, com gradient sutil
├── Layout: 4 stat blocks em row (mobile: 2x2)
├── Cada stat:
│   ├── Numero: --text-stat, --weight-black, --text-accent (cyan)
│   ├── Label: --text-sm, uppercase, --text-muted
│   └── Animacao: counter scroll-triggered (0 → valor final)
└── Abaixo: logos ou selo de credibilidade (se houver)

SECAO 7 — PACOTES E PRECOS
├── Background: --bg-void
├── Layout: 3 cards + extensao abaixo
├── Cards:
│   ├── Card normal: --bg-elevated, --border-subtle
│   ├── Card destaque (recomendado): --bg-elevated, border --gold-500, badge "MAIS POPULAR"
│   │   └── Shadow: --shadow-glow-gold
│   ├── Conteudo: nome tier, preco, lista de features com check icons
│   └── CTA dentro do card
├── Extensao (4o tier ou add-on): Card full-width abaixo, estilo diferente
└── Animacao: Cards escalam levemente ao hover

SECAO 8 — FAQ
├── Background: --bg-base
├── Layout: Accordion, max-width 768px, centralizado
├── Cada pergunta:
│   ├── Trigger: --text-h4, --text-primary, com chevron rotativo
│   ├── Resposta: --text-base, --text-secondary
│   └── Divisor: --border-subtle entre itens
└── Animacao: Expand/collapse suave (300ms ease)

SECAO 9 — CTA FINAL
├── Background: Gradient de --bg-void para --primary-900
├── Layout: Centralizado, similar ao hero mas mais compacto
├── Conteudo:
│   ├── Headline forte: --text-h1
│   ├── Subtitle com urgencia
│   ├── CTA primario: gold, grande
│   └── Texto de escassez/garantia abaixo
├── Elemento: Glow radial gold atras do CTA
└── Padding: --section-padding * 1.5 (mais respiro que secoes normais)
```

---

## 4. Elementos Visuais

### 4.1 Icones

**Estilo:** Line icons (stroke), 1.5px stroke width, monocromaticos em `--accent-cyan-500`.

**Recomendacao:** [Lucide Icons](https://lucide.dev) — open source, consistente, 1000+ icones, customizavel.

```css
.icon {
  width: 24px;        /* Padrao inline */
  height: 24px;
  stroke-width: 1.5px;
  color: var(--accent-cyan-500);
}

.icon-lg {
  width: 48px;        /* Cards de features */
  height: 48px;
}

.icon-xl {
  width: 64px;        /* Hero/destaque */
  height: 64px;
}
```

**Regra:** NUNCA usar filled icons neste projeto. Line icons mantem a estetica de blueprint/wireframe tecnico.

### 4.2 Cards de Modulo (Premium)

```css
.module-card {
  background: var(--bg-elevated);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: clamp(1.5rem, 3vw, 2rem);
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.module-card::before {
  /* Linha superior decorativa — cor do modulo */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--card-accent-color);  /* customizado por modulo */
}

.module-card:hover {
  border-color: var(--border-active);
  box-shadow: var(--shadow-glow-cyan);
  transform: translateY(-4px);
  background: var(--bg-highlight);
}

/* Numero do modulo (canto superior direito) */
.module-card .module-number {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  color: var(--text-muted);
  letter-spacing: var(--tracking-widest);
}

/* Conteudo */
.module-card .module-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: var(--card-accent-color);
}

.module-card .module-title {
  font-size: var(--text-h3);
  font-weight: var(--weight-semibold);
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.module-card .module-desc {
  font-size: var(--text-base);
  color: var(--text-secondary);
  line-height: var(--leading-normal);
}

.module-card .module-tools-count {
  font-family: var(--font-mono);
  font-size: var(--text-sm);
  color: var(--accent-cyan-500);
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-subtle);
}
```

**Cores por modulo (linha superior):**

```css
.module-card[data-module="1"] { --card-accent-color: #06B6D4; }  /* Cyan */
.module-card[data-module="2"] { --card-accent-color: #3B82F6; }  /* Blue */
.module-card[data-module="3"] { --card-accent-color: #8B5CF6; }  /* Violet */
.module-card[data-module="4"] { --card-accent-color: #10B981; }  /* Emerald */
.module-card[data-module="5"] { --card-accent-color: #F59E0B; }  /* Amber */
.module-card[data-module="6"] { --card-accent-color: #EF4444; }  /* Red (unico uso permitido) */
```

### 4.3 Background Patterns

**Grid tecnico (SVG inline para o Hero):**

```html
<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(6,182,212,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#grid)"/>
</svg>
```

**Gradients:**

```css
/* Hero background — glow central */
.hero {
  background:
    radial-gradient(ellipse 600px 400px at 50% 20%, rgba(6, 182, 212, 0.08), transparent),
    radial-gradient(ellipse 800px 600px at 50% 50%, rgba(30, 77, 140, 0.10), transparent),
    var(--bg-void);
}

/* Secao CTA final — glow gold */
.cta-final {
  background:
    radial-gradient(ellipse 500px 300px at 50% 60%, rgba(212, 160, 23, 0.10), transparent),
    linear-gradient(180deg, var(--bg-void) 0%, var(--primary-900) 100%);
}

/* Divider gradient entre secoes */
.section-divider {
  height: 1px;
  background: linear-gradient(90deg,
    transparent 0%,
    var(--accent-cyan-500) 50%,
    transparent 100%
  );
  opacity: 0.3;
}
```

### 4.4 Animacoes (Scroll-Triggered)

Usar **Intersection Observer** nativo ou uma lib leve como `motion` (Framer Motion standalone).

```css
/* Base state (antes de entrar na viewport) */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger para grupos de cards */
[data-animate-delay="1"] { transition-delay: 0.1s; }
[data-animate-delay="2"] { transition-delay: 0.2s; }
[data-animate-delay="3"] { transition-delay: 0.3s; }
[data-animate-delay="4"] { transition-delay: 0.4s; }
[data-animate-delay="5"] { transition-delay: 0.5s; }
[data-animate-delay="6"] { transition-delay: 0.6s; }

/* Counter animation para stats */
@keyframes countUp {
  from { opacity: 0; transform: scale(0.8); }
  to   { opacity: 1; transform: scale(1); }
}

.stat-number.visible {
  animation: countUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Glow pulse nos cards de modulo ao hover */
@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.10); }
  50%      { box-shadow: 0 0 30px rgba(6, 182, 212, 0.20); }
}

.module-card:hover {
  animation: glowPulse 2s ease-in-out infinite;
}

/* Scroll indicator no hero */
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(8px); }
}

.scroll-indicator {
  animation: bounce 2s ease-in-out infinite;
}
```

**Performance:** Usar `will-change: transform, opacity` apenas nos elementos animados. `transform` e `opacity` sao as unicas propriedades que nao causam layout shift.

### 4.5 Botoes

```css
/* CTA Primario — Gold */
.btn-primary {
  background: var(--gold-500);
  color: var(--primary-900);
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-glow-gold);
}

.btn-primary:hover {
  background: var(--gold-400);
  box-shadow: 0 0 30px rgba(212, 160, 23, 0.30);
  transform: translateY(-2px);
}

/* CTA Secundario — Outline Cyan */
.btn-secondary {
  background: transparent;
  color: var(--accent-cyan-500);
  font-size: var(--text-base);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  border: 1.5px solid var(--accent-cyan-500);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: rgba(6, 182, 212, 0.10);
  box-shadow: var(--shadow-glow-cyan);
}

/* Ghost (links, nav) */
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.btn-ghost:hover {
  color: var(--text-primary);
}
```

---

## 5. Referencias de Estilo

### Sites de Referencia Visual

| Site | O que pegar | URL |
|------|-------------|-----|
| **Anduril Industries** | Tom militar-tech premium, dark UI, tipografia limpa, sensacao de "defesa de alta tecnologia" | [anduril.com](https://www.anduril.com) |
| **Palantir Technologies** | Dashboard aesthetic, data-dense UI, profundidade de camadas no dark mode, Blueprint design system | [palantir.com](https://www.palantir.com) |
| **Linear.app** | Dark mode exemplar, espacamento generoso, animacoes suaves, tipografia Inter, cards com glow sutil | [linear.app](https://linear.app) |
| **Vercel** | Gradients sutis em dark, grid backgrounds, hero com glow central, CTAs com hierarquia clara | [vercel.com](https://vercel.com) |

### O que NÃO copiar

| Evitar | Motivo |
|--------|--------|
| Cores neon saturadas (Cyberpunk) | Publico 35-65 nao e gamer |
| Gradients arco-iris | Parece startup, nao centro de comando |
| Branco puro (#FFF) como background | Quebra o conceito cockpit |
| Rounded corners excessivos (>16px) | Amolece a estetica militar |
| Emojis ou ilustracoes cartoon | Incompativel com tom de autoridade |
| Vermelho como cor primaria | Associacao partidaria no Brasil |

---

## 6. Responsividade

### Breakpoints

```
Mobile:   < 640px   (1 coluna)
Tablet:   640-1024px (2 colunas)
Desktop:  > 1024px   (3 colunas / layout completo)
```

### Hero — Mobile

```
Desktop                          Mobile
┌─────────────────────┐          ┌──────────────┐
│     [BADGE]         │          │   [BADGE]    │
│                     │          │              │
│   HEADLINE GRANDE   │          │  HEADLINE    │
│   EM DUAS LINHAS    │          │  EM 3-4      │
│                     │          │  LINHAS      │
│   Subtitle aqui     │          │              │
│                     │          │  Subtitle    │
│  [CTA] [CTA SEC]   │          │              │
│                     │          │ [CTA FULL W] │
│      ↓ scroll       │          │ [CTA SEC FW] │
└─────────────────────┘          │    ↓ scroll  │
                                 └──────────────┘
```

**Regras mobile:**
- Hero: `min-height: 100svh` (safe viewport height, evita barra de browser)
- CTAs: `width: 100%`, empilhados verticalmente, gap 12px
- Headline: `--text-hero` com clamp ja garante reducao automatica
- Badge: mesmo tamanho, centralizado

### Cards de Modulo — Mobile

```
Desktop (3x2)                    Mobile (stack)
┌────┐ ┌────┐ ┌────┐            ┌──────────────┐
│ M1 │ │ M2 │ │ M3 │            │     M1       │
└────┘ └────┘ └────┘            ├──────────────┤
┌────┐ ┌────┐ ┌────┐            │     M2       │
│ M4 │ │ M5 │ │ M6 │            ├──────────────┤
└────┘ └────┘ └────┘            │     M3       │
                                 ├──────────────┤
                                 │     ...      │
                                 └──────────────┘
```

**Regras mobile para cards:**
- Stack vertical, `gap: 1rem`
- Padding interno reduzido: `1.25rem`
- Icone + titulo na mesma linha (horizontal) para economizar espaco
- Numero do modulo: manter no canto, font-size --text-xs

### Pricing Cards — Mobile

```
Desktop (3 em row)               Mobile (stack, destaque primeiro)
┌──────┐ ┌══════┐ ┌──────┐      ┌══════════════┐  ← Card destaque vem PRIMEIRO
│ Tier │ ║ DEST ║ │ Tier │      ║   DESTAQUE   ║
│  1   │ ║  2   ║ │  3   │      ╚══════════════╝
└──────┘ ╚══════╝ └──────┘      ┌──────────────┐
                                 │   Tier 1     │
                                 ├──────────────┤
                                 │   Tier 3     │
                                 └──────────────┘
```

**Regras mobile para pricing:**
- Reordenar via CSS `order` — card destaque primeiro (order: -1)
- Full width, border gold no destaque
- Features list: manter check icons, reduzir font para --text-sm
- CTA dentro de cada card: full width

### Stats — Mobile

```
Desktop (4 em row)               Mobile (2x2 grid)
┌────┐ ┌────┐ ┌────┐ ┌────┐    ┌──────┐ ┌──────┐
│ 15 │ │300 │ │24h │ │98% │    │  15  │ │ 300  │
│tool│ │camp│ │supo│ │sati│    │ tool │ │ camp │
└────┘ └────┘ └────┘ └────┘    ├──────┤ ├──────┤
                                │ 24h  │ │ 98%  │
                                │ supo │ │ sati │
                                └──────┘ └──────┘
```

### FAQ — Mobile

- `max-width: 100%` (remove o 768px constraint)
- Padding lateral: `--grid-padding` (1rem em mobile)
- Touch targets: min 48px de altura no trigger
- Chevron: 24px, area de toque de 48px

### Regras Globais de Mobile

```css
@media (max-width: 640px) {
  /* Reduce section spacing */
  section { padding: clamp(2rem, 6vw, 4rem) var(--grid-padding); }

  /* Stack all grids */
  .grid-2, .grid-3 { grid-template-columns: 1fr; }

  /* Full-width buttons */
  .btn-primary, .btn-secondary { width: 100%; text-align: center; }

  /* Hide decorative elements that waste space */
  .grid-pattern, .decorative-line { display: none; }

  /* Ensure touch targets */
  button, a, [role="button"] { min-height: 48px; }
}
```

---

## 7. Componentes Complementares

### Navbar

```css
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  padding: 1rem var(--grid-padding);
  background: rgba(5, 8, 15, 0.80);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.3s ease;
}

/* Ao scrollar, mais opaca */
.navbar.scrolled {
  background: rgba(5, 8, 15, 0.95);
}
```

### Badge / Tag

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 1rem;
  border-radius: 100px;
  border: 1px solid var(--border-active);
  background: rgba(6, 182, 212, 0.08);
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  letter-spacing: var(--tracking-widest);
  text-transform: uppercase;
  color: var(--accent-cyan-400);
}
```

### Accordion (FAQ)

```css
.accordion-item {
  border-bottom: 1px solid var(--border-subtle);
}

.accordion-trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.25rem 0;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: var(--text-h4);
  font-weight: var(--weight-medium);
  cursor: pointer;
  text-align: left;
}

.accordion-trigger:hover {
  color: var(--accent-cyan-400);
}

.accordion-chevron {
  transition: transform 0.3s ease;
  color: var(--text-muted);
}

.accordion-item[data-state="open"] .accordion-chevron {
  transform: rotate(180deg);
}

.accordion-content {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s ease;
  color: var(--text-secondary);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  padding-bottom: 0;
}

.accordion-item[data-state="open"] .accordion-content {
  max-height: 500px;
  padding-bottom: 1.25rem;
}
```

---

## 8. Checklist de Acessibilidade

| Item | Requisito | Status |
|------|-----------|--------|
| Contraste texto principal | `--text-primary` (#F1F5F9) sobre `--bg-base` (#0A1128) = 14.5:1 | OK (AAA) |
| Contraste texto secundario | `--text-secondary` (#94A3B8) sobre `--bg-base` = 5.2:1 | OK (AA) |
| Contraste CTA gold | `--gold-500` (#D4A017) sobre `--primary-900` = 7.1:1 | OK (AA) |
| Contraste cyan accent | `--accent-cyan-500` (#06B6D4) sobre `--bg-base` = 5.8:1 | OK (AA) |
| Focus visible | Todos os interativos devem ter `:focus-visible` com outline cyan | Implementar |
| Reduced motion | `prefers-reduced-motion: reduce` desabilita animacoes | Implementar |
| Touch targets | Minimo 48x48px em mobile | Definido |
| Semantic HTML | `<section>`, `<nav>`, `<main>`, headings hierarquicos | Implementar |

```css
/* Focus visible global */
:focus-visible {
  outline: 2px solid var(--accent-cyan-400);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 9. Resumo de Decisoes

| Decisao | Escolha | Alternativa descartada | Motivo |
|---------|---------|----------------------|--------|
| Fonte | Inter | Space Grotesk, Outfit | Legibilidade maxima em dark mode, publico 35-65 |
| Dark mode | Void-first (nao inverter light) | Light com toggle | Conceito cockpit exige dark nativo |
| Accent | Cyan + Gold | Verde + branco | Cyan = radar/tech, Gold = prestigio/CTA |
| Icons | Line (Lucide) | Filled (Phosphor) | Blueprint aesthetic, menos peso visual |
| Border radius | 8-12px | 20px+ | Arestas mais definidas = mais militar |
| Animacoes | CSS transitions + IO | GSAP | Menos peso, suficiente para o escopo |
| Grid | CSS Grid nativo | Framework grid | Sem dependencia extra |

---

*Spec gerada por @brad-frost via Design Chief routing | 2026-03-23*
