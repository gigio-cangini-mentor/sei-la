#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Transcript Sculptor - Masterpiece Generator
Processes raw transcription into editorial masterpiece
"""

import re
from pathlib import Path

def load_transcription(file_path):
    """Load raw transcription file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        return f.read()

def remove_timestamps(text):
    """Remove all timestamp markers [HH:MM] and [HH:MM:SS]"""
    # Remove timestamps like [00:00] or [01:00:00]
    text = re.sub(r'`\[[\d:]+\]`\s*', '', text)
    return text

def remove_technical_markers(text):
    """Remove technical markers like **[INTERVALO]**, *[SILENCIO]*, etc"""
    text = re.sub(r'\*\*?\[[\w\s]+\]\*\*?', '', text)
    return text

def clean_repetitions(text):
    """Remove obvious speech repetitions and stutters"""
    # Remove patterns like "e, e, e" or "né, né, né"
    text = re.sub(r'\b(\w+),\s+\1,\s+\1\b', r'\1', text)
    text = re.sub(r'\b(\w+),\s+\1\b', r'\1', text)
    return text

def remove_empty_lines(text):
    """Remove excessive empty lines (keep max 2 consecutive)"""
    text = re.sub(r'\n{4,}', '\n\n\n', text)
    return text

def structure_content(text):
    """Add structure and format the content"""
    lines = text.split('\n')
    result = []
    current_paragraph = []

    for line in lines:
        line = line.strip()

        # Skip empty lines and metadata at start
        if not line or line.startswith('>') or line == '---':
            if current_paragraph:
                result.append(' '.join(current_paragraph))
                current_paragraph = []
            if line == '---' or (line.startswith('>') and not result):
                continue
            if line:
                result.append('')
            continue

        # Keep markdown headers
        if line.startswith('#'):
            if current_paragraph:
                result.append(' '.join(current_paragraph))
                current_paragraph = []
            result.append('')
            result.append(line)
            result.append('')
            continue

        # Accumulate text into paragraphs
        current_paragraph.append(line)

    # Add final paragraph
    if current_paragraph:
        result.append(' '.join(current_paragraph))

    return '\n'.join(result)

def create_masterpiece(transcription_path, output_path):
    """Main processing pipeline"""
    print("Loading transcription...")
    text = load_transcription(transcription_path)

    print("Removing timestamps...")
    text = remove_timestamps(text)

    print("Removing technical markers...")
    text = remove_technical_markers(text)

    print("Cleaning repetitions...")
    text = clean_repetitions(text)

    print("Structuring content...")
    text = structure_content(text)

    print("Removing excessive empty lines...")
    text = remove_empty_lines(text)

    # Add header
    header = """# A Fórmula Mágica do Sucesso
*Uma palestra sobre escolhas, superação e a busca pela felicidade*

**Palestrante:** Renner Silva
**Evento:** Romanni
**Tipo:** Palestra presencial

---

"""

    # Remove old title if exists
    text = re.sub(r'^# A MELHOR PALESTRA.*?---\s*', '', text, flags=re.DOTALL)

    final_text = header + text

    print(f"Writing masterpiece to {output_path}...")
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(final_text)

    # Statistics
    original_words = len(re.findall(r'\w+', load_transcription(transcription_path)))
    final_words = len(re.findall(r'\w+', final_text))
    preservation = (final_words / original_words) * 100

    print(f"\n=== STATISTICS ===")
    print(f"Original words: {original_words:,}")
    print(f"Final words: {final_words:,}")
    print(f"Preservation: {preservation:.1f}%")
    print(f"\nMasterpiece created successfully!")

    return {
        'original_words': original_words,
        'final_words': final_words,
        'preservation': preservation
    }

if __name__ == '__main__':
    transcription_path = Path('squads/_imports/knowledge-base/+PROJETOS Palestras + Mágicas/LUIZFOSC/CURSOS E TRANSCRIÇÕES/Renner Silva/YT-romanni/transcription_clean.md')
    output_path = Path('<PROJECT_ROOT>/squads/transcript-sculptor/sessions/renner-silva/YT-romanni/YT-romanni-masterpiece.md')

    stats = create_masterpiece(transcription_path, output_path)
