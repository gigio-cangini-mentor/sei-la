#!/usr/bin/env python3
"""
chunk_text.py - Split markdown text into chunks based on word boundaries

This utility splits a markdown file into multiple chunks based on word-level
boundaries defined in the analysis-map.yaml. It is used by sculptor-chief
to physically divide text after semantic analysis by transcript-analyst.

Usage:
    python chunk_text.py <text_file> <analysis_map_yaml> <output_dir>

Dependencies:
    - PyYAML

Author: Dex (Dev Agent)
Created: 2026-02-22
"""

import sys
import re
from pathlib import Path
from typing import List, Dict, Tuple


def load_text(file_path: str) -> str:
    """
    Load text from markdown file.

    Args:
        file_path: Path to markdown file

    Returns:
        Full text content as string
    """
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"Text file not found: {file_path}")

    return path.read_text(encoding='utf-8')


def load_analysis_map(yaml_path: str) -> Dict:
    """
    Load analysis map from YAML file.

    Args:
        yaml_path: Path to analysis-map.yaml

    Returns:
        Dictionary with analysis map data
    """
    try:
        import yaml
    except ImportError:
        raise ImportError("PyYAML is required. Install with: pip install pyyaml")

    path = Path(yaml_path)
    if not path.exists():
        raise FileNotFoundError(f"Analysis map not found: {yaml_path}")

    with path.open('r', encoding='utf-8') as f:
        data = yaml.safe_load(f)

    return data.get('analysis_map', {})


def split_into_words(text: str) -> List[str]:
    """
    Split text into words preserving whitespace and structure.

    Uses simple whitespace splitting. Each element in the returned list
    is a word token. Whitespace is preserved implicitly by rejoining with spaces.

    Args:
        text: Full text content

    Returns:
        List of word tokens
    """
    # Split on whitespace, filter out empty strings
    words = [w for w in re.split(r'(\s+)', text) if w.strip()]
    return words


def extract_chunk(words: List[str], start_word: int, end_word: int) -> str:
    """
    Extract text between word positions.

    Args:
        words: List of all words in document
        start_word: Starting word index (0-indexed, inclusive)
        end_word: Ending word index (0-indexed, exclusive)

    Returns:
        Extracted text as string
    """
    if start_word < 0:
        start_word = 0
    if end_word > len(words):
        end_word = len(words)

    # Extract slice and rejoin with spaces
    chunk_words = words[start_word:end_word]
    return ' '.join(chunk_words)


def split_into_chunks(text: str, chunk_boundaries: List[Dict]) -> List[Dict]:
    """
    Split text into chunks based on word-level boundaries from analysis-map.

    Args:
        text: Full text content
        chunk_boundaries: List of chunk definitions from analysis-map.yaml
                         Each dict has: {"id": str, "start_word": int, "end_word": int}

    Returns:
        List of dicts with: {"id": str, "text": str, "word_count": int}
    """
    words = split_into_words(text)
    chunks = []

    for boundary in chunk_boundaries:
        chunk_id = boundary.get('id', 'unknown')
        start_word = boundary.get('start_word', 0)
        end_word = boundary.get('end_word', len(words))

        # Extract chunk text
        chunk_text = extract_chunk(words, start_word, end_word)

        # Count words (non-whitespace tokens)
        chunk_word_count = len([w for w in chunk_text.split() if w.strip()])

        chunks.append({
            'id': chunk_id,
            'text': chunk_text,
            'word_count': chunk_word_count
        })

    return chunks


def save_chunks(chunks: List[Dict], output_dir: str, source_name: str):
    """
    Save each chunk as a separate .md file in output_dir.

    File naming pattern: {source_name}-{chunk_id}.md
    Example: palestra-dia1-chunk-001.md

    Args:
        chunks: List of chunk dicts from split_into_chunks()
        output_dir: Directory to save chunk files
        source_name: Base name for output files (without extension)
    """
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    for chunk in chunks:
        chunk_id = chunk['id']
        chunk_text = chunk['text']
        word_count = chunk['word_count']

        # Generate output filename
        output_file = output_path / f"{source_name}-{chunk_id}.md"

        # Write chunk file with metadata header
        with output_file.open('w', encoding='utf-8') as f:
            f.write(f"<!-- Chunk: {chunk_id} | Words: {word_count} | Source: {source_name} -->\n\n")
            f.write(chunk_text)

        print(f"✓ Saved {chunk_id}: {output_file} ({word_count} words)")


def main():
    """Main entry point for CLI usage."""
    if len(sys.argv) < 4:
        print("Usage: python chunk_text.py <text_file> <analysis_map_yaml> <output_dir>")
        print()
        print("Example:")
        print("  python chunk_text.py raw/palestra.md analysis/palestra-analysis-map.yaml chunks/")
        sys.exit(1)

    text_file = sys.argv[1]
    analysis_map_yaml = sys.argv[2]
    output_dir = sys.argv[3]

    # Extract source name from text file
    source_name = Path(text_file).stem

    print(f"Loading text from {text_file}...")
    text = load_text(text_file)

    print(f"Loading analysis map from {analysis_map_yaml}...")
    analysis_map = load_analysis_map(analysis_map_yaml)

    chunk_boundaries = analysis_map.get('chunks', [])
    if not chunk_boundaries:
        print("ERROR: No chunk boundaries found in analysis map.")
        sys.exit(1)

    print(f"Splitting into {len(chunk_boundaries)} chunks...")
    chunks = split_into_chunks(text, chunk_boundaries)

    print(f"Saving chunks to {output_dir}...")
    save_chunks(chunks, output_dir, source_name)

    print()
    print(f"✓ Successfully split {source_name} into {len(chunks)} chunks")
    print(f"  Total words processed: {sum(c['word_count'] for c in chunks)}")


if __name__ == '__main__':
    main()
