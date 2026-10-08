# LaVic Admin v0.5 — Marketing + Loja

## Objetivo

Adicionar os módulos de crescimento sem alterar a linguagem visual aprovada nas versões anteriores. Marketing concentra regras comerciais, campanhas e leitura de performance. Loja funciona como CMS controlado para o storefront, preservando o design system.

## Marketing

- visão geral com KPIs e próximas ações
- cupons com período, limites, canais e receita atribuída
- promoções de preço, quantidade, combo e frete
- campanhas por canal com visitas, pedidos, conversão e receita
- performance com leitura de atribuição separada do Financeiro

## Loja

- estrutura da Home por seções publicáveis
- destaques editoriais vinculados ao catálogo
- banners com conteúdo, CTA e assets desktop/mobile
- sabores reais separados de conceitos DEMO
- conteúdo institucional com owner e status
- SEO por rota, indexação e alertas

## Regras fixas

1. O Admin não vira page builder livre. Grid, tipografia, espaçamento e componentes continuam no storefront.
2. Preço, cupom, promoção, elegibilidade e disponibilidade são revalidados pela API.
3. Sabores marcados como DEMO nunca são publicados automaticamente.
4. Marketing attribution não substitui o Financeiro.
5. Nenhum segredo ou token privado entra no bundle do Admin.
