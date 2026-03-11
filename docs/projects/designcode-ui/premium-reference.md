# DesignCode UI — Referência Premium

> **Documento de análise visual** para extração de padrões premium reutilizáveis
> **Fonte:** [DesignCode UI Figma](https://www.figma.com/design/zQDO3tbtArViznGtpZDubA)
> **Criado em:** 2026-03-10

---

## 1. Análise de Estilo Visual

### Paleta de Cores (Dark Premium)

**Base gradiente mesh:**
```css
/* Gradiente principal (Background Web 1/2) */
background: radial-gradient(circle at 30% 20%,
  hsl(250, 80%, 40%) 0%,     /* Roxo intenso */
  hsl(220, 85%, 45%) 30%,    /* Azul profundo */
  hsl(280, 70%, 35%) 60%,    /* Rosa escuro */
  hsl(230, 75%, 20%) 100%    /* Azul quase preto */
);
```

**Superfícies glassmorphism:**
```css
/* Cards com efeito vidro */
background: rgba(255, 255, 255, 0.08);
backdrop-filter: blur(24px) saturate(180%);
border: 1px solid rgba(255, 255, 255, 0.18);
```

**Bordas luminosas:**
```css
/* Bordas com glow sutil */
border: 1px solid rgba(120, 119, 198, 0.3);
box-shadow: 0 0 20px rgba(120, 119, 198, 0.15);
```

**Cores de acento:**
| Uso | HSL | Hex Aprox | Aplicação |
|-----|-----|-----------|-----------|
| Primary | `hsl(250, 75%, 60%)` | `#9B8AFF` | Botões, links |
| Success | `hsl(150, 70%, 55%)` | `#4CAF8C` | Finance cards, status |
| Warning | `hsl(35, 90%, 60%)` | `#FFB84D` | Alertas, badges |
| Glow Azul | `hsl(220, 85%, 65%)` | `#6B9EFF` | Efeitos de hover |
| Glow Rosa | `hsl(320, 75%, 60%)` | `#FF6BCF` | Highlights secundários |

---

## 2. Padrões Premium Extraídos

### 2.1. Glassmorphism System

**3 níveis de profundidade:**

```css
/* Level 1 - Card base */
.glass-card-base {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
}

/* Level 2 - Elevated card */
.glass-card-elevated {
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(32px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.20);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* Level 3 - Modal/Popover */
.glass-modal {
  background: rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.20);
}
```

**Onde aplicar:**
- **Level 1:** Template cards, FAQ cards, Reply cards
- **Level 2:** Finance card, Pricing card, Notification card
- **Level 3:** Payment modal, Popover, Alert

---

### 2.2. Glow Effects System

**Botões com brilho (Button Shiny):**

```css
.btn-shiny {
  background: linear-gradient(135deg,
    hsl(250, 75%, 60%) 0%,
    hsl(280, 70%, 55%) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow:
    0 4px 16px rgba(155, 138, 255, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.25);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-shiny:hover {
  box-shadow:
    0 8px 32px rgba(155, 138, 255, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
  transform: translateY(-2px);
}
```

**Finance card glow (gráfico):**

```css
.finance-graph-glow {
  filter: drop-shadow(0 0 24px rgba(76, 175, 140, 0.6));
}

/* Line chart path */
.chart-line {
  stroke: hsl(150, 70%, 55%);
  stroke-width: 2px;
  filter: drop-shadow(0 0 8px currentColor);
}
```

**Onde aplicar:**
- **Botões CTAs primários:** Box-shadow colorido com blur alto
- **Gráficos e visualizações:** Drop-shadow na cor do dado
- **Hover states:** Aumentar blur e spread do glow
- **Icons de sucesso:** Glow verde em check marks

---

### 2.3. Gradient Mesh Backgrounds

**Padrão de composição:**

```css
/* Background Web 1 — Hero section */
.bg-mesh-hero {
  background:
    radial-gradient(circle at 25% 15%,
      hsla(250, 80%, 40%, 0.8) 0%,
      transparent 50%
    ),
    radial-gradient(circle at 75% 85%,
      hsla(280, 70%, 35%, 0.6) 0%,
      transparent 50%
    ),
    radial-gradient(circle at 50% 50%,
      hsla(220, 85%, 45%, 0.9) 0%,
      transparent 60%
    ),
    hsl(230, 75%, 12%); /* Base escura */
}

/* Background Web 2 — Components section */
.bg-mesh-dark {
  background:
    radial-gradient(circle at 80% 20%,
      hsla(220, 85%, 50%, 0.3) 0%,
      transparent 40%
    ),
    radial-gradient(circle at 20% 80%,
      hsla(280, 70%, 40%, 0.25) 0%,
      transparent 45%
    ),
    hsl(230, 70%, 8%); /* Quase preto */
}
```

**Técnica de overlay:**
```css
/* Adicionar noise/grain para textura */
.bg-mesh::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E");
  pointer-events: none;
  mix-blend-mode: overlay;
}
```

**Onde aplicar:**
- **Landing pages:** Hero section com mesh vibrante
- **Sections de features:** Mesh sutil no background
- **Dashboards:** Mesh escuro com baixa opacidade

---

### 2.4. Card Elevation System

**3 níveis de hierarquia:**

```css
/* Base — Cards de listagem */
.card-base {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.10);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Elevated — Cards de destaque */
.card-elevated {
  background: rgba(255, 255, 255, 0.10);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(255, 255, 255, 0.05) inset;
}

/* Premium — Pricing, Finance */
.card-premium {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(155, 138, 255, 0.3);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.4),
    0 0 24px rgba(155, 138, 255, 0.15),
    0 0 0 1px rgba(255, 255, 255, 0.08) inset;
}
```

**Hover transitions:**
```css
.card-base:hover {
  transform: translateY(-4px);
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.35),
    0 0 16px rgba(107, 158, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.25);
}
```

---

### 2.5. Dark Surface Hierarchy

**Sistema de diferenciação:**

| Superfície | Background | Border | Uso |
|-----------|-----------|--------|-----|
| **Base** | `rgba(255,255,255,0.04)` | `rgba(255,255,255,0.08)` | Background geral |
| **Card** | `rgba(255,255,255,0.06)` | `rgba(255,255,255,0.12)` | Cards normais |
| **Input** | `rgba(255,255,255,0.08)` | `rgba(255,255,255,0.15)` | Campos de input |
| **Hover** | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.20)` | Estado hover |
| **Active** | `rgba(255,255,255,0.12)` | `rgba(155,138,255,0.30)` | Estado active |
| **Modal** | `rgba(255,255,255,0.14)` | `rgba(255,255,255,0.25)` | Modais e popovers |

---

## 3. Template Opportunities

### 3.1. Landing Page SaaS Dark Premium

**Baseado em:** DesignCode UI Desktop (node `23201:69216`)

**Estrutura:**
```
Hero Section (1440x1440)
├── Background: mesh gradient azul/roxo
├── Navigation Menu: glass navbar
├── Headline: 72px bold + gradiente text
├── Subheadline: 24px rgba(255,255,255,0.7)
├── CTA Row: Button Shiny + Button Logo (Figma/Framer)
└── Hero Visual: Finance Card + Template Card floating

Components Showcase (1440x1440)
├── Background: mesh dark
├── Section Header: Text Block Double
├── Filter Tabs: Text Block Buttons
└── Component Grid: 3x3 cards glassmorphism
```

**Componentes reutilizáveis:**
- Navigation Menu (`198:29942`)
- Button Shiny (`198:30032`)
- Template Card (`195:28993`)
- Finance Card (`305:6791`)
- Background Web 1 + 2 (`306:24237`, `370:732417`)

---

### 3.2. Pricing Page com Glassmorphism

**Baseado em:** Pricing Card (`198:30094`)

**Layout:**
```
Header
├── Background: mesh gradient sutil
├── Headline: "Escolha seu plano"
└── Toggle: Monthly/Yearly (Switch 3D)

Pricing Grid (3 colunas)
├── Starter Card
│   ├── Glass level 1
│   ├── Price: $0/mês
│   └── Features list
├── Pro Card (destaque)
│   ├── Glass level 3 + glow roxo
│   ├── Price: $29/mês
│   ├── Button Shiny
│   └── Features list + badges
└── Enterprise Card
    ├── Glass level 2
    └── "Contact us" CTA
```

**Efeitos especiais:**
- Card central com `z-index: 10` + `scale(1.05)`
- Glow roxo ao redor do card Pro
- Badge "Popular" com gradiente

---

### 3.3. Dashboard Dark com Cards Financeiros

**Baseado em:** Finance Card (`305:6791`)

**Layout:**
```
Dashboard Grid
├── Stats Row (4 colunas)
│   ├── Revenue Card (glass + glow verde)
│   ├── Users Card (glass + glow azul)
│   ├── Conversion Card (glass + glow amarelo)
│   └── Churn Card (glass + glow vermelho)
├── Chart Section
│   ├── Line Chart Card (full width)
│   └── Background: mesh dark
└── Activity Feed
    └── Notification Card stack
```

**Padrões de cor por métrica:**
- **Revenue:** Verde (`hsl(150, 70%, 55%)`) + glow
- **Users:** Azul (`hsl(220, 85%, 65%)`) + glow
- **Warning:** Amarelo (`hsl(35, 90%, 60%)`) + glow
- **Error:** Vermelho (`hsl(0, 75%, 60%)`) + glow

---

### 3.4. Changelog/Updates Page

**Baseado em:** Changelog Desktop (`23201:69220`)

**Estrutura:**
```
Header
├── Navigation Menu
└── Page Title + Filter (Text Block Buttons)

Timeline (single column)
├── Update Card 1
│   ├── Glass card elevated
│   ├── Date badge (top-right)
│   ├── Title + category badge
│   ├── Screenshot/Preview (rounded)
│   └── Description + "Learn more" link
├── Update Card 2
└── Update Card 3
```

**Padrões por categoria:**
- **New Feature:** Badge azul + ícone sparkle
- **Improvement:** Badge verde + ícone arrow-up
- **Bug Fix:** Badge amarelo + ícone wrench

---

## 4. CSS/Tailwind Token Mapping

### 4.1. Glassmorphism Tokens

```css
/* globals.css */
:root {
  /* Glass backgrounds */
  --glass-bg-1: rgba(255, 255, 255, 0.06);
  --glass-bg-2: rgba(255, 255, 255, 0.10);
  --glass-bg-3: rgba(255, 255, 255, 0.14);

  /* Glass borders */
  --glass-border-1: rgba(255, 255, 255, 0.12);
  --glass-border-2: rgba(255, 255, 255, 0.20);
  --glass-border-3: rgba(255, 255, 255, 0.25);

  /* Glass blur */
  --glass-blur-sm: blur(20px) saturate(150%);
  --glass-blur-md: blur(32px) saturate(180%);
  --glass-blur-lg: blur(40px) saturate(200%);
}
```

**Tailwind config:**
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      backgroundColor: {
        'glass-1': 'var(--glass-bg-1)',
        'glass-2': 'var(--glass-bg-2)',
        'glass-3': 'var(--glass-bg-3)',
      },
      borderColor: {
        'glass-1': 'var(--glass-border-1)',
        'glass-2': 'var(--glass-border-2)',
        'glass-3': 'var(--glass-border-3)',
      },
      backdropBlur: {
        'glass-sm': '20px',
        'glass-md': '32px',
        'glass-lg': '40px',
      },
      backdropSaturate: {
        'glass': '180%',
      }
    }
  }
}
```

---

### 4.2. Glow Effects Tokens

```css
:root {
  /* Glow colors */
  --glow-primary: 155 138 255; /* RGB para usar com alpha */
  --glow-success: 76 175 140;
  --glow-warning: 255 184 77;
  --glow-info: 107 158 255;
  --glow-error: 255 107 107;

  /* Glow shadows */
  --glow-sm: 0 0 16px rgb(var(--glow-primary) / 0.3);
  --glow-md: 0 0 24px rgb(var(--glow-primary) / 0.4);
  --glow-lg: 0 0 40px rgb(var(--glow-primary) / 0.5);
}
```

**Tailwind utilities:**
```js
// tailwind.config.js (plugin)
const plugin = require('tailwindcss/plugin');

module.exports = {
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.glow-primary-sm': {
          boxShadow: 'var(--glow-sm)',
        },
        '.glow-primary-md': {
          boxShadow: 'var(--glow-md)',
        },
        '.glow-success': {
          boxShadow: '0 0 24px rgba(76, 175, 140, 0.4)',
        },
        '.glow-hover': {
          transition: 'box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            boxShadow: '0 0 32px rgba(155, 138, 255, 0.6)',
          }
        }
      })
    })
  ]
}
```

---

### 4.3. Gradient Mesh Tokens

```css
:root {
  /* Mesh gradients */
  --mesh-hero:
    radial-gradient(circle at 25% 15%, hsla(250, 80%, 40%, 0.8) 0%, transparent 50%),
    radial-gradient(circle at 75% 85%, hsla(280, 70%, 35%, 0.6) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, hsla(220, 85%, 45%, 0.9) 0%, transparent 60%),
    hsl(230, 75%, 12%);

  --mesh-dark:
    radial-gradient(circle at 80% 20%, hsla(220, 85%, 50%, 0.3) 0%, transparent 40%),
    radial-gradient(circle at 20% 80%, hsla(280, 70%, 40%, 0.25) 0%, transparent 45%),
    hsl(230, 70%, 8%);

  --mesh-subtle:
    radial-gradient(circle at 60% 30%, hsla(250, 60%, 50%, 0.15) 0%, transparent 50%),
    hsl(230, 70%, 10%);
}
```

**Tailwind classes:**
```js
// tailwind.config.js
backgroundImage: {
  'mesh-hero': 'var(--mesh-hero)',
  'mesh-dark': 'var(--mesh-dark)',
  'mesh-subtle': 'var(--mesh-subtle)',
}
```

---

### 4.4. Elevation/Shadow System

```css
:root {
  /* Elevation shadows (dark theme) */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.15);
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.4);
  --shadow-xl: 0 24px 64px rgba(0, 0, 0, 0.5);

  /* Inner glow (inset border) */
  --inset-glow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
}
```

**Combinação com glow:**
```css
.card-premium-hover {
  box-shadow:
    var(--shadow-lg),
    0 0 24px rgba(155, 138, 255, 0.3),
    var(--inset-glow);
}
```

---

## 5. Reusable Snippets

### 5.1. Glass Card Component

```tsx
// components/ui/glass-card.tsx
import { cn } from '@/lib/utils';

interface GlassCardProps {
  level?: 1 | 2 | 3;
  glow?: 'primary' | 'success' | 'warning' | 'none';
  className?: string;
  children: React.ReactNode;
}

export function GlassCard({
  level = 1,
  glow = 'none',
  className,
  children
}: GlassCardProps) {
  return (
    <div
      className={cn(
        // Base styles
        'rounded-2xl border transition-all duration-300',
        'backdrop-blur-[32px] backdrop-saturate-[180%]',

        // Level-specific backgrounds
        level === 1 && 'bg-white/[0.06] border-white/[0.12]',
        level === 2 && 'bg-white/[0.10] border-white/[0.18]',
        level === 3 && 'bg-white/[0.14] border-white/[0.25]',

        // Level-specific shadows
        level === 1 && 'shadow-[0_2px_8px_rgba(0,0,0,0.2)]',
        level === 2 && 'shadow-[0_8px_24px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.08)]',
        level === 3 && 'shadow-[0_24px_64px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]',

        // Glow effects
        glow === 'primary' && 'shadow-[0_0_24px_rgba(155,138,255,0.3)]',
        glow === 'success' && 'shadow-[0_0_24px_rgba(76,175,140,0.3)]',
        glow === 'warning' && 'shadow-[0_0_24px_rgba(255,184,77,0.3)]',

        // Hover state
        'hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35),0_0_16px_rgba(107,158,255,0.2)]',

        className
      )}
    >
      {children}
    </div>
  );
}
```

**Uso:**
```tsx
<GlassCard level={2} glow="primary">
  <h3>Finance Overview</h3>
  <p>$12,450</p>
</GlassCard>
```

---

### 5.2. Shiny Button Component

```tsx
// components/ui/shiny-button.tsx
import { cn } from '@/lib/utils';

interface ShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ShinyButton({ className, children, ...props }: ShinyButtonProps) {
  return (
    <button
      className={cn(
        // Base styles
        'relative px-6 py-3 rounded-xl font-semibold text-white',
        'border border-white/30',

        // Gradient background
        'bg-gradient-to-br from-[hsl(250,75%,60%)] to-[hsl(280,70%,55%)]',

        // Shadows
        'shadow-[0_4px_16px_rgba(155,138,255,0.4),inset_0_1px_0_rgba(255,255,255,0.25)]',

        // Hover
        'hover:shadow-[0_8px_32px_rgba(155,138,255,0.6),inset_0_1px_0_rgba(255,255,255,0.35)]',
        'hover:-translate-y-0.5',

        // Transition
        'transition-all duration-300 ease-out',

        // Active
        'active:translate-y-0 active:shadow-[0_2px_8px_rgba(155,138,255,0.4)]',

        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Uso:**
```tsx
<ShinyButton onClick={() => alert('Premium CTA!')}>
  Get Started
</ShinyButton>
```

---

### 5.3. Mesh Background Component

```tsx
// components/ui/mesh-background.tsx
import { cn } from '@/lib/utils';

type MeshVariant = 'hero' | 'dark' | 'subtle';

interface MeshBackgroundProps {
  variant?: MeshVariant;
  noise?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function MeshBackground({
  variant = 'hero',
  noise = true,
  className,
  children
}: MeshBackgroundProps) {
  const meshStyles = {
    hero: 'bg-[radial-gradient(circle_at_25%_15%,hsla(250,80%,40%,0.8)_0%,transparent_50%),radial-gradient(circle_at_75%_85%,hsla(280,70%,35%,0.6)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,hsla(220,85%,45%,0.9)_0%,transparent_60%)] bg-[hsl(230,75%,12%)]',
    dark: 'bg-[radial-gradient(circle_at_80%_20%,hsla(220,85%,50%,0.3)_0%,transparent_40%),radial-gradient(circle_at_20%_80%,hsla(280,70%,40%,0.25)_0%,transparent_45%)] bg-[hsl(230,70%,8%)]',
    subtle: 'bg-[radial-gradient(circle_at_60%_30%,hsla(250,60%,50%,0.15)_0%,transparent_50%)] bg-[hsl(230,70%,10%)]',
  };

  return (
    <div className={cn('relative', meshStyles[variant], className)}>
      {noise && (
        <div
          className="absolute inset-0 opacity-5 mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
          }}
        />
      )}
      {children}
    </div>
  );
}
```

**Uso:**
```tsx
<MeshBackground variant="hero" noise>
  <section className="min-h-screen flex items-center justify-center">
    <h1>Hero Section</h1>
  </section>
</MeshBackground>
```

---

### 5.4. Finance Card com Glow

```tsx
// components/cards/finance-card.tsx
import { GlassCard } from '@/components/ui/glass-card';
import { cn } from '@/lib/utils';

interface FinanceCardProps {
  title: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
  className?: string;
}

export function FinanceCard({ title, value, change, trend, className }: FinanceCardProps) {
  const isPositive = trend === 'up';

  return (
    <GlassCard
      level={2}
      glow={isPositive ? 'success' : 'warning'}
      className={cn('p-6 space-y-4', className)}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-white/70">{title}</h3>
        <div
          className={cn(
            'flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg',
            isPositive
              ? 'bg-emerald-500/20 text-emerald-400'
              : 'bg-amber-500/20 text-amber-400'
          )}
        >
          <span>{isPositive ? '↑' : '↓'}</span>
          <span>{Math.abs(change)}%</span>
        </div>
      </div>

      <p className="text-3xl font-bold text-white">{value}</p>

      {/* Mini chart placeholder */}
      <div className="h-20 rounded-lg bg-white/5 flex items-end justify-between gap-1 p-2">
        {[40, 60, 55, 70, 65, 80, 75, 90].map((height, i) => (
          <div
            key={i}
            className={cn(
              'flex-1 rounded-sm transition-all',
              isPositive ? 'bg-emerald-500/60' : 'bg-amber-500/60'
            )}
            style={{
              height: `${height}%`,
              filter: `drop-shadow(0 0 4px ${isPositive ? 'rgba(76,175,140,0.6)' : 'rgba(255,184,77,0.6)'})`
            }}
          />
        ))}
      </div>
    </GlassCard>
  );
}
```

**Uso:**
```tsx
<FinanceCard
  title="Total Revenue"
  value="$12,450"
  change={12.5}
  trend="up"
/>
```

---

### 5.5. Pricing Card Premium

```tsx
// components/cards/pricing-card.tsx
import { GlassCard } from '@/components/ui/glass-card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  name: string;
  price: string;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  className?: string;
}

export function PricingCard({
  name,
  price,
  period,
  features,
  highlighted = false,
  badge,
  className
}: PricingCardProps) {
  return (
    <div className={cn('relative', highlighted && 'z-10 scale-105', className)}>
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[hsl(250,75%,60%)] to-[hsl(280,70%,55%)] text-xs font-bold text-white shadow-lg">
          {badge}
        </div>
      )}

      <GlassCard
        level={highlighted ? 3 : 2}
        glow={highlighted ? 'primary' : 'none'}
        className="p-8 space-y-6"
      >
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-bold text-white">{price}</span>
            <span className="text-white/60">/{period}</span>
          </div>
        </div>

        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-white/80">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {highlighted ? (
          <ShinyButton className="w-full">
            Get Started
          </ShinyButton>
        ) : (
          <button className="w-full px-6 py-3 rounded-xl font-semibold text-white bg-white/10 border border-white/20 hover:bg-white/15 transition-all">
            Choose Plan
          </button>
        )}
      </GlassCard>
    </div>
  );
}
```

**Uso:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
  <PricingCard
    name="Starter"
    price="$0"
    period="mês"
    features={['5 projetos', 'Suporte por email', '1 GB storage']}
  />
  <PricingCard
    name="Pro"
    price="$29"
    period="mês"
    features={['Projetos ilimitados', 'Suporte prioritário', '50 GB storage', 'API access']}
    highlighted
    badge="Popular"
  />
  <PricingCard
    name="Enterprise"
    price="Custom"
    period="mês"
    features={['Tudo do Pro', 'Suporte dedicado', 'Storage ilimitado', 'SLA garantido']}
  />
</div>
```

---

## 6. Implementação Completa (Landing Page)

### Exemplo: Landing Page SaaS Premium

```tsx
// app/page.tsx
import { MeshBackground } from '@/components/ui/mesh-background';
import { GlassCard } from '@/components/ui/glass-card';
import { ShinyButton } from '@/components/ui/shiny-button';
import { FinanceCard } from '@/components/cards/finance-card';

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <MeshBackground variant="hero">
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="text-xl font-bold text-white">DesignCode</div>
              <div className="flex items-center gap-6">
                <a href="#features" className="text-white/80 hover:text-white transition">Features</a>
                <a href="#pricing" className="text-white/80 hover:text-white transition">Pricing</a>
                <ShinyButton className="text-sm px-4 py-2">Sign Up</ShinyButton>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h1 className="text-7xl font-bold bg-gradient-to-br from-white via-white to-white/60 bg-clip-text text-transparent">
              Design Systems<br />Made Simple
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Build beautiful, consistent interfaces faster with our premium design system and component library.
            </p>
            <div className="flex items-center justify-center gap-4">
              <ShinyButton className="px-8 py-4 text-lg">Get Started Free</ShinyButton>
              <button className="px-8 py-4 text-lg font-semibold text-white bg-white/10 border border-white/20 rounded-xl hover:bg-white/15 transition-all">
                View Demo
              </button>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <FinanceCard title="Active Users" value="12.4K" change={18.2} trend="up" />
            <FinanceCard title="Revenue" value="$54.3K" change={24.5} trend="up" />
            <FinanceCard title="Conversion" value="3.2%" change={-2.1} trend="down" />
          </div>
        </section>
      </MeshBackground>

      {/* Features Section */}
      <MeshBackground variant="dark">
        <section id="features" className="py-32 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl font-bold text-white">Beautiful Components</h2>
              <p className="text-xl text-white/60">Everything you need to build premium interfaces</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <GlassCard key={i} level={1} className="p-6 space-y-4 hover:scale-105 transition-transform">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[hsl(250,75%,60%)] to-[hsl(280,70%,55%)] flex items-center justify-center text-2xl">
                    ✨
                  </div>
                  <h3 className="text-xl font-bold text-white">Feature {i}</h3>
                  <p className="text-white/60">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </MeshBackground>
    </main>
  );
}
```

---

## 7. Checklist de Implementação

Ao adaptar DesignCode UI patterns para um novo projeto:

- [ ] **Tokens CSS:** Criar variáveis de glassmorphism, glow, mesh
- [ ] **Tailwind Config:** Extender com glass backgrounds, glow utilities
- [ ] **Componentes Base:** GlassCard, ShinyButton, MeshBackground
- [ ] **Cards Especializados:** FinanceCard, PricingCard, TemplateCard
- [ ] **Gradientes Mesh:** Criar 3 variantes (hero, dark, subtle)
- [ ] **Sistema de Glow:** Definir cores para primary, success, warning, error
- [ ] **Elevation System:** 3 níveis de profundidade de cards
- [ ] **Hover States:** Transitions suaves com transform + glow
- [ ] **Dark Surface Hierarchy:** 6 níveis de opacidade rgba
- [ ] **Responsive:** Testar glassmorphism em mobile (reduzir blur se necessário)
- [ ] **Performance:** Otimizar backdrop-filter (pode ser pesado em mobile antigo)
- [ ] **Acessibilidade:** Garantir contraste mínimo 4.5:1 em textos sobre glass

---

## 8. Gotchas e Best Practices

### Performance

**Backdrop-filter pode ser pesado:**
```css
/* Para mobile, reduzir blur */
@media (max-width: 768px) {
  .glass-card {
    backdrop-filter: blur(16px) saturate(150%); /* era 32px */
  }
}

/* Ou desabilitar em devices antigos */
@supports not (backdrop-filter: blur(1px)) {
  .glass-card {
    background: rgba(30, 30, 50, 0.9); /* Fallback sólido */
  }
}
```

### Contraste

**Textos sobre glassmorphism precisam de cuidado:**
```css
/* Sempre adicionar text-shadow sutil em textos sobre glass */
.glass-card h3 {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
}

/* Ou background semi-opaco no texto */
.glass-card p {
  background: rgba(0, 0, 0, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
}
```

### Glow Overuse

**Não aplicar glow em tudo:**
- ✅ CTAs principais, cards de destaque, gráficos
- ❌ Texto normal, inputs de formulário, borders de container

### Gradientes Mesh

**Mesh muito vibrante pode cansar:**
```css
/* Para sections longas, usar variant "subtle" */
.long-content-section {
  background: var(--mesh-subtle);
}

/* Reservar "hero" para acima da dobra */
.hero-section {
  background: var(--mesh-hero);
}
```

---

## 9. Próximos Passos

1. **Extrair assets do Figma:**
   - Screenshots dos componentes para referência visual
   - Export de ícones e ilustrações (se houver)

2. **Criar biblioteca Storybook:**
   - Documentar cada componente premium
   - Variantes de GlassCard, ShinyButton, etc.

3. **Templates prontos:**
   - Landing SaaS premium (baseado em DesignCode Desktop)
   - Pricing page (3 colunas glassmorphism)
   - Dashboard financeiro (Finance Cards)
   - Changelog (timeline vertical)

4. **Testes de performance:**
   - Benchmark de backdrop-filter em mobile
   - Lighthouse score com glassmorphism pesado

5. **Documentação interativa:**
   - Criar `/docs/premium-ui` com exemplos ao vivo
   - Copy-paste snippets prontos

---

*Referência criada em 2026-03-10 | Baseada em DesignCode UI Figma Community File*
