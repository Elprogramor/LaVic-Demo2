# LaVic v0.2.5 — loader TypeScript fix

Corrige a tipagem dos timers do `SiteLoader` no storefront.

Como o componente usa explicitamente `window.setTimeout`, o retorno é `number`. Em um projeto Next com `@types/node`, `ReturnType<typeof setTimeout>` pode resolver para `NodeJS.Timeout`, gerando incompatibilidade no TypeScript.

Arquivos alterados:
- `apps/storefront/components/site-loader.tsx`

Depois de aplicar o patch na raiz do projeto:

```powershell
npm install
npm run typecheck -w @lavic/storefront
npm run typecheck
npm run build
```
