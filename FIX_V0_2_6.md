# LaVic v0.2.6 — loader route fix

## Problema confirmado

Os assets `/media/lavic-loader.webm` e `/media/lavic-loader.mp4` são servidos corretamente, mas o teste com `/?intro=1` retornou 404 no documento principal.

## Correção

- O modo de replay forçado deixou de usar query string.
- Agora usa `#intro` ou `#intro=1`.
- Fragmentos `#...` nunca são enviados ao servidor, então não alteram o roteamento do Next.js.
- O vídeo também recebe uma chamada explícita a `video.play()` em `canplay/loadeddata`, mantendo `muted` e `playsInline`.
- O loader só registra a sessão como concluída após o vídeo terminar com sucesso.
- Em `prefers-reduced-motion`, a produção usa a logo estática por um instante; `#intro` pode forçar o vídeo para diagnóstico.

## Teste

1. Substitua os arquivos do patch.
2. Reinicie o dev server.
3. Acesse `http://localhost:3000/#intro`.
4. Para testar uma nova sessão no console:

```js
sessionStorage.removeItem("lavic:intro-played:v026");
location.href = "/#intro";
```
