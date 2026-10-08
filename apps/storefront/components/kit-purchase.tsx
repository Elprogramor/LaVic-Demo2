"use client";

import type { StoreKit } from "@/data/mocks/kits";
import { products } from "@/data/mocks/products";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

export function KitPurchase({ kit }: { kit: StoreKit }) {
  const { addMany } = useCart();
  const components = kit.items.flatMap((item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const complete = components.length === kit.items.length && kit.availability > 0;

  return (
    <div className="kit-card__commerce">
      <div className="kit-card__contents">
        {components.map(({ product, quantity }) => (
          <span key={product.id}>{quantity}× {product.name} {product.volumeMl >= 1000 ? `${product.volumeMl / 1000}L` : `${product.volumeMl}ml`}</span>
        ))}
      </div>
      <div className="kit-card__commerce-footer">
        <div><small>kit completo</small><strong>{formatCurrency(kit.priceCents)}</strong></div>
        <button type="button" className="button button--primary" disabled={!complete} onClick={() => addMany(components)}>
          {complete ? "Adicionar kit" : "Indisponível"}
        </button>
      </div>
      <p className="kit-card__stock">Disponibilidade demonstrativa: {kit.availability} kits, calculada pelos componentes.</p>
    </div>
  );
}
