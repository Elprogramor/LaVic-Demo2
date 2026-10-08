# LaVic v3 — Clean Rebuild

Esta versão encerra a fase de empilhamento de patches visuais no storefront.

## Decisão arquitetural
O storefront foi reconstruído com nomes semânticos e uma camada de estilos pequena e organizada. O painel administrativo foi preservado e recebeu somente arquivos de configuração de projeto necessários para ser executado dentro deste pacote.

## Estrutura do storefront
- `app/`: rotas públicas e metadata
- `components/layout/`: header, footer, hero interno e shell público
- `components/commerce/`: carrinho, produtos, compra, checkout demonstrativo e leads
- `components/sections/`: composição da home
- `components/ui/`: primitives visuais pequenas
- `data/`: catálogo demonstrativo
- `lib/`: utilitários
- `styles/tokens.css`: tokens de marca
- `styles/base.css`: reset/base
- `styles/components.css`: componentes compartilhados
- `styles/pages.css`: composição das páginas

## Admin
O código-fonte preservado do admin é conferido por `docs/admin-preserved-sha256.txt`. Os arquivos `package.json`, `tsconfig.json`, `next-env.d.ts` e `next.config.ts` foram adicionados como configuração do workspace e não substituem os arquivos-fonte preservados do painel.

## Fontes
`Codec Pro` é priorizada por CSS, mas nenhum arquivo de fonte proprietário é distribuído neste pacote. Para renderização idêntica em todas as máquinas, a marca deverá disponibilizar/licenciar a fonte e registrá-la no projeto.

## Demonstração
Checkout, leads e catálogo ainda são demonstrativos. Não existe gateway de pagamento nem envio de formulário para produção nesta versão.
