#!/usr/bin/env python3
"""
Format detection and routing pipeline for transcript-sculptor.

This script scans an input folder for supported document files, detects their
format, routes them to appropriate converters, and generates an ingestion report.

Supported formats:
- Passthrough: .md, .txt (copy directly to raw/)
- PDF: .pdf (digital or scanned - detection in Story 1.3)
- Documents: .docx, .epub, .rtf, .odt (Pandoc - Story 1.4)
- Subtitles: .srt, .vtt (subtitle parser - Story 1.4)

Usage:
    python3 detect_format.py --input /path/to/input --output /path/to/output

Story: 1.2 - Format Detection and Routing Pipeline
"""

import argparse
import mimetypes
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, List, Tuple

try:
    import yaml
except ImportError:
    print("Error: PyYAML not installed. Install with: pip3 install pyyaml", file=sys.stderr)
    sys.exit(1)

# Import converter modules (stubs for Story 1.4)
from convert_pdf import convert_pdf
from convert_docs import convert_with_pandoc
from convert_subtitles import convert_subtitle


# Format detection mapping
FORMAT_MAP = {
    '.md': ('markdown', 'passthrough'),
    '.txt': ('txt', 'passthrough'),
    '.pdf': ('pdf', 'pdf-converter'),
    '.docx': ('docx', 'pandoc'),
    '.epub': ('epub', 'pandoc'),
    '.rtf': ('rtf', 'pandoc'),
    '.odt': ('odt', 'pandoc'),
    '.srt': ('srt', 'subtitle-parser'),
    '.vtt': ('vtt', 'subtitle-parser'),
}


def count_words(file_path: Path) -> int:
    """
    Count words in a text file.

    Args:
        file_path: Path to the file

    Returns:
        Number of words in the file

    Note:
        Assumes UTF-8 encoding. Returns 0 on read errors.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            return len(content.split())
    except Exception:
        return 0


def detect_format(file_path: Path) -> Tuple[str, str]:
    """
    Detect file format based on extension with MIME type fallback.

    Args:
        file_path: Path to the file

    Returns:
        Tuple of (format_name, converter_name)
        format_name: markdown, pdf, docx, epub, txt, rtf, odt, srt, vtt
        converter_name: passthrough, pdf-converter, pandoc, subtitle-parser, skipped

    Note:
        Returns ('unknown', 'skipped') for unsupported formats.
    """
    # Get extension (lowercase)
    ext = file_path.suffix.lower()

    # Check if extension is in our format map
    if ext in FORMAT_MAP:
        return FORMAT_MAP[ext]

    # Fallback: try MIME type detection
    mime_type, _ = mimetypes.guess_type(str(file_path))
    if mime_type:
        # Map common MIME types to formats
        mime_map = {
            'text/markdown': ('markdown', 'passthrough'),
            'text/plain': ('txt', 'passthrough'),
            'application/pdf': ('pdf', 'pdf-converter'),
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ('docx', 'pandoc'),
            'application/epub+zip': ('epub', 'pandoc'),
            'text/rtf': ('rtf', 'pandoc'),
            'application/vnd.oasis.opendocument.text': ('odt', 'pandoc'),
        }
        if mime_type in mime_map:
            return mime_map[mime_type]

    # Unknown format - skip
    return ('unknown', 'skipped')


def should_skip_file(file_path: Path) -> Tuple[bool, str]:
    """
    Determine if a file should be skipped.

    Args:
        file_path: Path to the file

    Returns:
        Tuple of (should_skip, reason)

    Skip conditions:
    - Hidden files (starting with .)
    - Symlinks
    - Files without extension
    """
    # Skip hidden files
    if file_path.name.startswith('.'):
        return (True, "hidden file")

    # Skip symlinks
    if file_path.is_symlink():
        return (True, "symlink")

    # Skip files without extension
    if not file_path.suffix:
        return (True, "no extension")

    return (False, "")


def passthrough_convert(input_path: Path, output_path: Path) -> None:
    """
    Copy file directly to output (passthrough converter for .md and .txt).

    Args:
        input_path: Path to the input file
        output_path: Path to the output file

    Note:
        Uses shutil.copy2 to preserve metadata.
    """
    output_path.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(input_path, output_path)


def route_to_converter(
    input_path: Path,
    output_path: Path,
    format_name: str,
    converter_name: str
) -> Tuple[str, str]:
    """
    Route file to appropriate converter and execute conversion.

    Args:
        input_path: Path to the input file
        output_path: Path to the output markdown file
        format_name: Detected format name
        converter_name: Converter to use

    Returns:
        Tuple of (status, error_message)
        status: "success" or "error"
        error_message: Empty string on success, error details on failure

    Note:
        For Story 1.2, only passthrough is implemented. Other converters
        raise NotImplementedError (to be implemented in Stories 1.3 and 1.4).
    """
    try:
        if converter_name == 'passthrough':
            passthrough_convert(input_path, output_path)
            return ("success", "")

        elif converter_name == 'pdf-converter':
            # Convert PDF (auto-detects digital vs scanned)
            result = convert_pdf(str(input_path), str(output_path))
            if result["status"] == "success":
                return ("success", "")
            else:
                return ("error", result.get("error", "Unknown error"))

        elif converter_name == 'pandoc':
            # Call appropriate Pandoc converter based on format
            if format_name == 'docx':
                from convert_docs import convert_docx
                result = convert_docx(str(input_path), str(output_path))
            elif format_name == 'epub':
                from convert_docs import convert_epub
                result = convert_epub(str(input_path), str(output_path))
            elif format_name == 'rtf':
                from convert_docs import convert_rtf
                result = convert_rtf(str(input_path), str(output_path))
            elif format_name == 'odt':
                from convert_docs import convert_odt
                result = convert_odt(str(input_path), str(output_path))
            else:
                return ("error", f"Unknown Pandoc format: {format_name}")

            if result["status"] == "success":
                return ("success", "")
            else:
                return ("error", result.get("error", "Unknown error"))

        elif converter_name == 'subtitle-parser':
            result = convert_subtitle(str(input_path), str(output_path))
            if result["status"] == "success":
                return ("success", "")
            else:
                return ("error", result.get("error", "Unknown error"))

        else:
            return ("error", f"Unknown converter: {converter_name}")

    except NotImplementedError as e:
        return ("error", f"Not yet implemented: {str(e)}")
    except Exception as e:
        return ("error", f"Conversion failed: {str(e)}")


def scan_folder(input_folder: Path) -> List[Path]:
    """
    Recursively scan folder for all files.

    Args:
        input_folder: Path to the input folder

    Returns:
        List of Path objects for all files found (excluding directories)
    """
    files = []
    for item in input_folder.rglob('*'):
        if item.is_file():
            files.append(item)
    return files


def generate_ingestion_report(
    input_folder: Path,
    output_folder: Path,
    file_results: List[Dict]
) -> None:
    """
    Generate ingestion-report.yaml in the output folder.

    Args:
        input_folder: Path to the input folder
        output_folder: Path to the output folder
        file_results: List of dictionaries with file processing results

    Report schema:
        ingestion_report:
          input_folder: str
          processed_at: ISO-8601 timestamp
          files: list of file result dicts
          summary: dict with totals
    """
    # Calculate summary
    total_files = len(file_results)
    processed = sum(1 for f in file_results if f['status'] == 'success')
    skipped = sum(1 for f in file_results if f['status'] == 'skipped')
    total_words = sum(f.get('word_count', 0) for f in file_results)

    # Build report structure
    report = {
        'ingestion_report': {
            'input_folder': str(input_folder),
            'processed_at': datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'),
            'files': file_results,
            'summary': {
                'total_files': total_files,
                'processed': processed,
                'skipped': skipped,
                'total_words': total_words,
            }
        }
    }

    # Write YAML report
    report_path = output_folder / 'ingestion-report.yaml'
    with open(report_path, 'w', encoding='utf-8') as f:
        yaml.dump(report, f, default_flow_style=False, allow_unicode=True, sort_keys=False)

    print(f"✓ Ingestion report generated: {report_path}")


def process_folder(input_folder: Path, output_folder: Path) -> None:
    """
    Main processing pipeline: scan, detect, convert, report.

    Args:
        input_folder: Path to the input folder
        output_folder: Path to the output folder

    Process:
        1. Scan input folder recursively
        2. Detect format for each file
        3. Route to appropriate converter
        4. Generate ingestion report
    """
    # Create output folder structure
    raw_folder = output_folder / 'raw'
    raw_folder.mkdir(parents=True, exist_ok=True)

    # Scan input folder
    print(f"Scanning input folder: {input_folder}")
    all_files = scan_folder(input_folder)
    print(f"Found {len(all_files)} files")

    # Process each file
    file_results = []
    for file_path in all_files:
        relative_path = file_path.relative_to(input_folder)
        print(f"\nProcessing: {relative_path}")

        # Check if should skip
        should_skip, skip_reason = should_skip_file(file_path)
        if should_skip:
            print(f"  Skipped: {skip_reason}")
            file_results.append({
                'original': str(relative_path),
                'format': 'unknown',
                'converter': 'skipped',
                'output': None,
                'status': 'skipped',
                'reason': skip_reason,
                'word_count': 0,
            })
            continue

        # Detect format
        format_name, converter_name = detect_format(file_path)
        print(f"  Format: {format_name}")
        print(f"  Converter: {converter_name}")

        # Skip unsupported formats
        if converter_name == 'skipped':
            print(f"  Skipped: unsupported format")
            file_results.append({
                'original': str(relative_path),
                'format': format_name,
                'converter': 'skipped',
                'output': None,
                'status': 'skipped',
                'reason': 'unsupported format',
                'word_count': 0,
            })
            continue

        # Determine output path
        output_filename = file_path.stem + '.md'
        output_path = raw_folder / output_filename

        # Route to converter
        status, error_msg = route_to_converter(
            file_path,
            output_path,
            format_name,
            converter_name
        )

        # Count words if successful
        word_count = 0
        if status == 'success':
            word_count = count_words(output_path)
            print(f"  ✓ Converted successfully ({word_count} words)")
        else:
            print(f"  ✗ Error: {error_msg}")

        # Record result
        result = {
            'original': str(relative_path),
            'format': format_name,
            'converter': converter_name,
            'output': str(output_path.relative_to(output_folder)) if status == 'success' else None,
            'status': status,
            'word_count': word_count,
        }
        if status == 'error':
            result['error'] = error_msg

        file_results.append(result)

    # Generate ingestion report
    print("\n" + "="*60)
    generate_ingestion_report(input_folder, output_folder, file_results)

    # Print summary
    summary = file_results[-1] if file_results else None
    if summary:
        print("\nSummary:")
        print(f"  Total files: {len(file_results)}")
        print(f"  Processed: {sum(1 for f in file_results if f['status'] == 'success')}")
        print(f"  Skipped: {sum(1 for f in file_results if f['status'] == 'skipped')}")
        print(f"  Errors: {sum(1 for f in file_results if f['status'] == 'error')}")


def main():
    """
    CLI entry point for format detection and routing pipeline.
    """
    parser = argparse.ArgumentParser(
        description='Format detection and routing pipeline for transcript-sculptor'
    )
    parser.add_argument(
        '--input',
        type=str,
        required=True,
        help='Input folder path (will be scanned recursively)'
    )
    parser.add_argument(
        '--output',
        type=str,
        required=True,
        help='Output folder path (will be created if it does not exist)'
    )

    args = parser.parse_args()

    # Validate input folder
    input_folder = Path(args.input).resolve()
    if not input_folder.exists():
        print(f"Error: Input folder does not exist: {input_folder}", file=sys.stderr)
        sys.exit(1)
    if not input_folder.is_dir():
        print(f"Error: Input path is not a directory: {input_folder}", file=sys.stderr)
        sys.exit(1)

    # Create output folder
    output_folder = Path(args.output).resolve()
    output_folder.mkdir(parents=True, exist_ok=True)

    # Run processing pipeline
    try:
        process_folder(input_folder, output_folder)
        print("\n✓ Processing complete!")
    except Exception as e:
        print(f"\n✗ Processing failed: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    main()
