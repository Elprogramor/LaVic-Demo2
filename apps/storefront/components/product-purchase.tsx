"use client";

import type { Product } from "@lavic/domain";
import { useState } from "react";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

export function ProductPurchase({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { add } = useCart();

  return (
    <div className="lavic-product-purchase">
      <p className="lavic-kicker">Kombucha · {product.volumeMl} ml</p>
      <h1>LaVic {product.name}</h1>
      <p className="lavic-product-purchase__lead">{product.shortDescription}</p>
      <div className="lavic-product-purchase__price">{formatCurrency(product.priceCents)}</div>

      <div className="lavic-product-purchase__controls">
        <div className="lavic-quantity">
          <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} aria-label="Diminuir quantidade">−</button>
          <span>{quantity}</span>
          <button type="button" onClick={() => setQuantity((q) => q + 1)} aria-label="Aumentar quantidade">+</button>
        </div>
        <button type="button" className="lavic-pill-button lavic-pill-button--dark" onClick={() => add(product, quantity)}>Adicionar ao carrinho</button>
      </div>

      <p className="lavic-demo-note">Preço e disponibilidade ilustrativos nesta demonstração.</p>
      <div className="lavic-product-points">
        <span>Fermentação natural</span>
        <span>Manter refrigerado</span>
        <span>Embalagem reciclável</span>
      </div>
    </div>
  );
}
