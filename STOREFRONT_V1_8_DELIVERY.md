# LaVic Storefront v1.8 — Background Wordmark SVG Fix

## Objetivo
Ajustar especificamente o wordmark de fundo `KOMBUCHA` do hero, que ainda estava visualmente distante da referência do Figma quando renderizado apenas com texto + `-webkit-text-stroke`.

## O que foi alterado
- substituição do `KOMBUCHA` do hero por um `SVG` inline (`HeroWordmarkSvg`)
- preservação da geometria do hero e da home
- stroke calibrado em SVG para um outline mais limpo e uniforme
- manutenção do restante da home sem mexer em layout/seções
- fallback responsivo básico do SVG em breakpoints menores

## Arquivos alterados
- `apps/storefront/app/page.tsx`
- `apps/storefront/app/globals.css`
- `apps/storefront/components/home-figma-v18.tsx`
- `tooling/validate-storefront-v1.8.mjs`
- `VALIDAR_STOREFRONT_V1_8.cmd`

## Aplicação
Aplicar sobre a **v1.7**.

## Validação
Executar:

```bat
VALIDAR_STOREFRONT_V1_8.cmd
```
