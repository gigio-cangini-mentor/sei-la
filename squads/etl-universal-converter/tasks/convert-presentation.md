# Task: Convert Presentation

Convert PowerPoint and other presentation files to markdown.

```yaml
task:
  id: convert-presentation
  name: "Convert Presentation to Markdown"
  executor: etl-chief
  elicit: false

  input:
    required:
      - file_path: "Path to PPTX, PPT, or ODP file"

  execution:
    steps:
      - step: 1
        name: "Open presentation"
        action: |
          ```python
          from pptx import Presentation
          prs = Presentation(file_path)
          ```

      - step: 2
        name: "Extract slides"
        action: |
          For each slide:
          1. Get slide title (first title shape or "Slide {N}")
          2. Extract text from all shapes (textframes)
          3. Extract speaker notes from notes_slide
          4. Note presence of images/charts (cannot extract, mention)
          5. Preserve bullet point structure

      - step: 3
        name: "Generate markdown"
        action: |
          Structure:
          ```markdown
          # {filename}

          **Slides:** {count}

          ---

          ## Slide 1: {title}

          {body text with bullet points preserved}

          > **Speaker Notes:** {notes text}

          ---

          ## Slide 2: {title}
          ...
          ```

      - step: 4
        name: "Pass to normalize-output"
        action: "Send generated markdown to normalize-output task"

  veto_conditions:
    - "File is encrypted → SKIP (VETO_ENCRYPTED)"
    - "python-pptx cannot open → SKIP with error details"
    - "0 slides → SKIP (VETO_EMPTY)"
    - "Presentation has > 200 slides → SKIP (VETO_PRESENTATION_TOO_LARGE)"
    - "File is .ppt (legacy binary format) → WARN: limited support, may lose formatting"
    - "File is .odp → WARN: partial support via python-pptx compatibility"
    - "Slide contains only images (no text) → include placeholder: '[Image-only slide]'"
    - "Speaker notes > 5000 chars per slide → truncate with '... [truncated]'"

  output:
    format: "Raw markdown content (pre-normalization)"
    next_task: "normalize-output"

  completion_criteria:
    - "All slides extracted"
    - "Speaker notes included when present"
    - "Slide structure preserved"
```
