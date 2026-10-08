# LaVic Admin v0.7.1 — Core Completeness

Esta versão fecha lacunas funcionais em Vendas e Catálogo antes da conexão com backend.

## Vendas
- Pedidos continuam em `/orders`.
- Encomendas entram em `/sales/preorders`, com agenda, confirmação, pagamento parcial/total, entrega/retirada e estados próprios.
- Pagamentos entram em `/sales/payments`, como visão operacional da situação do pagamento ligada ao pedido.
- Financeiro continua separado: liquidação, reembolso financeiro e conciliação permanecem em `/finance`.

## Catálogo
- Produtos continuam em `/products`.
- Kits entram em `/catalog/kits` e sua disponibilidade é derivada do estoque dos componentes.
- Categorias entram em `/catalog/categories`, com ordem, canais, visibilidade e status.

## Segurança e persistência
As novas ações mutáveis permanecem visualmente bloqueadas na demonstração. Persistência, autorização RBAC, auditoria e recálculo server-side serão conectados na fase de backend. Nenhum botão finge salvar dados.

## Mocks
Kits e categorias marcados como DEMO são apenas dados de interface e não devem ser publicados automaticamente.
