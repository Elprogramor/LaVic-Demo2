# LaVic v0.3.2 — Hero Art Direction

Atualização visual focada no Hero Carousel da v0.3.1. A lógica de autoplay, swipe, pausa, progresso e rotas permanece; a composição visual foi reconstruída para funcionar como um banner publicitário full-bleed em vez de imagens soltas.

## Principais mudanças

- `Viva com gás.` passa a mudar integralmente de cor conforme o slide.
- Palavra editorial gigante (`LIMÃO`, `MORANGO`, `ESPUMANTE`) atrás do produto.
- Quatro camadas de fruta/depth distribuídas pelo viewport.
- Foreground propositalmente cortado e desfocado para profundidade.
- Parallax em três planos, sem re-render por movimento do ponteiro.
- Garrafas maiores e mais integradas à composição.
- Atmosfera de fundo específica por sabor com crossfade.
- Setas movidas para as laterais do banner.
- Contador, progresso e pause preservados na parte inferior.
- Mobile recebe composição própria e redução controlada dos elementos decorativos.
- `prefers-reduced-motion` continua respeitado.

## Aplicação

Aplicar este pacote por cima da v0.3.1. Os assets `/public/hero/**` são mantidos no pacote para garantir consistência com a composição testada.

## Validação

```powershell
npm run validate:v0.3.2
npm run typecheck -w @lavic/storefront
npm run build -w @lavic/storefront
npm audit
```

Ou, no Windows:

```powershell
.\VALIDAR_V0_3_2.cmd
```
