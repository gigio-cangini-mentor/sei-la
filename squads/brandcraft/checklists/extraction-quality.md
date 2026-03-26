# Extraction Quality Checklist

Checklist de qualidade para extração de design tokens do BrandCraft.
Usado pelo agente **Gauge** após o **Prober** (token-extractor) processar uma URL.

**Objetivo:** garantir que o template YAML extraído é completo, preciso e rastreável.

---

## 1. Completude de Tokens

### Colors (7 tokens obrigatórios)
- [ ] `primary` — cor principal da marca
- [ ] `secondary` — cor de suporte
- [ ] `accent` — cor de destaque/CTA
- [ ] `background` — cor de fundo principal
- [ ] `surface` — cor de superfície (cards, modais)
- [ ] `text_primary` — cor do texto principal
- [ ] `text_secondary` — cor do texto secundário

### Typography (8 tokens obrigatórios)
- [ ] `font_heading` — família tipográfica de títulos
- [ ] `font_body` — família tipográfica de corpo
- [ ] `size_h1` — tamanho do H1
- [ ] `size_h2` — tamanho do H2
- [ ] `size_h3` — tamanho do H3
- [ ] `size_body` — tamanho do body text
- [ ] `weight_heading` — peso dos títulos
- [ ] `weight_body` — peso do body text

### Spacing (6 tokens obrigatórios)
- [ ] `xs` — 4px
- [ ] `sm` — 8px
- [ ] `md` — 16px
- [ ] `lg` — 24px
- [ ] `xl` — 32px
- [ ] `xxl` — 48px

### Logos (2 variantes)
- [ ] `logo_primary` — SVG ou PNG em alta resolução
- [ ] `logo_icon` — variante compacta (ícone/favicon)

### Metadata
- [ ] `source_url` — URL de origem da extração
- [ ] `extracted_at` — timestamp ISO 8601
- [ ] `version` — versão do template (semver)
- [ ] `status` — draft | validated | active

---

## 2. Deduplicação

- [ ] Nenhum par de cores com deltaE < 5 (cores muito próximas = provável duplicata)
- [ ] Nenhuma font family duplicada entre heading e body (exceto se intencional e documentado)
- [ ] Nenhum token de spacing com valor idêntico a outro (4, 8, 16, 24, 32, 48 — todos distintos)

---

## 3. Rastreabilidade de Origem

- [ ] `source_url` presente e válida (HTTP 200 no momento da extração)
- [ ] Cada color token tem evidência na página de origem (encontrado via computed styles)
- [ ] Cada font token existe na página (carregada via @font-face ou system font)
- [ ] Logos extraídos da página real (não placeholders ou ícones genéricos)

---

## 4. Multi-Page Scan

- [ ] Extração cobriu no mínimo 3 páginas do site (home + 2 internas)
- [ ] Tokens foram confirmados em mais de 1 página (não extraídos de single-page)
- [ ] Variações entre páginas foram reconciliadas (cor mais frequente = token final)
- [ ] Páginas escaneadas listadas no metadata

---

## 5. Tokens MISSING

Tokens não encontrados devem ser flagados explicitamente:

- [ ] Tokens ausentes marcados como `MISSING` no YAML (não omitidos silenciosamente)
- [ ] Cada token MISSING tem fallback sugerido (cor neutra, system font, valor padrão)
- [ ] Total de tokens MISSING < 30% (acima disso = extração falhou, re-executar)
- [ ] Report de MISSING entregue ao Maestro para decisão (aceitar fallback ou pedir input manual)

---

## Thresholds

| Cobertura | Verdict | Ação |
|-----------|---------|------|
| >= 90% tokens extraídos | PASS | Template salvo como `active` |
| 70-89% tokens | PARTIAL | Template salvo como `draft`, notas de MISSING |
| < 70% tokens | FAIL | Re-executar extração com URLs adicionais |

---

*Checklist v1.0 — Gauge (quality-validator) — BrandCraft Squad*
