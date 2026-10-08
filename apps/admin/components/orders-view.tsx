"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AdminOrder, OrderStatus } from "../lib/types";
import { formatCurrency, formatTime } from "../lib/format";
import { Icon } from "./icon";
import { StatusBadge } from "./status-badge";

type ViewMode = "kanban" | "list";

const columns: Array<{ status: OrderStatus; label: string; tone: string }> = [
  { status: "new", label: "Novo", tone: "blue" },
  { status: "confirmed", label: "Confirmado", tone: "green" },
  { status: "separating", label: "Separação", tone: "orange" },
  { status: "ready", label: "Pronto", tone: "sand" },
  { status: "shipped", label: "Enviado / Retirada", tone: "indigo" },
];

export function OrdersView({ orders }: { orders: AdminOrder[] }) {
  const [view, setView] = useState<ViewMode>("kanban");
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState("all");
  const [channel, setChannel] = useState("all");

  const filtered = useMemo(() => orders.filter((order) => {
    const matchesQuery = !query.trim() || `${order.code} ${order.customerName}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesPayment = payment === "all" || order.paymentStatus === payment;
    const matchesChannel = channel === "all" || order.channel === channel;
    return matchesQuery && matchesPayment && matchesChannel;
  }), [orders, query, payment, channel]);

  return (
    <>
      <div className="view-tabs" role="tablist" aria-label="Modo de visualização">
        <button role="tab" aria-selected={view === "kanban"} className={view === "kanban" ? "active" : ""} onClick={() => setView("kanban")}>Operação</button>
        <button role="tab" aria-selected={view === "list"} className={view === "list" ? "active" : ""} onClick={() => setView("list")}>Lista</button>
      </div>

      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar pedidos</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar pedido, cliente ou código..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Pagamento</span><select value={payment} onChange={(event) => setPayment(event.target.value)}><option value="all">Pagamento</option><option value="approved">Aprovado</option><option value="pending">Pendente</option><option value="refunded">Reembolsado</option></select><Icon name="chevronDown" size={14}/></label>
        <label className="select-field"><span className="sr-only">Canal</span><select value={channel} onChange={(event) => setChannel(event.target.value)}><option value="all">Canal</option><option value="storefront">Loja online</option><option value="whatsapp">WhatsApp</option><option value="b2b">B2B</option><option value="manual">Manual</option></select><Icon name="chevronDown" size={14}/></label>
        {(query || payment !== "all" || channel !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setPayment("all"); setChannel("all"); }}>Limpar</button> : null}
      </div>

      {view === "kanban" ? (
        <div className="kanban-board">
          {columns.map((column) => {
            const columnOrders = filtered.filter((order) => order.status === column.status);
            return (
              <section className={`kanban-column tone-${column.tone}`} key={column.status} aria-label={`${column.label}: ${columnOrders.length} pedidos`}>
                <header><div><span>{column.label}</span><strong>{columnOrders.length}</strong></div><Icon name="more" size={17}/></header>
                <div className="kanban-cards">
                  {columnOrders.length === 0 ? <div className="kanban-empty">Nenhum pedido</div> : columnOrders.map((order) => <OrderCard order={order} key={order.id}/>) }
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="table-shell">
          <table className="data-table order-list-table">
            <thead><tr><th>Pedido</th><th>Cliente</th><th>Status</th><th>Pagamento</th><th>Canal</th><th>Entrega</th><th>Total</th><th>Horário</th></tr></thead>
            <tbody>{filtered.map((order) => <tr key={order.id}><td><Link href={`/orders/${order.id}`} className="table-primary">#{order.code}</Link></td><td>{order.customerName}</td><td><StatusBadge status={order.status}/></td><td><StatusBadge status={order.paymentStatus}/></td><td>{channelLabel(order.channel)}</td><td>{order.deliveryMode === "pickup" ? "Retirada" : "Entrega"}</td><td>{formatCurrency(order.totalCents)}</td><td>{formatTime(order.createdAt)}</td></tr>)}</tbody>
          </table>
          {filtered.length === 0 ? <div className="table-empty">Nenhum pedido corresponde aos filtros.</div> : null}
        </div>
      )}
    </>
  );
}

function OrderCard({ order }: { order: AdminOrder }) {
  return (
    <Link className="order-card" href={`/orders/${order.id}`}>
      <div className="order-card-top"><strong>#{order.code}</strong><span>{formatTime(order.createdAt)}</span></div>
      <p>{order.customerName}</p>
      <small>{order.itemCount} {order.itemCount === 1 ? "item" : "itens"} · {formatCurrency(order.totalCents)}</small>
      <div className="order-card-meta"><span className={order.paymentStatus === "approved" ? "meta-ok" : "meta-warn"}><i/> {order.paymentMethod} · {order.paymentStatus === "approved" ? "aprovado" : "aguardando"}</span></div>
      <div className="order-card-meta"><span><Icon name={order.deliveryMode === "pickup" ? "store" : "truck"} size={13}/>{order.deliveryMode === "pickup" ? "Retirada" : "Entrega"}</span></div>
    </Link>
  );
}

function channelLabel(channel: AdminOrder["channel"]) {
  return { storefront: "Loja online", whatsapp: "WhatsApp", b2b: "B2B", manual: "Manual" }[channel];
}
