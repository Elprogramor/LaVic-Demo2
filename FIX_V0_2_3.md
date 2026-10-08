# LaVic v0.2.3 — Cart drawer fix

Corrige o carrinho lateral que permanecia visível desde o carregamento inicial.

## Alterações

- `drawer-root` agora inicia oculto e sem eventos de ponteiro.
- backdrop inicia com opacidade zero.
- drawer inicia fora da viewport com `translate3d(100%, 0, 0)`.
- o estado `.is-open` controla exclusivamente a abertura visual.
- adicionada transição curta e consistente com o motion system.
- `Escape` fecha o carrinho.
- scroll da página é bloqueado somente enquanto o carrinho está aberto.
- elementos principais deixam de entrar na ordem de tabulação quando o drawer está fechado.

## Arquivos alterados

- `apps/storefront/app/globals.css`
- `apps/storefront/components/cart-drawer.tsx`
