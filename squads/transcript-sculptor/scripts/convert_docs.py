#!/usr/bin/env python3
"""
Document conversion module for transcript-sculptor.

This module handles conversion of various document formats to markdown
using Pandoc as the primary converter.

Supported formats:
- DOCX (Microsoft Word)
- EPUB (eBook format)
- RTF (Rich Text Format)
- ODT (OpenDocument Text)

Story: 1.4 - DOCX, EPUB and Other Format Conversion
"""

import shutil
import subprocess
import sys
from pathlib import Path
from typing import Dict


def verify_pandoc() -> bool:
    """
    Verify that Pandoc is installed and accessible.

    Returns:
        True if Pandoc is available, False otherwise

    Note:
        Prints error message to stderr if Pandoc is not found.
    """
    if shutil.which("pandoc") is None:
        print(
            "Error: Pandoc is not installed or not in PATH. "
            "Install from https://pandoc.org/installing.html",
            file=sys.stderr
        )
        return False
    return True


def convert_with_pandoc(
    input_path: str,
    output_path: str,
    input_format: str
) -> Dict[str, any]:
    """
    Convert a document to markdown using Pandoc.

    Args:
        input_path: Path to the input document file
        output_path: Path to the output markdown file
        input_format: Source format identifier (docx, epub, rtf, odt)

    Returns:
        Dictionary with conversion results:
        {
            "status": "success" | "error",
            "word_count": int,
            "images_extracted": int,
            "error": str (only if status is "error")
        }

    Raises:
        FileNotFoundError: If Pandoc is not installed
        subprocess.CalledProcessError: If Pandoc conversion fails
    """
    # Verify Pandoc is installed
    if not verify_pandoc():
        return {
            "status": "error",
            "word_count": 0,
            "images_extracted": 0,
            "error": "Pandoc not installed"
        }

    # Convert paths to Path objects
    input_file = Path(input_path)
    output_file = Path(output_path)

    # Create output directory if it doesn't exist
    output_file.parent.mkdir(parents=True, exist_ok=True)

    # Setup attachments directory for image extraction
    attachments_dir = output_file.parent / "attachments" / input_file.stem
    attachments_dir.mkdir(parents=True, exist_ok=True)

    try:
        # Build Pandoc command
        # Use --wrap=none to prevent line wrapping in output
        # Use --extract-media to extract embedded images
        cmd = [
            "pandoc",
            "-f", input_format,
            "-t", "markdown",
            "--wrap=none",
            f"--extract-media={attachments_dir}",
            str(input_file),
            "-o", str(output_file)
        ]

        # Run Pandoc
        result = subprocess.run(
            cmd,
            check=True,
            capture_output=True,
            text=True
        )

        # Count words in output file
        word_count = 0
        if output_file.exists():
            with open(output_file, 'r', encoding='utf-8') as f:
                content = f.read()
                word_count = len(content.split())

        # Count extracted images
        images_extracted = 0
        if attachments_dir.exists():
            # Count all files in attachments directory (recursively)
            images_extracted = sum(1 for _ in attachments_dir.rglob('*') if _.is_file())

        return {
            "status": "success",
            "word_count": word_count,
            "images_extracted": images_extracted
        }

    except subprocess.CalledProcessError as e:
        error_msg = e.stderr if e.stderr else str(e)
        return {
            "status": "error",
            "word_count": 0,
            "images_extracted": 0,
            "error": f"Pandoc conversion failed: {error_msg}"
        }
    except Exception as e:
        return {
            "status": "error",
            "word_count": 0,
            "images_extracted": 0,
            "error": f"Conversion error: {str(e)}"
        }


def convert_docx(input_path: str, output_path: str) -> Dict[str, any]:
    """
    Convert a DOCX file to markdown.

    Args:
        input_path: Path to the input DOCX file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results (see convert_with_pandoc)
    """
    return convert_with_pandoc(input_path, output_path, "docx")


def convert_epub(input_path: str, output_path: str) -> Dict[str, any]:
    """
    Convert an EPUB file to markdown.

    Args:
        input_path: Path to the input EPUB file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results (see convert_with_pandoc)
    """
    return convert_with_pandoc(input_path, output_path, "epub")


def convert_rtf(input_path: str, output_path: str) -> Dict[str, any]:
    """
    Convert an RTF file to markdown.

    Args:
        input_path: Path to the input RTF file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results (see convert_with_pandoc)
    """
    return convert_with_pandoc(input_path, output_path, "rtf")


def convert_odt(input_path: str, output_path: str) -> Dict[str, any]:
    """
    Convert an ODT file to markdown.

    Args:
        input_path: Path to the input ODT file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results (see convert_with_pandoc)
    """
    return convert_with_pandoc(input_path, output_path, "odt")
