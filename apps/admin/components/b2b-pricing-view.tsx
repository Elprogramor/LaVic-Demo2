"use client";

import { useMemo, useState } from "react";
import type { B2BPriceTable } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { Icon } from "./icon";

export function B2BPricingView({ tables }: { tables: B2BPriceTable[] }) {
  const [selectedId, setSelectedId] = useState(tables[0]?.id ?? "");
  const selected = useMemo(() => tables.find((table) => table.id === selectedId) ?? tables[0], [tables, selectedId]);
  if (!selected) return <div className="table-empty">Nenhuma tabela comercial cadastrada.</div>;
  return (
    <div className="b2b-pricing-layout">
      <section className="b2b-price-cards" aria-label="Tabelas comerciais">
        {tables.map((table) => <button type="button" className={`b2b-price-card ${selected.id === table.id ? "active" : ""}`} onClick={() => setSelectedId(table.id)} key={table.id}>
          <div className="b2b-price-card-head"><span className="b2b-price-icon"><Icon name="tag" size={15}/></span><span className={`b2b-price-status ${table.status}`}>{table.status === "active" ? "Ativa" : "Inativa"}</span></div>
          <strong>{table.name}</strong><p>{table.description}</p><dl><div><dt>Pedido mínimo</dt><dd>{formatCurrency(table.minimumOrderCents)}</dd></div><div><dt>Clientes</dt><dd>{table.clientCount}</dd></div></dl>
        </button>)}
      </section>
      <section className="panel b2b-price-detail">
        <header className="b2b-price-detail-head"><div><span>Tabela selecionada</span><h2>{selected.name}</h2><p>{selected.description}</p></div><button className="button button-secondary" type="button"><Icon name="edit" size={15}/><span>Editar tabela</span></button></header>
        <div className="b2b-commercial-summary"><div><span>Pedido mínimo</span><strong>{formatCurrency(selected.minimumOrderCents)}</strong></div><div><span>Condição</span><strong>{selected.paymentTerms}</strong></div><div><span>Parceiros vinculados</span><strong>{selected.clientCount}</strong></div></div>
        <div className="table-shell b2b-price-table-shell"><table className="data-table b2b-price-table"><thead><tr><th>Produto</th><th>SKU</th><th>Preço B2C ref.</th><th>Preço B2B</th><th>Diferença</th></tr></thead><tbody>{selected.entries.map((entry) => {
          const difference = entry.retailPriceCents - entry.b2bPriceCents;
          return <tr key={entry.productId}><td><strong>{entry.productName}</strong></td><td>{entry.sku}</td><td>{formatCurrency(entry.retailPriceCents)}</td><td><strong>{formatCurrency(entry.b2bPriceCents)}</strong></td><td><span className="b2b-price-delta">-{formatCurrency(difference)}</span></td></tr>;
        })}</tbody></table></div>
        <div className="b2b-price-policy"><Icon name="alert" size={15}/><p><strong>Regra arquitetural:</strong> a tabela define uma condição comercial autorizada. O preço efetivo ainda deve ser recalculado e validado pela API ao criar cada pedido B2B.</p></div>
      </section>
    </div>
  );
}
