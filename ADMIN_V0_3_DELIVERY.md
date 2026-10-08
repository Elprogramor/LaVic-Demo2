# Entrega — LaVic Admin v0.3

Patch incremental para ser aplicado sobre a v0.2 aprovada.

## Incluído

- Clientes
- Segmentos
- CRM
- Perfil 360º do cliente
- timeline de relacionamento
- notas internas demonstrativas
- consentimentos de contato
- endereços
- integração com busca global e pedidos
- permissões `customers.read` / `customers.write`
- validação estática específica da etapa

## Aplicação

Extraia este ZIP na raiz do projeto, substituindo os arquivos indicados no manifesto. Depois execute:

```powershell
.\VALIDAR_ADMIN_V0_3.cmd
npm run dev:admin
```

Ponto inicial: `http://localhost:3001/customers`.
