"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/commerce/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartPageContent() {
  const { lines, totalCents, updateQuantity, remove } = useCart();

  if (!lines.length) {
    return (
      <section className="content-shell page-section" style={{ textAlign: "center", maxWidth: 720 }}>
        <h2 style={{ fontFamily: "var(--lavic-font-display)", fontSize: 46, margin: 0 }}>Seu carrinho está leve.</h2>
        <p style={{ color: "var(--lavic-muted)", lineHeight: 1.7 }}>Escolha alguns sabores para continuar a demonstração da jornada de compra.</p>
        <Link href="/sabores" className="button-dark">Explorar sabores</Link>
      </section>
    );
  }

  return (
    <section className="content-shell cart-page-grid">
      <div className="cart-page-list">
        {lines.map((line) => (
          <article className="cart-page-line" key={line.product.id}>
            <div className="cart-page-image"><Image src={line.product.image} alt="" fill sizes="120px" /></div>
            <div><strong>{line.product.name}</strong><p style={{ color: "var(--lavic-muted)", margin: "6px 0 14px" }}>{formatCurrency(line.product.priceCents)}</p><div className="quantity-control"><button type="button" onClick={() => updateQuantity(line.product.id, line.quantity - 1)}>−</button><span>{line.quantity}</span><button type="button" onClick={() => updateQuantity(line.product.id, line.quantity + 1)}>+</button></div></div>
            <button type="button" className="cart-line-remove" onClick={() => remove(line.product.id)}>Remover</button>
          </article>
        ))}
      </div>
      <aside className="cart-summary">
        <h2>Resumo</h2>
        <div className="summary-row"><span>Produtos</span><span>{formatCurrency(totalCents)}</span></div>
        <div className="summary-row"><span>Entrega</span><span>A definir</span></div>
        <div className="summary-row summary-total"><span>Total</span><strong>{formatCurrency(totalCents)}</strong></div>
        <Link href="/checkout" className="button-dark">Continuar</Link>
      </aside>
    </section>
  );
}
