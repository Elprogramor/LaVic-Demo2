# LaVic Admin v0.7 — Governança e Segurança

Esta etapa fecha a fundação administrativa antes da integração real com autenticação, API, banco e storage.

## Módulos

- `/team` — usuários e visão de acesso
- `/team/roles` — perfis e matriz RBAC
- `/team/sessions` — sessões administrativas
- `/team/audit` — log de auditoria
- `/settings/security` — política-base de segurança

## Regras fixas

1. A interface adapta a experiência, mas a API é a autoridade de autorização.
2. Sessões reais devem usar mecanismos server-side; tokens privados não ficam em `localStorage`.
3. Revogação, convite, mudança de perfil, MFA e política de segurança não são simulados como persistidos nesta versão.
4. Auditoria futura deve ser append-only, com controle de retenção e acesso.
5. Segredos, service roles e credenciais privadas nunca entram em `NEXT_PUBLIC`, mocks ou bundle do frontend.
6. Ações críticas devem registrar ator, recurso, data, origem e alterações relevantes.

## Perfis-base

- Administrador
- Gerente
- Operação
- Comercial
- Marketing
- Financeiro

As permissões são granulares e os perfis são apenas conjuntos iniciais. A autorização final será feita no backend.

## Próxima fase

Com v0.1–v0.7 consolidadas, a próxima grande etapa é transformar o Admin demonstrativo em operação real: autenticação, persistência, API, storage, RBAC efetivo e auditoria de servidor.
