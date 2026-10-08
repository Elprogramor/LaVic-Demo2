# LaVic Admin v0.1 — Foundation

## Status

Esta versão estabelece a fundação visual e estrutural do painel administrativo LaVic. Ela não conecta dados reais, autenticação real, pagamentos ou banco de dados. Os dados presentes em `apps/admin/data/mock-admin.ts` são demonstrativos e servem apenas para validar UI, navegação e contratos de apresentação.

## Referência visual máxima

A imagem `docs/reference/lavic-admin-max-reference.png` é a referência visual máxima do Admin. Novas telas devem preservar, no mínimo, a mesma percepção de solidez, hierarquia, densidade organizada e consistência.

Não é necessário copiar cada pixel. É obrigatório preservar:

- sidebar verde profunda e bem hierarquizada;
- verde e laranja LaVic como protagonistas;
- canvas off-white e superfícies claras;
- grande quantidade de informação sem poluição;
- cards discretos;
- tabelas densas e legíveis;
- ações previsíveis;
- status e filtros consistentes;
- tipografia hierárquica;
- sensação de software operacional maduro, não template genérico.

## Rotas implementadas

- `/` — dashboard operacional;
- `/orders` — pedidos com operação em kanban e visualização em lista;
- `/orders/[id]` — detalhe do pedido, resumo, timeline e ações;
- `/products` — catálogo com filtros, status e tabela.

## Componentes-base

- `AdminShell`;
- sidebar e topbar;
- busca global (`Ctrl/Cmd + K`);
- `PageHeader`;
- `StatCard`;
- `Panel`;
- `StatusBadge`;
- filtros e busca;
- tabela de dados;
- kanban;
- timeline;
- padrões de ação e navegação responsiva.

## Identidade

Cores de marca:

- verde LaVic: navegação, ações principais e estados positivos;
- laranja LaVic: acentos e destaque de marca;
- laranja não representa automaticamente warning;
- warning, erro, info e sucesso possuem semântica própria.

A família tipográfica é declarada como `All Round Gothic` com fallbacks seguros. Nenhum arquivo de fonte é distribuído neste pacote.

## UX fixa

Toda tela nova deve responder rapidamente:

1. onde estou;
2. o que está acontecendo;
3. qual é a próxima ação possível.

Complexidade deve ser organizada, não removida. A fundação usa progressive disclosure: ações raras ou destrutivas ficam fora do caminho principal, enquanto contexto, filtros e ações frequentes permanecem visíveis.

## Segurança

Esta fundação não trata o frontend como fronteira de segurança. Quando a API real entrar:

- autenticação e sessão serão validadas no servidor;
- RBAC será aplicado na API;
- preços, descontos, estoque e status serão recalculados/validados no servidor;
- ações sensíveis gerarão auditoria;
- segredos jamais entrarão em `NEXT_PUBLIC_*`, mocks, HTML ou bundle cliente.

`apps/admin/lib/permissions.ts` é apenas a interface inicial para futura integração de permissões. Não deve ser usada como autorização de backend.

## Próximas etapas recomendadas

1. validar visualmente Dashboard, Pedidos, Detalhe e Produtos em 1366, 1440, 1920, 1024, 768, 430, 390 e 360 px;
2. refinar tokens e proporções com base nessa validação;
3. implementar Estoque usando os mesmos componentes-base;
4. implementar Clientes/CRM;
5. implementar Revenda/B2B;
6. só então conectar os módulos ao backend/contratos reais.

## Validação

Na raiz do monorepo:

```powershell
npm install
.\VALIDAR_ADMIN_V0_1.cmd
```

Ou separadamente:

```powershell
npm run validate:admin:v0.1
npm run typecheck -w @lavic/admin
npm run build -w @lavic/admin
npm run dev:admin
```
