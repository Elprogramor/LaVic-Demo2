# LaVic storefront v0.3.0

Atualização visual e técnica focada em consistência, acabamento editorial, responsividade, acessibilidade e redução de falhas.

## Principais mudanças
- header transparente no topo e glass durante o scroll, sem card arredondado;
- hero refeito com hierarquia tipográfica mais forte e composição editorial;
- formatos transformados em catálogo visual sem três cards genéricos equivalentes;
- kits, encomendas e revenda reorganizados em composição assimétrica;
- campanhas de sabores simplificadas e diferenciadas por linguagem visual;
- seção de processo refeita sem claims de saúde não validados;
- bloco B2B e CTA final redesenhados;
- footer reestruturado;
- mobile revisto entre 360 e 820 px;
- navegação com estado ativo, skip link e foco visível;
- carrinho com limite de quantidade, focus trap básico e retorno de foco;
- formulário demonstrativo com limites de entrada e sem transmissão de dados;
- headers de segurança ampliados e `poweredByHeader` removido;
- auditoria estática nova em `tooling/validate-v0.3.mjs`.

## Loader
Os vídeos existentes em `apps/storefront/public/media/` não são substituídos por este patch. Mantenha:
- `lavic-loader.webm`
- `lavic-loader.mp4`

## Validação
Execute na raiz:

```powershell
npm run validate:v0.3
npm run typecheck -w @lavic/storefront
npm run build -w @lavic/storefront
npm audit
```

Ou use `VALIDAR_V0_3.cmd`.
