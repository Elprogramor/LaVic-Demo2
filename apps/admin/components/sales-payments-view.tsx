"use client";

import { useMemo, useState } from "react";
import type { FinanceMethod, SalesPayment, SalesPaymentStatus } from "../lib/types";
import { formatCurrency, formatShortDate } from "../lib/format";
import { Icon } from "./icon";
import { CoreCommerceStatus } from "./core-commerce-status";

const methodLabels: Record<FinanceMethod, string> = { pix: "PIX", credit_card: "Cartão", cash: "Dinheiro", manual: "Manual" };

export function SalesPaymentsView({ items }: { items: SalesPayment[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | SalesPaymentStatus>("all");
  const [method, setMethod] = useState<"all" | FinanceMethod>("all");
  const filtered = useMemo(() => items.filter((item) => {
    const q = query.trim().toLowerCase();
    return (!q || `${item.code} ${item.orderCode} ${item.customerName}`.toLowerCase().includes(q)) && (status === "all" || item.status === status) && (method === "all" || item.method === method);
  }), [items, method, query, status]);

  return <>
    <div className="payment-method-strip">
      {(["pix", "credit_card", "manual"] as FinanceMethod[]).map((kind) => {
        const list = items.filter((item) => item.method === kind);
        const approved = list.filter((item) => item.status === "approved").reduce((sum, item) => sum + item.amountCents, 0);
        return <article key={kind}><span className="payment-method-icon"><Icon name={kind === "credit_card" ? "card" : kind === "pix" ? "swap" : "clipboard"} size={16}/></span><div><strong>{methodLabels[kind]}</strong><small>{list.length} registros</small></div><b>{formatCurrency(approved)}</b></article>;
      })}
    </div>

    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar pagamento</span><input maxLength={80} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar transação, pedido ou cliente..."/></label>
      <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value as "all" | SalesPaymentStatus)}><option value="all">Status</option><option value="approved">Aprovado</option><option value="pending">Pendente</option><option value="failed">Falhou</option><option value="expired">Expirado</option><option value="refunded">Reembolsado</option></select><Icon name="chevronDown" size={14}/></label>
      <label className="select-field"><span className="sr-only">Método</span><select value={method} onChange={(event) => setMethod(event.target.value as "all" | FinanceMethod)}><option value="all">Método</option><option value="pix">PIX</option><option value="credit_card">Cartão</option><option value="manual">Manual</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || status !== "all" || method !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); setMethod("all"); }}>Limpar</button> : null}
    </div>

    <div className="table-shell">
      <table className="data-table sales-payments-table">
        <thead><tr><th>Transação</th><th>Pedido</th><th>Cliente</th><th>Método</th><th>Valor</th><th>Tentativas</th><th>Status</th><th>Atualizado</th><th>Origem</th><th><span className="sr-only">Ações</span></th></tr></thead>
        <tbody>{filtered.map((item) => <tr key={item.id}><td><strong className="table-primary">{item.code}</strong><span className="table-subline">{item.providerLabel}</span></td><td>{item.orderCode}</td><td>{item.customerName}</td><td>{methodLabels[item.method]}</td><td><strong>{formatCurrency(item.amountCents)}</strong></td><td>{item.attempts}</td><td><CoreCommerceStatus status={item.status}/></td><td>{formatShortDate(item.updatedAt)}</td><td>{item.channel === "storefront" ? "Loja" : item.channel === "whatsapp" ? "WhatsApp" : item.channel === "b2b" ? "B2B" : "Manual"}</td><td><button className="row-action" aria-label={`Ações de ${item.code}`} disabled title="Ações persistentes serão conectadas na fase de backend"><Icon name="more" size={16}/></button></td></tr>)}</tbody>
      </table>
      {!filtered.length ? <div className="table-empty">Nenhum pagamento corresponde aos filtros.</div> : null}
    </div>
    <div className="table-footer"><span>Mostrando {filtered.length} de {items.length} pagamentos</span><span>Operacional: estado do pedido. Financeiro: liquidação e conciliação.</span></div>
  </>;
}
