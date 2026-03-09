<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    ┌─────────────────────┐                                   ║
║                    │    ┌───────────┐    │                                   ║
║                    │    │TEMPERAMENT│    │                                   ║
║                    │    │ ANALYSIS  │    │                                   ║
║                    │    └───────────┘    │                                   ║
║                    └─────────┬───────────┘                                   ║
║                              │                                               ║
║         ┌────────┐     ┌─────┴─────┐     ┌────────┐                          ║
║         │ ______ │     │           │     │  ____  │                          ║
║         │ |    | │     │   /===\   │     │ /    \ │                          ║
║         │ |    | │     │  | .'. |  │     │|SJ | SP|│                          ║
║         │ |    | │     │  | |_| |  │     │|NT | NF|│                          ║
║         │ |TRIBES|     │  |_____|  │     │ \____/ │                          ║
║         │ |    | │     │   CULTURE │     │  KEIRSEY                          ║
║         │ |____| │     │    CORE   │     │  ~~~~  │                          ║
║         └────────┘     └───────────┘     └────────┘                          ║
║                                                                              ║
║      ┌──────────────────────────────────────────────────────┐                ║
║      │                                                      │                ║
║      │   ██  SJ  ██  SP  ██  NT  ██  NF    ██  VIBE CHECK  │                ║
║      │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │                ║
║      │                                                      │                ║
║      │   Discover your core tribe.                          │                ║
║      │   Understand the driving force behind your actions.  │                ║
║      │                                                      │                ║
║      └──────────────────────────────────────────────────────┘                ║
║                                                                              ║
║   ████████████████████████████████████████████████████████████████████████   ║
║   █  MBTI Expert Squad  ·  Temperament Analysis  ·  Tribal Engine      █   ║
║   ████████████████████████████████████████████████████████████████████████   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
-->

# Task: Temperament Analysis

Analysis of core temperament groups (SJ, SP, NT, NF) based on Keirsey framework.

---

## Metadata
- **task-id:** temperament-analysis
- **agent:** luiz-fosc
- **elicit:** false
- **execution_type:** worker
- **params:**
  - type: string (required) — Person's personality type

## Contexto de Mentor Polímata (Tribos e Heurísticas)
No mundo real, as pessoas não se agrupam apenas por letras isoladas, mas por temperamentos fundamentais. É o que o Keirsey chama de "The 4 Tribes". Como um polímata que estuda o comportamento humano há décadas, Luiz Fosc sabe que se você errar o temperamento de um parceiro de negócios ou de um cliente, você erra a comunicação inteira. Esta task deve identificar a "assinatura tribal" do indivíduo e como ela dita as regras do jogo social. Não é sobre o que a pessoa faz, mas sobre o *porquê* ela faz o que faz.

## Veto Conditions
- ❌ **VETO** se a análise não classificar claramente o tipo em um dos 4 grupos (SJ, SP, NT, NF).
- ❌ **VETO** se não explicar os valores fundamentais e "drivers" do grupo.
- ❌ **VETO** se o tom for genérico e não usar analogias de impacto ou de elite.
- ❌ **VETO** se ignorar a relação entre temperamento e "Talento Natural".
- ❌ **VETO** se a análise for meramente descritiva sem ser prescritiva.

## Instructions

### Step 1: Tribe Identification & Core Values
Acessar `squads/luiz-fosc/data/mbti/temperaments-and-strategies.md` para carregar o DNA de cada tribo:
1.  **SJ (The Guardians/Guardiões)**: O pilar da sociedade (ESTJ, ISTJ, ESFJ, ISFJ). Foco em Logística, Tradição e Hierarquia. Driver: "Dever". Eles são os conservadores do sistema.
2.  **SP (The Artisans/Artesãos)**: O mestre da tática (ESTP, ISTP, ESFP, ISFP). Foco em Impacto Imediato, Liberdade e Habilidade Técnica. Driver: "Ação". Eles são os bombeiros e performers.
3.  **NT (The Rationals/Racionais)**: O arquiteto estratégico (ENTJ, INTJ, ENTP, INTP). Foco em Competência, Conhecimento e Lógica Sistêmica. Driver: "Competência". Eles são os cientistas e inventores.
4.  **NF (The Idealists/Idealistas)**: O catalisador humano (ENFJ, INFJ, ENFP, INFP). Foco em Propósito, Harmonia e Identidade. Driver: "Significado". Eles são os filósofos e conselheiros.

### Step 2: Análise Profunda de Drivers e Vibe
Gerar um relatório denso sobre os seguintes pontos:
- **The Hunger**: O que este temperamento "fome" (ex: NT tem fome de conhecimento; SJ tem fome de ordem).
- **Communication Style**: Como eles falam (Concreto vs Abstrato) e o que eles valorizam na fala (Pragmatismo vs Idealismo).
- **The Shadow Side**: Como este temperamento se comporta sob estresse severo (quando sua função inferior assume o controle).
- **Relationship Dynamics**: Com quem eles costumam colidir e por que (ex: NT vs SJ).

### Step 3: Career & Social Strategy
Onde este temperamento atinge a excelência polímata?
- **Career Sweet Spots**: Áreas onde o temperamento brilha sem esforço.
- **Leadership Role**: Como este temperamento lidera equipes e inspira confiança.

### Step 4: O Segredo da Mágica (Cold Reading do Fosc)
Dar uma dica de "leitura fria" (Cold Reading) sobre como identificar este temperamento rapidamente em uma mesa de reunião:
- **SJ**: Costumam usar roupas formais/tradicionais e chegam 5 minutos antes.
- **SP**: Estilo mais prático ou ousado, foco no aqui e agora.
- **NT**: Vocabulário técnico preciso, muitas perguntas de "como funciona".
- **NF**: Foco na cultura do time e no impacto emocional do projeto.

### Step 5: Casos de Uso Polímatas (Elite Implementation)
Descrever como usar este conhecimento em negociações reais:
- Como vender uma ideia para um NT (dados e lógica).
- Como vender uma ideia para um NF (propósito e impacto).
- Como vender uma ideia para um SJ (segurança e histórico).
- Como vender uma ideia para um SP (resultados rápidos e ação).

### Step 6: Integração de Habilidades
Como este temperamento pode "emprestar" habilidades de outras tribos para se tornar um indivíduo mais completo e versátil.

## Acceptance Criteria
- [ ] Temperamento corretamente identificado e justificado tecnicamente.
- [ ] Drivers fundamentais e valores explicados com autoridade.
- [ ] Estilo de comunicação detalhado em contextos profissionais.
- [ ] Resposta ao estresse (Shadow side) incluída e explicada.
- [ ] Dica de "Cold Reading" e "Casos de Uso" incluídos com o tom Fosc.
- [ ] Densidade e profundidade condizentes com o ecossistema Premium (> 120 linhas).

## Exemplo de Output
*"Se você é um NT, sua tribo é a dos 'Racionais'. Você não quer autoridade, você quer competência. Se o seu chefe é um SJ, ele quer hierarquia. Entender esse choque de temperamentos é a diferença entre ser promovido ou ser demitido por ser 'arrogante'. A dica de mágica? Repare no que a pessoa prioriza no primeiro minuto de conversa: se ela quer 'fazer certo' (SJ) ou 'fazer o que faz sentido' (NT)..."*
