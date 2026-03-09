# Task: Criar Estratégia Stories 10x

## Task Anatomy

| Field | Value |
|-------|-------|
| **task_id** | `stories-10x` |
| **task_name** | Criar Estratégia Stories 10x |
| **execution_type** | Agent (leandro-ladeira) |
| **estimated_duration** | 20-30 min |
| **dependencies** | Big Idea definida, dados de audiência atual |
| **required_inputs** | Produto/marca, Big Idea, contagem de seguidores, taxa de engajamento, frequência atual de Stories |
| **expected_outputs** | Estratégia Stories completa com sequências selecionadas + top 10 dispositivos de engenharia social |
| **success_criteria** | ✅ 2-4 tipos de sequência selecionados<br>✅ 10 dispositivos escolhidos e justificados<br>✅ Calendário semanal definido<br>✅ Métricas de acompanhamento claras |

---

## Description

Cria estratégia Stories 10x personalizada para aumentar engajamento, liderança, seguidores, admiração, conversas, oportunidade, profundidade e vendas.

**Framework primário:** Stories 10x (Section 2.6) + 38 Dispositivos de Engenharia Social (Section 2.8)

**Filosofia:** Stories 10x NÃO é 10x visualizações. É 10x em TUDO: engajamento, liderança, seguidores, admiração, conversas, oportunidade, profundidade, vendas.

---

## Elicitation

Antes de começar, faça estas perguntas:

1. **Produto/Marca:** Qual produto ou marca você está divulgando nos Stories?
2. **Big Idea:** Qual a Big Idea central do produto? (se não tiver, vou ajudar a definir)
3. **Audiência Atual:** Quantos seguidores você tem? Taxa de engajamento atual?
4. **Frequência Atual:** Quantos Stories você posta por semana hoje? Com qual cadência?
5. **Objetivo Principal:** O que você quer 10x? (vendas, engajamento, liderança, conversas?)

---

## Process

### FASE 1: Analisar Contexto

1. Entender produto/marca
2. Validar Big Idea (ou ajudar a criar se não existir)
3. Avaliar audiência e engajamento atual
4. Identificar objetivo primário (vendas, liderança, conversas)

### FASE 2: Selecionar Tipos de Sequências

**4 Tipos de Sequências:**

#### 1. Sequência Fechada por Tema
- **Quando usar:** Tem tema específico + quer profundidade + frequência baixa (1x por semana)
- **Características:** Cadência alta (várias partes no mesmo dia), tema definido, sagacidade, flexibilidade

#### 2. Sequência de Caixinha
- **Quando usar:** Quer criar ritual recorrente + estimular perguntas
- **Características:** Frequência alta (diária), cadência baixa (1 por dia), tema recorrente, profundidade

#### 3. Sequência Cobertura
- **Quando usar:** Evento relevante (lançamento, congresso, workshop)
- **Características:** Cadência baixa (horas entre posts), espetacularização, gancho, diário

#### 4. Stories Soltos
- **Quando usar:** Conteúdo isolado + oportunista + rápido
- **Características:** Não é sequência, isolados, resposta rápida

**SAÍDA FASE 2:** 2-4 tipos selecionados com justificativa

### FASE 3: Selecionar Top 10 Dispositivos de Engenharia Social

**Categorias:**

**A) DISPOSITIVOS DE INTERAÇÃO:**
- #1 Combustível Extra (trazer audiência de outro lugar)
- #2 Desafio Curto com Promessa de Análise
- #3 Conversa Sem Privacidade (responder inbox nos stories)
- #4 Dia do Hotseat (audiência contribui conteúdo)
- #13 Alerta para Voltar (volta stories + engajamento)

**B) DISPOSITIVOS DE ANTECIPAÇÃO:**
- #9 Pânico pelo Conteúdo (curiosidade forte)
- #10 Ansiedade pela Abertura (comprovante de ação)
- #11 Abertura de Carrinho (antecipação de venda)
- #12 Ative a Notificação (expectativa de conteúdo futuro)

**C) DISPOSITIVOS DE META E CULTURA:**
- #5 Meta Coletiva (meta + benefício)
- #6 História com Gancho (contexto + ação)
- #7 Cultura de Resultado (mostrar resultados)
- #8 Piada Interna (repetição + inclusão)

**D) DISPOSITIVOS DE IDENTIDADE:**
- #16 Identidade do Comunicador
- #17 Identidade do Produto
- #18 Identidade do Consumidor

**E) DISPOSITIVOS DE PROVA E BI:**
- #14 BI Apurado (pesquisa)
- #15 Print Valioso (print + engajamento)
- #20 Opinião de Quem Comprou (depoimentos)

**SAÍDA FASE 3:** Top 10 dispositivos escolhidos com justificativa por nicho

### FASE 4: Criar Calendário de Implementação

1. Frequência semanal (quantos dias postar)
2. Cadência diária (quantos stories por dia)
3. Sequências fixas (dias da semana)
4. Dispositivos por sequência
5. Métricas de acompanhamento

### FASE 5: Definir Métricas de Sucesso

- Taxa de resposta (DMs por story)
- Taxa de permanência (75% completo, 25% completo)
- Crescimento de seguidores
- Conversões (links clicados, vendas)
- Engajamento (reações, compartilhamentos)

---

## Veto Conditions

| Condition | Action |
|-----------|--------|
| Stories sem contexto no CTA | ❌ VETAR — Link solto não converte |
| Múltiplas CTAs no mesmo Story | ❌ VETAR — Confunde audiência |
| Sequência sem tema definido | ❌ VETAR — Perde coerência |
| Frequência alta sem cadência planejada | ❌ VETAR — Vai queimar audiência |

---

## Output Example

```yaml
estrategia_stories_10x:
  produto: "Curso de Tráfego Pago Perpétuo"
  big_idea: "Venda Todo Santo Dia"
  audiencia_atual:
    seguidores: 15000
    engajamento: 4.2%
    frequencia_stories: 3x por semana
  objetivo_primario: "Vendas + Liderança"

  sequencias_selecionadas:
    - tipo: "Sequência de Caixinha"
      nome: "Caixinha de Tráfego"
      frequencia: Diária (2ª a 6ª)
      cadencia: 1 story por dia
      justificativa: "Criar ritual diário + estimular perguntas + estabelecer liderança"
      dispositivos: [#3 Conversa Sem Privacidade, #7 Cultura de Resultado]

    - tipo: "Sequência Fechada por Tema"
      nome: "Bastidores da Campanha"
      frequencia: 1x por semana (4ª feira)
      cadencia: 8-10 stories em 2h
      justificativa: "Profundidade + transparência + prova social"
      dispositivos: [#6 História com Gancho, #20 Opinião de Quem Comprou]

    - tipo: "Sequência Cobertura"
      nome: "Lançamento ao Vivo"
      frequencia: Mensal (durante abertura de carrinho)
      cadencia: A cada 3h durante 3 dias
      justificativa: "Urgência + espetacularização + FOMO"
      dispositivos: [#11 Abertura de Carrinho, #10 Ansiedade pela Abertura]

    - tipo: "Stories Soltos"
      nome: "Oportunista"
      frequencia: Quando surge oportunidade
      cadencia: Isolado
      justificativa: "Resposta rápida a tendências + flexibilidade"
      dispositivos: [#13 Alerta para Voltar]

  top_10_dispositivos:
    1:
      id: "#3 Conversa Sem Privacidade"
      justificativa: "Nicho de tráfego = muitas dúvidas. Responder publicamente cria autoridade."
    2:
      id: "#7 Cultura de Resultado"
      justificativa: "Mostrar resultados de alunos = prova social constante."
    3:
      id: "#6 História com Gancho"
      justificativa: "Narrativas vendem mais que dados. Casos de sucesso em storytelling."
    4:
      id: "#20 Opinião de Quem Comprou"
      justificativa: "Depoimentos autênticos reduzem objeções."
    5:
      id: "#11 Abertura de Carrinho"
      justificativa: "Perpétuo + urgência mensal = combinação perfeita."
    6:
      id: "#10 Ansiedade pela Abertura"
      justificativa: "Gerar expectativa antes da venda aumenta conversão."
    7:
      id: "#16 Identidade do Comunicador"
      justificativa: "Reforçar posicionamento 'O cara do Perpétuo'."
    8:
      id: "#5 Meta Coletiva"
      justificativa: "Engajar audiência com metas compartilhadas (ex: 1000 alunos em 2025)."
    9:
      id: "#13 Alerta para Voltar"
      justificativa: "Retomar atenção após conteúdo importante."
    10:
      id: "#1 Combustível Extra"
      justificativa: "Trazer audiência de YouTube/podcast para Instagram."

  calendario_semanal:
    segunda:
      - "Caixinha de Tráfego (1 story) — Dispositivo #3"
      - "Story Solto (se oportuno)"
    terca:
      - "Caixinha de Tráfego (1 story) — Dispositivo #7"
    quarta:
      - "Sequência Fechada por Tema (8-10 stories em 2h) — Dispositivos #6, #20"
    quinta:
      - "Caixinha de Tráfego (1 story) — Dispositivo #3"
    sexta:
      - "Caixinha de Tráfego (1 story) — Dispositivo #16"
      - "Alerta para Voltar (#13) se conteúdo relevante na semana"

  metricas_sucesso:
    - "Taxa de resposta: +30% em 30 dias"
    - "Taxa de permanência 75%: +20% em 60 dias"
    - "Crescimento de seguidores: +500/mês orgânicos"
    - "Conversões: +15 vendas diretas via Stories/mês"
    - "Engajamento: +50% reações em Caixinha"

  proximos_passos:
    - "Implementar Caixinha de Tráfego (2ª a 6ª)"
    - "Planejar primeira Sequência Fechada (Bastidores da Campanha)"
    - "Criar banco de dispositivos prontos (templates)"
    - "Monitorar métricas semanalmente"
    - "Ajustar após 30 dias baseado em dados"
```

---

## Acceptance Criteria

- [ ] Big Idea validada ou criada
- [ ] 2-4 tipos de sequência selecionados com justificativa
- [ ] Top 10 dispositivos escolhidos baseados no nicho
- [ ] Calendário semanal completo
- [ ] Métricas de sucesso quantificáveis
- [ ] Frequência e cadência definidas
- [ ] Vetos verificados (sem CTA solto, sem múltiplas CTAs)
- [ ] Próximos passos claros

---

## Notes

- **NÃO crie Stories sem objetivo** (use framework M.T.O — Momento, Tipo, Objetivo)
- **NÃO copie dispositivos sem adaptar ao nicho**
- **NÃO sobrecarregue com muitos dispositivos de uma vez** — implemente gradualmente
- **Sempre valide com dados após 30 dias** — ajuste baseado em métricas reais

---

## References

- **Framework primário:** Section 2.6 (Stories 10x)
- **Dispositivos:** Section 2.8 (38 Dispositivos de Engenharia Social)
- **M.T.O:** Section 2.4 (Mandala da Criatividade Infinita)
- **Voice DNA:** Section 1.2 (Power Words, Signature Phrases)

---

**Última atualização:** 2026-03-08
