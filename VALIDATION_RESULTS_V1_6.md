# Validation Results — LaVic Storefront v1.6

## PASS
- arquivos do patch presentes e não vazios;
- `page.tsx` aponta para `HomeFigmaV16`;
- asset `three-lime-bottles.png` incluído e utilizado;
- hero mini e rail de sabores usam o asset de referência;
- composição horizontal do painel verde presente;
- dois mini-cards do painel verde convertidos para composição de produto;
- escala visual do hero aplicada;
- outline do hero refinado;
- nenhuma URL temporária do Figma no código;
- nenhum `dangerouslySetInnerHTML`;
- sintaxe TS/TSX validada via TypeScript `transpileModule`;
- chaves CSS balanceadas;
- sintaxe do validador Node aprovada.

## A validar no ambiente local
O patch é incremental e não contém `node_modules` nem o monorepo completo. Por isso, a validação final deve ser executada na raiz do projeto com:

```bat
VALIDAR_STOREFRONT_V1_6.cmd
```

Esse comando executa, após a auditoria estática:

```bash
npm run typecheck -w @lavic/storefront
npm run build -w @lavic/storefront
```
