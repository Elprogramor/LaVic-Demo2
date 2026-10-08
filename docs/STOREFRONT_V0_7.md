# LaVic Storefront v0.7 — Motion System

Base de aplicação: `lavic-storefront-v0.6.5-exact-water-button`.

## Objetivo

Adicionar uma linguagem de motion premium e consistente à Home sem alterar conteúdo, rotas, imagens ou a mecânica atual do CTA líquido.

## Aplicado

- Hero com entrada sequencial de headline, apoio e CTA.
- Reveals verticais suaves nos blocos de texto das seções.
- Stagger coordenado nos cards de sabores.
- Stagger coordenado nos cards “Comece por aqui”.
- Stagger nos kits e valores da marca.
- Entrada suave da galeria lifestyle.
- Entrada organizada do bloco B2B.
- Microelevação controlada no hover de cards.
- `MotionConfig reducedMotion="user"` para respeitar preferência de redução de movimento.

## Direção de motion

- Sem bounce.
- Sem rotação decorativa.
- Sem loops infinitos.
- Sem scroll hijacking.
- Uma curva principal: `[0.22, 1, 0.36, 1]`.
- Motion voltado à hierarquia e leitura, não a efeitos chamativos.

## Arquivos alterados/adicionados

- `apps/storefront/components/home-v06.tsx`
- `apps/storefront/components/motion/lavic-motion.ts`
- `tooling/validate-storefront-v0.7.mjs`
- `VALIDAR_STOREFRONT_V0_7.cmd`

## Aplicação

Extraia o ZIP na raiz do monorepo, preservando a estrutura de pastas. Este pacote contém apenas arquivos alterados/novos.

Depois execute:

`VALIDAR_STOREFRONT_V0_7.cmd`

O script faz validação estrutural, TypeScript e build de produção do storefront.
