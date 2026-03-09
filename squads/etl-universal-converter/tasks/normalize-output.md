# Task: Normalize Output

Apply standard frontmatter and formatting to all converted content.

```yaml
task:
  id: normalize-output
  name: "Normalize Output with Frontmatter"
  executor: etl-chief
  elicit: false

  description: |
    Central normalization task. ALL conversion tasks pass through here
    before saving. Ensures every output follows the same schema.

  input:
    required:
      - raw_content: "Markdown content from converter"
      - classification: "Classification object from classify-file"
    optional:
      - extra_metadata: "Additional metadata from converter (ocr_confidence, sheets, etc.)"

  execution:
    steps:
      - step: 1
        name: "Generate frontmatter"
        action: |
          Build YAML frontmatter from classification + content analysis:

          ```yaml
          ---
          title: "{derived from filename, cleaned}"
          source_type: "{category from classification}"
          source_format: "{extension without dot}"
          source_path: "{absolute path to original}"
          date_processed: "{today YYYY-MM-DD}"
          word_count: {count words in content}
          ---
          ```

      - step: 2
        name: "Detect language"
        action: |
          ```python
          from langdetect import detect
          language = detect(content[:2000])  # First 2000 chars sufficient
          ```
          Map to locale: pt → pt-BR, en → en-US, es → es-ES

      - step: 3
        name: "Generate tags"
        action: |
          Extract topic keywords from:
          - Title words (excluding stopwords)
          - First paragraph
          - Headers (## and ### level)
          Select top 3-5 most relevant as tags.

      - step: 4
        name: "Generate TOC"
        action: |
          If content has 3+ headers (## or ###):
          - Set toc: true in frontmatter
          Content with fewer headers: skip TOC.

      - step: 5
        name: "Normalize formatting and encoding"
        action: |
          Encoding self-healing:
          - Detect encoding with chardet
          - If not UTF-8: convert using cascade (UTF-8 → Latin-1 → CP1252 → ISO-8859-1)
          - On conversion: add original_encoding to frontmatter
          - Replace unmappable chars with Unicode replacement char, log count

          Formatting:
          - Ensure single # title at top
          - Normalize blank lines (max 2 consecutive)
          - Ensure trailing newline
          - Remove trailing whitespace per line
          - Strip null bytes if present (log warning)
          - Normalize line endings to LF (strip CR)
          - Ensure final output is valid UTF-8

      - step: 6
        name: "Merge extra metadata"
        action: |
          Add converter-specific fields to frontmatter:
          - spreadsheet: sheets (list), total_rows
          - presentation: slides (count)
          - image: ocr_confidence, ocr_language
          - video/audio: duration
          - book: pages, author

      - step: 7
        name: "Assemble final output"
        action: |
          Combine: frontmatter + blank line + normalized content

  veto_conditions:
    - "Raw content is empty or only whitespace → FAIL: nothing to normalize"
    - "Classification object is missing or malformed → FAIL: cannot generate frontmatter"
    - "Language detection fails (content too short < 20 chars) → use default language from config"
    - "Title derivation fails (filename is hash or UUID) → use 'Untitled — {date}' as title"
    - "Word count returns 0 despite non-empty content → investigate encoding, re-count after cleanup"
    - "Frontmatter YAML generation fails (special chars in title) → escape title properly"
    - "Content has mixed encodings → force UTF-8 with errors='replace', log replacements"

  output:
    format: "Complete markdown file content ready to save"
    next_task: "validate-output"

  completion_criteria:
    - "Frontmatter has all required fields"
    - "Content is properly formatted"
    - "Language detected"
    - "Word count calculated"
```
