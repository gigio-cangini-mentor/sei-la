#!/usr/bin/env python3
"""
Transcript Sculptor - Dia 22 Processing Script
Processa transcrição de 99k palavras aplicando regras de sculpting
"""

import re
from pathlib import Path

# Paths
INPUT_FILE = Path("squads/_imports/knowledge-base/+PROJETOS Palestras + Mágicas/LUIZFOSC/CURSOS E TRANSCRIÇÕES/Renner Silva/mentoria-dia-22/transcription_clean.md")
OUTPUT_DIR = Path("<PROJECT_ROOT>/squads/transcript-sculptor/sessions/renner-silva/mentoria-unificada/dia-22")
MASTERPIECE_FILE = OUTPUT_DIR / "dia-22-masterpiece.md"
ANALYSIS_FILE = OUTPUT_DIR / "analysis/analysis-map.md"

def clean_line(line):
    """Remove timestamps e marcadores técnicos"""
    # Remove timestamps `[HH:MM]`
    line = re.sub(r'`\[\d{2}:\d{2}\]`\s*', '', line)
    # Remove marcadores de intervalo
    if re.match(r'\*\*\[INTERVALO', line):
        return None
    return line.strip()

def is_content_line(line):
    """Verifica se a linha contém conteúdo relevante"""
    if not line or len(line) < 3:
        return False
    # Ignora linhas muito curtas ou vazias
    if line in ['---', '']:
        return False
    return True

def process_transcript():
    """Processa o arquivo principal"""

    print("Iniciando processamento...")
    print(f"Arquivo: {INPUT_FILE}")
    print(f"Tamanho: {INPUT_FILE.stat().st_size / 1024:.1f} KB")

    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    lines = content.split('\n')
    print(f"Total de linhas: {len(lines)}")

    # Separa por seções
    sections = {}
    current_section = "header"
    current_content = []

    for line in lines:
        if line.startswith('## '):
            # Nova seção
            if current_content:
                sections[current_section] = current_content
            current_section = line.replace('## ', '').strip()
            current_content = []
        else:
            current_content.append(line)

    # Adiciona última seção
    if current_content:
        sections[current_section] = current_content

    print(f"\nSeções encontradas: {list(sections.keys())}")

    # Análise de temas
    analysis = {
        'sections': {},
        'catchphrases': set(),
        'speakers': set(),
        'exercises': [],
        'stories': [],
        'metodologies': []
    }

    # Processa cada seção
    for section_name, section_lines in sections.items():
        clean_lines = []
        section_words = 0

        for line in section_lines:
            cleaned = clean_line(line)
            if cleaned and is_content_line(cleaned):
                clean_lines.append(cleaned)
                section_words += len(cleaned.split())

                # Detecta catchphrases (frases repetidas)
                if 'sim ou não' in cleaned.lower():
                    analysis['catchphrases'].add('sim ou não')
                if 'o como é mais importante do que o que' in cleaned.lower():
                    analysis['catchphrases'].add('o como é mais importante do que o que')
                if 'estrutura' in cleaned.lower() and 'palestra' in cleaned.lower():
                    analysis['catchphrases'].add('estrutura de palestra')
                if 'verdade' in cleaned.lower() and 'conecta' in cleaned.lower():
                    analysis['catchphrases'].add('verdade conecta')
                if 'vulnerabilidade' in cleaned.lower():
                    analysis['catchphrases'].add('vulnerabilidade conecta')

                # Detecta speakers
                if 'renner' in cleaned.lower() or 'rené' in cleaned.lower():
                    analysis['speakers'].add('Renner Silva')
                if 'marcão' in cleaned.lower() or 'marco' in cleaned.lower():
                    analysis['speakers'].add('Marco Abreu (Marcão)')
                if 'juliana' in cleaned.lower() or 'ju rios' in cleaned.lower():
                    analysis['speakers'].add('Juliana Rios (aluna)')

                # Detecta exercícios
                if 'exercício' in cleaned.lower() or 'dinâmica' in cleaned.lower():
                    analysis['exercises'].append(cleaned[:100])
                if 'grupo de quatro' in cleaned.lower():
                    analysis['exercises'].append('Dinâmica em grupos de 4')

        analysis['sections'][section_name] = {
            'lines': len(clean_lines),
            'words': section_words,
            'preview': ' '.join(clean_lines[:3])[:200] if clean_lines else ''
        }

    # Estatísticas finais
    total_clean_words = sum(s['words'] for s in analysis['sections'].values())

    print(f"\n=== ANÁLISE COMPLETA ===")
    print(f"Palavras originais: 99,498")
    print(f"Palavras após limpeza: {total_clean_words:,}")
    print(f"Taxa de preservação: {(total_clean_words/99498)*100:.1f}%")
    print(f"\nCatchphrases identificadas: {len(analysis['catchphrases'])}")
    print(f"Speakers identificados: {len(analysis['speakers'])}")
    print(f"Exercícios detectados: {len(set(analysis['exercises']))}")

    return sections, analysis

if __name__ == '__main__':
    sections, analysis = process_transcript()

    # Salva análise preliminar
    with open(ANALYSIS_FILE, 'w', encoding='utf-8') as f:
        f.write("# Análise Preliminar - Dia 22\n\n")
        f.write("## Estatísticas Gerais\n\n")
        f.write(f"- **Seções totais:** {len(analysis['sections'])}\n")
        f.write(f"- **Speakers:** {', '.join(sorted(analysis['speakers']))}\n")
        f.write(f"- **Catchphrases:** {', '.join(sorted(analysis['catchphrases']))}\n\n")

        f.write("## Seções Identificadas\n\n")
        for name, data in analysis['sections'].items():
            f.write(f"### {name}\n")
            f.write(f"- Linhas: {data['lines']}\n")
            f.write(f"- Palavras: {data['words']:,}\n")
            f.write(f"- Preview: {data['preview']}...\n\n")

    print(f"\nAnálise salva em: {ANALYSIS_FILE}")
