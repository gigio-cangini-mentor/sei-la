# Tathi Deandhela Squad - Creation Strategy

## Objective
Create a new, non-generic `public_speaking` squad centered on Tathi Deandhela's method, using the existing course corpus as primary source, while avoiding overlap with `renner-silva`.

## Recommended Mode
`quality` mode (not yolo), because you already have full proprietary material.

## Positioning Decision
- Squad type: `create_new` (not extend).
- Distinct value: Tathi-specific method and language, grounded in 79 lessons and curated artifacts.
- Anti-overlap rule: no generic "public speaking mentor bot"; all outputs must reference Tathi corpus.

## Execution Plan
### Phase 0 - Discovery and Scope Lock
- Owner: `squad-chief`
- Define `pack_name`, slash prefix, core use cases, and non-negotiable scope.
- Draft decision memo vs existing `renner-silva` squad.

### Phase 1 - Source Curation (already started)
- Owner: `@oalanicolas`
- Input: [`01-source-inventory.yaml`](<PROJECT_ROOT>/squads/squad-creator/docs/tathi-deandhela/01-source-inventory.yaml)
- Enforce source tiering and reject noisy KB as primary source.

### Phase 2 - DNA Extraction
- Owner: `@oalanicolas`
- Extract:
  - Voice DNA
  - Thinking DNA
  - Playbook + Framework + Swipe file
- Hard gate:
  - 15+ citations with `[SOURCE:]`
  - 5+ signature phrases
  - 0 unvalidated inference

### Phase 3 - Squad Architecture
- Owner: `squad-chief`
- Design:
  - Orchestrator agent
  - 3-5 specialist agents
  - Task graph and workflow handoffs
- Initial use cases:
  - Diagnostic of current talk
  - Keynote structure design
  - Stage narrative and persuasion optimization
  - Authority/content plan for speakers

### Phase 4 - Workflow and Veto Design
- Owner: `@pedro-valerio`
- Create workflows with:
  - blocking checkpoints
  - veto conditions
  - no backwards movement
  - automation guardrails (idempotency/log/manual escape)

### Phase 5 - Validation and Pilot
- Owners: `squad-chief`, `@oalanicolas`, `@pedro-valerio`
- Run 3 pilot scenarios and score against quality gates.
- Only after pass: prepare manifest and optional registry update.

## Output Artifacts for This Mission
- Source inventory: [`01-source-inventory.yaml`](<PROJECT_ROOT>/squads/squad-creator/docs/tathi-deandhela/01-source-inventory.yaml)
- Blueprint draft: [`03-squad-blueprint.yaml`](<PROJECT_ROOT>/squads/squad-creator/docs/tathi-deandhela/03-squad-blueprint.yaml)
- This strategy: [`02-squad-creation-strategy.md`](<PROJECT_ROOT>/squads/squad-creator/docs/tathi-deandhela/02-squad-creation-strategy.md)

## Timeline (Starting February 25, 2026)
- Day 1: source lock + scope lock
- Day 2: DNA extraction and review
- Day 3: squad build + workflow gates
- Day 4: pilot and refinements

## Risks and Mitigations
- Risk: semantic noise from KB concepts.
  - Mitigation: keep KB as Tier 3 only.
- Risk: overlap with existing speaking squad.
  - Mitigation: explicit positioning and task boundaries.
- Risk: medium fidelity from fallback-generated distill.
  - Mitigation: anchor all core decisions on Tier 0/1 sources.
