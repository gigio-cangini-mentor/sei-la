# Phase 0: Discovery

> Socratic Gate + Ecosystem Scan + Onboarding

---

## Purpose

Entender O QUE o usuário quer antes de qualquer linha de código. Pense nessa fase como a consulta com o médico antes da cirurgia — ele não opera sem saber o que dói.

---

## Execution Steps

### Step 1: Show Banner

Display the Forge banner from `{FORGE_HOME}/personality.md`.

### Step 2: Project Awareness (AUTOMATIC — all modes)

Detect if running inside an existing project. Check for: `package.json`, `.git/`, `tsconfig.json`, `Cargo.toml`, `requirements.txt`, `go.mod`.

**If existing project detected:**

Run a quick scan (~10 seconds):

1. **Read `package.json`** (or equivalent) → stack, dependencies, scripts
2. **Run `ls` top-level** → folder structure
3. **Read `README.md`** or `.aios/INDEX.md` (first 50 lines) → project context
4. **Run `git log -5 --oneline`** → recent activity

Save results to working memory. This context will be:
- Injected into ALL agent dispatches (so @dev knows the stack, patterns, conventions)
- Used to skip redundant questions (if we know the stack, dont ask "stack preferida?")
- Used to detect brownfield mode (if project has substantial code, suggest `/forge scan`)

**If NO existing project detected:**
- Skip this step (greenfield mode)
- Proceed normally

**If existing project but user ran `/forge` (full app) instead of `/forge feature`:**
- Warn: "Detectei que esse projeto já tem código. Você quer adicionar algo novo ou começar do zero?"
- If "adicionar": reclassify as SINGLE_FEATURE
- If "do zero": proceed as FULL_APP (user knows what they're doing)

### Step 3: Check Interrupted Runs

Glob `.aios/forge-runs/*/state.json`. For each file:
- Read and check `status` field
- If any has `status != "completed"`:
  - Show: "Encontrei um run interrompido: `{run_id}` (Phase {N}). Continuar ou começar novo?"
  - If resume: load state and jump to last phase
  - If new: proceed with Step 3

### Step 4: Onboarding + Socratic Gate (FUNDIDOS — uma única interação)

**Princípio:** Mínimo de perguntas, máximo de contexto. O usuário quer ver as coisas acontecendo, não responder questionário.

**Check project memory:**
- HYBRID: `{cwd}/.aios/memory/project-context.md`
- CENTRALIZED: `docs/projects/{name}/memory/project-context.md`

**Se project memory EXISTS:**
- Greet: "Fala, {name}! Bora continuar o {project}?"
- Pular direto para as perguntas de contextualização (só 2, sem onboarding)

**Se primeiro run (sem memory):**
- Adicionar UMA pergunta extra no início: "Como posso te chamar?"

#### Formato de apresentação (OBRIGATÓRIO)

**TODAS as perguntas DEVEM ser apresentadas como opções numeradas com título bold + descrição.**
Nunca use perguntas abertas soltas. Sempre ofereça opções pré-definidas + uma opção livre no final.

Formato padrão:

```
{Pergunta contextualizada}

> 1. **{Opção A}**
>    {Descrição curta de 1 linha explicando o que isso significa}
> 2. **{Opção B}**
>    {Descrição curta}
> 3. **{Opção C}**
>    {Descrição curta}
> 4. Digitar outra coisa.
```

Regras do formato:
- Título da opção em **bold**
- Descrição embaixo, indentada, em tom informal
- Última opção SEMPRE é "Digitar outra coisa." (escape valve)
- Máximo 5 opções por pergunta (incluindo a livre)
- Use `AskUserQuestion` para apresentar

#### Perguntas — UMA POR VEZ, formato de opções

Analise primeiro o que o usuário JÁ disse no comando. Se ele escreveu "/forge app de gestão de clínicas com agendamento e prontuários", você JÁ SABE o que o app faz. NÃO pergunte de novo.

Pule perguntas que já foram respondidas no comando. Faça as restantes UMA POR VEZ no formato acima.

**FULL_APP mode — Pergunta 1 (pesquisa de mercado — SEMPRE PRIMEIRA):**

Essa pergunta vem ANTES de qualquer outra. Pesquisar o que já existe no mercado simplifica todas as decisões seguintes (stack, arquitetura, features, diferencial).

```
Antes de montar o plano, quer que eu pesquise o que já existe no mercado?

> 1. **Pesquisar soluções parecidas**
>    Investigo os principais apps/tools do mercado que resolvem problema similar e trago um resumo
> 2. **Já conheço o mercado**
>    Já sei o que existe, me diz as referências e eu sigo
> 3. **Pular, vai direto**
>    Não precisa pesquisar, já tenho clareza do que quero
> 4. Digitar outra coisa.
```

**Se opção 1 escolhida:** Executar `/tech-search` (skill de deep research) com foco em:
- Top 5-10 soluções open-source e comerciais para o problema descrito
- Features comuns entre elas (table stakes)
- Gaps/oportunidades (o que nenhuma faz bem)
- Modelos de negócio (free, freemium, paid, open-source)
- Stack/tech choices (repos GitHub, stars, última atividade)

O output do `/tech-search` é salvo em `docs/research/` e serve como base para o PRD.
Apresentar resumo ao usuário e DEPOIS prosseguir para Pergunta 2.

**Se opção 2 escolhida:** Perguntar quais referências o usuário já conhece, anotar, e prosseguir.

**Se opção 3 escolhida:** Pular direto para Pergunta 2.

---

**FULL_APP mode — Pergunta 2 (público/problema):**

```
Quem vai usar esse app e qual o principal problema que resolve?

> 1. **Eu mesmo**
>    Ferramenta pessoal pra resolver um problema meu do dia-a-dia
> 2. **Qualquer pessoa/empresa**
>    Produto aberto, qualquer um pode usar (SaaS, marketplace, etc.)
> 3. **Público específico/nicho**
>    Tipo: agências, clínicas, restaurantes, freelancers...
> 4. Digitar outra coisa.
```

**FULL_APP mode — Pergunta 3 (stack):**

```
Stack preferida?

> 1. **Next.js + React**
>    Full-stack moderno, SSR, API routes, deploy fácil
> 2. **Angular**
>    Enterprise, tipagem forte, RxJS
> 3. **Deixa comigo**
>    Eu escolho a melhor stack pro que você descreveu
> 4. Digitar outra coisa.
```

Se primeiro run, adicione antes de tudo: "Ah, e como posso te chamar?"

**SINGLE_FEATURE mode — Pergunta 1:**

```
Me dá um exemplo de uso real dessa feature:

> 1. **Usuário faz X e acontece Y**
>    Me descreve o fluxo principal (ex: "clica em exportar e baixa PDF")
> 2. **Melhoria no que já existe**
>    Algo que já funciona mas precisa mudar/melhorar
> 3. **Algo 100% novo**
>    Feature que não existe ainda no projeto
> 4. Digitar outra coisa.
```

**BUG_FIX mode — Pergunta 1:**

```
Me conta do bug:

> 1. **Tem mensagem de erro**
>    Cola a mensagem aqui que eu investigo
> 2. **Comportamento errado**
>    Deveria fazer X mas faz Y (sem erro visível)
> 3. **Quebrou do nada**
>    Tava funcionando e parou, não sei o que mudou
> 4. Digitar outra coisa.
```

#### Follow-up inteligente

Se alguma resposta for vaga, faça UMA follow-up específica — também no formato de opções numeradas.

Máximo 1 follow-up. Depois, prossiga com o melhor entendimento.

#### Se o usuário disser "só faz" ou "vai direto"

Respeite. Pule perguntas, use o que tem, e prossiga.
Registre no state.json: `discovery_mode: "minimal"`

### Step 5: Ecosystem Scan (MANDATORY)

Read `{FORGE_HOME}/ecosystem-scanner.md` and execute the full scan protocol:

1. Read minds INDEX, skills frontmatters, squads READMEs
2. Match against project description + tech stack
3. Build context-pack.json
4. Show scan results to user

### Step 6: Project Detection (FULL_APP only) (FULL_APP only)

For full app mode, also run project detection:
1. Read `skills/app-builder/project-detection.md`
2. Determine project type (SaaS, API, Mobile, etc.)
3. Read `skills/app-builder/tech-stack.md`
4. Suggest stack + template

### Step 7: Scope Summary + CHECKPOINT

Show a summary of everything understood:

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  🔴 CHECKPOINT — Discovery Complete
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📋 Projeto: {name}
  🎯 O que faz: {description}
  👥 Público: {audience}
  🔧 Stack sugerida: {stack} (template: {template})
  🧠 Consultores: {minds list}
  ⚡ Skills: {skills list}

  1. Aprovar e continuar
  2. Ajustar algo
  3. Parar aqui
```

Wait for user response before proceeding.

### Step 8: Initialize Run

1. **Check for concurrent runs (LOCK):**
   - Check if `.aios/forge-runs/.lock` exists
   - If exists: read lock file to get active run_id
     - Check if that run's state.json has `status != "completed"`
     - If active: "Já existe um run em andamento (`{run_id}`). Quer esperar, cancelar o outro, ou forçar um novo?"
     - If completed/corrupted: remove stale lock and proceed
   - If not exists: proceed
2. Generate run_id: `forge-{slug}-{YYYYMMDD-HHmm}`
3. **Create lock file:** Write run_id to `.aios/forge-runs/.lock`
4. Create run folder: `.aios/forge-runs/{run_id}/`
5. Save state.json with initial state (using atomic write: .tmp → rename)
6. Save context-pack.json from ecosystem scan

**Lock cleanup:** The lock file is removed in runner.md Completion Protocol (Step 7).

---

## Outputs

- `state.json` — initialized with Phase 0 complete
- `context-pack.json` — ecosystem scan results
- User approval to proceed
- Project memory updated (if first run)

---

## Veto Conditions

Phase 0 does NOT have veto conditions. If the user says "go", we go.
But if answers are too vague: ask ONE follow-up, then proceed with best guess.
