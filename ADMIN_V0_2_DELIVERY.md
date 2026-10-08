# Entrega — LaVic Admin v0.2

Aplicar este pacote sobre a base que já contém a LaVic Admin v0.1.

## O que mudou

- módulo Estoque completo em cinco rotas;
- navegação lateral e busca global conectadas aos lotes;
- dashboard passa a direcionar alertas de estoque para as novas telas;
- mocks tipados de lotes, movimentações, alertas e inventário;
- permissões de estoque expandidas;
- estilos e responsividade seguindo a referência máxima da v0.1;
- validador técnico `VALIDAR_ADMIN_V0_2.cmd`.

## Validação local

```powershell
npm install
.\VALIDAR_ADMIN_V0_2.cmd
npm run dev:admin
```

Depois acesse `http://localhost:3001/inventory`.
