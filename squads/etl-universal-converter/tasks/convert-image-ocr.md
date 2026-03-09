# Task: Convert Image via OCR

Extract text from images using Tesseract OCR.

```yaml
task:
  id: convert-image-ocr
  name: "Convert Image to Markdown via OCR"
  executor: etl-chief
  elicit: false

  input:
    required:
      - file_path: "Path to PNG, JPG, JPEG, TIFF, BMP, or WEBP file"
    optional:
      - language: "OCR language (default: por+eng for Portuguese + English)"

  execution:
    steps:
      - step: 1
        name: "Open and preprocess image"
        action: |
          ```python
          from PIL import Image, ImageEnhance, ImageFilter
          img = Image.open(file_path)

          # Convert to grayscale
          img = img.convert('L')

          # Enhance contrast if needed
          enhancer = ImageEnhance.Contrast(img)
          img = enhancer.enhance(1.5)
          ```

      - step: 2
        name: "Run OCR"
        action: |
          ```python
          import pytesseract

          # Extract text
          text = pytesseract.image_to_string(img, lang='por+eng')

          # Get confidence data
          data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
          confidences = [int(c) for c in data['conf'] if int(c) > 0]
          avg_confidence = sum(confidences) / len(confidences) if confidences else 0
          ```

      - step: 3
        name: "Evaluate quality"
        action: |
          - If avg_confidence < 30%: VETO — output would be garbage
          - If avg_confidence 30-50%: WARN in frontmatter
          - If avg_confidence > 50%: proceed normally

      - step: 4
        name: "Clean extracted text"
        action: |
          - Remove OCR artifacts (random single chars, excessive whitespace)
          - Fix common OCR errors (l→1, O→0 in numbers)
          - Normalize line breaks
          - Preserve paragraph structure

      - step: 5
        name: "Generate markdown"
        action: |
          Structure:
          ```markdown
          # {filename}

          {cleaned extracted text}
          ```

          Add to frontmatter:
          - ocr_confidence: {avg_confidence}%
          - ocr_language: "por+eng"

      - step: 6
        name: "Pass to normalize-output"
        action: "Send generated markdown to normalize-output task"

  veto_conditions:
    - "OCR confidence < 30% → SKIP with warning (VETO_LOW_OCR_CONFIDENCE)"
    - "Tesseract not installed → ERROR: 'brew install tesseract tesseract-lang' (PREFLIGHT_MISSING)"
    - "Image cannot be opened (corrupt) → SKIP (VETO_CORRUPT)"
    - "Image has no text (0 words extracted) → SKIP (VETO_WHITESPACE_ONLY)"
    - "Image resolution > 20000x20000 → SKIP (VETO_IMAGE_TOO_LARGE)"
    - "Image file > 100MB → SKIP: too large for OCR"
    - "Image is animated GIF → process first frame only, WARN"
    - "Image format not supported by Pillow → SKIP with format details"
    - "OCR confidence 30-50% → WARN in frontmatter but proceed"

  output:
    format: "Raw markdown content with OCR metadata"
    next_task: "normalize-output"

  completion_criteria:
    - "Text extracted with confidence > 30%"
    - "OCR artifacts cleaned"
    - "Confidence score recorded in frontmatter"
```
