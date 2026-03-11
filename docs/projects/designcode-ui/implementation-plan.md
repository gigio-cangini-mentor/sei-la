# Plano de Implementação — DesignCode UI Kit

> **Objetivo:** Implementar os componentes do DesignCode UI como biblioteca React reutilizável.
> **Stack:** React + TypeScript + Tailwind CSS + Vite + Storybook
> **Referência Figma:** `fileKey: zQDO3tbtArViznGtpZDubA`

---

## 1. Stack Recomendado

### Tecnologias Core

| Layer | Tecnologia | Justificativa |
|-------|-----------|---------------|
| **Framework** | React 18 + TypeScript | Padrão de mercado, forte tipagem, ecossistema robusto |
| **Styling** | Tailwind CSS 4 + CSS Variables | Utility-first alinhado com design tokens, theme switching nativo |
| **Build** | Vite 6 | Build ultrarrápido, HMR instantâneo, Tree-shaking otimizado |
| **Documentação** | Storybook 8 | Desenvolvimento isolado, preview interativo, testes visuais |
| **Package** | pnpm workspace | Monorepo eficiente, fast installs |
| **Testing** | Vitest + Testing Library | Compatível com Vite, performance superior |

### Justificativas Específicas

**Por que Tailwind CSS?**
- Design system com glassmorphism, gradientes e efeitos complexos → CSS Variables + Tailwind plugins
- Dark/Light mode nativo via `dark:` prefix
- Menor bundle size que CSS-in-JS em runtime

**Por que Vite?**
- Build time < 2s (vs 10s+ Webpack)
- HMR instantâneo para desenvolvimento de componentes
- Plugin ecosystem maduro (React, TS, Tailwind)

**Por que Storybook?**
- Design-dev handoff visual direto do Figma
- Teste de variantes (dark/light, sizes, states) lado a lado
- Automação de visual regression com Chromatic

---

## 2. Estrutura de Projeto Proposta

```
designcode-ui/
├── packages/
│   └── ui/
│       ├── src/
│       │   ├── atoms/                  # Primitivos (Button, Input, Badge)
│       │   │   ├── Button/
│       │   │   │   ├── Button.tsx
│       │   │   │   ├── Button.stories.tsx
│       │   │   │   ├── Button.test.tsx
│       │   │   │   └── index.ts
│       │   │   ├── Input/
│       │   │   ├── Badge/
│       │   │   ├── Toggle/
│       │   │   └── index.ts           # Barrel export
│       │   │
│       │   ├── molecules/              # Compostos simples (Search, MenuTab)
│       │   │   ├── Search/
│       │   │   ├── MenuTab/
│       │   │   ├── NavigationMenu/
│       │   │   └── index.ts
│       │   │
│       │   ├── organisms/              # Compostos complexos (Cards, Modals, Inspector)
│       │   │   ├── TemplateCard/
│       │   │   ├── FinanceCard/
│       │   │   ├── PricingCard/
│       │   │   ├── PaymentModal/
│       │   │   ├── InspectorDetail/
│       │   │   ├── CodeBlock/
│       │   │   ├── Notification/
│       │   │   └── index.ts
│       │   │
│       │   ├── templates/              # Layouts completos (Hero, Showcase)
│       │   │   ├── HeroSection/
│       │   │   ├── ComponentsShowcase/
│       │   │   └── index.ts
│       │   │
│       │   ├── tokens/                 # Design tokens
│       │   │   ├── colors.ts          # Color palette
│       │   │   ├── spacing.ts         # Spacing scale
│       │   │   ├── typography.ts      # Font scales
│       │   │   ├── shadows.ts         # Shadow + glow tokens
│       │   │   ├── gradients.ts       # Gradient presets
│       │   │   └── index.ts
│       │   │
│       │   ├── utils/                  # Helpers
│       │   │   ├── cn.ts              # clsx + tailwind-merge
│       │   │   ├── variants.ts        # CVA (class-variance-authority)
│       │   │   └── theme.ts           # Theme context
│       │   │
│       │   └── index.ts               # Public API
│       │
│       ├── .storybook/
│       │   ├── main.ts
│       │   ├── preview.ts
│       │   └── theme.ts               # Storybook theme (dark premium)
│       │
│       ├── tailwind.config.ts         # Tailwind + design tokens
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── package.json
│
├── apps/
│   └── docs/                          # Storybook deployed docs
│
└── pnpm-workspace.yaml
```

---

## 3. Componentes por Sprint

### Sprint 1 — Foundation (Atoms) — 2 semanas

**Objetivo:** Estabelecer base de tokens + componentes primitivos + Storybook funcional.

| Componente | Node ID | Props Principais | Variantes |
|------------|---------|------------------|-----------|
| **Button Primary** | `198:29982` | `variant`, `size`, `disabled`, `loading` | `primary`, `secondary`, `ghost` / `sm`, `md`, `lg` |
| **Button Shiny** | `198:30032` | `children`, `disabled`, `glow` | Com/sem efeito brilho, dark/light |
| **Button Logo** | `198:29988` (Figma)<br>`198:30005` (Framer) | `logo`, `size`, `href` | Circular 44x44, badges de plataforma |
| **Input** | `303:23126` | `type`, `placeholder`, `error`, `disabled` | Normal, error state, disabled, dark/light |
| **Search** | `303:23605` | `value`, `onChange`, `onClear`, `placeholder` | Com ícone de busca, clear button |
| **Badge** | Implícito em logos | `variant`, `children` | Color variants, sizes |
| **Toggle Vertical** | `377:766811` | `checked`, `onChange`, `labels` | Dark/Light switcher, vertical 36x100 |
| **Switch 3D** | `303:23154` | `checked`, `onChange`, `animated` | Toggle 3D animado 162x46 |

**Design Tokens Iniciais (extrair via MCP):**
```bash
# Para cada componente:
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:29982")
```

**Entregáveis Sprint 1:**
- [ ] Design tokens completos em `src/tokens/`
- [ ] Tailwind config com tokens integrados
- [ ] 8 componentes atoms funcionais
- [ ] Storybook rodando com dark mode toggle
- [ ] Testes unitários básicos (smoke tests)
- [ ] Documentação de instalação e uso

---

### Sprint 2 — Core (Molecules + Organisms Básicos) — 3 semanas

**Objetivo:** Componentes compostos + cards + navegação.

#### Molecules

| Componente | Node ID | Props Principais | Variantes |
|------------|---------|------------------|-----------|
| **Menu Tab** | `303:23377` | `items`, `activeIndex`, `onChange` | Horizontal tabs 167x36 |
| **Navigation Menu** | `198:29942` | `items`, `logo`, `cta` | Desktop 780x44, responsive mobile |
| **Side Menu** | `190:21309` | `items`, `collapsed`, `onSelect` | Sidebar 220x293, collapsible |
| **Layers Menu** | `306:30277` | `layers`, `onToggle`, `onSelect` | IDE-style menu 220x367 |

#### Organisms — Cards

| Componente | Node ID | Props Principais | Variantes |
|------------|---------|------------------|-----------|
| **Template Card** | `195:28993` (Hero)<br>`370:732418` (Showcase) | `title`, `image`, `tags`, `onClick` | 280x438 (Hero), 240x438 (Showcase) |
| **Finance Card** | `305:6791` | `title`, `value`, `chart`, `trend` | Card com gráfico 280x452 |
| **Pricing Card** | `198:30094` | `title`, `price`, `features`, `cta` | Card de pricing 280x439 |
| **Notification** | `303:23720` | `items`, `onMarkRead`, `onClear` | Lista de notificações 280x378 |
| **FAQ Card** | `370:732427` | `question`, `answer`, `expanded` | Card expansível 240x235 |
| **Reply Card** | `370:732426` | `author`, `content`, `timestamp` | Card de comentário 240x238 |

**Comandos Figma MCP:**
```bash
# Navigation Menu
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:29942")

# Template Card (Hero variant)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "195:28993")

# Finance Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "305:6791")

# Pricing Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:30094")

# Notification
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "303:23720")

# FAQ Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732427")

# Reply Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732426")
```

**Entregáveis Sprint 2:**
- [ ] 4 molecules (menus) responsivos
- [ ] 6 cards com variantes dark/light
- [ ] Storybook stories interativas para todos
- [ ] Testes de acessibilidade (keyboard nav, ARIA)
- [ ] Documentação de props via TypeDoc

---

### Sprint 3 — Extended (Organisms Complexos + Templates) — 3 semanas

**Objetivo:** Modais, inspectors, code blocks e layouts completos.

#### Organisms — Complexos

| Componente | Node ID | Props Principais | Variantes |
|------------|---------|------------------|-----------|
| **Payment Modal** | `370:732424` | `open`, `onClose`, `onSubmit`, `methods` | Modal completo 320x546 |
| **Inspector Detail** | `370:732420` | `properties`, `onUpdate`, `tabs` | Panel detalhado 320x845 |
| **Inspector Menu** | `370:732421` | `items`, `compact` | Menu compacto 240x254 |
| **Code Block** | `370:732423` | `code`, `language`, `copyable`, `lineNumbers` | Syntax highlight 320x356 |
| **Popover** | `370:732419` | `trigger`, `content`, `placement` | Floating menu 240x257 |
| **Alert** | `370:732425` | `type`, `title`, `message`, `actions` | Success/Warning/Error 240x219 |

#### Templates

| Componente | Node ID | Props Principais | Descrição |
|------------|---------|------------------|-----------|
| **Hero Section** | `64:49960` | `title`, `subtitle`, `cta`, `components` | Landing hero 1440x1440 |
| **Components Showcase** | `370:732416` | `components`, `filter`, `grid` | Grid de componentes 1440x1440 |

**Comandos Figma MCP:**
```bash
# Payment Modal
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732424")

# Inspector Detail
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732420")

# Inspector Menu
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732421")

# Code Block
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732423")

# Popover
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732419")

# Alert
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732425")

# Hero Section completo
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "64:49960")

# Components Showcase
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732416")
```

**Entregáveis Sprint 3:**
- [ ] 6 organisms complexos
- [ ] 2 templates completos e responsivos
- [ ] Animações via Framer Motion (modais, popovers)
- [ ] Testes de integração (modal flows, form validation)
- [ ] Deploy do Storybook (Vercel/Chromatic)
- [ ] Documentação completa de API

---

## 4. Design Tokens Iniciais

### Estrutura de Tokens

Baseado no estilo visual do Figma (dark premium, glassmorphism, gradientes mesh):

#### `src/tokens/colors.ts`

```typescript
export const colors = {
  // Base colors (extrair do Figma)
  primary: {
    50: 'hsl(240 100% 98%)',
    100: 'hsl(240 100% 95%)',
    // ... 200-900
    DEFAULT: 'hsl(240 71% 62%)', // Azul principal
  },

  purple: {
    DEFAULT: 'hsl(280 71% 62%)',
    // ...
  },

  pink: {
    DEFAULT: 'hsl(320 71% 62%)',
    // ...
  },

  // Glassmorphism backgrounds
  glass: {
    dark: 'rgba(0, 0, 0, 0.4)',
    light: 'rgba(255, 255, 255, 0.1)',
    border: 'rgba(255, 255, 255, 0.18)',
  },

  // Gradients (mesh backgrounds)
  gradient: {
    mesh1: 'radial-gradient(circle at 20% 50%, hsl(240 71% 62% / 0.3), transparent 50%), radial-gradient(circle at 80% 80%, hsl(280 71% 62% / 0.3), transparent 50%)',
    mesh2: '...',
  },
};
```

#### `src/tokens/spacing.ts`

```typescript
export const spacing = {
  // Base 4px
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem',  // 8px
  3: '0.75rem', // 12px
  4: '1rem',    // 16px
  5: '1.25rem', // 20px
  6: '1.5rem',  // 24px
  8: '2rem',    // 32px
  10: '2.5rem', // 40px
  12: '3rem',   // 48px
  // ...
};
```

#### `src/tokens/typography.ts`

```typescript
export const typography = {
  fontFamily: {
    sans: ['Inter', 'SF Pro', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'Menlo', 'monospace'],
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
    sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
    base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
    lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
    xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
    // ...
  },
};
```

#### `src/tokens/shadows.ts`

```typescript
export const shadows = {
  // Glows coloridos
  glow: {
    blue: '0 0 20px hsl(240 71% 62% / 0.5)',
    purple: '0 0 20px hsl(280 71% 62% / 0.5)',
    pink: '0 0 20px hsl(320 71% 62% / 0.5)',
  },

  // Shadows padrão
  sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px rgba(0, 0, 0, 0.1)',

  // Glassmorphism
  glass: '0 8px 32px rgba(0, 0, 0, 0.37)',
};
```

#### `src/tokens/gradients.ts`

```typescript
export const gradients = {
  mesh: {
    hero: 'radial-gradient(...)', // Extrair do Background Web 1 (306:24237)
    showcase: '...',              // Extrair do Background Web 2 (370:732417)
  },

  button: {
    shiny: 'linear-gradient(135deg, hsl(240 71% 62%), hsl(280 71% 62%))',
  },
};
```

**Comando MCP para extrair backgrounds:**
```bash
# Background Web 1 (Hero)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "306:24237")

# Background Web 2 (Showcase)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732417")
```

---

### Integração com Tailwind

#### `tailwind.config.ts`

```typescript
import type { Config } from 'tailwindcss';
import { colors, spacing, typography, shadows, gradients } from './src/tokens';

export default {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors,
      spacing,
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      boxShadow: {
        ...shadows,
        glow: shadows.glow,
      },
      backgroundImage: {
        ...gradients.mesh,
        ...gradients.button,
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '16px',
        xl: '20px',
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
} satisfies Config;
```

---

## 5. Checklist de Qualidade

### Para Cada Componente

#### Funcional
- [ ] TypeScript types exportados em `index.ts`
- [ ] Props validadas com Zod ou TypeScript strict mode
- [ ] Ref forwarding implementado (`forwardRef`)
- [ ] Controlled + Uncontrolled modes (quando aplicável)

#### Visual
- [ ] Responsive (desktop 1440px + mobile 375px)
- [ ] Dark mode + Light mode funcionais
- [ ] Hover/Focus/Active states implementados
- [ ] Disabled state implementado
- [ ] Loading state (quando aplicável)

#### Acessibilidade
- [ ] ARIA labels aplicados
- [ ] Keyboard navigation (Tab, Enter, Escape)
- [ ] Screen reader testado (VoiceOver/NVDA)
- [ ] Contraste de cores WCAG AA (mínimo)
- [ ] Focus visible (outline customizado)

#### Documentação
- [ ] Storybook story com todas as variantes
- [ ] Props documentadas via JSDoc
- [ ] Usage examples em MDX (Storybook Docs)
- [ ] Figma node ID referenciado em comentário

#### Testes
- [ ] Smoke test (componente renderiza)
- [ ] Props test (todas as props funcionam)
- [ ] Accessibility test (axe-core via jest-axe)
- [ ] Visual regression test (Chromatic)

---

## 6. Comandos Figma MCP — Quick Reference

### Atoms

```bash
# Button Primary
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:29982")

# Button Shiny
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:30032")

# Button Logo (Figma)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:29988")

# Input
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "303:23126")

# Search
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "303:23605")

# Toggle Vertical
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "377:766811")

# Switch 3D
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "303:23154")
```

### Molecules

```bash
# Menu Tab
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "303:23377")

# Navigation Menu
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:29942")

# Side Menu
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "190:21309")

# Layers Menu
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "306:30277")
```

### Organisms — Cards

```bash
# Template Card (Hero)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "195:28993")

# Finance Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "305:6791")

# Pricing Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "198:30094")

# Notification
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "303:23720")

# FAQ Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732427")

# Reply Card
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732426")
```

### Organisms — Complexos

```bash
# Payment Modal
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732424")

# Inspector Detail
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732420")

# Inspector Menu
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732421")

# Code Block
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732423")

# Popover
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732419")

# Alert
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732425")
```

### Templates

```bash
# Hero Section completo
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "64:49960")

# Components Showcase
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732416")
```

### Backgrounds

```bash
# Background Web 1 (Hero)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "306:24237")

# Background Web 2 (Showcase)
mcp__figma__get_design_context(fileKey: "zQDO3tbtArViznGtpZDubA", nodeId: "370:732417")
```

---

## 7. Workflow de Desenvolvimento

### Processo por Componente

1. **Planejar**
   ```bash
   # Buscar design context no Figma
   mcp__figma__get_design_context(fileKey: "...", nodeId: "...")

   # Capturar screenshot para referência visual
   mcp__figma__get_screenshot(fileKey: "...", nodeId: "...")
   ```

2. **Implementar**
   ```bash
   # Criar arquivo do componente
   src/atoms/Button/Button.tsx

   # Extrair tokens necessários (cores, spacing, shadows)
   # Adicionar em src/tokens/ se novos

   # Implementar variantes com CVA (class-variance-authority)
   ```

3. **Documentar**
   ```bash
   # Criar story interativa
   src/atoms/Button/Button.stories.tsx

   # Adicionar JSDoc nas props
   # Incluir node ID do Figma em comentário
   ```

4. **Testar**
   ```bash
   # Criar testes unitários
   src/atoms/Button/Button.test.tsx

   # Rodar testes
   pnpm test

   # Verificar acessibilidade
   pnpm test:a11y
   ```

5. **Validar**
   ```bash
   # Comparar visual no Storybook vs Figma
   pnpm storybook

   # Testar dark/light mode
   # Testar responsive (375px e 1440px)
   # Testar keyboard navigation
   ```

---

## 8. Critérios de Aceite (Definition of Done)

### Sprint 1 (Foundation)
- [ ] Design tokens completos extraídos do Figma
- [ ] Tailwind config integrado com tokens
- [ ] 8 componentes atoms implementados
- [ ] Dark/Light mode funcional em todos os componentes
- [ ] Storybook rodando com theme switcher
- [ ] 100% cobertura de testes unitários (atoms)
- [ ] README.md com instruções de instalação

### Sprint 2 (Core)
- [ ] 4 molecules + 6 cards implementados
- [ ] Responsive design validado (375px e 1440px)
- [ ] Testes de acessibilidade passando (axe-core)
- [ ] Storybook stories interativas para todos
- [ ] TypeDoc gerado e publicado
- [ ] Performance auditada (Lighthouse > 90)

### Sprint 3 (Extended)
- [ ] 6 organisms complexos + 2 templates
- [ ] Animações via Framer Motion implementadas
- [ ] Testes de integração (modal flows, forms)
- [ ] Storybook deployed (Vercel/Chromatic)
- [ ] Visual regression tests configurados
- [ ] NPM package publicado (alpha)
- [ ] Documentação completa (getting started, API reference)

---

## 9. Riscos e Mitigações

| Risco | Impacto | Mitigação |
|-------|---------|-----------|
| **Gradientes mesh complexos** | Alto — difícil replicar em CSS | Exportar SVGs do Figma como fallback + CSS gradients aproximados |
| **Animações 3D (Switch 3D)** | Médio — performance mobile | Usar Framer Motion com `layoutId` + reduce motion API |
| **Glassmorphism performance** | Médio — `backdrop-filter` custoso | Lazy load em componentes complexos, disable em low-end devices |
| **Dark/Light mode inconsistente** | Baixo — Figma pode ter variações manuais | Extrair variables do Figma, usar CSS vars consistentes |
| **Tokens desatualizados** | Baixo — Figma pode mudar | Criar script de sync automático via MCP (cron job) |

---

## 10. Próximos Passos Imediatos

1. **Setup inicial do projeto**
   ```bash
   pnpm create vite@latest designcode-ui --template react-ts
   cd designcode-ui
   pnpm install tailwindcss autoprefixer postcss
   pnpm install -D @storybook/react-vite storybook
   pnpm dlx sb init --builder @storybook/builder-vite
   ```

2. **Extrair design tokens do Figma**
   ```bash
   # Executar comandos MCP para backgrounds, buttons, cards
   # Mapear para src/tokens/
   ```

3. **Implementar primeiro componente (Button Primary)**
   - Validar workflow completo
   - Ajustar processo conforme necessário

4. **Configurar CI/CD**
   - GitHub Actions para testes
   - Chromatic para visual regression
   - Vercel para deploy do Storybook

---

*Plano criado em 2026-03-10 baseado no mapeamento completo do Figma DesignCode UI Kit.*
