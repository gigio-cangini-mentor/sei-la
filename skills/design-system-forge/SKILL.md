---
name: design-system-forge
description: Interactive pipeline — clone any website into a premium design system with Storybook
allowed-tools: [Read, Write, Edit, Glob, Grep, Bash, Agent, AskUserQuestion]
version: "2.0.0"
category: design
requires: aios
quest-pack: design-system-forge
---

# 🎨 Design System Forge

Pipeline interativo que transforma qualquer site em um design system premium com Storybook completo.

**Filosofia:** Extraia o DNA. Eleve o design. Entregue arte.

---

## Entry Point

Ao ser ativada, esta skill GUIA o usuário passo a passo. Nunca assume — sempre pergunta.

### Passo 1: Descobrir o alvo

Use `AskUserQuestion` para perguntar:

```
Qual site você quer clonar? Cole a URL completa (ex: https://circle.so/br)
```

Validar que é uma URL válida (começa com http/https). Se não, pedir de novo.

### Passo 2: Nomear o design system

Sugerir nome baseado no domínio:
```
URL: https://circle.so/br → Sugestão: "circle-br"

Como quer chamar esse design system?
1. circle-br (Recomendado)
2. Outro nome (digitar)
```

### Passo 3: Escolher pasta

```
Onde criar o projeto?
1. ~/CODE/design-systems/{nome}/ (Recomendado — padrão do catálogo)
2. Pasta existente (selecionar)
3. Outro local (digitar)
```

Se a pasta já existe, perguntar:
```
A pasta ~/CODE/design-systems/{nome}/ já existe.
1. Usar mesmo (pode sobrescrever design-system/)
2. Criar com sufixo ({nome}-v2)
3. Cancelar
```

### Passo 4: Verificar pré-requisitos

Checar automaticamente (sem perguntar):
- [ ] Playwright instalado? → Se não: `! npm install -D @playwright/test && npx playwright install chromium`
- [ ] Pasta ~/CODE/design-systems/ existe? → Se não: criar

Se algo falhar, explicar e pedir pro usuário rodar o comando via `!`.

### Passo 5: Extrair o DNA

Rodar automaticamente:
```bash
node ~/aios-core/squads/design/scripts/dissect-artifact.cjs {url} \
  --name {nome} --clone --mobile --timeout 60 \
  --output {pasta}/design-system
```

Mostrar resumo:
```
✅ Extração completa!

📊 Resumo:
  Cores:          {N} únicas
  Tipografia:     {N} variantes
  Animações:      {N} @keyframes
  CSS Variables:  {N}
  Componentes:    {N} tipos ({N} instâncias)
  Imagens:        {N} baixadas
  Fontes:         {N} capturadas
  SVGs:           {N} extraídos
```

### Passo 6: Preview e aprovação

Servir o clone localmente:
```bash
cd {pasta}/design-system && python3 -m http.server 8888 --bind 0.0.0.0 &
```

Perguntar:
```
O clone está rodando em http://localhost:8888/clean-structure.html

Abre no browser e compara com o original ({url}).

Como ficou?
1. Ficou ótimo — prosseguir para o scaffold
2. Precisa melhorar — me diz o que está diferente
3. Está ruim — tentar extrair de novo com mais tempo
```

Se "Precisa melhorar": perguntar o que está diferente e tentar ajustar (re-rodar dissect com timeout maior, ajustar CSS, etc.)

### Passo 7: Análise de animações

Ler o `extracted-css.json` e verificar se há animações complexas:

```javascript
// Se animations.length > 5 ou tem scroll/3d patterns
```

Se sim, mostrar:
```
🎬 O site tem {N} animações. Algumas são complexas:
  - gradientFlow (gradient animado)
  - infinitescroll (marquee de logos)
  - shine (brilho no botão)

Para replicar com qualidade premium, consulte estas referências:
  → ui.aceternity.com — micro-interactions, cards 3D, spotlight
  → magicui.design — componentes animados React
  → animista.net — gerador visual de @keyframes CSS

Quer que eu abra alguma dessas? Ou prosseguir para o scaffold?
```

### Passo 8: Handoff para scaffold

```
Próximo passo: criar o projeto Next.js + Tailwind + Storybook.

Quer prosseguir? Vou chamar /design-system-scaffold com os dados extraídos.
1. Sim, prosseguir (Recomendado)
2. Parar aqui — só queria a extração
```

Se sim: orientar o usuário a executar `/design-system-scaffold` passando o caminho dos dados extraídos.

---

## Ferramentas Disponíveis

| Ferramenta | Onde vive | O que faz |
|---|---|---|
| `dissect-artifact.cjs` | `squads/design/scripts/` | Motor Playwright: extrai CSS, DOM, assets, HTML reconstrutível |
| `design-system-extractor` | `skills/design-system-extractor/` | Geração de token templates TypeScript |
| `smart-browser-playwright` | `tools/smart-browser-playwright/` | Automação de browser para scraping |
| `/design` squad | `squads/design/` | Brad Frost (tokens), Dan Mall (elevação), Dave Malouf (a11y) |
| `dembrandt` | CLI global (npm) | Extração rápida de tokens (DTCG JSON) |

## Scripts CLI (lib/)

### Extração

```bash
# Clone completo (RECOMENDADO — usa por padrão)
node ~/aios-core/skills/design-system-forge/lib/dissect.mjs <url> --name <name> --clone --mobile

# Só tokens (rápido, sem assets)
node ~/aios-core/skills/design-system-forge/lib/dissect.mjs <url> --name <name>

# Estados interativos (:hover, :focus, :active)
node ~/aios-core/skills/design-system-forge/lib/extract-states.mjs <url> --name <name>

# Dark mode
node ~/aios-core/skills/design-system-forge/lib/extract-dark-mode.mjs <url> --name <name>
```

### Referências

```bash
node ~/aios-core/skills/design-system-forge/lib/scrape-references.mjs --source awwwards
node ~/aios-core/skills/design-system-forge/lib/scrape-references.mjs --source 21st
node ~/aios-core/skills/design-system-forge/lib/scrape-references.mjs --source <name> --url <url>
```

### Tokens

```bash
# Consolidar tokens de múltiplas fontes
node ~/aios-core/skills/design-system-forge/lib/consolidate-tokens.mjs \
  --dembrandt ./dembrandt-output.json \
  --dissect ./design-system/tokens.yaml

# Gerar tailwind.config.ts + tokens.css
node ~/aios-core/skills/design-system-forge/lib/generate-tailwind.mjs \
  --input ./design-system/tokens/consolidated.yaml
```

### QA

```bash
# Visual diff: original vs redesign
node ~/aios-core/skills/design-system-forge/lib/visual-diff.mjs \
  --original ./design-system/screenshots/original.png \
  --redesign ./screenshots/redesign.png
```

---

## Fontes de Animação (OBRIGATÓRIO consultar quando há animações complexas)

| Tipo | Fonte | URL | Quando usar |
|------|-------|-----|-------------|
| Scroll animations | Framer Motion | npmjs.com/package/framer-motion | Elementos que aparecem/transformam ao scrollar |
| Scroll animations | GSAP | gsap.com | ScrollTrigger, timelines complexas, performance |
| Partículas/3D | tsparticles | particles.js.org | Background com pontos, confetti, conexões |
| Partículas/3D | Three.js | threejs.org | WebGL, cenas 3D, shaders |
| Gradientes animados | CSS puro | — | gradientFlow, background-position animate |
| Gradientes animados | Grainy Gradients | grainy-gradients.vercel.app | Texturas noise + gradiente |
| Micro-interactions | Aceternity UI | ui.aceternity.com | Hover effects, cards 3D, spotlight |
| Micro-interactions | Magic UI | magicui.design | Componentes animados React |
| Micro-interactions | 21st.dev | 21st.dev | Componentes premium copiáveis |
| Lottie animations | LottieFiles | lottiefiles.com | Ícones animados, ilustrações, loading |
| CSS animations | Awwwards Collections | awwwards.com/awwwards/collections/css-js-animations | Catálogo por categoria |
| CSS animations | Animista | animista.net | Gerador visual de @keyframes |
| Blob/Morphing | Blobmaker | blobmaker.app | Formas orgânicas SVG |
| Blob/Morphing | Haikei | haikei.app | Backgrounds SVG (waves, blobs, gradients) |
| Marquee/Scroll | React Fast Marquee | npmjs.com/package/react-fast-marquee | Scroll infinito de logos |

**Regra:** @keyframes simples → CSS puro. Interação com scroll/mouse/3D → buscar nas bibliotecas acima.

---

## Pipeline Completo (3 skills)

```
/design-system-forge          ← VOCÊ ESTÁ AQUI
  → Pergunta URL, nome, pasta
  → Extrai DNA (dissect --clone)
  → Preview + aprovação
  → Análise de animações

/design-system-scaffold        ← Próximo passo
  → Cria Next.js + Tailwind + Shadcn
  → Instala Storybook 8
  → Copia assets, gera tokens

/design-system-storybook       ← Passo final
  → Gera componentes (atoms → molecules → organisms)
  → Cria stories completas
  → Guia melhorias
  → Score de completude

/design-system-catalog         ← Catálogo
  → Registra no CATALOG.md
  → Screenshot + métricas
```

---

## Output da Extração

```
{pasta}/design-system/
├── clean-structure.html     # HTML reconstrutível (servir local pra preview)
├── source.html              # HTML original bruto
├── section-map.json         # Mapa de seções top-level
├── asset-map.json           # URL remota → caminho local
├── tokens.yaml              # Cores, tipografia, espaçamentos
├── extracted-css.json       # Animações, gradientes, shadows, layouts
├── components.json          # Componentes detectados com amostras
├── dom-tree.json            # DOM com computed styles
├── manifest.json            # Metadados da extração
├── screenshots/
│   ├── screenshot-desktop.png
│   └── screenshot-mobile.png
├── stylesheets/             # Todos os CSS (CDN + embedded)
├── images/                  # Todas as imagens
├── fonts/                   # Fontes (.woff2)
└── svgs/                    # SVGs extraídos
```
