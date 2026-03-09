---
type: task
elicit: false
agent: luiz-fosc
squad: luiz-fosc
description: "Pesquisar concorrentes, analisar posicionamento de mercado e gerar relatório com gaps e oportunidades"
---

# benchmark-positioning

Pesquisar concorrentes, analisar posicionamento de mercado do luizfosc.com.br e gerar relatório com gaps e oportunidades.

## Instructions

Esta task executa automaticamente 4 fases de pesquisa e análise. O relatório final é salvo em `squads/luiz-fosc/docs/benchmark-positioning.md`.

### Fase 1 — Pesquisa de concorrentes (WebSearch)

Pesquise e mapeie os principais concorrentes usando estas queries:

1. **Palestrantes de storytelling no Brasil** — "palestrante storytelling Brasil", "palestrante ilusionismo corporativo Brasil"
2. **Mentores de palestra** — "Mentoria Palestra de Elite", "mentoria de palestra Brasil", "coach de oratória Brasil", "curso de oratória para executivos"
3. **Speakers entretenimento + negócios** — "palestrante mágica corporativa", "palestrante show business Brasil", "palestra-show Brasil"
4. **Palestrantes premium Brasil** — "palestrante mais caro do Brasil", "palestrante corporativo premium", "palestrante TEDx storytelling Brasil"

Para cada concorrente encontrado, registre:
- Nome e site
- Oferta principal (palestra, workshop, mentoria, curso)
- Diferencial declarado
- Presença digital visível
- Pricing (se disponível publicamente)
- Público-alvo

Mapeie no mínimo **8 concorrentes diretos e indiretos**.

### Fase 2 — Análise do luizfosc.com.br (WebFetch)

Analise a presença digital atual do Fosc:

1. **Site principal** — luizfosc.com.br: conteúdo, oferta visível, posicionamento, CTA, copy
2. **LinkedIn** — Busque "Luiz Fosc" no LinkedIn: perfil, publicações, seguidores
3. **Instagram** — Busque @luizfosc: bio, frequência de posts, engajamento
4. **YouTube** — Busque "Luiz Fosc" no YouTube: canal, vídeos, views

Registre para cada canal:
- Status (ativo/inativo)
- Frequência de publicação
- Tom/posicionamento
- Pontos fortes e fracos

### Fase 3 — Feature Matrix

Monte a tabela comparativa com estas dimensões para todos os players mapeados (incluindo Fosc):

| Player | Oferta | Pricing | Diferencial | Presença Digital | Autoridade | Nicho |
|--------|--------|---------|-------------|------------------|-----------|-------|
| Luiz Fosc | ... | ... | ... | ... | ... | ... |
| Concorrente 1 | ... | ... | ... | ... | ... | ... |
| ... | ... | ... | ... | ... | ... | ... |

**Legenda das dimensões:**
- **Oferta**: Palestra, workshop, mentoria 1:1, curso online, livro, programa
- **Pricing**: Faixa de preço visível publicamente (se não disponível, marcar "N/D")
- **Diferencial**: O que torna único — USP declarado
- **Presença Digital**: Site + redes ativas + frequência de conteúdo (1-5 estrelas)
- **Autoridade**: Livros publicados, prêmios, recordes, aparições em mídia, TEDx
- **Nicho**: Público-alvo principal (corporativo, empreendedores, speakers, etc.)

### Fase 4 — Análise de posicionamento

Com base nos dados coletados, analise:

#### 4.1 — Onde o Fosc é imbatível (USP real)
Identifique os diferenciais ÚNICOS baseados no DNA:
- Guinness World Records
- 500+ palestras
- Ilusionismo profissional + storytelling cinematográfico
- Co-founder de startup de tecnologia (Ensinio)
- Método da Método FOSC
- TDAH como superpoder narrativo

#### 4.2 — Onde concorrentes são mais fortes
Liste áreas onde concorrentes superam o Fosc:
- Presença digital? Conteúdo? Livros? Cursos online? Comunidade?

#### 4.3 — Gaps de oferta
O que outros oferecem que o Fosc NÃO oferece (mas poderia):
- Curso online escalável?
- Comunidade/membership?
- Livro publicado?
- Podcast próprio?
- Programa de certificação?

#### 4.4 — Oportunidades inexploradas
Combine gaps + USP para identificar oportunidades únicas que só o Fosc pode explorar.

### Entregáveis

Salve o relatório completo em `squads/luiz-fosc/docs/benchmark-positioning.md` com:

1. **Executive Summary** — 3-5 bullets com os principais insights
2. **Mapa de Concorrentes** — Lista detalhada dos 8+ players
3. **Feature Matrix** — Tabela comparativa completa
4. **Análise de Posicionamento** — Seções 4.1 a 4.4
5. **Top 3 Ações Recomendadas** — Ações concretas priorizadas por impacto

Formato do relatório:
```markdown
# Benchmark de Posicionamento — Luiz Fosc
> Gerado em: {data}

## Executive Summary
...

## Mapa de Concorrentes
...

## Feature Matrix
...

## Análise de Posicionamento
### Onde o Fosc é imbatível
### Onde concorrentes são mais fortes
### Gaps de oferta
### Oportunidades inexploradas

## Top 3 Ações Recomendadas
1. ...
2. ...
3. ...
```

## Veto Conditions

```yaml
veto_conditions:
  - trigger: "Menos de 8 concorrentes mapeados"
    severity: HIGH
    action: "Continuar pesquisa até atingir mínimo de 8"
  - trigger: "Feature matrix sem dados reais (tudo 'N/D')"
    severity: HIGH
    action: "Usar WebSearch para preencher lacunas antes de entregar"
  - trigger: "Recomendações genéricas ('melhore sua presença digital')"
    severity: HIGH
    action: "Ser específico — qual canal, qual ação, qual métrica"
  - trigger: "Não consultou data/facts-reference.md para dados do Fosc"
    severity: BLOCKING
    action: "Carregar facts-reference.md antes de analisar posicionamento"
```

## Completion Criteria

1. ✅ Executive Summary com 3-5 insights acionáveis
2. ✅ Mínimo 8 concorrentes mapeados com dados reais
3. ✅ Feature Matrix completa (7 dimensões)
4. ✅ Seções 4.1 a 4.4 preenchidas com análise fundamentada
5. ✅ Top 3 ações priorizadas por impacto
6. ✅ Relatório salvo em `squads/luiz-fosc/docs/benchmark-positioning.md`
