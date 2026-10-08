"use client";

import { useMemo, useState } from "react";
import type { CatalogKit } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { Icon } from "./icon";
import { CoreCommerceStatus } from "./core-commerce-status";

function availableUnits(kit: CatalogKit) {
  if (!kit.components.length) return 0;
  return Math.min(...kit.components.map((item) => Math.floor(item.availableStock / item.quantity)));
}

export function KitsView({ items }: { items: CatalogKit[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(() => items.filter((item) => (!query.trim() || `${item.name} ${item.sku}`.toLowerCase().includes(query.trim().toLowerCase())) && (status === "all" || item.status === status)), [items, query, status]);
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  return <>
    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar kit</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar kit ou SKU..." maxLength={80}/></label>
      <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">Status</option><option value="active">Ativo</option><option value="draft">Rascunho</option><option value="inactive">Inativo</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || status !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); }}>Limpar</button> : null}
    </div>

    <div className="kit-layout">
      <div className="kit-card-list">
        {filtered.map((kit) => {
          const available = availableUnits(kit);
          return <button key={kit.id} className={`kit-card ${selected?.id === kit.id ? "active" : ""}`} onClick={() => setSelectedId(kit.id)}>
            <header><span className="kit-icon"><Icon name="layers" size={16}/></span><div><strong>{kit.name}</strong><small>{kit.sku}</small></div><CoreCommerceStatus status={kit.status}/></header>
            <p>{kit.description}</p>
            <dl><div><dt>Preço</dt><dd>{formatCurrency(kit.priceCents)}</dd></div><div><dt>Disponíveis</dt><dd className={available <= 4 ? "kit-stock-warn" : ""}>{available} kits</dd></div><div><dt>Canais</dt><dd>{kit.channels.join(" / ")}</dd></div></dl>
            {kit.demo ? <span className="demo-note">DEMO · não publicar automaticamente</span> : null}
          </button>;
        })}
      </div>

      {selected ? <section className="panel kit-detail-panel">
        <div className="kit-detail-head"><div><span>Composição</span><h2>{selected.name}</h2><p>A disponibilidade é calculada pelo componente limitante; não existe saldo independente do kit.</p></div><button className="button button-secondary" disabled title="Edição persistente entra com backend"><Icon name="edit" size={15}/><span>Editar composição</span></button></div>
        <div className="kit-availability-summary"><div><span>Disponibilidade calculada</span><strong>{availableUnits(selected)} kits</strong></div><div><span>Componentes</span><strong>{selected.components.length}</strong></div><div><span>Preço</span><strong>{formatCurrency(selected.priceCents)}</strong></div></div>
        <div className="table-shell kit-components-shell"><table className="data-table"><thead><tr><th>Componente</th><th>SKU</th><th>Qtde. por kit</th><th>Estoque disponível</th><th>Kits suportados</th></tr></thead><tbody>{selected.components.map((component) => <tr key={`${selected.id}-${component.sku}`}><td><strong className="table-primary">{component.productName}</strong></td><td>{component.sku}</td><td>{component.quantity}</td><td>{component.availableStock}</td><td><strong>{Math.floor(component.availableStock / component.quantity)}</strong></td></tr>)}</tbody></table></div>
        <div className="kit-policy-note"><Icon name="boxes" size={17}/><p><strong>Regra de estoque:</strong> ao vender 1 kit, a baixa acontece em cada componente. Se qualquer componente não puder atender a composição, o kit deve ficar indisponível.</p></div>
      </section> : null}
    </div>
  </>;
}
