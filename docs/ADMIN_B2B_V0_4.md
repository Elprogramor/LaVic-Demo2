# LaVic Admin v0.4 — Revenda / B2B

A v0.4 expande a fundação aprovada do LaVic Admin com um módulo comercial B2B completo, preservando a referência visual máxima em `docs/reference/lavic-admin-max-reference.png`.

## Escopo

- Pipeline comercial com etapas: Novo lead → Em contato → Qualificado → Proposta → Negociação → Cliente.
- Lista e filtros de leads.
- Cadastro demonstrativo de lead com validação de UI.
- Detalhe de oportunidade com progresso, histórico, contato, produtos de interesse e vínculo B2C quando existir.
- Clientes B2B e perfil comercial.
- Pedidos B2B.
- Tabelas comerciais e matriz de preços.
- Busca global para leads e parceiros.
- Integração do alerta B2B da Dashboard com o pipeline.
- Permissões B2B preparadas para enforcement futuro na API.

## Regras arquiteturais fixas

1. Lead B2B e cliente B2B são contextos distintos.
2. A conversão de um lead não apaga o histórico comercial.
3. Condição comercial pertence a uma tabela autorizada e pode ser vinculada ao parceiro.
4. O frontend nunca é autoridade para preço, desconto, pedido mínimo ou permissão.
5. A API futura recalcula e valida preço antes de confirmar pedidos B2B.
6. Alterações de tabela, condição e status comercial devem gerar auditoria no backend.
7. Dados desta versão são exclusivamente demonstrativos; contatos estão mascarados ou em `example.com`.

## Rotas

- `/b2b` — pipeline
- `/b2b/leads` — oportunidades
- `/b2b/leads/[id]` — detalhe do lead
- `/b2b/customers` — parceiros ativos/inativos
- `/b2b/customers/[id]` — detalhe do parceiro
- `/b2b/orders` — pedidos comerciais
- `/b2b/pricing` — tabelas de preço

## Próxima camada

A persistência continua propositalmente fora desta fase. Quando a API for conectada, contratos de domínio, RBAC e auditoria devem substituir qualquer confiança em estado local ou em dados vindos do navegador.
