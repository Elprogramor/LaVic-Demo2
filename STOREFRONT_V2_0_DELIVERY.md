# LaVic Storefront v2.0 — Public Pages Design System

## Objetivo
Levar a linguagem visual editorial construída na home/Figma para todas as páginas públicas do storefront, preservando a lógica existente e mantendo o painel administrativo completamente fora do escopo.

## Rotas redesenhadas
- `/sabores`
- `/kits`
- `/revenda`
- `/sobre`
- `/produto/[slug]`
- `/carrinho`
- `/checkout`
- `/encomendas`

## Componentes compartilhados redesenhados
- `SiteHeader`
- `SiteFooter`
- `PageShell`
- `ProductGrid`
- `ProductPurchase`
- `LeadForm`
- `CartDrawer`

## Direção visual
- verde LaVic + off-white + cinzas editoriais
- navegação central em pill inspirada na home
- tipografia Alexandria/Poppins já carregada pelo storefront
- wordmarks vazados de fundo para páginas internas
- grandes áreas editoriais e linhas finas
- cards com produto protagonista
- botões pill consistentes
- footer inspirado diretamente na home do Figma
- responsive específico para notebook/tablet/mobile

## Segurança e arquitetura
- nenhuma alteração em `apps/admin`
- nenhuma nova dependência
- nenhuma URL temporária do Figma
- formulários continuam demonstrativos e não enviam dados reais
- checkout continua sem processar pagamento real
- lógica existente de carrinho e produto preservada

## Aplicação
Aplicar sobre a versão atual do storefront (v1.12 ou posterior compatível).

## Validação
Executar:

```bat
VALIDAR_STOREFRONT_V2_0.cmd
```
