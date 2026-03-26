# Document Quality Checklist

Checklist de qualidade para outputs de documentos do BrandCraft.
Usado pelo agente **Gauge** (quality-validator) antes de entregar qualquer documento.

**Formatos cobertos:** PDF A4, PDF Slides, Carousel, Social Card, PPTX

---

## 1. Brand Colors (20 pts)

- [ ] Primary color presente em headers, CTAs ou elementos de destaque
- [ ] Secondary color aplicada em elementos de suporte (bordas, ícones, badges)
- [ ] Accent color usada com moderação (máx 2-3 elementos por página/slide)
- [ ] Background colors consistentes com o template (sem branco genérico quando template define cor)
- [ ] Nenhuma cor fora da paleta do brand template (hex match exato, tolerância deltaE < 3)
- [ ] Contraste texto/fundo passa WCAG AA (ratio >= 4.5:1 para body, >= 3:1 para large text)

## 2. Typography (20 pts)

- [ ] Font family heading = token `font_heading` do template
- [ ] Font family body = token `font_body` do template
- [ ] Hierarquia visual clara: H1 > H2 > H3 > body (tamanhos decrescentes)
- [ ] H1 dentro do range definido no template (fallback: 28-36px para A4, 40-56px para slides)
- [ ] Body text legível: mínimo 14px para A4, 18px para slides/carousel
- [ ] Line-height adequado: 1.4-1.6 para body text, 1.1-1.3 para headings
- [ ] Nenhum texto cortado, overflow ou sobreposto a outros elementos
- [ ] Peso (weight) consistente: headings bold/semibold, body regular/medium

## 3. Spacing (15 pts)

- [ ] Tokens de spacing aplicados (xs/sm/md/lg/xl/xxl conforme template)
- [ ] Padding interno consistente entre seções (mesmo valor em todas as páginas/slides)
- [ ] Margem de segurança respeitada (mínimo 15mm para A4, 40px para slides)
- [ ] Espaçamento entre elementos não varia arbitrariamente (máx 2 valores distintos por contexto)
- [ ] Sem elementos colados nas bordas do documento

## 4. Layout (30 pts)

### Dimensões por formato
| Formato | Dimensão | Tolerância |
|---------|----------|------------|
| PDF A4 | 210 x 297 mm | Exato |
| PDF Slides | 254 x 143 mm (16:9) | Exato |
| Carousel | 1080 x 1080 ou 1080 x 1350 px | Exato |
| Social Card | 1200 x 630 px | Exato |
| PPTX | 10 x 5.625 in (16:9) | Exato |

- [ ] Dimensões do output correspondem ao formato solicitado (ver tabela)
- [ ] Alinhamento horizontal consistente (elementos na mesma grid/coluna)
- [ ] Alinhamento vertical consistente (baseline alignment em textos adjacentes)
- [ ] Sem overflow: nenhum elemento ultrapassa os limites do documento
- [ ] Sem sobreposição não intencional entre elementos
- [ ] Imagens com aspect ratio preservado (sem distorção)
- [ ] Grid/layout simétrico quando aplicável (margens esquerda = direita)

## 5. Overall Consistency (15 pts)

- [ ] Logo presente (ao menos 1 variante: primary SVG ou icon PNG)
- [ ] Logo com proporções corretas (sem stretch/squish, mínimo 24px de altura)
- [ ] Estilo visual coerente em todas as páginas/slides (sem mudança abrupta de paleta)
- [ ] Elementos decorativos seguem a identidade (sem clip-art genérico)
- [ ] Metadata do arquivo presente (título, autor se aplicável)

---

## Thresholds & Ações

| Score | Verdict | Ação |
|-------|---------|------|
| >= 90 | PASS (Excellent) | Entrega imediata |
| 70-89 | PASS (Acceptable) | Entrega com notas de melhoria |
| 50-69 | FAIL (Partial) | Auto-correção + re-validação (máx 2x) |
| < 50 | FAIL (Critical) | Re-execução completa do workflow |

### Triggers de auto-correção

- **Cor fora da paleta** -> substituir pela cor mais próxima do template
- **Font errada** -> substituir pela font do template
- **Overflow de texto** -> reduzir font-size em 2px ou truncar com ellipsis
- **Dimensão errada** -> re-renderizar com dimensão correta
- **Logo ausente** -> inserir logo do template na posição padrão (header ou footer)

---

*Checklist v1.0 — Gauge (quality-validator) — BrandCraft Squad*
