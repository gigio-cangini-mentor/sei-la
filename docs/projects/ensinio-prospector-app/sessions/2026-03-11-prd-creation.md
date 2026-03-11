# Session: PRD Creation — 2026-03-11

## O que foi feito
1. Projeto criado com `/new-project` (#10 no ACTIVE.md, B5 promovido)
2. Deep research: integração WhatsApp Web (5 alternativas avaliadas)
3. Mapeamento completo do squad existente (4 agentes, 9 fases, 411 linhas)
4. PRD v0.2 criado com:
   - Fluxo: App envia WhatsApp → cria contato no GHL via API
   - 9 features P0, 4 P1, 4 P2
   - Stack: Next.js 15 + Evolution API + Supabase + GHL API
   - 4 milestones (~5-6 semanas)
   - 7 decisões tomadas, 0 em aberto
5. Research salvo em `research/whatsapp-web-integration.md`

## Decisões tomadas
- D1: Evolution API (WhatsApp) — REST, comunidade BR, Docker
- D2: GHL como CRM pós-envio
- D3: Envio pelo app (GHL só aceita API oficial/templates)
- D4: App = extrator + compositor + disparador
- D5: Tudo VPS (Evolution API precisa Docker)
- D6: Scoring híbrido (regras fixas + Claude API)
- D7: Auth config local (MVP interno)

## Próximo passo
- Iniciar M1: Setup Next.js + Supabase + Evolution API Docker
- Criar story para M1 antes de codar

## Arquivos criados/modificados
- `docs/projects/ensinio-prospector-app/INDEX.md` (criado)
- `docs/projects/ensinio-prospector-app/PRD.md` (criado, v0.2)
- `docs/projects/ensinio-prospector-app/research/whatsapp-web-integration.md` (criado)
- `docs/projects/ACTIVE.md` (atualizado: #10 + B5 promovido)
- `~/CODE/Projects/ensinio-prospector-app/` (diretório criado, vazio)

## Contexto para próxima sessão
- PRD completo em `docs/projects/ensinio-prospector-app/PRD.md`
- Squad base mapeado em `squads/ensinio-whatsapp-prospector/`
- Código do app vai em `~/CODE/Projects/ensinio-prospector-app/`
- Precisa criar story antes de iniciar código (Story-Driven Development)
