"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AdminCustomer, CustomerOrigin, CustomerSegmentKey } from "../lib/types";
import { formatCurrency, formatDateOnly } from "../lib/format";
import { Icon } from "./icon";
import { StatusBadge } from "./status-badge";

const tabs: Array<{ value: "all" | CustomerSegmentKey; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "new", label: "Novos" },
  { value: "recurrent", label: "Recorrentes" },
  { value: "vip", label: "VIP" },
  { value: "at_risk", label: "Em risco" },
  { value: "b2b_potential", label: "Potencial B2B" },
  { value: "inactive", label: "Inativos" },
];

const originLabels: Record<CustomerOrigin, string> = {
  storefront: "Loja online",
  whatsapp: "WhatsApp",
  event: "Evento",
  manual: "Manual",
};

const segmentLabels: Record<CustomerSegmentKey, string> = {
  new: "Novo",
  recurrent: "Recorrente",
  vip: "VIP",
  at_risk: "Em risco",
  inactive: "Inativo",
  b2b_potential: "Potencial B2B",
};

export function CustomersView({ customers, initialSegment = "all" }: { customers: AdminCustomer[]; initialSegment?: "all" | CustomerSegmentKey }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>(initialSegment);
  const [query, setQuery] = useState("");
  const [origin, setOrigin] = useState<"all" | CustomerOrigin>("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return customers.filter((customer) => {
      const matchesQuery = !normalized || `${customer.name} ${customer.code} ${customer.email} ${customer.phone}`.toLowerCase().includes(normalized);
      const matchesOrigin = origin === "all" || customer.origin === origin;
      const matchesTab = tab === "all" || customer.segments.includes(tab);
      return matchesQuery && matchesOrigin && matchesTab;
    });
  }, [customers, query, origin, tab]);

  return (
    <>
      <div className="segment-tabs customer-tabs" role="tablist" aria-label="Filtrar clientes">
        {tabs.map((item) => {
          const count = customers.filter((customer) => item.value === "all" || customer.segments.includes(item.value)).length;
          return <button key={item.value} className={tab === item.value ? "active" : ""} onClick={() => setTab(item.value)}>{item.label}<span>{count}</span></button>;
        })}
      </div>

      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar cliente</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nome, código, e-mail ou telefone..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Origem</span><select value={origin} onChange={(event) => setOrigin(event.target.value as "all" | CustomerOrigin)}><option value="all">Todas as origens</option><option value="storefront">Loja online</option><option value="whatsapp">WhatsApp</option><option value="event">Evento</option><option value="manual">Manual</option></select><Icon name="chevronDown" size={14}/></label>
        {(query || origin !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setOrigin("all"); }}>Limpar</button> : null}
      </div>

      <div className="table-shell customer-table-shell">
        <table className="data-table customer-table">
          <thead><tr><th>Cliente</th><th>Contato</th><th>Origem</th><th>Pedidos</th><th>Total gasto</th><th>Última compra</th><th>Segmentos</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead>
          <tbody>{filtered.map((customer) => (
            <tr key={customer.id}>
              <td><Link className="customer-cell" href={`/customers/${customer.id}`}><span className="customer-avatar">{initials(customer.name)}</span><div><strong>{customer.name}</strong><small>{customer.code}</small></div></Link></td>
              <td><div className="contact-cell"><span>{customer.phone}</span><small>{customer.email}</small></div></td>
              <td>{originLabels[customer.origin]}</td>
              <td><strong>{customer.orderCount}</strong></td>
              <td><strong>{formatCurrency(customer.totalSpentCents)}</strong></td>
              <td>{customer.lastOrderAt ? formatDateOnly(customer.lastOrderAt) : "Sem compra"}</td>
              <td><div className="segment-list">{customer.segments.slice(0, 2).map((segment) => <span className={`segment-pill segment-${segment}`} key={segment}>{segmentLabels[segment]}</span>)}{customer.segments.length > 2 ? <span className="segment-more">+{customer.segments.length - 2}</span> : null}</div></td>
              <td><StatusBadge status={customer.status}/></td>
              <td><Link className="row-action" aria-label={`Abrir perfil de ${customer.name}`} href={`/customers/${customer.id}`}><Icon name="chevronRight" size={16}/></Link></td>
            </tr>
          ))}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhum cliente corresponde aos filtros selecionados.</div> : null}
      </div>
      <div className="table-footer"><span>Mostrando {filtered.length} de {customers.length} clientes nesta base demonstrativa</span><span>CRM B2C · dados tipados</span></div>
    </>
  );
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? "L"}${parts.at(-1)?.[0] ?? "V"}`.toUpperCase();
}
