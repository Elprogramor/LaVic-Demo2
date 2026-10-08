"use client";

import { useMemo, useState } from "react";
import type { FinanceMethod, FinanceTransaction, FinanceTransactionStatus } from "../lib/types";
import { formatCurrency, formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { FinanceStatusBadge } from "./finance-status";

const methodLabels: Record<FinanceMethod, string> = { pix: "PIX", credit_card: "Cartão", cash: "Dinheiro", manual: "Manual" };

export function FinanceReceivablesView({ transactions }: { transactions: FinanceTransaction[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | FinanceTransactionStatus>("all");
  const [method, setMethod] = useState<"all" | FinanceMethod>("all");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return transactions.filter((item) => (!q || `${item.code} ${item.orderCode} ${item.customer}`.toLowerCase().includes(q)) && (status === "all" || item.status === status) && (method === "all" || item.method === method));
  }, [transactions, query, status, method]);
  const net = filtered.reduce((sum, item) => sum + item.netCents, 0);

  return <>
    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar recebimento</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar código, pedido ou cliente..." maxLength={80}/></label>
      <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value as "all" | FinanceTransactionStatus)}><option value="all">Todos os status</option><option value="approved">Aprovados</option><option value="pending">Pendentes</option><option value="refunded">Reembolsados</option><option value="cancelled">Cancelados</option></select><Icon name="chevronDown" size={14}/></label>
      <label className="select-field"><span className="sr-only">Forma de pagamento</span><select value={method} onChange={(event) => setMethod(event.target.value as "all" | FinanceMethod)}><option value="all">Todos os meios</option><option value="pix">PIX</option><option value="credit_card">Cartão</option><option value="cash">Dinheiro</option><option value="manual">Manual</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || status !== "all" || method !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); setMethod("all"); }}>Limpar</button> : null}
    </div>
    <div className="finance-filter-summary"><span>{filtered.length} lançamentos</span><strong>{formatCurrency(net)} líquidos na seleção</strong></div>
    <div className="table-shell"><table className="data-table finance-table"><thead><tr><th>Transação</th><th>Pedido</th><th>Cliente</th><th>Data</th><th>Meio</th><th>Bruto</th><th>Desconto</th><th>Frete</th><th>Líquido</th><th>Status</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td className="table-primary">{item.code}</td><td>{item.orderCode}</td><td>{item.customer}</td><td>{formatDateTime(item.createdAt)}</td><td>{methodLabels[item.method]}</td><td>{formatCurrency(item.grossCents)}</td><td>{formatCurrency(item.discountCents)}</td><td>{formatCurrency(item.shippingCents)}</td><td><strong>{formatCurrency(item.netCents)}</strong></td><td><FinanceStatusBadge status={item.status}/></td></tr>)}</tbody></table>{filtered.length === 0 ? <div className="table-empty">Nenhum recebimento corresponde aos filtros.</div> : null}</div>
  </>;
}
