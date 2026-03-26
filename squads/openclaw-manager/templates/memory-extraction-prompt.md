# Memory Extraction Prompt

> O usuario copia este prompt e cola no ChatGPT, Gemini ou Claude.
> A IA que ja tem memoria dele vai gerar um perfil estruturado.
> O usuario cola a resposta de volta e o setup usa os dados.

---

## Como Usar

1. **Copie o prompt abaixo** (secao "PROMPT PARA COPIAR")
2. **Cole no ChatGPT, Gemini ou Claude** (a IA que voce mais usa e que ja te conhece)
3. **Copie a resposta** que a IA gerar
4. **Cole de volta aqui** quando o setup pedir

---

## PROMPT PARA COPIAR

```
Preciso que voce faca algo especial: use TUDO que voce sabe sobre mim (das nossas conversas, da sua memoria, do que ja aprendeu sobre quem eu sou) para gerar um perfil completo meu.

Isso vai ser usado para configurar um agente de IA pessoal (um "AI COO") que vai me ajudar no dia-a-dia. Quanto mais preciso e detalhado, melhor o agente vai funcionar.

Responda EXATAMENTE no formato YAML abaixo. Preencha TODOS os campos com base no que voce sabe. Se nao souber algo com certeza, escreva "[NAO_SEI]" — nao invente.

---

```yaml
# ══════════════════════════════════════
# BLOCO 1: IDENTIDADE
# ══════════════════════════════════════
identidade:
  nome_completo: ""
  apelido_como_gosta_de_ser_chamado: ""
  profissao_principal: ""
  empresa_ou_negocio: ""
  descricao_do_negocio: ""          # O que faz, pra quem, como
  tamanho_equipe: ""                 # Sozinho, 2-5, 5-20, 20+
  cidade_pais: ""
  perfil_dominante: ""               # empreendedor / criador de conteudo / dev / gestor / freelancer / outro

# ══════════════════════════════════════
# BLOCO 2: ROTINA E HORARIOS
# ══════════════════════════════════════
rotina:
  timezone: ""                       # Ex: America/Sao_Paulo
  horario_trabalho: ""               # Ex: 8h-18h
  nao_perturbe: ""                   # Ex: 22h-7h
  dias_folga: ""                     # Ex: domingo
  blocos_foco: ""                    # Quando faz trabalho profundo
  melhor_hora_decisoes: ""           # Quando esta mais lucido
  rotina_matinal: ""                 # O que faz ao acordar
  exercicio_fisico: ""               # Se faz, quando, o que

  agenda_semanal:
    segunda: ""
    terca: ""
    quarta: ""
    quinta: ""
    sexta: ""
    sabado: ""
    domingo: ""

# ══════════════════════════════════════
# BLOCO 3: COMUNICACAO
# ══════════════════════════════════════
comunicacao:
  idioma_principal: ""               # pt-BR, en, es
  estilo_preferido: ""               # direto / detalhado / visual / analogias
  plataformas_que_usa:               # Lista
    - ""
  como_prefere_receber_info: ""      # Bullet points? Tabelas? Texto corrido?
  tamanho_ideal_mensagem: ""         # Curta / Media / Longa
  o_que_odeia_em_comunicacao:        # Lista
    - ""
  o_que_valoriza_em_comunicacao:     # Lista
    - ""
  usa_emoji: ""                      # Sim moderado / Sim muito / Nao / Depende

# ══════════════════════════════════════
# BLOCO 4: PERSONALIDADE E VALORES
# ══════════════════════════════════════
personalidade:
  tracos_dominantes:                 # 5 tracos que me definem
    - ""
    - ""
    - ""
    - ""
    - ""
  valores_centrais:                  # 3-5 valores inegociaveis
    - ""
    - ""
    - ""
  principio_guia: ""                 # A frase que resume como vivo/trabalho
  como_toma_decisoes: ""             # Dados? Intuicao? Conselho? Rapido? Demorado?
  relacao_com_risco: ""              # Avesso / Calculado / Arrojado
  o_que_motiva: ""                   # O que faz levantar da cama
  o_que_frustra: ""                  # O que tira do serio
  pontos_fortes:                     # 3 maiores forcas
    - ""
    - ""
    - ""
  pontos_fracos:                     # 3 maiores fraquezas (seja honesto)
    - ""
    - ""
    - ""

# ══════════════════════════════════════
# BLOCO 5: TRABALHO E OBJETIVOS
# ══════════════════════════════════════
trabalho:
  projetos_ativos:                   # Lista dos projetos atuais
    - nome: ""
      descricao: ""
      prioridade: ""                 # alta / media / baixa
  objetivos_principais:              # 3 objetivos mais importantes agora
    - ""
    - ""
    - ""
  maior_desafio_atual: ""           # O que mais tira sono
  como_mede_sucesso: ""             # KPI pessoal, metrica
  colaboradores_frequentes:          # Pessoas com quem mais trabalha
    - nome: ""
      papel: ""
      como_interagir: ""

# ══════════════════════════════════════
# BLOCO 6: FERRAMENTAS E INTEGRACOES
# ══════════════════════════════════════
ferramentas:
  usa_no_dia_a_dia:                  # Lista com prioridade
    - ferramenta: ""
      uso: ""
      prioridade: ""                 # essencial / frequente / ocasional
  gostaria_de_integrar:              # O que quer que o agente conecte
    - ""

# ══════════════════════════════════════
# BLOCO 7: PROIBICOES E PREFERENCIAS
# ══════════════════════════════════════
proibicoes:
  nunca_fazer:                       # Lista do que o agente NUNCA pode fazer
    - ""
  pet_peeves:                        # Coisas que irritam profundamente
    - ""
  como_ganhar_confianca: ""          # O que faz confiar em alguem/algo
  como_perder_confianca: ""          # O que destroi confianca instantaneamente

# ══════════════════════════════════════
# BLOCO 8: TOM DO AGENTE (como voce quer que ele fale)
# ══════════════════════════════════════
tom_do_agente:
  nome_desejado_pro_agente: ""       # Como quer chamar seu AI COO
  emoji_do_agente: ""                # Um emoji que represente
  personalidade_desejada: ""         # Ex: "direto e pratico, sem frescura"
  tom_desejado: ""                   # Ex: "informal, como um socio que entende do negocio"
  inspiracao_de_estilo: ""           # Alguem cujo estilo admira (pode ser pessoa, personagem, etc)
  nivel_proatividade: ""             # Reativo (so quando pedem) / Proativo (sugere) / Muito proativo (age)
  idioma_do_agente: ""               # Mesmo do dono ou diferente?
```

---

IMPORTANTE:
- Preencha com base no que REALMENTE sabe sobre mim
- Se nao tiver certeza, escreva [NAO_SEI] — nao invente
- Quanto mais detalhado, melhor
- Se lembrar de exemplos concretos das nossas conversas, inclua
- Os campos de lista podem ter quantos itens quiser
```

---

## Prompt Alternativo (Versao Curta)

Para usuarios que preferem algo mais rapido:

```
Use tudo que voce sabe sobre mim para gerar um perfil YAML completo.
O perfil vai configurar um agente de IA pessoal (AI COO).

Inclua: identidade, rotina, comunicacao, personalidade, valores, objetivos,
ferramentas, proibicoes, e como quero que o agente se comunique.

Formato: YAML estruturado. Se nao souber algo, escreva [NAO_SEI].
Quanto mais detalhado, melhor o agente vai funcionar.
```

---

## O que fazer com a resposta

Quando o usuario colar a resposta de volta:

1. **Parsear o YAML** — extrair todos os campos preenchidos
2. **Identificar [NAO_SEI]** — esses campos serao perguntados manualmente
3. **Validar dados** — checar se faz sentido (timezone existe, idioma valido, etc)
4. **Preencher templates** — usar os dados para popular USER.md, SOUL.md, IDENTITY.md
5. **Perguntar so o que falta** — gap-fill apenas dos campos [NAO_SEI]

### Mapa de Campos → Arquivos

| Bloco YAML | Alimenta qual arquivo |
|-----------|----------------------|
| identidade | USER.md, IDENTITY.md |
| rotina | USER.md, BOOT.md |
| comunicacao | USER.md, SOUL.md |
| personalidade | SOUL.md, USER.md |
| trabalho | USER.md |
| ferramentas | USER.md, IDENTITY.md |
| proibicoes | AGENTS.md, USER.md |
| tom_do_agente | SOUL.md, IDENTITY.md |
