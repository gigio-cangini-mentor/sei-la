# Task: Convert Data File

Convert JSON, YAML, XML, and TOML files to readable markdown.

```yaml
task:
  id: convert-data-file
  name: "Convert Data File to Markdown"
  executor: etl-chief
  elicit: false

  input:
    required:
      - file_path: "Path to JSON, YAML, YML, XML, or TOML file"

  execution:
    steps:
      - step: 1
        name: "Parse file"
        action: |
          Based on extension:
          - .json → json.load()
          - .yaml/.yml → yaml.safe_load()
          - .xml → xml.etree.ElementTree.parse()
          - .toml → tomllib.load() (Python 3.11+)

      - step: 2
        name: "Determine structure"
        action: |
          - Array of objects → markdown TABLE
          - Nested object → markdown HEADERS + key-value pairs
          - Simple key-value → definition list
          - Mixed → hierarchical headers

      - step: 3
        name: "Generate markdown"
        action: |
          For ARRAY OF OBJECTS:
          ```markdown
          # {filename}
          | key1 | key2 | key3 |
          |------|------|------|
          | val  | val  | val  |
          ```

          For NESTED OBJECT:
          ```markdown
          # {filename}
          ## {top_level_key}
          - **subkey:** value
          - **subkey2:** value

          ### {nested_key}
          - item 1
          - item 2
          ```

          For XML:
          ```markdown
          # {root_element}
          ## {child_element}
          - **@attribute:** value
          - **text:** content
          ```

      - step: 4
        name: "Pass to normalize-output"
        action: "Send generated markdown to normalize-output task"

  veto_conditions:
    - "Invalid/malformed file → SKIP with parse error details (VETO_CORRUPT)"
    - "File > 50MB → SKIP (VETO_TOO_LARGE for data files)"
    - "Binary content in JSON → SKIP fields, note in output"
    - "JSON array with > 10,000 objects → truncate to first 500 + summary"
    - "YAML with anchors/aliases → resolve before conversion"
    - "XML with DTD/external entities → SKIP entity resolution (security), process structure only"
    - "Deeply nested structure (> 10 levels) → flatten with dot notation beyond level 10"
    - "Circular references in YAML → detect and SKIP with warning"

  output:
    format: "Raw markdown content"
    next_task: "normalize-output"

  completion_criteria:
    - "File parsed without errors"
    - "Structure converted to readable markdown"
    - "Arrays shown as tables when applicable"
```
