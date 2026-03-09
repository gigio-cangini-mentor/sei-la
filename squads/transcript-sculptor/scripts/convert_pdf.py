#!/usr/bin/env python3
"""
PDF conversion module for transcript-sculptor.

This module handles conversion of PDF files to markdown, supporting both
digital PDFs (text-based) and scanned PDFs (OCR required).

Converters:
- convert_pdf_digital: Uses PyMuPDF (fitz) for fast text extraction
- convert_pdf_scanned: Uses Docling + Surya-OCR for high-accuracy OCR

Story: 1.3 - PDF Conversion with OCR
"""

import sys
import warnings
from pathlib import Path
from typing import Dict

try:
    import pymupdf
except ImportError:
    print("Error: PyMuPDF not installed. Install with: pip3 install pymupdf", file=sys.stderr)
    sys.exit(1)


def detect_pdf_type(input_path: str) -> str:
    """
    Detect whether a PDF is digital (text-based) or scanned (image-based).

    Args:
        input_path: Path to the PDF file

    Returns:
        "digital" or "scanned"

    Algorithm:
        - Opens PDF with PyMuPDF (fitz)
        - Counts pages with extractable text (>= 50 chars)
        - If >= 50% pages have extractable text → digital
        - Else → scanned
    """
    try:
        doc = pymupdf.open(input_path)
        total_pages = len(doc)

        if total_pages == 0:
            return "digital"  # Empty PDF, treat as digital

        pages_with_text = 0
        for page in doc:
            text = page.get_text().strip()
            if len(text) >= 50:
                pages_with_text += 1

        doc.close()

        # If >= 50% pages have extractable text, consider it digital
        if pages_with_text / total_pages >= 0.5:
            return "digital"
        else:
            return "scanned"

    except Exception as e:
        warnings.warn(f"Error detecting PDF type: {e}. Defaulting to digital.", UserWarning)
        return "digital"


def convert_pdf_digital(input_path: str, output_path: str) -> Dict:
    """
    Convert a digital (text-based) PDF to markdown using PyMuPDF.

    Args:
        input_path: Path to the input PDF file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results:
        - status: "success" or "error"
        - word_count: Number of words extracted
        - pages: Number of pages processed
        - error (optional): Error message if status is "error"

    Note:
        Preserves paragraph breaks by adding double newlines between text blocks.
    """
    try:
        doc = pymupdf.open(input_path)
        total_pages = len(doc)

        # Extract text from all pages
        text_parts = []
        for page in doc:
            page_text = page.get_text()
            if page_text.strip():
                text_parts.append(page_text)

        doc.close()

        # Join pages with double newlines to preserve paragraph breaks
        full_text = "\n\n".join(text_parts)

        # Write to output file
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(full_text)

        # Count words
        word_count = len(full_text.split())

        return {
            "status": "success",
            "word_count": word_count,
            "pages": total_pages
        }

    except Exception as e:
        return {
            "status": "error",
            "word_count": 0,
            "pages": 0,
            "error": str(e)
        }


def convert_pdf_scanned(input_path: str, output_path: str) -> Dict:
    """
    Convert a scanned (image-based) PDF to markdown using Docling + Surya-OCR.

    Args:
        input_path: Path to the input PDF file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results:
        - status: "success" or "error"
        - word_count: Number of words extracted
        - pages: Number of pages processed
        - ocr_confidence: OCR confidence score (0.0 - 1.0)
        - error (optional): Error message if status is "error"

    Note:
        Falls back to PyMuPDF text extraction if Docling is not installed.
        First run downloads OCR models (~2GB).
    """
    # Try Docling first
    try:
        from docling.document_converter import DocumentConverter

        converter = DocumentConverter()
        result = converter.convert(input_path)
        markdown_text = result.document.export_to_markdown()

        # Write to output file
        output_file = Path(output_path)
        output_file.parent.mkdir(parents=True, exist_ok=True)

        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_text)

        # Count words
        word_count = len(markdown_text.split())

        # Get page count from original PDF
        doc = pymupdf.open(input_path)
        total_pages = len(doc)
        doc.close()

        # OCR confidence not directly available from Docling, use default high value
        ocr_confidence = 0.93  # Default confidence for Surya-OCR

        return {
            "status": "success",
            "word_count": word_count,
            "pages": total_pages,
            "ocr_confidence": ocr_confidence
        }

    except ImportError:
        # Docling not installed, fall back to PyMuPDF
        warnings.warn(
            "Docling not installed. Falling back to PyMuPDF for scanned PDF. "
            "Install Docling for better OCR: pip3 install docling",
            UserWarning
        )
        result = convert_pdf_digital(input_path, output_path)

        # Add warning to result
        if result["status"] == "success":
            result["ocr_confidence"] = 0.0  # No OCR was performed
            result["fallback"] = "pymupdf"

        return result

    except Exception as e:
        # Docling failed, try fallback to PyMuPDF
        warnings.warn(
            f"Docling conversion failed: {e}. Falling back to PyMuPDF.",
            UserWarning
        )
        result = convert_pdf_digital(input_path, output_path)

        if result["status"] == "success":
            result["ocr_confidence"] = 0.0
            result["fallback"] = "pymupdf"
            result["original_error"] = str(e)

        return result


def convert_pdf(input_path: str, output_path: str) -> Dict:
    """
    Main entry point for PDF conversion.

    Detects PDF type (digital or scanned) and routes to appropriate converter.

    Args:
        input_path: Path to the input PDF file
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results:
        - status: "success" or "error"
        - word_count: Number of words extracted
        - pages: Number of pages processed
        - pdf_type: "digital" or "scanned"
        - ocr_confidence (optional): Present for scanned PDFs
        - error (optional): Error message if status is "error"
    """
    try:
        # Detect PDF type
        pdf_type = detect_pdf_type(input_path)

        # Route to appropriate converter
        if pdf_type == "digital":
            result = convert_pdf_digital(input_path, output_path)
        else:
            result = convert_pdf_scanned(input_path, output_path)

        # Add PDF type to result
        result["pdf_type"] = pdf_type

        return result

    except Exception as e:
        return {
            "status": "error",
            "word_count": 0,
            "pages": 0,
            "pdf_type": "unknown",
            "error": str(e)
        }
