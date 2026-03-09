# Task: Otimizar Campanha Ativa

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `otimizar-campanha` |
| **task_name** | Otimizar Campanha Ativa |
| **execution_type** | Agent (leandro-ladeira) |
| **estimated_duration** | 20-30 min |
| **dependencies** | Campanha com mínimo 4 dias de dados |
| **required_inputs** | Métricas dos últimos 4+ dias, budget atual, número de ad sets, performance por conjunto |
| **expected_outputs** | Plano de otimização com mudanças específicas, budget redistribuído, próxima revisão agendada |
| **success_criteria** | ✅ Regra dos 4 dias validada<br>✅ Métricas analisadas (CPM, CPC, CTR, CPL, ROAS)<br>✅ Orçamento redistribuído corretamente<br>✅ Underperformers identificados<br>✅ Próxima revisão agendada em 4 dias |

---

## Description

Otimiza campanha ativa usando framework M.O.E.R (foco na letra "O" — Otimizar) + regra dos 4 dias.

**Framework primário:** M.O.E.R — O (Section 2.1) + Regras de Timing (Section 3.1) + Regras de Orçamento (Section 3.2)

**VETO CRÍTICO:** Campanha DEVE ter 4+ dias de dados. Se tiver menos, RECUSE e explique por quê.

**Filosofia:** Otimização prematura = decisão baseada em emoção, não em dados. Pode matar campanha que estava funcionando.

---

## Elicitation

Antes de começar, faça estas perguntas:

1. **CRÍTICO:** Há quantos dias a campanha está rodando? (se <4 dias, VOU VETAR)

2. **Métricas dos últimos 4 dias:**
   - CPM (custo por mil impressões)
   - CPC (custo por clique)
   - CTR (taxa de cliques)
   - CPL (custo por lead, se aplicável)
   - ROAS (retorno sobre investimento em ads, se aplicável)
   - Vendas/Conversões

3. **Budget:**
   - Orçamento total diário atual
   - Número de ad sets (conjuntos de anúncios)
   - Budget por ad set

4. **Performance por Ad Set:**
   - Qual ad set está performando melhor? (métricas)
   - Qual ad set está performando pior? (métricas)
   - Algum ad set sem gastos ou com gastos mínimos?

5. **Objetivo da campanha:**
   - Conversão (vendas diretas)
   - Leads (captura)
   - Tráfego (cliques)
   - Engajamento (seguidores, interações)

---

## Process

### FASE 1: VALIDAR REGRA DOS 4 DIAS

**VETO ABSOLUTO:** Se campanha tem MENOS de 4 dias, PARAR imediatamente.

**Razão:**
> "Normalmente eu faço as minhas otimizações de 4 em 4 dias, justamente pra que a minha alteração ela surta efeito, e só depois eu faça 1 próxima alteração. Então eu preciso de dados pra tomar 1 decisão mais assertiva." (Aula 17 - M.O.E.R)

**Se <4 dias:**
```
Calma, cara. Ainda não.

Sua campanha tem [X dias]. Precisa de no mínimo 4 dias de dados pra otimizar.

Por quê? Porque sem dados suficientes, você vai decidir baseado em emoção, não em inteligência.

Pode até parecer que tá ruim agora, mas pode ser só o Facebook aprendendo.

Espera mais [4 - X dias], aí a gente otimiza com base em dados reais. Beleza?

Próxima otimização: [data 4 dias depois do início].
```

**Se ≥4 dias:** Prosseguir para Fase 2.

### FASE 2: METRIFICAR (M do M.O.E.R)

**Coletar e analisar métricas essenciais:**

| Métrica | O que indica | Benchmark |
|---------|-------------|-----------|
| **CPM** | Custo por 1000 impressões | Varia por nicho (R$ 10-50 normal) |
| **CPC** | Custo por clique | R$ 0.50-3.00 (médio) |
| **CTR** | Taxa de cliques (%) | >1% = bom, >2% = ótimo |
| **CPL** | Custo por lead | Depende do ticket (idealmente <20% do valor) |
| **ROAS** | Retorno sobre investimento | >2.0 = sustentável, >3.0 = excelente |
| **CPA** | Custo por aquisição | Depende do LTV (lifetime value) |

**Identificar:**
- ✅ **Campeões:** Ad sets com melhor ROAS/CTR/Conversões
- ⚠️ **Medianos:** Performance aceitável mas pode melhorar
- ❌ **Underperformers:** CPL alto, CTR baixo, sem conversões

**SAÍDA:** Classificação de ad sets (campeão, mediano, underperformer)

### FASE 3: APLICAR REGRA DE ORÇAMENTO

**Fórmula:**
```
Orçamento Total ÷ 2 = Metade
Metade ÷ Número de Conjuntos = Limite Mínimo por Conjunto
```

**Exemplo:**
- Budget total: R$ 300/dia
- Número de ad sets: 3
- Cálculo: R$ 300 ÷ 2 = R$ 150 | R$ 150 ÷ 3 = R$ 50/conjunto (mínimo)

**Regra:** Cada ad set DEVE ter no mínimo esse valor para ter dados confiáveis.

**SAÍDA:** Budget mínimo por ad set calculado

### FASE 4: OTIMIZAR (O do M.O.E.R)

**Ações possíveis:**

#### A) PAUSAR UNDERPERFORMERS
**Quando:**
- CPL 2x acima da média
- CTR <0.5%
- ROAS <1.0 (perdendo dinheiro)
- Zero conversões em 4 dias

**Ação:** Pausar ad set, redirecionar budget para campeões

#### B) ESCALAR CAMPEÕES
**Quando:**
- ROAS >2.0 consistente
- CTR >2%
- CPL abaixo da média
- Conversões constantes

**Ação:** Aumentar budget do ad set campeão em 20-30%

#### C) TESTAR VARIAÇÕES
**Quando:**
- Ad sets medianos (performance ok mas não excelente)

**Ação:** Criar variação de criativo/copy/audiência

#### D) REDISTRIBUIR ORÇAMENTO
**Quando:**
- Ad sets com budget desbalanceado

**Ação:** Redistribuir seguindo fórmula (Budget ÷ 2 ÷ Número de sets)

**SAÍDA:** Lista de ações específicas por ad set

### FASE 5: DEFINIR PRÓXIMA REVISÃO

**REGRA:** Próxima otimização em 4 dias (não antes!)

**Agendar:**
- Data da próxima revisão: [hoje + 4 dias]
- Métricas a acompanhar: [mesmas]
- Meta para os próximos 4 dias: [ROAS alvo, CPL alvo, conversões alvo]

**SAÍDA:** Próxima revisão agendada + metas definidas

---

## Veto Conditions

| Condition | Action |
|-----------|--------|
| Campanha com menos de 4 dias | ❌ VETO ABSOLUTO — Esperar até 4 dias |
| Otimização anterior há menos de 4 dias | ❌ VETAR — Aguardar dados da última mudança |
| Budget desbalanceado sem justificativa | ❌ VETAR — Redistribuir seguindo fórmula |
| Múltiplas mudanças simultâneas | ❌ VETAR — Mudar 1 variável por vez |

---

## Output Example

```yaml
otimizacao_campanha:
  validacao_inicial:
    dias_rodando: 6
    status: "✅ APROVADO (≥4 dias)"
    data_inicio: "2026-03-01"
    proxima_otimizacao_permitida: "2026-03-08"

  metrificacao:
    periodo: "2026-03-01 a 2026-03-06 (6 dias)"
    budget_total_diario: "R$ 300.00"
    numero_ad_sets: 3

    ad_set_1:
      nome: "Urgência - Curso de Tráfego"
      budget_diario: "R$ 120.00"
      metricas:
        impressoes: 45000
        cliques: 1200
        cpm: "R$ 18.50"
        cpc: "R$ 0.92"
        ctr: "2.67%"
        leads: 85
        cpl: "R$ 13.00"
        vendas: 12
        roas: 3.2
      classificacao: "✅ CAMPEÃO"

    ad_set_2:
      nome: "Consciência - Como Vender Todo Dia"
      budget_diario: "R$ 100.00"
      metricas:
        impressoes: 38000
        cliques: 680
        cpm: "R$ 21.00"
        cpc: "R$ 1.47"
        ctr: "1.79%"
        leads: 48
        cpl: "R$ 20.83"
        vendas: 5
        roas: 1.8
      classificacao: "⚠️ MEDIANO"

    ad_set_3:
      nome: "Oportunidade - Transforme Seu Negócio"
      budget_diario: "R$ 80.00"
      metricas:
        impressoes: 52000
        cliques: 310
        cpm: "R$ 12.30"
        cpc: "R$ 2.06"
        ctr: "0.60%"
        leads: 18
        cpl: "R$ 35.56"
        vendas: 1
        roas: 0.4
      classificacao: "❌ UNDERPERFORMER"

  budget_validation:
    formula: "R$ 300 ÷ 2 ÷ 3 = R$ 50 mínimo/ad set"
    status: "✅ Todos os ad sets acima do mínimo"

  otimizacoes_recomendadas:
    acao_1:
      ad_set: "Ad Set 3 (Oportunidade)"
      tipo: "PAUSAR"
      justificativa: |
        - CTR muito baixo (0.60% vs ideal >1%)
        - CPL 2.7x acima do campeão (R$ 35.56 vs R$ 13.00)
        - ROAS 0.4 (perdendo dinheiro)
        - Público frio demais sem validação prévia de Urgência
      impacto: "Libera R$ 80/dia para redistribuir"

    acao_2:
      ad_set: "Ad Set 1 (Urgência)"
      tipo: "ESCALAR +25%"
      justificativa: |
        - ROAS 3.2 (excelente)
        - CTR 2.67% (muito bom)
        - CPL R$ 13.00 (sustentável para ticket médio)
        - Conversões consistentes (12 vendas em 6 dias)
      novo_budget: "R$ 150/dia (era R$ 120)"
      impacto: "Aumentar volume de conversões mantendo eficiência"

    acao_3:
      ad_set: "Ad Set 2 (Consciência)"
      tipo: "MANTER + TESTAR VARIAÇÃO"
      justificativa: |
        - ROAS 1.8 (aceitável mas pode melhorar)
        - CTR 1.79% (ok)
        - CPL R$ 20.83 (60% acima do ideal)
        - Criar variação de criativo para melhorar CTR
      novo_budget: "R$ 150/dia (era R$ 100) — absorve budget do Ad Set 3"
      acao_extra: "Criar variação com copy mais direta (testar vs original)"

  nova_distribuicao_budget:
    total_diario: "R$ 300.00"
    ad_set_1_urgencia: "R$ 150.00 (50%)"
    ad_set_2_consciencia: "R$ 150.00 (50%)"
    ad_set_3_oportunidade: "R$ 0.00 (PAUSADO)"

  proxima_revisao:
    data: "2026-03-12"
    motivo: "4 dias após esta otimização"
    metricas_acompanhar:
      - "ROAS do Ad Set 1 (meta: manter >3.0 com budget maior)"
      - "CPL do Ad Set 2 (meta: reduzir para <R$ 18 com nova variação)"
      - "CTR da variação do Ad Set 2 (meta: >2.0%)"
    meta_geral: "Manter ROAS geral >2.5 com volume 25% maior"

  resumo_executivo: |
    Vamos lá, cara. Aqui está o plano:

    1. PAUSAR Ad Set 3 (Oportunidade) — tá sangrando dinheiro (ROAS 0.4)
    2. ESCALAR Ad Set 1 (Urgência) +25% — é o campeão disparado (ROAS 3.2)
    3. TESTAR variação no Ad Set 2 (Consciência) — performance ok mas pode melhorar

    Por quê? Porque você tentou ir pra Oportunidade antes de dominar Urgência.
    Ad Set 3 é público frio demais. CPL alto, conversão baixa.

    Ad Set 1 tá provado. ROAS 3.2 é descomunal. Hora de escalar.
    Ad Set 2 tem potencial. Vamos testar criativo novo pra melhorar.

    Próxima otimização: 12/03 (daqui 4 dias). Não mexe antes, beleza?

    Pronto, é só isso. Simples assim.
```

---

## Acceptance Criteria

- [ ] Regra dos 4 dias validada (campanha ≥4 dias)
- [ ] Métricas coletadas e analisadas (CPM, CPC, CTR, CPL, ROAS)
- [ ] Ad sets classificados (campeão, mediano, underperformer)
- [ ] Budget validado com fórmula (÷2 ÷ número de sets)
- [ ] Ações específicas por ad set (pausar, escalar, testar, manter)
- [ ] Budget redistribuído corretamente
- [ ] Próxima revisão agendada em 4 dias
- [ ] Meta para próximos 4 dias definida

---

## Notes

- **Se campanha <4 dias:** NUNCA otimizar. Explicar por quê e agendar revisão.
- **Se múltiplas mudanças foram feitas <4 dias atrás:** Esperar estabilizar antes de nova mudança.
- **Se todos os ad sets estão underperformers:** Problema pode ser oferta, não criativo. Escalar antes de otimizar.
- **Se ROAS <1.0 geral:** Considerar pausar campanha e revisar estratégia (Big Idea, oferta, público).

---

## References

- **Framework primário:** Section 2.1 (M.O.E.R — foco em "O")
- **Regra dos 4 dias:** Section 3.1 (Regras de Timing)
- **Fórmula de budget:** Section 3.2 (Regras de Orçamento)
- **Pirâmide de Prontidão:** Section 2.3 (contexto de Urgência → Consciência → Oportunidade)

---

**Última atualização:** 2026-03-08
