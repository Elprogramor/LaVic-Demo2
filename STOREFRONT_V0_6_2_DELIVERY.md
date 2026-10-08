# LaVic Storefront v0.6.2 — CTA Fill Refinement

Patch incremental sobre a v0.6.1.

## Ajuste principal

Os CTAs `home6-liquid-button` passam a usar uma interação inspirada na referência visual dos botões do site institucional do WhatsApp: o botão continua completamente limpo no repouso e uma massa circular de cor sobe a partir da base durante hover/foco, preenchendo o pill de forma contínua.

- estado inicial 100% transparente;
- borda e texto verdes;
- preenchimento nasce fora do botão;
- frente arredondada, sem ondulação artificial;
- duração de 640ms com easing controlado;
- cor do texto troca com pequeno atraso para acompanhar o preenchimento;
- sem snap rápido em `:active`;
- variante clara preservada para fundos escuros;
- `prefers-reduced-motion` preservado.

## Aplicação

Extraia o ZIP na raiz do projeto sobre a v0.6.1 e execute:

```powershell
.\VALIDAR_STOREFRONT_V0_6_2.cmd
```
