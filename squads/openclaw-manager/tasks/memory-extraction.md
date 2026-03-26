# memory-extraction

> **Phase 0.5: Memory Extraction** | O usuario extrai seu proprio perfil via ChatGPT/Gemini/Claude

## Purpose

Usar a memoria que ChatGPT, Gemini ou Claude ja tem do usuario para gerar automaticamente 80% do perfil necessario pro setup. Elimina 15 minutos de perguntas manuais e gera dados com qualidade superior — porque a IA que convive com o usuario SABE coisas que ele mesmo esqueceria de mencionar.

## Agent

`@claw-provisioner`

## Trigger

- Automatico dentro de `*provision {name}` (entre Phase 0/Intake e Phase 1.5/Credentials)
- Manual: `*extract-profile {claw-name}`

## Contexto

O usuario provavelmente tem centenas de conversas no ChatGPT, Gemini ou Claude. Essas IAs acumularam:
- Estilo de comunicacao
- Rotina e horarios
- Projetos e objetivos
- Personalidade e valores
- Preferencias e frustrações

**Em vez de perguntar tudo de novo, a gente pede pra IA que ja sabe RESPONDER POR ELE.**

## Execution

### Step 1: Apresentar o conceito

```
🧠 **Fase 0.5 — Extracao de Memoria**

Voce usa ChatGPT, Gemini ou Claude no dia-a-dia? Se sim, essas IAs ja sabem
MUITO sobre voce. Vamos usar isso a nosso favor.

Vou te dar um prompt. Voce copia, cola na IA que mais usa, e traz a resposta.
Isso vai preencher automaticamente 80% do perfil do seu agente — com qualidade
muito melhor do que se eu te fizesse 22 perguntas agora.

**Leva 2 minutos. Economiza 15.**
```

### Step 2: Perguntar qual IA usa

```yaml
question: "Qual IA voce mais usa e que provavelmente mais sabe sobre voce?"
options:
  - ChatGPT
  - Gemini
  - Claude
  - Outra (qual?)
  - Nenhuma (pular e responder manualmente)
```

**Se "Nenhuma"** → Pular para Phase 1 Discovery (fluxo classico de 22 perguntas).

### Step 3: Entregar o prompt

Carregar `templates/memory-extraction-prompt.md` e apresentar:

- **Se escolheu ChatGPT/Gemini/Claude** → Entregar o prompt completo
- **Se escolheu "Outra"** → Entregar o prompt versao curta (mais generico)

```
📋 **Copie o prompt abaixo e cole no {AI_ESCOLHIDA}:**

[PROMPT COMPLETO AQUI]

Quando tiver a resposta, cole aqui que eu processo automaticamente.
```

### Step 4: Receber e Parsear a resposta

Quando o usuario colar a resposta:

1. **Detectar formato** — YAML? Texto livre? Markdown?
2. **Se YAML valido** → Parsear diretamente
3. **Se texto livre** → Extrair campos manualmente e mapear pro schema
4. **Se incompleto** → Identificar gaps

```yaml
parsing_rules:
  - "Campos com [NAO_SEI] → marcar como GAP"
  - "Campos vazios → marcar como GAP"
  - "Campos preenchidos → validar (formato, plausibilidade)"
  - "Campos extras (nao esperados) → preservar como EXTRA_CONTEXT"
```

### Step 5: Gap-Fill (Perguntar so o que falta)

```yaml
gap_fill:
  strategy: "Perguntar APENAS campos marcados como GAP"
  prioritize:
    critical:
      - identidade.nome_completo
      - comunicacao.idioma_principal
      - tom_do_agente.nome_desejado_pro_agente
      - tom_do_agente.personalidade_desejada
    important:
      - rotina.timezone
      - rotina.nao_perturbe
      - personalidade.principio_guia
    nice_to_have:
      - rotina.agenda_semanal
      - trabalho.colaboradores_frequentes

  max_questions: 10  # No maximo 10 perguntas manuais (dos GAPs)
  skip_nice_to_have: true  # Se >10 gaps, pular nice_to_have
```

Apresentar ao usuario:

```
✅ Recebi a resposta do {AI}! Vamos ver o que foi preenchido:

Preenchido automaticamente: {X} de {TOTAL} campos ✅
Preciso perguntar: {Y} campos

Deixa eu te perguntar so o que falta:
```

### Step 6: Consolidar em user-profile.yaml

Unificar dados extraidos + gap-fill em `user-profile.yaml`:

```yaml
output:
  file: "outputs/user-profile.yaml"
  source_breakdown:
    from_memory_extraction: "{X} campos (XX%)"
    from_gap_fill: "{Y} campos (YY%)"
    unknown: "{Z} campos (ZZ%)"
  quality_score: "0.0-1.0 baseado em completude"
```

### Step 7: Gerar Preview

Antes de prosseguir, mostrar ao usuario um resumo:

```
📊 **Preview do Perfil Extraido:**

👤 Nome: {nome}
💼 Negocio: {empresa} — {descricao}
🕐 Rotina: {horario_trabalho}, foco {blocos_foco}
💬 Comunicacao: {estilo}, {idioma}
🤖 Agente: {nome_agente} {emoji} — {personalidade}

{X} campos preenchidos | {Y} gaps | Qualidade: {score}

Ta correto? Quer ajustar algo antes de prosseguir?
```

**Se OK** → Prosseguir para Phase 1.5 Credentials
**Se ajustes** → Corrigir campos indicados, re-gerar preview

## Output

```yaml
output:
  file: "outputs/user-profile.yaml"
  quality_score: "float 0-1"
  extraction_source: "chatgpt | gemini | claude | manual"
  handoff_to: "Phase 1.5 Credentials (ou Phase 1 Discovery se pular)"
```

## Checkpoint

```yaml
checkpoint:
  gate: "CP-PROFILE"
  criteria:
    - "5 campos criticos preenchidos (nome, idioma, nome_agente, papel, perfil_tipo)"
    - "Quality score >= 0.7 (PASS) ou >= 0.6 (PASS COM WARNING)"
    - "Usuario aprovou preview"
  thresholds:
    green: ">= 0.7 — Prosseguir direto. Setup pula Discovery."
    yellow: ">= 0.6 e < 0.7 — WARNING: Setup roda Discovery como gap-fill (so campos faltantes)"
    red: "< 0.6 — FAIL: Muitos gaps. Complementar com perguntas manuais ou refazer extração"
  on_pass: "auto-proceed to Phase 1.5 Credentials"
  on_yellow: "auto-proceed mas sinalizar setup pra rodar gap-fill Discovery"
  on_fail: "Complementar com perguntas manuais ate atingir >= 0.7"
```

## Veto Conditions

| ID | Trigger | Action |
|---|---|---|
| VT-MEM-001 | Resposta colada e claramente inventada (sem relacao com usuario real) | REJECT — pedir pra refazer |
| VT-MEM-002 | Todos os campos [NAO_SEI] | SKIP — ir pra Discovery classico |
| VT-MEM-003 | Nome do agente nao definido | BLOCK — campo critico |

## Comparacao: Fluxo Antigo vs Novo

| Aspecto | Antigo (22 perguntas) | Novo (Memory Extraction) |
|---------|----------------------|--------------------------|
| Tempo do usuario | 15-20 min | 2-5 min |
| Qualidade dos dados | Media (respostas rapidas, genericas) | Alta (IA conhece contexto profundo) |
| Cobertura | 22 campos | 50+ campos |
| Experiencia | Cansativa (questionario) | Surpreendente ("uau, a IA sabe tudo isso?") |
| Gap-fill | N/A | Maximo 10 perguntas pontuais |
