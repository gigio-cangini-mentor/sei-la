# Task: Enrich Metadata

Auto-generate metadata tags and topic extraction.

```yaml
task:
  id: enrich-metadata
  name: "Enrich with Auto-Generated Metadata"
  executor: etl-chief
  elicit: false

  description: |
    Optional enrichment phase that adds auto-generated metadata
    to the frontmatter. Called by normalize-output internally.

  input:
    required:
      - content: "Markdown content body (without frontmatter)"
      - title: "Document title"

  execution:
    steps:
      - step: 1
        name: "Detect language"
        action: |
          Use langdetect on first 2000 characters.
          Map: pt → pt-BR, en → en-US, es → es-ES, fr → fr-FR

      - step: 2
        name: "Count words"
        action: |
          Split content by whitespace, filter empty strings.
          Count = len(words)

      - step: 3
        name: "Extract tags"
        action: |
          Strategy:
          1. Extract all ## and ### headers
          2. Extract first sentence of each section
          3. Remove Portuguese stopwords (de, do, da, que, em, para, com, etc.)
          4. Count word frequency
          5. Select top 3-5 most frequent meaningful words
          6. Lowercase, normalize accents for consistency

      - step: 4
        name: "Detect TOC need"
        action: |
          Count headers (## and ###).
          If >= 3 headers: set toc: true

  output:
    format: |
      {
        "language": "pt-BR",
        "word_count": 3420,
        "tags": ["financeiro", "relatório", "investimento"],
        "toc": true
      }

  veto_conditions:
    - "Content is empty → return defaults: language=config.default, word_count=0, tags=[], toc=false"
    - "Content too short for language detection (< 20 chars) → use config default language"
    - "langdetect throws exception → use config default language, WARN in output"
    - "All extracted tags are stopwords → return empty tags list"
    - "Tag extraction produces > 10 candidates → select top 5 by frequency"

  completion_criteria:
    - "Language detected (or default used with warning)"
    - "Word count calculated"
    - "0-5 meaningful tags generated (0 is acceptable for short content)"
```
