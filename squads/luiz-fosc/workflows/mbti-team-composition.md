<!--
╔══════════════════════════════════════════════════════════════════════════════════╗
║                                                                                ║
║       ██████████████████████████████████████████████████████████████            ║
║       ██                                                        ██            ║
║       ██   o  o  o       ASSEMBLY LINE        o  o  o           ██            ║
║       ██   │  │  │    ═══════════════════     │  │  │           ██            ║
║       ██   ▼  ▼  ▼                            ▼  ▼  ▼           ██            ║
║       ██  ┌──┬──┬──┐   ┌──────────────┐   ┌──┬──┬──┐          ██            ║
║       ██  │IN│IN│IN│──>│  TEAM FORGE  │──>│OK│OK│OK│          ██            ║
║       ██  └──┴──┴──┘   └──────┬───────┘   └──┴──┴──┘          ██            ║
║       ██                      │                                 ██            ║
║       ██              ┌───────┴───────┐                         ██            ║
║       ██              │   ANALYSIS    │                         ██            ║
║       ██              │   ENGINE      │                         ██            ║
║       ██              └───────┬───────┘                         ██            ║
║       ██                      │                                 ██            ║
║       ██                      ▼                                 ██            ║
║       ██              ┌───────────────┐                         ██            ║
║       ██              │  REPORT OUT   │                         ██            ║
║       ██              └───────────────┘                         ██            ║
║       ██                                                        ██            ║
║       ██████████████████████████████████████████████████████████████            ║
║                                                                                ║
║   ████████╗███████╗ █████╗ ███╗   ███╗                                         ║
║   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║                                        ║
║      ██║   █████╗  ███████║██╔████╔██║                                        ║
║      ██║   ██╔══╝  ██╔══██║██║╚██╔╝██║                                        ║
║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║                                        ║
║      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝                                      ║
║                                                                                ║
║    ██████╗ ██████╗ ███╗   ███╗██████╗  ██████╗ ███████╗██╗████████╗██╗ ██████╗ ███╗   ██╗║
║   ██╔════╝██╔═══██╗████╗ ████║██╔══██╗██╔═══██╗██╔════╝██║╚══██╔══╝██║██╔═══██╗████╗  ██║║
║   ██║     ██║   ██║██╔████╔██║██████╔╝██║   ██║███████╗██║   ██║   ██║██║   ██║██╔██╗ ██║║
║   ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║██║   ██║   ██║██║   ██║██║╚██╗██║║
║   ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║     ╚██████╔╝███████║██║   ██║   ██║╚██████╔╝██║ ╚████║║
║    ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝║
║                                                                                ║
║     "Great teams aren't assembled by chance -- they're engineered."            ║
║                                                                                ║
╚══════════════════════════════════════════════════════════════════════════════════╝
-->

# Workflow: Team Composition Analysis

Analyze a team and provide actionable recommendations.

---

## Workflow Metadata
- **workflow-id:** team-composition
- **agent:** luiz-fosc
- **phases:** 5
- **flow:** unidirectional (no backtracking)
- **execution_type:** agent

## Veto Conditions (Global)
- ❌ **VETO** se menos de 2 membros do time foram informados
- ❌ **VETO** se algum tipo informado não é código MBTI válido
- ❌ **VETO** se output de fase anterior não validado antes de avançar

---

## Steps

<!-- ╔═══════════════════════════════════════════════════════════════╗
     ║  STATION 1 : INTAKE                                         ║
     ║  ───────────────────                                        ║
     ║    o  o  o  o  o   <<< team members enter the line          ║
     ║    │  │  │  │  │                                            ║
     ║    ▼  ▼  ▼  ▼  ▼                                            ║
     ║   [collect type codes from each member]                     ║
     ╚═══════════════════════════════════════════════════════════════╝ -->

### 1. Collect Team Types
**Task:** Manually collect type codes from all team members

**Checkpoint 1→2:** Todos os tipos coletados? Mínimo 2 membros? Todos são códigos válidos? → Se NÃO, completar Step 1.

<!-- ╔═══════════════════════════════════════════════════════════════╗
     ║  STATION 2 : ANALYSIS ENGINE                                ║
     ║  ───────────────────────────                                ║
     ║    ┌─────┐  ┌─────┐  ┌─────┐                               ║
     ║    │COMP.│  │GAPS │  │SYNC │   <<< multi-pass analysis     ║
     ║    └──┬──┘  └──┬──┘  └──┬──┘                               ║
     ║       └────────┼────────┘                                   ║
     ║                ▼                                            ║
     ║         [dynamics report]                                   ║
     ╚═══════════════════════════════════════════════════════════════╝ -->

### 2. Team Dynamics Analysis
**Task:** `team-dynamics --types {comma-separated-types}`
**Output:** Composition, strengths, gaps, conflicts, recommendations

**Checkpoint 2→3:** Análise de composição, forças e gaps gerada? → Se NÃO, completar Step 2.

<!-- ╔═══════════════════════════════════════════════════════════════╗
     ║  STATION 3 : INDIVIDUAL PROFILING  (optional)               ║
     ║  ────────────────────────────────                           ║
     ║    ┌───┐ ┌───┐ ┌───┐ ┌───┐                                ║
     ║    │ A │ │ B │ │ C │ │...│  <<< one card per member        ║
     ║    └───┘ └───┘ └───┘ └───┘                                 ║
     ╚═══════════════════════════════════════════════════════════════╝ -->

### 3. Individual Profiles (Optional)
**Task:** `type-summary --type {each-type}`
**Output:** Quick card for each member

**Checkpoint 3→4:** Perfis individuais gerados (se solicitado)? → Se NÃO, completar Step 3.

<!-- ╔═══════════════════════════════════════════════════════════════╗
     ║  STATION 4 : PAIRING ANALYSIS                               ║
     ║  ────────────────────────────                               ║
     ║    A <──> B    leader-team fit?                             ║
     ║    C <──> D    conflict risk?                               ║
     ║    E <──> F    synergy potential?                           ║
     ╚═══════════════════════════════════════════════════════════════╝ -->

### 4. Key Pairings Analysis
**Task:** `compatibility-analysis --type1 {x} --type2 {y} --context workplace`
**Output:** Compatibility for the most critical pairings (leader-team, conflict-prone)

**Checkpoint 4→5:** Pairings críticos analisados? Riscos identificados? → Se NÃO, completar Step 4.

<!-- ╔═══════════════════════════════════════════════════════════════╗
     ║  STATION 5 : FINAL ASSEMBLY                                 ║
     ║  ──────────────────────────                                 ║
     ║    ┌──────────────────────────────────┐                     ║
     ║    │     TEAM IMPROVEMENT PLAN        │                     ║
     ║    │     ========================     │                     ║
     ║    │  >> Consolidated findings         │                     ║
     ║    │  >> Actionable recommendations    │                     ║
     ║    │  >> Next steps                    │                     ║
     ║    └──────────────────────────────────┘                     ║
     ║                                                             ║
     ║              *** LINE COMPLETE ***                          ║
     ╚═══════════════════════════════════════════════════════════════╝ -->

### 5. Recommendations Report
Consolidate findings into actionable team improvement plan.

---

## Acceptance Criteria
- [ ] Tipos de todos os membros coletados e validados
- [ ] Análise de composição por Role group
- [ ] Gaps e forças coletivas identificados
- [ ] Pairings críticos analisados
- [ ] Plano de melhoria consolidado
- [ ] Todos os checkpoints passaram

---

<!-- ═══════════════════════════════════════════════════════════════════════
       TIMING
       ──────
       Collection ... varies
       Analysis ..... 5-10  min
       Total ........ ~20-30 min
     ═══════════════════════════════════════════════════════════════════════ -->

## Estimated Duration
- Type collection: varies
- Analysis generation: 5-10 minutes
- Total: ~20-30 minutes depending on team size
