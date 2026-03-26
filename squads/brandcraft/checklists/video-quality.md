# Video Quality Checklist

Checklist de qualidade para outputs de vídeo do BrandCraft.
Usado pelo agente **Gauge** (quality-validator) antes de entregar qualquer vídeo.

**Formatos cobertos:** Reel, Story, Landscape, Square, Animated Carousel, GIF

---

## 1. Brand Colors (25 pts)

- [ ] Primary color presente em todas as cenas (backgrounds, overlays ou textos)
- [ ] Secondary color aplicada em elementos de suporte (bordas, ícones, transições)
- [ ] Accent color usada em CTAs e destaques (máx 1-2 por cena)
- [ ] Paleta consistente entre cenas (sem mudança de cor não intencional)
- [ ] Nenhuma cor fora da paleta do brand template (hex match exato, deltaE < 3)
- [ ] Gradientes (se usados) respeitam a paleta definida

## 2. Typography (20 pts)

- [ ] Font family = tokens do template (heading e body)
- [ ] Tamanho de texto legível no formato alvo (mínimo 32px para 1080p vertical, 24px para landscape)
- [ ] Hierarquia visual clara: título > subtítulo > body
- [ ] Texto nunca fica na tela menos que 2 segundos (tempo de leitura)
- [ ] Nenhum texto cortado pelas bordas ou safe zones
- [ ] Contraste texto/fundo garante legibilidade (WCAG AA)
- [ ] Animação de texto suave (sem pulos ou glitches de renderização)

## 3. Animations (20 pts)

- [ ] Todas as animações são frame-driven (keyframes definidos, sem random)
- [ ] Timing consistente: entradas 300-500ms, saídas 200-400ms
- [ ] Easing adequado (ease-in-out para movimento, ease-out para saída)
- [ ] Sem frames em branco entre transições
- [ ] Duração total dentro do esperado (Reel: 15-60s, Story: 5-15s, GIF: 2-6s)
- [ ] Frame rate constante durante toda a composição (sem drops)
- [ ] Transições entre cenas suaves e consistentes (mesmo tipo ao longo do vídeo)

## 4. Layout & Safe Zones (20 pts)

### Dimensões por formato
| Formato | Dimensão | FPS | Safe Zone (inset) |
|---------|----------|-----|-------------------|
| Reel 9:16 | 1080 x 1920 | 30 | 60px top, 180px bottom |
| Story 9:16 | 1080 x 1920 | 30 | 80px top, 200px bottom |
| Landscape 16:9 | 1920 x 1080 | 30 | 60px all sides |
| Square 1:1 | 1080 x 1080 | 30 | 40px all sides |
| Animated Carousel 4:5 | 1080 x 1350 | 30 | 40px all sides |
| GIF | Configurável | 15 | 20px all sides |

- [ ] Dimensões do output correspondem ao formato solicitado (ver tabela)
- [ ] FPS correto (30fps para vídeo, 15fps para GIF)
- [ ] Nenhum elemento de texto ou CTA dentro da safe zone inferior (UI do Instagram/TikTok)
- [ ] Nenhum elemento crítico dentro da safe zone superior (status bar, nome do perfil)
- [ ] Logo e elementos importantes centralizados no safe area
- [ ] Sem letterboxing ou pillarboxing não intencional

## 5. Logo & Identity (15 pts)

- [ ] Logo presente em pelo menos 1 cena (intro ou outro)
- [ ] Logo com proporções corretas (sem distorção)
- [ ] Logo visível por mínimo 1.5 segundos
- [ ] Logo não obstrui conteúdo principal
- [ ] Watermark/branding sutil se definido no template
- [ ] Identidade visual reconhecível mesmo sem logo (cores + typo = marca)

---

## Audio Sync (validação condicional)

Aplicar SOMENTE quando o vídeo contém voiceover, avatar ou trilha sonora.

- [ ] Áudio inicia sincronizado com o primeiro frame de conteúdo
- [ ] Lip sync do avatar alinhado com o áudio (tolerância < 100ms)
- [ ] Volume consistente (sem picos ou quedas abruptas, -14 a -16 LUFS)
- [ ] Fade-in no início (200-500ms) e fade-out no final (300-800ms)
- [ ] Trilha de fundo não compete com voiceover (trilha -12dB abaixo da voz)
- [ ] Sem clipping ou distorção audível
- [ ] Áudio termina antes ou junto com o último frame (sem corte abrupto)

---

## Thresholds & Ações

| Score | Verdict | Ação |
|-------|---------|------|
| >= 90 | PASS (Excellent) | Entrega imediata |
| 70-89 | PASS (Acceptable) | Entrega com notas de melhoria |
| 50-69 | FAIL (Partial) | Auto-correção + re-validação (máx 2x) |
| < 50 | FAIL (Critical) | Re-execução completa do workflow |

### Triggers de auto-correção

- **Cor fora da paleta** -> substituir nos componentes Remotion e re-renderizar
- **Texto em safe zone** -> reposicionar com offset para dentro do safe area
- **Dimensão/FPS errado** -> re-renderizar com config correta
- **Logo ausente** -> inserir logo na cena de intro ou outro
- **Áudio dessincronizado** -> realinhar timeline de áudio com vídeo

---

*Checklist v1.0 — Gauge (quality-validator) — BrandCraft Squad*
