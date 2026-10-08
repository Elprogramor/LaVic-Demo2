"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type FormEvent } from "react";
import { useCart } from "./cart-provider";
import { formatCurrency } from "@/lib/format";

type CheckoutStep = 1 | 2 | 3 | 4;
type Fulfillment = "delivery" | "pickup";
type Payment = "pix" | "card" | "pickup";

export function CheckoutFlow() {
  const router = useRouter();
  const { lines, totalCents, hydrated, clear } = useCart();
  const [step, setStep] = useState<CheckoutStep>(1);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("delivery");
  const [payment, setPayment] = useState<Payment>("pix");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const items = useMemo(() => lines.reduce((sum, line) => sum + line.quantity, 0), [lines]);
  const paymentOptions = fulfillment === "pickup"
    ? ([
        ["pix", "PIX", "Pagamento instantâneo quando a integração estiver ativa."],
        ["card", "Cartão", "Os dados serão tratados pelo ambiente seguro do provedor."],
        ["pickup", "Na retirada", "Disponível apenas quando a operação confirmar essa condição."]
      ] as const)
    : ([
        ["pix", "PIX", "Pagamento instantâneo quando a integração estiver ativa."],
        ["card", "Cartão", "Os dados serão tratados pelo ambiente seguro do provedor."]
      ] as const);

  function nextFromIdentity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || phone.trim().length < 8) return;
    setStep(2);
  }

  function nextFromFulfillment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (fulfillment === "delivery" && (!city.trim() || !address.trim())) return;
    setStep(3);
  }

  function concludeDemo() {
    clear();
    router.push("/pedido/confirmado?demo=1");
  }

  if (!hydrated) {
    return <div className="checkout-loading" aria-live="polite">Preparando seu carrinho…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="commerce-empty commerce-empty--checkout">
        <p className="eyebrow">Carrinho vazio</p>
        <h2>Escolha sua LaVic antes de continuar.</h2>
        <p>Seu checkout começa no catálogo.</p>
        <Link className="button button--primary" href="/sabores">Conhecer sabores</Link>
      </div>
    );
  }

  const stepLabels = ["Identificação", "Entrega", "Pagamento", "Revisão"] as const;

  return (
    <div className="checkout-shell">
      <div className="checkout-main">
        <ol className="checkout-steps" aria-label="Etapas do checkout">
          {stepLabels.map((label, index) => {
            const number = (index + 1) as CheckoutStep;
            return (
              <li key={label} className={number === step ? "is-current" : number < step ? "is-complete" : ""}>
                <span>{String(number).padStart(2, "0")}</span>{label}
              </li>
            );
          })}
        </ol>

        {step === 1 && (
          <form className="checkout-panel" onSubmit={nextFromIdentity}>
            <div className="checkout-panel__heading"><p className="eyebrow">Etapa 01</p><h2>Quem está comprando?</h2><p>Usamos apenas os dados necessários para simular o fluxo nesta versão.</p></div>
            <div className="checkout-form-grid">
              <label><span>Nome</span><input required autoComplete="name" maxLength={100} value={name} onChange={(e) => setName(e.target.value.slice(0, 100))} placeholder="Nome e sobrenome" /></label>
              <label><span>WhatsApp</span><input required type="tel" inputMode="tel" autoComplete="tel" minLength={8} maxLength={24} value={phone} onChange={(e) => setPhone(e.target.value.slice(0, 24))} placeholder="(00) 00000-0000" /></label>
            </div>
            <div className="checkout-panel__actions"><span /><button className="button button--primary" type="submit">Continuar</button></div>
          </form>
        )}

        {step === 2 && (
          <form className="checkout-panel" onSubmit={nextFromFulfillment}>
            <div className="checkout-panel__heading"><p className="eyebrow">Etapa 02</p><h2>Como você quer receber?</h2><p>A taxa e a área real de atendimento serão calculadas pela API na versão integrada.</p></div>
            <div className="choice-grid">
              <button type="button" className={fulfillment === "delivery" ? "choice-card is-active" : "choice-card"} onClick={() => { setFulfillment("delivery"); if (payment === "pickup") setPayment("pix"); }}><strong>Entrega</strong><span>Receber no endereço informado.</span></button>
              <button type="button" className={fulfillment === "pickup" ? "choice-card is-active" : "choice-card"} onClick={() => setFulfillment("pickup")}><strong>Retirada</strong><span>Disponibilidade e ponto serão confirmados.</span></button>
            </div>
            {fulfillment === "delivery" && <div className="checkout-form-grid checkout-form-grid--delivery">
              <label><span>Cidade</span><input required maxLength={100} autoComplete="address-level2" value={city} onChange={(e) => setCity(e.target.value.slice(0, 100))} placeholder="Cidade" /></label>
              <label className="checkout-field-wide"><span>Endereço</span><input required maxLength={180} autoComplete="street-address" value={address} onChange={(e) => setAddress(e.target.value.slice(0, 180))} placeholder="Rua, número e complemento" /></label>
              <label className="checkout-field-wide"><span>Observações</span><textarea rows={3} maxLength={300} value={notes} onChange={(e) => setNotes(e.target.value.slice(0, 300))} placeholder="Opcional" /></label>
            </div>}
            <div className="checkout-panel__actions"><button className="button button--ghost" type="button" onClick={() => setStep(1)}>Voltar</button><button className="button button--primary" type="submit">Continuar</button></div>
          </form>
        )}

        {step === 3 && (
          <div className="checkout-panel">
            <div className="checkout-panel__heading"><p className="eyebrow">Etapa 03</p><h2>Forma de pagamento.</h2><p>Nenhum dado de cartão é coletado nesta demonstração.</p></div>
            <div className="payment-options" role="radiogroup" aria-label="Forma de pagamento">
              {paymentOptions.map(([value, title, description]) => (
                <button key={value} type="button" role="radio" aria-checked={payment === value} className={payment === value ? "payment-option is-active" : "payment-option"} onClick={() => setPayment(value)}>
                  <span className="payment-option__radio" aria-hidden="true" /><span><strong>{title}</strong><small>{description}</small></span>
                </button>
              ))}
            </div>
            <div className="checkout-security-note"><strong>Compra protegida começa no servidor.</strong><span>Preço, estoque, cupom, entrega e permissões serão recalculados antes de qualquer cobrança real.</span></div>
            <div className="checkout-panel__actions"><button className="button button--ghost" type="button" onClick={() => setStep(2)}>Voltar</button><button className="button button--primary" type="button" onClick={() => setStep(4)}>Revisar pedido</button></div>
          </div>
        )}

        {step === 4 && (
          <div className="checkout-panel">
            <div className="checkout-panel__heading"><p className="eyebrow">Etapa 04</p><h2>Revise antes de concluir.</h2><p>Esta ação encerra apenas a demonstração. Nenhum pedido ou pagamento será enviado.</p></div>
            <div className="checkout-review-grid">
              <div><span>Cliente</span><strong>{name}</strong><small>{phone}</small></div>
              <div><span>Recebimento</span><strong>{fulfillment === "delivery" ? "Entrega" : "Retirada"}</strong><small>{fulfillment === "delivery" ? `${address}, ${city}` : "Ponto a confirmar"}</small></div>
              <div><span>Pagamento</span><strong>{payment === "pix" ? "PIX" : payment === "card" ? "Cartão" : "Na retirada"}</strong><small>Sem cobrança nesta versão</small></div>
              <div><span>Itens</span><strong>{items}</strong><small>{formatCurrency(totalCents)} em produtos</small></div>
            </div>
            <div className="checkout-panel__actions"><button className="button button--ghost" type="button" onClick={() => setStep(3)}>Voltar</button><button className="button button--primary" type="button" onClick={concludeDemo}>Concluir demonstração</button></div>
          </div>
        )}
      </div>

      <aside className="checkout-summary" aria-label="Resumo do pedido">
        <p className="eyebrow">Seu pedido</p>
        <div className="checkout-summary__lines">
          {lines.map((line) => <div key={line.product.id}><span>{line.quantity}× {line.product.name}</span><strong>{formatCurrency(line.product.priceCents * line.quantity)}</strong></div>)}
        </div>
        <div className="checkout-summary__row"><span>Subtotal</span><strong>{formatCurrency(totalCents)}</strong></div>
        <div className="checkout-summary__row is-muted"><span>Entrega</span><strong>A calcular</strong></div>
        <div className="checkout-summary__total"><span>Total atual</span><strong>{formatCurrency(totalCents)}</strong></div>
        <small>O total real será recalculado no servidor quando a integração estiver ativa.</small>
      </aside>
    </div>
  );
}
