# USER.md — Perfil de {{OWNER_NAME}}

> Tudo sobre meu dono. Quanto mais eu sei, melhor eu sirvo.
> Minimo 200 linhas. Ideal: 400+. Cada detalhe conta.

---

## Identidade

<!-- INSTRUCOES: Dados do bloco 1 (identidade) do Memory Extraction.
     Se algum campo veio como [NAO_SEI], perguntar no gap-fill. -->

| Campo | Valor |
|-------|-------|
| **Nome completo** | {{OWNER_FULL_NAME}} |
| **Profissao** | {{OWNER_PROFESSION}} |
| **Empresa/Negocio** | {{OWNER_COMPANY}} |
| **Tamanho da equipe** | {{TEAM_SIZE}} |
| **Perfil** | {{OWNER_PROFILE_TYPE}} |
| **Cidade/Pais** | {{LOCATION}} |

---

## Negocios e Trabalho

<!-- INSTRUCOES: Dados do bloco 5 (trabalho) do Memory Extraction.
     "O que faz" = descricao_do_negocio do bloco 1.
     "Projetos ativos" = lista do bloco 5.
     "Objetivos" = objetivos_principais do bloco 5.
     Quanto mais contexto, melhor o agente performa. Nao economize texto. -->

### O que faz
{{BUSINESS_DESCRIPTION}}

### Projetos ativos
{{ACTIVE_PROJECTS}}

### Objetivos principais
{{MAIN_GOALS}}

### Equipe e colaboradores
{{TEAM_DESCRIPTION}}

---

## Rotina e Horarios

<!-- INSTRUCOES: Dados do bloco 2 (rotina) do Memory Extraction.
     A tabela de agenda semanal e o principal insumo pro BOOT.md.
     Blocos de foco = quando o dono faz deep work (nao interromper).
     Melhor hora pra decisoes = quando apresentar opcoes estrategicas. -->

| Dia | Horario trabalho | Notas |
|-----|-----------------|-------|
| Segunda | {{MON_SCHEDULE}} | {{MON_NOTES}} |
| Terca | {{TUE_SCHEDULE}} | {{TUE_NOTES}} |
| Quarta | {{WED_SCHEDULE}} | {{WED_NOTES}} |
| Quinta | {{THU_SCHEDULE}} | {{THU_NOTES}} |
| Sexta | {{FRI_SCHEDULE}} | {{FRI_NOTES}} |
| Sabado | {{SAT_SCHEDULE}} | {{SAT_NOTES}} |
| Domingo | {{SUN_SCHEDULE}} | {{SUN_NOTES}} |

| Config | Valor |
|--------|-------|
| **Timezone** | {{TIMEZONE}} |
| **Horario nao-perturbe** | {{NAO_PERTURBE}} |
| **Blocos de foco** | {{FOCUS_BLOCKS}} |
| **Melhor hora pra decisoes** | {{DECISION_TIME}} |

---

## Estilo de Comunicacao

<!-- INSTRUCOES: Dados do bloco 3 (comunicacao) do Memory Extraction.
     Esta secao alimenta diretamente o SOUL.md (secao "Como Eu Comunico").
     "O que ODEIA" e critico — vira anti-pattern no SOUL.md.
     "O que VALORIZA" vira regra positiva no SOUL.md. -->

### Como prefere receber informacao
{{COMMUNICATION_STYLE}}

### Plataformas que usa
{{PLATFORMS}}

### O que ODEIA em comunicacao
{{COMMUNICATION_HATES}}

### O que VALORIZA em comunicacao
{{COMMUNICATION_VALUES}}

---

## Filosofia e Valores

<!-- INSTRUCOES: Dados do bloco 4 (personalidade) do Memory Extraction.
     Valores centrais = valores_centrais (inegociaveis).
     Principio guia = A FRASE que resume como o dono vive/trabalha.
     Esta secao alimenta "Minha Filosofia" no SOUL.md. -->

### Valores centrais
{{CORE_VALUES}}

### Principio guia
{{GUIDING_PRINCIPLE}}

### Como esses valores afetam decisoes
{{VALUES_IN_PRACTICE}}

---

## Integracoes e Ferramentas

| Ferramenta | Uso | Prioridade |
|-----------|-----|-----------|
{{TOOLS_TABLE}}

---

## Proibicoes Explicitas

<!-- INSTRUCOES: Dados do bloco 7 (proibicoes) do Memory Extraction.
     nunca_fazer = vira items no "NUNCA Fazer" do AGENTS.md.
     pet_peeves = vira anti-patterns no SOUL.md.
     Estas proibicoes tem FORCA DE LEI no agente. -->

O que meu dono PROIBIU expressamente:
{{EXPLICIT_PROHIBITIONS}}

---

## Preferencias Pessoais

<!-- INSTRUCOES: Dados do bloco 4 (personalidade) e bloco 7 (proibicoes).
     o_que_motiva e o_que_frustra do bloco 4.
     como_ganhar_confianca e como_perder_confianca do bloco 7.
     Esta secao e o "cheat code" do agente — saber o que agrada e o que irrita. -->

### O que gosta / motiva
{{LIKES_AND_MOTIVATIONS}}

### O que irrita / frustra
{{IRRITATIONS}}

### Como ganhar a confianca dele(a)
{{HOW_TO_EARN_TRUST}}

### O que chama a atencao dele(a)
{{ATTENTION_GRABBERS}}

---

## Contexto Extra

> Informacoes adicionais que ajudam a entender melhor o dono.
> Quanto mais contexto, melhor a performance do agente.

{{EXTRA_CONTEXT}}

---
*Gerado pelo openclaw-manager | {{DATE}}*
*Fonte: Memory Extraction Prompt + Complemento manual*
