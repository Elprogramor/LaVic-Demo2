"use client";

import { useMemo, useState } from "react";
import type { AdminPreorder, PreorderStatus } from "../lib/types";
import { formatCurrency, formatShortDate } from "../lib/format";
import { Icon } from "./icon";
import { CoreCommerceStatus } from "./core-commerce-status";

const statusOptions: Array<{ value: "all" | PreorderStatus; label: string }> = [
  { value: "all", label: "Todas" },
  { value: "awaiting_confirmation", label: "A confirmar" },
  { value: "confirmed", label: "Confirmadas" },
  { value: "scheduled", label: "Programadas" },
  { value: "preparing", label: "Preparação" },
  { value: "ready", label: "Prontas" },
];

export function PreordersView({ items }: { items: AdminPreorder[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | PreorderStatus>("all");
  const [mode, setMode] = useState("all");
  const filtered = useMemo(() => items.filter((item) => {
    const q = query.trim().toLowerCase();
    return (!q || `${item.code} ${item.customerName}`.toLowerCase().includes(q)) && (status === "all" || item.status === status) && (mode === "all" || item.deliveryMode === mode);
  }), [items, mode, query, status]);

  const upcoming = useMemo(() => [...items].filter((item) => !["completed", "cancelled"].includes(item.status)).sort((a, b) => new Date(a.scheduledFor).getTime() - new Date(b.scheduledFor).getTime()).slice(0, 4), [items]);

  return <>
    <div className="preorder-schedule-strip" aria-label="Próximas encomendas">
      {upcoming.map((item, index) => <article key={item.id}>
        <span className="schedule-index">0{index + 1}</span>
        <div><strong>{formatShortDate(item.scheduledFor)}</strong><small>{item.code} · {item.customerName}</small></div>
        <CoreCommerceStatus status={item.status}/>
      </article>)}
    </div>

    <div className="segment-tabs" role="tablist" aria-label="Status da encomenda">
      {statusOptions.map((option) => <button key={option.value} className={status === option.value ? "active" : ""} onClick={() => setStatus(option.value)}>{option.label}<span>{items.filter((item) => option.value === "all" || item.status === option.value).length}</span></button>)}
    </div>

    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar encomenda</span><input maxLength={80} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar código ou cliente..."/></label>
      <label className="select-field"><span className="sr-only">Forma de entrega</span><select value={mode} onChange={(event) => setMode(event.target.value)}><option value="all">Entrega / retirada</option><option value="delivery">Entrega</option><option value="pickup">Retirada</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || status !== "all" || mode !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); setMode("all"); }}>Limpar</button> : null}
    </div>

    <div className="table-shell">
      <table className="data-table preorders-table">
        <thead><tr><th>Encomenda</th><th>Cliente</th><th>Data programada</th><th>Itens</th><th>Entrega</th><th>Pagamento</th><th>Total</th><th>Status</th><th>Responsável</th><th><span className="sr-only">Ações</span></th></tr></thead>
        <tbody>{filtered.map((item) => <tr key={item.id}>
          <td><strong className="table-primary">{item.code}</strong><span className="table-subline">{item.channel === "whatsapp" ? "WhatsApp" : item.channel === "storefront" ? "Loja online" : "Manual"}</span></td>
          <td>{item.customerName}</td><td>{formatShortDate(item.scheduledFor)}</td><td>{item.itemCount}</td><td>{item.deliveryMode === "pickup" ? "Retirada" : "Entrega"}</td>
          <td><CoreCommerceStatus status={item.paymentStatus}/><span className="table-subline">{item.depositCents ? `${formatCurrency(item.depositCents)} recebido` : item.paymentMethod}</span></td>
          <td><strong>{formatCurrency(item.totalCents)}</strong></td><td><CoreCommerceStatus status={item.status}/></td><td>{item.assignedTo}</td><td><button className="row-action" aria-label={`Ações de ${item.code}`} disabled title="Ações persistentes serão conectadas na fase de backend"><Icon name="more" size={16}/></button></td>
        </tr>)}</tbody>
      </table>
      {!filtered.length ? <div className="table-empty">Nenhuma encomenda corresponde aos filtros.</div> : null}
    </div>
    <div className="table-footer"><span>Mostrando {filtered.length} de {items.length} encomendas</span><span>Dados demonstrativos · persistência entra com a API.</span></div>
  </>;
}
