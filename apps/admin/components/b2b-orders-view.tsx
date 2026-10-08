"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { B2BOrder, B2BOrderStatus } from "../lib/types";
import { b2bOrderStatusLabels } from "../lib/b2b";
import { formatCurrency, formatDateTime } from "../lib/format";
import { B2BBadge } from "./b2b-badge";
import { Icon } from "./icon";

export function B2BOrdersView({ orders }: { orders: B2BOrder[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | B2BOrderStatus>("all");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return orders.filter((order) => (!normalized || `${order.code} ${order.company} ${order.deliveryCity}`.toLowerCase().includes(normalized)) && (status === "all" || order.status === status));
  }, [orders, query, status]);
  return (
    <>
      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar pedido B2B</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar pedido, parceiro ou cidade..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value as "all" | B2BOrderStatus)}><option value="all">Todos os status</option>{Object.entries(b2bOrderStatusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        {(query || status !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); }}>Limpar</button> : null}
      </div>
      <div className="table-shell b2b-table-shell">
        <table className="data-table b2b-orders-table">
          <thead><tr><th>Pedido</th><th>Parceiro</th><th>Data</th><th>Itens</th><th>Condição</th><th>Destino</th><th>Total</th><th>Status</th><th><span className="sr-only">Abrir parceiro</span></th></tr></thead>
          <tbody>{filtered.map((order) => <tr key={order.id}>
            <td><strong>{order.code}</strong></td><td><strong>{order.company}</strong></td><td>{formatDateTime(order.createdAt)}</td><td>{order.itemCount} un.</td><td>{order.paymentTerms}</td><td>{order.deliveryCity}</td><td><strong>{formatCurrency(order.totalCents)}</strong></td><td><B2BBadge kind="order" value={order.status}/></td><td><Link className="row-action" href={`/b2b/customers/${order.clientId}`} aria-label={`Abrir parceiro de ${order.code}`}><Icon name="chevronRight" size={16}/></Link></td>
          </tr>)}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhum pedido B2B corresponde aos filtros selecionados.</div> : null}
      </div>
      <div className="table-footer"><span>{filtered.length} pedidos nesta base demonstrativa</span><span>Preço e condição preservados por pedido</span></div>
    </>
  );
}
