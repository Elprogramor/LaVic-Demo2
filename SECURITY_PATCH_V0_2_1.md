# LaVic v0.2.1 — Security patch

Este patch atualiza somente a fundação da API NestJS para remover a árvore vulnerável reportada pelo `npm audit` em `multer <= 2.2.0`.

## Alterações

- `@nestjs/common`: `12.0.3`
- `@nestjs/core`: `12.0.3`
- `@nestjs/platform-express`: `12.0.3`
- `@nestjs/cli`: `12.0.1`
- TypeScript: `^6.0.2`
- API convertida para a configuração ESM/NodeNext usada pelo starter atual do Nest 12.
- imports relativos da API atualizados para extensão `.js`.
- healthcheck atualizado para `0.2.1`.

## Aplicação

Copie as pastas/arquivos deste patch sobre o projeto atual e execute na raiz:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
npm audit
npm run typecheck
npm run build
```

Não use `npm audit fix --force` como primeira medida: ele faz a migração de major automaticamente sem revisar o código.
