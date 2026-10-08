# LaVic Wave CTA v2

Correção do preenchimento que parecia instantâneo.

## O que foi corrigido

1. A animação continua usando exatamente a mecânica:
   `top: 100%` -> `top: 0`.
2. A duração foi aumentada para `700ms` para o preenchimento ficar claramente visível.
3. A curva passou para `cubic-bezier(0.65, 0, 0.35, 1)`, mantendo entrada e saída suaves.
4. O bloco `prefers-reduced-motion` não remove mais completamente a transição.
5. Nenhum `scaleY`, Framer Motion, ripple ou gradiente foi introduzido.

## Aplicação

Substitua os dois arquivos do componente anterior:

- `components/ui/lavic-wave-button.tsx`
- `components/ui/lavic-wave-button.module.css`

Se seu projeto usa `src/`, aplique em:

- `src/components/ui/lavic-wave-button.tsx`
- `src/components/ui/lavic-wave-button.module.css`
