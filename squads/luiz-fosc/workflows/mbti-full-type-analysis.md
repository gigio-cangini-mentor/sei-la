<!--
╔══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║   ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐    ┌──────┐                     ║
║   │ STEP │───>│ STEP │───>│ STEP │───>│ STEP │───>│ STEP │                     ║
║   │  01  │    │  02  │    │  03  │    │  04  │    │  05  │                     ║
║   └──┬───┘    └──┬───┘    └──┬───┘    └──┬───┘    └──┬───┘                     ║
║      │           │           │           │           │                          ║
║      v           v           v           v           v                          ║
║   Identify    Profile     Growth     Career     Summary                        ║
║    Type       Build       Plan       Guide       Card                          ║
║                                                                                ║
║   ███████╗██╗   ██╗██╗     ██╗                                                 ║
║   ██╔════╝██║   ██║██║     ██║                                                 ║
║   █████╗  ██║   ██║██║     ██║                                                 ║
║   ██╔══╝  ██║   ██║██║     ██║                                                 ║
║   ██║     ╚██████╔╝███████╗███████╗                                            ║
║   ╚═╝      ╚═════╝ ╚══════╝╚══════╝                                           ║
║                                                                                ║
║   ████████╗██╗   ██╗██████╗ ███████╗                                           ║
║   ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝                                          ║
║      ██║    ╚████╔╝ ██████╔╝█████╗                                             ║
║      ██║     ╚██╔╝  ██╔═══╝ ██╔══╝                                             ║
║      ██║      ██║   ██║     ███████╗                                           ║
║      ╚═╝      ╚═╝   ╚═╝     ╚══════╝                                          ║
║                                                                                ║
║    █████╗ ███╗   ██╗ █████╗ ██╗  ██╗   ██╗███████╗██╗███████╗                  ║
║   ██╔══██╗████╗  ██║██╔══██╗██║  ╚██╗ ██╔╝██╔════╝██║██╔════╝                 ║
║   ███████║██╔██╗ ██║███████║██║   ╚████╔╝ ███████╗██║███████╗                  ║
║   ██╔══██║██║╚██╗██║██╔══██║██║    ╚██╔╝  ╚════██║██║╚════██║                  ║
║   ██║  ██║██║ ╚████║██║  ██║███████╗██║   ███████║██║███████║                  ║
║   ╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝   ╚══════╝╚═╝╚══════╝             ║
║                                                                                ║
║        "From raw data to deep self-knowledge in five clear steps."             ║
║                                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════╝
-->

# Workflow: Full Type Analysis

Complete personality type analysis from identification to action plan.

---

## Workflow Metadata
- **workflow-id:** full-type-analysis
- **agent:** luiz-fosc
- **phases:** 5
- **flow:** unidirectional (no backtracking)
- **execution_type:** agent

## Veto Conditions (Global)
- ❌ **VETO** se tipo não foi identificado antes de prosseguir para Step 2+
- ❌ **VETO** se dados de referência não carregados antes de gerar qualquer output
- ❌ **VETO** se output de fase anterior não passou validação antes de avançar

---

## Steps

<!-- ┌─────────────────────────────────────────────────────────────────────┐
     │  STEP 1                                                            │
     │  ┌────────────┐                                                    │
     │  │  IDENTIFY   │ ──── "Who are you, really?"                       │
     │  │    TYPE     │                                                    │
     │  └─────┬──────┘                                                    │
     │        │                                                           │
     │        v                                                           │
     └─────────────────────────────────────────────────────────────────────┘ -->

### 1. Identify Type
**Task:** `identify-type`
**Output:** 4-letter type code + Identity variant

**Checkpoint 1→2:** Tipo identificado? Código válido dos 16 tipos? Usuário confirmou? → Se NÃO, repetir Step 1.

<!-- ┌─────────────────────────────────────────────────────────────────────┐
     │  STEP 2                                                            │
     │  ┌────────────┐                                                    │
     │  │   FULL     │ ──── "Paint the complete picture."                 │
     │  │  PROFILE   │                                                    │
     │  └─────┬──────┘                                                    │
     │        │                                                           │
     │        v                                                           │
     └─────────────────────────────────────────────────────────────────────┘ -->

### 2. Full Profile
**Task:** `type-profile --type {result}`
**Output:** Complete type profile

**Checkpoint 2→3:** Perfil completo gerado? Funções cognitivas incluídas? → Se NÃO, completar Step 2.

<!-- ┌─────────────────────────────────────────────────────────────────────┐
     │  STEP 3                                                            │
     │  ┌────────────┐                                                    │
     │  │  PERSONAL  │ ──── "Chart the path to growth."                   │
     │  │   GROWTH   │                                                    │
     │  └─────┬──────┘                                                    │
     │        │                                                           │
     │        v                                                           │
     └─────────────────────────────────────────────────────────────────────┘ -->

### 3. Personal Growth Plan
**Task:** `personal-growth --type {result}`
**Output:** 5-aspect development plan

**Checkpoint 3→4:** Plano de desenvolvimento com 5 aspectos? Exercícios concretos? → Se NÃO, completar Step 3.

<!-- ┌─────────────────────────────────────────────────────────────────────┐
     │  STEP 4                                                            │
     │  ┌────────────┐                                                    │
     │  │  CAREER    │ ──── "Find your professional calling."             │
     │  │  GUIDANCE  │                                                    │
     │  └─────┬──────┘                                                    │
     │        │                                                           │
     │        v                                                           │
     └─────────────────────────────────────────────────────────────────────┘ -->

### 4. Career Guidance
**Task:** `career-guidance --type {result}`
**Output:** Career recommendations and workplace tips

**Checkpoint 4→5:** Carreiras recomendadas com justificativa? Contexto brasileiro? → Se NÃO, completar Step 4.

<!-- ┌─────────────────────────────────────────────────────────────────────┐
     │  STEP 5                                                            │
     │  ┌────────────┐                                                    │
     │  │  SUMMARY   │ ──── "Distill it all into one card."              │
     │  │    CARD    │                                                    │
     │  └────────────┘                                                    │
     │                                                                    │
     │       *** PIPELINE COMPLETE ***                                    │
     └─────────────────────────────────────────────────────────────────────┘ -->

### 5. Summary Card
**Task:** `type-summary --type {result}`
**Output:** Quick reference card

---

## Acceptance Criteria
- [ ] Tipo identificado e confirmado pelo usuário
- [ ] Perfil completo com funções cognitivas
- [ ] Plano de desenvolvimento pessoal com exercícios
- [ ] Orientação profissional contextualizada
- [ ] Summary card consolidando tudo
- [ ] Todos os checkpoints passaram

---

<!-- ═══════════════════════════════════════════════════════════════════════
       TIMING
       ──────
       Assessment .... 5-10 min
       Analysis ...... 2-3  min
       Total ......... ~15  min
     ═══════════════════════════════════════════════════════════════════════ -->

## Estimated Duration
- Interactive assessment: 5-10 minutes
- Full analysis generation: 2-3 minutes
- Total: ~15 minutes
