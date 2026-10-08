# Segurança — princípios obrigatórios

## Autorização
A UI nunca é fonte de autorização. Toda operação sensível será autorizada na API.

## Sessão administrativa
Quando ativada: cookie HttpOnly + Secure, rotação de sessão, MFA para perfis críticos, rate limiting e invalidação de sessões.

## Isolamento
Recursos administrativos/comerciais devem ser vinculados a `organizationId`. A organização válida deriva da sessão autenticada, não de um ID fornecido pelo navegador.

## Preços
Preço, desconto, taxa e total são recalculados no servidor. Valores enviados pelo cliente são apenas intenção, nunca verdade financeira.

## Permissões
Permissões granulares (`orders.read`, `catalog.write`, `customers.export` etc.) em vez de checks espalhados de `role === admin`.

## Auditoria
Ações críticas registram ator, recurso, ação, timestamp e, quando apropriado, estado anterior/posterior.

## Demo v0.1
Não há dados privados nem autenticação real. O admin é deliberadamente um placeholder sem informações operacionais até a camada de segurança existir.
