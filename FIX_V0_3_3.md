# LaVic v0.3.3 — Hero Premium

Aplicar esta pasta sobre a v0.3.2.

## Objetivo
Transformar o Hero Carousel em uma cena publicitária full-bleed, com produto protagonista, assets independentes, profundidade real e headline temática integral.

## Mudanças principais
- Cada fruta, folha e elemento visual utilizado no hero passa a apontar para um arquivo próprio.
- Removidas do componente as referências aos composites antigos `ingredient.webp`, `fruit-scene.webp` e `foreground.webp`.
- `Viva com gás.` troca integralmente de cor conforme o slide.
- Palavra editorial gigante `LIMÃO`, `MORANGO` ou `ESPUMANTE` permanece atrás do produto.
- Produto ampliado e integrado a splash, glow, bubbles e assets em múltiplos planos.
- Foreground com blur e parallax mais intenso; midground e background recebem deslocamentos menores.
- Composição mobile recebe redução própria de elementos, sem apenas encolher o desktop.
- Autoplay, setas, swipe, pause, progress e acessibilidade da v0.3.2 foram preservados.

## Asset pack
Os arquivos novos ficam em:
- `apps/storefront/public/hero/lime/`
- `apps/storefront/public/hero/strawberry/`
- `apps/storefront/public/hero/sparkling/`

Cada elemento renderizado utiliza um caminho diferente no `hero-slides.ts`.

## Validação
Rode na raiz do monorepo:

```powershell
npm run validate:v0.3.3
npm run typecheck -w @lavic/storefront
npm run build -w @lavic/storefront
npm audit --audit-level=high
```

Ou:

```powershell
.\VALIDAR_V0_3_3.cmd
```

A checagem dos vídeos do loader espera os arquivos locais:
- `apps/storefront/public/media/lavic-loader.webm`
- `apps/storefront/public/media/lavic-loader.mp4`

Esses vídeos não são substituídos por este patch.
