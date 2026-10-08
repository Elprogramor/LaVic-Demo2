# LaVic v0.2.2 — API tooling fix

Este patch corrige os dois erros restantes observados após a migração controlada para Nest 12 / TypeScript 6.

## 1. TS5101 em `baseUrl`

`baseUrl` foi removido do `apps/api/tsconfig.json`, pois a API não usa `paths` locais nem depende desse comportamento. Também foi explicitado `rootDir: "./src"`.

## 2. `ERR_MODULE_NOT_FOUND: @sindresorhus/is`

O Nest CLI usa `node-emoji`, e `node-emoji@2.2.0` depende de `@sindresorhus/is`. A dependência foi adicionada explicitamente como `devDependency` da API para tornar a árvore de tooling determinística no workspace/NPM usado neste projeto.

## Aplicação

Copie `apps/api/package.json` e `apps/api/tsconfig.json` sobre os arquivos atuais.

Depois, na raiz do monorepo:

```powershell
npm install
npm audit
npm run typecheck
npm run build
```

Se o `ERR_MODULE_NOT_FOUND` persistir por causa de uma instalação antiga/corrompida:

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Get-ChildItem -Path apps -Directory | ForEach-Object {
  Remove-Item -Recurse -Force (Join-Path $_.FullName 'node_modules') -ErrorAction SilentlyContinue
}
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm cache verify
npm install
npm audit
npm run typecheck
npm run build
```

Não é necessário usar `npm audit fix --force`.
