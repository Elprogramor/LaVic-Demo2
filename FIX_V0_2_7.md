# LaVic v0.2.7 — loader/session flash fix

Arquivos alterados:

- `apps/storefront/components/site-loader.tsx`
- `apps/storefront/app/globals.css`

## Correções

- Remove a imagem estática `/brand/lavic-logo-white.png` que ficava atrás do vídeo e podia aparecer por um frame.
- Mantém apenas WEBM/MP4 como mídia visual do loader.
- `#intro` continua forçando replay, mas agora é somente um modo de teste: ele não marca a intro normal como já reproduzida.
- A intro normal continua sendo exibida uma vez por sessão.
- Se `prefers-reduced-motion` estiver ativo, a intro é ignorada sem mostrar uma logo estática.
- Erro de playback/asset encerra o overlay sem fallback visual enganoso.
- Nova chave de sessão: `lavic:intro-played:v027`.

## Teste

1. Reinicie `npm run dev`.
2. Abra uma nova aba em `http://localhost:3000/` — a intro deve tocar uma vez.
3. Recarregue a mesma aba — a intro não deve tocar nem piscar uma logo estática.
4. Use `http://localhost:3000/#intro` para forçar a animação quantas vezes quiser sem consumir a reprodução normal da sessão.

Para apagar manualmente o estado da sessão:

```js
sessionStorage.removeItem("lavic:intro-played:v027");
location.href = "/";
```
