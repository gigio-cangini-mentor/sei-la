---
name: video-generator
description: |
  Generates branded videos from content + brand tokens using Remotion (React -> MP4).
  Supports reels (9:16), stories, landscape (16:9), square (1:1), animated carousels,
  and GIFs. Integrates with ai-reels squad for voice + avatar capabilities.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
argument-hint: "{content}" --brand {name} --format reel|story|landscape|square|carousel|gif
version: 1.1.0
category: content-production
tags: [video, remotion, reel, brand, animation, mp4, gif]
paths:
  - "skills/video-generator/"
lazy_load: true
context_budget: 1000
---

# Video Generator

Gera vídeos branded usando Remotion (React -> MP4). É como ter um editor de vídeo que entende sua marca — cores, fontes, estilo de animação, tudo alinhado automaticamente.

## When to Use This Skill

- Gerar reels/shorts branded (Instagram, TikTok, YouTube)
- Criar stories animados com identidade visual
- Produzir vídeos landscape para apresentações
- Animated carousels (4:5) com motion
- GIFs branded para web/email
- Vídeos com voiceover sintetizado ou avatar (via ai-reels)

## Do NOT Use This Skill When

- Precisa apenas de imagens estáticas → use `image-creator`
- Quer editar um vídeo existente (cortar, trimmar) → use ferramentas de edição de vídeo
- Precisa de screen recording → use ferramentas de captura de tela
- O vídeo não precisa de branding → grave direto no celular

## Discovery Questions

1. **Qual o conteúdo do vídeo?** — (script, tópicos, ou outline)
2. **Qual formato?** — (reel 9:16, story 9:16, landscape 16:9, square 1:1, carousel 4:5, gif)
3. **Qual brand template usar?** — (nome do template no Vault)
4. **Precisa de voiceover ou avatar?** — (se sim, delega para ai-reels)
5. **Duração aproximada?** — (auto-detect ou específica)

## Prerequisites

- Node.js 18+ instalado
- Remotion e dependências (instalados sob demanda):
  ```
  npm install @remotion/cli@^4.0 @remotion/bundler@^4.0 @remotion/google-fonts@^4.0 @remotion/transitions@^4.0 react@^19 react-dom@^19 typescript@^5
  ```
- FFmpeg instalado (`brew install ffmpeg`) — necessário para encoding MP4
- Brand tokens configurados no Vault (cores, fontes, logo)

## Tech Stack

```
@remotion/cli@^4.0           — CLI rendering (npx remotion render)
@remotion/bundler@^4.0       — Webpack bundler para compositions
@remotion/google-fonts@^4.0  — Font loading dinâmico
@remotion/transitions@^4.0   — Transições profissionais entre scenes
react@^19.0                  — Component runtime
typescript@^5.0              — Type safety
gray-matter                  — YAML/Markdown frontmatter parser
```

## Core Workflow

### Phase 1: Parse Content + Brand

1. Receber conteúdo (script, outline, tópicos)
2. Carregar brand tokens do Vault (cores, fontes, logo, motion style)
3. Derivar motion style da personalidade da marca:

| Personalidade | Spring Config | Exemplos de Marca |
|---------------|---------------|-------------------|
| Minimal | `damping: 20, stiffness: 100` — fades suaves, ease-out | Linear, Vercel, Notion |
| Bold | `damping: 12, stiffness: 200` — spring pops, scale | Nike, Spotify, Apple |
| Corporate | `damping: 25, stiffness: 80` — fades lentos, pans | Banks, McKinsey |
| Playful | `damping: 8, stiffness: 300` — elastic springs, rotação | Games, kids brands |

### Phase 2: Scene Composition

Dividir conteúdo em scenes seguindo a estrutura padrão:

| Scene | Timing | Função |
|-------|--------|--------|
| Intro | 0-3s | Logo animation + brand colors de fundo |
| Hook | 3-6s | Key message em texto grande, captura atenção |
| Body | 6s-Ns | Content scenes com transições entre tópicos |
| CTA | Últimos 3-5s | Call to action + logo + informações de contato |

Cada scene recebe:
- Safe zones aplicadas por formato (ver tabela abaixo)
- Remotion composition config gerado automaticamente
- Transições entre scenes baseadas no motion style

### Phase 3: Asset Integration

- Importar imagens do Brush (se geradas por image-creator)
- Carregar fontes via `@remotion/google-fonts`
- Aplicar brand tokens como CSS variables no tema
- Injetar logo nos pontos corretos (intro + CTA)
- Garantir que assets estejam em formato compatível (PNG, SVG, JPEG)

### Phase 4: Render

```bash
# Render via compose-video.mjs
node skills/video-generator/compose-video.mjs \
  --content script.md \
  --brand brand.yaml \
  --format reel \
  --output output/video.mp4
```

Parâmetros de render:
- **MP4:** H.264 codec, 30fps, CRF 18 (alta qualidade)
- **GIF:** 15fps, paleta otimizada, max 10s
- **Output:** salvo em `output/` do squad/projeto

### Phase 5: Audio (opcional — via ai-reels)

Se o vídeo precisa de voiceover, avatar ou captions, delegar para o squad `ai-reels`:

| Capability | Ferramenta | O Que Faz |
|-----------|-----------|-----------|
| Voiceover | ElevenLabs TTS | Voz sintetizada a partir do script |
| Avatar | HeyGen | Avatar com lip-sync sincronizado |
| Captions | Whisper | Legendas word-level com timing preciso |
| Auto-cuts | Pipeline interno | Detecta pausas, alterna zoom/ângulo |

Workflow de merge:
1. Render vídeo sem áudio (Phase 4)
2. Gerar áudio via ai-reels
3. Merge áudio + vídeo com FFmpeg
4. Exportar versão final

## Video Formats

| Format | Dimensions | FPS | Max Duration | Safe Zones | Plataforma |
|--------|-----------|-----|-------------|------------|------------|
| Reel/Short 9:16 | 1080x1920 | 30 | 90s | 90px top/bottom | Instagram, TikTok, YouTube Shorts |
| Story 9:16 | 1080x1920 | 30 | 15s | 120px top, 200px bottom | Instagram, Facebook Stories |
| Landscape 16:9 | 1920x1080 | 30 | unlimited | 60px all | YouTube, apresentações |
| Square 1:1 | 1080x1080 | 30 | 60s | 60px all | Feed Instagram/Facebook |
| Animated Carousel 4:5 | 1080x1350 | 30 | 60s | 60px all | Instagram carousel |
| GIF | configurável | 15 | 10s | none | Web, email, Slack |

### Safe Zones — Por Que Importam

Safe zones são como a margem de segurança numa página: o conteúdo que fica fora delas pode ser cortado pela interface da plataforma (barra de status, username, botões de interação). Respeitar safe zones garante que nenhum texto ou elemento importante fique escondido.

## Brand Motion Language

```typescript
// Derive spring config from brand personality
const motionPresets = {
  minimal: { damping: 20, stiffness: 100 },   // Linear, Vercel
  bold: { damping: 12, stiffness: 200 },       // Nike, Spotify
  corporate: { damping: 25, stiffness: 80 },   // Banks, consulting
  playful: { damping: 8, stiffness: 300 },     // Games, kids
};

// Apply to Remotion spring()
import { spring } from 'remotion';

const scale = spring({
  fps: 30,
  frame,
  config: motionPresets[brandPersonality],
});
```

### Transition Types por Personality

| Personality | Entrada | Saída | Entre Scenes |
|-------------|---------|-------|-------------|
| Minimal | Fade in (0.5s) | Fade out (0.5s) | Cross dissolve |
| Bold | Scale pop + slide | Quick fade | Wipe / slide |
| Corporate | Slow fade (1s) | Slow fade (1s) | Fade through black |
| Playful | Bounce in | Spin out | Elastic slide |

## Squad Integration

Este skill delega capabilities avançadas para o squad `ai-reels`:
- **Remotion pipeline completo** (8 camadas de composição)
- **ElevenLabs TTS** (voiceover sintetizado)
- **HeyGen** (avatar com lip-sync)
- **Whisper** (captions word-level)
- **Auto-cuts** (detecta pausas, alterna zoom)

### Como delegar para ai-reels

1. Gerar o vídeo base (sem áudio) com este skill
2. Chamar o squad ai-reels passando:
   - Caminho do vídeo base
   - Script/texto para voiceover
   - Configuração de voz (idioma, tom, velocidade)
3. O squad retorna o vídeo final com áudio mergeado

## Examples

### Exemplo 1: Reel de 30s com texto animado

```bash
node skills/video-generator/compose-video.mjs \
  --content "3 dicas de produtividade: 1. Blocos de tempo 2. Uma tarefa por vez 3. Pausas estratégicas" \
  --brand minha-marca.yaml \
  --format reel \
  --output output/dicas-produtividade.mp4
```

### Exemplo 2: GIF branded para email

```bash
node skills/video-generator/compose-video.mjs \
  --content "Lançamento: Nova Feature X" \
  --brand minha-marca.yaml \
  --format gif \
  --output output/lancamento.gif
```

### Exemplo 3: Vídeo landscape para apresentação

```bash
node skills/video-generator/compose-video.mjs \
  --content apresentacao.md \
  --brand corporativo.yaml \
  --format landscape \
  --output output/apresentacao.mp4
```

## Quality Standards

O output é validado com Video Scoring Matrix:

| Critério | Peso | O Que Avalia |
|----------|------|-------------|
| Brand Colors | 25pts | Cores do vídeo batem com os tokens da marca |
| Typography | 20pts | Fontes corretas, legíveis, hierarquia visual |
| Animations | 20pts | Motion style consistente com personalidade |
| Layout & Safe Zones | 20pts | Conteúdo dentro das safe zones, alinhamento |
| Logo & Identity | 15pts | Logo presente nos pontos corretos, proporções |

**Threshold:** >= 70 pontos = PASS | < 70 = requer ajustes

## Troubleshooting

### Erro: "Cannot find module @remotion/cli"

**Causa:** Remotion não está instalado no projeto.
**Solução:**
```bash
npm install @remotion/cli @remotion/bundler react react-dom
```

### Erro: "FFmpeg not found"

**Causa:** FFmpeg não está instalado no sistema.
**Solução:**
```bash
brew install ffmpeg    # macOS
sudo apt install ffmpeg  # Linux
```

### Vídeo renderiza com tela preta

**Causas comuns:**
1. Fontes não carregaram — verificar se usa `@remotion/google-fonts` corretamente
2. Imagens com caminho relativo — usar caminhos absolutos
3. CSS com `overflow: hidden` cortando conteúdo — verificar dimensões do body

### Render muito lento (> 5min para 30s de vídeo)

**Soluções:**
1. Usar `--concurrency 4` para paralelizar frames
2. Reduzir resolução para teste (540x960 em vez de 1080x1920)
3. Verificar se não há animações desnecessárias recalculando a cada frame

### Cores não batem com a marca

**Causa:** Brand tokens não foram carregados ou estão em formato errado.
**Solução:** Verificar se o arquivo `brand.yaml` tem os campos `colors.primary`, `colors.secondary`, `colors.background`, `colors.text`.

## Key Files

| Arquivo | Função |
|---------|--------|
| `skills/video-generator/SKILL.md` | Documentação e instruções desta skill |
| `skills/video-generator/compose-video.mjs` | Script de orquestração (parse → compose → render) |
| `squads/ai-reels/` | Squad para capabilities de áudio/avatar |
