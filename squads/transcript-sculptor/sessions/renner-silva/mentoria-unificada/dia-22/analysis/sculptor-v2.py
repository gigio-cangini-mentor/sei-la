#!/usr/bin/env python3
"""
Transcript Sculptor V2 - Masterpiece com Fluidez
Versão melhorada: une frases em parágrafos fluidos
"""

import re
from pathlib import Path
from collections import defaultdict

INPUT_FILE = Path("squads/_imports/knowledge-base/+PROJETOS Palestras + Mágicas/LUIZFOSC/CURSOS E TRANSCRIÇÕES/Renner Silva/mentoria-dia-22/transcription_clean.md")
OUTPUT_DIR = Path("<PROJECT_ROOT>/squads/transcript-sculptor/sessions/renner-silva/mentoria-unificada/dia-22")
MASTERPIECE_FILE = OUTPUT_DIR / "dia-22-masterpiece.md"

class TranscriptSculptorV2:
    def __init__(self):
        self.original_words = 0
        self.masterpiece_words = 0
        self.stats = {
            'timestamps_removed': 0,
            'intervals_removed': 0,
            'catchphrases': defaultdict(int),
            'speakers': set(),
            'exercises': set(),
            'stories': []
        }

    def clean_timestamp(self, line):
        """Remove timestamps"""
        match = re.match(r'`\[(\d{2}:\d{2}(?::\d{2})?)\]`\s*(.*)', line)
        if match:
            self.stats['timestamps_removed'] += 1
            return match.group(2).strip()
        return line

    def is_skip_line(self, line):
        """Verifica se linha deve ser pulada"""
        # Intervalos
        if re.match(r'\*\*\[INTERVALO', line):
            self.stats['intervals_removed'] += 1
            return True
        # Ruído
        if not line or len(line) < 2:
            return True
        return False

    def detect_patterns(self, text):
        """Detecta padrões importantes"""
        # Catchphrases
        phrases = {
            'o como é mais importante do que o que': r'o como é mais importante do que o que',
            'sim ou não': r'sim ou não',
            'verdade conecta': r'verdade\s+conecta',
            'vulnerabilidade conecta': r'vulnerabilidade\s+conecta',
            'estrutura': r'estrutura',
            'três pilares': r'três pilares',
        }
        for phrase, pattern in phrases.items():
            if re.search(pattern, text, re.IGNORECASE):
                self.stats['catchphrases'][phrase] += 1

        # Speakers
        if re.search(r'\brenner\b|\brené\b', text, re.IGNORECASE):
            self.stats['speakers'].add('Renner Silva')
        if re.search(r'\bmarcão\b|\bmarco\b', text, re.IGNORECASE):
            self.stats['speakers'].add('Marco Abreu (Marcão)')
        if re.search(r'\bjuliana\b|\bju rios\b', text, re.IGNORECASE):
            self.stats['speakers'].add('Juliana Rios')

        # Exercícios
        if 'grupo de quatro' in text.lower():
            self.stats['exercises'].add('Dinâmica em grupos de 4')
        if 'todos de pé' in text.lower():
            self.stats['exercises'].add('Dinâmica de pé')

    def merge_sentences(self, lines):
        """Une linhas em frases fluidas"""
        merged = []
        current_sentence = []

        for line in lines:
            # Remove timestamp
            line = self.clean_timestamp(line)

            # Pula linhas a ignorar
            if self.is_skip_line(line):
                continue

            # Detecta padrões
            self.detect_patterns(line)

            # Conta palavras originais
            self.original_words += len(line.split())

            # Une frases
            # Se linha termina com pontuação, fecha sentença
            if re.search(r'[.!?]$', line):
                current_sentence.append(line)
                merged.append(' '.join(current_sentence))
                current_sentence = []
            else:
                current_sentence.append(line)

        # Adiciona sentença pendente
        if current_sentence:
            merged.append(' '.join(current_sentence))

        return merged

    def group_into_paragraphs(self, sentences):
        """Agrupa sentenças em parágrafos coerentes"""
        paragraphs = []
        current_para = []

        for sentence in sentences:
            current_para.append(sentence)

            # Cria parágrafo a cada 3-5 sentenças ou quando detecta mudança de speaker
            if len(current_para) >= 3:
                # Se próxima sentença parece mudar de contexto, fecha parágrafo
                para_text = ' '.join(current_para)
                paragraphs.append(para_text)
                self.masterpiece_words += len(para_text.split())
                current_para = []

        # Adiciona parágrafo pendente
        if current_para:
            para_text = ' '.join(current_para)
            paragraphs.append(para_text)
            self.masterpiece_words += len(para_text.split())

        return paragraphs

    def identify_section_theme(self, text):
        """Identifica tema da seção"""
        themes = {
            'Storytelling e Estrutura': ['storytelling', 'estrutura', 'história', 'roteiro'],
            'Performance no Palco': ['performance', 'palco', 'postura', 'microfone'],
            'Conexão e Verdade': ['conexão', 'verdade', 'vulnerabilidade'],
            'Depoimentos': ['sacada', 'aprendi', 'entendi', 'insight'],
            'Técnicas': ['técnica', 'método', 'ferramenta'],
            'Precificação': ['valor', 'preço', 'vender'],
        }

        text_lower = text.lower()
        scores = {}
        for theme, keywords in themes.items():
            score = sum(text_lower.count(kw) for kw in keywords)
            if score > 0:
                scores[theme] = score

        return max(scores, key=scores.get) if scores else "Conteúdo Geral"

    def process_file(self):
        """Processa arquivo completo"""
        print("🎭 TRANSCRIPT SCULPTOR V2 - Masterpiece Fluido")

        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')

        # Separa por seções
        sections = {}
        current_section = None
        current_lines = []

        for line in lines:
            if line.startswith('## '):
                if current_section and current_lines:
                    sections[current_section] = current_lines
                current_section = line.replace('## ', '').strip()
                current_lines = []
            else:
                if current_section:
                    current_lines.append(line)

        if current_section and current_lines:
            sections[current_section] = current_lines

        # Constrói masterpiece
        masterpiece = []
        masterpiece.append("# Mentoria Palestras Poderosas — Dia 2\n")
        masterpiece.append("**Storytelling, Performance e Conexão Genuína**\n")
        masterpiece.append("**Mentor:** Renner Silva  ")
        masterpiece.append("**Convidado especial:** Marco Abreu (Marcão)  ")
        masterpiece.append("**Formato:** Mentoria presencial (Dia 2 de 4)\n")
        masterpiece.append("---\n")

        # Processa seções
        for section_name, section_lines in sections.items():
            print(f"⚙️  Processando: {section_name}")

            # Une sentenças
            sentences = self.merge_sentences(section_lines)

            if not sentences:
                continue

            # Agrupa em parágrafos
            paragraphs = self.group_into_paragraphs(sentences)

            # Identifica tema
            section_text = ' '.join(paragraphs)
            theme = self.identify_section_theme(section_text)

            # Adiciona ao masterpiece
            masterpiece.append(f"\n## {section_name}\n")
            if section_name != "Início":
                masterpiece.append(f"*{theme}*\n")

            for para in paragraphs:
                masterpiece.append(f"{para}\n")

            print(f"   ✓ {len(paragraphs)} parágrafos")

        # Salva
        with open(MASTERPIECE_FILE, 'w', encoding='utf-8') as f:
            f.write('\n'.join(masterpiece))

        # Estatísticas
        preservation = (self.masterpiece_words / self.original_words * 100) if self.original_words > 0 else 0

        print(f"\n📊 ESTATÍSTICAS")
        print(f"   Palavras originais: {self.original_words:,}")
        print(f"   Palavras masterpiece: {self.masterpiece_words:,}")
        print(f"   Taxa preservação: {preservation:.1f}%")
        print(f"   Timestamps removidos: {self.stats['timestamps_removed']:,}")

        print(f"\n✅ Masterpiece salvo: {MASTERPIECE_FILE}")

if __name__ == '__main__':
    sculptor = TranscriptSculptorV2()
    sculptor.process_file()
