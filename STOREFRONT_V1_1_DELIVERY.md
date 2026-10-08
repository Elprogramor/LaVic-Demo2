# LaVic Storefront v1.1 — Header + Hero Pixel Refinement

Base: aplicar sobre a v1.0 Figma Exact Home.

## Escopo desta versão

Esta iteração não redesenha a home inteira. Ela trava o primeiro bloco contra as medidas já extraídas do Figma atualizado:

- header desktop do frame 5:45;
- posição exata de logo, navegação e ações na régua de 1440px;
- `KOMBUCHA` de fundo com 234px e tracking de 14.04px;
- badge, garrafa, fade, copy, CTA, mini produto e seletor nas coordenadas do Figma;
- bloco de depoimento alinhado em x=297 / y=704 / 846px;
- setas refeitas em geometria CSS fina, evitando o aspecto inconsistente de glifos Unicode;
- nenhuma nova dependência;
- nenhum asset remoto temporário do Figma.

## Fonte display

O Figma usa Clash Display ExtraLight no grande `KOMBUCHA`. O projeto não distribui arquivos de fonte. A v1.1 tenta usar uma instalação local de Clash Display quando ela existir e mantém fallback seguro para Helvetica/Arial.

## Captura comparativa

Com o storefront rodando em `http://localhost:3000`:

```bat
CAPTURAR_HOME_1440.cmd
```

O script usa Chrome/Edge headless em 1440 x 5230 e cria `lavic-home-1440.png` na raiz. Essa captura deve ser usada nas próximas rodadas de comparação com o Figma.

## Validação

```bat
VALIDAR_STOREFRONT_V1_1.cmd
```

Executa auditoria estrutural, typecheck e build do storefront.
