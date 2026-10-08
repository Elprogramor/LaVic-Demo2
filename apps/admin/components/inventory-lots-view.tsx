"use client";

import { useMemo, useState } from "react";
import type { InventoryLot, InventoryLotStatus } from "../lib/types";
import { formatDateOnly } from "../lib/format";
import { Icon } from "./icon";
import { StatusBadge } from "./status-badge";

const tabs: Array<{ value: "all" | InventoryLotStatus; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "available", label: "Disponíveis" },
  { value: "attention", label: "Atenção" },
  { value: "blocked", label: "Bloqueados" },
  { value: "expired", label: "Vencidos" },
];

export function InventoryLotsView({ lots }: { lots: InventoryLot[] }) {
  const [tab, setTab] = useState<(typeof tabs)[number]["value"]>("all");
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("all");

  const locations = useMemo(() => Array.from(new Set(lots.map((lot) => lot.location))), [lots]);
  const filtered = useMemo(() => lots
    .filter((lot) => {
      const normalized = query.trim().toLowerCase();
      const matchesQuery = !normalized || `${lot.code} ${lot.productName} ${lot.sku}`.toLowerCase().includes(normalized);
      const matchesLocation = location === "all" || lot.location === location;
      const matchesTab = tab === "all" || lot.status === tab;
      return matchesQuery && matchesLocation && matchesTab;
    })
    .sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime()), [lots, query, location, tab]);

  return (
    <>
      <div className="segment-tabs inventory-tabs" role="tablist" aria-label="Filtrar lotes">
        {tabs.map((item) => {
          const count = lots.filter((lot) => item.value === "all" || lot.status === item.value).length;
          return <button key={item.value} className={tab === item.value ? "active" : ""} onClick={() => setTab(item.value)}>{item.label}<span>{count}</span></button>;
        })}
      </div>

      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar lote</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar lote, produto ou SKU..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Localização</span><select value={location} onChange={(event) => setLocation(event.target.value)}><option value="all">Todos os locais</option>{locations.map((item) => <option key={item} value={item}>{item}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        {(query || location !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setLocation("all"); }}>Limpar</button> : null}
      </div>

      <div className="table-shell inventory-table-shell">
        <table className="data-table inventory-lots-table">
          <thead><tr><th>Lote</th><th>Produto</th><th>Produção</th><th>Validade</th><th>Disponível</th><th>Reservado</th><th>Local</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead>
          <tbody>{filtered.map((lot) => (
            <tr key={lot.id}>
              <td><strong className="lot-code">{lot.code}</strong></td>
              <td><div className="product-cell"><span className="product-thumb"><Icon name="box" size={16}/></span><div><strong>{lot.productName}</strong><small>{lot.sku}</small></div></div></td>
              <td>{formatDateOnly(lot.producedAt)}</td>
              <td><span className={lot.status === "attention" || lot.status === "expired" ? "date-emphasis" : ""}>{formatDateOnly(lot.expiresAt)}</span></td>
              <td><strong className="inventory-number">{lot.available}</strong></td>
              <td>{lot.reserved}</td>
              <td>{lot.location}</td>
              <td><StatusBadge status={lot.status}/></td>
              <td><button className="row-action" aria-label={`Ações do lote ${lot.code}`}><Icon name="more" size={17}/></button></td>
            </tr>
          ))}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhum lote corresponde aos filtros selecionados.</div> : null}
      </div>
      <div className="table-footer"><span>Mostrando {filtered.length} de {lots.length} lotes · ordenados por validade</span><span className="fefo-inline"><Icon name="check" size={13}/> Ordem FEFO</span></div>
    </>
  );
}
