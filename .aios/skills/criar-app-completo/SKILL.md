# Criar App Completo

Workflow end-to-end: Ideia > PRD > Arquivo Obsidian > App Preenchido.

## Usage

```bash
/criar-app-completo                    # Modo rapido (default)
/criar-app-completo --mode=complete    # Modo completo
/criar-app-completo --silent "ideia"   # Modo silencioso
```

## Implementation

Orchestrates three skills sequentially:
1. **prd-generator** — collects info, generates PRD
2. **obsidian-app-filler** — creates Obsidian file from template, fills all sections from PRD
3. Final validation and summary

Entry point: `orchestrator.js`

See `README.md` for full documentation and examples.
