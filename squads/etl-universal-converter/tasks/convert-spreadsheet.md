# Task: Convert Spreadsheet

Convert CSV, TSV, or Excel files to markdown tables.

```yaml
task:
  id: convert-spreadsheet
  name: "Convert Spreadsheet to Markdown"
  executor: etl-chief
  elicit: false

  input:
    required:
      - file_path: "Path to CSV, TSV, XLSX, XLS, or ODS file"
    optional:
      - max_rows: "Max rows to include (default: 100, show 50 + summary if exceeded)"
      - sheet: "Specific sheet name for Excel (default: all)"

  execution:
    steps:
      - step: 1
        name: "Detect format"
        action: |
          - .csv → polars.read_csv()
          - .tsv → polars.read_csv(separator='\t')
          - .xlsx/.xls → openpyxl to list sheets, polars to read each
          - .ods → polars.read_ods() if supported, else openpyxl

      - step: 2
        name: "Read data"
        action: |
          For CSV/TSV:
          ```python
          import polars as pl
          df = pl.read_csv(file_path)
          ```

          For Excel (all sheets):
          ```python
          from openpyxl import load_workbook
          wb = load_workbook(file_path, read_only=True)
          sheets = wb.sheetnames
          for sheet_name in sheets:
              df = pl.read_excel(file_path, sheet_name=sheet_name)
          ```

      - step: 3
        name: "Apply row limits"
        action: |
          If rows > 100:
            - Include first 50 rows as table
            - Add summary: row count, column stats, null counts
          If rows <= 100:
            - Include all rows as markdown table

      - step: 4
        name: "Generate markdown"
        action: |
          Use tabulate or manual pipe-table formatting.
          Each Excel sheet → separate ## section.

          Structure:
          ```markdown
          # {filename}

          ## Data Summary
          - **Rows:** {total_rows}
          - **Columns:** {column_names}
          - **Null values:** {null_summary}

          ## Sheet: {sheet_name} (Excel only)

          | Column1 | Column2 | Column3 |
          |---------|---------|---------|
          | value   | value   | value   |

          > **Note:** Showing first 50 of {total} rows.
          ```

      - step: 5
        name: "Pass to normalize-output"
        action: "Send generated markdown to normalize-output task"

  veto_conditions:
    - "File is encrypted/password-protected → SKIP (VETO_ENCRYPTED)"
    - "File has 0 rows → SKIP with warning (VETO_EMPTY)"
    - "Polars cannot parse → try pandas fallback → if fails, SKIP with parse error details"
    - "CSV/Excel has > 1,000,000 rows → SKIP (VETO_SPREADSHEET_TOO_LARGE)"
    - "Excel has > 50 sheets → WARN but process (truncate to first 50)"
    - "CSV with mixed delimiters → attempt auto-detect with polars, if fails → SKIP"
    - "CSV with mixed encodings → apply encoding cascade (UTF-8 → Latin-1 → CP1252)"
    - "File size > 200MB → WARN: processing may be slow, proceed with row sampling"
    - "Column count > 100 → WARN: wide table will be truncated for readability"

  output:
    format: "Raw markdown content (pre-normalization)"
    next_task: "normalize-output"

  completion_criteria:
    - "All sheets processed (Excel)"
    - "Tables properly formatted as markdown"
    - "Row limits respected"
```
