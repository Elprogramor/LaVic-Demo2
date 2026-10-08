# LaVic v0.3.4 — Art Directed Banners

Esta versão substitui a montagem do hero com dezenas de assets independentes por três banners de campanha completos. O texto, CTA e controles permanecem HTML real e responsivo.

## Alterações principais

- 3 banners desktop WebP e 3 enquadramentos mobile WebP.
- Crossfade entre campanhas, sem slide horizontal da arte.
- `Viva com gás.` muda integralmente de cor por produto.
- CTA, contador e progress bar acompanham a cor do slide.
- Gradiente de legibilidade entre a arte e o texto, sem card atrás da copy.
- Autoplay de 6,5 s, pause/play, pausa em hover/foco/aba oculta.
- Setas, teclado Left/Right e swipe continuam ativos.
- Hero deixa de referenciar `bottleSrc`, `assets`, `backdropLabel` e os PNGs/objetos da v0.3.3.
- Mobile usa arte 4:5 dedicada dentro da região inferior do hero.

## Aplicação

Copie o conteúdo deste patch por cima da v0.3.3 existente. Os assets antigos da pasta `public/hero/lime`, `strawberry` e `sparkling` podem permanecer no disco por compatibilidade, mas o hero v0.3.4 não os referencia mais.

## Validação

```powershell
npm run typecheck -w @lavic/storefront
npm run dev
```

Depois da inspeção visual:

```powershell
.\VALIDAR_V0_3_4.cmd
```

O script executa auditoria estática, typecheck, build de produção do storefront e `npm audit --audit-level=high`.

## Larguras para inspeção visual

360, 390, 430, 768, 1024, 1366, 1440 e 1920 px.
