# Arquitetura — LaVic

## Objetivo
A demo é a primeira versão de uma plataforma que deverá suportar e-commerce B2C, pedidos em volume, CRM, B2B, conteúdo e painel administrativo.

## Aplicações
- **storefront**: experiência pública e comercial.
- **admin**: aplicação isolada do painel interno.
- **api**: fonte de verdade para autorização, preços, pedidos e dados sensíveis.

## Regra de dependência
`storefront/admin -> contracts/domain -> API`. A UI pública nunca acessa banco diretamente e nunca decide autorização.

## Dados da demo
A v0.1 usa repositories locais sobre mocks. Os componentes consomem interfaces de domínio para que a troca por API não exija reescrever a UI.

## Evolução prevista
1. API e banco real.
2. Autenticação segura do admin.
3. Catálogo administrável.
4. Checkout real.
5. CRM e lead routing.
6. B2B com tabela comercial e política de mínimos.
7. Estoque, financeiro e analytics.
