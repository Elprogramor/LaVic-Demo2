# LaVic Storefront v1.3 — Structural Figma Fidelity Reset

Esta versão interrompe a estratégia de empilhar overrides sobre `home-v10` e cria uma implementação isolada da home, com classes `f13-*`, usando como régua o frame Figma 1440 × 5230 e o CSS exportado pelo Dev Mode.

## Por que esta versão existe

As capturas manuais da v1.2 mostraram que a geometria principal estava parcialmente correta, mas componentes antigos ainda interferiam na composição. Os sintomas mais visíveis eram:

- CTA do hero duplicado;
- aspas do depoimento sobre o primeiro parágrafo;
- preço do Espumante quebrando em duas linhas;
- thumbnails invadindo o botão de compra;
- regras antigas de layout e Motion interferindo na composição absoluta.

## Alterações

- Nova `HomeFigmaV13`, sem Framer Motion no desktop de referência.
- Header, hero, testimonial, sabores, painel verde, institucional, showcase, trust, B2B e footer com uma camada CSS própria.
- Coordenadas do Figma aplicadas diretamente no canvas de 1440 × 5230.
- CTA `ESCOLHA O SEU` virou um único elemento clicável; não há mais texto duplicado.
- Depoimento separado em regiões absolutas: navegação, quote, parágrafo e autor.
- Espumante com nome, preço, CTA e thumbnails posicionados de forma independente; o texto não altera mais a geometria.
- `R$49,98` permanece em uma única linha para preservar a composição.
- Motion será reintroduzido apenas depois de o desktop estático bater visualmente com o Figma.

## Escopo desta rodada

O objetivo é travar o desktop de referência. O mobile/tablet continua funcional, mas o refinamento pixel a pixel dele fica para depois de o desktop estar aprovado.

## Aplicação

Aplicar sobre a v1.2 e executar:

```bat
VALIDAR_STOREFRONT_V1_3.cmd
```

A comparação visual pode continuar por screenshot manual. Não depende do script de captura automática.
