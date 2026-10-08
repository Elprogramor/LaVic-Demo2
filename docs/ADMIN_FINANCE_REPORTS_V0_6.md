# LaVic Admin v0.6 — Financeiro + Relatórios

## Escopo

Esta versão expande a fundação aprovada do LaVic Admin sem alterar sua linguagem visual principal.

### Financeiro
- Visão operacional de receita bruta, descontos, frete, receita líquida, pendências e reembolsos.
- Recebimentos com busca e filtros por status e meio de pagamento.
- Reembolsos com estados rastreáveis e regra explícita de segurança para futura integração real.
- Conciliação por origem, separando valor esperado, liquidado e divergências.
- Financeiro continua sendo operacional/comercial; não substitui contabilidade ou fiscal.

### Relatórios
- Central única de relatórios.
- Vendas, Produtos, Clientes, Estoque, Marketing, B2B e Canais.
- Layout e métricas consistentes entre relatórios.
- Exportação CSV local dos dados demonstrativos exibidos na tela.
- Futura implementação deve obter agregações da API, não confiar em cálculos livres do navegador.

## Segurança / arquitetura
- Nenhuma credencial financeira é armazenada no frontend.
- Ações reais de reembolso e conciliação dependerão de API, RBAC e auditoria.
- `finance.write` e `reports.export` já estão previstos nos contratos de permissão.
- O hotfix que limpa `apps/admin/.next` antes do typecheck/build foi preservado no validador v0.6.

## Aplicação

Aplicar este patch sobre LaVic Admin v0.5 + hotfix v0.5.1 e executar:

```powershell
.\VALIDAR_ADMIN_V0_6.cmd
npm run dev:admin
```

Entradas:
- `/finance`
- `/reports`
