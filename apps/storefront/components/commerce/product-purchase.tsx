"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import { useCart } from "@/components/commerce/cart-provider";

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();

  return (
    <div className="product-buy-row">
      <div className="quantity-control" aria-label="Quantidade">
        <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Diminuir quantidade">−</button>
        <span aria-live="polite">{quantity}</span>
        <button type="button" onClick={() => setQuantity((value) => Math.min(99, value + 1))} aria-label="Aumentar quantidade">+</button>
      </div>
      <button type="button" className="button-dark" onClick={() => add(product, quantity)} disabled={!product.available}>Adicionar ao carrinho</button>
    </div>
  );
}
