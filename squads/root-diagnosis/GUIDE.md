# Root Diagnosis Squad — Guia Completo para Iniciantes

---

## O que e o Root Diagnosis Squad?

E um **pipeline de diagnostico profundo de problemas** que usa 12 agentes especializados (baseados em elite minds reais) para descobrir a **causa-raiz real** de qualquer problema — antes de voce gastar tempo, dinheiro e energia resolvendo o problema errado.

**Analogia:** Imagine que voce vai ao medico com dor no ombro. Um medico ruim te da um analgesico. Um medico bom faz exames, descobre que a dor no ombro e reflexo de um problema no figado, e trata a causa real. O Root Diagnosis Squad e esse medico bom — mas para problemas de negocio, produto, equipe, processo ou estrategia.

---

## O Problema que Este Squad Resolve

A maioria das pessoas resolve problemas assim:

```
"Acho que o problema e X" → Resolve X → Problema volta → "Agora acho que e Y" → ...
```

O Root Diagnosis Squad forca um caminho diferente:

```
"Acho que o problema e X" → Sera que e mesmo? → Audita pressupostos →
Classifica o tipo → Desafia o enquadramento → Investiga causas sistemicas →
Isola causa-raiz com evidencias → Stress-testa o diagnostico →
Entrega relatorio acionavel
```

---

## Como Funciona: O Pipeline de 11 Fases

```
┌─────────────────────────────────────────────────────────────────┐
│                    ROOT DIAGNOSIS PIPELINE                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Phase 0: INTAKE & TRIAGE          ← "Qual e o problema?"       │
│     │     (root-diagnosis-chief)      5-10 min                  │
│     v                                                            │
│  Phase 1: DOMAIN CLASSIFICATION    ← "Que TIPO de problema?"    │
│     │     (Dave Snowden / Cynefin)    10-15 min                 │
│     v                                                            │
│  Phase 2: CULTURAL DIAGNOSIS       ← "O que NAO esta sendo     │
│     │     (Edgar Schein) [opcional]    dito?" 15-20 min         │
│     v                                                            │
│  Phase 3: ASSUMPTION AUDIT         ← "Que pressupostos estao   │
│     │     (Chris Argyris)              nos cegando?" 10-15 min  │
│     v                                                            │
│  Phase 4: PROBLEM REFRAMING        ← "E ESSE o problema        │
│     │     (Wedell-Wedellsborg)         certo?" 10-15 min        │
│     v                                                            │
│  Phase 5: DEEP DIAGNOSIS           ← "Qual a cadeia causal?"   │
│     │     (Goldratt OU Checkland)      15-20 min                │
│     v                                                            │
│  Phase 6: ROOT CAUSE ANALYSIS      ← "Qual a causa-raiz        │
│     │     (Kepner-Tregoe OU Gano)      verificavel?" 15-20 min │
│     v                                                            │
│  Phase 7: EVIDENCE QUANTIFICATION  ← "Quanto custa isso?"      │
│     │     (Douglas Hubbard) [opcional] 10-15 min                │
│     v                                                            │
│  Phase 8: STRESS TEST              ← "E se nosso diagnostico   │
│     │     (Gary Klein) [opcional]      estiver ERRADO?" 10-15m  │
│     v                                                            │
│  Phase 9: PACKAGE FOR ACTION       ← "Como empacotar pra       │
│     │     (Min Basadur) [opcional]     execucao?" 10-15 min     │
│     v                                                            │
│  Phase 10: DIAGNOSTIC REPORT       ← Relatorio final            │
│           (root-diagnosis-chief)      15-25 min                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Os 12 Agentes (Quem faz o que)

### Tier 0 — Foundation (Meta-pensadores)

Definem **COMO** pensar sobre o problema antes de tentar resolve-lo.

| Agente | Framework | Pergunta-Chave |
|--------|-----------|---------------|
| **Dave Snowden** | Cynefin Framework | "Que TIPO de problema e esse? Clear, Complicated, Complex ou Chaotic?" |
| **Chris Argyris** | Ladder of Inference | "Que pressupostos nao testados estao guiando esse diagnostico?" |

### Tier 1 — Masters (Diagnostico profundo)

Fazem o **trabalho pesado** de investigacao.

| Agente | Framework | Pergunta-Chave |
|--------|-----------|---------------|
| **Eli Goldratt** | TOC / Current Reality Tree | "Qual a cadeia causal completa? Qual o gargalo do sistema?" |
| **Kepner & Tregoe** | KT Rational Process | "O que e IS e o que e IS NOT? Onde isolar a causa?" |
| **Peter Checkland** | Soft Systems Methodology | "Como modelar esse sistema humano/social confuso?" |

### Tier 2 — Specialists (Dominios especificos)

Cada um ataca um angulo diferente.

| Agente | Framework | Pergunta-Chave |
|--------|-----------|---------------|
| **Thomas Wedell-Wedellsborg** | Frame-Reframe-Move | "Estamos resolvendo o problema CERTO?" |
| **Dean Gano** | Apollo RCA | "Qual o grafo causal verificavel?" |
| **Gary Klein** | PreMortem / Data-Frame | "E se esse diagnostico estiver ERRADO?" |
| **Douglas Hubbard** | Applied Information Economics | "Como medir o que parece impossivel de medir?" |
| **Edgar Schein** | Humble Inquiry / 3 Levels of Culture | "O que as pessoas NAO estao dizendo?" |
| **Min Basadur** | Simplex Process | "Como empacotar isso para acao imediata?" |

### Orchestrator

| Agente | Papel |
|--------|-------|
| **root-diagnosis-chief** | Coordena todo o pipeline, decide qual agente chamar, compila relatorio |

---

## 2 Modos de Uso

### Modo Completo (Full) — 11 fases

- **Quando usar:** Problemas complexos, estrategicos, ou que ja falharam varias vezes
- **Tempo:** 60-120 min
- **Confianca:** 70-90%
- **Comando:** `/RootDiagnosis:tasks:full-diagnosis`

### Modo Rapido (Quick) — 7 fases

- **Quando usar:** Urgencia, triagem rapida, ou validacao inicial
- **Tempo:** 30-45 min
- **Confianca:** 50-70%
- **Fases puladas:** Cultural Diagnosis, Evidence Quantification, Stress Test, Package for Action
- **Comando:** `/RootDiagnosis:tasks:quick-diagnosis`

---

## Como Comecar (Passo a Passo)

### Passo 1: Acesse o Entry Point

```
/RootDiagnosis:tasks:start
```

Isso apresenta 5 opcoes:
1. Diagnostico completo (11 fases)
2. Diagnostico rapido (7 fases)
3. Apenas classificar o problema (Cynefin)
4. Apenas desafiar o enquadramento (Reframing)
5. Saber mais sobre o squad

### Passo 2: Descreva seu Problema

O squad vai te fazer **8 perguntas de triagem** (E1 a E8):

| # | Pergunta | Por que |
|---|----------|---------|
| E1 | Descreva o problema | Captura o statement bruto |
| E2 | Ha quanto tempo existe? | Urgencia e cronicidade |
| E3 | Quem e afetado? | Stakeholders e impacto |
| E4 | Ja tentaram resolver? | Historico de tentativas |
| E5 | O que acontece se nao resolver? | Custo da inacao |
| E6 | Tem dados/metricas? | Base evidencial |
| E7 | Envolve pessoas/politica? | Necessidade de diagnostico cultural |
| E8 | Profundidade desejada? | Quick / Full / Deep |

### Passo 3: O Pipeline Executa

Cada fase roda automaticamente na sequencia. O squad decide:

- **Phase 5 (Decision Point 1):** Se o problema e Complicated → usa Goldratt (CRT). Se Complex → usa Checkland (SSM).
- **Phase 6 (Decision Point 2):** Se a causa e isolavel → usa Kepner-Tregoe (IS/IS NOT). Se e cadeia → usa Gano (Apollo RCA).

### Passo 4: Receba o Relatorio

O output final e um `diagnostic-report-final.md` com:

- **Executive Summary** (1 pagina, linguagem de decisor)
- **Evolucao do entendimento** (como o problema mudou ao longo das fases)
- **Causas-raiz verificadas** com evidencias
- **Problemas adjacentes** descobertos
- **Recomendacoes** em 3 horizontes (imediato / 30d / 90d)
- **Confianca e limitacoes** documentadas

---

## 3 Exemplos Praticos

### Exemplo 1: "Nossos devs sao lentos"

**Phase 0 — Intake:**
Problema declarado: "Equipe de desenvolvimento esta lenta, velocity caiu 30%"

**Phase 1 — Cynefin (Snowden):**
Classificado como **Complicated** — ha causas identificaveis, precisam de analise.

**Phase 3 — Assumptions (Argyris):**

```yaml
salto_critico: "Degrau 2 → Degrau 3 da Ladder of Inference"
dado_observavel: "Velocity caiu 30%"
salto: "'Velocity caiu' foi interpretado como 'devs sao lentos'"
pressupostos_nao_testados:
  - "Velocity = Produtividade (nunca verificado)"
  - "O problema e de pessoas (e se for de processo?)"
  - "Story points medem valor (medem esforco, nao valor)"
```

**Phase 4 — Reframing (Wedell-Wedellsborg):**

```yaml
frame_original: "Como fazer devs serem mais rapidos?"
frame_recomendado: "O que mudou no sistema que fez o throughput cair?"
mudanca: "Foco saiu de PESSOAS para SISTEMA"
```

**Phase 5 — Deep Diagnosis (Goldratt — CRT):**

```
Cadeia causal descoberta:

PM novo mudou metodo de estimativa
    → Stories parecem maiores no novo metodo
        → Velocity artificial cai (mesma entrega, numero menor)
            → Management conclui "devs lentos"
                → Propoe time tracking
                    → Devs desmotivados
                        → Velocity cai MAIS (agora de verdade)
```

**Phase 6 — RCA (Kepner-Tregoe):**

```yaml
IS: "Velocity caiu 30% nos ultimos 3 meses"
IS_NOT: "Velocity NAO caiu em squads com PM antigo"
DISTINCAO: "Unico fator que mudou = PM e metodo de estimativa"
CAUSA_RAIZ_VERIFICADA: "Mudanca no metodo de estimativa (nao 'devs lentos')"
```

**Resultado:** O problema NUNCA foi "devs lentos". Foi uma mudanca de metrica disfarçada de problema de performance. Sem o diagnostico, teriam implementado time tracking — piorando tudo.

---

### Exemplo 2: "Nosso mercado esta saturado"

**Phase 0 — Intake:**
CEO diz "nao tem mais espaco para crescer, mercado saturado"

**Phase 1 — Cynefin:**
Classificado como **Complex** — multiplas variaveis, nao-linear.

**Phase 2 — Cultural (Schein):**

```yaml
undiscussable_detectado: "Ninguem questiona o CEO"
evidencia: "Os 2 ultimos que trouxeram dados contrarios foram demitidos"
model_i_ativo: true
sinais:
  - "Discurso de 'portas abertas', pratica de punicao"
  - "Dados desconfortaveis 'desaparecem' antes das reunioes"
```

**Phase 3 — Assumptions (Argyris):**

```yaml
epistemic_audit:
  tipo_conhecimento: "Experiencia do CEO (20 anos)"
  qualidade: "Anecdotal, sem dados de mercado recentes"
  o_que_mudaria_mente: "'Nada' ← DOGMA, nao diagnostico"
  familiaridade_vs_compreensao: "Confundidas"
```

**Phase 4 — Reframing:**

```yaml
frame_original: "Como sobreviver num mercado saturado?"
frame_recomendado: "Estamos definindo 'mercado' de forma estreita demais?"
```

**Phase 5 — Deep Diagnosis (Checkland — SSM):**

```yaml
sistemas_modelados:
  - sistema: "Mercado como CEO define (B2B enterprise, SP)"
    resultado: "Saturado"
  - sistema: "Mercado expandido (B2B + mid-market, Brasil)"
    resultado: "70% nao atendido"
  - sistema: "Mercado adjacente (servico → SaaS)"
    resultado: "Greenfield"
```

**Resultado:** O mercado nao estava saturado. A DEFINICAO de mercado estava estreita demais. O CEO confundia sua experiencia de 20 anos com compreensao do mercado atual.

---

### Exemplo 3: "Precisamos de mais features para competir"

**Phase 0 — Intake:**
PM diz "concorrentes tem mais features, precisamos desenvolver mais"

**Phase 3 — Assumptions (Argyris):**

```yaml
pressupostos_nao_testados:
  - "Mais features = mais competitivo"
  - "Clientes escolhem pelo numero de features"
  - "Nosso problema e de produto"
```

**Phase 4 — Reframing (Wedell-Wedellsborg):**

```yaml
lente_aplicada: "Olhar alem"
insight: "Dados de churn mostram que 80% dos que saem citam
         'suporte ruim', nao 'falta de features'"
frame_original: "Como desenvolver features mais rapido?"
frame_recomendado: "Como melhorar a experiencia pos-venda?"
```

**Phase 6 — RCA:**

```yaml
causa_raiz_verificada: "Churn nao e por falta de features. E por suporte."
evidencia: "Concorrentes com MENOS features mas MELHOR suporte tem retencao 3x maior"
```

**Resultado:** Iam gastar 6 meses e R$500K desenvolvendo features que ninguem pediu, enquanto o problema real era suporte.

---

## Comandos de Acesso Rapido

| Comando | O que faz |
|---------|-----------|
| `/RootDiagnosis:tasks:start` | Entry point — mostra opcoes |
| `/RootDiagnosis:tasks:full-diagnosis` | Diagnostico completo (11 fases) |
| `/RootDiagnosis:tasks:quick-diagnosis` | Diagnostico rapido (7 fases) |
| `/RootDiagnosis:tasks:classify-domain` | Apenas classificar via Cynefin |
| `/RootDiagnosis:tasks:reframe-problem` | Apenas desafiar o enquadramento |
| `/RootDiagnosis:agents:dave-snowden` | Ativar agente Snowden direto |
| `/RootDiagnosis:agents:chris-argyris` | Ativar agente Argyris direto |
| `/RootDiagnosis:agents:gary-klein` | Ativar agente Klein direto |

### Ativacao de Agentes Individuais

Voce pode ativar qualquer agente diretamente para usar seus frameworks de forma isolada:

```
/RootDiagnosis:agents:{nome-do-agente}
```

Agentes disponiveis:

| Slash Command | Agente | Uso isolado |
|--------------|--------|-------------|
| `/RootDiagnosis:agents:root-diagnosis-chief` | Orchestrator | Coordenar diagnostico manual |
| `/RootDiagnosis:agents:dave-snowden` | Dave Snowden | Classificar problema via Cynefin |
| `/RootDiagnosis:agents:chris-argyris` | Chris Argyris | Auditar pressupostos |
| `/RootDiagnosis:agents:edgar-schein` | Edgar Schein | Diagnostico cultural |
| `/RootDiagnosis:agents:thomas-wedell-wedellsborg` | Wedell-Wedellsborg | Reframing |
| `/RootDiagnosis:agents:eli-goldratt` | Eli Goldratt | Current Reality Tree |
| `/RootDiagnosis:agents:peter-checkland` | Peter Checkland | Soft Systems Methodology |
| `/RootDiagnosis:agents:kepner-tregoe` | Kepner & Tregoe | IS/IS NOT analysis |
| `/RootDiagnosis:agents:dean-gano` | Dean Gano | Apollo RCA |
| `/RootDiagnosis:agents:douglas-hubbard` | Douglas Hubbard | Quantificacao de evidencias |
| `/RootDiagnosis:agents:gary-klein` | Gary Klein | PreMortem e stress test |
| `/RootDiagnosis:agents:min-basadur` | Min Basadur | Empacotar para acao |

---

## Quando Usar vs Quando NAO Usar

### USE quando:

- O mesmo problema reaparece apesar de "solucoes"
- Voce suspeita que esta resolvendo o problema errado
- Ha conflito sobre qual e o problema real
- O problema envolve pessoas, politica ou cultura
- A solucao anterior piorou as coisas
- Voce quer investir tempo/dinheiro e precisa de certeza
- "Ja tentamos tudo" (sinal classico de single-loop)
- Todo mundo concorda rapido demais sobre qual e o problema

### NAO USE quando:

- O problema e obvio e tecnico (bug com stack trace claro)
- Voce precisa de uma solucao, nao de um diagnostico
- O problema e urgencia de execucao, nao de entendimento
- Ja tem dados claros e verificados sobre a causa
- O custo do diagnostico e maior que o custo do problema

---

## Glossario de Termos-Chave

| Termo | Significado |
|-------|------------|
| **Cynefin** | Framework de Dave Snowden para classificar problemas em 4 dominios: Clear, Complicated, Complex, Chaotic |
| **Ladder of Inference** | Modelo de Chris Argyris que mostra os 7 degraus mentais entre dados observaveis e acoes — e onde saltamos sem perceber |
| **Double-Loop Learning** | Questionar nao apenas "estamos fazendo certo?" mas "estamos fazendo a coisa certa?" |
| **Undiscussable** | Topico que todo mundo sabe que existe mas ninguem quer tocar — frequentemente onde o problema real mora |
| **Current Reality Tree (CRT)** | Diagrama de Goldratt que mapeia a cadeia causal completa de um problema, do sintoma ate a causa-raiz |
| **IS/IS NOT** | Tecnica de Kepner-Tregoe para isolar causas comparando onde o problema aparece e onde NAO aparece |
| **Soft Systems Methodology (SSM)** | Abordagem de Checkland para problemas "messy" envolvendo pessoas e sistemas sociais |
| **PreMortem** | Tecnica de Gary Klein: "Assuma que o diagnostico esta ERRADO. 6 meses depois, deu tudo errado. Por que?" |
| **Reframing** | Tecnica de Wedell-Wedellsborg para desafiar se estamos olhando para o problema certo |
| **Espoused Theory vs Theory-in-Use** | O que as pessoas DIZEM que fazem vs o que REALMENTE fazem — o gap e onde o problema mora |
| **Model I / Model II** | Model I = comportamento defensivo (esconde dados). Model II = comportamento produtivo (testa pressupostos) |
| **HMW (How Might We)** | Formato de pergunta que transforma diagnostico em ponto de partida para acao: "Como poderiamos...?" |

---

## Arquitetura do Squad (Referencia Tecnica)

```
squads/root-diagnosis/
├── config.yaml                    # Configuracao central do squad
├── README.md                      # Documentacao rapida
├── GUIDE.md                       # Este guia
├── agents/                        # 12 agentes especializados
│   ├── root-diagnosis-chief.md    # Orchestrator
│   ├── dave-snowden.md            # Tier 0 — Cynefin
│   ├── chris-argyris.md           # Tier 0 — Ladder of Inference
│   ├── eli-goldratt.md            # Tier 1 — TOC / CRT
│   ├── kepner-tregoe.md           # Tier 1 — KT Rational Process
│   ├── peter-checkland.md         # Tier 1 — SSM
│   ├── thomas-wedell-wedellsborg.md # Tier 2 — Reframing
│   ├── dean-gano.md               # Tier 2 — Apollo RCA
│   ├── gary-klein.md              # Tier 2 — PreMortem
│   ├── douglas-hubbard.md         # Tier 2 — Quantificacao
│   ├── edgar-schein.md            # Tier 2 — Cultural
│   └── min-basadur.md             # Tier 2 — Package for Action
├── tasks/                         # 14 tasks executaveis
│   ├── start.md                   # Entry point
│   ├── full-diagnosis.md          # Orquestra 11 fases
│   ├── quick-diagnosis.md         # Orquestra 7 fases
│   ├── intake-triage.md           # Phase 0
│   ├── classify-domain.md         # Phase 1
│   ├── diagnose-culture.md        # Phase 2
│   ├── audit-assumptions.md       # Phase 3
│   ├── reframe-problem.md         # Phase 4
│   ├── deep-diagnosis.md          # Phase 5
│   ├── root-cause-analysis.md     # Phase 6
│   ├── quantify-evidence.md       # Phase 7
│   ├── stress-test.md             # Phase 8
│   ├── package-for-action.md      # Phase 9
│   └── generate-report.md         # Phase 10
├── workflows/
│   └── wf-root-diagnosis.yaml     # Workflow principal
├── templates/
│   └── diagnostic-report-tmpl.md  # Template do relatorio final
├── checklists/
│   └── diagnosis-quality-gate.md  # 20 criterios de qualidade
└── data/                          # Outputs dos diagnosticos
    └── .gitkeep
```

---

## Dica Final

O insight mais importante do squad inteiro vem de Chris Argyris:

> *"A maioria dos diagnosticos falha nao por falta de dados, mas por saltos logicos invisiveis entre os dados e as conclusoes."*

Quando voce diz "o problema e X", o squad pergunta: **"Como voce chegou a essa conclusao?"** — e desce degrau por degrau ate encontrar onde o raciocinio saltou. Esse processo, sozinho, ja vale o diagnostico inteiro.

---

*Root Diagnosis Squad v1.1.0 | 12 agentes | 11 fases | 2 decision points | Built with Synkra AIOS*
