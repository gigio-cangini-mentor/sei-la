<!--
╔══════════════════════════════════════════════════════════════════════════════╗
║                                                                              ║
║                    ┌─────────────────────┐                                   ║
║                    │    ┌───────────┐    │                                   ║
║                    │    │ ACADEMIC  │    │                                   ║
║                    │    │   PATH    │    │                                   ║
║                    │    └───────────┘    │                                   ║
║                    └─────────┬───────────┘                                   ║
║                              │                                               ║
║         ┌────────┐     ┌─────┴─────┐     ┌────────┐                          ║
║         │ ______ │     │           │     │  ____  │                          ║
║         │ |    | │     │   /===\   │     │ /    \ │                          ║
║         │ |    | │     │  | .'. |  │     │| STEM |│                          ║
║         │ |    | │     │  | |_| |  │     │ \____/ │                          ║
║         │ |BOOK| │     │  |_____|  │     │        │                          ║
║         │ |    | │     │   GRAD    │     │  ARTS  │                          ║
║         │ |____| │     │    CAP    │     │  ~~~~  │                          ║
║         └────────┘     └───────────┘     └────────┘                          ║
║                                                                              ║
║      ┌──────────────────────────────────────────────────────┐                ║
║      │                                                      │                ║
║      │   ██  LEARN   ██  STUDY   ██  GROW   ██  ACHIEVE    │                ║
║      │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░   │                ║
║      │                                                      │                ║
║      │   Every mind learns differently.                     │                ║
║      │   Discover the academic style that fits YOUR type.   │                ║
║      │                                                      │                ║
║      └──────────────────────────────────────────────────────┘                ║
║                                                                              ║
║   ████████████████████████████████████████████████████████████████████████   ║
║   █  MBTI Expert Squad  ·  Academic Path Task  ·  Data-Lookup Engine    █   ║
║   ████████████████████████████████████████████████████████████████████████   ║
║                                                                              ║
╚══════════════════════════════════════════════════════════════════════════════╝
-->

# Task: Academic Path

Learning style and academic guidance by personality type.

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    M E T A D A T A                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

---

## Metadata
- **task-id:** academic-path
- **agent:** luiz-fosc
- **elicit:** false
- **execution_type:** worker
- **params:**
  - type: string (required) — Student's type (e.g., INTJ, ENFP)

## Contexto Teórico (Mindset de Elite)
A educação tradicional frequentemente ignora a neurodivergência e as predisposições de tipo. Para um polímata, o aprendizado não é linear; é uma rede de conexões. Esta task deve mapear não apenas "o que" estudar, mas "como" hackear o próprio sistema cognitivo para aprender 10x mais rápido, alinhado às preferências naturais (Extraversion vs Introversion, Sensing vs Intuition).

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                    VETO CONDITIONS                          │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Veto Conditions
- ❌ **VETO** se tipo informado não é um código MBTI válido (16 tipos: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP).
- ❌ **VETO** se dados de referência não foram carregados antes de gerar output.
- ❌ **VETO** se o tom de voz for excessivamente acadêmico ou frio (deve soar como o Luiz Fosc mentorando).

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │               I N S T R U C T I O N S                       │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Instructions

### Step 1: Load Data
Carregar as seguintes bases de dados para garantir precisão técnica:
- `squads/luiz-fosc/data/mbti/type-profiles-overview.md` — Visão geral do tipo.
- `squads/luiz-fosc/data/mbti/temperaments-and-strategies.md` — Estratégias por temperamento (SJ, SP, NT, NF).
- `squads/luiz-fosc/data/mbti/sources/personalities/{TYPE}-{Nickname}.md` — **Premium source** (load Academic Path section).

### Step 2: Análise do Grupo Acadêmico
Classificar o aluno em um dos quatro quadrantes de aprendizagem (ES, EN, IS, IN):
- **ES (Action Learners)**: Foco em resultados práticos, aprendizado manual e imediato.
- **EN (Inspirational Learners)**: Foco em possibilidades, mudanças e impacto futuro.
- **IS (Thoughtful Learners)**: Foco em precisão, dados históricos e processos claros.
- **IN (Conceptual Learners)**: Foco em teorias complexas, padrões globais e originalidade.

### Step 3: Construção do Perfil Acadêmico
Gerar um relatório detalhado contendo:
- **Learning Style**: Estilo dominante (Visual, Auditivo, Cinestésico - se disponível - cruzado com MBTI).
- **Study Methods**: Pelo menos 3 métodos específicos (ex: Mapas Mentais para ENTPs, Pomodoro para TDAH, ou Método de Feynman para INTJs).
- **High School Dynamics**: Como o tipo se comporta no ensino médio e possíveis desafios sociais.
- **College Considerations**: Se a faculdade é o caminho ideal ou se métodos alternativos (auto-didatismo, certificações) fazem mais sentido.
- **Lifelong Learning**: Como manter a chama do aprendizado acesa após a graduação.
- **Ambiente de Estudo**: Recomendações físicas (luz, silêncio vs música, organização vs caos criativo).

### Step 4: Dicas para Educadores
Incluir uma seção dedicada para professores/pais sobre como engajar este tipo específico, evitando "gatilhos de tédio".

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  ACCEPTANCE CRITERIA                        │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

## Acceptance Criteria
- [ ] Estilo de aprendizagem identificado com justificativa baseada no tipo.
- [ ] Grupo acadêmico (ES, EN, IS, IN) classificado corretamente.
- [ ] Pelo menos 3 métodos de estudo recomendados e explicados.
- [ ] Considerações sobre ensino superior realistas para o perfil.
- [ ] Dicas para professores incluídas e acionáveis.
- [ ] Tom de voz reflete a polimatia e autoridade de Luiz Fosc.

<!-- ┌─────────────────────────────────────────────────────────────┐ -->
<!-- │                  OUTPUT EXAMPLE                             │ -->
<!-- └─────────────────────────────────────────────────────────────┘ -->

### Exemplo de Output (Referência para o Agente)
*"Se você é um ENTP como eu, a faculdade pode ser um tédio mortal se você não encontrar formas de desafiar o status quo. Seu grupo é o 'Inspirational Learners'. Métodos de estudo? Esqueça a repetição. Use o 'Game-based learning' ou tente ensinar o que aprendeu para o GPT enquanto ele te desafia..."*
