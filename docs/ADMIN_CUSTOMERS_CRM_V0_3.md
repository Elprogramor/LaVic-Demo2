# LaVic Admin v0.3 — Clientes e CRM

Esta etapa amplia a fundação aprovada do LaVic Admin sem alterar sua escala tipográfica ou linguagem estrutural.

## Escopo

- `/customers`: base de clientes com indicadores, busca, filtros por origem e segmentos.
- `/customers/segments`: regras de segmentação legíveis e verificáveis.
- `/customers/crm`: atividade recente, contexto de relacionamento e fila de atenção.
- `/customers/[id]`: perfil 360º com métricas, timeline, pedidos, notas internas, contato, consentimentos e endereços.
- Busca global passa a localizar clientes por nome, código, e-mail e telefone.
- Detalhe de pedido passa a abrir o perfil do cliente quando houver correspondência.
- RBAC preparado com `customers.read` e `customers.write`.

## Princípios preservados

- referência visual máxima da v0.1;
- verde e laranja LaVic como cores institucionais;
- densidade operacional organizada;
- progressive disclosure;
- mesma anatomia de filtros, tabelas, badges e painéis;
- nenhuma nota interna é exposta ao storefront;
- segmentação não implica consentimento de marketing;
- dados de demonstração não representam pessoas reais.

## Evolução de backend esperada

Quando o módulo for ligado à API, o cliente deve ser uma entidade única e os eventos de CRM devem ser append-only sempre que possível. Preferências de contato precisam ser tratadas separadamente de tags/segmentos. Alterações sensíveis devem gerar auditoria.
