# Projeto: {{project_title}}

**Status:** {{status_emoji}} {{status_text}}
**Última sessão:** {{last_session_date}}
**Próximo passo:** {{next_step}}

---

## Estado Atual

{{current_state}}

---

## Recursos do Projeto

### Squads

{{#squads}}
- `{{name}}` — {{description}}
{{/squads}}

### Tools

{{#tools}}
- `{{name}}` — {{description}}
{{/tools}}

### Skills

{{#skills}}
- `{{activation}}` — {{description}}
{{/skills}}

---

## Próximas Tarefas

| # | Tarefa | Recurso | Ativação |
|---|--------|---------|----------|
{{#project_tasks}}
{{#items}}
| {{order}} | {{task}} | `{{resource}}` | `{{activation}}` |
{{/items}}
{{/project_tasks}}
{{^project_tasks}}
| 1 | A definir | - | - |
{{/project_tasks}}

---

## Human Checklist

{{{human_checklist}}}

---

## Arquivos Relevantes

{{#stories}}
- `{{path}}` — {{description}}
{{/stories}}
{{^stories}}
- Nenhuma story encontrada
{{/stories}}

{{#checkpoint}}
- Checkpoint: `{{path}}`
{{/checkpoint}}

{{#scripts}}
- `docs/projects/{{project_name}}/scripts/{{filename}}` — {{description}}
{{/scripts}}

---

## Histórico

- {{last_session_date}}: Projeto criado
