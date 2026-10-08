# LaVic Storefront v1.0 — Figma Exact Home

## Base
Implementação construída sobre a v0.9, usando o frame Figma `1:2` (1440 x 5230) como régua visual principal.

## Aplicado
- Header com logo, navegação pill e ações nas posições do Figma.
- Hero com `KOMBUCHA` em outline, garrafa central, gradient fade, copy lateral, CTA e produto auxiliar.
- Depoimento e navegação circular.
- `Sabores Engarrafados` com quatro cards no grid e ritmo do Figma.
- Painel verde `A kombucha que acompanha o seu ritmo.`.
- Seção institucional em duas colunas com métricas reais/seguras do storefront atual.
- Composição tipográfica `kombu cha / lavic` e showcase `Espumante LaVic.`.
- Faixa de confiança.
- Banner B2B `LaVic no seu negócio.`.
- `Subscribe Us`, colunas de links, FAQ, legal e social.
- Breakpoint mobile próprio, sem comprimir o canvas desktop.
- Motion System existente preservado.

## Copy antiga em inglês
As descrições de template que ainda estavam em inglês foram substituídas por copy LaVic em português, mantendo comprimentos e hierarquia semelhantes para preservar a composição.

## Assets
A implementação não deixa URLs temporárias do Figma no código. Foram reutilizados assets LaVic já existentes no repositório para os slots visuais correspondentes. O hero 1L e o Espumante usam os assets locais que já correspondem aos produtos vistos no frame.

## Validação
Execute na raiz:

`VALIDAR_STOREFRONT_V1_0.cmd`

O script roda validação estrutural/segurança, TypeScript e build de produção.
