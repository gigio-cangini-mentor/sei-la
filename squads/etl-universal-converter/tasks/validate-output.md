# Task: Validate Output

Quality gate for converted markdown files.

```yaml
task:
  id: validate-output
  name: "Validate Converted Output"
  executor: etl-chief
  elicit: false

  description: |
    Final quality check before saving. Ensures output meets
    the ETL Universal Converter quality standards.

  input:
    required:
      - content: "Complete markdown content (frontmatter + body)"
      - output_path: "Where the file will be saved"

  execution:
    steps:
      - step: 1
        name: "Validate frontmatter"
        action: |
          Parse YAML frontmatter and check required fields:
          - title: non-empty string
          - source_type: one of [video, audio, book, document, spreadsheet, presentation, image, data, text]
          - source_format: non-empty string
          - source_path: valid path
          - date_processed: valid ISO date
          - word_count: integer > 0

      - step: 2
        name: "Validate content"
        action: |
          - Content after frontmatter is non-empty
          - No raw HTML tags (unless in code blocks)
          - Headers are properly nested (no jump from # to ###)
          - UTF-8 encoding confirmed
          - No null bytes or control characters

      - step: 3
        name: "Check output path"
        action: |
          - Output directory exists (or can be created)
          - Output file does not exist (or --overwrite is set)
          - Sufficient disk space

      - step: 4
        name: "Save file"
        action: |
          If all checks pass:
          - Write content to output_path
          - Verify file was written correctly (read back and compare size)
          - Report success with summary

          If any check fails:
          - Report specific failure reason
          - Do NOT save partial/invalid output

  veto_conditions:
    - "Frontmatter missing required fields → FAIL with list of missing fields"
    - "Content is empty → FAIL (VETO_EMPTY)"
    - "Output path not writable → FAIL with permission details"
    - "Frontmatter YAML is malformed → FAIL with parse error"
    - "word_count is 0 or negative → FAIL"
    - "source_path does not point to existing file → WARN (source may have been moved)"
    - "date_processed is not today → WARN (stale conversion)"
    - "Output file already exists and --overwrite not set → FAIL (VETO_OVERWRITE)"
    - "Disk space < 10MB remaining → FAIL with disk space warning"
    - "Output filename collision in batch → rename with suffix (_2, _3)"

  output:
    format: |
      {
        "status": "PASS|FAIL",
        "output_path": "/path/to/output.md",
        "word_count": N,
        "language": "pt-BR",
        "warnings": []
      }

  completion_criteria:
    - "All validation checks passed"
    - "File saved successfully"
    - "File readable after save"
```
