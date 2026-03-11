# DesignCode UI — Design System Architecture

> Análise arquitetural baseada em Atomic Design
> Fonte: Figma Community File `zQDO3tbtArViznGtpZDubA`
> Analisado por: Brad Frost
> Data: 2026-03-10

---

## 1. Atomic Design Decomposition

### Atoms (Elementos Indivisíveis)

| Componente | Node ID | Dimensões | Função |
|------------|---------|-----------|---------|
| **Button Primary** | `198:29982` | 139x28 | Botão de ação primária (pequeno) |
| **Button Primary (form)** | `303:23138` | 119x32 | Botão submit de formulário |
| **Button Shiny** | `198:30032` | 174x36 | Botão com efeito brilho |
| **Button Shiny (alt)** | `377:764098` | 174x36 | Variante do botão shiny |
| **Button Logo (Figma)** | `198:29988` | 44x44 | Badge com logo Figma |
| **Button Logo (Framer)** | `198:30005` | 44x44 | Badge com logo Framer |
| **Input** | `303:23126` | 140x32 | Campo de entrada de texto |
| **Toggle Vertical** | `377:766811` | 36x100 | Toggle vertical dark/light |
| **Switch 3D** | `303:23154` | 162x46 | Toggle 3D animado |

**Total Atoms: 9 componentes**

---

### Molecules (Combinações Simples)

| Componente | Node ID | Dimensões | Função |
|------------|---------|-----------|---------|
| **Search** | `303:23605` | 180x32 | Campo de busca (input + icon) |
| **Menu (tab)** | `303:23377` | 167x36 | Menu de tabs horizontal |
| **Popover** | `370:732419` | 240x257 | Menu flutuante contextual |
| **Alert** | `370:732425` | 240x219 | Componente de alerta |
| **Text Block Buttons** | `376:760811` | 436x28 | Header com botões de filtro |
| **Text Block Double** | `376:760812` | 720x144 | Título + subtítulo de seção |

**Total Molecules: 6 componentes**

---

### Organisms (Seções Complexas)

| Componente | Node ID | Dimensões | Função |
|------------|---------|-----------|---------|
| **Navigation Menu** | `198:29942` | 780x44 | Menu de navegação global |
| **Side Menu** | `190:21309` | 220x293 | Menu lateral de navegação |
| **Layers Menu** | `306:30277` | 220x367 | Menu de layers estilo IDE |
| **Inspector Menu** | `370:732421` | 240x254 | Menu de inspector compacto |
| **Inspector Detail** | `370:732420` | 320x845 | Panel inspector detalhado |
| **Template Card** | `195:28993` | 280x438 | Card de template com preview |
| **Template Card (small)** | `370:732418` | 240x438 | Variante menor do card |
| **Finance Card** | `305:6791` | 280x452 | Card financeiro com gráficos |
| **Pricing Card** | `198:30094` | 280x439 | Card de pricing |
| **FAQ Card** | `370:732427` | 240x235 | Card de FAQ expansível |
| **Reply Card** | `370:732426` | 240x238 | Card de resposta/comentário |
| **Notification** | `303:23720` | 280x378 | Card de notificações |
| **Code Block** | `370:732423` | 320x356 | Bloco de código com syntax |
| **Payment Modal** | `370:732424` | 320x546 | Modal de pagamento completo |

**Total Organisms: 14 componentes**

---

### Templates (Layouts de Página)

| Componente | Node ID | Dimensões | Função |
|------------|---------|-----------|---------|
| **Hero** | `64:49960` | 1440x1440 | Hero section da landing |
| **Components Showcase** | `370:732416` | 1440x1440 | Grid de componentes |
| **Background Web 1** | `306:24237` | 1440x1440 | Background gradiente mesh |
| **Background Web 2** | `370:732417` | 1440x1440 | Background dark gradiente |

**Total Templates: 4 componentes**

---

## 2. Design Tokens

### Color System

```typescript
// Color Tokens (baseado no estilo visual dark premium)
const colorTokens = {
  // Primary Palette
  primary: {
    50: '#EEF2FF',   // Lightest blue
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',  // Base primary
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',  // Darkest blue
  },

  // Secondary/Accent (purple-pink gradient range)
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',  // Base purple
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },

  accent: {
    50: '#FDF4FF',
    100: '#FAE8FF',
    200: '#F5D0FE',
    300: '#F0ABFC',
    400: '#E879F9',
    500: '#D946EF',  // Base pink
    600: '#C026D3',
    700: '#A21CAF',
    800: '#86198F',
    900: '#701A75',
  },

  // Surface & Background (dark theme)
  surface: {
    base: '#0F1419',      // Base dark
    elevated: '#1A1F2E',  // Elevated surface
    subtle: '#242936',    // Subtle contrast
    glass: 'rgba(255, 255, 255, 0.05)', // Glassmorphism
  },

  background: {
    primary: '#0A0E14',   // Primary dark
    secondary: '#0F1419', // Secondary dark
    gradient: 'linear-gradient(135deg, #1E3A8A 0%, #581C87 50%, #831843 100%)',
  },

  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#94A3B8',
    tertiary: '#64748B',
    disabled: '#475569',
  },

  // Semantic
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
};
```

---

### Spacing Scale

```typescript
// Spacing tokens (8px base grid)
const spacing = {
  0: '0px',
  1: '4px',    // 0.25rem
  2: '8px',    // 0.5rem
  3: '12px',   // 0.75rem
  4: '16px',   // 1rem
  5: '20px',   // 1.25rem
  6: '24px',   // 1.5rem
  8: '32px',   // 2rem
  10: '40px',  // 2.5rem
  12: '48px',  // 3rem
  16: '64px',  // 4rem
  20: '80px',  // 5rem
  24: '96px',  // 6rem
};
```

---

### Border Radius Scale

```typescript
// Border radius tokens
const borderRadius = {
  none: '0px',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
};
```

---

### Shadow & Glow Tokens

```typescript
// Shadow/Glow tokens (glassmorphism + neon effects)
const shadows = {
  // Standard shadows
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  base: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
  md: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
  lg: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
  xl: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',

  // Glow effects (neon/premium)
  glow: {
    primary: '0 0 20px rgba(99, 102, 241, 0.6)',
    secondary: '0 0 20px rgba(168, 85, 247, 0.6)',
    accent: '0 0 20px rgba(217, 70, 239, 0.6)',
  },

  // Glassmorphism
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
};
```

---

### Typography Scale

```typescript
// Typography tokens
const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Inter", system-ui, sans-serif',
    mono: '"SF Mono", "Fira Code", "Consolas", monospace',
  },

  fontSize: {
    xs: ['12px', { lineHeight: '16px' }],
    sm: ['14px', { lineHeight: '20px' }],
    base: ['16px', { lineHeight: '24px' }],
    lg: ['18px', { lineHeight: '28px' }],
    xl: ['20px', { lineHeight: '28px' }],
    '2xl': ['24px', { lineHeight: '32px' }],
    '3xl': ['30px', { lineHeight: '36px' }],
    '4xl': ['36px', { lineHeight: '40px' }],
    '5xl': ['48px', { lineHeight: '1' }],
    '6xl': ['60px', { lineHeight: '1' }],
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    black: '900',
  },
};
```

---

## 3. Component Priority Matrix

### P0 (Foundation) — Sprint 0

Componentes necessários antes de qualquer outro. Base do sistema.

| Componente | Categoria | Razão |
|------------|-----------|-------|
| **Button Primary** | Atom | Ação mais comum em qualquer UI |
| **Button Primary (form)** | Atom | Submissão de formulários |
| **Input** | Atom | Base para todos os inputs |
| **Text Block Double** | Molecule | Tipografia base (títulos + subtítulos) |
| **Background Web 1/2** | Template | Layout base necessário |

**Total P0: 5 componentes**

---

### P1 (Core) — Sprint 1-2

Componentes mais usados em interfaces reais.

| Componente | Categoria | Razão |
|------------|-----------|-------|
| **Button Shiny** | Atom | CTAs premium |
| **Search** | Molecule | Navegação e filtros |
| **Navigation Menu** | Organism | Navegação global obrigatória |
| **Template Card** | Organism | Padrão de card mais comum |
| **Pricing Card** | Organism | Conversão/monetização |
| **Alert** | Molecule | Feedback de ações |
| **Modal (Payment)** | Organism | Fluxos de conversão |
| **Toggle Vertical** | Atom | Switchers de tema |
| **Menu (tab)** | Molecule | Navegação secundária |
| **Code Block** | Organism | Documentação técnica |

**Total P1: 10 componentes**

---

### P2 (Extended) — Sprint 3+

Componentes especializados para funcionalidades avançadas.

| Componente | Categoria | Razão |
|------------|-----------|-------|
| **Button Logo (Figma/Framer)** | Atom | Badges de ferramentas |
| **Switch 3D** | Atom | Toggle avançado (animation-heavy) |
| **Side Menu** | Organism | Navegação secundária |
| **Layers Menu** | Organism | UIs estilo IDE |
| **Inspector Detail** | Organism | Ferramentas avançadas |
| **Inspector Menu** | Organism | Variante compacta do inspector |
| **Finance Card** | Organism | Dashboards financeiros |
| **FAQ Card** | Organism | Páginas de suporte |
| **Reply Card** | Organism | Sistemas de comentários |
| **Notification** | Organism | Centro de notificações |
| **Popover** | Molecule | Menus contextuais avançados |
| **Text Block Buttons** | Molecule | Headers com filtros |

**Total P2: 12 componentes**

---

## 4. Component Dependencies

### Dependency Graph

```
ATOMS (base layer)
├── Button Primary
├── Button Primary (form)
├── Button Shiny
├── Button Logo (Figma/Framer)
├── Input
├── Toggle Vertical
└── Switch 3D

MOLECULES (depend on atoms)
├── Search
│   └── requires: Input
├── Menu (tab)
│   └── requires: Button Primary
├── Alert
│   └── requires: Text, Button Primary
├── Popover
│   └── requires: Text, Button Primary
├── Text Block Buttons
│   └── requires: Button Primary
└── Text Block Double
    └── requires: Typography tokens only

ORGANISMS (depend on atoms + molecules)
├── Navigation Menu
│   ├── requires: Button Primary, Search
│   └── requires: Logo atoms
├── Side Menu
│   └── requires: Button Primary, Text
├── Layers Menu
│   └── requires: Button Primary, Text, Icons
├── Inspector Menu
│   └── requires: Button Primary, Input, Toggle
├── Inspector Detail
│   └── requires: Inspector Menu + extended controls
├── Template Card
│   └── requires: Button Primary, Text, Image container
├── Finance Card
│   └── requires: Text, Chart components (external?)
├── Pricing Card
│   └── requires: Button Shiny, Text, Toggle
├── FAQ Card
│   └── requires: Button Primary, Text
├── Reply Card
│   └── requires: Button Primary, Text, Avatar (missing?)
├── Notification
│   └── requires: Button Primary, Text, Icons
├── Code Block
│   └── requires: Text (mono), Syntax highlighting (external?)
└── Payment Modal
    └── requires: Input, Button Primary, Card layout

TEMPLATES (composition layer)
├── Hero
│   └── composes: Multiple organisms + background
├── Components Showcase
│   └── composes: Grid layout + organisms
├── Background Web 1
│   └── pure visual (no dependencies)
└── Background Web 2
    └── pure visual (no dependencies)
```

---

### Missing Dependencies (To Be Defined)

| Componente Atual | Precisa de | Prioridade |
|-----------------|------------|------------|
| Reply Card | Avatar component | P1 |
| Finance Card | Chart library integration | P2 |
| Code Block | Syntax highlighter | P1 |
| Notification | Icon system | P1 |
| Layers Menu | Icon system | P2 |
| Navigation Menu | Logo component | P0 |

---

## 5. Implementation Roadmap

### Sprint 0: Foundation (1 semana)

**Objetivo:** Estabelecer base do design system.

**Entregáveis:**
- Design tokens completos (colors, spacing, typography, shadows)
- Documentação de tokens
- Configuração de ferramentas (Storybook/Histoire)
- Atoms P0:
  - Button Primary (`198:29982`)
  - Button Primary (form) (`303:23138`)
  - Input (`303:23126`)
- Typography system (Text Block Double `376:760812`)
- Background templates (`306:24237`, `370:732417`)

**Critério de aceitação:**
- Tokens exportados e documentados
- 3 atoms funcionais com variantes
- Storybook configurado e rodando

---

### Sprint 1: Core Interactions (2 semanas)

**Objetivo:** Componentes essenciais para navegação e feedback.

**Entregáveis:**
- **Atoms:**
  - Button Shiny (`198:30032`, `377:764098`)
  - Toggle Vertical (`377:766811`)
- **Molecules:**
  - Search (`303:23605`)
  - Menu (tab) (`303:23377`)
  - Alert (`370:732425`)
- **Organisms:**
  - Navigation Menu (`198:29942`)
  - Template Card (`195:28993`)

**Critério de aceitação:**
- Navegação global funcional
- Sistema de feedback básico (alerts)
- Card pattern estabelecido

---

### Sprint 2: Conversion & Content (2 semanas)

**Objetivo:** Componentes para conversão e apresentação de conteúdo.

**Entregáveis:**
- **Organisms:**
  - Pricing Card (`198:30094`)
  - Payment Modal (`370:732424`)
  - Code Block (`370:732423`)

**External dependencies:**
- Integrar syntax highlighter (Prism.js ou similar)
- Definir padrão de modal overlay

**Critério de aceitação:**
- Fluxo de pricing completo
- Modal de pagamento funcional
- Code blocks com syntax highlighting

---

### Sprint 3: Advanced Navigation (1-2 semanas)

**Objetivo:** Sistemas de navegação especializados.

**Entregáveis:**
- **Atoms:**
  - Button Logo (Figma/Framer) (`198:29988`, `198:30005`)
- **Organisms:**
  - Side Menu (`190:21309`)
  - Layers Menu (`306:30277`)
  - Inspector Menu (`370:732421`)
  - Popover (`370:732419`)

**Critério de aceitação:**
- 3 padrões de menu distintos funcionais
- Popover system reutilizável

---

### Sprint 4: Content & Engagement (1-2 semanas)

**Objetivo:** Componentes para engajamento e comunicação.

**Entregáveis:**
- **Organisms:**
  - FAQ Card (`370:732427`)
  - Reply Card (`370:732426`)
  - Notification (`303:23720`)

**Missing dependencies:**
- Avatar component (criar)
- Icon system (definir)

**Critério de aceitação:**
- Sistema de comentários básico
- Centro de notificações funcional
- FAQ expansível

---

### Sprint 5: Advanced Features (2 semanas)

**Objetivo:** Funcionalidades avançadas e especializadas.

**Entregáveis:**
- **Atoms:**
  - Switch 3D (`303:23154`)
- **Organisms:**
  - Inspector Detail (`370:732420`)
  - Finance Card (`305:6791`)
  - Text Block Buttons (`376:760811`)

**External dependencies:**
- Chart library (Chart.js, Recharts, ou similar)

**Critério de aceitação:**
- Inspector panel completo
- Dashboards com gráficos
- Animações 3D funcionais

---

### Sprint 6: Templates & Composition (1 semana)

**Objetivo:** Templates de página completos.

**Entregáveis:**
- Hero section (`64:49960`)
- Components Showcase (`370:732416`)
- Documentação de composição
- Guidelines de layout

**Critério de aceitação:**
- 2 templates de página funcionais
- Guia de composição publicado
- Exemplos de uso completos

---

## 6. Technical Considerations

### Stack Recomendado

```typescript
// Core
- React 18+ (composition, hooks)
- TypeScript (type safety)
- Tailwind CSS (utility-first, tokens via config)

// Tooling
- Vite (build tool)
- Storybook 7+ (documentation)
- Vitest (unit tests)

// Animation
- Framer Motion (3D toggles, transitions)

// External Libs
- Prism.js (syntax highlighting)
- Recharts (finance card charts)
```

---

### File Structure

```
src/
├── tokens/
│   ├── colors.ts
│   ├── spacing.ts
│   ├── typography.ts
│   ├── shadows.ts
│   └── index.ts
├── atoms/
│   ├── Button/
│   ├── Input/
│   ├── Toggle/
│   └── ...
├── molecules/
│   ├── Search/
│   ├── Alert/
│   ├── MenuTab/
│   └── ...
├── organisms/
│   ├── Navigation/
│   ├── Cards/
│   ├── Modals/
│   └── ...
├── templates/
│   ├── Hero/
│   ├── Showcase/
│   └── ...
└── utils/
    ├── glassmorphism.ts
    └── gradients.ts
```

---

## 7. Design Principles (Brad Frost POV)

### Atomic Design na Prática

1. **Atoms devem ser agnósticos de contexto**
   - Button não sabe onde será usado
   - Input não conhece o formulário
   - Toggle funciona sozinho

2. **Molecules resolvem um problema específico**
   - Search = Input + ícone + comportamento
   - Alert = Texto + ícone + botão de dismiss
   - MenuTab = Navegação horizontal entre seções

3. **Organisms são auto-suficientes**
   - Navigation tem tudo que precisa para navegar
   - Card tem layout + conteúdo + ações
   - Modal controla próprio overlay + foco

4. **Templates são sobre layout, não conteúdo**
   - Hero define estrutura, não copia
   - Showcase define grid, não componentes específicos

---

### Glassmorphism Pattern

```typescript
// Utility para glassmorphism consistente
const glassEffect = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
};

// Uso em componentes:
// <div className="glass-surface">...</div>
```

---

### Gradient Mesh Pattern

```typescript
// Backgrounds gradientes mesh (azul → roxo → rosa)
const meshGradients = {
  primary: 'linear-gradient(135deg, #1E3A8A 0%, #581C87 50%, #831843 100%)',
  secondary: 'radial-gradient(circle at 20% 50%, #1E3A8A 0%, #581C87 50%, #831843 100%)',
  subtle: 'linear-gradient(180deg, rgba(30, 58, 138, 0.3) 0%, rgba(88, 28, 135, 0.3) 100%)',
};
```

---

## 8. Quality Checklist (Per Component)

Antes de marcar um componente como "completo":

- [ ] Props tipadas com TypeScript
- [ ] Variantes documentadas no Storybook
- [ ] Testes unitários (vitest)
- [ ] Responsividade validada (mobile + desktop)
- [ ] Acessibilidade (ARIA, keyboard nav)
- [ ] Dark mode + Light mode funcionais
- [ ] Design tokens aplicados (sem valores hardcoded)
- [ ] Performance validada (Lighthouse)

---

## 9. Next Steps

1. **Validar roadmap** com stakeholders
2. **Configurar projeto** (Vite + React + Tailwind + Storybook)
3. **Implementar tokens** (Sprint 0)
4. **Extrair primeiro componente** do Figma via MCP:
   ```
   mcp__figma__get_design_context(
     fileKey: "zQDO3tbtArViznGtpZDubA",
     nodeId: "198:29982" // Button Primary
   )
   ```
5. **Estabelecer padrão** de documentação no Storybook

---

*Documento gerado por @brad-frost em 2026-03-10*
*Baseado em 28 componentes mapeados do DesignCode UI Kit*
