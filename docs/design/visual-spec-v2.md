# Especificacao Visual Definitiva — Ciclo das Estacoes v2

**Documento:** Visual Specification v2.0
**Autor:** Uma (@ux-design-expert)
**Data:** 2026-03-06
**Status:** Definitive — substitui qualquer versao anterior
**Revisao motivada por:** Rejeicao do design v1 pelo cliente ("ridiculo, nada a ver com a base triade, legibilidade zero")

---

## 0. Principios Inegociaveis

Antes de qualquer decisao visual, estes principios devem ser respeitados sem excecao:

1. **Legibilidade acima de tudo** — Texto escuro sobre fundo claro. Sempre. Sem excecao.
2. **Terroso primeiro, sazonal segundo** — A Base Triade e terra, madeira, natureza. NAO e cosmico, NAO e violeta.
3. **A Mandala e a navegacao** — NAO e decoracao. E o hub funcional da home.
4. **O Triskle gira em todas as paginas** — Marca d'agua subliminar, quase imperceptivel, 137 segundos por rotacao.
5. **Nada inventado** — Toda cor, fonte e componente vem do PRD secao 7 e dos tokens DORA confirmados.

---

## 1. Hierarquia de Cores

### 1.1 Distribuicao Visual (Regra 70/25/5)

| Camada | Uso | Participacao |
|--------|-----|-------------|
| **Base Triade (neutros terrosos)** | Fundos, textos, bordas, estrutura | **70%** |
| **Sazonais (via data-season)** | Acentos sazonais, icones, badges, cards de eventos | **25%** |
| **Violeta (#932E88)** | APENAS links hover, badges premium (Guardiao), CTA secundario rarissimo | **5% maximo** |

### 1.2 Tokens Base Triade (Neutros)

```
--base-dark:     #2d1810    Texto principal, headings, footer background
--base-golden:   #d4a574    Bordas decorativas, divisores, hover states
--base-sienna:   #8B4513    Subtitulos, H2, icones, watermark
--bg-color:      #fef9f0    Fundo principal de TODAS as paginas (creme/marfim)
--bg-card:       #FFFFFF    Fundo de cards e superficies elevadas
--text-muted:    #6b5744    Texto secundario, captions, timestamps
--border-light:  #e8ddd0    Bordas sutis em cards e inputs
```

### 1.3 Tokens Sazonais (via atributo data-season)

Cada estacao ativa uma paleta via CSS custom properties no elemento `<html data-season="primavera">`.

**Primavera — Madeira / Figado**
```
--season-primary:    #90EE90    Verde-menta
--season-secondary:  #98D8C8    Jade
--season-accent:     #F7FFE0    Verde-palido (fundo sutil)
--season-icon:       Folha brotando / broto
```

**Verao — Fogo / Coracao**
```
--season-primary:    #FFD700    Dourado
--season-secondary:  #FFA500    Laranja-sol
--season-accent:     #FFFACD    Limao-palido (fundo sutil)
--season-icon:       Sol / chama
```

**Outono — Metal / Pulmao**
```
--season-primary:    #D2691E    Terracota
--season-secondary:  #CD853F    Peru/siena-claro
--season-accent:     #F5DEB3    Trigo (fundo sutil)
--season-icon:       Folha caindo / vento
```

**Inverno — Agua / Rim**
```
--season-primary:    #4682B4    Azul-aco
--season-secondary:  #5F9EA0    Cadet-blue
--season-accent:     #E0F6FF    Azul-gelo (fundo sutil)
--season-icon:       Gota / flocon
```

### 1.4 Contraste e Legibilidade

| Combinacao | Ratio WCAG | Nivel |
|------------|-----------|-------|
| #2d1810 sobre #fef9f0 | 13.2:1 | AAA |
| #8B4513 sobre #fef9f0 | 6.1:1 | AA |
| #6b5744 sobre #fef9f0 | 5.3:1 | AA |
| #2d1810 sobre #FFFFFF | 15.4:1 | AAA |
| #FFFFFF sobre #2d1810 | 15.4:1 | AAA (footer) |

**Regra absoluta:** Todo texto deve ter ratio minimo 4.5:1 (AA). Headings (>=18px bold) devem ter minimo 3:1. Cores sazonais NUNCA sao usadas como fundo de texto — sao usadas em bordas, icones, badges e acentos decorativos.

---

## 2. Home Page — Mandala das 4 Estacoes

### 2.1 Estrutura Geral

A home page e composta por secoes verticais, mobile-first, com scroll natural. A mandala e o hero, nao um elemento perdido no meio.

### 2.2 Hero Section — Mandala Central

**Fundo:** `#fef9f0` (creme) — limpo, sem gradientes, sem texturas
**Altura:** 100vh no desktop, auto no mobile (min-height: 80vh)

**Layout:**

```
+--------------------------------------------------+
|  [Logo Base Triade - pequena, topo esquerdo]      |
|  [Nav: Estacoes | Eventos | Comunidade | Entrar]  |
|                                                    |
|         "Ciclo das Estacoes"                       |
|    Playfair Display, 48px, #2d1810                 |
|    "O programa de autocuidado ciclico              |
|     da Base Triade"                                |
|    Inter, 18px, #6b5744                            |
|                                                    |
|            +------------------+                    |
|           /    PRIMAVERA       \                   |
|          /   Madeira/Figado     \                  |
|    +----+   Equinocio Set       +----+             |
|    |INVERNO        +         VERAO   |             |
|    |Agua/Rim   [TRISKLE]  Fogo/Cor   |             |
|    +----+   centro da      +----+    |             |
|          \   mandala      /                        |
|           \   OUTONO     /                         |
|            \ Metal/Pulm /                          |
|             +----------+                           |
|                                                    |
|    "Proximo evento: Ciclo Outono — Mar 2026"       |
|    [CTA: Quero Participar] fundo #D2691E,          |
|     texto branco, border-radius 8px                |
+--------------------------------------------------+
```

### 2.3 Mandala — Detalhamento

A mandala e um **circulo dividido em 4 quadrantes**, cada um representando uma estacao. E NAVEGACAO FUNCIONAL — clicar em um quadrante leva a pagina daquela estacao.

**Dimensoes:** 400px diametro no desktop, 280px no mobile
**Posicao:** Centralizada horizontalmente, abaixo do titulo

**Cada quadrante contem:**
- Nome da estacao (Playfair Display, 16px, #2d1810)
- Elemento MTC + Orgao (Inter, 12px, #6b5744)
- Icone do elemento (SVG, cor sazonal correspondente, 24px)
- Data do proximo evento (Inter, 11px, #6b5744)
- Fundo: cor `--season-accent` da estacao respectiva (ex: #F7FFE0 para Primavera)

**Centro da mandala:**
- Triskle Base Triade (SVG)
- Cores: #8B4513 (tracos) com #d4a574 (preenchimento sutil)
- Diametro: 80px no desktop, 56px no mobile
- Rotacao CSS: `animation: spin 137s linear infinite`
- Sem hover effect — e o ancoramento visual

**Interacao:**
- Hover no quadrante: borda interna de 2px na cor `--season-primary`, scale(1.02), transition 0.3s ease
- Estacao ativa (atual): borda de 3px na cor `--season-primary`, sombra sutil `0 0 12px {--season-primary}40`
- Click: navega para `/estacoes/{slug}`
- Tab navigation: cada quadrante e focavel com `tabindex`, outline visivel

**Separacao entre quadrantes:**
- Linhas de 1px na cor #d4a574 (dourado-terra), formando uma cruz no circulo
- As linhas nao sao retas geometricas perfeitas — tem leve curvatura organica (SVG path com bezier sutil), sugerindo forma natural

**Angulo aureo:**
- O angulo de 137.5 graus e usado como rotacao inicial da mandala inteira, de modo que a posicao de repouso nao seja alinhada com 0/90/180/270 graus. Isso cria uma sensacao organica, nao mecanica.

### 2.4 Secoes Abaixo da Mandala

**Ordem vertical:**

1. **Proposta de Valor** — 3 colunas (mobile: empilhadas)
   - "Autocuidado Ciclico" + icone sazonal
   - "Comunidade de Terapeutas" + icone pessoas
   - "Reconexao com a Natureza" + icone folha
   - Fundo: #fef9f0, texto: #2d1810, icones: cor sazonal ativa

2. **Proximos Eventos** — Cards horizontais com scroll (mobile: carrossel)
   - Ver componente EventCard (secao 3.2)
   - Maximo 4 cards visiveis

3. **Depoimentos** — Carrossel simples
   - Aspas decorativas em #d4a574
   - Texto do depoimento em Inter, 16px, italic, #2d1810
   - Nome + foto circular com borda #d4a574
   - Fundo: #FFFFFF com borda 1px #e8ddd0
   - Transicao: fade 0.5s

4. **Lead Capture** — Formulario de interesse
   - Titulo: "Receba o Chamado das Estacoes" (Playfair Display, 28px, #2d1810)
   - Campos: Nome, Email, Estacao de interesse (multi-select com chips sazonais)
   - Botao: "Quero Saber Mais" — fundo `--season-primary`, texto escuro ou branco conforme contraste
   - Fundo da secao: `--season-accent` da estacao ativa (sutil, quase imperceptivel)

5. **Footer** — Ver secao 3.6

---

## 3. Componentes

### 3.1 SeasonalButton

Botao que adapta sua cor a estacao ativa.

```
Fundo:       var(--season-primary)
Texto:       #FFFFFF ou #2d1810 (calculado por contraste — branco para cores escuras como Outono/Inverno, escuro para claras como Primavera/Verao)
Borda:       none
Radius:      8px
Padding:     12px 24px
Fonte:       Inter, 16px, font-weight 600
Hover:       brightness(0.9), transition 0.2s ease
Active:      brightness(0.85), transform scale(0.98)
Focus:       outline 2px solid #2d1810, offset 2px
Disabled:    opacity 0.5, cursor not-allowed
```

**Variante CTA principal:** Mesmo estilo, mas tamanho maior (padding 16px 32px, font 18px)
**Variante outline:** Fundo transparente, borda 2px `--season-primary`, texto `--season-primary`

### 3.2 EventCard

Card de evento com identidade sazonal.

```
Fundo:          #FFFFFF
Borda:          1px solid var(--base-golden) (#d4a574)
Radius:         12px
Sombra:         0 2px 8px rgba(45,24,16,0.08)
Padding:        0 (imagem full-width no topo)
Largura:        320px (desktop), 280px (mobile)

Imagem topo:    aspect-ratio 16/9, object-fit cover, radius 12px 12px 0 0
Badge estacao:  Posicao absolute, topo-direito da imagem
                Fundo: var(--season-primary), texto #FFFFFF ou #2d1810
                Radius 6px, padding 4px 12px, Inter 12px bold

Conteudo:       padding 16px
Titulo:         Playfair Display, 20px, #2d1810
Subtitulo:      Inter, 14px, #6b5744 (ex: "Madeira / Figado")
Data:           Inter, 14px, #8B4513, bold
Preco:          Inter, 18px, #2d1810, bold ("a partir de R$ 287")
Divisor:        1px solid #e8ddd0

CTA:            SeasonalButton (variante outline), full-width no bottom do card

Hover:          sombra 0 4px 16px rgba(45,24,16,0.12), translateY(-2px), transition 0.3s
```

### 3.3 SacredDivider

Separador decorativo entre secoes.

```
Tipo:       Gradiente horizontal
Cores:      transparente → #d4a574 → #8B4513 → #d4a574 → transparente
Altura:     1px (com 3px de "glow" sutil usando box-shadow)
Largura:    80% do container, centralizado
Margem:     48px vertical

Variante com Triskle: O mesmo gradiente, mas com um mini-Triskle SVG (20px)
centralizado sobre a linha, fundo #fef9f0 (para "cortar" a linha)
```

**IMPORTANTE:** O divisor e DOURADO (tons de #d4a574 e #8B4513). NUNCA violeta.

### 3.4 BaseTriadeWatermark

Marca d'agua do Triskle Base Triade em TODAS as paginas.

```
Elemento:       SVG do Triskle Base Triade
Cores SVG:      Tracos #8B4513, preenchimento sutil #d4a574
Posicao:        position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%)
Z-index:        0 (atras de todo conteudo)
Pointer-events: none
Opacidade:      0.03 a 0.05 (3-5% — subliminar, quase imperceptivel)
Tamanho:        50vmin (escala proporcional ao viewport menor)
Rotacao:        animation: triskle-spin 137s linear infinite
Mix-blend:      multiply (para integrar suavemente com o fundo creme)

@keyframes triskle-spin {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to   { transform: translate(-50%, -50%) rotate(360deg); }
}

@media print { .watermark { display: none; } }
```

**Energia do 137:**
- 137 segundos = 1 rotacao completa
- Ritmo tao lento que o consciente NAO percebe o movimento
- O subconsciente registra a presenca — efeito subliminar intencional

### 3.5 FacilitatorAvatar

Componente para exibir foto de facilitador.

```
Container:      circular (border-radius: 50%)
Tamanho:        80px (padrao), 120px (destaque), 48px (inline)
Borda:          3px solid var(--base-golden) (#d4a574)
Sombra:         0 2px 8px rgba(45,24,16,0.1)
Imagem:         object-fit: cover
Fallback:       Iniciais do nome em Playfair Display, fundo var(--season-accent), texto #2d1810

Badge (destaque):   Estrela dourada 16px, posicao bottom-right, fundo #fef9f0
Badge (especialidade): Icone da especialidade, posicao bottom-right
```

### 3.6 Footer

Presente em TODAS as paginas.

```
Fundo:          #2d1810
Texto:          #fef9f0 (creme — alto contraste sobre escuro)
Padding:        48px 24px

Layout 3 colunas (desktop):
  Esquerda:     Logo Base Triade (versao clara) + assinatura
  Centro:       Links rapidos (Estacoes, Eventos, Contato)
  Direita:      Redes sociais (Instagram, YouTube)

Assinatura OBRIGATORIA:
  "iAi . ECOssistema Base Triade(TM)"
  Inter, 14px, #d4a574
  Separador: interponto (.)
  TM em superscript

Divisor interno: 1px solid rgba(212,165,116,0.3) (#d4a574 com 30% opacidade)

Links:          #d4a574, hover: #fef9f0, transition 0.2s
```

### 3.7 NavigationHeader

Cabecalho de navegacao para todas as paginas.

```
Fundo:          #fef9f0 (mesmo do body — integrado, nao destacado)
Borda inferior: 1px solid #e8ddd0
Posicao:        sticky top, z-index 50
Altura:         64px
Padding:        0 24px

Logo:           Base Triade (versao escura), 40px altura, lado esquerdo
Links:          Inter, 15px, #2d1810, hover #8B4513
Link ativo:     Underline 2px var(--season-primary), font-weight 600
CTA (Inscrever):  SeasonalButton variante pequena (padding 8px 16px)

Mobile (< 768px):
  Hamburger:    3 linhas #2d1810
  Menu aberto:  Overlay fundo #fef9f0, links empilhados, 100vh
```

---

## 4. Tipografia

### 4.1 Escala Tipografica

| Nivel | Fonte | Tamanho | Peso | Cor | Line-height | Uso |
|-------|-------|---------|------|-----|-------------|-----|
| H1 | Playfair Display | 48px / 36px mobile | 700 | #2d1810 | 1.2 | Titulo principal da pagina |
| H2 | Playfair Display | 32px / 28px mobile | 700 | #8B4513 | 1.3 | Titulo de secao |
| H3 | Playfair Display | 24px / 20px mobile | 600 | #2d1810 | 1.3 | Subtitulo de secao |
| H4 | Inter | 18px / 16px mobile | 600 | #2d1810 | 1.4 | Titulo de card/componente |
| Body | Inter | 16px | 400 | #2d1810 | 1.6 | Texto corrido |
| Body small | Inter | 14px | 400 | #6b5744 | 1.5 | Texto secundario, captions |
| Label | Inter | 12px | 600 | #8B4513 | 1.4 | Labels de formulario, badges |
| Caption | Inter | 11px | 400 | #6b5744 | 1.4 | Timestamps, metadata |

### 4.2 Regras Tipograficas

- **Text-align:** Justify para blocos longos de texto (body). Left para headings, labels, listas.
- **Letter-spacing:** 0 para body, -0.02em para H1 (levemente condensado para elegancia).
- **H2 decorado:** `border-bottom: 1px solid var(--base-golden); padding-bottom: 8px` — conforme tokens DORA.
- **Blockquote:** `border-left: 4px solid var(--base-golden); padding-left: 16px; font-style: italic; color: #6b5744`
- **Tabelas:** `border: 1px solid var(--base-golden); th { background: #2d1810; color: #FFFFFF }`
- **Maxima largura de texto:** 720px (conteudo de leitura). Impede linhas muito longas.

### 4.3 Carregamento de Fontes

```
Playfair Display: Google Fonts, weights 600 e 700, display: swap
Inter: Google Fonts, weights 400 e 600, display: swap
Fallbacks: Georgia (serif) para Playfair, system-ui (sans) para Inter
```

---

## 5. Anti-Padroes BANIDOS

Os seguintes elementos estao PROIBIDOS no design do Ciclo das Estacoes. Qualquer PR que os contenha deve ser rejeitado:

### 5.1 Cores

- PROIBIDO: Violeta (#932E88) como cor dominante ou de fundo. Maximo 5% da interface.
- PROIBIDO: Gradientes cosmicos, neon, escuros, "galacticos".
- PROIBIDO: Fundo escuro em paginas de conteudo (dark mode NAO e prioridade MVP).
- PROIBIDO: Texto claro (#fef9f0) sobre fundo colorido sazonal (ex: branco sobre verde-menta).
- PROIBIDO: Cores sazonais como fundo de areas grandes — sao para acentos, bordas, icones.

### 5.2 Tipografia

- PROIBIDO: Fontes decorativas, cursivas ou script para corpo de texto.
- PROIBIDO: Texto centralizado em blocos longos (paragrafos).
- PROIBIDO: Tamanho de fonte abaixo de 11px em qualquer contexto.
- PROIBIDO: Playfair Display para texto corrido — apenas headings.

### 5.3 Layout

- PROIBIDO: Sacred geometry literal como fundo de pagina (mandalas decorativas, Flor da Vida como background).
- PROIBIDO: Forcar navegacao circular em paginas internas — a mandala e APENAS para a home.
- PROIBIDO: Animacoes chamativas (duracao > 0.5s para transicoes, > 1s para entradas).
- PROIBIDO: Parallax excessivo — maximo 1 camada de parallax sutil.
- PROIBIDO: Sobrecarregar simbolismo — sem multiplos simbolos competindo na mesma tela.
- PROIBIDO: Modais/overlays que bloqueiam mais de 60% da tela no mobile.

### 5.4 Marca

- PROIBIDO: Omitir o footer institucional "iAi . ECOssistema Base Triade(TM)".
- PROIBIDO: Omitir o watermark Triskle em qualquer pagina.
- PROIBIDO: Alterar as cores do Triskle (sempre #8B4513 e #d4a574).
- PROIBIDO: Rotacao do watermark diferente de 137 segundos.

### 5.5 UX

- PROIBIDO: Formularios com mais de 5 campos visiveis simultaneamente (use steps).
- PROIBIDO: CTAs sem contraste suficiente (minimo 4.5:1).
- PROIBIDO: Imagens sem alt text.
- PROIBIDO: Carroseis com auto-play sem controle de pausa.

---

## 6. O Numero 137 — Numerologia Sagrada no Design

O numero 137 e significativo na Base Triade: sao 137 dias entre as estacoes, e a Constante de Estrutura Fina (alfa = ~1/137) da fisica quantica. O design incorpora esse numero de forma subliminar e intencional:

### 6.1 Rotacao do Watermark

- **137 segundos** por rotacao completa do Triskle
- Ritmo imperceptivel ao consciente (2.28 minutos por volta)
- O visitante nunca "ve" girando, mas o subconsciente registra a presenca viva

### 6.2 Angulo Aureo (137.5 graus)

- A mandala das 4 estacoes na home tem uma **rotacao inicial de 137.5 graus**
- Isso significa que os quadrantes NAO estao alinhados com Norte/Sul/Leste/Oeste
- Cria uma disposicao organica, como petalas de girassol (filotaxia)
- O efeito e sutil: o usuario sente que a composicao e "natural" sem saber por que

### 6.3 Jornada GET137

- A jornada de transformacao entre estacoes dura **137 dias** (7 fases de ~20 dias)
- Na interface, o progresso da jornada e visualizado em um arco de **137.5 graus** do circulo
- Os marcos da jornada sao posicionados seguindo a espiral aurea

### 6.4 Micro-interacoes 137

- Delay de entrada de elementos na mandala: **137ms** (imperceptivel, mas harmonico)
- Duration de fade-in do watermark no carregamento: **1.37s**
- Pulse sutil da estacao ativa no badge: a cada **13.7 segundos**

---

## 7. Paginas Internas

### 7.1 Pagina de Estacao (/estacoes/{slug})

```
Header:         NavigationHeader
Hero:           Imagem full-width da estacao (aspect 21/9), overlay gradient bottom (transparente → #fef9f0)
                Titulo da estacao: H1, Playfair, #2d1810 sobre fundo claro

Conteudo:
  - Descricao da estacao (body text, max-width 720px, centralizado)
  - Elemento MTC + Orgao (badge com icone sazonal)
  - Proximos eventos desta estacao (EventCards)
  - Facilitadores desta estacao (FacilitatorAvatars em grid)
  - Praticas incluidas (lista com icones)
  - Depoimentos filtrados por estacao

Watermark:      BaseTriadeWatermark (presente, como em todas as paginas)
Footer:         Footer padrao
```

### 7.2 Pagina de Evento (/eventos/{slug})

```
Header:         NavigationHeader
Hero:           Galeria de imagens (carrossel), badge estacao no canto
Titulo:         H1, Playfair, #2d1810
Subtitulo:      "Elemento {MTC} . Orgao {MTC}" — Inter, #6b5744

Secoes:
  1. Resumo (data, local, capacidade, preco a partir de)
  2. Cronograma de Atividades (timeline vertical, divisores #d4a574)
  3. Facilitadores (grid de FacilitatorAvatars com nome e especialidade)
  4. Tipos de Ingresso (cards comparativos com preco destacado)
  5. FAQs (accordion, bordas #e8ddd0)
  6. CTA fixo no mobile (bottom bar com preco + botao "Inscrever-se")

Cards de ingresso:
  - Fundo #FFFFFF, borda 1px #d4a574
  - Nome do ingresso: H4
  - Preco: 24px bold #2d1810
  - Lista "inclui": checkmarks em var(--season-primary)
  - Botao: SeasonalButton
  - Destaque (recomendado): borda 2px var(--season-primary), sombra sazonal
```

### 7.3 Pagina de Checkout

```
Layout:         2 colunas no desktop (formulario + resumo), 1 coluna mobile
Fundo:          #fef9f0

Formulario:
  - Steps numerados (1. Dados  2. Pagamento  3. Confirmacao)
  - Progress bar: fundo #e8ddd0, preenchimento var(--season-primary)
  - Inputs: borda 1px #e8ddd0, focus borda #d4a574, radius 8px
  - Labels: Inter 12px bold #8B4513

Resumo lateral:
  - Card fixo (sticky), fundo #FFFFFF, borda #d4a574
  - Nome do evento, data, tipo de ingresso
  - Subtotal, taxas, total em destaque (20px bold #2d1810)

Botoes de pagamento:
  - PIX: fundo #00BFA5 (cor oficial PIX), texto branco
  - Cartao: fundo #2d1810, texto #fef9f0
  - Boleto: fundo transparente, borda #2d1810
```

---

## 8. Espacamento e Grid

### 8.1 Sistema de Espacamento

Base: 4px. Todos os espacamentos sao multiplos de 4.

```
--space-xs:   4px
--space-sm:   8px
--space-md:   16px
--space-lg:   24px
--space-xl:   32px
--space-2xl:  48px
--space-3xl:  64px
--space-4xl:  96px
```

### 8.2 Grid

- Container max-width: 1200px, padding horizontal 24px
- Grid: CSS Grid 12 colunas, gap 24px
- Breakpoints: mobile (<768px), tablet (768-1024px), desktop (>1024px)
- Cards: min 280px, max 400px, auto-fit

### 8.3 Radius

```
--radius-sm:   4px    Badges, tags
--radius-md:   8px    Botoes, inputs
--radius-lg:   12px   Cards
--radius-xl:   16px   Modais
--radius-full: 9999px Avatares, pills
```

---

## 9. Animacoes e Transicoes

### 9.1 Principios

- **Sutileza** — Animacoes devem ser sentidas, nao vistas
- **Performance** — Apenas transform e opacity (GPU-accelerated)
- **Respeito** — `prefers-reduced-motion: reduce` desabilita TODAS as animacoes exceto watermark (que fica estatico)

### 9.2 Duracoes

```
--duration-fast:    150ms    Hover, focus, toggle
--duration-normal:  300ms    Transicoes de pagina, fade in
--duration-slow:    500ms    Entrada de secoes (scroll-triggered)
--duration-ritual:  1370ms   Fade-in do watermark
```

### 9.3 Easings

```
--ease-default:  cubic-bezier(0.4, 0, 0.2, 1)    Uso geral
--ease-enter:    cubic-bezier(0, 0, 0.2, 1)       Elementos entrando
--ease-exit:     cubic-bezier(0.4, 0, 1, 1)       Elementos saindo
```

### 9.4 Animacoes Especificas

| Elemento | Animacao | Duracao | Trigger |
|----------|----------|---------|---------|
| Watermark Triskle | rotate 360deg | 137s | Constante (infinite) |
| Quadrante mandala hover | scale(1.02) + borda | 300ms | Hover |
| Cards entrada | translateY(20px) + opacity 0→1 | 500ms | Scroll into view |
| Secoes da home | translateY(30px) + opacity 0→1 | 500ms | Scroll into view, stagger 100ms |
| Badge estacao | pulse opacity 0.8→1 | 300ms | A cada 13.7s |
| Transicao de pagina | fade (opacity 0→1) | 300ms | Route change |
| Depoimento carrossel | fade crossfade | 500ms | Auto (8s) ou click |

---

## 10. Acessibilidade

### 10.1 Requisitos Minimos

- **WCAG 2.1 AA** em toda a interface
- Contraste de texto: minimo 4.5:1 (normal), 3:1 (large text)
- Todos os elementos interativos com focus visible (outline 2px solid #2d1810, offset 2px)
- Skip to content link no topo de cada pagina
- Landmarks semanticos: header, nav, main, footer, section, article
- Alt text em TODAS as imagens
- Labels em TODOS os inputs de formulario
- Aria-labels em icones interativos sem texto visivel

### 10.2 Mandala Acessivel

- Cada quadrante e um `<a>` com `aria-label` descritivo (ex: "Estacao Primavera — Elemento Madeira, Orgao Figado, proximo evento em Setembro")
- Ordem de tab: Primavera → Verao → Outono → Inverno (sentido horario)
- Para screen readers: "Mandala de navegacao das 4 Estacoes" como heading antes da mandala
- Versao simplificada para `prefers-reduced-motion`: sem rotacao do Triskle central, quadrantes como lista vertical

### 10.3 Cores e Daltonismo

- Nunca usar COR como unica forma de transmitir informacao (sempre acompanhar com texto ou icone)
- Badges de estacao sempre tem TEXTO alem da cor
- Status de pagamento usa texto + icone (nao apenas vermelho/verde)

---

## 11. Referencia Rapida — Decisoes de Design

| Decisao | Valor | Fonte |
|---------|-------|-------|
| Fundo principal | #fef9f0 (creme) | PRD 7.1, DORA tokens |
| Texto principal | #2d1810 (marrom-escuro) | PRD 7.1, DORA tokens |
| Fonte headings | Playfair Display | PRD 7.3 |
| Fonte body | Inter | PRD 7.3 |
| Watermark | Triskle SVG, 3-5% opacity | Cliente + PRD 7.2 |
| Rotacao watermark | 137 segundos | Cliente (energia 137) |
| Footer obrigatorio | "iAi . ECOssistema Base Triade(TM)" | PRD 7.2 |
| Cor violeta | 5% maximo | Correcao v2 (rejeicao v1) |
| Navegacao mandala | Home only | Pesquisa @analyst |
| Paginas internas | Nav convencional | Pesquisa @analyst |
| Animacoes | 0.3-0.5s max | Pesquisa @analyst |
| Fundo neutro quente | Marfim/areia (#fef9f0) | Pesquisa @analyst (Chopra, Headspace) |

---

*Especificacao criada por Uma (@ux-design-expert) para o projeto Ciclo das Estacoes*
*Base Triade | iAi ECOssistema Base Triade*
*Versao 2.0 — Definitiva*
