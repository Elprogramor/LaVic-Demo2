# Entrega v0.2

## Alterações visuais
- Home reconstruída com direção `Editorial Commerce`.
- Hero inspirado no conceito fornecido: `Viva / Com / Gás.` e laranja como acento.
- Tipografia de identidade migrada de serif para All Round Gothic (com fallback Manrope).
- Radius ampliado e aplicado de forma controlada.
- Seção de formatos: 1L, 500ml e espumante.
- Blocos assimétricos para kits, encomendas e revenda.
- Sabores Limão/Morango tratados como campanhas individuais.
- Nova seção de fermentação e CTA B2B.
- CTA final e footer revisados.

## Loader
- `SiteLoader` preparado para WebM/MP4.
- Uma reprodução por sessão.
- Fallback estático caso o vídeo ainda não esteja presente.
- Saída em movimento sólido sem fade intermediário da logo.

## Arquitetura preservada
Storefront, admin, API e packages continuam separados. A v0.2 altera principalmente a camada visual pública e não enfraquece as decisões de autorização server-side, tenancy, contracts e domínio definidas na v0.1.

## Pendências intencionais
- Vídeo final do loader deve ser fornecido pela marca.
- All Round Gothic depende de arquivo/licença oficial.
- Fotografias atuais são placeholders.
- Checkout, API, admin e formulários ainda não persistem dados reais.
