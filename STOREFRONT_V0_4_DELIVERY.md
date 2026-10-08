# LaVic Storefront v0.4 — Commerce Foundation

Aplicar este patch sobre o projeto atual que já contém Storefront v0.3.4 e LaVic Admin v0.7.1.

## Foco
A v0.4 fecha a experiência de compra antes do backend. O hero v0.3.4 foi preservado propositalmente para não misturar a discussão de direção de arte com a fundação comercial.

## Principais entradas
- `/`
- `/sabores`
- `/produto/limao-1l`
- `/produto/morango-1l`
- `/kits`
- `/carrinho`
- `/checkout`
- `/pedido/confirmado`
- `/encomendas`
- `/revenda`
- `/conta`
- `/conta/pedidos`
- `/conta/enderecos`

## Validação local
```powershell
.\VALIDAR_STOREFRONT_V0_4.cmd
npm run dev:storefront
```

## Observações
- checkout demonstrativo: não envia pedido e não coleta cartão;
- carrinho local guarda somente IDs de produtos e quantidades;
- Espumante segue sem preço inventado e sob consulta;
- dados da conta são explicitamente demonstrativos;
- preço, estoque, entrega, cupom e pagamento deverão ser recalculados/validados pela API na próxima fase.
