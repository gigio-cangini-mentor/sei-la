# Arquitetura Tecnica: Lead Score Automation
> Meta Ads Dashboard — `/opt/meta-ads-dashboard/`
> Versao: 0.1.0-draft | Data: 2026-03-01 | Autor: Aria (@architect)

---

## Indice

1. [Contexto e Decisoes de Contorno](#1-contexto-e-decisoes-de-contorno)
2. [Diagrama de Componentes](#2-diagrama-de-componentes)
3. [Data Flow](#3-data-flow)
4. [Schema de Dados](#4-schema-de-dados)
5. [Integracao Google Sheets](#5-integracao-google-sheets)
6. [Design de Autenticacao](#6-design-de-autenticacao)
7. [API Design — Novos Endpoints tRPC](#7-api-design--novos-endpoints-trpc)
8. [Storage — Onde Guardar o que](#8-storage--onde-guardar-o-que)
9. [Decisoes Tecnologicas (ADRs)](#9-decisoes-tecnologicas-adrs)
10. [Riscos Tecnicos](#10-riscos-tecnicos)
11. [Estimativa de Complexidade](#11-estimativa-de-complexidade)
12. [Plano de Implementacao Sugerido](#12-plano-de-implementacao-sugerido)

---

## 1. Contexto e Decisoes de Contorno

### 1.1 Principio Guia: Pragmatismo Maximo

O sistema atual e um monolito Node.js funcional sem banco de dados. Toda decisao arquitetural aqui segue a hierarquia:

```
JSON files > SQLite > PostgreSQL
Polling > Webhook
Service Account > OAuth user flow
PIN por projeto > JWT complexo
```

Nao sera adicionado nenhum componente de infraestrutura novo (sem Redis, sem message queue, sem banco relacional). O que nao puder ser resolvido com JSON files e logica Node.js sera escalado para SQLite — e somente se houver razao concreta.

### 1.2 O que o sistema faz hoje (baseline)

```
Estado atual:
  - leadScoringData.ts    → 146 scores HARDCODED para JAN/FEV
  - leadScoring.ts        → Engine de calculo (bom, reutilizavel)
  - metaApi.ts            → Busca campanhas/adsets/ads na Meta Graph API
  - routers.ts            → Endpoints tRPC expostos
  - projects.json         → Config multi-projeto com tokens Meta
  - Home.tsx (2484 linhas) → Dashboard unico, sem auth
```

### 1.3 O que muda com esta arquitetura

```
Nova camada:
  - sheets-reader.ts      → Le planilhas Google Sheets via Service Account
  - score-calculator.ts   → Recalcula scores a partir dos dados reais
  - score-cache.ts        → Persiste scores em JSON (substitui leadScoringData.ts)
  - project-auth.ts       → Middleware PIN por projeto
  - advanced-metrics.ts   → CPQL, ROAS Projetado, Confianca, Tendencia
```

---

## 2. Diagrama de Componentes

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                          VPS Hostinger — Docker Compose                       ║
║                                                                               ║
║  ┌─────────────────────────────────────────────────────────────────────────┐  ║
║  │                    Container: meta-ads-dashboard                         │  ║
║  │                                                                          │  ║
║  │  ┌─────────────────────────┐     ┌───────────────────────────────────┐  │  ║
║  │  │      React Client       │     │        Express + tRPC Server       │  │  ║
║  │  │   (Home.tsx, filtros,   │◄───►│   (routers.ts + novos routers)    │  │  ║
║  │  │    tabelas, KPIs)       │     │                                   │  │  ║
║  │  └─────────────────────────┘     │  ┌─────────────────────────────┐  │  │  ║
║  │                                  │  │    project-auth.ts          │  │  │  ║
║  │                                  │  │  (middleware PIN/projeto)   │  │  │  ║
║  │                                  │  └─────────────────────────────┘  │  │  ║
║  │                                  │                                   │  │  ║
║  │                                  │  ┌─────────────────────────────┐  │  │  ║
║  │                                  │  │     sheets-reader.ts        │  │  │  ║
║  │                                  │  │  (Google Sheets API v4)     │  │  │  ║
║  │                                  │  └──────────────┬──────────────┘  │  │  ║
║  │                                  │                 │                  │  │  ║
║  │                                  │  ┌──────────────▼──────────────┐  │  │  ║
║  │                                  │  │    score-calculator.ts      │  │  │  ║
║  │                                  │  │  (reutiliza leadScoring.ts) │  │  │  ║
║  │                                  │  └──────────────┬──────────────┘  │  │  ║
║  │                                  │                 │                  │  │  ║
║  │                                  │  ┌──────────────▼──────────────┐  │  │  ║
║  │                                  │  │      score-cache.ts         │  │  │  ║
║  │                                  │  │  (.aios/scores/{project}.   │  │  │  ║
║  │                                  │  │    json, substitui          │  │  │  ║
║  │                                  │  │    leadScoringData.ts)      │  │  │  ║
║  │                                  │  └──────────────┬──────────────┘  │  │  ║
║  │                                  │                 │                  │  │  ║
║  │                                  │  ┌──────────────▼──────────────┐  │  │  ║
║  │                                  │  │    advanced-metrics.ts      │  │  │  ║
║  │                                  │  │  (CPQL, ROAS proj., conf.,  │  │  │  ║
║  │                                  │  │   tendencia, ranking)       │  │  │  ║
║  │                                  │  └─────────────────────────────┘  │  │  ║
║  │                                  │                                   │  │  ║
║  │                                  └───────────────────────────────────┘  │  ║
║  └──────────────────────────────────────────────────────────────────────────┘  ║
║                                      │                                         ║
║       ┌──────────────────────────────┼────────────────────────┐               ║
║       │                              │                         │               ║
║  ┌────▼────────┐            ┌────────▼─────────┐    ┌─────────▼──────────┐    ║
║  │ projects.json│            │  Google Sheets   │    │  Meta Graph API    │    ║
║  │ (config +   │            │  (3 planilhas    │    │  (campanhas, ads,  │    ║
║  │  sheet IDs  │            │   por projeto)   │    │   insights)        │    ║
║  │  + PIN hash │            └──────────────────┘    └────────────────────┘    ║
║  │  por proj.) │                                                               ║
║  └─────────────┘                                                               ║
║                                                                                ║
║  ┌──────────────────────────────────────────────────────────────────────────┐  ║
║  │  Container: jarvis                                                        │  ║
║  │  (server.js — ferramentas JARVIS, Telegram notifications)                │  ║
║  └──────────────────────────────────────────────────────────────────────────┘  ║
║                                                                                ║
╚════════════════════════════════════════════════════════════════════════════════╝

  Volumes compartilhados:
    /opt/meta-ads-dashboard/data/scores/   → scores calculados (JSON files)
    /opt/meta-ads-dashboard/data/cache/    → cache sheets bruto (JSON files)
    projects.json                          → compartilhado entre containers
```

---

## 3. Data Flow

### 3.1 Fluxo de Recalculo de Scores (trigger manual)

```
Usuario clica "Recalcular Scores" no dashboard
         │
         ▼
POST /trpc/leadScoring.recalculate
         │
         ▼
project-auth.ts (valida PIN do projeto)
         │
         ▼
sheets-reader.ts
  ├── fetchBuyers(projectId)      → planilha compradores
  │     └── retorna: [{name, phone, utm_term, utm_medium, utm_content, date}]
  ├── fetchLeads(projectId)       → planilha leads
  │     └── retorna: [{phone, utm_term, utm_medium, utm_content, date}]
  └── fetchSurvey(projectId)      → planilha pesquisa
        └── retorna: [{phone, q1, q2, q3, q4, ...}]  (colunas dinamicas)
         │
         ▼
score-calculator.ts
  ├── matchBuyersToUTMs()          → taxa de conversao real por nivel
  ├── matchSurveyToLeads()         → cruzamento respostas × leads
  ├── scoreDimensions()            → 4 dimensoes com pesos
  ├── calculateMQLGrade()          → Score 0-100 → Grade A-E
  ├── interpolateConvRate()        → Conv Rate esperada
  ├── calculateAcceptableCPL()     → MAX_CPA × (convRate / 100)
  └── generateDecision()           → ESCALAR / MANTER / PAUSAR
         │
         ▼
advanced-metrics.ts
  ├── calculateCPQL()             → CPL / ConvRate (custo por lead qualificado)
  ├── projectROAS()               → Score × spend × fator historico
  ├── statisticalConfidence()     → chi-square ou N minimo simples
  ├── detectTrend()               → compara periodos (semana atual vs anterior)
  ├── rankCreatives()             → ordena ads por score composto
  └── buildSemaphore()            → RED/YELLOW/GREEN por ad/adset
         │
         ▼
score-cache.ts
  └── saveScores(projectId, scores)
        → /opt/meta-ads-dashboard/data/scores/{projectId}.json
         │
         ▼
Resposta ao cliente: { status: "ok", recalculatedAt, scoreCount }
```

### 3.2 Fluxo de Leitura no Dashboard (normal)

```
Cliente carrega Home.tsx
         │
         ▼
GET /trpc/leadScoring.getScores?projectId={id}
         │
         ▼
project-auth.ts (valida PIN)
         │
         ▼
score-cache.ts
  └── loadScores(projectId)
        → le /opt/meta-ads-dashboard/data/scores/{projectId}.json
        → se arquivo nao existe: retorna scores vazios + flag needs_calculation
         │
         ▼
metaApi.ts (paralelo)
  └── getCampaignInsights(projectId)
        → Meta Graph API v24.0
         │
         ▼
Merge no router: scores calculados + insights live
         │
         ▼
Response ao cliente
```

### 3.3 Fluxo de Notificacao JARVIS (Telegram)

```
score-calculator.ts detecta decisao PAUSAR em ad com spend > threshold
         │
         ▼
jarvis-notifier.ts
  └── POST http://jarvis:3000/api/notify (chamada interna Docker)
        payload: { type: "lead_score_alert", projectId, entity, decision, score }
         │
         ▼
server.js (container jarvis)
  └── Formata e envia mensagem Telegram ao especialista do projeto
```

---

## 4. Schema de Dados

### 4.1 `projects.json` Expandido

```json
{
  "projects": [
    {
      "id": "projeto-alfa",
      "name": "Projeto Alfa",
      "slug": "alfa",
      "meta": {
        "accessToken": "EAA...",
        "adAccountId": "act_123456789",
        "apiVersion": "v24.0"
      },
      "auth": {
        "pinHash": "$2b$10$...",
        "allowedEmails": []
      },
      "sheets": {
        "serviceAccountFile": "/opt/meta-ads-dashboard/config/service-account.json",
        "buyers": {
          "spreadsheetId": "1BxiM...",
          "range": "Compradores!A:Z",
          "columnMapping": {
            "name": "Nome",
            "phone": "Telefone",
            "utm_term": "UTM Term",
            "utm_medium": "UTM Medium",
            "utm_content": "UTM Content",
            "purchaseDate": "Data Compra",
            "product": "Produto"
          }
        },
        "leads": {
          "spreadsheetId": "1BxiM...",
          "range": "Leads!A:Z",
          "columnMapping": {
            "phone": "Telefone",
            "utm_term": "UTM Campaign",
            "utm_medium": "UTM AdSet",
            "utm_content": "UTM Ad",
            "capturedAt": "Data Captura"
          }
        },
        "survey": {
          "spreadsheetId": "1BxiM...",
          "range": "Pesquisa!A:Z",
          "columnMapping": {
            "phone": "Telefone"
          },
          "dimensionMapping": {
            "oficina": {
              "column": "Voce tem uma oficina?",
              "weight": 0.35,
              "scoreMap": {
                "Sim, propria": 100,
                "Sim, alugada": 70,
                "Nao tenho ainda": 20
              }
            },
            "renda": {
              "column": "Qual sua renda mensal?",
              "weight": 0.30,
              "scoreMap": {
                "Acima de R$ 10.000": 100,
                "R$ 5.000 a R$ 10.000": 75,
                "R$ 3.000 a R$ 5.000": 50,
                "Menos de R$ 3.000": 25
              }
            },
            "equipe": {
              "column": "Tem funcionarios?",
              "weight": 0.20,
              "scoreMap": {
                "Sim, mais de 5": 100,
                "Sim, 1 a 5": 70,
                "Trabalho sozinho": 30
              }
            },
            "diagnostico": {
              "column": "Fez diagnostico?",
              "weight": 0.15,
              "scoreMap": {
                "Sim, completo": 100,
                "Parcial": 60,
                "Nao": 10
              }
            }
          }
        }
      },
      "scoring": {
        "maxCPA": 500.00,
        "minLeadsForConfidence": 30,
        "scaleThreshold": 70,
        "pauseThreshold": 30,
        "refreshIntervalHours": 24
      },
      "telegram": {
        "chatId": "-100123456789",
        "alertOnPause": true,
        "alertOnScale": false
      }
    }
  ]
}
```

**Notas sobre o schema expandido:**
- `auth.pinHash` usa bcrypt (4 rounds, suficiente para PIN — nao precisa de 10)
- `sheets.serviceAccountFile` aponta para o mesmo arquivo para todos os projetos (1 service account, N planilhas)
- `sheets.*.columnMapping` resolve o problema de colunas dinamicas por projeto
- `sheets.survey.dimensionMapping` externaliza completamente as dimensoes, pesos e valores — nao ha mais hardcode
- `scoring.maxCPA` e o MAX_CPA usado na formula CPL Aceitavel = MAX_CPA x (convRate / 100)

### 4.2 Score Cache — `/opt/meta-ads-dashboard/data/scores/{projectId}.json`

```json
{
  "projectId": "projeto-alfa",
  "calculatedAt": "2026-03-01T14:32:00Z",
  "period": {
    "start": "2026-02-01",
    "end": "2026-02-28"
  },
  "summary": {
    "totalLeads": 1240,
    "totalBuyers": 87,
    "totalSurveyResponses": 412,
    "overallConvRate": 7.02,
    "overallScore": 58.3
  },
  "scores": {
    "campaigns": {
      "CAMP-001": {
        "id": "CAMP-001",
        "name": "Campanha Oficinas SP",
        "score": 72.4,
        "grade": "B",
        "convRate": 8.5,
        "acceptableCPL": 42.50,
        "decision": "ESCALAR",
        "leadCount": 320,
        "buyerCount": 27,
        "surveyCount": 98,
        "confidence": "HIGH",
        "trend": "UP",
        "dimensions": {
          "oficina": 81.2,
          "renda": 68.5,
          "equipe": 72.0,
          "diagnostico": 55.0
        },
        "advanced": {
          "cpql": 38.20,
          "projectedROAS": 4.2,
          "semaphore": "GREEN",
          "trendDelta": 5.3
        }
      }
    },
    "adsets": {
      "ADSET-001": {
        "campaignId": "CAMP-001",
        "id": "ADSET-001",
        "name": "Remarketing SP",
        "score": 68.1,
        "grade": "B",
        "convRate": 7.8,
        "acceptableCPL": 39.00,
        "decision": "MANTER",
        "leadCount": 145,
        "buyerCount": 11,
        "surveyCount": 42,
        "confidence": "MEDIUM",
        "trend": "STABLE",
        "advanced": {
          "cpql": 40.10,
          "projectedROAS": 3.9,
          "semaphore": "YELLOW",
          "trendDelta": 1.1
        }
      }
    },
    "ads": {
      "AD-001": {
        "adsetId": "ADSET-001",
        "campaignId": "CAMP-001",
        "id": "AD-001",
        "name": "Video 30s Depoimento",
        "score": 82.3,
        "grade": "A",
        "convRate": 10.2,
        "acceptableCPL": 51.00,
        "decision": "ESCALAR",
        "leadCount": 89,
        "buyerCount": 9,
        "surveyCount": 28,
        "confidence": "MEDIUM",
        "trend": "UP",
        "advanced": {
          "cpql": 29.80,
          "projectedROAS": 5.1,
          "semaphore": "GREEN",
          "trendDelta": 8.7,
          "creativeRank": 1
        }
      }
    }
  }
}
```

### 4.3 Cache de Planilhas — `/opt/meta-ads-dashboard/data/cache/{projectId}-{sheet}.json`

```json
{
  "projectId": "projeto-alfa",
  "sheet": "buyers",
  "fetchedAt": "2026-03-01T14:30:00Z",
  "rowCount": 87,
  "rows": [
    {
      "name": "Joao Silva",
      "phone": "11999990001",
      "utm_term": "camp-oficinas-sp",
      "utm_medium": "remarketing-sp",
      "utm_content": "video-30s-dep",
      "purchaseDate": "2026-02-15",
      "product": "Mentoria Premium"
    }
  ]
}
```

**Proposito do cache de planilhas:**
- Evitar re-fetch do Sheets API em recalculos rapidos sucessivos
- TTL configuravel (default: 1 hora)
- O recalculo forcado sempre ignora o cache

---

## 5. Integracao Google Sheets

### 5.1 Decisao: Service Account (nao OAuth)

**Opcoes avaliadas:**

| Abordagem | Pro | Contra | Decisao |
|-----------|-----|--------|---------|
| Service Account | Sem interacao humana, roda headless no servidor, sem expirar token | Requer compartilhar planilha com o email da SA | ESCOLHIDA |
| OAuth User Flow | Acessa qualquer planilha do usuario | Token expira, requer callback URL, nao funciona headless | Descartada |
| API Key | Simplicissimo | Funciona apenas para planilhas PUBLICAS | Descartada |

**Implementacao:**
1. Criar 1 Service Account no Google Cloud Console
2. Baixar JSON de credenciais → `/opt/meta-ads-dashboard/config/service-account.json`
3. Para cada projeto: o especialista compartilha as 3 planilhas com o email da SA (ex: `aios-sheets@projeto.iam.gserviceaccount.com`)
4. A SA tem permissao de **leitura apenas** (Viewer)

### 5.2 Como lidar com colunas dinamicas

O problema: cada projeto tem perguntas diferentes no formulario de pesquisa, com nomes de colunas diferentes nas planilhas.

**Solucao: column mapping no `projects.json`**

```typescript
// sheets-reader.ts
async function fetchSheet(projectId: string, sheetType: 'buyers' | 'leads' | 'survey') {
  const project = getProjectConfig(projectId);
  const config = project.sheets[sheetType];

  // 1. Busca os dados brutos (primeira linha = headers)
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: config.spreadsheetId,
    range: config.range,
  });

  const [headers, ...rows] = response.data.values;

  // 2. Mapeia colunas pelo nome (case-insensitive, trim)
  const colIndex = buildColumnIndex(headers, config.columnMapping);

  // 3. Retorna rows normalizadas com chaves padrao
  return rows.map(row => mapRow(row, colIndex));
}

function buildColumnIndex(headers: string[], mapping: Record<string, string>) {
  // mapping: { "phone": "Telefone", "utm_term": "UTM Campaign" }
  // retorna: { "phone": 2, "utm_term": 5 }  (indices das colunas)
  const index: Record<string, number> = {};
  const normalizedHeaders = headers.map(h => h?.trim().toLowerCase());

  for (const [key, columnName] of Object.entries(mapping)) {
    const idx = normalizedHeaders.indexOf(columnName.toLowerCase().trim());
    if (idx >= 0) index[key] = idx;
  }
  return index;
}
```

**Para as dimensoes do score (survey):**
O `dimensionMapping` no projects.json mapeia cada dimensao para a coluna correta e define o `scoreMap` dos valores. O score-calculator.ts le o mapeamento e aplica dinamicamente.

### 5.3 Polling vs Webhook

**Decisao: Polling sob demanda (sem cron automatico)**

| Abordagem | Pro | Contra |
|-----------|-----|--------|
| Cron automatico (a cada N horas) | Scores sempre atualizados | Consumo de quota Sheets API, recalculos quando nao necessario |
| Webhook do Google Sheets | Real-time | Requer URL publica configurada, complexidade de Push Notifications API |
| Polling sob demanda (botao manual) | Controle total, sem cron | Requer acao humana |
| Polling no acesso (TTL-based) | Automatico sem cron | Latencia na primeira requisicao |

**Escolhida: Polling sob demanda + TTL de cache**

Racional: O scoring nao precisa ser real-time. Um especialista recalcula 1-2x por dia, ou quando vai tomar uma decisao. O botao "Recalcular" no dashboard e suficiente. O campo `scoring.refreshIntervalHours` no projeto pode ser usado como sugestao visual ("scores calculados ha 8h — recomendar recalculo").

**Quota da Sheets API:** 300 requisicoes/minuto/projeto. Cada recalculo faz 3 chamadas (compradores + leads + pesquisa). Sem problema.

### 5.4 Tratamento de Erros de Sheets

```typescript
// Erros esperados e como tratar:
// 1. Planilha nao compartilhada com SA → erro 403 → mensagem clara para usuario
// 2. Aba/range errado → erro 400 → log + retorno de array vazio com warning
// 3. Timeout (> 10s) → retry 1x → falha graceful com dados do cache anterior
// 4. Coluna nao encontrada no mapping → skip silencioso + log warning
```

---

## 6. Design de Autenticacao

### 6.1 Problema

- Dashboard atual: zero autenticacao, todos os endpoints publicos
- Requisito: cada especialista ve apenas o seu projeto
- Constraint: sistema simples, sem usuario/senha, sem banco de dados

### 6.2 Decisao: PIN por Projeto (sessao em cookie)

**Opcoes avaliadas:**

| Abordagem | Complexidade | Seguranca | Decide |
|-----------|-------------|-----------|--------|
| PIN por projeto (cookie de sessao) | Baixa | Adequada para contexto | ESCOLHIDA |
| JWT com refresh token | Media | Alta | Overkill — sem usuario/senha |
| OAuth Google | Alta | Alta | Requer app OAuth + callback — overkill |
| API Key no header | Baixa | Adequada | Nao funciona bem em SPA (exposta em JS) |
| IP whitelist (Traefik) | Baixa | Media | Nao escala para multiplos especialistas |

**Fluxo de autenticacao:**

```
1. Usuario acessa /dashboard/projeto-alfa
2. Nao tem cookie de sessao → redireciona para /login?project=projeto-alfa
3. Digite PIN de 6 digitos (ou 4, configuravel)
4. POST /trpc/auth.login { projectId, pin }
5. Servidor: bcrypt.compare(pin, project.auth.pinHash)
6. Se OK: gera token = crypto.randomBytes(32).toString('hex')
   Salva em /opt/meta-ads-dashboard/data/sessions/{token}.json
   { projectId, createdAt, expiresAt (+8h) }
   Set-Cookie: session={token}; HttpOnly; Secure; SameSite=Strict; Max-Age=28800
7. Redirect para /dashboard/projeto-alfa
8. Requests subsequentes: middleware le cookie, verifica session file
```

**Por que sessao em arquivo (nao JWT)?**

JWT sem banco de dados nao pode ser invalidado. Se o PIN for comprometido, nao ha como "deslogar" tokens emitidos. Sessions em arquivos permitem invalidacao manual (`rm /opt/meta-ads-dashboard/data/sessions/*.json`).

**Hash do PIN:**

```bash
# Gerar hash para incluir no projects.json
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('1234', 4, (e,h) => console.log(h))"
```

### 6.3 Middleware de Autenticacao

```typescript
// project-auth.ts — middleware tRPC
export const projectProcedure = t.procedure.use(async ({ ctx, next, input }) => {
  const token = ctx.req.cookies?.session;
  if (!token) throw new TRPCError({ code: 'UNAUTHORIZED' });

  const session = loadSession(token);
  if (!session || session.expiresAt < Date.now()) {
    deleteSession(token);
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  // Verifica que o projectId do input bate com a sessao
  const inputProjectId = (input as any)?.projectId;
  if (inputProjectId && inputProjectId !== session.projectId) {
    throw new TRPCError({ code: 'FORBIDDEN' });
  }

  return next({ ctx: { ...ctx, projectId: session.projectId } });
});
```

### 6.4 Endpoints Publicos vs Protegidos

```
PUBLICO (sem auth):
  - GET /                          → serve o SPA
  - POST /trpc/auth.login          → recebe PIN, retorna cookie
  - GET /trpc/meta.healthCheck     → status do sistema

PROTEGIDO (requer session cookie):
  - GET /trpc/leadScoring.getScores
  - POST /trpc/leadScoring.recalculate
  - GET /trpc/meta.campaigns
  - GET /trpc/meta.adsets
  - GET /trpc/meta.ads
  - GET /trpc/meta.insights
  - GET /trpc/projectConfig.get
  - POST /trpc/auth.logout
```

---

## 7. API Design — Novos Endpoints tRPC

### 7.1 Router: `auth`

```typescript
// server/routers/auth.ts

// auth.login — PUBLICO
// Input: { projectId: string, pin: string }
// Output: { ok: true, projectId: string }
// Side effect: Set-Cookie session

// auth.logout — PROTEGIDO
// Input: {}
// Output: { ok: true }
// Side effect: deleta session file, clear cookie

// auth.me — PROTEGIDO
// Input: {}
// Output: { projectId: string, expiresAt: string }
```

### 7.2 Router: `leadScoring` (expandido)

```typescript
// server/routers/leadScoring.ts

// leadScoring.getScores — PROTEGIDO
// Input: { projectId: string, level?: 'campaign'|'adset'|'ad' }
// Output: ScoreCacheFile (estrutura do section 4.2)
// Nota: le do cache, nao recalcula

// leadScoring.recalculate — PROTEGIDO
// Input: { projectId: string, forceRefreshSheets?: boolean }
// Output: { status: 'ok'|'error', calculatedAt: string, scoreCount: number, warnings: string[] }
// Nota: dispara recalculo completo

// leadScoring.getStatus — PROTEGIDO
// Input: { projectId: string }
// Output: { lastCalculatedAt: string|null, needsRecalculation: boolean, staleSince?: number }
// Nota: staleness em horas baseado em refreshIntervalHours

// leadScoring.getAdvancedMetrics — PROTEGIDO
// Input: { projectId: string, entityType: 'campaign'|'adset'|'ad', entityId: string }
// Output: AdvancedMetrics (CPQL, ROAS proj, confianca, tendencia, ranking)

// leadScoring.getSemaphore — PROTEGIDO
// Input: { projectId: string }
// Output: { campaigns: {[id]: 'GREEN'|'YELLOW'|'RED'}, adsets: {...}, ads: {...} }
```

### 7.3 Router: `projectConfig` (expandido)

```typescript
// server/routers/projectConfig.ts

// projectConfig.get — PROTEGIDO
// Input: { projectId: string }
// Output: configuracao publica do projeto (sem tokens, sem pinHash)

// projectConfig.updateSheetsMapping — PROTEGIDO (admin only, futuro)
// Input: { projectId: string, sheetType: string, columnMapping: object }
// Output: { ok: true }
```

### 7.4 Backwards Compatibility

Os endpoints existentes (`meta.campaigns`, `meta.leadScoring.*`) devem permanecer funcionando. A autenticacao sera adicionada progressivamente:

**Fase 1:** Endpoints existentes continuam publicos. Novos endpoints ja nascem protegidos.
**Fase 2:** Migrar endpoints existentes para `projectProcedure`.
**Fase 3:** Remover `publicProcedure` de todos os endpoints de dados.

---

## 8. Storage — Onde Guardar o que

### 8.1 Decisao: JSON Files, Sem Banco de Dados

```
Tipo de dado                    Onde fica                                   Formato
─────────────────────────────   ─────────────────────────────────────────   ─────────
Configuracao de projetos        /opt/meta-ads-dashboard/projects.json       JSON
Scores calculados               /opt/meta-ads-dashboard/data/scores/        JSON (1 arquivo por projeto)
Cache de planilhas              /opt/meta-ads-dashboard/data/cache/         JSON (1 arquivo por planilha)
Sessions de autenticacao        /opt/meta-ads-dashboard/data/sessions/      JSON (1 arquivo por token)
Credenciais Service Account     /opt/meta-ads-dashboard/config/             JSON (gitignored, nunca no repo)
```

### 8.2 Estrutura de Diretorios no VPS

```
/opt/meta-ads-dashboard/
├── server/
│   ├── routers/
│   │   ├── auth.ts                  (NOVO)
│   │   ├── leadScoring.ts           (MODIFICADO)
│   │   ├── projectConfig.ts         (MODIFICADO)
│   │   └── meta.ts
│   ├── services/
│   │   ├── sheets-reader.ts         (NOVO)
│   │   ├── score-calculator.ts      (NOVO — encapsula leadScoring.ts)
│   │   ├── score-cache.ts           (NOVO — substitui leadScoringData.ts)
│   │   ├── advanced-metrics.ts      (NOVO)
│   │   ├── project-auth.ts          (NOVO)
│   │   └── jarvis-notifier.ts       (NOVO)
│   ├── leadScoring.ts               (MANTER — logica de scoring intacta)
│   ├── metaApi.ts
│   └── _core/
│       └── env.ts
├── client/
│   └── src/
│       └── pages/
│           └── Home.tsx             (MODIFICADO — adicionar login, semaforo, advanced metrics)
├── data/
│   ├── scores/                      (NOVO — gitignored)
│   │   └── {projectId}.json
│   ├── cache/                       (NOVO — gitignored)
│   │   └── {projectId}-{sheet}.json
│   └── sessions/                    (NOVO — gitignored)
│       └── {token}.json
├── config/                          (NOVO — gitignored)
│   └── service-account.json
├── docs/
│   └── ARCHITECTURE-LEAD-SCORE.md   (ESTE DOCUMENTO)
└── projects.json                    (MODIFICADO — adicionar sheets config + auth)
```

### 8.3 Por que nao SQLite?

- Sessions: volume baixo (<10 projetos, <10 sessoes simultaneas) — arquivo JSON e suficiente
- Scores: recalculados inteiros por projeto — 1 arquivo JSON por projeto e mais simples que queries
- Cache sheets: lido inteiro e descartado — nao tem vantagem em banco relacional

**SQLite seria justificado se:**
- Scores precisassem de historico temporal com queries (ex: "mostre a evolucao do score da campanha X nos ultimos 30 dias")
- Multiplos usuarios simultaneos escrevendo no mesmo projeto
- Necessidade de busca/filtro complexo nos dados crus das planilhas

Nenhuma dessas condicoes existe no escopo atual.

---

## 9. Decisoes Tecnologicas (ADRs)

### ADR-LS-1: Google Sheets API via `googleapis` npm package

**Contexto:** Precisamos ler planilhas. Opcoes: `googleapis` (oficial Google), fetch direto, ou `google-spreadsheet` (wrapper).

**Decisao:** `googleapis` npm package (SDK oficial).

**Racional:**
- Gerencia automaticamente autenticacao JWT da Service Account
- Tipos TypeScript inclusos
- Renovacao automatica de tokens (expira a cada 1h, googleapis renova transparentemente)
- `google-spreadsheet` e um wrapper adicional sem beneficio claro
- Fetch direto exigiria implementar JWT manualmente

**Instalacao:** `npm install googleapis`

---

### ADR-LS-2: bcryptjs para hash de PIN (nao argon2)

**Contexto:** Precisamos guardar o hash do PIN no projects.json.

**Decisao:** `bcryptjs` com cost factor 4.

**Racional:**
- PIN de 4-6 digitos ja tem espaco pequeno de busca — argon2 seria excessivo
- Cost factor 4 e rapido (~10ms) vs 10 (~100ms): o PIN e uma senha simples
- `bcryptjs` e pure JS, sem binarios nativos, mais facil em Docker
- `argon2` requer build tools no container — complexidade desnecessaria

---

### ADR-LS-3: Sessoes em JSON files (nao JWT nem Redis)

**Contexto:** Precisamos invalidar sessoes. JWT sem estado nao pode ser revogado.

**Decisao:** Sessao em arquivo JSON com token opaco (32 bytes hex).

**Racional:**
- JWT sem blacklist nao pode ser invalidado — risco de seguranca real
- Redis adicionaria um novo container — contraria o principio de simplicidade
- Arquivos JSON para <10 sessoes simultaneas: custo de I/O negligivel
- Invalidacao manual: `rm /opt/meta-ads-dashboard/data/sessions/*`
- Cleanup automatico: no startup do servidor, remover sessions expiradas

---

### ADR-LS-4: Recalculo sob demanda (nao cron)

**Contexto:** Quando recalcular os scores?

**Decisao:** Recalculo manual via botao no dashboard, sem cron.

**Racional:**
- Especialistas tomam decisoes 1-2x por semana — nao precisam de scores real-time
- Cron exigiria gerenciar erros assincronos sem interface (como notificar falha?)
- Recalculo manual e 100% previsivel: o usuario sabe quando os dados sao frescos
- O campo `staleSince` no response indica quantas horas os dados estao desatualizados

**Evolucao futura:** Se demandar automatizacao, adicionar endpoint `/trpc/leadScoring.scheduleRecalculate` que registra uma `recalculation-schedule.json` e um cron simples no servidor (setInterval de 1h verifica se algum projeto passou o `refreshIntervalHours`). Nao implementar agora.

---

### ADR-LS-5: `leadScoring.ts` existente nao e tocado

**Contexto:** `leadScoring.ts` (654 linhas) tem a logica de scoring validada em producao.

**Decisao:** Preservar intacto. Criar `score-calculator.ts` como adapter/orchestrator que chama as funcoes de `leadScoring.ts`.

**Racional:**
- O codigo funciona (foi validado contra dados reais de compradores)
- Mudar a logica de scoring e risco desnecessario nesta fase
- O `score-calculator.ts` orquestra: le dados dos sheets, normaliza, chama `leadScoring.ts`, escreve cache
- Se a logica precisar mudar, muda em `leadScoring.ts` isoladamente

---

### ADR-LS-6: Metrica de Confianca Estatistica — N minimo simples (nao chi-square)

**Contexto:** Precisamos de "confianca estatistica" nos scores. Opcoes: chi-square test, power analysis, ou N minimo heuristico.

**Decisao:** N minimo heuristico configuravel.

```
leadCount < 10    → VERY_LOW  (score informativo apenas)
leadCount 10-29   → LOW
leadCount 30-99   → MEDIUM
leadCount >= 100  → HIGH
```

**Racional:**
- Chi-square requer hipotese nula definida — complexidade para especialistas de marketing que nao sabem estatistica
- O especialista entende "30 leads e mais confiavel que 5" — linguagem humana
- Threshold configuravel em `scoring.minLeadsForConfidence`
- Evolucao futura: adicionar intervalos de confianca de Wilson quando houver demanda

---

## 10. Riscos Tecnicos

### Risco 1: Rate Limit da Meta Graph API
**Probabilidade:** Media | **Impacto:** Alto

O dashboard faz multiplas chamadas paralelas (campanhas + adsets + ads + insights). Com multiplos projetos sendo acessados simultaneamente, pode atingir limites.

**Mitigacao:**
- Manter o cache de insights existente (ja implementado)
- Nao adicionar novas chamadas Meta API no fluxo de recalculo de scores — scores vem das planilhas, nao da Meta
- Adicionar `X-Business-Use-Case-Usage` header monitoring nos logs

---

### Risco 2: Planilha com formato inesperado

**Probabilidade:** Alta | **Impacto:** Medio

Especialistas mudam colunas, adicionam abas, renomeiam headers. O `columnMapping` ficara desatualizado.

**Mitigacao:**
- O endpoint `leadScoring.getStatus` deve incluir `sheetsValidation: { missingColumns: [] }`
- Logar warnings claros quando coluna do mapping nao e encontrada
- Interface no dashboard mostrando quais colunas estao sendo lidas vs esperadas
- Nunca crashar o recalculo por coluna faltante — usar `null` e continuar

---

### Risco 3: Service Account com acesso bloqueado

**Probabilidade:** Baixa | **Impacto:** Alto (scores travados)

Se o especialista remover o compartilhamento da planilha com a SA, o recalculo falha.

**Mitigacao:**
- Erro 403 retorna mensagem clara: "Planilha nao acessivel. Compartilhe com {email_da_SA}"
- O dashboard exibe o ultimo calculo bem-sucedido do cache enquanto o problema nao e resolvido
- Documentar o email da SA na interface de configuracao do projeto

---

### Risco 4: `projects.json` crescendo sem controle

**Probabilidade:** Media | **Impacto:** Baixo

Cada projeto novo adiciona um bloco grande no JSON (sheets config, scoring params, etc.).

**Mitigacao:**
- Manter o schema atual: 1 arquivo, todos os projetos
- Se ultrapassar 20 projetos, migrar para `/opt/meta-ads-dashboard/config/projects/{id}.json` (1 arquivo por projeto)
- Nao pre-otimizar agora

---

### Risco 5: Sessoes em arquivo — contencao de escrita

**Probabilidade:** Muito Baixa | **Impacto:** Baixo

Multiplos logins simultaneos no mesmo projeto poderiam causar write contention.

**Mitigacao:**
- Cada sessao tem seu proprio arquivo (token unico como nome) — sem contencao
- Sem necessidade de file locking

---

### Risco 6: `leadScoringData.ts` sendo usado em producao durante a migracao

**Probabilidade:** Alta (e o estado atual) | **Impacto:** Medio

Durante a transicao, o sistema usa dados hardcoded. A migracao precisa ser atomica.

**Mitigacao:**
- Estrategia de feature flag: adicionar campo `useCalculatedScores: boolean` por projeto no `projects.json`
- Quando `false` (default): usa `leadScoringData.ts` (comportamento atual)
- Quando `true`: usa `score-cache.ts`
- Ativar projeto a projeto apos validacao manual dos scores calculados vs hardcoded

---

## 11. Estimativa de Complexidade

| Modulo | Complexidade | Horas Estimadas | Dependencias |
|--------|-------------|-----------------|--------------|
| `sheets-reader.ts` | Media | 6-8h | googleapis instalado |
| `score-calculator.ts` | Medio | 4-6h | sheets-reader, leadScoring.ts existente |
| `score-cache.ts` | Simples | 2-3h | nenhuma |
| `advanced-metrics.ts` | Medio | 5-8h | score-calculator |
| `project-auth.ts` | Simples | 3-4h | bcryptjs |
| `jarvis-notifier.ts` | Simples | 2-3h | fetch, server.js JARVIS |
| Novos routers tRPC | Simples | 3-4h | todos os servicos acima |
| Migracao `projects.json` | Simples | 1-2h | nenhuma |
| Frontend — Login UI | Simples | 3-4h | tRPC hooks |
| Frontend — Semaforo + Advanced Metrics | Medio | 6-8h | novos endpoints |
| Feature flag migration | Simples | 1-2h | score-cache |
| **TOTAL** | **Medio** | **36-52h** | |

**Classificacao por modulo:**
- **Simples** (<4h): implementacao direta, sem dependencias externas complexas
- **Medio** (4-8h): logica de negocio nao trivial, precisa de testes
- **Complexo** (>8h): nenhum neste escopo

---

## 12. Plano de Implementacao Sugerido

Ordenado para minimizar risco e maximizar valor entregavel por fase:

### Fase 1 — Fundacao (8-10h)
```
1. Instalar googleapis: npm install googleapis bcryptjs
2. Implementar score-cache.ts (le/escreve JSON)
3. Implementar project-auth.ts (middleware PIN)
4. Adicionar feature flag useCalculatedScores em projects.json
```

### Fase 2 — Integracao Sheets (10-14h)
```
5. Configurar Service Account no Google Cloud
6. Implementar sheets-reader.ts com column mapping dinamico
7. Expandir projects.json com sheets config para 1 projeto piloto
8. Testar leitura das 3 planilhas manualmente
```

### Fase 3 — Motor de Calculo (8-10h)
```
9. Implementar score-calculator.ts (orquestra sheets → leadScoring.ts → cache)
10. Implementar advanced-metrics.ts
11. Criar novos endpoints tRPC
12. Ativar useCalculatedScores: true para o projeto piloto
13. Validar scores calculados vs hardcoded
```

### Fase 4 — Frontend + Auth (9-12h)
```
14. Adicionar tela de login (PIN)
15. Adicionar semaforo visual (GREEN/YELLOW/RED) nas tabelas
16. Adicionar botao "Recalcular Scores"
17. Adicionar painel de Advanced Metrics
18. Proteger rotas existentes com session check
```

### Fase 5 — Notificacoes + Rollout (3-6h)
```
19. Implementar jarvis-notifier.ts
20. Testar alertas Telegram
21. Migrar projetos restantes (expandir projects.json)
22. Remover leadScoringData.ts quando todos projetos migrados
```

---

## Apendice A — Perguntas em Aberto

Estas questoes precisam de resposta do especialista de produto antes da implementacao:

1. **Normalizacao de telefone para matching:** Os telefones na planilha de compradores e na planilha de leads usam o mesmo formato? (ex: `(11) 99999-0001` vs `11999990001`) — precisamos de normalizacao.

2. **Periodo de calculo:** O score deve ser calculado em qual janela de tempo? Mes atual? Ultimos 30 dias? Configuravel por projeto?

3. **Matching sem UTM:** O que fazer com compradores que nao tem UTMs preenchidos? Ignorar, ou tentar matching por nome/telefone?

4. **Score historico:** Ha necessidade de guardar scores de periodos anteriores para comparar tendencias? Se sim, o schema de storage muda.

5. **Multiplos produtos por projeto:** O `projects.json` atual tem `products/tags`. O score deve ser por produto, ou unificado por projeto?

6. **Acesso do JARVIS ao meta-ads-dashboard:** O container `jarvis` precisa chamar endpoints do meta-ads-dashboard (ou vice-versa)? Definir se a comunicacao e por HTTP interno ou por arquivo compartilhado.

---

*Documento gerado por Aria (@architect) — AIOS Architect Agent v0.1.0*
*Revisao: pré-implementação — valide as perguntas do Apendice A antes de iniciar Fase 2*
