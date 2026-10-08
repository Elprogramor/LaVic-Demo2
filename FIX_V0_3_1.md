# LaVic v0.3.1 — Hero Carousel

## O que mudou

- Hero estático substituído por carrossel editorial com 3 campanhas: Limão, Morango e Espumante.
- Headline `Viva com gás.` permanece estável; produto, descrição, CTA e atmosfera mudam por slide.
- Autoplay de 6,5 s com pausa no hover, pausa manual e pausa quando a aba fica oculta.
- Setas anterior/próximo, contador `01 / 03` e barra de progresso.
- Swipe horizontal no mobile com threshold para não conflitar com scroll vertical.
- `prefers-reduced-motion` reduz animações e desativa autoplay/parallax.
- Parallax por camadas sem re-render React a cada movimento do ponteiro: CSS variables são atualizadas via `requestAnimationFrame`.
- Foreground com blur de profundidade/movimento, mantendo garrafa e textos nítidos.
- Novos assets WebP otimizados em `/public/hero`.
- Espumante recebeu destino informativo em `/sabores#espumante`, sem inventar preço ou disponibilidade.
- Validador v0.3.1 inclui assets do hero, limite individual de 700 KB, CTA/ids do carrossel, rotas, segredos públicos e CSS.

## Aplicação

Copie o conteúdo deste patch para a raiz do projeto atual, preservando seus vídeos:

- `apps/storefront/public/media/lavic-loader.webm`
- `apps/storefront/public/media/lavic-loader.mp4`

Este patch não substitui nem remove os vídeos do loader.

## Validação

No PowerShell, na raiz do projeto:

```powershell
npm install
.\VALIDAR_V0_3_1.cmd
```

Ou individualmente:

```powershell
npm run validate:v0.3.1
npm run typecheck
npm run build
npm audit
```

## Observação sobre produto

Os textos comerciais continuam conservadores. O slide do Espumante usa apenas informações já visíveis nas referências fornecidas (pitaya, uva verde e 750 ml) e não recebe preço fictício.
