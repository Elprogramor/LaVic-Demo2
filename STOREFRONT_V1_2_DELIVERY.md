# LaVic Storefront v1.2 — Figma CSS Fidelity Pass

Esta versão usa o CSS exportado pelo usuário no Figma Dev Mode como régua oficial do desktop em 1440 × 5230.

## Alterações principais

- `KOMBUCHA`: 1542 × 285, 234px, Alexandria 600, tracking 0.06em, stroke verde e opacidade 0.5.
- Header: frame de 1409 × 68 reposicionado conforme a fórmula do Figma.
- Hero: badge, garrafa, gradiente, copy, CTA, mini-card, escolha e depoimento alinhados à geometria fornecida.
- Sabores Engarrafados: títulos e grid com grupos de 282px nas posições 119 / 435 / 751 / 1067.
- Painel verde: 1401 × 700 em x=19/y=1852, imagem 313 × 371 com radius 46px.
- Institucional: frame 1260 × 232 em x=89/y=2669.
- Showcase Espumante: composição ancorada em y=2978, produto x=203, compra x=730 e thumbnails com radius 15px.
- Faixa de confiança: 1260.06 × 170 em x=90/y=3856.
- B2B: painel 1394 × 439 em x=23/y=4104 e garrafas com tamanhos/rotações do Figma.
- Footer: subscribe, linhas, grid e barra legal alinhados às coordenadas fornecidas.

## Responsividade

Os valores absolutos do Dev Mode são aplicados somente no breakpoint de referência `>= 1440px`. Abaixo disso permanecem as regras responsivas do projeto, evitando transformar o layout desktop do Figma em uma página quebrada em notebooks/tablets/mobile.

## Observação sobre a seta circular

O CSS exportado pelo Figma informa simultaneamente uma caixa de 26 × 28 e padding de 37.0569px com `box-sizing: border-box`. Esses valores são geometricamente incompatíveis. Nesta versão foi preservada a dimensão visual já reproduzida (74 × 74) e a posição x=1069/y=678, até fazermos a comparação por screenshot.

## Aplicação

Aplique sobre a v1.1 e execute:

```bat
VALIDAR_STOREFRONT_V1_2.cmd
```

Para a comparação visual, mantenha o script da v1.1:

```bat
CAPTURAR_HOME_1440.cmd
```
