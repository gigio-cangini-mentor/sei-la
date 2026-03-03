# JARVIS — Lead Score Automation: Product Requirements Document (PRD)

**Projeto:** Meta Ads Dashboard — Automacao de Lead Score
**Versao:** 1.0
**Data:** 2026-03-01
**Autor:** Morgan (PM Agent)
**Status:** Draft — Pendente Validacao pelo Time

---

## Change Log

| Data       | Versao | Descricao                                 | Autor  |
|------------|--------|-------------------------------------------|--------|
| 2026-03-01 | 1.0    | Versao inicial — gerada a partir do briefing do usuario | Morgan |

---

## 1. Goals e Contexto

### 1.1 Goals

- Eliminar o processo manual de calculo de Lead Score, que hoje exige cruzamento de Excel + planilhas + formularios
- Habilitar gestao multi-projeto com isolamento por especialista (cada especialista ve apenas seu projeto)
- Entregar ao JARVIS dados de qualidade de leads em tempo real, sem necessidade de intervencao humana para atualizar scores
- Melhorar a qualidade das decisoes de otimizacao de campanhas com metricas de inteligencia de lead (CPQL, ROAS Projetado, Confianca Estatistica)
- Estabelecer um fluxo de aprovacao humana para otimizacoes sugeridas pelo JARVIS via Telegram (nao execucao automatica)
- Suportar estruturas de pesquisa diferentes por projeto (colunas/perguntas variam entre Mecanico Expert, ProjetoVD, e futuros projetos)

### 1.2 Contexto

Hoje, o JARVIS gerencia campanhas Meta Ads com base em 146 scores de lead pre-calculados manualmente e hardcoded no arquivo `leadScoringData.ts`. Esses scores foram criados cruzando tres fontes: planilha de compradores (Excel), leads do trafego pago, e respostas de pesquisa de qualificacao. O processo e completamente manual — cada vez que novos dados chegam, um humano precisa recalcular, exportar e atualizar o arquivo de codigo.

Isso cria dois problemas criticos de negocio: (1) os scores ficam obsoletos entre atualizacoes, fazendo o JARVIS tomar decisoes com dados defasados; (2) nao e escalavel para multiplos projetos com equipes diferentes. A agencia opera lancamentos perpetuos semanais, lancamentos unicos (IDR), e evergreen — cada um com formularios de inscricao proprios e criterios de qualificacao distintos.

O dashboard atual tambem nao tem autenticacao, o que impede o uso multi-projeto com especialistas separados. A visao e construir sobre a base existente (scoring engine, dashboard React+tRPC) para automatizar a ingestao de dados, calcular scores dinamicamente, e entregar insights acionaveis com aprovacao humana no loop.

---

## 2. Personas e Usuarios

| Persona | Descricao | Necessidades Primarias |
|---------|-----------|------------------------|
| **Especialista de Projeto** | Gestor de trafego ou estrategista responsavel por um projeto especifico | Ver KPIs do seu projeto; receber sugestoes de otimizacao; aprovar/rejeitar acoes via Telegram |
| **Admin da Agencia** | Dono ou gestor geral que supervisa todos os projetos | Visao consolidada; configurar projetos e acesso de especialistas; definir parametros de scoring |
| **JARVIS (sistema)** | Orquestrador IA que analisa dados e gera recomendacoes | Receber scores atualizados automaticamente; acionar fluxo de aprovacao quando CPL > threshold |

---

## 3. Definicao de MVP vs Visao Completa

### MVP (escopo deste PRD)

O MVP e o conjunto minimo de funcionalidades que entrega o valor central: **scores automaticos + dashboard melhorado + seguranca multi-projeto**.

**Incluido no MVP:**
- Autenticacao por projeto (especialista ve apenas seu projeto)
- Leitura automatica de dados de Google Sheets por projeto
- Calculo automatico de Lead Score (substituindo o hardcode)
- Metricas novas no dashboard: CPQL, ROAS Projetado, Confianca Estatistica, Tendencia de Qualidade, Ranking por Eficiencia, Semaforo de Decisao, Score por Criativo
- Sugestao de otimizacao via Telegram com aprovacao humana

**Fora do Escopo (Visao Futura — NAO implementar agora):**
- Agentes autonomos executando campanhas a cada 4h sem aprovacao humana
- Delegacao completa de otimizacao sem loop de aprovacao
- Integracao com outras plataformas de ads (Google Ads, TikTok Ads)
- Machine learning adaptativo (re-treino automatico de pesos de scoring)
- App mobile para aprovacao de sugestoes

---

## 4. Requisitos Funcionais

### FR1: Autenticacao por Projeto
O sistema deve implementar autenticacao baseada em projeto, onde cada especialista faz login com credenciais proprias e so tem acesso aos dados do(s) projeto(s) ao qual esta associado.

### FR2: Gestao de Projetos pelo Admin
O admin deve conseguir cadastrar novos projetos, associar especialistas a projetos, e configurar os parametros de scoring (dimensoes, pesos, MAX_CPA) de cada projeto via interface de configuracao.

### FR3: Configuracao de Schema de Pesquisa por Projeto
Cada projeto deve ter um schema de pesquisa configuravel — definindo quais colunas da planilha Google Sheets correspondem a quais dimensoes de scoring (ex: coluna "Qual seu tipo de oficina?" mapeada para dimensao `oficina` com peso 0.35).

### FR4: Integracao com Google Sheets
O sistema deve ler automaticamente os dados de leads qualificados de uma planilha Google Sheets configurada por projeto, sem necessidade de exportacao ou processamento manual.

### FR5: Calculo Automatico de Lead Score
Com base nos dados lidos do Google Sheets e no schema de pesquisa do projeto, o sistema deve calcular automaticamente os scores de cada lead, substituindo o arquivo hardcoded `leadScoringData.ts`.

### FR6: Atualizacao Incremental de Scores
O sistema deve detectar novos registros na planilha e calcular scores apenas para leads novos ou atualizados, sem recalcular toda a base a cada ciclo.

### FR7: Dashboard com Metricas Avancadas
O dashboard deve exibir, por campanha/adset/ad:
- **CPQL** (Custo por Lead Qualificado): gasto / contagem de leads com score >= threshold MQL
- **ROAS Projetado**: receita esperada com base em convRate estimada do score medio ponderado
- **Confianca Estatistica**: indicador de confiabilidade da amostra (ex: baixo se n < 30 leads)
- **Tendencia de Qualidade**: comparacao do score medio da ultima semana vs semana anterior
- **Ranking por Eficiencia**: ordenacao de criativos/adsets por melhor relacao CPQL x ROAS
- **Semaforo de Decisao**: ESCALAR (verde) / MANTER (amarelo) / PAUSAR (vermelho) por elemento
- **Score por Criativo**: distribuicao de scores dos leads atraidos por cada criativo

### FR8: Sugestao de Otimizacao via Telegram (Aprovacao Humana)
Quando o JARVIS identificar que um elemento (campanha, adset, ad) deve ser escalado ou pausado com base nos thresholds configurados, ele deve:
1. Enviar mensagem Telegram ao especialista responsavel com o contexto da sugestao (metricas, racional, acao proposta)
2. Aguardar aprovacao ou rejeicao do especialista
3. Registrar a decisao no historico
4. **NAO executar a acao automaticamente** — o especialista deve confirmar explicitamente

### FR9: Historico de Decisoes
O sistema deve registrar todas as sugestoes enviadas, com timestamp, elemento afetado, acao sugerida, e decisao do especialista (aprovado/rejeitado/ignorado).

### FR10: Suporte a Multiplos Tipos de Lancamento
O sistema deve funcionar com os diferentes tipos de lancamento da agencia:
- Perpetuo semanal (fluxo continuo de leads)
- Lancamento unico IDR (janela temporal definida)
- Evergreen (sempre ativo, sem janela)

---

## 5. Requisitos Nao Funcionais

### NFR1: Seguranca de Dados
Credenciais de acesso ao Google Sheets e API Meta Ads devem ser armazenadas de forma segura (variaveis de ambiente ou vault), nunca em codigo-fonte ou banco de dados em texto plano.

### NFR2: Isolamento de Dados entre Projetos
Um especialista autenticado em Projeto A nao deve conseguir acessar, ver ou inferir dados do Projeto B em nenhuma circunstancia — nem via API direta, nem via dados vazados em erros.

### NFR3: Disponibilidade do Dashboard
O dashboard deve estar disponivel 24/7, com downtime planejado inferior a 2h/mes. Falhas na leitura do Google Sheets nao devem derrubar o dashboard — devem mostrar dados cached com indicador de "dados desatualizados".

### NFR4: Latencia de Atualizacao de Scores
Novos leads adicionados ao Google Sheets devem ter seus scores calculados e disponiveis no dashboard em no maximo 30 minutos apos a insercao.

### NFR5: Confiabilidade do Fluxo Telegram
Sugestoes de otimizacao nao podem ser perdidas silenciosamente. Se a mensagem Telegram falhar, o sistema deve tentar novamente por ate 3 vezes com backoff exponencial e registrar a falha no log.

### NFR6: Auditabilidade
Toda alteracao de configuracao de scoring (pesos, thresholds, MAX_CPA) deve ser logada com timestamp e usuario que realizou a mudanca.

### NFR7: Testabilidade
O modulo de calculo de Lead Score deve ser testavel de forma isolada, sem dependencia de Google Sheets ou Meta Ads API — usando dados mockados injetados.

---

## 6. Requisitos de Interface (UI)

### 6.1 Visao Geral de UX

O dashboard mantem sua natureza de observabilidade: exibe o que esta acontecendo para que o especialista tome decisoes informadas. A nova camada de qualidade de leads deve ser visualmente integrada ao fluxo atual de KPIs de campanha — nao como uma aba separada, mas como metricas adicionais nas tabelas e cards ja existentes.

### 6.2 Telas Necessarias

- **Login**: Autenticacao por email/senha, com redirecionamento ao projeto do especialista
- **Selecao de Projeto** (admin only): Lista de projetos com status de sincronizacao do Google Sheets
- **Dashboard de Campanha** (existente, melhorado): Tabelas com colunas adicionais de CPQL, ROAS Projetado, Semaforo de Decisao, Score por Criativo
- **Configuracao de Projeto** (admin): Gerenciamento de schema de pesquisa, pesos de scoring, limites de threshold, especialistas associados
- **Historico de Decisoes**: Log de sugestoes enviadas e decisoes dos especialistas

### 6.3 Plataforma Alvo
Web Responsivo (uso primario em desktop, mas precisa funcionar em mobile para aprovacao Telegram-driven).

### 6.4 Acessibilidade
Sem requisito formal de WCAG para esta versao. Boa legibilidade e contraste adequado sao suficientes.

---

## 7. Premissas Tecnicas

### 7.1 Stack Existente (nao alterar sem justificativa)
- Frontend: React + tRPC (dashboard em `/opt/meta-ads-dashboard/`)
- Hosting: VPS com Docker
- JARVIS: Node.js com OpenAI Realtime API
- Notificacoes: Telegram Bot ja integrado ao JARVIS

### 7.2 Novas Dependencias Tecnicas
- **Google Sheets API v4**: Para leitura de dados de leads (OAuth2 service account por projeto)
- **Autenticacao**: JWT + sessoes server-side (a decidir entre solucao propria simples vs biblioteca como next-auth, dependendo da avaliacao do arquiteto)
- **Banco de dados**: Necessario para persistir scores calculados, historico de decisoes, configuracoes de projeto. O arquiteto deve recomendar (SQLite para simplicidade ou PostgreSQL para escala).
- **Job scheduling**: Tarefa periodica para polling do Google Sheets (cron job ou worker process)

### 7.3 Restricoes Tecnicas
- O scoring engine existente em `leadScoring.ts` deve ser preservado e reutilizado — a automacao adiciona uma camada de ingestao de dados, nao substitui a logica de calculo
- O arquivo `leadScoringData.ts` hardcoded deve ser substituido por consulta dinamica ao banco de dados
- Nenhuma feature deve exigir que o especialista acesse o servidor diretamente — tudo via dashboard ou Telegram

### 7.4 Estrutura de Repositorio
Monorepo existente — as novas funcionalidades sao adicionadas ao projeto `meta-ads-dashboard` existente.

### 7.5 Testes
- Unit tests para o modulo de calculo de score (obrigatorio)
- Integration tests para a leitura do Google Sheets (com mock da API)
- Testes manuais para o fluxo Telegram de aprovacao

---

## 8. Estrutura de Epics e Stories

### Estrategia de Faseamento: Wave-Based Delivery

A estrutura e organizada em **3 Waves** com criterio de valor incremental:

```
Wave 1 (Fundacao Segura): Auth + Config
Wave 2 (Automacao Core): Google Sheets + Score Automatico
Wave 3 (Inteligencia Operacional): Metricas Avancadas + Fluxo Telegram
```

**Racional da sequencia:** Auth vem primeiro porque sem ela nao e possivel separar dados por projeto com seguranca. Automacao do score vem antes das metricas avancadas porque as novas metricas dependem de scores calculados dinamicamente. O fluxo Telegram e construido por ultimo porque depende da confiabilidade dos scores.

---

### Epic 1 — Fundacao: Autenticacao e Gestao de Projetos

**Objetivo:** Estabelecer a infraestrutura de seguranca e multi-tenancy que habilitara todo o resto. Ao final desta epic, o dashboard tera login funcional, cada especialista tera acesso isolado ao seu projeto, e o admin conseguira configurar projetos e schemas de pesquisa.

**Por que primeiro:** Sem autenticacao, qualquer novo dado seria igualmente acessivel a todos — o que viola o requisito de isolamento por especialista. Este e o desbloqueador de tudo.

**Valor entregue:** Especialistas podem acessar o dashboard com seguranca. Admin pode configurar projetos sem tocar em codigo.

#### Story 1.1 — Infraestrutura de Autenticacao

Como especialista de projeto,
eu quero fazer login com email e senha,
para que eu acesse apenas os dados do meu projeto com seguranca.

**Acceptance Criteria:**
1. Endpoint POST `/api/auth/login` aceita email+senha e retorna JWT com projeto(s) associado(s)
2. Endpoints existentes do dashboard retornam 401 para requests sem token valido
3. Token expira em 8 horas; refresh token valido por 30 dias
4. Middleware de autenticacao aplicado em todas as rotas protegidas do tRPC
5. Banco de dados criado com tabelas: `users`, `projects`, `user_projects`
6. Testavel via CLI: `curl -X POST /api/auth/login -d '{"email":"x","password":"y"}'` retorna token

#### Story 1.2 — Interface de Login e Selecao de Projeto

Como especialista de projeto,
eu quero uma tela de login no dashboard,
para que eu acesse meu espaco de trabalho de forma intuitiva.

**Acceptance Criteria:**
1. Tela de login renderiza em `/login` com campos email e senha
2. Erro de credenciais invalidas exibe mensagem clara sem revelar se email existe ou nao
3. Apos login com sucesso, usuario e redirecionado ao dashboard do seu projeto
4. Admin com multiplos projetos ve tela de selecao de projeto antes do dashboard
5. Logout limpa token e redireciona para `/login`
6. Token persistido em httpOnly cookie (nao localStorage)

#### Story 1.3 — Gestao de Projetos pelo Admin

Como admin da agencia,
eu quero cadastrar projetos e associar especialistas,
para que cada projeto tenha sua propria configuracao e equipe.

**Acceptance Criteria:**
1. Rota `/admin/projects` acessivel apenas para usuarios com role `admin`
2. Admin consegue criar projeto com: nome, slug, MAX_CPA, ROAS target, Telegram chat_id do especialista
3. Admin consegue associar/desassociar usuarios a projetos
4. Admin consegue desativar projeto (sem deletar dados historicos)
5. Criacao de projeto via CLI testavel com script `node scripts/create-project.js`

#### Story 1.4 — Configuracao de Schema de Pesquisa por Projeto

Como admin da agencia,
eu quero configurar quais colunas da planilha correspondem a cada dimensao de scoring,
para que projetos com formularios diferentes sejam suportados sem alterar codigo.

**Acceptance Criteria:**
1. Interface em `/admin/projects/{id}/scoring` permite definir o schema de pesquisa
2. Schema define: nome_coluna_planilha → dimensao_scoring → peso (float, soma dos pesos = 1.0)
3. Validacao impede que soma dos pesos difira de 1.0 (margem de 0.001 para arredondamento)
4. Para cada dimensao, admin configura o mapeamento de respostas para score (ex: "Tenho 3+ funcionarios" → 85)
5. Schema salvo em banco de dados, nao em arquivo de codigo
6. Endpoint GET `/api/projects/{id}/schema` retorna schema ativo — testavel via curl

---

### Epic 2 — Automacao Core: Leitura de Google Sheets e Calculo de Score

**Objetivo:** Substituir o arquivo hardcoded `leadScoringData.ts` por um pipeline automatizado que le dados do Google Sheets, calcula scores usando o schema configurado e persiste os resultados. Ao final desta epic, os scores sao calculados automaticamente sem intervencao humana.

**Dependencias:** Epic 1 (schema de projeto necessario para calculo de score).

**Valor entregue:** Fim do processo manual de atualizar o arquivo de dados. Scores sempre frescos.

#### Story 2.1 — Integracao com Google Sheets API

Como sistema,
eu quero ler dados de leads de uma planilha Google Sheets configurada por projeto,
para que os dados de qualificacao cheguem ao pipeline de scoring automaticamente.

**Acceptance Criteria:**
1. Service account Google configurada por projeto com acesso de leitura a planilha especificada
2. Modulo `GoogleSheetsReader` expoe metodo `getLeads(projectId): Lead[]` com tipagem TypeScript
3. Tratamento de erro: se planilha inacessivel, retorna erro typed e nao derruba o processo
4. Credenciais em variavel de ambiente `GOOGLE_SHEETS_CREDENTIALS_{PROJECT_ID}` (JSON do service account)
5. Testavel com script: `node scripts/test-sheets.js --project=mecanico-expert` imprime primeiras 5 linhas
6. Conexao utiliza OAuth2 service account — nao requer autenticacao interativa

#### Story 2.2 — Pipeline de Calculo de Score

Como sistema,
eu quero calcular automaticamente o Lead Score de cada lead com base no schema do projeto,
para que os scores reflitam os dados reais sem processamento manual.

**Acceptance Criteria:**
1. Modulo `ScoreCalculator` aceita `(lead: RawLead, schema: ProjectSchema): CalculatedScore`
2. Calculo implementa as 4 dimensoes com pesos configurados (nao mais hardcoded para Mecanico Expert)
3. Score resultante gera: valor numerico (0-100), MQL Grade (A/B/C/D/E), convRate estimada, CPL aceitavel
4. Modulo e testavel isoladamente sem Google Sheets — aceita dados mockados
5. Suite de unit tests cobre: score maximo, score minimo, pesos invalidos, respostas fora do mapeamento
6. Resultado persistido na tabela `lead_scores` com: lead_id, project_id, score, grade, calculado_em

#### Story 2.3 — Worker de Sincronizacao Periodica

Como sistema,
eu quero executar o pipeline de scoring automaticamente a cada 30 minutos,
para que novos leads sejam pontuados sem intervencao humana.

**Acceptance Criteria:**
1. Worker roda como processo separado (ou cron job Docker) com intervalo configuravel via env `SYNC_INTERVAL_MINUTES` (default: 30)
2. Sincronizacao e incremental: processa apenas leads sem score ou com dados alterados desde ultima execucao
3. Log de cada execucao: timestamp inicio/fim, leads processados, erros encontrados
4. Falha em um projeto nao interrompe sincronizacao dos demais projetos
5. Endpoint GET `/api/admin/sync-status` retorna ultima execucao por projeto — testavel via curl
6. Worker pode ser triggerado manualmente via `POST /api/admin/sync-now/{projectId}` (admin only)

#### Story 2.4 — Migracao do Hardcode para Dados Dinamicos

Como sistema,
eu quero que o dashboard leia scores do banco de dados em vez do arquivo hardcoded,
para que as metricas reflitam os dados mais recentes automaticamente.

**Acceptance Criteria:**
1. Arquivo `leadScoringData.ts` substituido por chamadas ao banco de dados/API
2. Script de migracao `node scripts/migrate-scores.js` importa os 146 scores existentes para o banco
3. Dashboard continua funcionando identicamente com dados migrados (zero regressao visual)
4. Score lookup retorna dados cached (TTL 5 min) para performance, com invalidacao apos sincronizacao
5. Metricas ESCALAR/MANTER/PAUSAR continuam calculadas corretamente para projeto Mecanico Expert
6. Teste de regressao: comparar output do dashboard com dados migrados vs output com hardcode original

---

### Epic 3 — Inteligencia Operacional: Metricas Avancadas e Fluxo Telegram

**Objetivo:** Enriquecer o dashboard com metricas que transformam dados de qualidade de lead em decisoes acionaveis, e estabelecer o fluxo de sugestao via Telegram com aprovacao humana. Ao final desta epic, o especialista recebe contexto suficiente para otimizar campanhas com confianca, e o JARVIS sugere acoes esperando confirmacao.

**Dependencias:** Epic 2 (scores dinamicos necessarios para calcular CPQL, ROAS Projetado, etc.).

**Valor entregue:** Decisoes de otimizacao mais rapidas e embasadas. JARVIS como assistente proativo sem risco de execucao autonoma indesejada.

#### Story 3.1 — Metricas de Qualidade no Dashboard

Como especialista de projeto,
eu quero ver CPQL e ROAS Projetado para cada campanha/adset/ad,
para que eu saiba onde meu dinheiro esta sendo melhor investido em termos de qualidade de lead.

**Acceptance Criteria:**
1. Coluna CPQL exibida na tabela de campanhas: `gasto / count(leads com score >= threshold_mql)`
2. Coluna ROAS Projetado exibida: `(leads_mql * convRate_media * ticket_medio) / gasto`
3. Ticket medio configuravel por projeto no painel admin
4. Threshold de MQL configuravel por projeto (default: score >= 60)
5. Metricas calculadas server-side via tRPC query com dados do banco
6. Valores N/A exibidos quando amostra insuficiente (n < 10 leads), sem quebrar layout

#### Story 3.2 — Indicadores de Confianca e Tendencia

Como especialista de projeto,
eu quero saber se as metricas de qualidade sao estatisticamente confiaveis e se a tendencia esta melhorando ou piorando,
para que eu nao tome decisoes precipitadas baseadas em amostras pequenas.

**Acceptance Criteria:**
1. Indicador de Confianca exibido por elemento: ALTA (n >= 50), MEDIA (20-49), BAIXA (10-19), INSUFICIENTE (< 10)
2. Tendencia de Qualidade comparada com periodo anterior (configuravel: 7d vs 7d anteriores, default)
3. Tendencia exibe: score medio atual vs anterior, variacao percentual, seta visual (sobe/desce/estavel)
4. Periodo de comparacao configuravel pelo especialista no filtro do dashboard
5. Dados de tendencia calculados apenas quando ha registros suficientes nos dois periodos comparados

#### Story 3.3 — Ranking por Eficiencia e Semaforo de Decisao

Como especialista de projeto,
eu quero ver um ranking de criativos por eficiencia e um semaforo indicando qual acao tomar,
para que eu priorize rapidamente o que escalar e o que pausar.

**Acceptance Criteria:**
1. Aba ou secao "Ranking de Eficiencia" exibe criativos ordenados por: CPQL × (1 / ROAS_Projetado_inverso)
2. Semaforo de Decisao exibido por elemento com tres estados: ESCALAR (verde), MANTER (amarelo), PAUSAR (vermelho)
3. Logica do semaforo baseada nos thresholds do projeto (CPL aceitavel calculado pela scoring engine existente)
4. Score por Criativo: distribuicao visual dos scores dos leads atraidos por cada criativo (histograma simples ou faixas A/B/C/D/E)
5. Criterios do semaforo documentados em tooltip no dashboard (transparencia da decisao)

#### Story 3.4 — Fluxo de Sugestao Telegram com Aprovacao Humana

Como especialista de projeto,
eu quero receber sugestoes de otimizacao do JARVIS via Telegram com contexto completo,
para que eu possa aprovar ou rejeitar cada acao informadamente sem risco de execucao automatica.

**Acceptance Criteria:**
1. JARVIS envia mensagem Telegram quando elemento cruza threshold de PAUSAR ou ESCALAR (detectado na sincronizacao)
2. Mensagem contem: nome do elemento, metricas relevantes (CPQL, ROAS Projetado, Confianca), acao sugerida, racional em 1-2 frases
3. Mensagem inclui botoes inline: "Aprovar" / "Rejeitar" / "Ver mais detalhes"
4. JARVIS aguarda resposta — nenhuma acao e tomada na Meta Ads API sem aprovacao explicita
5. Aprovacao/rejeicao registrada na tabela `decision_history` com timestamp, usuario, elemento, acao, decisao
6. Sem resposta em 24h: elemento marcado como "aguardando decisao" no dashboard; nova sugestao pode ser enviada no proximo ciclo
7. Falha no envio Telegram: retry 3x com backoff de 5min, 15min, 1h; apos falha final registra no log e marca elemento como "notificacao pendente"

---

## 9. Dependencias e Riscos

### 9.1 Mapa de Dependencias

```
[Epic 1: Auth + Config]
        |
        v
[Epic 2: Google Sheets + Score Automatico]
        |
        v
[Epic 3: Metricas Avancadas + Telegram]
```

Stories dentro de cada epic podem ser paralelizadas com excecao das dependencias diretas:
- Story 2.2 (calculo) depende de Story 1.4 (schema)
- Story 2.3 (worker) depende de Story 2.1 (Google Sheets) e Story 2.2 (calculo)
- Story 2.4 (migracao) pode comecar em paralelo com Story 2.1 e 2.2
- Stories 3.1-3.3 dependem de Story 2.3 estar funcional
- Story 3.4 pode comecar em paralelo com 3.1-3.3 (usa o banco de decisoes independente)

### 9.2 Riscos e Mitigacoes

| Risco | Probabilidade | Impacto | Mitigacao |
|-------|---------------|---------|-----------|
| Google Sheets API com rate limiting em volumes altos | Media | Medio | Implementar cache e polling incremental; respeitar quota de 100 req/100s |
| Schema de pesquisa incompativel entre lancamentos do mesmo projeto | Alta | Alto | Suportar versionamento de schema — manter schema ativo + historico de schemas anteriores |
| Especialista ignora sugestoes Telegram por volume excessivo | Media | Medio | Limitar a 1-2 sugestoes por dia por projeto; agrupar sugestoes relacionadas |
| Dados do Google Sheets malformatados quebram calculo de score | Media | Alto | Validacao de entrada com relatorio de erros — leads invalidos logados, nao processados |
| Migracao dos 146 scores hardcoded gera regressao no dashboard | Baixa | Alto | Teste de regressao obrigatorio na Story 2.4 antes de deprecar o hardcode |
| Autenticacao simples insuficiente para dados sensiveis de campanha | Baixa | Alto | Avaliar com arquiteto se JWT simples e suficiente ou se necessario session-based auth mais robusto |

### 9.3 O Que Pode Ser Feito em Paralelo

- Epic 1 Story 1.3 (gestao admin) e Story 1.4 (schema) podem ser desenvolvidas em paralelo apos Story 1.1
- Epic 2 Story 2.4 (migracao) pode comecar assim que Story 1.4 estiver completa, em paralelo com Stories 2.1 e 2.2
- Epic 3 Story 3.4 (Telegram) pode comecar em paralelo com Stories 3.1-3.3 apos Epic 2 completa

---

## 10. Metricas de Sucesso

### Wave 1 (Epic 1) — Metricas de Validacao
- [ ] 100% dos endpoints do dashboard retornam 401 sem autenticacao valida
- [ ] Especialista A nao consegue acessar dados do Projeto B sob nenhuma circunstancia
- [ ] Admin consegue criar projeto e associar especialista em menos de 5 minutos via UI
- [ ] Schema de pesquisa do Mecanico Expert configurado e validado (soma pesos = 1.0)

### Wave 2 (Epic 2) — Metricas de Validacao
- [ ] Score calculado automaticamente para 100% dos leads no Google Sheets de teste
- [ ] Zero diferencas entre scores calculados pelo pipeline automatico vs scores hardcoded (teste de regressao)
- [ ] Novos leads pontuados em <= 30 minutos apos insercao na planilha
- [ ] Dashboard funcionando identicamente antes e depois da migracao do hardcode

### Wave 3 (Epic 3) — Metricas de Validacao
- [ ] CPQL e ROAS Projetado exibidos corretamente para todas as campanhas ativas
- [ ] Semaforo de Decisao alinhado com logica ESCALAR/MANTER/PAUSAR existente (zero regressao logica)
- [ ] Sugestao Telegram recebida pelo especialista em <= 5 minutos apos deteccao do threshold
- [ ] Historico de decisoes registra 100% das aprovacoes e rejeicoes

### Metricas de Negocio (30 dias apos Wave 3)
- Reducao do tempo gasto em atualizacao manual de scores: de ~4h/semana para 0
- Aumento na frequencia de otimizacao de campanhas: de semanal para diaria (habilitado por dados frescos)
- Taxa de aprovacao de sugestoes Telegram: meta >= 70% (sugestoes relevantes aceitas)

---

## 11. Consideracoes de Dados

### 11.1 Entidades de Dados

| Entidade | Campos Principais | Notas |
|----------|-------------------|-------|
| `users` | id, email, password_hash, role, created_at | Roles: admin, specialist |
| `projects` | id, name, slug, max_cpa, roas_target, tg_chat_id, active | Um registro por projeto |
| `user_projects` | user_id, project_id, created_at | Relacao N:N |
| `project_schemas` | id, project_id, version, dimensions (JSON), active, created_at | Versionado |
| `leads` | id, project_id, external_id, raw_data (JSON), sheets_row, created_at | external_id = ID na planilha |
| `lead_scores` | id, lead_id, project_id, score, grade, conv_rate, cpl_acceptable, schema_version, calculated_at | Historico de scores |
| `sync_logs` | id, project_id, started_at, finished_at, leads_processed, errors_count, status | Auditoria de sincronizacao |
| `decision_history` | id, project_id, element_type, element_id, suggested_action, decided_by, decision, decided_at | Historico de decisoes Telegram |

### 11.2 Retencao de Dados
- Scores de lead: retidos indefinidamente (historico necessario para tendencias)
- Sync logs: retidos por 90 dias
- Decision history: retidos indefinidamente (auditoria)
- Raw data de leads: retidos por 1 ano

### 11.3 Migracao
Os 146 scores existentes em `leadScoringData.ts` devem ser importados via script de migracao antes da ativacao do pipeline automatico. O script deve ser idempotente.

---

## 12. Checklist de Validacao do PRD

### Resultado da Validacao (pm-checklist)

| Categoria | Status | Notas |
|-----------|--------|-------|
| 1. Definicao do Problema e Contexto | PASS | Problema claro, quantificado, com personas definidas |
| 2. Definicao de Escopo MVP | PASS | MVP explicitamente separado da visao futura; criterios de inclusao/exclusao documentados |
| 3. Requisitos de UX | PASS | Telas necessarias identificadas; plataforma definida |
| 4. Requisitos Funcionais | PASS | 10 FRs cobrem todos os pedidos do usuario; nenhum foi inventado |
| 5. Requisitos Nao Funcionais | PASS | Seguranca, isolamento, disponibilidade, latencia, testabilidade cobertos |
| 6. Estrutura de Epic e Story | PASS | 3 epics sequenciais; stories com ACs testaveies; tamanho adequado |
| 7. Guidance Tecnica | PASS | Stack existente documentada; novas dependencias identificadas; decisao de banco delegada ao arquiteto |
| 8. Requisitos Cross-Funcionais | PASS | Dados, integracoes, schema, retencao documentados |
| 9. Clareza e Comunicacao | PASS | Linguagem consistente; decisoes de escopo explicadas; sem ambiguidade nas ACs |

**Completude geral:** ~95%
**Adequacao do escopo MVP:** Adequado
**Prontidao para Arquitetura:** PRONTO

**Gaps identificados (LOW priority):**
- Diagrama visual do fluxo de dados (Sheets → Score → Dashboard → Telegram) seria util para o arquiteto, mas nao bloqueia
- Detalhamento do ticket medio por tipo de lancamento (perpetuo vs IDR vs evergreen) pode requerer ajuste futuro

**Decisao Final:** READY FOR ARCHITECT

---

## 13. Proximos Passos

### Para o Arquiteto (@architect)

Leia este PRD e produza uma arquitetura tecnica cobrindo:
1. Decisao de banco de dados (SQLite vs PostgreSQL) com justificativa baseada em escala esperada e complexidade de deploy
2. Estrategia de autenticacao (JWT stateless vs session-based) com analise de trade-offs de seguranca
3. Arquitetura do worker de sincronizacao (cron job Docker vs worker process Node.js)
4. Schema de banco de dados detalhado (DDL) para as entidades definidas na Secao 11
5. Identificacao de riscos tecnicos criticos nao cobertos neste PRD

### Para o PO (@po)

Valide este PRD e priorize o backlog inicial. Pontos de atencao:
1. Confirmar se a sequencia de Waves (1→2→3) faz sentido com o negocio atual
2. Verificar se o threshold de 30 minutos para atualizacao de scores e aceitavel para os lancamentos em andamento
3. Confirmar se o fluxo Telegram existente ja suporta botoes inline ou requer ajuste

---

*Documento gerado por Morgan (PM Agent) — Synkra AIOS*
*Baseado exclusivamente nas informacoes fornecidas pelo usuario no briefing. Nenhuma feature foi inventada.*
*— Morgan, planejando o futuro*
