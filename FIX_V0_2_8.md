# LaVic v0.2.8 — loader completo na primeira visita

## Correções

- A primeira visita da sessão agora só é marcada como concluída após o evento `ended` do vídeo.
- O timeout de segurança vale apenas enquanto o vídeo ainda não começou. Assim que `play/playing` dispara, o timeout é cancelado e não pode cortar a animação.
- O último frame é mantido por 320 ms antes da saída do overlay.
- A saída de 420 ms começa somente após o vídeo terminar completamente.
- O vídeo não é montado enquanto o componente ainda verifica a sessão, eliminando flashes rápidos em recarregamentos.
- `#intro` continua sendo replay de teste e não consome a intro normal da sessão.
- Uma falha de autoplay/carregamento não grava a sessão como reproduzida.

## Chave da sessão

`lavic:intro-played:v028`

## Teste

Primeira visita normal:

`http://localhost:3000/`

A animação deve tocar inteira e sair apenas após o último frame.

Atualize com F5: a intro não deve tocar novamente.

Replay manual para QA:

`http://localhost:3000/#intro`

Para zerar manualmente:

```js
sessionStorage.removeItem("lavic:intro-played:v028");
location.href = "/";
```
