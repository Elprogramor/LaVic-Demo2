"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/commerce/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, setOpen, lines, totalCents, remove } = useCart();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, setOpen]);

  if (!isOpen) return null;

  return (
    <>
      <button type="button" className="cart-backdrop" aria-label="Fechar carrinho" onClick={() => setOpen(false)} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-drawer-head">
          <h2 id="cart-title">Seu carrinho</h2>
          <button type="button" className="icon-button" onClick={() => setOpen(false)} aria-label="Fechar carrinho">×</button>
        </div>
        {lines.length ? (
          <>
            <div className="cart-drawer-list">
              {lines.map((line) => (
                <div className="cart-line" key={line.product.id}>
                  <div className="cart-line-image"><Image src={line.product.image} alt="" fill sizes="72px" /></div>
                  <div>
                    <strong>{line.product.name}</strong>
                    <small>{line.quantity} × {formatCurrency(line.product.priceCents)}</small>
                  </div>
                  <button type="button" className="cart-line-remove" onClick={() => remove(line.product.id)}>Remover</button>
                </div>
              ))}
            </div>
            <div className="cart-drawer-total"><span>Subtotal</span><strong>{formatCurrency(totalCents)}</strong></div>
            <Link href="/checkout" className="button-dark" onClick={() => setOpen(false)}>Ir para checkout</Link>
          </>
        ) : <p className="cart-empty">Seu carrinho está vazio. Explore os sabores da LaVic para montar sua seleção.</p>}
      </aside>
    </>
  );
}
