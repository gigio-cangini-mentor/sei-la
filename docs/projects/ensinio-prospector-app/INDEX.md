# Ensinio Prospector App — Project Index

## Estado Atual
- **Squad base:** `ensinio-whatsapp-prospector` v3.0.0 (pipeline CLI completo)
- **Project Path:** `~/CODE/Projects/ensinio-prospector-app/`
- **Status:** PRD v0.2 completo — todas as decisões tomadas, pronto para M1
- **Bloqueadores:** Nenhum

## Visão do Produto
App de prospecção via WhatsApp Web com outreach integrado e tracking de envios.

**Diferenciais vs squad atual (CLI + Google Sheets):**
- Login via WhatsApp Web embutido no app (sem export manual de chat)
- Interface própria para visualizar/gerenciar mensagens de outreach
- Tracking de envio (enviada / não enviada / respondida)
- Substitui Google Sheets como destino final

**Stack definida:**
- **Frontend:** Next.js 15 + Tailwind + shadcn/ui
- **Backend:** Next.js API Routes + Supabase (PostgreSQL)
- **WhatsApp:** Evolution API (self-hosted, Docker)

## Última Sessão
- **Data:** 2026-03-11
- **Agente/Squad:** Nenhum (setup + PRD)
- **O que foi feito:**
  1. Projeto criado com /new-project
  2. Deep research: integração WhatsApp Web (5 alternativas)
  3. Mapeamento completo do squad (4 agentes, 9 fases, 411 linhas)
  4. PRD v0.2 completo — fluxo App→WhatsApp→GHL definido
  5. 7 decisões tomadas, 0 em aberto

## Próximo Passo
- Criar story para M1 (Story-Driven Development)
- Setup Next.js + Tailwind + shadcn/ui em ~/CODE/Projects/ensinio-prospector-app/
- Setup Supabase (schema)
- Deploy Evolution API local (Docker)
- QR code login funcional + listagem de grupos

## Squads Relacionados
- `ensinio-whatsapp-prospector` — Pipeline CLI de prospecção via WhatsApp (v3.0.0, 77 prospects processados)
- `ensinio-mind` — Source of truth do conhecimento Ensinio (5 pilares, 67 soluções)
- `ensinio-prospector` — Prospecção geral (consome ensinio-mind)

## Arquivos Chave
| Arquivo | Conteúdo |
|---------|---------|
| INDEX.md | Este arquivo |
| PRD.md | Product Requirements Document v0.1 |
| research/whatsapp-web-integration.md | Research sobre integração WhatsApp Web |
| `squads/ensinio-whatsapp-prospector/` | Squad base com pipeline CLI |
| `squads/ensinio-whatsapp-prospector/data/outputs/mentoria-50k/` | Dados do primeiro batch (77 prospects) |

## Histórico
| Data | Ação |
|------|------|
| 2026-03-11 | PRD v0.1 criado — stack, features, arquitetura, milestones |
| 2026-03-11 | Projeto criado — evolução de squad para app completo |
