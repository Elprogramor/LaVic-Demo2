# LaVic Storefront v1.6 — Figma Reference Fidelity

Patch incremental sobre a v1.5.

## Objetivo
A v1.5 refinou traços e tipografia, mas a comparação full-page mostrou que os maiores desvios restantes vinham de **assets e composições erradas**, não de pequenos valores de CSS.

## Mudanças
- hero: garrafa ocupa melhor o slot visual 457×686 e outline fica mais presente;
- mini-card do hero: usa a mesma fotografia de três garrafas vista na referência;
- Sabores Engarrafados: os quatro slots reproduzem a fotografia de três garrafas usada no Figma, com nome e preço consistentes com o frame;
- painel verde: a imagem principal deixa de ser uma foto genérica e passa a ser uma composição de três garrafas horizontais;
- painel verde: os dois cards menores passam a ser composições de produto, e não cards antigos de sabor;
- ghost typography do Espumante ganha presença equivalente à referência;
- estrutura 1440×5230 permanece preservada.

## Aplicação
Extraia este pacote na raiz do projeto, sobre a v1.5, mantendo a estrutura de pastas.

Execute:

```bat
VALIDAR_STOREFRONT_V1_6.cmd
```

## Escopo
Esta versão prioriza **fidelidade visual ao Figma desktop**. Textos de marketing continuam LaVic quando a referência ainda possui conteúdo antigo/placeholder em inglês.
