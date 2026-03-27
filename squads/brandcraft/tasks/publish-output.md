---
task-id: publish-output
name: Publish Output
agent: brandcraft-chief
version: 1.0.0
purpose: Publish last generated output to a social media platform

inputs:
  - name: platform
    type: string
    description: "Target platform: instagram | multi-channel | export"
    required: true
  - name: output_path
    type: path
    description: Path to the output file to publish (defaults to last generated output)
    required: false

outputs:
  - path: "(external — published to platform)"
    format: platform-post
    description: Published content on the target platform

acceptance_criteria:
  - "Output file exists and is valid"
  - "Quality score is PASS before publishing"
  - "User confirmation obtained before publish action"
  - "Publication confirmed or error reported"
---

# publish-output

## Overview

Takes the last generated BrandCraft output (image, PDF, video) and publishes it to the specified platform. Acts as the final mile — from local file to live post.

Safety-first: nothing goes out without a quality PASS and user confirmation.

## Steps

1. **Resolve output** — Use provided `output_path` or find the most recent file in `output/`
2. **Validate output exists** — Confirm file is present and readable
3. **Check quality score** — Verify the output has a PASS from quality-validator
4. **Route to platform skill** — Map platform to skill:
   - `instagram` → `instagram-publisher` skill
   - `multi-channel` → `blotato` skill
   - `export` → copy to user-specified path
5. **Confirm with user** — Show preview summary and ask for explicit go-ahead
6. **Publish** — Execute the skill and report result

## Veto Conditions

- **BLOCKER:** Arquivo de output não encontrado — pedir ao usuário que gere o conteúdo primeiro
- **BLOCKER:** Quality score é FAIL ou inexistente — rodar quality-validator antes de publicar
- **BLOCKER:** Credenciais da plataforma ausentes ou expiradas — guiar usuário para configurar
- **BLOCKER:** Usuário recusou confirmação — parar graciosamente, nunca publicar sem aprovação explícita
- **WARNING:** Output não passou por validação de dimensões para a plataforma alvo — verificar compatibilidade

## Handoff

on_complete: report publication URL/status to user
on_fail: escalate to user with error details and retry options
