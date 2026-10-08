# Validation Results v2.0

## Checagens executadas nesta entrega
- todos os arquivos TS/TSX alterados passaram no parser do TypeScript
- CSS possui quantidade balanceada de `{` e `}`
- rotas públicas esperadas estão presentes
- componentes compartilhados esperados estão presentes
- pacote não contém `apps/admin`
- nenhuma dependência nova foi adicionada

## Validação no ambiente do projeto
O script `VALIDAR_STOREFRONT_V2_0.cmd` executa a auditoria estática e depois:

```bash
npm run typecheck -w @lavic/storefront
npm run build -w @lavic/storefront
```

Essas duas últimas etapas devem ser confirmadas no ambiente local completo do projeto.
