# Executar Estrategia de Conteudo (E1-E8)

name: create-strategy
description: Identificar a intencao do usuario e executar a estrategia correta (E1 a E8) com cronograma completo, templates de feed e stories
elicit: true

## INPUTS

- **O que voce vende:** mentoria, produto ou servico (obrigatorio)
- **Para quem:** avatar especifico (obrigatorio)
- **Qual dor real:** problema principal do avatar (obrigatorio)
- **Qual transformacao entrega:** resultado mensuravel (obrigatorio)
- **Intencao:** o que quer alcancar — vender, gerar leads, doutrinar, validar (obrigatorio)
- **Prints/provas:** depoimentos, resultados, screenshots (opcional)
- **Prazo:** em quantos dias quer executar (opcional)

## STEPS

1. Coletar as 4 informacoes obrigatorias + intencao
2. Usar Decisor Estrategico Automatico para identificar estrategia:
   - Vender produto/mentoria → E1 (Lancamento de Pressao)
   - Gerar leads para evento → E2 (Isca Magnetica)
   - Doutrinar/virar autoridade → E3 (Doutrina Silenciosa)
   - Conversao imediata/rapida → E4 (Stories Venda Direta)
   - Campanha completa feed+stories → E5 (Feed de Guerra Visual)
   - Lead qualificado especifico → E6 (Story Direto)
   - Validar mentoria → E7 (Stories PAS)
   - Funil pressao progressiva → E8 (Stories Funil Pressao)
3. Confirmar estrategia selecionada com o usuario
4. Executar cronograma completo da estrategia com templates personalizados
5. Gerar templates de Feed (quando aplicavel)
6. Gerar templates de Stories (quando aplicavel)
7. Validar pelo oraculo cada peca gerada
8. Entregar pacote completo no formato padrao

## VETO CONDITIONS

- Se nao tem as 4 informacoes obrigatorias → NAO executar, perguntar
- Se intencao e ambigua e nao permite identificar estrategia → Perguntar (max 2 perguntas)
- Se usuario pede algo que nao se encaixa em E1-E8 → Sugerir a mais proxima e confirmar
- Se templates nao seguem tom imperial → Reescrever
- Se cronograma nao tem dia-a-dia detalhado → Completar
- Se entregou teoria em vez de templates prontos → Reescrever com execucao pratica

## OUTPUT EXAMPLE

```
ESTRATEGIA IDENTIFICADA: E1 — LANCAMENTO DE PRESSAO (5 dias)
OBJETIVO: Vender [produto] com pressao emocional crescente
FORMATO: Feed + Stories integrados

CRONOGRAMA:

DIA 1 — DESPERTAR DOR
Feed: [template personalizado tipo Problema/Imperial]
Stories: [pergunta desconfortavel + enquete]

DIA 2 — PROBLEMA COMUM
Feed: [template personalizado tipo Crenca]
Stories: [prints de respostas + identificacao]

DIA 3 — SOLUCAO EXISTE
Feed: [template personalizado tipo Historia]
Stories: [bastidor + antes/depois]

DIA 4 — MOVIMENTO
Feed: [template personalizado tipo Oferta]
Stories: [tour do grupo + prints]

DIA 5 — OFERTA FINAL
Feed: [template personalizado tipo Oferta]
Stories: [prova final + CTA direto]

PROXIMOS PASSOS: Adaptar → Executar → Monitorar → Ajustar
```

## COMPLETION CRITERIA

- Estrategia correta identificada pela intencao
- Cronograma dia-a-dia completo com templates personalizados
- Templates de Feed prontos para usar (quando aplicavel)
- Templates de Stories prontos para usar (quando aplicavel)
- Tom imperial em todas as pecas
- Score oraculo >= 80% em cada peca
- Formato de entrega padrao seguido (nome, objetivo, formato, cronograma, templates, proximos passos)

references:
  - data/estrategias.md
  - data/tipos-de-post.md
  - data/frameworks-copy.md
  - data/oraculo-posts.md

## Veto Conditions

| ID | Condição | Ação |
|----|----------|------|
| VC-strategy-01 | Intenção do usuário é ambígua e o Decisor Estratégico selecionou uma estratégia sem confirmação explícita | HALT — apresentar estratégia identificada e aguardar confirmação antes de executar |
| VC-strategy-02 | Cronograma entregue sem templates prontos para uso — apenas descrição do que fazer, sem o conteúdo real | HALT — refazer substituindo toda teoria por templates funcionais e personalizados |
| VC-strategy-03 | Algum dia do cronograma não tem progressão emocional em relação ao dia anterior — todos os dias com mesmo tom e intensidade | HALT — reestruturar arc emocional (dor → amplificação → paradigma → prova → ação) |
| VC-strategy-04 | Estratégia selecionada (E1-E8) não é validada pelo oráculo em nenhuma peça entregue | HALT — executar validação de cada peça antes de marcar estratégia como concluída |
| VC-strategy-05 | Estratégia entregue não se encaixa em nenhuma das 8 estratégias (E1-E8) e foi criada livremente sem aviso | HALT — mapear para a estratégia mais próxima e justificar desvio ao usuário |
