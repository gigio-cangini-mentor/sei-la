# Koe Squad — Workflow Index

> Dan Koe's One-Person Business Methodology
> Version: 1.0.0 | Updated: 2026-02-14

---

## Quick Reference Table

| # | Workflow | Trigger | Phases | Duration | Agents | Complexity |
|---|---------|---------|--------|----------|--------|------------|
| 1 | [wf-content-pipeline](#1-wf-content-pipeline) | `*pipeline` | 4 | 3-5h/semana | chief→coletor→sintetizador→arquiteto→distribuidor | High |
| 2 | [wf-big-idea](#2-wf-big-idea) | `*big-idea` | 4 | 2-4h | chief→sintetizador→arquiteto | Medium |
| 3 | [wf-offer-creation](#3-wf-offer-creation) | `*offer` | 4 | 3-5 dias | chief→offers→brand→distribuidor | High |
| 4 | [wf-brand-architecture](#4-wf-brand-architecture) | `*brand` | 5 | 5-7 dias | chief→brand→offers→mindset | Very High |
| 5 | [wf-sovereignty-audit](#5-wf-sovereignty-audit) | `*audit` | 3 | 2-4h | chief→advisor→offers | Medium |
| 6 | [wf-content-cascade](#6-wf-content-cascade) | `*cascade` | 3 | 4-8h | chief→arquiteto→distribuidor | Medium |
| 7 | [wf-conscious-conditioning](#7-wf-conscious-conditioning) | `*rewire` | 4 | 3-5 dias | chief→mindset→advisor | High |
| 8 | [wf-queue-mastery](#8-wf-queue-mastery) | `*capture` | 3 | 1-2h setup | chief→coletor→sintetizador | Low |
| 9 | [wf-digital-economics](#9-wf-digital-economics) | `*economics` | 4 | 3-5 dias | chief→offers→brand→distribuidor | High |

---

## Decision Matrix — Quando Usar Qual Workflow

### Por Situacao do Operador

| Situacao | Workflow Recomendado | Razao |
|----------|---------------------|-------|
| "Nao sei por onde comecar" | `*audit` → `*brand` | Diagnosticar primeiro, depois construir fundacao |
| "Tenho ideias mas nao executo" | `*rewire` → `*capture` | Desbloquear padrao limitante, depois sistematizar captura |
| "Crio conteudo mas ninguem ve" | `*cascade` → `*pipeline` | Sistematizar distribuicao, depois criar pipeline semanal |
| "Nao sei o que vender" | `*audit` → `*offer` | Avaliar posicao, depois criar oferta alinhada |
| "Trabalho demais, ganho pouco" | `*audit` → `*economics` | Diagnosticar falta de leverage, redesenhar modelo |
| "Quero construir minha marca" | `*brand` → `*big-idea` | Arquitetura de brand, depois desenvolver ideias-chave |
| "Estou travado/estagnado" | `*rewire` → `*audit` | Trabalho interno primeiro, depois diagnostico externo |
| "Quero escalar sem equipe" | `*economics` → `*offer` | Redesenhar economia digital, depois criar ofertas escalaveis |

### Por Nivel de Maturidade

| Nivel | Descricao | Workflows Prioritarios (em ordem) |
|-------|-----------|----------------------------------|
| **Iniciante** | Comecando do zero, sem audiencia | `*audit` → `*brand` → `*capture` → `*cascade` |
| **Emergente** | Audiencia pequena, sem oferta | `*big-idea` → `*pipeline` → `*offer` |
| **Operacional** | Tem oferta e audiencia, mas sobrecarregado | `*audit` → `*economics` → `*cascade` |
| **Crescimento** | Negocio funciona, quer escalar sem equipe | `*economics` → `*offer` → `*pipeline` |
| **Soberano** | Negocio maduro, foco em otimizacao | `*audit` (trimestral) → `*rewire` → `*big-idea` |

---

## Workflow Dependency Map

```
                    ┌─────────────────┐
                    │   *audit         │ ← PONTO DE ENTRADA RECOMENDADO
                    │ Sovereignty Audit│
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
    ┌─────────────┐ ┌──────────────┐ ┌─────────────┐
    │   *brand    │ │  *economics  │ │   *rewire   │
    │ Brand Arch. │ │ Digital Econ.│ │  Conditioning│
    └──────┬──────┘ └──────┬───────┘ └──────┬──────┘
           │               │                │
           ▼               ▼                ▼
    ┌─────────────┐ ┌──────────────┐ ┌─────────────┐
    │ *big-idea   │ │   *offer     │ │  *capture   │
    │ Big Idea Dev│ │ Offer Create │ │Queue Mastery│
    └──────┬──────┘ └──────┬───────┘ └──────┬──────┘
           │               │                │
           └───────┬───────┘                │
                   ▼                        │
           ┌──────────────┐                 │
           │  *cascade    │◄────────────────┘
           │Content Cascade│
           └──────┬───────┘
                  │
                  ▼
           ┌──────────────┐
           │  *pipeline   │ ← CICLO SEMANAL RECORRENTE
           │Content Pipeline│
           └──────────────┘
```

### Dependencias Explicitas

| Workflow | Depende de (recomendado) | Alimenta |
|----------|--------------------------|----------|
| `*audit` | Nenhum (ponto de entrada) | `*brand`, `*economics`, `*rewire`, `*offer` |
| `*brand` | `*audit` (diagnostico) | `*big-idea`, `*offer` |
| `*economics` | `*audit` (diagnostico) | `*offer`, `*cascade` |
| `*rewire` | Nenhum (pode ser standalone) | `*capture`, `*cascade`, `*brand` |
| `*big-idea` | `*capture` (queue de ideias) | `*cascade` |
| `*offer` | `*audit` ou `*economics` | `*cascade`, `*pipeline` |
| `*capture` | Nenhum (sistema basico) | `*big-idea`, `*pipeline` |
| `*cascade` | `*big-idea` (Big Idea validada) | `*pipeline` |
| `*pipeline` | `*capture` + `*cascade` (sistemas) | Ciclo semanal continuo |

---

## Detalhamento dos Workflows

### 1. wf-content-pipeline
**Weekly Content Pipeline** | Trigger: `*pipeline` | 4 Phases

Pipeline semanal completo de producao de conteudo — do consumo curado ate a distribuicao final.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Queue Processing | koe-chief + koe-coletor | Processar queue semanal, selecionar temas |
| PHASE-1 | Synthesis | koe-sintetizador | Sintetizar inputs em insights acionaveis |
| PHASE-2 | Deep Work Production | koe-arquiteto | Produzir conteudo long-form + derivados |
| PHASE-3 | Distribution | koe-distribuidor | Distribuir, agendar, engajar |

**Frameworks**: Fill/Empty/Use Brain Cycle, Queue System, Content Cascade
**Frequencia**: Semanal (ciclo recorrente)
**Output**: 1 newsletter + 1 long-form + 5-10 social pieces/semana

---

### 2. wf-big-idea
**Big Idea Development** | Trigger: `*big-idea` | 4 Phases

Desenvolvimento aprofundado de uma Big Idea — de conceito bruto ate framework empacotado e memoravel.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Idea Mining | koe-chief | Selecionar ideia bruta da queue |
| PHASE-1 | Research & Connection | koe-sintetizador | Pesquisar, conectar com ideias existentes |
| PHASE-2 | Framework Development | koe-arquiteto | Estruturar em framework nomeado |
| PHASE-3 | Validation & Polish | koe-arquiteto | Testar, refinar, empacotar |

**Frameworks**: Smart Notes, Iceberg Model, Digital Renaissance
**Frequencia**: Sob demanda (quando queue acumula ideias promissoras)
**Output**: Big Idea empacotada com nome, framework, exemplos, e cascade skeleton

---

### 3. wf-offer-creation
**Irresistible Offer Creation** | Trigger: `*offer` | 4 Phases

Criacao de oferta irresistivel usando a intersecao de expertise + audiencia + transformacao.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Offer Discovery | koe-chief | Identificar gap no mercado e na value ladder |
| PHASE-1 | Offer Engineering | koe-offers | Engenharia da transformacao, pricing, garantia |
| PHASE-2 | Brand Alignment | koe-brand | Alinhar oferta com brand narrative |
| PHASE-3 | Launch Preparation | koe-distribuidor | Preparar lancamento e distribuicao |

**Frameworks**: Traffic + Offers = Business, Leverage Stack, Value Creator Paradigm
**Frequencia**: Sob demanda (nova oferta ou redesign)
**Output**: Oferta completa com pricing, copy, garantia, e plano de lancamento

---

### 4. wf-brand-architecture
**Personal Brand Architecture** | Trigger: `*brand` | 5 Phases

Arquitetura completa de marca pessoal — de posicionamento ate sistema visual e narrativo.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Identity Foundation | koe-chief | Definir quem voce e, para quem, e por que |
| PHASE-1 | Positioning | koe-brand | Posicionamento unico no mercado |
| PHASE-2 | Offer Ecosystem | koe-offers | Alinhar ofertas com brand |
| PHASE-3 | Narrative Design | koe-brand + koe-mindset | Historia, valores, voz |
| PHASE-4 | Visual & System | koe-brand | Sistema visual, templates, guidelines |

**Frameworks**: Digital Renaissance, Iceberg Model, One-Person Business Architecture
**Frequencia**: 1x (fundacao) + updates trimestrais
**Output**: Brand Bible completo com posicionamento, narrativa, visual, e guidelines

---

### 5. wf-sovereignty-audit
**Sovereign Business Audit** | Trigger: `*audit` | 3 Phases

**Arquivo**: `wf-sovereignty-audit.yaml`

Diagnostico completo de soberania — avalia 5 dimensoes de liberdade e cria roadmap de otimizacao.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Sovereignty Assessment | koe-chief + koe-advisor | Avaliar 5 dimensoes (tempo, localizacao, renda, criativa, crescimento) |
| PHASE-1 | Business Model Analysis | koe-advisor | Analisar Traffic, Offers, Leverage Stack, Revenue Architecture |
| PHASE-2 | Offer Optimization | koe-offers | Redesenhar ofertas + Roadmap de 90 dias |

**Frameworks**: Sovereignty Test, One-Person Business Architecture, Traffic + Offers, Leverage Stack
**Frequencia**: Trimestral ou sob demanda
**Output**: Sovereignty Scorecard + Business Model Analysis + Optimization Roadmap 90 dias
**Veto Principal**: Qualquer recomendacao que reduza soberania = HALT

---

### 6. wf-content-cascade
**Content Cascade Engine** | Trigger: `*cascade` | 3 Phases

**Arquivo**: `wf-content-cascade.yaml`

Engine para transformar 1 Big Idea em cascata multi-plataforma. Modelo 1h de deep work = 10h+ de conteudo distribuido.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Big Idea Selection | koe-chief + koe-arquiteto | Selecionar e validar Big Idea, criar cascade skeleton |
| PHASE-1 | Content Architecture | koe-arquiteto | Produzir newsletter (APAG) + long-form + fragmentos sociais |
| PHASE-2 | Multi-Platform Distribution | koe-distribuidor | Adaptar, agendar, distribuir, engajar |

**Frameworks**: Content Cascade, APAG Structure, Social Matrix, 1h→10h Distribution
**Frequencia**: Semanal (ciclo de producao)
**Output**: 1 Newsletter + 1 Long-form + 5-10 Social Pieces + Distribution Calendar
**Veto Principal**: Nenhuma distribuicao sem Big Idea forte no centro

---

### 7. wf-conscious-conditioning
**Conscious Conditioning Protocol** | Trigger: `*rewire` | 4 Phases

**Arquivo**: `wf-conscious-conditioning.yaml`

Protocolo de reprogramacao consciente de padroes mentais, habitos e identidade.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Pattern Recognition | koe-chief | Identificar padrao limitante (5 camadas de arqueologia) |
| PHASE-1 | Conditioning Session | koe-mindset | 5 etapas: Recognize→Reframe→Design→Repeat→Reward |
| PHASE-2 | Habit Architecture | koe-mindset | Redesenhar ambiente + Habit Loop Blueprint |
| PHASE-3 | Integration Counsel | koe-advisor | Conectar mudanca com negocios + Integration Plan 90 dias |

**Frameworks**: Conscious Conditioning Process, Habit Loop Mastery, Polarity Principle, Autoprogramming
**Frequencia**: Sob demanda (quando padrao limitante identificado)
**Output**: Pattern Audit + Conditioning Session + Habit Blueprint + Integration Plan 90 dias
**Veto Principal**: Nenhum conditioning que crie dependencia externa

---

### 8. wf-queue-mastery
**Queue Mastery System** | Trigger: `*capture` | 3 Phases

Sistema de captura e organizacao de ideias usando o Queue System de Dan Koe.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Queue Setup | koe-chief + koe-coletor | Configurar sistema de captura (tools, triggers, categories) |
| PHASE-1 | Capture Protocol | koe-coletor | Definir protocolo de captura diaria |
| PHASE-2 | Processing & Synthesis | koe-sintetizador | Processar queue em insights acionaveis |

**Frameworks**: The Queue System, Fill/Empty/Use Brain Cycle, 80/20 Consumption
**Frequencia**: 1x setup + processamento semanal
**Output**: Queue System configurado + Processing Protocol + Template Library

---

### 9. wf-digital-economics
**Digital Economics System** | Trigger: `*economics` | 4 Phases

Redesenho do modelo economico do negocio para maximizar leverage e receita digital.

| Phase | Nome | Agent | Descricao |
|-------|------|-------|-----------|
| PHASE-0 | Economic Diagnostic | koe-chief | Diagnosticar modelo economico atual |
| PHASE-1 | Revenue Architecture | koe-offers | Redesenhar arquitetura de receita |
| PHASE-2 | Brand Economics | koe-brand | Alinhar brand com modelo economico |
| PHASE-3 | Distribution Economics | koe-distribuidor | Otimizar custo de aquisicao e distribuicao |

**Frameworks**: Traffic + Offers, Leverage Stack, One-Person Business Architecture
**Frequencia**: Semestral ou sob demanda
**Output**: Economic Diagnostic + Revenue Architecture + Brand Economics Report + Distribution Plan

---

## Mental Models Reference

Os workflows do Koe Squad sao construidos sobre estes modelos mentais:

| Mental Model | Workflows que Usam | Descricao |
|-------------|---------------------|-----------|
| **Traffic + Offers = Business** | `*audit`, `*offer`, `*economics` | Equacao fundamental: sem trafego ou sem oferta, nao ha negocio |
| **The Queue System** | `*capture`, `*pipeline`, `*cascade` | Captura sistematica de ideias como materia-prima criativa |
| **Fill/Empty/Use Brain Cycle** | `*pipeline`, `*capture` | Consumir com intencao, processar, criar — ciclo diario |
| **APAG Structure** | `*cascade`, `*pipeline`, `*big-idea` | Attention-Perspective-Advantage-Gamify para conteudo |
| **Digital Renaissance** | `*brand`, `*big-idea` | Polimata moderno: multiplos interesses convergindo em 1 brand |
| **Conscious Conditioning** | `*rewire` | Reprogramacao de padroes via reconhecimento consciente |
| **The Leverage Stack** | `*audit`, `*economics`, `*offer` | Brand→Products→Content Systems→Automation (4 camadas) |
| **Iceberg Model** | `*rewire`, `*brand` | Superficie visivel vs. profundidade invisivel |
| **Polarity Principle** | `*rewire` | Toda verdade tem polo oposto igualmente verdadeiro |
| **Content Cascade** | `*cascade`, `*pipeline` | 1 Big Idea → multiplos formatos → multiplas plataformas |

---

## Agent Participation Map

| Agent | Tier | Workflows (como primary) | Workflows (como secondary) |
|-------|------|--------------------------|---------------------------|
| koe-chief | T0 | Todos (Phase 0) | `*audit` |
| koe-coletor | T1 | `*capture`, `*pipeline` | — |
| koe-sintetizador | T1 | `*big-idea`, `*capture` | `*pipeline` |
| koe-arquiteto | T1 | `*cascade`, `*big-idea`, `*pipeline` | `*cascade` (Phase 0) |
| koe-distribuidor | T1 | `*cascade`, `*pipeline`, `*offer`, `*economics` | — |
| koe-offers | T2 | `*offer`, `*audit`, `*economics` | `*brand` |
| koe-brand | T2 | `*brand`, `*economics` | `*offer` |
| koe-mindset | T2 | `*rewire` | `*brand` |
| koe-advisor | T3 | `*audit` | `*rewire` |

---

## Criacao e Manutencao

- **Criado**: 2026-02-14
- **Squad**: Koe (Dan Koe's One-Person Business)
- **Total de Workflows**: 9
- **Implementados (YAML)**: 3 (`wf-sovereignty-audit`, `wf-content-cascade`, `wf-conscious-conditioning`)
- **Planejados**: 6 (`wf-content-pipeline`, `wf-big-idea`, `wf-offer-creation`, `wf-brand-architecture`, `wf-queue-mastery`, `wf-digital-economics`)

---

*Criado com Squad Creator do AIOSPRO por @oalanicolas e @pedrovalerio | 2026-02-14*
