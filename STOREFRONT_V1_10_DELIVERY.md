# LaVic Storefront v1.10 — Hero rollback + Codec Pro outline wordmark

## Objetivo
Aplicar o ajuste solicitado pelo usuário:
- em relação ao fade branco e à garrafa, voltar ao comportamento visual aprovado na v1.5
- remover o `KOMBUCHA` em SVG
- usar `Codec Pro` no wordmark de fundo com efeito vazado/outline
- aplicar espessura solicitada de `7mm`

## O que foi alterado
- remoção do `HeroWordmarkSvg`
- retorno do hero para o wordmark em texto (`.f13-hero-word`)
- stack tipográfico do wordmark priorizando `Codec Pro`
- `-webkit-text-stroke: 7mm` no wordmark do hero
- restauração da composição do hero próxima da v1.5:
  - garrafa sem scale extra
  - fade nas medidas/aparência anteriores
  - z-index do hero restaurado

## Arquivos alterados
- `apps/storefront/app/page.tsx`
- `apps/storefront/app/globals.css`
- `apps/storefront/components/home-figma-v110.tsx`
- `tooling/validate-storefront-v1.10.mjs`
- `VALIDAR_STOREFRONT_V1_10.cmd`

## Aplicação
Aplicar sobre a **v1.9**.

## Validação
Executar:

```bat
VALIDAR_STOREFRONT_V1_10.cmd
```
