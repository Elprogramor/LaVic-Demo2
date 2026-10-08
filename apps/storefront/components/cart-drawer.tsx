"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

function CloseIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>;
}

export function CartDrawer() {
  const { isOpen, setOpen, lines, totalCents, updateQuantity, remove } = useCart();

  return (
    <div className={`drawer-root lavic-drawer-root ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
      <button className="drawer-backdrop" aria-label="Fechar carrinho" onClick={() => setOpen(false)} />
      <aside className="drawer lavic-drawer" aria-label="Carrinho">
        <div className="lavic-drawer__header">
          <div><p>Seu carrinho</p><h2>LaVic</h2></div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar"><CloseIcon /></button>
        </div>

        <div className="lavic-drawer__body">
          {lines.length === 0 ? (
            <div className="lavic-drawer__empty"><p>Seu carrinho está vazio.</p><Link href="/sabores" onClick={() => setOpen(false)}>Conhecer sabores →</Link></div>
          ) : lines.map(({ product, quantity }, index) => (
            <article className="lavic-drawer-line" key={product.id}>
              <span>0{index + 1}</span>
              <div className="lavic-drawer-line__product"><strong>LaVic {product.name}</strong><small>{product.volumeMl} ml</small></div>
              <div className="lavic-quantity"><button type="button" onClick={() => updateQuantity(product.id, quantity - 1)}>−</button><span>{quantity}</span><button type="button" onClick={() => updateQuantity(product.id, quantity + 1)}>+</button></div>
              <div className="lavic-drawer-line__price"><strong>{formatCurrency(product.priceCents * quantity)}</strong><button type="button" onClick={() => remove(product.id)}>remover</button></div>
            </article>
          ))}
        </div>

        <div className="lavic-drawer__footer">
          <div><span>Total demonstrativo</span><strong>{formatCurrency(totalCents)}</strong></div>
          <Link onClick={() => setOpen(false)} href="/carrinho" className="lavic-pill-button lavic-pill-button--dark">Ver carrinho</Link>
        </div>
      </aside>
    </div>
  );
}
