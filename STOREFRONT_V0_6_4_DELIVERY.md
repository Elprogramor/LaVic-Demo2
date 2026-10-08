# LaVic Storefront v0.6.4 — Perceptible Water-Rise CTA

Patch incremental sobre a v0.6.3.

## Alteração principal
O CTA deixa de apenas mover uma camada inteira com `top: 100% -> 0` em 560ms. Em botões baixos essa transição podia parecer quase instantânea.

Agora:
- o corpo do líquido cresce de `height: 0%` para `height: 100%`;
- uma superfície rasa acompanha a subida e deixa a fase intermediária visível;
- duração aproximada de 1,05 s;
- easing controlado para permanecer mais tempo no meio do percurso;
- o texto só assume a cor clara depois que o líquido começou a subir;
- estado inicial continua totalmente transparente;
- variante clara e `prefers-reduced-motion` preservados.
