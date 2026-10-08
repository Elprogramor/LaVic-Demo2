"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { B2BClient, B2BClientStatus, B2BPriceTable } from "../lib/types";
import { formatCurrency, formatDateOnly } from "../lib/format";
import { B2BBadge } from "./b2b-badge";
import { Icon } from "./icon";

export function B2BCustomersView({ clients, priceTables }: { clients: B2BClient[]; priceTables: B2BPriceTable[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | B2BClientStatus>("all");
  const tables = new Map(priceTables.map((table) => [table.id, table]));
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return clients.filter((client) => (!normalized || `${client.company} ${client.code} ${client.contactName} ${client.city}`.toLowerCase().includes(normalized)) && (status === "all" || client.status === status));
  }, [clients, query, status]);

  return (
    <>
      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar cliente B2B</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar parceiro, código, contato ou cidade..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value as "all" | B2BClientStatus)}><option value="all">Todos os status</option><option value="active">Ativos</option><option value="paused">Pausados</option><option value="inactive">Inativos</option></select><Icon name="chevronDown" size={14}/></label>
        {(query || status !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); }}>Limpar</button> : null}
      </div>
      <div className="table-shell b2b-table-shell">
        <table className="data-table b2b-clients-table">
          <thead><tr><th>Parceiro</th><th>Contato</th><th>Tabela</th><th>Pedido mínimo</th><th>Pedidos</th><th>Faturamento</th><th>Última compra</th><th>Status</th><th><span className="sr-only">Abrir</span></th></tr></thead>
          <tbody>{filtered.map((client) => <tr key={client.id}>
            <td><Link href={`/b2b/customers/${client.id}`} className="b2b-company-cell"><span className="b2b-company-avatar">{client.code.slice(-2)}</span><div><strong>{client.company}</strong><small>{client.code} · {client.city}/{client.state}</small></div></Link></td>
            <td><div className="contact-cell"><span>{client.contactName}</span><small>{client.phone}</small></div></td>
            <td><strong>{tables.get(client.priceTableId)?.name ?? "Sem tabela"}</strong></td>
            <td>{formatCurrency(client.minimumOrderCents)}</td>
            <td><strong>{client.orderCount}</strong></td>
            <td><strong>{formatCurrency(client.revenueCents)}</strong></td>
            <td>{client.lastOrderAt ? formatDateOnly(client.lastOrderAt) : "—"}</td>
            <td><B2BBadge kind="client" value={client.status}/></td>
            <td><Link className="row-action" href={`/b2b/customers/${client.id}`} aria-label={`Abrir ${client.company}`}><Icon name="chevronRight" size={16}/></Link></td>
          </tr>)}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhum cliente B2B corresponde aos filtros selecionados.</div> : null}
      </div>
      <div className="table-footer"><span>{filtered.length} de {clients.length} parceiros demonstrativos</span><span>Condições comerciais vinculadas por tabela</span></div>
    </>
  );
}
