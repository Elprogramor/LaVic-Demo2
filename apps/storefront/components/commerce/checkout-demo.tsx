"use client";

import { useState } from "react";
import { useCart } from "@/components/commerce/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CheckoutDemo() {
  const { lines, totalCents } = useCart();
  const [done, setDone] = useState(false);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setDone(true);
  }

  return (
    <section className="content-shell checkout-grid">
      <form className="checkout-card" onSubmit={submit}>
        <div className="demo-banner">Demonstração: nenhum pagamento será processado e nenhum dado será transmitido.</div>
        <h2>Dados para entrega</h2>
        <div className="form-grid">
          <div className="field field--wide"><label htmlFor="checkout-name">Nome completo</label><input id="checkout-name" autoComplete="name" required /></div>
          <div className="field"><label htmlFor="checkout-phone">WhatsApp</label><input id="checkout-phone" autoComplete="tel" required /></div>
          <div className="field"><label htmlFor="checkout-email">E-mail</label><input id="checkout-email" type="email" autoComplete="email" /></div>
          <div className="field field--wide"><label htmlFor="checkout-address">Endereço</label><input id="checkout-address" autoComplete="street-address" required /></div>
          <div className="field"><label htmlFor="checkout-number">Número</label><input id="checkout-number" /></div>
          <div className="field"><label htmlFor="checkout-city">Cidade</label><input id="checkout-city" defaultValue="Volta Redonda" /></div>
          <div className="field field--wide"><button type="submit" className="button-dark" disabled={!lines.length}>{done ? "Demonstração concluída" : "Simular finalização"}</button></div>
        </div>
      </form>
      <aside className="cart-summary">
        <h2>Seu pedido</h2>
        {lines.map((line) => <div className="summary-row" key={line.product.id}><span>{line.quantity}× {line.product.name}</span><span>{formatCurrency(line.product.priceCents * line.quantity)}</span></div>)}
        <div className="summary-row summary-total"><span>Total</span><strong>{formatCurrency(totalCents)}</strong></div>
      </aside>
    </section>
  );
}
