# Update Squads — Master Checklist

**Objetivo:** Elevar o ecossistema de 64 squads de média 5.9/10 para 8.0+
**Auditoria base:** `squads/ECOSYSTEM-AUDIT-2026-03-25.md`
**Sub-checklists:** `docs/projects/update-squads/checklists/`

---

## Ação #1 — Arquivar SKELETON
**Impacto:** Baixo | **Esforço:** 5 min

- [ ] Mover `squads/storytelling/` → `squads/_archived/storytelling/`
- [ ] Atualizar ECOSYSTEM-AUDIT (63 squads ativos)

---

## Ação #2 — Merge squad-creator + squad-creator-pro ✅
**Impacto:** Alto | **Esforço:** 1 sessão
**Checklist detalhado:** [merge-squad-creators.md](merge-squad-creators.md)

- [x] squad-creator absorveu assets únicos do -pro (scripts, minds, checklists, templates)
- [x] squad-creator-pro movido para `_archived/`
- [x] Referências corrigidas em 16+ arquivos
- [x] ECOSYSTEM-AUDIT atualizada
- [ ] Smoke test (baixa prioridade)

---

## Ação #3 — DNA enrichment: conteudo (6.8 → 8.0+) ✅
**Impacto:** Alto | **Esforço:** 1 sessão
**Executado em:** 2026-03-26

- [x] Auditar agents atuais — 10 agents, todos genéricos/Torriani, voice_dna presente, thinking_dna ausente
- [x] Corrigir acentuação pt-BR em todos os 10 agents (~850+ correções — violação Artigo VII)
- [x] Adicionar thinking_dna em todos os 10 agents (~30L cada, únicos por papel)
- [x] Adicionar veto_conditions em 6 tasks críticas (create-carousel, create-reels, create-strategy, create-campaign, validate-content, create-bio)
- [x] Workflows já tinham checkpoints + veto_conditions (9/9) — nada a fazer
- [ ] Re-score e atualizar ECOSYSTEM-AUDIT

---

## Ação #4 — DNA enrichment: seo (5.0 → 7.5+) ✅
**Impacto:** Alto | **Esforço:** 1 sessão
**Executado em:** 2026-03-26

- [x] Auditar 8 agents — todos com voice_dna e personas reais, mas rasos (164L média)
- [x] Criar 13 phantom tasks que o workflow referenciava mas não existiam
- [x] Enriquecer 3 agents mais rasos: site-architect (+101L), ai-visibility-optimizer (+42L), content-quality-assessor (+44L)
- [x] Adicionar thinking_dna nos 3 agents enriquecidos
- [x] Criar templates/ (seo-report-template, llms-txt-template)
- [x] Criar data/ (cwv-benchmarks, schema-types-reference)
- [x] Corrigir acentuação pt-BR (3 ocorrências de "Metodo" → "Método")
- [ ] Re-score e atualizar ECOSYSTEM-AUDIT

---

## Ação #5 — DNA enrichment: marketing-board (5.4 → 7.5+) ✅
**Impacto:** Alto | **Esforço:** 1 sessão
**Executado em:** 2026-03-26

- [x] Auditar 12 agents — 7 com personas reais, 3 genéricos, 1 deprecated, 1 órfão
- [x] Deprecar carousel-designer (órfão em inglês, sem conexão com o sistema)
- [x] Marcar marketing-ideation como DEPRECATED (substituído por ig/li/yt)
- [x] Remover contradição TDAH no marketing-production (conflito com veto do CMO)
- [x] Adicionar thinking_dna em marketing-distribution e marketing-metrics
- [x] Corrigir acentuação pt-BR em 4 workflows + 1 task (~60+ correções)
- [x] Adicionar checkpoint no workflow board-consultation
- [x] Adicionar veto_conditions em 5 tasks críticas (daily-content, quick-post, consult-board, evaluate-deal, trend-sniper)
- [ ] Re-score e atualizar ECOSYSTEM-AUDIT

---

## Ação #6 — Criar workflows: ai-reels (4.5 → 7.0+)
**Impacto:** Médio-Alto | **Esforço:** 1 sessão

- [ ] Auditar estado atual (7 agents, 1 task, 0 workflows)
- [ ] Criar 3+ workflows com checkpoints
- [ ] Adicionar config.yaml se ausente
- [ ] Re-score e atualizar ECOSYSTEM-AUDIT

---

## Ação #7 — Resolver sobreposição content-engine vs copywriting
**Impacto:** Alto | **Esforço:** 1 sessão (análise) + 1-2 sessões (execução)

- [ ] Mapear agents duplicados entre os dois squads
- [ ] Definir fronteira clara: copywriting = copy puro, content-engine = estratégia + distribuição
- [ ] Decidir: merge, split, ou coexistência com escopo definido
- [ ] Executar decisão
- [ ] Atualizar referências e ECOSYSTEM-AUDIT

---

## Ação #8 — Upgrade relationship-therapy (3.0 → 7.0+)
**Impacto:** Médio-Alto | **Esforço:** 1-2 sessões

- [ ] 11 terapeutas reais com voice_dna+thinking_dna (já tem) — expandir profundidade
- [ ] Agents de 309 linhas média → expandir para 800+
- [ ] Criar config.yaml
- [ ] Criar 3+ workflows
- [ ] Criar tasks estruturadas
- [ ] Re-score e atualizar ECOSYSTEM-AUDIT

---

## Ação #9 — Veto conditions nos SILVER
**Impacto:** Médio | **Esforço:** 2-3 sessões (muitos squads)

- [ ] Listar todos os 17 SILVER squads e checar quais tasks têm veto_conditions
- [ ] Priorizar: squads mais usados primeiro
- [ ] Adicionar veto_conditions onde ausente
- [ ] Re-score squads que subirem

---

## Ação #10 — Completar mind clones top 5
**Impacto:** Alto | **Esforço:** 2-3 sessões

- [ ] Identificar top 5 minds incompletos com maior impacto
- [ ] Para cada: verificar sources disponíveis
- [ ] Executar pipeline de extração (voice_dna + thinking_dna + mind_dna_complete)
- [ ] Validar fidelidade
- [ ] Atualizar INDEX de minds

---

## Progresso Geral

| # | Ação | Status |
|---|------|--------|
| 1 | Arquivar SKELETON | ⬚ Pendente |
| 2 | Merge squad-creators | ✅ Feito |
| 3 | DNA enrichment — conteudo | ✅ Feito |
| 4 | DNA enrichment — seo | ✅ Feito |
| 5 | DNA enrichment — marketing-board | ✅ Feito |
| 6 | Workflows — ai-reels | ⬚ Pendente |
| 7 | Sobreposição content-engine vs copywriting | ⬚ Pendente |
| 8 | Upgrade relationship-therapy | ⬚ Pendente |
| 9 | Veto conditions nos SILVER | ⬚ Pendente |
| 10 | Mind clones top 5 | ⬚ Pendente |

**Completo:** 4/10 | **Em progresso:** 0/10 | **Pendente:** 6/10
