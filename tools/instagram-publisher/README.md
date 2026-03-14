# Instagram Publisher

Publica carrosséis do Instagram via Graph API. Upload de imagens para imgbb, criação de containers e publicação automatizada.

## Usage

```bash
node --env-file=.env scripts/publish.js --images "slide1.jpg,slide2.jpg" --caption "Texto do post" [--dry-run]
```

## Environment Variables

```
IMGBB_API_KEY=           # imgbb.com (gratis, sem cartao)
INSTAGRAM_ACCESS_TOKEN=  # Token 60 dias (Graph API Explorer)
INSTAGRAM_USER_ID=       # ID da conta Business
```

## Setup

1. **IMGBB_API_KEY**: Criar conta em api.imgbb.com > Get API Key
2. **INSTAGRAM_ACCESS_TOKEN**: Graph API Explorer > Gerar token > Converter para 60 dias
3. **INSTAGRAM_USER_ID**: GET /me/accounts > GET /{page-id}?fields=instagram_business_account

## Constraints

- JPEG only, 2-10 imagens por carrossel
- Caption max 2200 caracteres
- Requer conta Instagram Business (nao Personal/Creator)
- Rate limit: 25 posts via API por 24h
