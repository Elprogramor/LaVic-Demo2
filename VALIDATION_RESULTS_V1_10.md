# Validation Results v1.10

## Validação estática local
- page.tsx aponta para `HomeFigmaV110`
- wordmark do hero voltou a ser texto (`.f13-hero-word`)
- `HeroWordmarkSvg` removido
- stack tipográfico priorizando `Codec Pro`
- `-webkit-text-stroke: 7mm` aplicado
- fade do hero restaurado
- garrafa do hero sem scale adicional
- CSS balanceado
- sem `dangerouslySetInnerHTML`

## Observação
A validação completa de `typecheck` e `build` deve ser executada no ambiente local do projeto via `VALIDAR_STOREFRONT_V1_10.cmd`.
