# Task: route-speaking-demand

## Objective
Identificar o tipo de demanda e rotear para o(s) squad(s) satélite adequado(s).

## Inputs
- Objetivo do usuário.
- Contexto (evento, público, formato).
- Resultado esperado.

## Execution Steps
1. Classificar intenção principal da demanda.
2. Consultar matriz de roteamento.
3. Definir especialista primário e fallback.
4. Se híbrido, separar papéis por bloco de entrega.
5. Registrar decisão e justificativa.

## Output
- Mapa de roteamento (primário + fallback).
- Justificativa da escolha.
- Sequência sugerida de execução.

## Quality Gates
- QG-1: Intenção classificada sem ambiguidade.
- QG-2: Squad primário com aderência comprovada ao objetivo.
- QG-3: Handoff explícito entre especialistas.

## Veto Conditions
- VETO-1: Roteamento sem objetivo claro.
- VETO-2: Escolha por preferência pessoal sem critério técnico.
