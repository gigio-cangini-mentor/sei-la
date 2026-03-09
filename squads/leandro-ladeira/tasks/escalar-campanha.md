# Task: Escalar Campanha Validada

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `escalar-campanha` |
| **task_name** | Escalar Campanha Validada |
| **execution_type** | Agent (leandro-ladeira) |
| **estimated_duration** | 25-35 min |
| **dependencies** | Campanha com ROAS estável 4+ dias, Big Idea validada, fase da Pirâmide identificada |
| **required_inputs** | Histórico de ROAS (4+ dias), budget atual, métricas, fase atual da Pirâmide, meta de faturamento |
| **expected_outputs** | Plano de escala com progressão de budget, próxima fase da Pirâmide, métricas de monitoramento, gatilhos de pausa |
| **success_criteria** | ✅ ROAS estável ≥4 dias validado<br>✅ Progressão de budget calculada<br>✅ Próxima fase da Pirâmide definida<br>✅ Gatilhos de monitoramento claros<br>✅ Meta de escala realista |

---

## Description

Escala campanha validada usando framework M.O.E.R (foco na letra "E" — Escalar) + 5 Fases do Perpétuo + Pirâmide de Prontidão.

---

## Pre-Conditions (Poka-Yoke Gate)

Antes de iniciar esta task, VERIFICAR:

| Condição | Verificação | Se falhar |
|----------|-------------|-----------|
| ROAS estável 4+ dias | Perguntar: "ROAS está estável por 4+ dias consecutivos?" | BLOCK — Aguardar estabilidade |
| Campanha validada | Confirmar: "ROAS ≥ 2.0 consistente?" | BLOCK — Campanha não está pronta para escalar |
| Big Idea clara | Perguntar: "Qual a Big Idea do produto?" | BLOCK — Execute `*big-idea` primeiro |
| Fase da Pirâmide conhecida | Perguntar: "Está em qual fase? Urgência, Consciência ou Oportunidade?" | BLOCK — Definir fase antes |

**Framework primário:** M.O.E.R — E (Section 2.1) + 5 Fases do Perpétuo (Section 2.2) + Pirâmide de Prontidão (Section 2.3)

**VETO CRÍTICO:** Só escalar campanha com ROAS estável por 4+ dias. Não escalar se pulou fases da Pirâmide.

**Filosofia:** Escalar sem validação = queimar orçamento. Escalar na ordem errada (pular fases) = risco desnecessário. Crescimento perpétuo é gradual, não explosivo.

---

## Elicitation

Antes de começar, faça estas perguntas:

1. **Histórico de ROAS:**
   - ROAS dos últimos 4 dias (dia a dia)
   - ROAS está estável ou oscilando?
   - Qual o ROAS médio dos últimos 7 dias?

2. **Métricas Atuais:**
   - Budget diário atual
   - CPL (custo por lead)
   - CPA (custo por aquisição)
   - Número de vendas/dia (média últimos 7 dias)

3. **Fase da Pirâmide Atual:**
   - [ ] URGÊNCIA (Fase 1) — "Curso de [tema]"
   - [ ] CONSCIÊNCIA (Fase 2) — "Como resolver [problema]"
   - [ ] OPORTUNIDADE (Fase 3) — Público frio, vender ideia

4. **Histórico de Validação:**
   - Você já dominou Urgência? (ROAS >2.0 por 4+ dias?)
   - Se está em Consciência, já validou Urgência antes?
   - Se está em Oportunidade, já validou Urgência + Consciência?

5. **Meta de Faturamento:**
   - Quanto você quer faturar/dia? (meta realista)
   - Prazo: 30 dias, 60 dias, 90 dias?

---

## Process

### FASE 1: VALIDAR ESTABILIDADE (PRÉ-REQUISITO)

**VETO ABSOLUTO:** Se ROAS não está estável por 4+ dias, NÃO escalar.

**Checklist de Estabilidade:**

| Condição | Status | Ação |
|----------|--------|------|
| ROAS ≥2.0 por 4+ dias consecutivos | [ ] | Se NÃO: VETAR escala |
| ROAS sem oscilação >30% dia a dia | [ ] | Se NÃO: Aguardar estabilizar |
| CPL consistente (variação <20%) | [ ] | Se NÃO: Otimizar antes de escalar |
| Conversões diárias (mínimo 3/dia) | [ ] | Se NÃO: Aumentar volume antes de escalar |

**Se NÃO passar:**
```
Calma, cara. Ainda não dá pra escalar.

Sua campanha tem ROAS [X], mas tá oscilando muito. Dia [A] foi [ROAS], dia [B] foi [ROAS].

Por quê não dá? Porque escalar campanha instável = amplificar problema.

Você precisa de 4 dias ESTÁVEIS (ROAS >2.0, CPL consistente) antes de escalar.

Próxima revisão: [data 4 dias depois]. Aí a gente vê se estabilizou. Beleza?
```

**Se PASSAR:** Prosseguir para Fase 2.

**SAÍDA:** Validação de estabilidade (APROVADO ou VETADO)

### FASE 2: VALIDAR SEQUÊNCIA DA PIRÂMIDE

**REGRA:** SEMPRE começar por Urgência. Só expandir para Consciência depois de dominar Urgência. Só ir para Oportunidade depois de dominar Consciência.

**Sequência correta:**
1. **Urgência (Fase 1)** — "Pescando num aquário, é facinho"
2. **Consciência (Fase 2)** — "Pescando num pesque pague"
3. **Oportunidade (Fase 3)** — "Pescando no oceano"

**Checklist:**

| Situação | Ação |
|----------|------|
| Está em Urgência e validou ROAS >2.0 | ✅ Pode escalar Urgência OU expandir para Consciência |
| Está em Consciência mas NÃO validou Urgência antes | ❌ VETAR — Voltar para Urgência |
| Está em Oportunidade mas NÃO validou Consciência antes | ❌ VETAR — Sequência errada |
| Está em Urgência mas quer pular para Oportunidade | ❌ VETAR — Pular fases = risco alto |

**Se sequência errada:**
```
Pô, cara. Você tá querendo ir pra [Fase X] mas não dominou [Fase Y] ainda.

Por quê isso é problema? Porque [Fase X] tem público muito mais frio. CPL vai subir, ROAS vai cair.

A sequência certa é:
1. Urgência (pessoas prontas) — valida oferta + ganha dados
2. Consciência (sabem que têm problema) — expande alcance
3. Oportunidade (nem sabem que precisam) — só depois de dominar as 2 primeiras

Você precisa dominar Urgência PRIMEIRO. Aí sim expande. Faz sentido?
```

**Se sequência correta:** Prosseguir para Fase 3.

**SAÍDA:** Validação de sequência (APROVADO ou VETADO)

### FASE 3: CALCULAR PROGRESSÃO DE BUDGET

**REGRA:** Escalar gradualmente. NÃO dobrar budget de uma vez.

**Progressão Recomendada:**

| Tipo de Escala | Aumento % | Quando Usar |
|---------------|-----------|-------------|
| **Conservadora** | +20-30% | ROAS 2.0-3.0 (margem apertada) |
| **Padrão** | +40-50% | ROAS 3.0-4.0 (margem boa) |
| **Agressiva** | +70-100% | ROAS >4.0 (margem excelente) |

**Exemplo:**
- Budget atual: R$ 300/dia
- ROAS médio: 3.5
- Tipo de escala: Padrão (+50%)
- Novo budget: R$ 450/dia

**Progressão Semanal (exemplo):**
```
Semana 1: R$ 300/dia → R$ 450/dia (+50%)
Semana 2: Monitorar ROAS. Se >3.0, escalar novamente.
Semana 3: R$ 450/dia → R$ 675/dia (+50%)
Semana 4: Monitorar ROAS. Se >3.0, escalar novamente.
```

**SAÍDA:** Progressão de budget calculada

### FASE 4: DEFINIR PRÓXIMA FASE DA PIRÂMIDE (se aplicável)

**Quando expandir para próxima fase:**

#### EXPANSÃO: Urgência → Consciência
**Condições:**
- Urgência com ROAS >2.5 por 7+ dias
- CPL estável
- Público de Urgência saturando (CTR caindo)

**Ação:**
- Manter Urgência rodando (budget original ou reduzido)
- Criar campanha nova para Consciência
- Budget Consciência = 30-50% do budget Urgência (teste inicial)

#### EXPANSÃO: Consciência → Oportunidade
**Condições:**
- Consciência com ROAS >2.0 por 14+ dias
- Urgência + Consciência = pelo menos R$ 1k/dia de budget combinado
- Domínio claro do funil (conversões previsíveis)

**Ação:**
- Manter Urgência + Consciência rodando
- Criar campanha nova para Oportunidade
- Budget Oportunidade = 20-30% do budget total (teste conservador)

**Analogia:**
> "Urgência = pescando num aquário. Consciência = pesque pague. Oportunidade = oceano." (Section 2.3)

**SAÍDA:** Próxima fase definida (se aplicável) + budget de teste

### FASE 5: DEFINIR GATILHOS DE MONITORAMENTO

**Monitorar diariamente:**

| Métrica | Gatilho de ALERTA | Gatilho de PAUSA |
|---------|-------------------|------------------|
| **ROAS** | Caiu <2.0 por 2 dias | Caiu <1.5 por 3 dias |
| **CPL** | Subiu >30% vs média | Subiu >50% vs média |
| **CTR** | Caiu >20% vs média | Caiu >40% vs média |
| **Conversões/dia** | Caiu >30% vs média | Zero conversões por 3 dias |

**Ações por gatilho:**

| Gatilho Ativado | Ação |
|----------------|------|
| **ALERTA** | Investigar (criativo cansado? público saturado?) |
| **PAUSA** | Pausar campanha, voltar para budget anterior, investigar causa raiz |

**SAÍDA:** Gatilhos de monitoramento definidos

### FASE 6: CRIAR PLANO DE ESCALA

**Formato de entrega:**

```yaml
plano_escala:
  validacao: [APROVADO/VETADO]
  fase_piramide_atual: [Urgência/Consciência/Oportunidade]
  progressao_budget: [detalhes]
  proxima_fase: [se aplicável]
  gatilhos_monitoramento: [detalhes]
  meta_30_dias: [faturamento esperado]
```

---

## Veto Conditions

| Condition | Action |
|-----------|--------|
| ROAS instável (<4 dias estáveis) | ❌ VETO ABSOLUTO — Aguardar estabilizar |
| Pulou fases da Pirâmide | ❌ VETAR — Voltar para sequência correta |
| Quer escalar >100% de uma vez com ROAS <4.0 | ❌ VETAR — Escala muito agressiva, risco alto |
| Campanha com <50 vendas totais (pouco histórico) | ❌ VETAR — Ganhar mais dados antes de escalar |
| Budget atual <R$ 100/dia e quer ir para Oportunidade | ❌ VETAR — Budget muito baixo para público frio |

---

## Output Example

```yaml
plano_escala:
  validacao_inicial:
    status: "✅ APROVADO"
    roas_ultimos_7_dias: [3.2, 3.4, 3.1, 3.5, 3.3, 3.6, 3.4]
    roas_medio: 3.36
    estabilidade: "✅ Variação <10%, considerado estável"
    conversoes_dia_media: 8.5
    cpl_medio: "R$ 18.50"

  fase_piramide:
    atual: "URGÊNCIA (Fase 1)"
    validada: "✅ SIM — 7 dias com ROAS >3.0"
    proxima_expansao: "CONSCIÊNCIA (Fase 2)"
    justificativa_expansao: |
      Urgência validada com ROAS >3.0 por 7 dias consecutivos.
      CTR começando a cair (2.5% → 2.1% última semana) = sinal de saturação.
      Hora de expandir para Consciência mantendo Urgência ativa.

  budget_atual:
    total_diario: "R$ 500.00"
    ad_sets:
      urgencia_curso_trafego: "R$ 500.00"

  progressao_budget:
    tipo_escala: "PADRÃO (+50%)"
    justificativa: "ROAS 3.36 = margem boa, permite escala agressiva"

    semana_1:
      periodo: "2026-03-08 a 2026-03-14"
      budget_urgencia: "R$ 750/dia (+50%)"
      acao: "Escalar Urgência mantendo mesmos criativos"
      meta_conversoes_dia: "12-15"
      meta_roas: ">3.0"

    semana_2:
      periodo: "2026-03-15 a 2026-03-21"
      budget_urgencia: "R$ 750/dia (manter)"
      acao: "Monitorar estabilidade após escala"
      decisao: "Se ROAS >3.0, escalar novamente. Se <2.5, pausar escala."

    semana_3:
      periodo: "2026-03-22 a 2026-03-28"
      budget_urgencia: "R$ 750/dia (manter)"
      budget_consciencia: "R$ 250/dia (NOVO)"
      acao: "Lançar campanha Consciência (teste)"
      meta_consciencia: "ROAS >2.0, CPL <R$ 25"

    semana_4:
      periodo: "2026-03-29 a 2026-04-04"
      budget_urgencia: "R$ 750/dia"
      budget_consciencia: "R$ 250-400/dia (escalar se ROAS >2.0)"
      acao: "Validar Consciência, escalar se performar"
      meta_combinada: "Budget total R$ 1.000-1.150/dia"

  expansao_piramide:
    fase_nova: "CONSCIÊNCIA (Fase 2)"
    quando_lancar: "Semana 3 (após validar escala de Urgência)"
    budget_inicial_teste: "R$ 250/dia (33% do Urgência)"
    publico_alvo: |
      Pessoas que procuram "como crescer no Instagram", "como vender mais",
      "aumentar conversões" — sabem que TÊM PROBLEMA, não sabem que precisam de curso.
    criativos_recomendados:
      - "Vídeo: 'Por que seu Instagram não vende' (problema)"
      - "Vídeo: '3 erros que matam suas vendas no Instagram' (problema + curiosidade)"
      - "Carrossel: 'Sinais de que você precisa tráfego pago' (consciência)"
    meta_consciencia:
      roas_minimo: 2.0
      cpl_maximo: "R$ 25.00"
      conversoes_dia_esperadas: "3-5 (inicial)"

  gatilhos_monitoramento:
    revisar_diariamente:
      - "ROAS (se <2.0 por 2 dias = ALERTA)"
      - "CPL (se >R$ 25 = ALERTA)"
      - "Conversões/dia (se <5 = ALERTA)"

    gatilho_alerta:
      roas_caiu_abaixo_2: |
        Investigar:
        1. Criativo cansou? (CTR caindo?)
        2. Público saturou? (Frequência >3?)
        3. Oferta perdeu urgência? (promoção acabou?)
      cpl_subiu_30_porcento: |
        Investigar:
        1. CPM subiu? (competição aumentou?)
        2. CTR caiu? (criativo perdeu apelo?)
        3. Taxa de conversão caiu? (página de vendas?)

    gatilho_pausa:
      roas_abaixo_1_5_por_3_dias: "Pausar campanha, voltar budget anterior, investigar causa raiz"
      zero_conversoes_por_3_dias: "Pausar campanha, revisar oferta/criativo/público"
      cpl_subiu_50_porcento: "Pausar campanha, testar novos criativos"

  meta_faturamento:
    atual_7_dias: "R$ 42.000 (8.5 vendas/dia × R$ 700 ticket × 7 dias)"
    meta_30_dias:
      semana_1: "R$ 36.750 (12.5 vendas/dia × R$ 700 × 7 dias)"
      semana_2: "R$ 36.750 (manter)"
      semana_3: "R$ 45.500 (15 Urgência + 3 Consciência × R$ 700 × 7 dias)"
      semana_4: "R$ 52.500 (15 Urgência + 5 Consciência × R$ 700 × 7 dias)"
      total_30_dias: "R$ 171.500"
    crescimento_vs_atual: "+102% em 30 dias"

  proxima_revisao:
    data: "2026-03-12 (após 4 dias da escala)"
    metricas_verificar:
      - "ROAS Urgência com novo budget (meta: >3.0)"
      - "CPL Urgência (meta: <R$ 22)"
      - "Conversões/dia (meta: 12-15)"
    decisao: "Se métricas OK, escalar novamente. Se não, manter e investigar."

  resumo_executivo: |
    Vamos lá, cara. Sua campanha tá VALIDADA.

    ROAS 3.36 por 7 dias consecutivos = campanha campeã. Hora de escalar.

    PLANO:
    1. Semana 1: Escalar Urgência +50% (R$ 500 → R$ 750/dia)
    2. Semana 2: Monitorar estabilidade
    3. Semana 3: Lançar Consciência com R$ 250/dia (teste)
    4. Semana 4: Escalar Consciência se ROAS >2.0

    Por quê essa sequência?
    - Urgência tá provada. CTR caindo = saturação. Hora de expandir.
    - Consciência = próximo nível da Pirâmide. Público maior, CPL um pouco mais alto.
    - Urgência + Consciência juntos = funil completo, crescimento sustentável.

    Meta: R$ 171.500 em 30 dias (vs R$ 42k atuais = +102%).

    Crescimento perpétuo é gradual, não explosivo. Semana a semana. Beleza?

    Próxima revisão: 12/03. Não escala antes, deixa estabilizar.

    Pronto, é só isso. Simples assim.
```

---

## Acceptance Criteria

- [ ] ROAS estável ≥4 dias validado (>2.0)
- [ ] Sequência da Pirâmide validada (não pulou fases)
- [ ] Progressão de budget calculada (+20-100% conforme ROAS)
- [ ] Próxima fase da Pirâmide definida (se aplicável)
- [ ] Budget de teste para próxima fase calculado (se aplicável)
- [ ] Gatilhos de monitoramento claros (ALERTA e PAUSA)
- [ ] Meta de faturamento 30 dias realista
- [ ] Próxima revisão agendada (4 dias após escala)

---

## Notes

- **Crescimento perpétuo é GRADUAL:** "Esse método não é 1 negócio que vai explodir. Ele é 1 crescimento gradual ao longo do tempo." (Section 1.1)
- **Sementes múltiplas:** Plantar várias sementes (campanhas) e colher constantemente. NÃO depender de 1 campanha explosiva.
- **Escalar sem validação = queimar dinheiro:** Sempre 4+ dias de dados estáveis antes de escalar.
- **Ordem importa:** Urgência → Consciência → Oportunidade. NUNCA pular.

---

## References

- **Framework primário:** Section 2.1 (M.O.E.R — foco em "E")
- **5 Fases do Perpétuo:** Section 2.2
- **Pirâmide de Prontidão:** Section 2.3
- **Regra dos 4 dias:** Section 3.1
- **Crescimento gradual:** Section 1.1 (Cognitive Architecture)

---

**Última atualização:** 2026-03-08
