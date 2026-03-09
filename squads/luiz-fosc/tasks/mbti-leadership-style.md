<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    ┌─────────────────────┐                                   ║
║                    │    ┌───────────┐    │                                   ║
║                    │    │ LEADERSHIP│    │                                   ║
║                    │    │   STYLE   │    │                                   ║
║                    │    └───────────┘    │                                   ║
║                    └─────────┬───────────┘                                   ║
║                              │                                               ║
║         ┌────────┐     ┌─────┴─────┐     ┌────────┐                          ║
║         │ ______ │     │           │     │  ____  │                          ║
║         │ |    | │     │   /===\   │     │ /    \ │                          ║
║         │ |    | │     │  | .'. |  │     │| TEAM |│                          ║
║         │ |    | │     │  | |_| |  │     │ \____/ │                          ║
║         │ |BOSS| │     │  |_____|  │     │        │                          ║
║         │ |    | │     │   CROWN   │     │  COLLAB│                          ║
║         │ |____| │     │    ICON   │     │  ~~~~  │                          ║
║         └────────┘     └───────────┘     └────────┘                          ║
║                                                                              ║
║      ┌──────────────────────────────────────────────────────┐                ║
║      │                                                      │                ║
║      │   ██  LEAD    ██  INSPIRE ██  MANAGE  ██  EXECUTE   │                ║
║      │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │                ║
║      │                                                      │                ║
║      │   Great leaders aren't born, they are understood.    │                ║
║      │   Understand your innate leadership signature.       │                ║
║      │                                                      │                ║
║      └──────────────────────────────────────────────────────┘                ║
║                                                                              ║
║   ████████████████████████████████████████████████████████████████████████   ║
║   █  MBTI Expert Squad  ·  Leadership Style  ·  Strategy Engine        █   ║
║   ████████████████████████████████████████████████████████████████████████   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
-->

# Task: Leadership Style

Identification of leadership signature, management approach, and blind spots.

---

## Metadata
- **task-id:** leadership-style
- **agent:** luiz-fosc
- **elicit:** false
- **execution_type:** worker
- **params:**
  - type: string (required) — Leader's personality type

## Contexto de Mentoria de Elite
Para Luiz Fosc, liderar é uma forma de "ilusionismo social": você precisa criar a realidade para sua equipe e garantir que todos vejam o valor do que está sendo construído. Líderes polímatas entendem que cada membro da equipe tem um "código fonte" (seu tipo MBTI) e um bom líder sabe como depurar esse código para extrair o máximo de performance sem queimar as pessoas (burnout). Liderança não é sobre poder, é sobre influência orquestrada.

## Veto Conditions
- ❌ **VETO** se tipo informado não é um código MBTI válido.
- ❌ **VETO** se a análise não incluir "Blind Spots" (Pontos Cegos).
- ❌ **VETO** se o relatório não for acionável (deve ter dicas práticas de gestão).
- ❌ **VETO** se ignorar a dinâmica de "Shadow Functions" sob estresse.

## Instructions

### Step 1: Data Synthesis & Baseline
Carregar os perfis de liderança de fontes premium para evitar generalismos:
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE}-{Nickname}.md` (Leadership section).
- `squads/luiz-fosc/data/mbti/temperaments-and-strategies.md` (Leadership styles per group).
- Validar se o líder possui traços de neurodivergência que possam amplificar ou mitigar as preferências de tipo.

### Step 2: Definir a Assinatura de Liderança (The Signature)
Identificar o arquétipo de liderança do tipo e como ele se projeta no palco corporativo:
- **ENTJ/ESTJ (The Commanders)**: Estrutura, hierarquia, eficiência brutal. Foco em "Getting things done".
- **ENFJ/ESFJ (The Mentors)**: Harmonia, desenvolvimento de pessoas, cultura organizacional.
- **INTJ/ISTJ (The Architects)**: Logística, sistemas de longo prazo, precisão técnica.
- **ENTP/ENFP (The Catalysts)**: Inovação, quebra de paradigmas, entusiasmo contagiante.

### Step 3: Dinâmica de Gestão e Tomada de Decisão
Descrever em profundidade como este líder opera nas trincheiras:
- **Gestão de Conflitos**: Ele enfrenta o problema de frente ou media pelas beiradas?
- **Tomada de Decisão**: Decisões baseadas em métricas frias (T) ou no impacto na moral do time (F)?
- **Delegação**: Ele delega a tarefa (micro) ou a responsabilidade pelo resultado (macro)?
- **Feedback Loop**: Como ele comunica erros e acertos sem perder a autoridade.

### Step 4: O Lado Sombrio (Shadow Leadership)
Identificar o que acontece quando este líder está sob estresse extremo (In the Grip):
- Quais funções cognitivas entram em colapso?
- Como o time percebe essa mudança brusca?
- 3 Red Flags específicas para o tipo monitorar em si mesmo.

### Step 5: Cold Reading - Dicas de Ilusionismo Social
O Luiz Fosc deve fornecer heurísticas de "Cold Reading" para o líder:
- Como ler o tipo MBTI dos seus liderados em 5 minutos de conversa.
- Qual "gatilho de autoridade" usar para cada temperamento (SJ, SP, NT, NF).
- Como usar a linguagem corporal para projetar a liderança necessária para cada situação.

### Step 6: Dicas de "Elite" (The Fosc Hack)
Uma dica final sobre como usar ferramentas de IA ou frameworks polímatas para automatizar a parte chata da gestão e focar na estratégia humana.

## Acceptance Criteria
- [ ] Assinatura de liderança claramente definida com analogias de alto impacto.
- [ ] Estilo de gestão de conflitos e decisão detalhado tecnicamente.
- [ ] Pelo menos 3 pontos cegos e 3 red flags de estresse identificados.
- [ ] Seção de "Cold Reading" incluída com o tom Fosc.
- [ ] Densidade garantida (> 110 linhas de conteúdo útil).
- [ ] Tom de voz reflete a polimatia e autoridade de Luiz Fosc.

## Exemplo de Output
*"Como um líder NT, você tem uma tendência perigosa de achar que todos na sala são tão lógicos quanto você. Spoiler: Não são. Sua assinatura é de 'Arquiteto de Sistemas'. Use isso a seu favor para criar processos, mas não esqueça que pessoas precisam de conexão antes de execução. Se você quer convencer um liderado 'F', pare de falar de números e comece a falar de impacto humano..."*
