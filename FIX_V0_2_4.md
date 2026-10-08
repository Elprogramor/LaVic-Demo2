# LaVic v0.2.4 — Home/Header/Loader

Patch focado somente nos problemas observados após subir a storefront em desenvolvimento.

## Corrigido

### Headline / hero
- headline `Viva / Com / Gás.` reorganizada com composição mais intencional;
- espaçamento e escala refinados em desktop e mobile;
- camada de texto isolada dos elementos com blur/drop-shadow do hero;
- `overflow: clip` no hero para reduzir artefatos de pintura durante scroll;
- elementos decorativos não capturam mais eventos do ponteiro.

### Ícones
- classes antigas/inexistentes no Thin Rounded foram substituídas por nomes válidos da família;
- busca: `fi-tr-search-alt`;
- conta: `fi-tr-circle-user`;
- carrinho: `fi-tr-shopping-basket`;
- CTA de compra também usa `fi-tr-shopping-basket`;
- cor dos UIcons agora herda explicitamente `currentColor`;
- menu e fechamento usam glyphs CSS simples para não depender de nomes inexistentes do pacote.

### Header
- header passou a usar uma superfície clara, arredondada e estável;
- não alterna mais entre um estado visual praticamente invisível e outro sólido;
- scroll listener agora é atualizado via `requestAnimationFrame`;
- mantém dimensões estáveis durante o scroll para evitar flicker/repaint.

### Loader
- nova chave de sessão `v024`, portanto testes anteriores não bloqueiam a intro nova;
- ausência/erro do vídeo NÃO marca a animação como reproduzida;
- `?intro=1` força a intro a tocar novamente durante desenvolvimento;
- fallback estático continua funcionando se WebM/MP4 não carregar;
- saída continua sólida para cima, sem fade adicionado pelo site.

## Teste rápido

1. Copie os arquivos deste patch sobre o projeto atual.
2. Confirme que o vídeo existe em um destes caminhos:
   - `apps/storefront/public/media/lavic-loader.webm`
   - `apps/storefront/public/media/lavic-loader.mp4`
3. Rode:

```powershell
npm run typecheck
npm run dev
```

4. Teste a intro em:

`http://localhost:3000/?intro=1`

5. Depois teste scroll para baixo e para cima várias vezes no hero/header.

## Observação

Este patch não altera API, admin, catálogo, carrinho ou demais seções da home além do botão de fechar visual do drawer.
