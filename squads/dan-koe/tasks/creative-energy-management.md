# Task: Gestao de Energia Criativa

```yaml
task_id: KOE_MND_008
agent: koe-mindset
type: implementation
complexity: medium
estimated_time: 25min
source: "Creative Energy Management — Dan Koe, Modern Mastery"
version: 1.0
tags: [energy, deep-work, recovery, peak-performance, routine, creative-output]
dependencies: []
```

## Proposito

> "You dont manage time. You manage energy. The same hour at 6am
> produces 10x what the same hour at 3pm does. Stop fighting biology.
> Design your day around energy, not the clock."
> — Dan Koe

Desenhar uma rotina diaria alinhada aos ciclos biologicos de energia — pico
criativo para criacao, energia sustentada para estrutura, baixa energia
para manutencao — maximizando output criativo sem burnout.

## Contexto

Creative Energy Management e a abordagem de Dan Koe para produtividade
sustentavel. O principio central: a mesma hora em pico de energia produz
10x mais que uma hora em baixa energia. Gerenciar energia e mais importante
que gerenciar tempo.

### Os 3 Blocos de Energia

| Bloco | Quando | Tipo de Trabalho | Regra de Ouro |
|-------|--------|-----------------|---------------|
| Peak | Primeiras 2-4h | Criacao profunda | NUNCA desperdicar com email/reunioes |
| Sustained | Meio do dia 2-3h | Trabalho estruturado | Bom para calls, edicao, planejamento |
| Low | Tarde/noite | Manutencao | Aceitar output menor, recuperar |

### Framework de Recuperacao
Recuperacao NAO e preguica — e o investimento que torna o deep work de amanha possivel.

## Steps

### Step 1 — Mapear Seu Ciclo de Energia (7min)

**Autodiagnostico de energia** (responda honestamente):

1. Em que horario voce sente MAIS energia criativa?
   > ____ ate ____

2. Em que horario sua energia cai notavelmente?
   > ____ ate ____

3. Em que horario voce se sente mais "robotico" (bom para tarefas mecanicas)?
   > ____ ate ____

4. Quanto tempo de deep work ininterrupto voce consegue ANTES de precisar pausar?
   > ____ minutos

5. O que acontece quando voce IGNORA a queda de energia e continua forçando?
   > ____

**Meu Mapa de Energia**:
```
HORA:    06  07  08  09  10  11  12  13  14  15  16  17  18  19  20
ENERGIA: [ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ][ ]
         Marque: P=Peak, S=Sustained, L=Low, R=Recovery
```

### Step 2 — Redesenhar a Rotina por Energia (8min)

Alinhe cada tipo de trabalho ao bloco de energia correto:

**Bloco PEAK** (____h ate ____h):
- Atividade principal: ____
- Atividade secundaria: ____
- O que NUNCA entra aqui: ____
- Ritual de entrada: ____
- Duracao maxima antes de pausa: ____ min

**Bloco SUSTAINED** (____h ate ____h):
- Atividades ideais: ____
- Calls/reunioes: [ ] Sim, aqui [ ] Nao, outro horario
- Edicao e revisao: [ ] Sim [ ] Nao
- Duracao: ____ horas

**Bloco LOW** (____h ate ____h):
- Atividades de manutencao: ____
- Janela de consumo: ____ ate ____
- Email e DMs: [ ] Sim, aqui [ ] Ja resolvi antes
- Preparacao para amanha: [ ] Sim [ ] Nao

### Step 3 — Protocolo de Recuperacao (5min)

**Micro Recovery (entre blocos)**:
- Frequencia: A cada ____ minutos de deep work
- Duracao: ____ minutos
- Atividade: ____
- Regra: NAO checar telefone durante micro recovery

**Recovery Diario**:
- Horario de encerrar trabalho: ____
- Ritual de desligamento: ____
- Atividade de recuperacao: ____
- Horario de dormir: ____

**Recovery Semanal**:
- Dia de desconexao total: ____
- O que faz nesse dia: ____
- Regra de telas: ____

### Step 4 — Protecoes e Contingencias (5min)

**Protecoes do Peak Block**:
- Telefone: [ ] Modo aviao [ ] Em outro comodo [ ] Desligado
- Notificacoes: [ ] Todas off [ ] So urgencias [ ] Tudo habilitado
- Porta: [ ] Fechada [ ] Sinal de "nao interromper"
- Ritual se alguem interromper: ____

**Contingencia para dias ruins** (energia baixa no peak):
- Plano B: Fazer ____ em vez de deep work forçado
- Regra: Nunca forçar mais de ____ min se o flow nao vem
- Recovery de emergencia: ____

**Indicadores de burnout** (quando parar ANTES):
1. ____
2. ____
3. ____

**Resultado esperado**:
> Mesmas horas, __x mais output criativo, menos fadiga, mais consistencia.

## Input Required

```yaml
input:
  energy_profile:
    peak_hours: ""
    sustained_hours: ""
    low_hours: ""
    max_deep_work_duration: 0  # minutes
  current_schedule:
    wake_time: ""
    work_start: ""
    work_end: ""
    sleep_time: ""
  constraints:
    fixed_obligations: []  # meetings, school, etc
    family_time: ""
    exercise_time: ""
```

## Output Template

```yaml
output:
  creative_energy_management:
    design_date: ""

    energy_map:
      peak_block:
        hours: ""
        activities: []
        protection: ""
        entry_ritual: ""
      sustained_block:
        hours: ""
        activities: []
      low_block:
        hours: ""
        activities: []

    recovery_protocol:
      micro:
        frequency: ""
        duration: ""
        activity: ""
      daily:
        shutdown_time: ""
        ritual: ""
        sleep_time: ""
      weekly:
        day: ""
        activity: ""

    protections:
      phone_policy: ""
      notification_policy: ""
      interruption_protocol: ""

    contingencies:
      bad_day_plan: ""
      burnout_signals: []

    expected_improvement:
      before_deep_work_hours: 0
      after_deep_work_hours: 0
      multiplier: ""
```

## Quality Gate

```yaml
quality_gate: KOE_MND_008_QG
checklist:
  - [ ] Mapa de energia baseado em auto-observacao real (nao ideal)
  - [ ] 3 blocos de energia definidos com horarios especificos
  - [ ] Peak block protegido com ritual de entrada e politica de interrupcao
  - [ ] Deep work NUNCA alocado em bloco Low
  - [ ] Protocolo de recuperacao inclui micro, diario e semanal
  - [ ] Contingencia para dias de baixa energia definida
  - [ ] Indicadores de burnout listados (minimo 3)
  - [ ] Resultado esperado e realista, nao fantasioso
```

## Handoff

```yaml
handoff:
  next_tasks:
    - KOE_MND_006  # Focus Funnel para refinar o que entra em cada bloco
    - KOE_MND_004  # Habit Loop Reengineering para instalar a nova rotina
    - KOE_MND_001  # Conscious Conditioning se houver resistencia a mudança
  artifacts:
    - creative_energy_management.yaml
  notes: "Rotina de energia desenhada. Implementar por 7 dias e ajustar. Nao tentar perfeicao no dia 1."
```
