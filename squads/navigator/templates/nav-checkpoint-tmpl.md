# Checkpoint: {{project_name}}

**Data:** {{checkpoint_date}}
**Tipo:** {{checkpoint_type}}

---

## Resumo

{{session_summary}}

## Arquivos Modificados

{{#modified_files}}
- `{{file_path}}` ({{change_type}})
{{/modified_files}}

**Total:** {{total_modified_files}} arquivos

## Recursos Usados

{{#resources_used}}
{{#items}}
- `{{name}}` — {{description}}
{{/items}}
{{/resources_used}}

## Próximo Passo

{{next_step}}

---

**Restore:** Consulte `docs/projects/{{project_name}}/INDEX.md` (fonte da verdade)
