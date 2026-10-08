# LaVic Platform v3 — Clean Rebuild

Reconstrução limpa da experiência pública LaVic, mantendo o painel administrativo existente preservado.

## Apps
- `apps/storefront`: storefront público reconstruído em Next.js 16.
- `apps/admin`: painel LaVic preservado a partir da linha Admin v0.1 → v0.7.1.

## Rodar
```bash
npm install
npm run dev:storefront
npm run dev:admin
```

## Validar
```bash
npm run validate
npm run typecheck
npm run build
```

O projeto permanece demonstrativo: checkout e formulários não processam pagamentos nem enviam dados para produção.
