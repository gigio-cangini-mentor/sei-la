# Task: Classify File

Detect file type and determine processing route.

```yaml
task:
  id: classify-file
  name: "Classify File Type"
  executor: etl-chief
  elicit: false

  input:
    required:
      - file_path: "Absolute path to file"
    optional:
      - force_type: "Override auto-detection (e.g., 'spreadsheet')"

  execution:
    steps:
      - step: 1
        name: "Check file exists"
        action: |
          Verify file exists and is readable.
          If not: return error with clear message.

      - step: 2
        name: "Get extension"
        action: |
          Extract file extension (lowercase).
          Example: /path/to/Report.XLSX → .xlsx

      - step: 3
        name: "Match routing table"
        action: |
          Look up extension in config.yaml routing matrix.
          Each category has: extensions[], processor, delegate (bool).

      - step: 4
        name: "MIME fallback"
        action: |
          If no extension match:
          ```bash
          file --mime-type -b "{file_path}"
          ```
          Map MIME to category:
          - application/pdf → book
          - image/* → image
          - text/csv → spreadsheet
          - application/json → data
          - text/plain → text
          - video/* → video
          - audio/* → audio

      - step: 5
        name: "Check veto conditions"
        action: |
          - File size 0? → VETO_EMPTY
          - File > 500MB (non-media)? → VETO_TOO_LARGE
          - Binary with no converter? → VETO_BINARY
          - Output .md exists without --overwrite? → VETO_OVERWRITE

      - step: 6
        name: "Return classification"
        action: |
          Return:
          {
            "file_path": "/path/to/file",
            "file_name": "filename.ext",
            "extension": ".ext",
            "category": "spreadsheet|video|book|...",
            "processor": "convert-spreadsheet|media-processor|...",
            "delegate": true|false,
            "file_size": "2.3 MB",
            "veto": null|"VETO_REASON"
          }

  veto_conditions:
    - "File does not exist → ERROR"
    - "File is 0 bytes → SKIP (VETO_EMPTY)"
    - "Binary without converter → SKIP (VETO_BINARY)"
    - "Output exists without --overwrite → SKIP (VETO_OVERWRITE)"
    - "File is symbolic link → resolve target, if broken → SKIP (VETO_SYMLINK)"
    - "File is archive (.zip, .tar, .gz, .rar) → SKIP with suggestion to extract first (VETO_NESTED_ARCHIVE)"
    - "File is encrypted/password-protected → SKIP (VETO_ENCRYPTED)"
    - "File > 500MB (non-media) → SKIP (VETO_TOO_LARGE)"
    - "File path contains null bytes → ERROR (security)"
    - "File is a directory (not a file) → ERROR with suggestion to use *batch"

  output:
    format: "Classification object (JSON)"
    used_by: ["wf-convert-single", "wf-convert-batch"]

  completion_criteria:
    - "File type determined or veto reason given"
    - "Processor identified"
    - "No ambiguity in classification"
```
