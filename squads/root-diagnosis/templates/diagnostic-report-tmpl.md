# Relatorio Diagnostico: {{problem_title}}

**Diagnostic ID:** {{diagnostic_id}}
**Data:** {{date}}
**Modo:** {{mode}} (Full / Quick)
**Fases executadas:** {{phases_executed}}
**Confianca geral:** {{confidence_level}}%
**Cliente do diagnostico:** {{client}}

---

## Como Ler Este Relatorio

Este relatorio foi produzido por uma equipe de 13 agentes especializados, cada um trazendo uma perspectiva diferente sobre o problema analisado. Antes de mergulhar nos detalhes, aqui esta um guia rapido:

### Estrutura do relatorio

O relatorio esta organizado em **4 grandes blocos**, do mais resumido ao mais detalhado:

| Bloco | Secoes | Para quem |
|-------|--------|-----------|
| **Resumo** | Secoes 1-2 | Para quem quer a essencia em 5 minutos |
| **Analise** | Secoes 3-10 | Para quem quer entender COMO chegamos as conclusoes |
| **Acao** | Secoes 11-15 | Para quem quer saber O QUE FAZER agora (inclui proximos squads recomendados) |
| **Referencia** | Secoes 16-18 + Anexos | Para quem quer ir fundo nos dados e metodologia |

> **Dica:** Se voce tem pouco tempo, leia apenas as secoes 1, 2, 10 e 15 (Sumario, Problema Real, Causas-Raiz e Recomendacoes). Juntas, elas contam a historia completa em ~10 minutos.

### Termos-chave que voce vai encontrar

Ao longo do relatorio, usamos alguns termos tecnicos que vale a pena conhecer antes de comecar:

| Termo | O que significa |
|-------|----------------|
| **Causa-raiz** | A causa FUNDAMENTAL do problema — nao o que voce ve acontecendo (isso e o sintoma), mas o que GERA o que voce ve. Pense nisso como a raiz de uma arvore: voce ve os galhos secos (sintomas), mas a causa esta na raiz, invisivel debaixo da terra. |
| **Causa adjacente** | Um problema que contribui para piorar a situacao, mas que sozinho nao causaria o problema principal. E como chuva forte para uma casa com telhado furado — a chuva piora, mas o problema real e o furo no telhado. |
| **Sintoma** | O que voce PERCEBE e SENTE do problema — a manifestacao visivel. Dor de cabeca e sintoma; a causa pode ser desidratacao, estresse ou algo mais serio. Tratar sintoma e tomar analgesico. Tratar causa e resolver o problema de verdade. |
| **Reframing** | Mudar a forma como olhamos para o problema. As vezes, a maneira como descrevemos o problema nos impede de ver a solucao. Reframear e como trocar a lente dos oculos — o cenario e o mesmo, mas voce passa a enxergar coisas que antes nao via. |
| **Confianca do diagnostico** | O grau de certeza que temos sobre nossas conclusoes, expresso em porcentagem. 90%+ = alta certeza. 70-89% = boa certeza com algumas lacunas. 50-69% = hipotese forte, mas precisa de mais dados. Abaixo de 50% = preliminar. |
| **POV (Point of View)** | Uma frase que resume: quem sofre com o problema + o que realmente precisa + por que (o insight que o diagnostico revelou). Funciona como bussola para qualquer acao futura. |
| **Cynefin** | Um modelo para classificar TIPOS de problemas. Alguns problemas sao simples (tem solucao obvia), outros sao complicados (precisam de expertise), outros sao complexos (nao tem resposta certa, precisa experimentar). Saber o TIPO do problema determina o METODO certo para resolve-lo. |

---

## BLOCO 1 — RESUMO

---

## 1. Sumario Executivo

> Esta secao condensa TUDO em uma unica pagina. Se voce so puder ler uma secao, leia esta.

{{executive_summary}}

| Dimensao | Detalhe |
|----------|---------|
| **Problema declarado** | {{declared_problem}} |
| **Problema real (reframeado)** | {{real_problem}} |
| **Tipo de problema** | {{cynefin_domain}} |
| **Causas-raiz (top 3)** | {{top_3_root_causes}} |
| **Confianca** | {{confidence_level}}% |
| **Recomendacao primaria** | {{primary_recommendation}} |

> **Veredicto em uma frase:** {{one_sentence_verdict}}

**O que isso significa na pratica:**

{{executive_practical_meaning}}

---

## 2. Evolucao do Problema — A Jornada do Entendimento

> **Por que esta secao existe?** Na maioria das vezes, o problema que voce ACHA que tem nao e o problema REAL. Esta secao mostra como, fase apos fase, fomos descascando as camadas do problema ate chegar a raiz. E como uma investigacao: cada etapa revela algo novo que muda o entendimento anterior.

### A linha do tempo do entendimento

Como o entendimento do problema evoluiu ao longo do diagnostico:

| Fase | Especialista | O que entendemos naquela fase | O que mudou |
|------|-------------|-------------------------------|-------------|
| 0 — Entrada | Diagnostic Orchestrator | {{initial_understanding}} | Ponto de partida |
| 1 — Classificacao | Dave Snowden | {{post_classification}} | {{change_1}} |
| 1.5 — Viabilidade | Stafford Beer | {{post_viability}} | {{change_1_5}} |
| 2 — Cultura | Edgar Schein | {{post_culture}} | {{change_2}} |
| 3 — Pressupostos | Chris Argyris | {{post_assumptions}} | {{change_3}} |
| 3.5 — Dinamica Sistemica | Peter Senge | {{post_system_dynamics}} | {{change_3_5}} |
| 4 — Reframing | Thomas Wedell-Wedellsborg | {{post_reframing}} | {{change_4}} |
| 5 — Diagnostico Profundo | {{phase5_agent}} | {{post_diagnosis}} | {{change_5}} |
| 6 — Causa-Raiz | {{phase6_agent}} | {{post_rca}} | {{change_6}} |
| 7 — Quantificacao | Douglas Hubbard | {{post_quantification}} | {{change_7}} |
| 8 — Stress Test | Gary Klein | {{post_stress_test}} | {{change_8}} |
| 9 — Empacotamento | Min Basadur | {{post_packaging}} | {{change_9}} |

**Nota:** Fases opcionais nao executadas sao marcadas com "N/A — fase pulada" na coluna de entendimento.

**Em linguagem simples:** {{problem_evolution_narrative}}

---

## BLOCO 2 — ANALISE (Como Chegamos a Essas Conclusoes)

---

## 3. Classificacao do Problema (Phase 1 — Cynefin)

> **O que e esta secao?** Antes de tentar resolver qualquer problema, precisamos entender que TIPO de problema estamos enfrentando. Imagine que voce esta doente: dependendo do tipo de doenca (viral, bacteriana, cronica, aguda), o tratamento e completamente diferente. O mesmo vale para problemas de negocio, organizacionais ou tecnicos. Usar o metodo errado para o tipo errado de problema e pior do que nao fazer nada.

> **O que e o Cynefin?** E um modelo criado por Dave Snowden que classifica problemas em 4 tipos:
> - **Simples (Clear):** A relacao causa-efeito e obvia. Solucao: aplicar a melhor pratica conhecida. Exemplo: pneu furado — troque o pneu.
> - **Complicado (Complicated):** A causa existe mas precisa de expertise para encontra-la. Solucao: chamar um especialista. Exemplo: motor falhando — leve ao mecanico.
> - **Complexo (Complex):** Nao ha uma resposta certa. Multiplos fatores interagem de formas imprevisiveis. Solucao: experimentar, observar, ajustar. Exemplo: entrar em um novo mercado — teste hipoteses.
> - **Caotico (Chaotic):** Nao ha padrao, tudo muda o tempo todo. Solucao: agir primeiro para estabilizar, depois analisar. Exemplo: crise inesperada — contenha primeiro, entenda depois.

### Classificacao deste problema

- **Tipo de problema:** {{cynefin_domain}} (Clear / Complicated / Complex / Chaotic / Disorder)
- **Justificativa:** {{domain_reasoning}}
- **O que isso implica para o diagnostico:** {{domain_implication}}
- **Condicoes de fronteira:** {{boundary_conditions}}

### Indicadores que observamos

| O que analisamos | Presente? | Evidencia observada |
|-----------------|-----------|---------------------|
| A relacao causa-efeito e rastreavel? | {{indicator_1}} | {{evidence_1}} |
| Especialistas concordam sobre a natureza do problema? | {{indicator_2}} | {{evidence_2}} |
| Ha multiplas perspectivas divergentes sobre o problema? | {{indicator_3}} | {{evidence_3}} |
| O ambiente e instavel, sem padrao claro? | {{indicator_4}} | {{evidence_4}} |

### Decisao de roteamento (Decision Point 1)

Com base nesta classificacao, decidimos qual metodo usar na fase seguinte:

- **Metodo selecionado:** {{dp1_method}} (CRT / SSM / Ambos sequenciais)
- **Especialista ativado:** {{dp1_agent}}
- **Por que este metodo?** {{dp1_rationale}}

**Em linguagem simples:** {{cynefin_plain_language_summary}}

---

## 4. Avaliacao de Viabilidade Organizacional (Phase 1.5 — Stafford Beer)

> **Status:** {{phase1_5_status}} (Executada / Pulada — justificativa: {{phase1_5_skip_reason}})

> **O que e esta secao?** Antes de diagnosticar POR QUE algo nao funciona, precisamos verificar se a estrutura organizacional e VIAVEL — ou seja, se tem os componentes necessarios para funcionar. Stafford Beer, criador do Viable System Model (VSM), demonstrou que toda organizacao precisa de 5 funcoes essenciais. Se uma delas esta ausente ou disfuncional, o sistema nao pode funcionar adequadamente — e nenhuma otimizacao resolve isso.

### 4.1 Os 5 Sistemas do VSM

| Sistema | Funcao | Status | Evidencia |
|---------|--------|--------|-----------|
| **S1 — Operacoes** | Unidades que fazem o trabalho real | {{s1_status}} | {{s1_evidence}} |
| **S2 — Coordenacao** | Harmonizacao entre unidades | {{s2_status}} | {{s2_evidence}} |
| **S3 — Otimizacao** | Controle operacional, alocacao de recursos | {{s3_status}} | {{s3_evidence}} |
| **S4 — Inteligencia** | Interface com futuro e ambiente externo | {{s4_status}} | {{s4_evidence}} |
| **S5 — Politica** | Identidade, valores, proposito | {{s5_status}} | {{s5_evidence}} |

### 4.2 Equilibrio de Variedade (Lei de Ashby)

{{variety_assessment}}

### 4.3 Viabilidade Geral

- **Avaliacao:** {{overall_viability}} (Viavel / Ameacado / Inviavel)
- **Key Finding:** {{viability_key_finding}}
- **Conexao com o problema:** {{viability_connection}}

**Em linguagem simples:** {{viability_plain_language_summary}}

---

## 5. Dinamicas Ocultas — O Que Nao Esta Sendo Dito (Phase 2 — Edgar Schein)

> **Status:** {{phase2_status}} (Executada / Pulada — justificativa: {{phase2_skip_reason}})

> **O que e esta secao?** Todo problema tem uma parte visivel e uma parte invisivel. A parte visivel e o que as pessoas dizem, os dados que apresentam, as reclamacoes que fazem. A parte invisivel e o que NINGUEM fala: tensoes politicas, medos, jogos de poder, cultura organizacional. Esta secao revela essas camadas escondidas, porque muitas vezes a VERDADEIRA causa de um problema esta no que nao e dito, nao no que e dito.

> **A metafora do iceberg:** Pense num iceberg. A ponta que voce ve acima da agua sao os fatos visiveis. Mas 90% do gelo esta debaixo da agua — invisivel. Edgar Schein, um dos maiores especialistas em cultura organizacional do mundo (MIT), criou um modelo de 3 niveis para revelar essas camadas ocultas.

### 5.1 Os 3 Niveis de Cultura (Modelo de Schein)

| Nivel | Explicacao | O que encontramos |
|-------|-----------|-------------------|
| **Nivel 1 — Artefatos** (o que se VE) | Comportamentos visiveis, declaracoes publicas, processos formais. E o que qualquer pessoa de fora conseguiria observar. | {{cultural_artifacts}} |
| **Nivel 2 — Valores Declarados** (o que se DIZ) | O que as pessoas dizem que acreditam e valorizam. Nem sempre corresponde ao que fazem na pratica. | {{espoused_values}} |
| **Nivel 3 — Pressupostos Basicos** (o que se ACREDITA sem perceber) | Crencas tao profundas que ninguem questiona. Sao invisiveis para quem esta dentro. E aqui que moram as causas ocultas mais poderosas. | {{basic_assumptions}} |

### 5.2 Dinamicas Politicas

{{political_dynamics}}

- **Tensoes identificadas:** {{tensions}}
- **Coalizoes e alinhamentos:** {{coalitions}}
- **Jogos de poder relevantes:** {{power_dynamics}}

### 5.3 O Que NAO Estava Sendo Dito

{{undiscussables}}

- **Temas evitados:** {{avoided_topics}}
- **Possiveis razoes para o silencio:** {{silence_reasons}}
- **Impacto no problema:** {{silence_impact}}

### 5.4 Notas de Investigacao (Humble Inquiry)

{{inquiry_notes}}

**Em linguagem simples:** {{culture_plain_language_summary}}

---

## 6. Pressupostos Auditados — Examinando Nossas Proprias Crencas (Phase 3 — Chris Argyris)

> **O que e esta secao?** Antes de diagnosticar o problema dos outros, precisamos examinar as NOSSAS proprias crencas. Todo mundo — incluindo quem esta fazendo o diagnostico — carrega pressupostos que podem distorcer a analise. Um medico que ASSUME que o paciente tem gripe pode deixar passar uma pneumonia. Chris Argyris, de Harvard, dedicou 40 anos a estudar como nossas crencas inconscientes nos levam a conclusoes erradas.

> **A Escada de Inferencia:** Imagine uma escada mental. No degrau mais baixo estao os DADOS brutos (fatos). A cada degrau que subimos, adicionamos interpretacao: selecionamos quais dados prestar atencao, atribuimos significado, tiramos conclusoes, e finalmente agimos. O problema e que subimos a escada automaticamente, sem perceber. Esta secao mostra ONDE na escada estavam acontecendo saltos logicos perigosos.

### 6.1 Pressupostos identificados e examinados

| # | O que se pressupunha | Tipo | Veredicto | Impacto no diagnostico |
|---|---------------------|------|-----------|----------------------|
| 1 | {{assumption_1}} | {{type_1}} (explicito/implicito) | {{status_1}} (validado/refutado/inconclusivo) | {{impact_1}} |
| 2 | {{assumption_2}} | {{type_2}} | {{status_2}} | {{impact_2}} |
| N | ... | ... | ... | ... |

> **O que significa "tipo explicito vs implicito"?**
> - **Explicito:** A pessoa sabe que esta assumindo isso e declara abertamente. Exemplo: "Eu acredito que o mercado vai crescer 20%."
> - **Implicito:** A pessoa nao percebe que esta assumindo. E uma crenca tao profunda que parece "verdade obvia". Exemplo: Presumir que todo profissional liberal quer pagar por software — sem ter perguntado a nenhum deles.

### 6.2 A Escada de Inferencia — Onde Estavam os Saltos Logicos

{{ladder_analysis}}

- **Quais dados foram priorizados (e quais ignorados):** {{selected_data}}
- **Que significados foram atribuidos a esses dados:** {{attributed_meanings}}
- **Que conclusoes foram tiradas a partir disso:** {{conclusions_drawn}}
- **Onde identificamos saltos logicos perigosos:** {{logical_leaps}}

> **Analogia:** E como um jogo de "telefone sem fio" dentro da propria cabeca. A informacao original (dados) vai sendo transformada a cada passo (interpretacao → conclusao → acao), e no final pode estar muito diferente da realidade.

### 6.3 O que sobreviveu ao teste e o que nao sobreviveu

{{challenged_assumptions}}

- **Pressupostos validados** (passaram no teste): {{surviving_assumptions}}
- **Pressupostos refutados** (nao se sustentaram): {{refuted_assumptions}}
- **Impacto dos pressupostos refutados:** {{refutation_impact}}

### 6.4 Variaveis que controlam o sistema (Double-Loop Learning)

> **O que e Double-Loop Learning?** Aprendizado normal (single-loop) e: "algo deu errado → mudo a acao". Exemplo: "vendas cairam → contrato mais vendedores." Double-loop e mais profundo: "algo deu errado → questiono POR QUE estou agindo assim → mudo as PREMISSAS." Exemplo: "vendas cairam → sera que meu modelo de vendas inteiro esta errado?"

{{governing_variables}}

- **Variaveis que controlam o comportamento do sistema:** {{system_variables}}
- **Distancia entre o que se diz e o que se faz:** {{theory_gap}}

**Em linguagem simples:** {{assumptions_plain_language_summary}}

---

## 7. Dinamica Sistemica — Feedback Loops, Arquetipos e Pontos de Alavancagem (Phase 3.5 — Peter Senge)

> **O que e esta secao?** Problemas cronicos geralmente persistem porque existem LOOPS de feedback que os mantem vivos. Um loop de feedback e como um ciclo vicioso (ou virtuoso): A causa B, B causa C, C volta a causar A. Enquanto o loop existir, o problema se regenera sozinho. Peter Senge, autor de "A Quinta Disciplina" e professor do MIT, demonstrou que a maioria dos problemas organizacionais persistentes e causada por esses loops — nao por causas lineares isoladas.

### 7.1 Iceberg Model — As 4 Camadas do Problema

> **O que e o Iceberg?** O que voce VE (eventos) e apenas a ponta. Abaixo dela ha padroes, estruturas e modelos mentais que geram os eventos. Resolver problemas na camada de eventos e como enxugar o chao sem fechar a torneira.

| Camada | O que e | O que encontramos |
|--------|---------|-------------------|
| **Eventos** (ponta do iceberg) | O que aconteceu? Incidentes visiveis. | {{iceberg_events}} |
| **Padroes** (abaixo da superficie) | Isso ja aconteceu antes? Tendencias. | {{iceberg_patterns}} |
| **Estruturas** (profundo) | Que processos, regras, incentivos geram esses padroes? | {{iceberg_structures}} |
| **Modelos Mentais** (base) | Que crencas sustentam essas estruturas? | {{iceberg_mental_models}} |

### 7.2 Loops de Feedback

> **O que sao?** Loops de REFORCO (R) amplificam — tanto para o bem (ciclo virtuoso) quanto para o mal (ciclo vicioso). Loops de BALANCEAMENTO (B) estabilizam — mantem as coisas como estao, mesmo quando voce quer mudar. DELAYS sao defasagens entre causa e efeito — fazem voce achar que sua acao nao funcionou, quando na verdade o efeito ainda nao apareceu.

{{causal_loop_description}}

**Loops de Reforco (ciclos viciosos/virtuosos):**

{{reinforcing_loops}}

**Loops de Balanceamento (mecanismos de estabilizacao):**

{{balancing_loops}}

**Delays criticos:**

{{critical_delays}}

### 7.3 Arquetipo Sistemico

> **O que e?** Arquetipos sao padroes que se repetem em problemas de naturezas completamente diferentes. Se voce reconhece o arquetipo, ja sabe o que esperar e o que NAO fazer.

- **Arquetipo identificado:** {{archetype_name}}
- **Padrao observado:** {{archetype_pattern}}
- **Evidencia:** {{archetype_evidence}}
- **Implicacao para o diagnostico:** {{archetype_implication}}

### 7.4 Leverage Points (Donella Meadows)

> **O que sao?** Pontos de alavancagem sao os LUGARES no sistema onde uma pequena mudanca pode gerar grande impacto. Meadows classificou 12 niveis, do menos eficaz (mudar parametros) ao mais eficaz (mudar paradigmas). Intervir no lugar errado gasta energia sem resultado.

| Causa/Intervencao | Nivel Meadows | Eficacia Esperada | Viabilidade |
|-------------------|---------------|-------------------|-------------|
| {{leverage_1}} | {{level_1}} | {{efficacy_1}} | {{feasibility_1}} |
| {{leverage_2}} | {{level_2}} | {{efficacy_2}} | {{feasibility_2}} |

### 7.5 Teste de Proposito de Meadows

> **Principio:** "The purpose of a system is what it does" (POSIWID). O proposito de um sistema nao e o que ele DECLARA — e o que ele PRODUZ.

- **Proposito declarado:** {{declared_purpose}}
- **Proposito revelado (pelos resultados):** {{revealed_purpose}}
- **Gap de alinhamento:** {{purpose_gap}}
- **Implicacao para o diagnostico:** {{purpose_implication}}

**Em linguagem simples:** {{system_dynamics_plain_language_summary}}

---

## 8. Mudanca de Enquadramento — Sera Que Estamos Olhando Pro Problema Certo? (Phase 4 — Thomas Wedell-Wedellsborg)

> **O que e esta secao?** Esta e talvez a fase mais importante do diagnostico inteiro. A ideia e simples mas poderosa: e se o problema que estamos tentando resolver NAO FOR o problema certo? Thomas Wedell-Wedellsborg, autor de "What's Your Problem?" e consultor de empresas da Fortune 500, descobriu que a maioria das organizacoes fracassa nao porque resolve MAL seus problemas, mas porque resolve o PROBLEMA ERRADO com excelencia.

> **Exemplo classico:** Um predio tem elevadores lentos. Moradores reclamam. A empresa contrata engenheiros para tornar os elevadores mais rapidos (caro, demorado). Alguem sugere instalar espelhos no lobby. Resultado: reclamacoes caem drasticamente. O problema nunca foi "elevadores lentos" — era "tempo de espera percebido como longo". Mudar o ENQUADRAMENTO do problema mudou completamente a solucao.

### 8.1 Como o problema foi inicialmente enquadrado

{{original_frame}}

- **Enquadramento original:** {{initial_framing}}
- **Quem sustenta esse enquadramento:** {{frame_holders}}
- **Limitacoes desta forma de ver o problema:** {{frame_limitations}}

### 8.2 Enquadramentos alternativos que exploramos

| # | Outro jeito de ver o problema | Tipo de mudanca | Se olhassemos assim, o que mudaria? |
|---|------------------------------|-----------------|--------------------------------------|
| 1 | {{alt_frame_1}} | {{reframe_type_1}} | {{implication_1}} |
| 2 | {{alt_frame_2}} | {{reframe_type_2}} | {{implication_2}} |
| N | ... | ... | ... |

**Tecnicas de reframing utilizadas:**
- [ ] Olhar alem do frame — questionar o que esta fora do enquadramento atual
- [ ] Reexaminar o objetivo — sera que o objetivo declarado e o objetivo real?
- [ ] Examinar bright spots — onde o problema NAO existe? O que e diferente la?
- [ ] Olhar no espelho — e se nos mesmos somos parte do problema?
- [ ] Tomar a perspectiva do outro — como o cliente/usuario ve essa situacao?

### 8.3 Enquadramento recomendado

{{recommended_frame}}

### 8.4 Point of View (POV) — Quem Sofre, O Que Precisa e Por Que

> **O que e o POV?** O Point of View condensa tudo que aprendemos ate aqui em uma unica frase estruturada: quem e o principal afetado, qual e sua necessidade REAL (nao o que ele PEDE, mas o que ele PRECISA), e qual insight do diagnostico revela isso. Essa frase serve como "bussola" para qualquer acao futura — se a solucao proposta nao atende ao POV, provavelmente esta atacando o sintoma, nao a causa.

**{{pov_statement}}**

| Componente | Detalhe |
|-----------|---------|
| **Stakeholder principal** | {{pov_stakeholder}} |
| **Necessidade real** | {{pov_need}} |
| **Insight do diagnostico** | {{pov_insight}} |

### 8.5 Por que mudamos (ou mantivemos) o enquadramento

{{frame_reasoning}}

- **Evidencias que suportam a nova forma de olhar:** {{frame_evidence}}
- **O que muda no diagnostico com esta nova lente:** {{diagnostic_shift}}

**Em linguagem simples:** {{reframing_plain_language_summary}}

---

## 9. Diagnostico Profundo — Mapeando a Cadeia de Causas (Phase 5)

> **O que e esta secao?** Agora que sabemos QUAL e o problema certo (apos o reframing), vamos mapear POR QUE ele existe. Esta fase e como uma radiografia: revela a estrutura interna do problema, mostrando como diferentes fatores estao conectados e se alimentam mutuamente.

### 9.1 Metodo utilizado e por que

**Metodo:** {{method_used}} (CRT / SSM / Ambos sequenciais)
**Especialista:** {{phase5_agent}} (Eli Goldratt / Peter Checkland)

{{method_explanation}}

### 9.2 Se CRT (Eli Goldratt — Arvore de Realidade Atual)

> **O que e o CRT?** CRT (Current Reality Tree) e um metodo criado por Eli Goldratt, autor do best-seller "A Meta". A ideia e simples: todo problema que voce OBSERVA (chamado de "Efeito Indesejavel" ou UDE) tem uma CAUSA. E essa causa tambem tem uma causa. E assim por diante. O CRT monta essa cadeia de volta ate encontrar as poucas causas-raiz que geram TUDO. Pense numa arvore genealogica — mas de problemas, nao de pessoas.

#### Efeitos Indesejaveis — O Que Observamos de Errado

> Cada "efeito indesejavel" e algo que voce pode VER acontecendo e que nao deveria estar acontecendo. Sao os SINTOMAS do problema.

| # | O que observamos de errado | Gravidade | Conectado a |
|---|---------------------------|-----------|-------------|
| 1 | {{ude_1}} | {{severity_1}} | {{connected_to_1}} |
| 2 | {{ude_2}} | {{severity_2}} | {{connected_to_2}} |
| N | ... | ... | ... |

#### A Cadeia de Causas — Como Um Problema Leva ao Outro

{{causal_chain_description}}

> **Leia de baixo para cima:** As causas mais profundas (raizes) estao na base. Os efeitos visiveis (sintomas) estao no topo. As setas mostram "isso CAUSA aquilo".

```
{{current_reality_tree_diagram}}
```

#### O Conflito Central — O Que Trava a Situacao

> **O que e o Evaporating Cloud?** Quando um problema persiste, geralmente existe um CONFLITO escondido — duas necessidades legitimas que parecem impossiveis de satisfazer ao mesmo tempo. O Evaporating Cloud (Nuvem de Evaporacao) revela esse conflito e busca o PRESSUPOSTO INVALIDO que faz o conflito parecer insoluvel. Quando encontramos e removemos esse pressuposto, o conflito "evapora".

{{core_conflict}}

- **Objetivo comum:** {{common_objective}}
- **Necessidade A:** {{need_a}}
- **Necessidade B:** {{need_b}}
- **Pre-requisito A:** {{prereq_a}}
- **Pre-requisito B:** {{prereq_b}}
- **O pressuposto invalido que sustenta o conflito:** {{invalid_assumption}}

### 9.3 Se SSM (Peter Checkland — Metodologia de Sistemas Flexiveis)

> **O que e o SSM?** Quando o problema e "bagunçado" — ou seja, ninguem concorda sobre o que e o problema, multiplas pessoas tem visoes diferentes, e nao existe uma resposta "certa" — usamos o SSM (Soft Systems Methodology). Criado por Peter Checkland na Universidade de Lancaster ao longo de 30 anos, este metodo reconhece que problemas humanos nao sao como problemas de engenharia: eles envolvem perspectivas, valores e politica.

#### Retrato da Situacao (Rich Picture)

> Uma "Rich Picture" e como um mapa visual da situacao, mostrando todos os elementos envolvidos: pessoas, processos, conflitos, fluxos de informacao. Nao e um diagrama tecnico — e um retrato honesto da complexidade.

{{rich_picture_description}}

#### Analise CATWOE — As 6 Perspectivas do Problema

> CATWOE e uma forma de olhar para o problema de 6 angulos diferentes. Cada letra representa uma pergunta:

| Perspectiva | Pergunta | O que encontramos |
|-------------|----------|-------------------|
| **C** — Clientes (quem e impactado?) | Quem sofre ou se beneficia com a situacao? | {{customers}} |
| **A** — Atores (quem faz?) | Quem executa as atividades dentro do sistema? | {{actors}} |
| **T** — Transformacao (o que muda?) | Qual e a mudanca central que o sistema deveria produzir? | {{transformation}} |
| **W** — Visao de mundo (por que importa?) | Que crencas e valores fazem essa transformacao parecer necessaria? | {{worldview}} |
| **O** — Proprietario (quem controla?) | Quem tem poder para mudar ou eliminar o sistema? | {{owner}} |
| **E** — Ambiente (o que restringe?) | Que fatores externos limitam as opcoes? | {{environment}} |

#### Modelos Conceituais

{{conceptual_models}}

#### Mudancas Desejaveis E Viaveis

> Nem toda mudanca desejavel e viavel, e nem toda mudanca viavel e desejavel. O SSM busca o ponto de encontro: mudancas que sao AMBAS — boas para o sistema E possiveis de implementar na pratica.

{{desirable_feasible_changes}}

### 9.4 Conclusoes do Diagnostico Profundo

{{deep_diagnosis_conclusions}}

**Decisao de roteamento (Decision Point 2):**

> Com base no que descobrimos na fase anterior, agora decidimos COMO investigar as causas-raiz:

- **O problema e isolavel?** {{is_isolable}} (Sim / Nao / Incerto)
  - *"Isolavel" significa: podemos apontar UMA causa principal. Se sim, usamos o metodo KT (forense). Se nao, usamos Apollo RCA (grafo de multiplas causas).*
- **Metodo de analise selecionado:** {{dp2_method}} (KT / Apollo RCA / Ambos sequenciais)
- **Especialista ativado:** {{dp2_agent}}
- **Justificativa:** {{dp2_rationale}}

**Em linguagem simples:** {{deep_diagnosis_plain_language_summary}}

---

## 10. Causas-Raiz Identificadas — O Que REALMENTE Esta Causando o Problema (Phase 6)

> **O que e esta secao?** Esta e a resposta central de todo o diagnostico. Depois de classificar o tipo de problema, examinar pressupostos, mudar o enquadramento e mapear a cadeia causal, chegamos aqui: as CAUSAS FUNDAMENTAIS. Estas sao as causas que, se eliminadas, eliminam ou reduzem drasticamente o problema.

> **Analogia:** Se voce tem goteiras em varios comodos da casa, pode ficar colocando baldes (tratando sintomas). Ou pode subir no telhado e encontrar as 2-3 telhas quebradas que causam TODAS as goteiras (causas-raiz). Esta secao mostra quais sao as "telhas quebradas".

**Metodo utilizado:** {{rca_method}} (Kepner-Tregoe IS/IS NOT / Apollo RCA / Ambos)
**Especialista:** {{phase6_agent}} (Kepner & Tregoe / Dean Gano)

### Se KT (Kepner-Tregoe — Analise Forense IS/IS NOT)

> **O que e o metodo KT?** Kepner-Tregoe e como um detetive forense para problemas. A logica e brilhante: se o problema acontece AQUI mas NAO acontece ALI, entao o que e DIFERENTE entre os dois? Essa diferenca aponta para a causa. A NASA e o exercito americano usam este metodo ha 60+ anos para diagnosticar falhas criticas.

#### Onde o Problema Acontece vs. Onde NAO Acontece

| Aspecto | Onde OCORRE | Onde NAO ocorre | O que e diferente? |
|---------|------------|----------------|--------------------|
| O que | {{is_what}} | {{is_not_what}} | {{distinction_what}} |
| Onde | {{is_where}} | {{is_not_where}} | {{distinction_where}} |
| Quando | {{is_when}} | {{is_not_when}} | {{distinction_when}} |
| Extensao | {{is_extent}} | {{is_not_extent}} | {{distinction_extent}} |

#### O Que Mudou

{{changes_identified}}

#### Causa Verificada

{{verified_cause_kt}}

#### Como Verificamos

{{verification_tests}}

### Se Apollo RCA (Dean Gano — Grafo de Causas Verificaveis)

> **O que e o Apollo RCA?** Quando o problema tem MULTIPLAS causas que se alimentam mutuamente, o metodo KT nao consegue isolar uma unica causa. Neste caso, usamos o Apollo RCA, criado por Dean Gano a partir de sua experiencia na engenharia nuclear e na NASA. A ideia: construir um MAPA de todas as causas, como um grafo — cada causa precisa ter uma EVIDENCIA para ser aceita. Sem evidencia, nao e causa, e apenas hipotese.

#### Mapa de Causas

> Leia como um mapa de conexoes: cada "no" e uma causa, e as linhas mostram como uma causa leva a outra. Causas na base do mapa sao as mais fundamentais (raizes).

```
{{causal_graph_diagram}}
```

#### Cadeias de Evidencia — Cada Causa com Sua Prova

| Causa identificada | Tipo | Evidencia que sustenta | Verificada? |
|-------------------|------|------------------------|-------------|
| {{cause_1}} | {{type_c1}} (acao/condicao) | {{evidence_c1}} | {{verified_c1}} |
| {{cause_2}} | {{type_c2}} | {{evidence_c2}} | {{verified_c2}} |
| N | ... | ... | ... |

> **Qual a diferenca entre "acao" e "condicao"?**
> - **Causa de acao:** Algo que alguem FEZ (ou deixou de fazer) que causou o problema. Exemplo: "Equipe nao implementou processo de onboarding."
> - **Causa de condicao:** Uma circunstancia que PERMITE que o problema exista. Exemplo: "Mercado brasileiro tem regulacoes fragmentadas." Condicoes sao mais dificeis de mudar, mas precisam ser reconhecidas.

#### Como as Causas Interagem

{{conditional_vs_action_causes}}

---

### Causas-Raiz Consolidadas

> Abaixo, cada causa-raiz e detalhada com: o que e, qual a evidencia, qual o grau de certeza, quanto contribui para o problema, e o que acontece se nao for tratada.

### Causa-Raiz #1: {{root_cause_1_title}}

- **O que e:** {{rc1_description}}
- **Evidencia que sustenta esta conclusao:** {{rc1_evidence}}
- **Grau de certeza:** {{rc1_confidence}}%
- **Contribuicao para o problema:** {{rc1_contribution}}% — *Em outras palavras, se voce pudesse eliminar APENAS esta causa, {{rc1_contribution}}% do problema seria resolvido.*
- **Como verificamos:** {{rc1_verification}}
- **O que acontece se NAO for tratada:** {{rc1_impact}}
- **Categoria:** {{rc1_category}} (processo / tecnologia / pessoas / estrutura / cultura)

### Causa-Raiz #2: {{root_cause_2_title}}

- **O que e:** {{rc2_description}}
- **Evidencia que sustenta esta conclusao:** {{rc2_evidence}}
- **Grau de certeza:** {{rc2_confidence}}%
- **Contribuicao para o problema:** {{rc2_contribution}}%
- **Como verificamos:** {{rc2_verification}}
- **O que acontece se NAO for tratada:** {{rc2_impact}}
- **Categoria:** {{rc2_category}}

### Causa-Raiz #N: ...
(repetir estrutura para cada causa-raiz adicional)

**Em linguagem simples:** {{root_causes_plain_language_summary}}

---

## BLOCO 3 — ACAO (O Que Fazer Agora)

---

## 11. Problemas Adjacentes — Outros Problemas Que Encontramos Pelo Caminho

> **O que sao problemas adjacentes?** Durante a investigacao, e comum encontrar problemas que nao sao a causa principal, mas que pioram a situacao ou podem virar problemas serios no futuro. Pense nisso: voce vai ao medico por causa de uma dor no joelho. Durante o exame, o medico descobre que voce tambem tem colesterol alto. O colesterol nao e a causa da dor no joelho, mas merece atencao.

| # | Problema encontrado | Relacao com a causa principal | Gravidade | Precisa de acao? | Recomendacao |
|---|--------------------|-----------------------------|-----------|-----------------|-------------|
| 1 | {{adj_1}} | {{relation_1}} | {{severity_adj_1}} (alta/media/baixa) | {{action_adj_1}} (sim/nao/monitorar) | {{rec_adj_1}} |
| 2 | {{adj_2}} | {{relation_2}} | {{severity_adj_2}} | {{action_adj_2}} | {{rec_adj_2}} |
| N | ... | ... | ... | ... | ... |

> **Atencao:** Problemas adjacentes marcados com gravidade "alta" podem se tornar causas-raiz se nao forem monitorados. Nao ignore-os.

---

## 12. Quantificacao — Quanto Custa Esse Problema? (Phase 7 — Douglas Hubbard)

> **Status:** {{phase7_status}} (Executada / Pulada — justificativa: {{phase7_skip_reason}})

> **O que e esta secao?** Ate aqui identificamos O QUE esta errado. Agora, QUANTIFICAMOS: quanto custa? Qual o impacto financeiro? Como vamos MEDIR se as acoes estao funcionando? Douglas Hubbard, autor de "How to Measure Anything", demonstrou que tudo que importa pode ser medido — inclusive coisas que parecem inquantificaveis.

### 12.1 Numeros do diagnostico

| O que medimos | Valor estimado | Faixa de certeza (90%) | De onde vem esse numero |
|---------------|---------------|------------------------|------------------------|
| {{metric_1}} | {{value_1}} | {{range_1}} | {{source_1}} |
| {{metric_2}} | {{value_2}} | {{range_2}} | {{source_2}} |

> **O que e "Faixa de certeza 90%"?** Significa que temos 90% de certeza de que o valor real esta dentro desta faixa. Exemplo: "Mercado potencial: R$7-11B" significa que temos 90% de confianca de que o mercado esta entre 7 e 11 bilhoes. Pode ser 8B ou 10B, mas e muito improvavel que seja 3B ou 20B.

### 12.2 Como medir se as acoes estao funcionando

> Para cada causa-raiz, definimos um INDICADOR que mostra se a intervencao esta dando resultado. E como um termometro: nao cura a febre, mas mostra se o tratamento esta funcionando.

| Causa-raiz | Indicador | Onde estamos hoje | Meta | Com que frequencia medir |
|-----------|-----------|-------------------|------|--------------------------|
| {{rc_1}} | {{proxy_1}} | {{baseline_1}} | {{target_1}} | {{frequency_1}} |
| {{rc_2}} | {{proxy_2}} | {{baseline_2}} | {{target_2}} | {{frequency_2}} |

### 12.3 Que informacao AINDA nos falta (e quanto vale obte-la)

> **Valor da Informacao (VoI):** Nem toda informacao vale o custo de obte-la. Esta analise mostra QUAIS informacoes faltantes teriam o MAIOR impacto na qualidade das decisoes.

| Informacao que falta | Quanto custa obter | Quanto vale ter essa informacao | Recomendacao |
|---------------------|-------------------|--------------------------------|-------------|
| {{info_1}} | {{cost_1}} | {{voi_1}} | {{rec_voi_1}} (obter / nao obter) |

### 12.4 Impacto financeiro estimado (se aplicavel)

{{financial_impact}}

**Em linguagem simples:** {{quantification_plain_language_summary}}

---

## 13. Stress Test — E Se Nosso Diagnostico Estiver Errado? (Phase 8 — Gary Klein)

> **Status:** {{phase8_status}} (Executada / Pulada — justificativa: {{phase8_skip_reason}})

> **O que e esta secao?** Um bom diagnostico inclui a humildade de perguntar: "e se estamos errados?" Gary Klein, psicólogo cognitivo que trabalhou com o exercito americano e a CIA, criou o PreMortem — um exercicio onde IMAGINAMOS que o diagnostico falhou e perguntamos: "por que teria falhado?" Isso revela pontos cegos que ninguem percebeu durante a analise.

> **Analogia:** Antes de voar, pilotos fazem um checklist de "o que pode dar errado". Nao e pessimismo — e profissionalismo. Esta secao e o checklist do nosso diagnostico.

### 13.1 PreMortem — Cenarios de Falha do Diagnostico

> "Imagine que e daqui a 6 meses. Voce seguiu todas as recomendacoes deste relatorio, mas o problema nao foi resolvido. O que deu errado?"

| # | Cenario de falha | Probabilidade | Sinal de alerta (fique atento a isso) | Como mitigar |
|---|-----------------|---------------|---------------------------------------|-------------|
| 1 | {{failure_1}} | {{prob_1}} | {{signal_1}} | {{mitigation_1}} |
| 2 | {{failure_2}} | {{prob_2}} | {{signal_2}} | {{mitigation_2}} |
| N | ... | ... | ... | ... |

### 13.2 Testando Nosso Proprio Enquadramento (Data/Frame)

> Verificamos se os dados que temos realmente sustentam a conclusao que tiramos, ou se existem dados que contradizem nossa visao.

{{data_frame_analysis}}

- **Dados que sustentam nossas conclusoes:** {{supporting_data}}
- **Dados que CONTRADIZEM nossas conclusoes:** {{contradicting_data}}
- **Dados que NAO temos e que poderiam mudar tudo:** {{missing_data}}
- **A interpretacao alternativa mais perigosa (se fosse verdadeira):** {{dangerous_alt_frame}}

### 13.3 Pontos Cegos Identificados

> Pontos cegos sao coisas que nao conseguimos ver por causa da nossa propria perspectiva. E como tentar ver a propria nuca sem espelho.

{{blind_spots}}

### 13.4 Ajustes no Diagnostico Apos o Stress Test

{{amendments}}

- **Confianca ANTES do stress test:** {{pre_confidence}}%
- **Confianca DEPOIS do stress test:** {{post_confidence}}%
- **O que mudou e por que:** {{confidence_change_reason}}

**Em linguagem simples:** {{stress_test_plain_language_summary}}

---

## 14. Pacote para Acao — Transformando Diagnostico em Acao (Phase 9 — Min Basadur)

> **Status:** {{phase9_status}} (Executada / Pulada — justificativa: {{phase9_skip_reason}})

> **O que e esta secao?** Um diagnostico brilhante que nao leva a acao e papel desperdicado. Min Basadur, professor da McMaster University que trabalhou 20 anos na Procter & Gamble, criou o Simplex Process para transformar problemas complexos em acoes claras e executaveis. Esta secao traduz tudo que foi descoberto em "o que fazer na segunda-feira de manha".

### 14.1 Causas-raiz priorizadas para acao

> Priorizamos pela razao impacto/esforco: atacar primeiro o que traz MAIS resultado com MENOS investimento.

| Prioridade | Causa-raiz | Impacto esperado | Esforco necessario | Razao custo-beneficio |
|-----------|-----------|-------------------|--------------------|-----------------------|
| 1 | {{prioritized_rc_1}} | {{impact_1}} | {{effort_1}} | {{ratio_1}} |
| 2 | {{prioritized_rc_2}} | {{impact_2}} | {{effort_2}} | {{ratio_2}} |

### 14.2 Perguntas "Como Poderiamos...?" (HMW)

> Reformulamos as causas-raiz como OPORTUNIDADES. Em vez de "o problema e X", perguntamos "como poderiamos resolver X?". Isso muda a mentalidade de "lamentar o problema" para "buscar a solucao".

1. **Como poderiamos** {{hmw_1}}
2. **Como poderiamos** {{hmw_2}}
3. **Como poderiamos** {{hmw_3}}

### 14.3 Criterios de sucesso — Como saber se funcionou

| O que medir | Indicador | Meta | Prazo |
|-------------|-----------|------|-------|
| {{criterion_1}} | {{metric_sc_1}} | {{target_sc_1}} | {{deadline_1}} |
| {{criterion_2}} | {{metric_sc_2}} | {{target_sc_2}} | {{deadline_2}} |

### 14.4 Mapa de Desafios — Por Que o Problema Existe

> Este mapa mostra, camada por camada, POR QUE a situacao desejada nao existe ainda. Cada "por que?" revela uma barreira mais profunda, ate chegarmos ao desafio acionavel.

```
Visao desejada: {{desired_vision}}
|
Por que isso nao existe? → {{barrier_1}}
|
Por que? → {{barrier_2}}
|
Por que? → {{barrier_3}}
|
Desafio acionavel: {{actionable_challenge}}
```

### 14.5 Indicacoes iniciais de solucao

{{solution_seeds}}

> **Nota importante:** O Root Diagnosis Squad DIAGNOSTICA — ele identifica as causas e indica direcoes. As SOLUCOES detalhadas sao responsabilidade da equipe de execucao. Estas indicacoes sao pontos de partida, nao prescricoes finais.

### 14.6 Proximos Squads Recomendados — Continuidade do Diagnostico

> **O que e esta secao?** O diagnostico identifica CAUSAS, mas resolver essas causas pode exigir competencias especializadas que este squad nao possui. Abaixo, recomendamos quais squads podem dar continuidade ao trabalho, com justificativa vinculada diretamente as causas-raiz encontradas.

| Prioridade | Squad | Por que este squad | Causas-raiz que ataca |
|-----------|-------|--------------------|-----------------------|
| {{squad_priority_1}} | {{squad_name_1}} | {{squad_reason_1}} | {{squad_rcs_1}} |
| {{squad_priority_2}} | {{squad_name_2}} | {{squad_reason_2}} | {{squad_rcs_2}} |
| {{squad_priority_3}} | {{squad_name_3}} | {{squad_reason_3}} | {{squad_rcs_3}} |

> **Como usar:** Comece pelo squad marcado como "Primary". Squads "Secondary" podem rodar em paralelo ou apos o primary. Squads "Optional" sao para aprofundamento se necessario.

---

## 15. Recomendacoes — O Que Fazer, Quando e Por Que

> **Como usar esta secao:** As recomendacoes estao organizadas em 3 horizontes de tempo. Comece pelas acoes imediatas (esta semana). Nao tente fazer tudo ao mesmo tempo — a ordem importa.

### 15.1 Acoes imediatas (proximos 7 dias)

> Estas sao as acoes de MAIOR URGENCIA — comece por elas.

| # | O que fazer | Quem deveria fazer | Qual causa-raiz ataca | O que se espera como resultado |
|---|------------|--------------------|-----------------------|-------------------------------|
| 1 | {{immediate_1}} | {{owner_i1}} | {{rc_i1}} | {{result_i1}} |
| 2 | {{immediate_2}} | {{owner_i2}} | {{rc_i2}} | {{result_i2}} |

### 15.2 Acoes de curto prazo (30 dias)

> Estas acoes constroem sobre as acoes imediatas e comecam a atacar as causas estruturais.

| # | O que fazer | Quem deveria fazer | Qual causa-raiz ataca | O que se espera como resultado |
|---|------------|--------------------|-----------------------|-------------------------------|
| 1 | {{short_1}} | {{owner_s1}} | {{rc_s1}} | {{result_s1}} |
| 2 | {{short_2}} | {{owner_s2}} | {{rc_s2}} | {{result_s2}} |

### 15.3 Acoes estruturais (90+ dias)

> Estas sao as mudancas de fundo — levam mais tempo mas resolvem o problema pela raiz.

| # | O que fazer | Quem deveria fazer | Qual causa-raiz ataca | O que se espera como resultado |
|---|------------|--------------------|-----------------------|-------------------------------|
| 1 | {{structural_1}} | {{owner_st1}} | {{rc_st1}} | {{result_st1}} |
| 2 | {{structural_2}} | {{owner_st2}} | {{rc_st2}} | {{result_st2}} |

### 15.4 O Que NAO Fazer (Anti-recomendacoes)

> **Tao importante quanto saber o que fazer e saber o que NAO fazer.** Estas sao acoes que podem parecer tentadoras (rapidas, obvias), mas que atacam SINTOMAS em vez de CAUSAS. Fazer estas coisas daria uma sensacao de progresso sem resolver o problema — e as vezes piorando.

| # | Acao tentadora | Por que NAO fazer | Qual causa-raiz ela ignora |
|---|---------------|------------------|--------------------------|
| 1 | {{anti_rec_1}} | {{why_not_1}} | {{ignored_rc_1}} |

---

## BLOCO 4 — REFERENCIA (Para Quem Quer Ir Mais Fundo)

---

## 16. Convergencia entre Especialistas — Quando Todos Apontam na Mesma Direcao

> **Por que isso importa?** Quando 6 especialistas diferentes, usando 6 metodos diferentes, chegam a mesma conclusao independentemente — a confianca nessa conclusao e muito maior. E como 6 medicos de especialidades diferentes examinarem o mesmo paciente e todos concordarem no diagnostico.

| Conclusao | Quais especialistas concordam | Grau de convergencia |
|-----------|------------------------------|---------------------|
| {{finding_1}} | {{converging_agents_1}} | {{convergence_1}} (forte/moderada/fraca) |
| {{finding_2}} | {{converging_agents_2}} | {{convergence_2}} |

**Onde especialistas divergiram (e como resolvemos):**

> Divergencia nao e necessariamente ruim — pode indicar que o problema tem facetas que cada especialista ve de angulos diferentes.

| Especialista A | O que disse | Especialista B | O que disse | Como resolvemos |
|---------------|-----------|---------------|-----------|-----------------|
| {{agent_a}} | {{position_a}} | {{agent_b}} | {{position_b}} | {{resolution}} |

---

## 17. Confianca e Limitacoes do Diagnostico

> **Transparencia total:** Nenhum diagnostico e 100% certo. Esta secao mostra EXATAMENTE quao confiantes estamos nas nossas conclusoes, e ONDE estao as limitacoes. Isso permite que voce tome decisoes com os olhos abertos.

### Calculo de Confianca

> A confianca final e calculada a partir de 4 fatores, cada um com um peso diferente:

| O que medimos | Peso | Score | Contribuicao |
|---------------|------|-------|-------------|
| Quantas fases foram executadas ({{phases_done}}/13) | 30% | {{phases_score}}/10 | {{phases_weighted}} |
| Quantas fontes de dados usamos ({{sources_count}}) | 25% | {{sources_score}}/10 | {{sources_weighted}} |
| Quantos especialistas concordam entre si | 25% | {{convergence_score}}/10 | {{convergence_weighted}} |
| O diagnostico sobreviveu ao stress test? | 20% | {{stress_score}}/10 | {{stress_weighted}} |
| **TOTAL** | **100%** | — | **{{confidence_level}}%** |

### O que este nivel de confianca significa

{{confidence_interpretation}}

### Limitacoes que voce deve saber

{{limitations_narrative}}

---

## 18. Metadados do Diagnostico

> Registro tecnico completo do diagnostico para rastreabilidade e auditoria.

| Campo | Valor |
|-------|-------|
| **Diagnostic ID** | {{diagnostic_id}} |
| **Data de inicio** | {{start_date}} |
| **Data de conclusao** | {{end_date}} |
| **Tempo total** | {{total_time}} |
| **Modo** | {{mode}} (Full / Quick) |
| **Profundidade** | {{depth}} (rapido / padrao / profundo) |
| **Cliente do diagnostico** | {{client}} |
| **Fases executadas** | {{phases_list}} |
| **Fases opcionais puladas** | {{skipped_phases}} |
| **Justificativa para pular** | {{skip_justification}} |
| **Decision Point 1** | {{dp1_summary}} |
| **Decision Point 2** | {{dp2_summary}} |
| **Quality Gate score** | {{quality_score}}/10 |
| **Confianca final** | {{confidence_level}}% |
| **Numero de causas-raiz** | {{num_root_causes}} |
| **Numero de problemas adjacentes** | {{num_adjacent_problems}} |
| **Fontes de dados utilizadas** | {{data_sources}} |
| **Limitacoes do diagnostico** | {{limitations}} |

---

## Anexos

### A. Outputs Individuais dos Especialistas

> Cada fase do diagnostico gerou um documento detalhado. Estes sao os "prontuarios" individuais de cada especialista.

Outputs completos salvos em `squads/root-diagnosis/data/{{diagnostic_id}}/`:
- `phase-0-intake.md` — Triagem inicial e escopo do diagnostico
- `phase-1-cynefin.md` — Classificacao do tipo de problema
- `phase-2-culture.md` — Diagnostico de cultura e politica (se executada)
- `phase-3-assumptions.md` — Auditoria de pressupostos e crencas
- `phase-4-reframing.md` — Mudanca de enquadramento do problema
- `phase-5-deep-diagnosis.md` — Mapeamento profundo de causas
- `phase-6-rca.md` — Analise de causa-raiz com evidencias
- `phase-1.5-viability.md` — Avaliacao de viabilidade organizacional (se executada)
- `phase-3.5-system-dynamics.md` — Dinamicas sistemicas, feedback loops, leverage points
- `phase-7-quantification.md` — Quantificacao de impacto (se executada)
- `phase-8-stress-test.md` — Teste de robustez do diagnostico (se executada)
- `phase-9-action-package.md` — Empacotamento para acao (se executada)

### B. Glossario Completo

| Termo | O que significa em linguagem simples |
|-------|--------------------------------------|
| **Causa-raiz** | A causa FUNDAMENTAL. Se voce eliminar esta causa, o problema desaparece ou diminui drasticamente. E a "raiz da arvore" — os problemas visiveis sao os "galhos secos". |
| **Causa adjacente** | Contribui para piorar, mas nao e a causa principal. Como chuva forte numa casa com telhado furado — a chuva piora, mas o problema e o furo. |
| **Sintoma** | O que voce VE e SENTE do problema. Nao e a causa. Febre e sintoma; a infeccao e a causa. Tratar sintoma e tomar analgesico — alivia mas nao cura. |
| **UDE** | "Efeito Indesejavel" (Undesirable Effect) — um termo da Teoria das Restricoes de Goldratt. E qualquer coisa que voce observa acontecendo e que nao deveria estar acontecendo. |
| **CRT** | Current Reality Tree (Arvore de Realidade Atual) — um diagrama que mostra como problemas se conectam desde os sintomas visiveis ate as causas profundas. Leia de baixo pra cima. |
| **SSM** | Soft Systems Methodology — metodo para problemas "bagunçados" onde ninguem concorda sobre o que e o problema. Usa multiplas perspectivas para encontrar caminhos viaveis. |
| **CATWOE** | Seis perspectivas para analisar uma situacao: Clientes, Atores, Transformacao, Visao de Mundo, Proprietario, Ambiente. Cada letra e uma pergunta diferente sobre o mesmo problema. |
| **IS/IS NOT** | Tecnica de Kepner-Tregoe que compara onde o problema ACONTECE vs onde NAO acontece. A diferenca entre os dois aponta para a causa. |
| **Apollo RCA** | Metodo de Dean Gano para construir um mapa visual de TODAS as causas interconectadas, exigindo evidencia para cada uma. Usado em engenharia nuclear e na NASA. |
| **AIE** | Applied Information Economics — metodo de Douglas Hubbard para medir coisas que parecem inquantificaveis. Usa intervalos de confianca em vez de numeros exatos. |
| **PreMortem** | Exercicio criado por Gary Klein: "imagine que daqui a 6 meses tudo deu errado — por que teria falhado?" Revela pontos cegos antes que seja tarde. Diferente de postmortem (que analisa APOS a falha). |
| **HMW** | "How Might We" (Como Poderiamos) — tecnica que transforma problemas em oportunidades. Em vez de "o problema e X", pergunta "como poderiamos resolver X?". Muda a mentalidade de lamentar para agir. |
| **POV** | Point of View (Ponto de Vista) — frase estruturada que resume quem sofre com o problema, o que essa pessoa REALMENTE precisa, e qual insight do diagnostico revela isso. Funciona como uma bussola: qualquer solucao proposta deve atender ao POV. Se nao atende, provavelmente esta atacando sintoma, nao causa. |
| **VOI** | Value of Information (Valor da Informacao) — quanto VALE obter uma informacao que ainda nao temos. Se custa R$1K obter mas muda uma decisao de R$100K, vale a pena. |
| **Cynefin** | Modelo que classifica problemas em 4 tipos: Simples (resposta obvia), Complicado (precisa de especialista), Complexo (precisa experimentar), Caotico (precisa agir rapido). Saber o tipo determina o metodo. |
| **Reframing** | Mudar a "lente" com que olhamos para o problema. Mesmo cenario, perspectiva diferente. Exemplo classico: "elevadores lentos" reframeado para "tempo de espera percebido" — a solucao muda completamente. |
| **CLD** | Causal Loop Diagram (Diagrama de Loops Causais) — um mapa visual que mostra como variaveis do sistema se influenciam mutuamente em loops de feedback. Loops de reforco (R) amplificam, loops de balanceamento (B) estabilizam. |
| **Feedback Loop** | Um ciclo onde o output de um processo se torna input dele mesmo. Pode ser vicioso (piora sozinho) ou virtuoso (melhora sozinho). E por isso que problemas cronicos persistem. |
| **System Archetype** | Padrao recorrente em sistemas complexos. Senge identificou 9 arquetipos classicos (ex: "Fixes that Fail", "Shifting the Burden"). Reconhecer o arquetipo permite antecipar consequencias. |
| **Leverage Point** | Ponto no sistema onde uma pequena intervencao gera grande efeito. Donella Meadows classificou 12 niveis, do menos eficaz (mudar numeros) ao mais eficaz (mudar paradigmas). |
| **VSM** | Viable System Model — modelo de Stafford Beer que identifica 5 funcoes essenciais (S1-S5) que todo sistema viavel precisa ter. Se uma esta ausente, o sistema nao pode funcionar adequadamente. |
| **Iceberg Model** | Modelo de Senge que mostra 4 camadas de profundidade: Eventos (visivel), Padroes (tendencias), Estruturas (o que gera os padroes), Modelos Mentais (crencas que sustentam as estruturas). |
| **Convergencia** | Quando varios especialistas independentes chegam a mesma conclusao usando metodos diferentes. Quanto mais convergencia, maior a confianca no diagnostico. |
| **Loop de reforço** | Quando causas se alimentam mutuamente num ciclo vicioso. A causa B. B causa C. C piora A. O loop explica por que o problema persiste — nenhuma acao isolada o resolve. |
| **Decision Point** | Momento no diagnostico onde o metodo seguinte e escolhido com base nos resultados da fase anterior. E como uma bifurcacao na estrada — os dados indicam qual caminho seguir. |
| **Confianca do diagnostico** | Percentual que expressa nosso grau de certeza. 90%+ = muito certos. 70-89% = confiantes com lacunas. 50-69% = hipotese forte. <50% = preliminar, precisa de mais dados. |
| **Kill criteria** | Criterios pre-definidos que, se atingidos, indicam que voce deve PARAR e mudar de direcao. Exemplo: "se nao tivermos 50 clientes pagantes ate o mes 4, pivotamos." Define antecipadamente quando abandonar uma estrategia. |
| **Double-Loop Learning** | Aprendizado profundo: em vez de so mudar a acao quando algo da errado, questionar e mudar as PREMISSAS que levaram aquela acao. Single-loop = "mude o que faz." Double-loop = "mude como pensa." |

---

*Relatorio gerado pelo Root Diagnosis Squad v1.2.0*
*Diagnostic Orchestrator — Synkra AIOS*
*Metodologias: {{methodologies_used}}*
*Agentes ativados: {{agents_activated}}*
