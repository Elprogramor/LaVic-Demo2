# LaVic Admin v0.2 — Estoque

Esta etapa expande a fundação visual aprovada na v0.1 sem alterar sua linguagem-base. A imagem em `docs/reference/lavic-admin-max-reference.png` continua sendo a referência visual máxima do painel.

## Escopo implementado

- `/inventory` — visão geral com saldo disponível, reservas, estoque crítico, lotes, FEFO, posição de estoque e movimentações recentes.
- `/inventory/lots` — gestão visual de lotes, produção, validade, localização, bloqueios e ordenação por vencimento.
- `/inventory/movements` — histórico de entradas/saídas com filtros e registro demonstrativo local.
- `/inventory/count` — inventário físico interativo com contagem, divergência e etapa de revisão.
- `/inventory/alerts` — central de alertas para ruptura, validade, divergência, bloqueio e vencimento.

## Regras estruturais preservadas

- Verde e laranja LaVic como cores institucionais, com semântica de risco separada da cor de marca.
- Mesmos padrões de PageHeader, KPIs, filtros, tabelas, badges, ações e responsividade da v0.1.
- Estoque não é sobrescrito silenciosamente: a arquitetura final deve registrar movimentações imutáveis e auditáveis.
- Ajustes de inventário devem exigir permissão específica e motivo.
- Lotes próximos da validade devem priorizar FEFO (first expired, first out).
- Lotes bloqueados/vencidos não integram saldo vendável.
- Dados de produto, lote, produção e validade desta versão são mocks de demonstração e não representam especificação técnica/regulatória final.

## Contratos preparados

Tipos adicionados em `apps/admin/lib/types.ts`:

- `InventoryStockItem`
- `InventoryLot`
- `InventoryMovement`
- `InventoryAlert`
- `InventoryCountRow`
- estados auxiliares de saúde, lote, movimentação e severidade.

Permissões preparadas:

- `inventory.read`
- `inventory.write`
- `inventory.adjust`
- `inventory.lots.write`

A API real deverá validar todas as permissões; ocultar controles no frontend não constitui autorização.

## Observação sobre a movimentação demonstrativa

O formulário de `/inventory/movements` adiciona um registro somente ao estado local da sessão para testar o fluxo da interface. Não há persistência simulada em storage/localStorage. Quando a API for conectada, essa ação deverá criar evento de estoque no servidor com usuário, origem, lote e auditoria.
