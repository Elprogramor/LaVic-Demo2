# LaVic Admin v0.1 — entrega

Este ZIP contém somente os arquivos alterados/adicionados para a fundação do Admin. Extraia seu conteúdo na raiz do projeto LaVic atual, preservando a estrutura de pastas.

## Incluído

- app shell responsivo;
- sidebar e topbar;
- busca global com Ctrl/Cmd + K;
- Dashboard;
- Pedidos (kanban + lista);
- Detalhe do pedido;
- Produtos;
- design system base em CSS;
- dados demonstrativos tipados;
- esqueleto de permissões;
- referência visual máxima congelada em `docs/reference/lavic-admin-max-reference.png`;
- validação estática e script Windows para typecheck/build.

## Depois de extrair

```powershell
npm install
.\VALIDAR_ADMIN_V0_1.cmd
npm run dev:admin
```

Admin local: `http://localhost:3001`

## Observação

Os dados são mocks de demonstração. O arquivo `apps/admin/lib/permissions.ts` não substitui autorização real: RBAC será aplicado no backend quando a API for conectada.
