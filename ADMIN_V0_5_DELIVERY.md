# Entrega — LaVic Admin v0.5

Patch incremental para aplicar sobre a v0.4 aprovada.

## Incluído

- Marketing: visão geral, cupons, promoções, campanhas e performance
- Loja/CMS: Home, destaques, banners, sabores, conteúdo e SEO
- busca global ampliada para cupom, campanha e banner
- permissões `marketing.write` e `content.write`
- proteção explícita para sabores DEMO
- CMS controlado pelo design system
- validação estática específica da etapa

## Aplicação

Extraia este ZIP na raiz do projeto, substituindo os arquivos indicados. Depois execute:

```powershell
.\VALIDAR_ADMIN_V0_5.cmd
npm run dev:admin
```

Pontos iniciais:

- `http://localhost:3001/marketing`
- `http://localhost:3001/store`
