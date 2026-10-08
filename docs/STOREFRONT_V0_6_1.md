# LaVic Storefront v0.6.1 — Hero Fit + True Liquid CTA

Patch incremental sobre a v0.6.

## Hero
- A imagem configurada em `homeV06Media.hero` passa a ocupar o hero inteiro.
- A arte não fica mais presa na antiga coluna direita, o que evitava aproveitar o espaço negativo da composição horizontal.
- Desktop usa `object-fit: cover` e enquadramento controlado.
- Mobile separa visualmente a copy da parte fotográfica para evitar crop agressivo.
- O caminho da imagem **não é alterado por este patch**. Portanto qualquer `.png` ou `.webp` configurado manualmente em `content/home-v06.ts` continua preservado.

## CTA líquido
- Estado inicial 100% transparente.
- Preenchimento só começa em hover/foco/active.
- Animação desacelerada para ~980 ms.
- A borda superior do preenchimento começa orgânica e termina acompanhando o radius do botão.
- `prefers-reduced-motion` continua respeitado.
