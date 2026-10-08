# LaVic Admin v0.5.1 — Hotfix de validação

## Motivo
O `tsc --noEmit` estava lendo artefatos temporários em `apps/admin/.next/dev/types` gerados por uma sessão de `next dev`. Os arquivos reportados (`routes.d.ts` e `validator.ts`) são gerados pelo Next.js e não fazem parte do código-fonte do Admin.

Quando uma sessão de desenvolvimento é interrompida durante a escrita desses arquivos, ou a árvore `.next` fica incompatível com o estado atual das rotas, o typecheck pode falhar com erros sintáticos dentro de `.next/dev/types` antes de analisar o código do projeto.

## Correção
- adiciona `npm run clean:admin:cache`;
- remove `apps/admin/.next` e `apps/admin/tsconfig.tsbuildinfo` antes do typecheck;
- mantém a validação estática v0.5;
- executa typecheck em ambiente limpo;
- somente depois executa `next build`.

## Uso
Pare qualquer servidor `npm run dev:admin` que esteja aberto e execute:

```cmd
.\VALIDAR_ADMIN_V0_5.cmd
```

A limpeza afeta somente arquivos gerados. Nenhum código-fonte, mock, configuração funcional ou dado do projeto é apagado.
