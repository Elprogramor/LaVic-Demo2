# LaVic Storefront v1.9 — Hero Wordmark + Composition Repair

## Objetivo
Corrigir o hero após o diagnóstico do usuário:
- o wordmark `KOMBUCHA` ainda estava com aparência quebrada
- Alexandria outline não reproduz bem o visual desejado
- a garrafa estava alta demais em relação à referência
- o fade branco estava contaminando a leitura do texto e do CTA

## O que foi alterado
- manutenção do `KOMBUCHA` em SVG inline
- troca do stack tipográfico do wordmark para priorizar `Codec Pro` com fallback seguro
- aumento de peso para 700 no wordmark de fundo
- recalibração do stroke, tracking e largura do wordmark
- redução da escala da garrafa do hero
- reposicionamento/redução do fade branco para não lavar texto e botões
- reforço da hierarquia de z-index do hero

## Arquivos alterados
- `apps/storefront/app/page.tsx`
- `apps/storefront/app/globals.css`
- `apps/storefront/components/home-figma-v19.tsx`
- `tooling/validate-storefront-v1.9.mjs`
- `VALIDAR_STOREFRONT_V1_9.cmd`

## Aplicação
Aplicar sobre a **v1.8**.

## Validação
Executar:

```bat
VALIDAR_STOREFRONT_V1_9.cmd
```
