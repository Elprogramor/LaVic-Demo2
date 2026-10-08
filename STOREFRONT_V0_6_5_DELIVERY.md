# LaVic Storefront v0.6.5 — Exact Water Button Reference

Patch incremental para aplicar sobre a v0.6.4.

## O que mudou
- O CTA agora segue literalmente a mecânica fornecida como referência.
- Repouso: fundo 100% transparente, texto e borda em verde LaVic.
- `::before`: começa em `top: 100%`, largura/altura `100%`.
- Hover/foco: `top: 0` em `0.4s ease-in-out`.
- Texto muda em `0.5s ease`.
- Removida a superfície elíptica/onda criada na v0.6.4.
- Removidos lift, shadow e preenchimento parcial dos CTAs desta classe.
- Variante clara preservada para fundos verdes.
- `prefers-reduced-motion` preservado.

## Importante
Este patch NÃO altera `content/home-v06.ts` nem imagens em `/public`, portanto o caminho PNG/WebP que estiver sendo testado permanece intacto.
