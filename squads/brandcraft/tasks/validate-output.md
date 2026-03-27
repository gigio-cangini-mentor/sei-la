---
task-id: validate-output
name: Validate Single Output
agent: gauge
version: 1.0.0
purpose: Score a single output against the brand template with objective metrics

inputs:
  - name: output_path
    type: path
    description: Path to the output file to validate
    required: true
  - name: brand_name
    type: string
    description: Brand slug matching a profile in data/brands/
    required: true
  - name: type
    type: string
    description: "Output type: doc or video"
    required: true

outputs:
  - path: "stdout"
    format: text
    description: Quality score report with verdict (PASS/FAIL)

acceptance_criteria:
  - "Brand template loaded from Vault"
  - "Correct scoring matrix applied (doc or video)"
  - "All 5 dimensions scored individually"
  - "Total score calculated with clear verdict"
  - "Auto-corrections generated for scores 50-69"
  - "Re-execution flagged for scores below 50"
---

# validate-output

## Overview

Scores a single output against the brand template using an objective 100-point scale across 5 dimensions. Like a quality inspector with a checklist — no subjective opinions, just measurable criteria. The verdict is binary: PASS (>=70) or FAIL (<70), with auto-correction suggestions for borderline cases.

**Document scoring:** Colors (20), Typography (20), Spacing (15), Layout (30), Consistency (15)
**Video scoring:** Colors (25), Typography (20), Animations (20), Layout+SafeZones (20), Logo+Identity (15)

## Steps

1. **Load brand template** — Read brand profile from Vault for comparison baseline
2. **Select scoring matrix** — Choose doc or video matrix based on `type` input
3. **Score 5 dimensions** — Evaluate each dimension against brand tokens with specific point allocation
4. **Calculate total** — Sum dimension scores for final score out of 100
5. **Determine verdict** — PASS (>=70), FAIL with auto-corrections (50-69), FAIL with re-execution flag (<50)
6. **Report** — Present dimension scores, total, verdict, and any corrections needed

## Veto Conditions

- **BLOCKER:** Brand profile não encontrado — validação impossível sem baseline de comparação
- **BLOCKER:** Arquivo de output não encontrado ou corrompido — nada para validar
- **BLOCKER:** Tipo não é "doc" nem "video" — matriz de scoring não aplicável
- **WARNING:** Score entre 50-69 sem auto-correções geradas — corrigir antes de escalar
- **WARNING:** Dimensão de scoring omitida do relatório — todas as 5 devem ser avaliadas

## Handoff

on_complete: PASS → pass to brandcraft-chief | FAIL → return to producing agent with corrections
on_fail: escalate to brandcraft-chief
