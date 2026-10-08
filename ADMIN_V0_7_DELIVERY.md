# LaVic Admin v0.7 — Entrega

Patch incremental para aplicar sobre a v0.6 aprovada (com o hotfix v0.5.1 já preservado).

## Incluído

- Equipe e usuários
- Perfis e permissões RBAC
- Matriz de acesso
- Sessões administrativas
- Auditoria com filtros e drawer de detalhes
- Configurações de segurança
- Busca global integrada
- Novas permissões de governança
- Validador v0.7 com limpeza de `.next`, typecheck e build

## Aplicação

Extraia o ZIP na raiz do projeto atual e aceite a substituição dos arquivos do patch.

Depois execute:

```cmd
VALIDAR_ADMIN_V0_7.cmd
```

Com validação aprovada:

```cmd
npm run dev:admin
```

Entradas principais:

- `http://localhost:3001/team`
- `http://localhost:3001/team/roles`
- `http://localhost:3001/team/sessions`
- `http://localhost:3001/team/audit`
- `http://localhost:3001/settings/security`

Ações que exigem autenticação/persistência permanecem propositalmente bloqueadas nesta versão.
