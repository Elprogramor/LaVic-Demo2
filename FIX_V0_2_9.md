# LaVic v0.2.9 — Loader transition

## Alterações

- O canvas do loader agora usa `#02535C`.
- A saída do loader agora é um fade de 520 ms sobre o site já renderizado.
- Na primeira entrada da sessão, a animação continua tocando até o evento real `ended`.
- Após a primeira reprodução completa, um refresh toca somente os primeiros 600 ms do vídeo, pausa no frame alcançado e faz o fade para o site.
- `/#intro` continua forçando a reprodução completa para QA e não consome a sessão normal.
- O vídeo usa `mix-blend-mode: screen`; isso faz o preto embutido no vídeo se integrar ao fundo `#02535C` enquanto mantém a logo branca. Se o arquivo de vídeo já tiver fundo transparente, o efeito também permanece compatível.

## Teste

Primeira entrada limpa:

```js
sessionStorage.removeItem("lavic:intro-played:v029");
location.href = "/";
```

Resultado esperado: vídeo completo -> pequena retenção do último frame -> fade -> site.

Depois pressione F5.

Resultado esperado: 600 ms do início do vídeo -> pausa -> fade -> site.

QA completo a qualquer momento:

```text
http://localhost:3000/#intro
```
