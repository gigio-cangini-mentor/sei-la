# Task: Convert Text

Normalize plain text and existing markdown files.

```yaml
task:
  id: convert-text
  name: "Convert/Normalize Text File"
  executor: etl-chief
  elicit: false

  input:
    required:
      - file_path: "Path to TXT, MD, RST, or LOG file"

  execution:
    steps:
      - step: 1
        name: "Detect encoding"
        action: |
          ```python
          import chardet
          with open(file_path, 'rb') as f:
              raw = f.read()
              detected = chardet.detect(raw)
          encoding = detected['encoding'] or 'utf-8'
          content = raw.decode(encoding)
          ```

      - step: 2
        name: "Process by type"
        action: |
          For .txt:
          - Detect if it has structure (headers with caps, numbered lists)
          - Convert obvious structure to markdown
          - Normalize line breaks (remove excessive blank lines)
          - Wrap at natural paragraph boundaries

          For .md:
          - Check for existing frontmatter
          - If has frontmatter: merge with standard schema (add missing fields)
          - If no frontmatter: add standard frontmatter
          - Normalize header levels (ensure single # at top)
          - Do NOT modify content text

          For .rst:
          - Convert RST headers to markdown headers
          - Convert RST directives to markdown equivalents
          - Preserve code blocks

          For .log:
          - Wrap in code block
          - Add summary at top (line count, date range if parseable)

      - step: 3
        name: "Pass to normalize-output"
        action: "Send content to normalize-output task"

  veto_conditions:
    - "Binary content detected in text file → SKIP (VETO_BINARY)"
    - "Encoding detection fails → cascade: UTF-8 → Latin-1 → CP1252 → ISO-8859-1 → SKIP"
    - "File contains only whitespace → SKIP (VETO_WHITESPACE_ONLY)"
    - "File > 10MB → WARN: large text file, processing may be slow"
    - "Mixed line endings (CRLF + LF) → normalize to LF"
    - "Existing .md file has invalid YAML frontmatter → fix frontmatter, WARN about corrections"
    - "File contains null bytes → strip null bytes, WARN about cleanup"

  encoding_cascade:
    description: "Self-healing encoding detection"
    steps:
      - "1. chardet detection with confidence > 70%"
      - "2. Try UTF-8 strict decode"
      - "3. Try UTF-8 with errors='replace' (log replacements)"
      - "4. Try Latin-1 (always succeeds but may be wrong)"
      - "5. Try CP1252 (Windows common)"
      - "6. Try ISO-8859-1"
      - "7. If all produce garbage → SKIP with encoding details"
    on_conversion: "Log original encoding in frontmatter: original_encoding: 'detected-encoding'"

  output:
    format: "Markdown content"
    next_task: "normalize-output"

  completion_criteria:
    - "Content is valid UTF-8"
    - "Structure preserved or enhanced"
    - "No content modification for .md files (only frontmatter)"
```
