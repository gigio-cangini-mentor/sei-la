---
name: pptx-generator
description: |
  Gera apresentações PowerPoint (PPTX) profissionais a partir de conteúdo + brand tokens.
  Usa PptxGenJS para geração nativa de PPTX. Suporta master slides, charts,
  imagens e layouts branded. Output é Widescreen 16:9 (10x5.625in).
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: "{content}" --brand {name} [--slides N] [--layout auto|grid|split]
version: 1.0.0
category: content-production
tags: [pptx, presentation, slides, brand, powerpoint]
paths:
  - "skills/pptx-generator/"
lazy_load: true
context_budget: 800
---

# PPTX Generator

Gera apresentações PowerPoint profissionais a partir de conteúdo + brand tokens. É como ter um designer de apresentações que nunca erra as cores da marca — você entrega o conteúdo e ele devolve slides prontos.

## When to Use This Skill

| Cenário | Exemplo |
|---------|---------|
| Gerar apresentações branded a partir de texto | "Cria uma apresentação sobre X com a marca Y" |
| Converter relatórios em slide decks | "Transforma esse relatório em slides" |
| Criar master slides para uma marca | "Monta o template de slides da marca Z" |
| Batch generation de múltiplos decks | "Gera 5 apresentações a partir desses outlines" |
| Apresentação para pitch/investidores | "Cria um pitch deck com esses dados" |
| Material de treinamento/curso | "Transforma essas aulas em slides" |

## Do NOT Use This Skill When

| Cenário | Alternativa |
|---------|-------------|
| Precisa de slides com animações complexas | Editar manualmente no PowerPoint |
| Quer editar PPTX existente | Abrir no PowerPoint/Google Slides |
| Precisa de PDF, não PPTX | Use `md-to-branded-pdf` ou exportar depois |
| Quer landing page, não slides | Use `lp-generator` |
| Conteúdo ainda não existe | Criar conteúdo primeiro com copywriting squad |
| Design system não está definido | Criar brand tokens com BrandCraft primeiro |

## Discovery Questions

Perguntas para fazer antes de executar. Use AskUserQuestion tool. Pule se o usuário já forneceu esse contexto.

1. **Qual o conteúdo da apresentação?** — (texto, outline, tópicos, ou arquivo Markdown)
2. **Qual brand template usar?** — (nome do template no Vault do BrandCraft, ou cores/fonte manualmente) *(opcional — usa default se não informado)*
3. **Quantos slides aproximadamente?** — (auto-detect por padrão, ou número fixo) *(opcional)*
4. **Precisa de imagens ou charts?** — (se sim, descrever quais dados ou imagens incluir) *(opcional)*
5. **Qual o contexto da apresentação?** — (pitch, aula, relatório, palestra — muda o tom e layout) *(opcional)*

## Prerequisites

| Requisito | Como verificar | Instalação |
|-----------|----------------|------------|
| Node.js 18+ | `node --version` | `brew install node` |
| PptxGenJS | `ls skills/pptx-generator/node_modules/pptxgenjs` | `cd skills/pptx-generator && npm install` |
| Brand tokens (opcional) | Verificar vault do BrandCraft | Criar com BrandCraft ou fornecer manualmente |

**Única dependência:** PptxGenJS. Não precisa de Puppeteer, LibreOffice, ou qualquer runtime pesado.

## Workflow

### Phase 1: Parse Content

1. Receber conteúdo (Markdown, texto, outline, ou tópicos)
2. Classificar cada bloco de conteúdo por tipo:

| Tipo de bloco | Mapeamento |
|---------------|------------|
| Título principal | Slide Title |
| Subtítulo/seção | Section Divider |
| Lista de bullets | Content slide |
| Parágrafo longo | Content slide (quebrar se > 6 linhas) |
| Dados numéricos | Chart slide |
| Citação | Quote slide |
| Imagem referenciada | Image-Text Split |
| CTA/encerramento | Closing slide |

3. Gerar outline dos slides com tipo + conteúdo de cada um

**Veto conditions:**
- Conteúdo vazio ou sem substância → PARAR, solicitar conteúdo
- Mais de 40 slides estimados → AVISAR usuário, confirmar antes de gerar

**Completion criteria:** Outline de slides mapeado com tipos definidos.

### Phase 2: Load Brand Tokens

1. Ler template YAML do Vault do BrandCraft (ou path direto)
2. Extrair tokens necessários:

| Token | Uso | Fallback |
|-------|-----|----------|
| `colors.primary` | Background de títulos, destaques | `#1a1a2e` |
| `colors.secondary` | Acentos, borders | `#16213e` |
| `colors.accent` | CTAs, destaques | `#e94560` |
| `colors.background` | Fundo padrão dos slides | `#ffffff` |
| `colors.text` | Cor do texto body | `#333333` |
| `typography.font_heading` | Fonte de títulos | `Arial` |
| `typography.font_body` | Fonte de corpo | `Arial` |
| `typography.size_h1` | Tamanho título principal | `2.5rem` |
| `typography.size_h2` | Tamanho subtítulo | `1.8rem` |
| `typography.size_h3` | Tamanho mínimo de texto | `1.2rem` |
| `logo` | Path do logo da marca | — |

3. Gerar master slides (title, content, section, closing)

**Veto conditions:**
- Brand template não encontrado e usuário não forneceu cores → usar fallback com aviso

**Completion criteria:** Tokens carregados e master slides definidos.

### Phase 3: Build PPTX

1. Criar deck com PptxGenJS (Widescreen 16:9)
2. Aplicar master slides do Phase 2
3. Popular conteúdo respeitando regras de design:

**Regras obrigatórias de design:**

| Regra | Valor | Por quê |
|-------|-------|---------|
| Máximo de linhas por slide | 6 | Legibilidade — menos é mais |
| Máximo de palavras por bullet | 8 | Slide não é documento |
| Fonte mínima | `size_h3` (nunca `size_body`) | Visibilidade em projeção |
| Fill ratio máximo | 60% | Respiração visual |
| Logo | Todo slide (footer ou header) | Consistência de marca |
| Margem | Mínimo 0.5in em todos os lados | Profissionalismo |

4. Embedar imagens se fornecidas (aceita path local ou URL)
5. Gerar charts se dados numéricos fornecidos (bar, line, pie)

**Veto conditions:**
- Slide com mais de 8 linhas → QUEBRAR em 2 slides
- Texto abaixo do tamanho mínimo → AUMENTAR para `size_h3`

**Completion criteria:** PPTX gerado sem erros.

### Phase 4: Export e Validate

1. Salvar como `.pptx` no caminho de output
2. Validar arquivo gerado (abrir e verificar se não está corrompido)
3. Reportar ao usuário:

```
Apresentação gerada com sucesso.

- Arquivo: output/apresentacao.pptx
- Slides: 12
- Tamanho: 2.4 MB
- Fontes: Montserrat (heading), Open Sans (body)
- Brand: empresa-xyz
- Charts: 2 (bar, pie)
- Imagens: 3
```

**Completion criteria:** Arquivo `.pptx` salvo e métricas reportadas.

## Output Format

```
output/{name}.pptx
```

Widescreen 16:9 (10 x 5.625 inches), formato Open XML.

## Slide Layouts

| Layout | Quando usar | Elementos |
|--------|-------------|-----------|
| Title | Primeiro slide | Título grande + subtítulo + logo + data |
| Content | Texto com bullets | Título + até 6 bullets + logo footer |
| Section Divider | Transição entre seções | Fundo accent + título grande |
| Two-Column | Comparações, prós/contras | 2 colunas lado a lado |
| Image-Text Split | Imagem + explicação | 50/50 horizontal |
| Grid | Lista de itens | 2x2 ou 3x3 cards |
| Chart | Dados numéricos | Bar, line ou pie chart |
| Quote | Citações/depoimentos | Texto grande + aspas + accent |
| Closing | Último slide | CTA + contato + logo central |

## Brand Token Injection

```javascript
const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

// Master slide with brand tokens
pptx.defineSlideMaster({
  title: 'BRAND_TITLE',
  background: { color: tokens.colors.primary },
  objects: [
    { text: { text: '', options: {
      fontFace: tokens.typography.font_heading,
      fontSize: parseFloat(tokens.typography.size_h1) * 16,
      color: tokens.colors.background,
      bold: true
    }}}
  ]
});

// Content master slide
pptx.defineSlideMaster({
  title: 'BRAND_CONTENT',
  background: { color: tokens.colors.background },
  objects: [
    // Logo footer
    { image: { path: tokens.logo, x: 0.5, y: 5.0, w: 1.0, h: 0.4 }},
    // Accent line
    { rect: { x: 0, y: 0, w: 10, h: 0.05, fill: { color: tokens.colors.accent }}}
  ]
});
```

## Quality Standards

O output é validado com Document Scoring Matrix:

| Dimensão | Pontos | O que verifica |
|----------|--------|----------------|
| Brand Colors | 20 | Cores corretas em todos os slides |
| Typography | 20 | Fontes e tamanhos consistentes |
| Spacing | 15 | Margens, paddings, respiração |
| Layout | 30 | Estrutura visual e hierarquia |
| Consistency | 15 | Padrão mantido do primeiro ao último slide |
| **Threshold** | **>=70** | **PASS** |

## Safety

- **Brand tokens:** nunca modificar arquivos do Vault do BrandCraft — apenas ler
- **Imagens:** verificar se paths são válidos antes de embedar
- **Tamanho:** PPTX com muitas imagens pode ficar grande — avisar se > 20MB
- **Dados sensíveis:** apresentações podem conter dados confidenciais — salvar em local adequado

## Troubleshooting

| Problema | Causa provável | Solução |
|----------|----------------|---------|
| `pptxgenjs not found` | Dependência não instalada | `cd skills/pptx-generator && npm install` |
| PPTX corrompido | Erro durante geração | Verificar logs, regenerar |
| Imagem não aparece no slide | Path inválido ou formato não suportado | Usar PNG/JPG, verificar caminho absoluto |
| Fontes diferentes no PowerPoint | Fonte não instalada na máquina de destino | Usar fontes seguras (Arial, Calibri) ou embedar |
| Slides com muito texto | Conteúdo não foi quebrado | Verificar se Phase 1 classificou corretamente |
| Cores erradas | Token de brand incorreto | Verificar YAML do template |
| Chart não renderiza | Dados em formato inválido | Fornecer dados como array de objetos `{label, value}` |
| Logo não aparece | Path relativo ou arquivo movido | Usar path absoluto para o logo |

## Script Location

`skills/pptx-generator/`
