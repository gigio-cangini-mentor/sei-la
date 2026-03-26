# Provision Completion Checklist

> Checklist obrigatorio antes de declarar go-live de um novo claw.

## Phase 0: Intake
- [ ] Nome do claw definido
- [ ] Dono identificado (nome completo)
- [ ] Proposito documentado
- [ ] Integracoes necessarias listadas

## Phase 0.5: Memory Extraction
- [ ] Prompt de extracao entregue ao usuario
- [ ] IA escolhida pelo usuario (ChatGPT/Gemini/Claude/Manual)
- [ ] Resposta recebida e parseada
- [ ] user-profile.yaml gerado com quality score >= 0.7
- [ ] Gap-fill completado (se quality score entre 0.6-0.7)
- [ ] Preview aprovado pelo usuario
- [ ] OU: Fase pulada com justificativa (fallback pra Discovery classico)

## Phase 1.5: Credentials
- [ ] SUPABASE_URL coletada e validada (conexao OK)
- [ ] SUPABASE_ANON_KEY coletada e validada (conexao OK)
- [ ] SUPABASE_SERVICE_ROLE_KEY coletada e validada (conexao OK, diferente da anon)
- [ ] .env salvo em ~/.openclaw/{claw-name}/.env
- [ ] Permissoes chmod 600 aplicadas
- [ ] .env NAO commitado em git
- [ ] Credenciais opcionais oferecidas (Anthropic, OpenAI, ClickUp, Evolution)

## Phase 2-8: Setup (delegado a openclaw-setup)
- [ ] Phase 1/Discovery completa (user-profile.yaml)
- [ ] Phase 2/Identity completa (SOUL.md, USER.md, IDENTITY.md, AGENTS.md, BOOT.md)
- [ ] Phase 3/Security completa (hardening verificado)
- [ ] Phase 4/Memory completa (estrutura criada)
- [ ] Phase 5/Capabilities completa (skills base configuradas)
- [ ] Phase 6/Immune System completa (watchdog ativo)
- [ ] Phase 7/Validation completa (70+ itens checados)
- [ ] SETUP-REPORT.md gerado

## Phase 9: First Skills
- [ ] Skills iniciais identificadas baseadas no perfil
- [ ] Pelo menos 1 skill criada (ou justificativa para zero)
- [ ] Security checklist passada para cada skill
- [ ] Skills deployadas no VPS
- [ ] Skills registradas no skill registry (Supabase)

## Phase 10: Go-Live
- [ ] Claw registrado no fleet registry (openclaw_fleet)
- [ ] Primeiro health check executado e aprovado
- [ ] Monitoramento diario ativado (cron 06:00)
- [ ] PROVISIONING-REPORT.md gerado
- [ ] Dono notificado que claw esta operacional
