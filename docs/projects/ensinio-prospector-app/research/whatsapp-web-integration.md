# Research: Integração WhatsApp Web (2026-03-11)

## Opções Ranqueadas por Viabilidade

### 1. Evolution API (Recomendada)
- **Status:** Ativo, crescimento exponencial em 2026
- **Repo:** [EvolutionAPI/evolution-api](https://github.com/EvolutionAPI/evolution-api)
- **Tech:** API REST sobre Baileys (WhiskeySockets/Baileys)
- **QR Login:** Sim | **Ler grupos:** Sim | **Enviar msgs:** Sim
- **Vantagens:** API REST simples, comunidade BR forte, Docker fácil, versão Lite
- **Riscos:** Baseado em Baileys (não-oficial), risco de ban

### 2. whatsapp-web.js
- **Status:** Ativo e mantido
- **Repo:** [pedroslopez/whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)
- **Tech:** Puppeteer controlando WhatsApp Web
- **QR Login:** Sim | **Ler grupos:** Sim | **Enviar msgs:** Sim
- **Vantagens:** Maduro, bem documentado
- **Riscos:** Puppeteer pesado, precisa Xvfb, risco de ban

### 3. Baileys (WhiskeySockets)
- **Status:** Ativo (v7.0.0), mantido pela comunidade
- **Repo:** [WhiskeySockets/Baileys](https://github.com/WhiskeySockets/Baileys)
- **Tech:** WebSockets nativos (TypeScript)
- **QR Login:** Sim | **Ler grupos:** Sim | **Enviar msgs:** Sim
- **Vantagens:** Leve (sem browser), TypeScript nativo, base do Evolution API
- **Riscos:** Breaking changes frequentes, baixo nível

### 4. Electron + WebView
- **Status:** WhatsApp oficial saiu do Electron em 2024
- **Viabilidade:** Baixa para app web
- **Descartado**

### 5. API Oficial WhatsApp Business
- **Limitação fatal:** Não suporta QR login de usuário final, não lê grupos
- **Descartado para este caso de uso**

## Riscos de Ban (2026)

- Meta detecta automação via fingerprinting comportamental
- Consequências: restrição temporária → ban permanente → blacklist do número
- Meta baniu chatbots genéricos no WA Business API (jan/2026)
- APIs não-oficiais já eram proibidas nos ToS

## Mitigações
- Conta dedicada (não pessoal)
- Rate limiting agressivo (max 20 msgs/hora)
- Delays aleatórios simulando comportamento humano
- Uso interno (não SaaS público no MVP)

## Sources
- [Evolution API GitHub](https://github.com/EvolutionAPI/evolution-api)
- [whatsapp-web.js Guide](https://wwebjs.dev/guide/)
- [Baileys Wiki](https://baileys.wiki/docs/intro/)
- [API Oficial vs Não Oficial 2026](https://www.agenciarollin.com/blog/api-oficial-whatsapp-vs-nao-oficial-guia-completo-2026)
