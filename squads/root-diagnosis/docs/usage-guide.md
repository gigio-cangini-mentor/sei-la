# Root Diagnosis Squad -- Guia de Uso Completo

> Diagnosticar antes de agir. O machado afiado corta melhor.

---

## Visao Geral

O Root Diagnosis Squad e um pipeline de diagnostico profundo de problemas que usa **12 agentes especialistas** (baseados em elite minds reais) para identificar a **causa-raiz verificavel** de qualquer problema -- antes de gastar tempo, dinheiro e energia resolvendo o problema errado.

**O que faz:** Diagnostica causas-raiz reais usando 11 fases sequenciais com frameworks complementares (Cynefin, TOC, SSM, Ladder of Inference, Apollo RCA, PreMortem, AIE, Simplex).

**O que NAO faz:** Resolver problemas. O squad entrega um relatorio diagnostico com causas-raiz priorizadas, evidencias verificaveis e proximos passos acionaveis. A execucao e responsabilidade de outro squad ou equipe.

**Dominio:** Problemas organizacionais, estrategicos, operacionais, culturais, de produto, processo, equipe ou gestao.

**Filosofia:** "Sintoma nao e causa. Correlacao nao e causalidade. Diagnostico e separar."

---

## Componentes do Squad

### Agentes (12)

| Agente | Tier | Framework | Papel no Pipeline |
|--------|------|-----------|-------------------|
| **root-diagnosis-chief** | Orchestrator | ITP + DPE + DCP | Coordena fluxo, triagem, compilacao do relatorio |
| **dave-snowden** | Tier 0 | Cynefin Framework | Classificar dominio: Clear, Complicated, Complex, Chaotic |
| **chris-argyris** | Tier 0 | Ladder of Inference + Double-Loop | Auditar pressupostos e saltos logicos |
| **eli-goldratt** | Tier 1 | TOC / Current Reality Tree | Diagnostico sistemico com cadeia causal |
| **kepner-tregoe** | Tier 1 | KT Rational Process (IS/IS NOT) | Analise forense para isolar causa-raiz |
| **peter-checkland** | Tier 1 | Soft Systems Methodology (SSM) | Problemas mal definidos com multiplos stakeholders |
| **thomas-wedell-wedellsborg** | Tier 2 | Frame-Reframe-Move Forward | Desafiar enquadramento -- "E ESSE o problema certo?" |
| **dean-gano** | Tier 2 | Apollo Root Cause Analysis | Grafos causais verificaveis com evidencia por no |
| **gary-klein** | Tier 2 | PreMortem + Data/Frame + CDM | Stress test cognitivo do diagnostico |
| **douglas-hubbard** | Tier 2 | Applied Information Economics (AIE) | Quantificar o inquantificavel com calibracao |
| **edgar-schein** | Tier 2 | Humble Inquiry + 3 Levels of Culture | Diagnostico cultural/politico -- o que NAO esta sendo dito |
| **min-basadur** | Tier 2 | Simplex Process (CPS) | Empacotar diagnostico para acao (HMW + Challenge Map) |

### Tasks (14)

| Task | Fase | Descricao |
|------|------|-----------|
| `start.md` | Entry | Onboarding e selecao de modo |
| `full-diagnosis.md` | Meta | Orquestra 11 fases completas |
| `quick-diagnosis.md` | Meta | Orquestra 7 fases essenciais |
| `intake-triage.md` | Phase 0 | 8 perguntas de triagem estruturada |
| `classify-domain.md` | Phase 1 | Classificacao Cynefin |
| `diagnose-culture.md` | Phase 2 | Diagnostico cultural/politico (opcional) |
| `audit-assumptions.md` | Phase 3 | Auditoria de pressupostos |
| `reframe-problem.md` | Phase 4 | Reframing do problema |
| `deep-diagnosis.md` | Phase 5 | CRT (Goldratt) ou SSM (Checkland) |
| `root-cause-analysis.md` | Phase 6 | KT (IS/IS NOT) ou Apollo RCA (Gano) |
| `quantify-evidence.md` | Phase 7 | Quantificacao AIE (opcional) |
| `stress-test.md` | Phase 8 | PreMortem e Data/Frame (opcional) |
| `package-for-action.md` | Phase 9 | HMW + Challenge Map (opcional) |
| `generate-report.md` | Phase 10 | Relatorio diagnostico consolidado |

### Workflow e Templates

| Artefato | Arquivo | Descricao |
|----------|---------|-----------|
| Workflow central | `workflows/wf-root-diagnosis.yaml` | Pipeline completo com transicoes, decision points e error handling |
| Template de relatorio | `templates/diagnostic-report-tmpl.md` | Template de 565 linhas com 15 secoes |
| Quality gate | `checklists/diagnosis-quality-gate.md` | 20 criterios, 4 secoes ponderadas, 5 veto conditions |

---

## Inicio Rapido (4 Passos)

### Passo 1: Ativar o Squad

```
/RootDiagnosis:agents:root-diagnosis-chief
```

O Diagnostic Orchestrator e ativado e apresenta os comandos disponiveis.

### Passo 2: Escolher o Modo

| Modo | Comando | Fases | Tempo | Confianca |
|------|---------|-------|-------|-----------|
| Completo | `*diagnose` | 11 (todas) | 60-120 min | 70-90% |
| Rapido | `*quick-diagnosis` | 7 (essenciais) | 30-45 min | 50-70% |
| Entry point | `/RootDiagnosis:tasks:start` | Menu interativo | 2-5 min | -- |

### Passo 3: Responder a Triagem (Phase 0)

O squad faz 8 perguntas estruturadas:

| # | Pergunta | Alimenta |
|---|----------|----------|
| E1 | Descreva o problema como voce o ve hoje | problem_statement |
| E2 | Quem sao os stakeholders afetados? | stakeholder_map |
| E3 | Ha quanto tempo esse problema existe? | problem_timeline |
| E4 | O que ja foi tentado para resolver? | attempted_solutions |
| E5 | Qual profundidade desejada? (Quick/Full/Deep) | diagnostic_depth |
| E6 | Existem restricoes de acesso ou temas sensiveis? | access_constraints |
| E7 | Qual o nivel de urgencia? | urgency_level |
| E8 | Ha acesso a dados, metricas ou pessoas? | data_access_level |

### Passo 4: Receber o Relatorio

Apos o pipeline executar, voce recebe um `DIAGNOSTIC-REPORT-{slug}.md` com:

- Sumario executivo (1 pagina)
- Evolucao do entendimento do problema ao longo das fases
- Causas-raiz verificadas com evidencias e % de contribuicao
- Problemas adjacentes descobertos
- Recomendacoes em 3 horizontes (7d / 30d / 90d+)
- Confianca do diagnostico (%) com justificativa
- Anti-recomendacoes: o que NAO fazer

---

## Exemplos Praticos

### Exemplo 1: Diagnosticando estagnacao de crescimento empresarial

**Cenario:** CEO de uma empresa de SaaS B2B diz "nosso crescimento estagnou, estamos presos em R$2M de ARR ha 18 meses".

**Phase 0 -- Intake:**
```yaml
problema_declarado: "Crescimento estagnou em R$2M ARR ha 18 meses"
stakeholders: CEO, equipe comercial, marketing, CS
temporalidade: 18 meses (cronico)
tentativas: "Contratamos 3 SDRs novos, trocamos ferramenta de CRM, fizemos campanha outbound"
urgencia: Alta
profundidade: Full
```

**Phase 1 -- Cynefin (Snowden):**
```yaml
classificacao: Complex
justificativa:
  - "Multiplos fatores interagem (produto, mercado, vendas, CS)"
  - "Stakeholders divergem sobre a causa"
  - "Intervencoes anteriores nao produziram resultado previsivel"
implicacao: "Usar SSM (Checkland) na Phase 5, nao CRT"
```

**Phase 3 -- Pressupostos (Argyris):**
```yaml
pressupostos_nao_testados:
  - "O problema e de vendas (e se for de produto?)"
  - "Mais SDRs = mais revenue (e se o funil estiver quebrado?)"
  - "R$2M e o teto do mercado (nunca verificado com dados)"
salto_critico: "Estagnacao de ARR -> 'precisa vender mais' (salto do degrau 2 ao 5)"
```

**Phase 4 -- Reframing (Wedell-Wedellsborg):**
```yaml
frame_original: "Como vender mais para crescer alem de R$2M?"
frame_recomendado: "O que impede clientes atuais de expandirem e indicarem?"
insight: "70% do crescimento de SaaS vem de expansion revenue e referrals, nao de novos logos"
bright_spot: "3 clientes triplicaram uso sozinhos -- o que eles tem em comum?"
```

**Phase 5 -- Deep Diagnosis (Checkland -- SSM):**
```yaml
catwoe:
  customers: "Empresas mid-market que precisam do SaaS"
  transformation: "Empresa com processo manual -> empresa com processo automatizado"
  worldview_ceo: "Crescimento = novas vendas"
  worldview_cs: "Crescimento = retencao e expansao"
  conflito: "Dois worldviews competindo por recurso"
modelo_conceitual: "Sistema de crescimento com 3 motores: aquisicao, retencao, expansao"
resultado: "Motor de expansao completamente desligado -- zero investimento em CS e product-led growth"
```

**Phase 6 -- RCA (Dean Gano -- Apollo):**
```yaml
grafo_causal:
  efeito_primario: "ARR estagnado em R$2M"
  causa_raiz_1: "Ausencia de motor de expansion revenue (NRR < 100%)"
    evidencia: "Net Revenue Retention = 92% (churn > expansion)"
    contribuicao: 55%
  causa_raiz_2: "Onboarding fraco gera churn nos primeiros 90 dias"
    evidencia: "60% do churn acontece antes do dia 90"
    contribuicao: 30%
  causa_adjacente: "Time comercial otimizado para volume, nao para ICP"
    contribuicao: 15%
```

**Resultado:** O problema nunca foi "vender mais". Era uma combinacao de onboarding fraco gerando churn precoce (60% antes de 90 dias) e ausencia total de motor de expansao (NRR 92%). Contratar mais SDRs encheria um balde furado.

---

### Exemplo 2: Diagnosticando por que um lancamento de produto fracassou

**Cenario:** PM diz "lancamos a feature mais pedida pelos clientes e ninguem usa. Adocao em 3% apos 2 meses."

**Phase 0 -- Intake:**
```yaml
problema_declarado: "Feature mais pedida lancada e ninguem usa (3% adocao)"
stakeholders: PM, engenharia, CS, clientes
temporalidade: 2 meses desde lancamento
tentativas: "Enviamos emails, fizemos webinar, colocamos banner no app"
urgencia: Alta (investimento de 4 meses de dev, board cobrando resultado)
```

**Phase 3 -- Pressupostos (Argyris):**
```yaml
pressupostos_nao_testados:
  - "'Feature mais pedida' = feature que clientes usariam (pedir != usar)"
  - "Os clientes que pediram sao representativos do ICP"
  - "A implementacao corresponde ao que foi pedido"
  - "Adocao e problema de awareness (emails e webinars resolveriam)"
salto_critico: "'Clientes pediram' -> 'devemos construir exatamente o que pediram'"
governing_variable: "Pedidos de feature como proxy de demanda real"
```

**Phase 4 -- Reframing (Wedell-Wedellsborg):**
```yaml
lente: "Look in the mirror"
frame_original: "Como fazer clientes adotarem a feature?"
frame_recomendado: "A feature resolve o problema que os clientes realmente tem, ou resolve o problema que eles disseram ter?"
insight_critico: "5 dos 8 clientes que mais pediram a feature eram churners que buscavam razoes para nao sair. Nao eram power users buscando mais valor."
```

**Phase 5 -- Deep Diagnosis (Goldratt -- CRT):**
```yaml
cadeia_causal:
  ude_1: "Adocao de 3% apos 2 meses"
  ude_2: "Clientes que pediram nao sao os que usam mais o produto"
  ude_3: "Feature foi construida para edge case, nao para core workflow"
  causa_raiz: "Processo de priorizacao baseado em volume de pedidos, nao em valor de uso"
  core_conflict:
    objetivo: "Construir features que geram valor"
    necessidade_a: "Ouvir clientes"
    necessidade_b: "Validar demanda real"
    prerrequisito_a: "Coletar pedidos"
    prerrequisito_b: "Observar uso antes de construir"
    pressuposto_invalido: "'Numero de pedidos' = 'demanda real'"
```

**Phase 6 -- RCA (Kepner-Tregoe):**
```yaml
is: "Feature com 3% de adocao apos 2 meses"
is_not: "Outras features lancadas com 40%+ adocao no mesmo periodo"
distincao: "Features com alta adocao nasceram de observacao de uso (analytics). Esta nasceu de pedidos verbais."
mudanca: "6 meses atras, PM novo priorizou por volume de tickets ao inves de analytics de uso"
causa_verificada: "Metodo de priorizacao mudou de data-driven para request-driven"
```

**Resultado:** A feature fracassou nao por falta de awareness, mas porque foi construida para resolver o problema errado. Os clientes que mais pediram eram churners buscando razoes para ficar -- nao power users querendo mais. O metodo de priorizacao era o problema real.

---

### Exemplo 3: Diagnosticando disfuncao sistemica em equipe

**Cenario:** VP de Engenharia diz "minha equipe de 40 devs entrega pouco, reunioes sao improdutivas, ninguem toma iniciativa. Ja tentei feedback 1:1, team building, troca de tech leads."

**Phase 0 -- Intake:**
```yaml
problema_declarado: "Equipe de 40 devs entrega pouco, reunioes improdutivas, sem iniciativa"
stakeholders: VP Eng, tech leads (4), devs (40), CPO
temporalidade: 12 meses (cronico, piorou nos ultimos 6)
tentativas: "Feedback 1:1, team building trimestral, trocou 2 tech leads"
urgencia: Alta
```

**Phase 2 -- Cultural (Schein):**
```yaml
tres_niveis:
  artefatos: "Retros existem mas ninguem fala de verdade. Post-its genericos."
  valores_declarados: "'Transparencia', 'ownership', 'fail fast'"
  pressupostos_basicos: "'Quem fala demais e demitido' (2 devs seniors saíram apos questionarem decisoes)"
undiscussable: "VP toma decisoes tecnicas unilaterais e espera 'ownership'"
model_i_ativo: true
evidencia: "Ultimos 3 devs que trouxeram problemas foram remanejados para projetos menores"
tensao_politica: "CPO e VP Eng discordam sobre prioridades mas nunca discutem abertamente"
```

**Phase 3 -- Pressupostos (Argyris):**
```yaml
pressupostos_do_vp:
  - "O problema e de pessoas (devs nao se esforçam)"
  - "Feedback 1:1 e suficiente para mudar comportamento"
  - "Team building melhora colaboracao"
  - "'Sem iniciativa' e escolha individual, nao resposta a ambiente"
teoria_esposada: "Dou autonomia e espero ownership"
teoria_em_uso: "Decido tudo e puno quem questiona"
gap: "Autonomia declarada vs. controle praticado = paralisia aprendida"
```

**Phase 4 -- Reframing (Wedell-Wedellsborg):**
```yaml
frame_original: "Como fazer minha equipe entregar mais e tomar iniciativa?"
frame_recomendado: "O que no ambiente que EU criei esta ensinando as pessoas a NAO tomar iniciativa?"
lente: "Look in the mirror"
insight: "Cada 'solucao' tentada (feedback, team building, troca de leads) assume que o problema e nas pessoas. Nenhuma examinou o ambiente."
```

**Phase 5 -- Deep Diagnosis (Checkland -- SSM):**
```yaml
rich_picture:
  sistema_formal: "VP -> Tech Leads -> Devs (hierarquia clara)"
  sistema_informal: "VP decide tudo, tech leads sao messengers, devs executam"
  conflito: "Estrutura diz 'autonomia', pratica diz 'obediencia'"
catwoe:
  transformation: "Ambiente de controle -> ambiente de ownership real"
  worldview_vp: "Preciso de gente melhor"
  worldview_devs: "Preciso de ambiente seguro para errar"
mudanca_desejavel: "VP precisa mudar de Model I para Model II (Argyris)"
```

**Phase 6 -- RCA (Dean Gano -- Apollo):**
```yaml
causa_raiz_1: "Punicao implicita por questionamento (2 remanejamentos + 2 demissoes)"
  evidencia: "Historico de RH mostra correlacao entre questionamento publico e acoes adversas"
  contribuicao: 50%
causa_raiz_2: "Decisoes tecnicas centralizadas no VP mascaradas de 'alinhamento'"
  evidencia: "95% das decisoes de arquitetura dos ultimos 12 meses sao do VP"
  contribuicao: 35%
causa_adjacente: "Ausencia de criterios objetivos de 'boa entrega'"
  contribuicao: 15%
loop_de_reforco: "VP centraliza -> devs param de decidir -> VP ve 'falta de iniciativa' -> centraliza mais"
```

**Phase 8 -- Stress Test (Klein):**
```yaml
premortem: "E se o VP nao for o problema?"
cenario_alternativo: "Competencia tecnica dos devs genuinamente baixa"
verificacao: "Devs que sairam foram contratados por FAANG/unicornios. Competencia nao era o problema."
confianca_revisada: 85%
```

**Resultado:** O VP estava criando exatamente o ambiente que produzia o comportamento que ele criticava. Punicao por questionamento + centralizacao de decisoes = paralisia aprendida. As pessoas NAO tomavam iniciativa porque aprenderam que tomar iniciativa era perigoso. O loop se auto-reforcava: quanto mais o VP centralizava, menos iniciativa os devs tinham, e mais o VP achava que precisava centralizar.

---

## Comandos Completos

### Workflows

| Comando | Descricao | Duracao |
|---------|-----------|---------|
| `*diagnose` | Pipeline completo -- 11 fases com todos os agentes | 60-120 min |
| `*quick-diagnosis` | Pipeline rapido -- 7 fases essenciais | 30-45 min |

### Fases Isoladas

| Comando | Fase | Agente | Prerrequisito |
|---------|------|--------|---------------|
| `*classify` | Phase 1 | dave-snowden | Descricao do problema |
| `*reframe` | Phase 4 | thomas-wedell-wedellsborg | Descricao do problema |
| `*rca` | Phases 5-6 | goldratt/checkland + kt/gano | Classificacao Cynefin + Reframing |
| `*stress-test` | Phase 8 | gary-klein | Diagnostico profundo concluido |
| `*report` | Phase 10 | root-diagnosis-chief | Pelo menos fases 0,1,3,4,5,6 |

### Utilitarios

| Comando | Descricao |
|---------|-----------|
| `*status` | Dashboard do diagnostico em andamento |
| `*help` | Lista de todos os comandos |

### Ativacao de Agentes Individuais

Qualquer agente pode ser ativado diretamente para usar seus frameworks de forma isolada:

```
/RootDiagnosis:agents:{nome-do-agente}
```

Exemplos:
- `/RootDiagnosis:agents:dave-snowden` -- Classificar problema via Cynefin
- `/RootDiagnosis:agents:chris-argyris` -- Auditar pressupostos de qualquer afirmacao
- `/RootDiagnosis:agents:gary-klein` -- Fazer PreMortem de qualquer plano
- `/RootDiagnosis:agents:edgar-schein` -- Diagnosticar dinamicas culturais
- `/RootDiagnosis:agents:thomas-wedell-wedellsborg` -- Reframing de qualquer problema
- `/RootDiagnosis:agents:eli-goldratt` -- Construir Current Reality Tree
- `/RootDiagnosis:agents:douglas-hubbard` -- Quantificar incertezas

---

## Fluxos Completos

### Fluxo Full (11 fases)

```
Usuario descreve problema
    |
    v
Phase 0: INTAKE (Chief) -- 8 perguntas de triagem
    |
    v  [QG-INTAKE: 8 perguntas respondidas?]
Phase 1: CLASSIFICACAO (Snowden) -- Cynefin: que tipo de problema?
    |
    v  [QG-CLASSIFY: Dominio classificado com evidencia?]
Phase 2: CULTURA (Schein) -- O que NAO esta sendo dito? [opcional em quick]
    |
    v
Phase 3: PRESSUPOSTOS (Argyris) -- Que pressupostos nos cegam?
    |
    v  [QG-ASSUMPTIONS: Pressupostos auditados?]
Phase 4: REFRAMING (Wedell-Wedellsborg) -- E esse o problema certo?
    |
    v  [QG-REFRAME: Frame desafiado com alternativas?]
    |
    |=== DECISION POINT 1 ===
    |   Cynefin = Complicated -> Goldratt (CRT)
    |   Cynefin = Complex -> Checkland (SSM)
    |   Cynefin = Chaotic -> Ambos sequenciais
    v
Phase 5: DIAGNOSTICO PROFUNDO (Goldratt OU Checkland)
    |
    v  [QG-DEEP: Modelo diagnostico completo?]
    |
    |=== DECISION POINT 2 ===
    |   Causa isolavel -> Kepner-Tregoe (IS/IS NOT)
    |   Causas interconectadas -> Dean Gano (Apollo RCA)
    |   Incerto -> Ambos sequenciais
    v
Phase 6: ROOT CAUSE ANALYSIS (KT OU Gano)
    |
    v  [QG-RCA: Causa-raiz com evidencia verificavel?]
Phase 7: QUANTIFICACAO (Hubbard) -- Quanto custa? [opcional em quick]
    |
    v
Phase 8: STRESS TEST (Klein) -- E se estivermos errados? [opcional em quick]
    |
    v  [Confianca < 50%? -> Loop para Phase 5/6]
Phase 9: EMPACOTAMENTO (Basadur) -- HMW + Timeline [opcional em quick]
    |
    v
Phase 10: RELATORIO (Chief) -- Compilacao final
    |
    v  [QG-REPORT: Sintomas vs causas separados? Evidencias? Confianca?]
    |
    v
DIAGNOSTICO ENTREGUE -> Handoff para squad de execucao
```

### Fluxo Quick (7 fases)

```
Phase 0: Intake -> Phase 1: Cynefin -> Phase 3: Pressupostos ->
Phase 4: Reframing -> Phase 5: Deep Diagnosis -> Phase 6: RCA ->
Phase 10: Relatorio (simplificado)
```

Fases puladas: 2 (cultura), 7 (quantificacao), 8 (stress test), 9 (empacotamento).

### Upgrade Path: Quick -> Full

Se o diagnostico rapido revelar complexidade maior que esperada:

```
*diagnose --continue-from-quick {slug}
```

Reutiliza 100% dos outputs ja gerados e executa apenas as fases faltantes (2, 7, 8, 9).

---

## Dicas Avancadas

### 1. Quando usar Quick vs Full vs Deep

| Situacao | Modo | Justificativa |
|----------|------|---------------|
| Bug tecnico com causa rastreavel | Quick | Causa provavelmente isolavel, IS/IS NOT resolve |
| Problema estrategico de alto impacto | Full | Multiplas perspectivas necessarias, stress test essencial |
| Problema cronico que ja falhou 3+ vezes | Deep | Requer iteracao, quantificacao e validacao cruzada |
| Validacao rapida antes de investir | Quick | Funciona como triagem -- depois decide se precisa de Full |
| Problema com componente politico/cultural | Full | Phase 2 (Schein) e critica e so roda no Full |

### 2. Preparando o input para melhor resultado

O squad tem um SYSTEM-PROMPT.md que pode ser colado no Claude Web para preparar o input antes do diagnostico. Use quando:
- O problema e vago e voce precisa de ajuda para articular
- Ha multiplos problemas misturados
- Voce quer separar fatos de percepcoes antes de comecar

### 3. Usando agentes isolados como ferramentas

Nao precisa rodar o pipeline inteiro. Agentes individuais sao poderosos sozinhos:

- **Cynefin (Snowden):** Use antes de qualquer projeto para classificar o tipo de desafio
- **Ladder of Inference (Argyris):** Use em qualquer debate onde suspeita de saltos logicos
- **Reframing (Wedell-Wedellsborg):** Use quando todo mundo concorda rapido demais sobre o problema
- **PreMortem (Klein):** Use antes de qualquer lancamento ou decisao importante
- **Humble Inquiry (Schein):** Use quando suspeita que ha coisas nao-ditas em reunioes

### 4. Interpretando o nivel de confianca

| Range | Significado | Acao recomendada |
|-------|-------------|------------------|
| 90-100% | Multiplas evidencias convergentes, stress test validado | Agir com seguranca |
| 70-89% | Evidencias suficientes, lacunas menores | Agir com monitoramento |
| 50-69% | Hipotese forte mas poucas evidencias | Coletar mais dados antes de grandes investimentos |
| < 50% | Diagnostico preliminar | NAO tomar decisoes irreversiveis com base nele |

### 5. Red flags que indicam necessidade de diagnostico

- "Ja tentamos tudo" (sinal classico de single-loop thinking)
- "O problema e obvio" (geralmente nao e -- e o primeiro salto logico)
- Todo mundo concorda rapido demais sobre a causa
- A "solucao" anterior piorou as coisas
- Problema recorrente que "some e volta"
- Conflito sobre qual e o problema real

### 6. Combinando com outros squads

O Root Diagnosis Squad funciona como "fase zero" de qualquer outro squad:

| Situacao | Pipeline |
|----------|----------|
| Antes de criar estrategia | Root Diagnosis -> AI Strategy Squad |
| Antes de mapear processos | Root Diagnosis -> Process Mapping Squad |
| Antes de arquitetar negocio | Root Diagnosis -> Business Architect Squad |
| Antes de construir produto | Root Diagnosis -> (squad de execucao) |

---

## Troubleshooting

| Problema | Causa provavel | Solucao |
|----------|---------------|---------|
| Squad nao responde apos ativacao | Arquivo do chief nao carregado completamente | Reativar com `/RootDiagnosis:agents:root-diagnosis-chief` e aguardar greeting completo |
| Diagnostico trava em uma fase | Dados insuficientes para o framework do agente | Fornecer mais contexto ou usar `*status` para ver onde parou |
| Confianca do diagnostico abaixo de 50% | Poucas fases executadas ou pouca evidencia | Executar fases opcionais (7, 8, 9) ou fornecer mais dados |
| Decision Point seleciona metodo errado | Classificacao Cynefin imprecisa | Reexecutar Phase 1 com mais contexto via `*classify` |
| Relatorio muito generico | Inputs da triagem foram vagos | Refazer Phase 0 com respostas mais especificas e exemplos concretos |
| Agente isolado nao usa framework esperado | Agente precisa de contexto acumulado das fases anteriores | Para uso isolado, fornecer contexto diretamente; para framework completo, usar pipeline |
| Quick diagnosis nao cobre dinamicas politicas | Phase 2 (Schein) e pulada no modo Quick | Fazer upgrade para Full ou ativar Schein isoladamente: `/RootDiagnosis:agents:edgar-schein` |
| Multiplos problemas misturados na triagem | Usuario trouxe cluster de problemas | Separar em problemas distintos, priorizar 1, diagnosticar sequencialmente |
| Fase retorna resultado que contradiz fase anterior | Divergencia natural entre frameworks | Chief media divergencias no relatorio -- se persistir, documentar ambas perspectivas |
| Relatorio nao passa no quality gate | Score < 7.0 ou veto condition ativa | Verificar qual criterio falhou via checklist e remediar a fase especifica |

---

## Estrutura de Outputs

Cada diagnostico gera um diretorio em `squads/root-diagnosis/data/{problem-slug}/`:

```
data/{problem-slug}/
  intake-brief.md              # Phase 0
  domain-classification.md     # Phase 1
  cultural-diagnosis.md        # Phase 2 (se executada)
  assumption-audit.md          # Phase 3
  reframing-analysis.md        # Phase 4
  deep-diagnosis.md            # Phase 5
  root-cause-analysis.md       # Phase 6
  evidence-quantification.md   # Phase 7 (se executada)
  stress-test-report.md        # Phase 8 (se executada)
  action-package.md            # Phase 9 (se executada)
  decision-log.md              # Registro de DP1 e DP2
  DIAGNOSTIC-REPORT-{slug}.md  # Relatorio final consolidado
```

---

## Glossario Rapido

| Termo | Significado |
|-------|------------|
| **Causa-raiz** | Causa fundamental que, se removida, eliminaria ou reduziria significativamente o problema |
| **Causa adjacente** | Problema identificado que contribui mas nao e a causa fundamental |
| **Sintoma** | Manifestacao visivel do problema -- nao e causa |
| **Cynefin** | Framework de classificacao: Clear, Complicated, Complex, Chaotic |
| **CRT** | Current Reality Tree -- diagrama de cadeia causal (Goldratt) |
| **SSM** | Soft Systems Methodology -- modelagem de problemas mal definidos (Checkland) |
| **IS/IS NOT** | Tecnica de isolamento forense de causa (Kepner-Tregoe) |
| **Apollo RCA** | Grafos causais verificaveis com evidencia por no (Dean Gano) |
| **PreMortem** | "Imagine que o diagnostico falhou. Por que?" (Gary Klein) |
| **HMW** | "How Might We" -- reformulacao de causa como oportunidade de acao |
| **Undiscussable** | Topico que todos sabem existir mas ninguem toca |
| **Double-Loop** | Questionar nao so "estamos fazendo certo?" mas "fazendo a coisa certa?" |
| **Model I/II** | Model I = comportamento defensivo. Model II = testa pressupostos (Argyris) |
| **AIE** | Applied Information Economics -- quantificar o inquantificavel (Hubbard) |

---

*Root Diagnosis Squad v1.0 | 12 agentes | 11 fases | 2 decision points | Synkra AIOS*
*"Antes de cortar, vamos afiar o machado."*
