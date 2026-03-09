#!/usr/bin/env python3
"""
Subtitle conversion module for transcript-sculptor.

This module handles conversion of subtitle files (SRT, VTT) to markdown,
extracting text content and preserving timing information as context markers.

Supported formats:
- SRT (SubRip subtitle format)
- VTT (WebVTT subtitle format)

Story: 1.4 - DOCX, EPUB and Other Format Conversion
"""

import re
from pathlib import Path
from typing import Dict, List


def format_timestamp(seconds: float) -> str:
    """
    Convert seconds to [HH:MM:SS] format.

    Args:
        seconds: Time in seconds

    Returns:
        Formatted timestamp string like [00:05:23]

    Examples:
        >>> format_timestamp(323.5)
        '[00:05:23]'
        >>> format_timestamp(65.0)
        '[00:01:05]'
    """
    hours = int(seconds // 3600)
    minutes = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    return f"[{hours:02d}:{minutes:02d}:{secs:02d}]"


def parse_srt_timestamp(timestamp_str: str) -> float:
    """
    Parse SRT timestamp format to seconds.

    Args:
        timestamp_str: SRT timestamp like "00:05:23,500"

    Returns:
        Time in seconds (float)

    Examples:
        >>> parse_srt_timestamp("00:05:23,500")
        323.5
    """
    # Format: HH:MM:SS,mmm
    match = re.match(r'(\d{2}):(\d{2}):(\d{2}),(\d{3})', timestamp_str)
    if not match:
        return 0.0

    hours, minutes, seconds, milliseconds = match.groups()
    total_seconds = (
        int(hours) * 3600 +
        int(minutes) * 60 +
        int(seconds) +
        int(milliseconds) / 1000
    )
    return total_seconds


def parse_vtt_timestamp(timestamp_str: str) -> float:
    """
    Parse VTT timestamp format to seconds.

    Args:
        timestamp_str: VTT timestamp like "00:05:23.500" or "05:23.500"

    Returns:
        Time in seconds (float)

    Examples:
        >>> parse_vtt_timestamp("00:05:23.500")
        323.5
        >>> parse_vtt_timestamp("05:23.500")
        323.5
    """
    # Format: [HH:]MM:SS.mmm
    # Hours are optional in VTT
    match = re.match(r'(?:(\d{2}):)?(\d{2}):(\d{2})\.(\d{3})', timestamp_str)
    if not match:
        return 0.0

    hours, minutes, seconds, milliseconds = match.groups()
    hours = int(hours) if hours else 0
    total_seconds = (
        hours * 3600 +
        int(minutes) * 60 +
        int(seconds) +
        int(milliseconds) / 1000
    )
    return total_seconds


def parse_srt(content: str) -> List[Dict]:
    """
    Parse SRT format content.

    Args:
        content: Full SRT file content as string

    Returns:
        List of subtitle blocks with structure:
        [
            {
                "start": float (seconds),
                "end": float (seconds),
                "text": str (cleaned subtitle text)
            },
            ...
        ]

    Note:
        SRT format:
        1
        00:00:01,000 --> 00:00:04,000
        Subtitle text line 1
        Subtitle text line 2

        2
        00:00:04,500 --> 00:00:08,000
        Next subtitle
    """
    blocks = []
    current_block = None

    # Split into lines and process
    lines = content.strip().split('\n')
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # Skip empty lines
        if not line:
            i += 1
            continue

        # Check if this is a sequence number (just digits)
        if line.isdigit():
            current_block = {"text": ""}
            i += 1
            continue

        # Check if this is a timestamp line
        if '-->' in line:
            if current_block is not None:
                # Parse timestamps
                parts = line.split('-->')
                if len(parts) == 2:
                    start_str = parts[0].strip()
                    end_str = parts[1].strip().split()[0]  # Remove any trailing info
                    current_block["start"] = parse_srt_timestamp(start_str)
                    current_block["end"] = parse_srt_timestamp(end_str)
            i += 1
            continue

        # Otherwise, this is subtitle text
        if current_block is not None and "start" in current_block:
            # Add text to current block
            if current_block["text"]:
                current_block["text"] += " "
            current_block["text"] += line

            # Check if next line is empty or sequence number (end of block)
            if i + 1 >= len(lines) or not lines[i + 1].strip() or lines[i + 1].strip().isdigit():
                blocks.append(current_block)
                current_block = None

        i += 1

    # Add last block if exists
    if current_block and "start" in current_block:
        blocks.append(current_block)

    return blocks


def parse_vtt(content: str) -> List[Dict]:
    """
    Parse VTT format content.

    Args:
        content: Full VTT file content as string

    Returns:
        List of subtitle blocks (same format as parse_srt)

    Note:
        VTT format:
        WEBVTT

        00:00:01.000 --> 00:00:04.000
        Subtitle text

        00:00:04.500 --> 00:00:08.000
        Next subtitle
    """
    blocks = []
    lines = content.strip().split('\n')
    i = 0

    # Skip WEBVTT header
    while i < len(lines):
        if lines[i].strip().startswith('WEBVTT'):
            i += 1
            break
        i += 1

    current_block = None

    while i < len(lines):
        line = lines[i].strip()

        # Skip empty lines
        if not line:
            i += 1
            continue

        # Check if this is a timestamp line
        if '-->' in line:
            current_block = {"text": ""}
            # Parse timestamps
            parts = line.split('-->')
            if len(parts) == 2:
                start_str = parts[0].strip()
                end_str = parts[1].strip().split()[0]  # Remove any trailing info
                current_block["start"] = parse_vtt_timestamp(start_str)
                current_block["end"] = parse_vtt_timestamp(end_str)
            i += 1
            continue

        # Check if this is a cue identifier (appears before timestamp)
        # Skip cue identifiers (they don't contain -->)
        if current_block is None and '-->' not in line:
            i += 1
            continue

        # Otherwise, this is subtitle text
        if current_block is not None and "start" in current_block:
            # Add text to current block
            if current_block["text"]:
                current_block["text"] += " "
            current_block["text"] += line

            # Check if next line is empty or timestamp (end of block)
            if i + 1 >= len(lines) or not lines[i + 1].strip() or '-->' in lines[i + 1]:
                blocks.append(current_block)
                current_block = None

        i += 1

    # Add last block if exists
    if current_block and "start" in current_block:
        blocks.append(current_block)

    return blocks


def clean_subtitle_text(text: str) -> str:
    """
    Clean subtitle text by removing HTML tags and extra whitespace.

    Args:
        text: Raw subtitle text

    Returns:
        Cleaned text

    Note:
        Removes common HTML tags: <i>, <b>, <u>, <font>, etc.
    """
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', '', text)

    # Remove extra whitespace
    text = re.sub(r'\s+', ' ', text)

    return text.strip()


def group_subtitles_into_paragraphs(blocks: List[Dict], gap_threshold: float = 2.0) -> List[Dict]:
    """
    Group consecutive subtitle blocks into paragraphs.

    Args:
        blocks: List of subtitle blocks from parse_srt or parse_vtt
        gap_threshold: Maximum gap in seconds to merge blocks (default: 2.0)

    Returns:
        List of merged blocks with same structure as input

    Note:
        Merges blocks if the gap between end of one and start of next
        is less than gap_threshold seconds.
    """
    if not blocks:
        return []

    merged = []
    current = blocks[0].copy()

    for i in range(1, len(blocks)):
        next_block = blocks[i]
        gap = next_block["start"] - current["end"]

        if gap <= gap_threshold:
            # Merge with current
            current["text"] += " " + next_block["text"]
            current["end"] = next_block["end"]
        else:
            # Save current and start new paragraph
            merged.append(current)
            current = next_block.copy()

    # Add last paragraph
    merged.append(current)

    return merged


def convert_subtitle(input_path: str, output_path: str) -> Dict[str, any]:
    """
    Convert a subtitle file (SRT or VTT) to markdown.

    Args:
        input_path: Path to the input subtitle file (.srt or .vtt)
        output_path: Path to the output markdown file

    Returns:
        Dictionary with conversion results:
        {
            "status": "success" | "error",
            "word_count": int,
            "subtitle_blocks": int,
            "error": str (only if status is "error")
        }

    Process:
        1. Detect format (SRT or VTT) by extension
        2. Parse subtitle file into blocks
        3. Remove HTML tags from text
        4. Group consecutive blocks into paragraphs (within 2-second gap)
        5. Add timestamp context markers [HH:MM:SS]
        6. Output clean markdown
    """
    try:
        # Convert paths to Path objects
        input_file = Path(input_path)
        output_file = Path(output_path)

        # Create output directory if needed
        output_file.parent.mkdir(parents=True, exist_ok=True)

        # Read input file
        with open(input_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Parse based on extension
        ext = input_file.suffix.lower()
        if ext == '.srt':
            blocks = parse_srt(content)
        elif ext == '.vtt':
            blocks = parse_vtt(content)
        else:
            return {
                "status": "error",
                "word_count": 0,
                "subtitle_blocks": 0,
                "error": f"Unsupported subtitle format: {ext}"
            }

        # Clean subtitle text
        for block in blocks:
            block["text"] = clean_subtitle_text(block["text"])

        # Group into paragraphs
        paragraphs = group_subtitles_into_paragraphs(blocks)

        # Generate markdown
        markdown_lines = []
        for para in paragraphs:
            timestamp = format_timestamp(para["start"])
            markdown_lines.append(f"{timestamp} {para['text']}")
            markdown_lines.append("")  # Blank line between paragraphs

        markdown_content = '\n'.join(markdown_lines)

        # Write output
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(markdown_content)

        # Count words
        word_count = len(markdown_content.split())

        return {
            "status": "success",
            "word_count": word_count,
            "subtitle_blocks": len(paragraphs)
        }

    except Exception as e:
        return {
            "status": "error",
            "word_count": 0,
            "subtitle_blocks": 0,
            "error": f"Conversion error: {str(e)}"
        }
