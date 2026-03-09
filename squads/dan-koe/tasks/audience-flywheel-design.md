# Task: Design do Audience Flywheel

```yaml
task_id: KOE_BRD_006
agent: koe-brand
type: implementation
complexity: high
estimated_time: 35min
source: "Audience Flywheel — Dan Koe, Modern Mastery"
version: 1.0
tags: [audience, flywheel, trust, brand, lead-generation, organic-growth]
dependencies: []
```

## Proposito

> "The best marketing is a product so good that your customers do
> the marketing for you. Build the flywheel: create value, build trust,
> capture audience, deliver results, amplify through proof. Once spinning,
> it's almost impossible to stop."
> — Dan Koe

Desenhar um Audience Flywheel completo — o ciclo auto-reforçante onde conteudo
constroi confiança, confiança constroi audiencia, audiencia valida conteudo,
gerando crescimento exponencial sem aquisicao paga.

## Contexto

O Audience Flywheel e o modelo de Dan Koe para crescimento organico sustentavel.
Diferente de "hacks de crescimento", o flywheel e um sistema que ACELERA com o tempo:
cada volta reforça a proxima.

### Os 5 Estagios do Flywheel

```
CREATE VALUE → BUILD TRUST → CAPTURE AUDIENCE → DELIVER RESULTS → AMPLIFY THROUGH PROOF
     ^                                                                          |
     └──────────────────────────────────────────────────────────────────────────┘
```

### Regra Central
Se um estagio quebra, o flywheel inteiro desacelera. Diagnosticar qual estagio esta fraco.

## Steps

### Step 1 — Diagnosticar o Flywheel Atual (8min)

Avalie cada estagio do seu flywheel atual (1-10):

**Estagio 1: Create Value**
- Score (1-10): ____
- Frequencia de publicacao: ____
- Formato principal: ____
- O conteudo resolve problemas reais? [ ] Sim [ ] As vezes [ ] Nao
- Diferencial: ____

**Estagio 2: Build Trust**
- Score (1-10): ____
- Ha quanto tempo publica consistentemente? ____
- Replies e engajamento: ____
- As pessoas confiam o suficiente para pagar? [ ] Sim [ ] Talvez [ ] Nao
- Prova de confiança: ____

**Estagio 3: Capture Audience**
- Score (1-10): ____
- Tamanho da lista de email: ____
- Taxa de conversao social → email: ____
- Mecanismo de captura: ____
- Audiencia propria vs alugada: ____

**Estagio 4: Deliver Results**
- Score (1-10): ____
- Quantidade de depoimentos: ____
- Taxa de sucesso dos clientes: ____
- Case studies documentados: ____

**Estagio 5: Amplify Through Proof**
- Score (1-10): ____
- Referrals organicos: ____
- Mencoes sem pedir: ____
- Conteudo gerado por clientes: ____

**Estagio mais fraco**: ____ (Score: ____)
**Estagio mais forte**: ____ (Score: ____)

### Step 2 — Fortalecer o Estagio Mais Fraco (10min)

O flywheel so e tao forte quanto seu elo mais fraco.

**Estagio fraco identificado**: ____

**Se Create Value e fraco**:
- Compromisso de frequencia: ____ posts por ____
- Formato a testar: ____
- Big Idea para os proximos 30 dias: ____
- Regra: Criar ANTES de consumir

**Se Build Trust e fraco**:
- Compromisso de consistencia: ____ semanas sem falhar
- Reply a todo DM/comentario por ____ dias
- Compartilhar vulnerabilidade/bastidores: [ ] Sim [ ] Nao
- Regra: Trust compounds — cada dia consistente soma

**Se Capture e fraco**:
- Lead magnet a criar: ____
- CTA em todo conteudo: [ ] Sim [ ] Nao
- Landing page: [ ] Existe [ ] Precisa criar
- Regra: Sem captura, atencao vaza para concorrentes

**Se Deliver Results e fraco**:
- Melhoria no produto/servico: ____
- Onboarding do cliente: [ ] Existe [ ] Precisa criar
- Follow-up pos-compra: [ ] Existe [ ] Precisa criar
- Regra: Resultados sao o melhor marketing

**Se Amplify e fraco**:
- Pedir depoimentos ativamente: [ ] Sim [ ] Nao
- Programa de referral: [ ] Existe [ ] Precisa criar
- Compartilhar resultados de clientes como conteudo: [ ] Sim [ ] Nao
- Regra: Proof social e gratuito — so precisa pedir

### Step 3 — Desenhar o Flywheel Completo (10min)

**Meu Audience Flywheel**:

| Estagio | Acao Especifica | Frequencia | Metrica |
|---------|----------------|-----------|---------|
| Create Value | | | |
| Build Trust | | | |
| Capture | | | |
| Deliver Results | | | |
| Amplify | | | |

**Conexoes entre estagios** (como cada um alimenta o proximo):
1. Create → Trust: ____
2. Trust → Capture: ____
3. Capture → Results: ____
4. Results → Amplify: ____
5. Amplify → Create: ____

**Meta de 90 dias**:
- Estagio fraco vai de ____/10 para ____/10
- Email list de ____ para ____
- Depoimentos de ____ para ____

### Step 4 — Plano de Implementacao (7min)

**Semana 1-2**: Setup
- [ ] ____
- [ ] ____
- [ ] ____

**Semana 3-6**: Execucao
- [ ] ____
- [ ] ____

**Semana 7-12**: Otimizacao
- [ ] ____
- [ ] ____

**Check mensal**:
- Re-score todos os 5 estagios
- Identificar novo estagio mais fraco
- Ajustar foco

## Input Required

```yaml
input:
  current_state:
    content_frequency: ""
    email_list_size: 0
    testimonial_count: 0
    referral_rate: ""
    main_platform: ""
  flywheel_scores:
    create_value: 0
    build_trust: 0
    capture_audience: 0
    deliver_results: 0
    amplify_proof: 0
  goals:
    target_list_size: 0
    target_timeline: ""
```

## Output Template

```yaml
output:
  audience_flywheel:
    design_date: ""

    diagnostic:
      scores:
        create_value: 0
        build_trust: 0
        capture_audience: 0
        deliver_results: 0
        amplify_proof: 0
      weakest_stage: ""
      strongest_stage: ""

    flywheel_design:
      stages:
        - stage: "Create Value"
          action: ""
          frequency: ""
          metric: ""
        - stage: "Build Trust"
          action: ""
          frequency: ""
          metric: ""
        - stage: "Capture Audience"
          action: ""
          frequency: ""
          metric: ""
        - stage: "Deliver Results"
          action: ""
          frequency: ""
          metric: ""
        - stage: "Amplify Proof"
          action: ""
          frequency: ""
          metric: ""

    implementation_plan:
      week_1_2: []
      week_3_6: []
      week_7_12: []

    goals_90_day:
      weak_stage_target: 0
      email_list_target: 0
      testimonial_target: 0
```

## Quality Gate

```yaml
quality_gate: KOE_BRD_006_QG
checklist:
  - [ ] Todos 5 estagios do flywheel avaliados com scores reais
  - [ ] Estagio mais fraco identificado com plano de fortalecimento
  - [ ] Cada estagio tem acao especifica, frequencia e metrica
  - [ ] Conexoes entre estagios explicitadas
  - [ ] Plano de 90 dias com 3 fases (setup, execucao, otimizacao)
  - [ ] Mecanismo de captura definido (lead magnet ou equivalente)
  - [ ] Nenhum estagio pulado — todos 5 cobertos
  - [ ] Meta de 90 dias e mensuravel e realista
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_BRD_003  # Brand Lead Gen para detalhar o engine de conversao
    - KOE_BRD_007  # One-Person Business Blueprint para visao holistica
    - KOE_OFF_006  # Product Ecosystem Design para alinhar ofertas ao flywheel
  artifacts:
    - audience_flywheel.yaml
  notes: "Flywheel desenhado. Foco no estagio mais fraco por 30 dias antes de otimizar outros."
```
