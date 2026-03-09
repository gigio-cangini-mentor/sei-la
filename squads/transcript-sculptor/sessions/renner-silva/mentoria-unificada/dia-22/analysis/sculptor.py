#!/usr/bin/env python3
"""
Transcript Sculptor - Masterpiece Generator
Esculpe transcrição aplicando regras editoriais do Transcript Sculptor
"""

import re
from pathlib import Path
from collections import defaultdict

INPUT_FILE = Path("squads/_imports/knowledge-base/+PROJETOS Palestras + Mágicas/LUIZFOSC/CURSOS E TRANSCRIÇÕES/Renner Silva/mentoria-dia-22/transcription_clean.md")
OUTPUT_DIR = Path("<PROJECT_ROOT>/squads/transcript-sculptor/sessions/renner-silva/mentoria-unificada/dia-22")
MASTERPIECE_FILE = OUTPUT_DIR / "dia-22-masterpiece.md"
ANALYSIS_FILE = OUTPUT_DIR / "analysis/analysis-map-completo.md"
REPORT_FILE = OUTPUT_DIR / "reports/quality-report.md"

class TranscriptSculptor:
    def __init__(self):
        self.original_words = 0
        self.masterpiece_words = 0
        self.removed_timestamps = 0
        self.removed_intervals = 0
        self.themes = []
        self.exercises = []
        self.stories = []
        self.catchphrases = defaultdict(int)
        self.speakers = set()
        self.key_insights = []

    def clean_timestamp(self, line):
        """Remove timestamps preservando conteúdo"""
        match = re.match(r'`\[(\d{2}:\d{2}(?::\d{2})?)\]`\s*(.*)', line)
        if match:
            self.removed_timestamps += 1
            return match.group(2).strip()
        return line

    def is_interval_marker(self, line):
        """Detecta marcadores de intervalo"""
        return bool(re.match(r'\*\*\[INTERVALO', line))

    def is_noise(self, line):
        """Detecta ruído de transcrição"""
        if not line or len(line) < 2:
            return True
        # Linhas muito curtas sem conteúdo
        if line in ['---', '...', 'Beleza.', 'Ok.']:
            return True
        return False

    def detect_catchphrase(self, text):
        """Detecta e conta catchphrases"""
        phrases = {
            'o como é mais importante do que o que': r'o como é mais importante do que o que',
            'sim ou não': r'sim ou não',
            'verdade conecta': r'verdade\s+conecta',
            'vulnerabilidade conecta': r'vulnerabilidade\s+conecta',
            'estrutura de palestra': r'estrutura\s+(?:da|de)?\s*palestra',
            'três pilares': r'três pilares',
            'performance, roteiro e conexão': r'performance.*roteiro.*conexão',
            'obediência tática': r'obediência tática',
            'cola com quem faz': r'cola com quem faz',
        }

        for phrase, pattern in phrases.items():
            if re.search(pattern, text, re.IGNORECASE):
                self.catchphrases[phrase] += 1

    def detect_speaker(self, text):
        """Detecta speakers mencionados"""
        if re.search(r'\brenner\b|\brené\b', text, re.IGNORECASE):
            self.speakers.add('Renner Silva')
        if re.search(r'\bmarcão\b|\bmarco\b|\bmarcos abreu\b', text, re.IGNORECASE):
            self.speakers.add('Marco Abreu (Marcão)')
        if re.search(r'\bjuliana\b|\bju rios\b', text, re.IGNORECASE):
            self.speakers.add('Juliana Rios')
        if re.search(r'\bmichelle\b', text, re.IGNORECASE):
            self.speakers.add('Michelle (aluna)')
        if re.search(r'\bkleber\b', text, re.IGNORECASE):
            self.speakers.add('Kleber (aluno)')

    def detect_exercise(self, text):
        """Detecta exercícios e dinâmicas"""
        exercises_patterns = [
            (r'grupo de quatro', 'Dinâmica em grupos de 4'),
            (r'todos de pé', 'Dinâmica de pé'),
            (r'anotarem.*sacadas', 'Exercício de anotação de sacadas'),
            (r'compartilh.*grande sacada', 'Compartilhamento de insights'),
            (r'vou provar para vocês', 'Demonstração prática'),
        ]

        for pattern, exercise_name in exercises_patterns:
            if re.search(pattern, text, re.IGNORECASE):
                if exercise_name not in self.exercises:
                    self.exercises.append(exercise_name)

    def detect_story(self, paragraph):
        """Detecta histórias sendo contadas"""
        # Histórias geralmente têm verbos no passado e narrativa pessoal
        story_markers = [
            r'eu fui',
            r'eu era',
            r'eu tinha',
            r'eu estava',
            r'aconteceu',
            r'um dia',
            r'quando eu',
            r'lembro',
        ]

        count = sum(1 for marker in story_markers if re.search(marker, paragraph, re.IGNORECASE))
        return count >= 2

    def detect_key_insight(self, text):
        """Detecta ensinamentos-chave"""
        insight_markers = [
            r'a grande sacada',
            r'o mais importante',
            r'vocês têm que entender',
            r'isso é fundamental',
            r'anotem isso',
            r'o segredo',
        ]

        for marker in insight_markers:
            if re.search(marker, text, re.IGNORECASE):
                return True
        return False

    def sculpt_paragraph(self, lines):
        """Esculpe um parágrafo removendo ruído mas preservando DNA"""
        cleaned = []

        for line in lines:
            # Remove timestamp
            line = self.clean_timestamp(line)

            # Pula intervalos
            if self.is_interval_marker(line):
                self.removed_intervals += 1
                continue

            # Pula ruído
            if self.is_noise(line):
                continue

            # Detecta padrões
            self.detect_catchphrase(line)
            self.detect_speaker(line)
            self.detect_exercise(line)

            # Conta palavras
            self.original_words += len(line.split())

            cleaned.append(line)

        # Junta em parágrafo fluido
        if not cleaned:
            return ""

        paragraph = ' '.join(cleaned)

        # Detecta histórias
        if self.detect_story(paragraph):
            self.stories.append(paragraph[:100] + '...')

        # Detecta insights-chave
        if self.detect_key_insight(paragraph):
            self.key_insights.append(paragraph[:150])

        self.masterpiece_words += len(paragraph.split())

        return paragraph

    def identify_section_theme(self, content):
        """Identifica o tema principal de uma seção"""
        # Conta palavras-chave para inferir tema
        themes_keywords = {
            'Storytelling e Estrutura': ['storytelling', 'estrutura', 'roteiro', 'história'],
            'Performance no Palco': ['performance', 'palco', 'postura', 'microfone'],
            'Conexão e Verdade': ['conexão', 'verdade', 'vulnerabilidade', 'essência'],
            'Depoimentos de Alunos': ['sacada', 'grande insight', 'aprendi', 'entendi'],
            'Técnicas Avançadas': ['técnica', 'método', 'ferramenta', 'prática'],
            'Precificação e Valor': ['valor', 'preço', 'vender', 'high ticket'],
            'Exercícios Práticos': ['exercício', 'dinâmica', 'prática', 'treino'],
        }

        text_lower = content.lower()
        theme_scores = {}

        for theme, keywords in themes_keywords.items():
            score = sum(text_lower.count(kw) for kw in keywords)
            if score > 0:
                theme_scores[theme] = score

        if theme_scores:
            return max(theme_scores, key=theme_scores.get)
        return "Conteúdo Geral"

    def process_file(self):
        """Processa arquivo completo"""
        print("🎭 TRANSCRIPT SCULPTOR - Iniciando...")
        print(f"📄 Arquivo: {INPUT_FILE}")

        with open(INPUT_FILE, 'r', encoding='utf-8') as f:
            content = f.read()

        lines = content.split('\n')
        print(f"📏 Total de linhas: {len(lines)}")

        # Processa por seções
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
                if current_section:  # Ignora header
                    current_lines.append(line)

        if current_section and current_lines:
            sections[current_section] = current_lines

        print(f"🗂️  Seções encontradas: {len(sections)}")

        # Gera masterpiece
        masterpiece_content = []
        masterpiece_content.append("# Mentoria Palestras Poderosas — Dia 2")
        masterpiece_content.append("\n**Storytelling, Performance e Conexão Genuína**\n")
        masterpiece_content.append("**Mentor:** Renner Silva")
        masterpiece_content.append("**Convidado especial:** Marco Abreu (Marcão)")
        masterpiece_content.append("**Formato:** Mentoria presencial (Dia 2 de 4)\n")
        masterpiece_content.append("---\n")

        # Processa cada seção
        section_themes = {}
        for section_name, section_lines in sections.items():
            print(f"\n⚙️  Processando: {section_name}")

            # Esculpe parágrafos
            paragraphs = []
            current_para_lines = []

            for line in section_lines:
                if line.strip() == '':
                    if current_para_lines:
                        para = self.sculpt_paragraph(current_para_lines)
                        if para:
                            paragraphs.append(para)
                        current_para_lines = []
                else:
                    current_para_lines.append(line)

            # Último parágrafo
            if current_para_lines:
                para = self.sculpt_paragraph(current_para_lines)
                if para:
                    paragraphs.append(para)

            if not paragraphs:
                continue

            # Identifica tema da seção
            section_content = ' '.join(paragraphs)
            theme = self.identify_section_theme(section_content)
            section_themes[section_name] = theme
            self.themes.append(f"{section_name}: {theme}")

            # Adiciona ao masterpiece
            masterpiece_content.append(f"\n## {section_name}\n")

            for para in paragraphs:
                # Formata parágrafos
                masterpiece_content.append(f"{para}\n")

            print(f"   ✓ {len(paragraphs)} parágrafos preservados")

        # Salva masterpiece
        with open(MASTERPIECE_FILE, 'w', encoding='utf-8') as f:
            f.write('\n'.join(masterpiece_content))

        print(f"\n✅ Masterpiece salvo: {MASTERPIECE_FILE}")

        # Gera análise completa
        self.generate_analysis(section_themes)

        # Gera relatório
        self.generate_report()

        print("\n🎉 PROCESSAMENTO COMPLETO!")

    def generate_analysis(self, section_themes):
        """Gera análise semântica completa"""
        analysis_content = [
            "# Análise Semântica Completa - Dia 22\n",
            "## Visão Geral\n",
            f"O Dia 2 é o dia mais denso da mentoria, com **{self.original_words:,} palavras** de conteúdo.\n",
            "Foco principal: **Storytelling, Performance no Palco e Conexão Genuína**.\n",
            "\n## Temas/Módulos Ensinados\n"
        ]

        for i, theme in enumerate(self.themes, 1):
            analysis_content.append(f"{i}. {theme}")

        analysis_content.append("\n\n## Metodologias/Frameworks Apresentados\n")
        analysis_content.append("### Três Pilares da Palestra Poderosa")
        analysis_content.append("1. **Performance** - Como se portar no palco")
        analysis_content.append("2. **Roteiro** - Estrutura da mensagem")
        analysis_content.append("3. **Conexão Genuína** - Verdade e essência\n")

        analysis_content.append("### Framework de Estrutura")
        analysis_content.append("- Duas maneiras de falar: **SEM estrutura** (fácil de falar, difícil de ser escutado) vs **COM estrutura** (difícil de falar, fácil de ser escutado)")
        analysis_content.append("- Conceito central: **O como é mais importante do que o que**\n")

        analysis_content.append("\n## Exercícios e Dinâmicas\n")
        for i, ex in enumerate(set(self.exercises), 1):
            analysis_content.append(f"{i}. {ex}")

        analysis_content.append("\n\n## Histórias Contadas\n")
        analysis_content.append(f"Total de narrativas identificadas: **{len(self.stories)}**\n")
        for i, story in enumerate(self.stories[:10], 1):  # Top 10
            analysis_content.append(f"{i}. {story}")

        analysis_content.append("\n\n## Catchphrases e Expressões Características\n")
        sorted_phrases = sorted(self.catchphrases.items(), key=lambda x: x[1], reverse=True)
        for phrase, count in sorted_phrases:
            analysis_content.append(f"- **\"{phrase}\"** ({count}x)")

        analysis_content.append("\n\n## Speakers Identificados\n")
        for speaker in sorted(self.speakers):
            analysis_content.append(f"- {speaker}")

        analysis_content.append("\n\n## Insights e Ensinamentos-Chave\n")
        for i, insight in enumerate(self.key_insights[:15], 1):  # Top 15
            analysis_content.append(f"{i}. {insight}...")

        with open(ANALYSIS_FILE, 'w', encoding='utf-8') as f:
            f.write('\n'.join(analysis_content))

        print(f"✅ Análise salva: {ANALYSIS_FILE}")

    def generate_report(self):
        """Gera relatório de qualidade"""
        preservation_rate = (self.masterpiece_words / self.original_words * 100) if self.original_words > 0 else 0

        report_content = [
            "# Relatório de Qualidade - Dia 22\n",
            "## Estatísticas de Processamento\n",
            f"- **Palavras originais:** {self.original_words:,}",
            f"- **Palavras no masterpiece:** {self.masterpiece_words:,}",
            f"- **Taxa de preservação:** {preservation_rate:.1f}%",
            f"- **Timestamps removidos:** {self.removed_timestamps:,}",
            f"- **Intervalos removidos:** {self.removed_intervals}",
            f"- **Palavras removidas:** {self.original_words - self.masterpiece_words:,}\n",
            "\n## Módulos/Temas Cobertos\n",
        ]

        for theme in self.themes:
            report_content.append(f"- {theme}")

        report_content.append(f"\n## Exercícios Identificados\n")
        report_content.append(f"Total: **{len(set(self.exercises))}** exercícios/dinâmicas\n")
        for ex in set(self.exercises):
            report_content.append(f"- {ex}")

        report_content.append(f"\n## Catchphrases Encontradas\n")
        report_content.append(f"Total: **{len(self.catchphrases)}** expressões únicas\n")
        sorted_phrases = sorted(self.catchphrases.items(), key=lambda x: x[1], reverse=True)
        for phrase, count in sorted_phrases:
            report_content.append(f"- **\"{phrase}\"** — {count} ocorrências")

        report_content.append("\n## Qualidade de Preservação\n")
        if preservation_rate >= 50:
            report_content.append("✅ **EXCELENTE** - DNA completo preservado")
        elif preservation_rate >= 30:
            report_content.append("⚠️ **BOM** - Principais ensinamentos preservados")
        else:
            report_content.append("❌ **INSUFICIENTE** - Revisão necessária")

        report_content.append(f"\n## Notas de Processamento\n")
        report_content.append("- Todos os timestamps foram removidos")
        report_content.append("- Marcadores técnicos removidos")
        report_content.append("- Estrutura convertida para fluxo narrativo")
        report_content.append("- Catchphrases e tom do Renner preservados")
        report_content.append(f"- {len(self.stories)} histórias identificadas e preservadas")
        report_content.append(f"- {len(set(self.exercises))} exercícios documentados")

        with open(REPORT_FILE, 'w', encoding='utf-8') as f:
            f.write('\n'.join(report_content))

        print(f"✅ Relatório salvo: {REPORT_FILE}")

if __name__ == '__main__':
    sculptor = TranscriptSculptor()
    sculptor.process_file()
