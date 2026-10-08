# Entrega — LaVic Admin v0.4

Patch incremental para ser aplicado sobre a v0.3 aprovada.

## Incluído

- pipeline Revenda / B2B
- leads e filtros
- detalhe da oportunidade e histórico comercial
- criação demonstrativa de lead
- clientes B2B e perfil comercial
- pedidos B2B
- tabelas comerciais
- busca global B2B
- integração com Dashboard
- permissões B2B mais granulares
- validação estática específica da etapa

## Aplicação

Extraia este ZIP na raiz do projeto, substituindo os arquivos indicados. Depois execute:

```powershell
.\VALIDAR_ADMIN_V0_4.cmd
npm run dev:admin
```

Ponto inicial: `http://localhost:3001/b2b`.
