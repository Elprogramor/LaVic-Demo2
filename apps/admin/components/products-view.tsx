"use client";

import { useMemo, useState } from "react";
import type { AdminProduct, ProductStatus } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { Icon } from "./icon";
import { StatusBadge } from "./status-badge";

const statusTabs: Array<{ value: "all" | ProductStatus | "b2c" | "b2b" | "critical"; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Ativos" },
  { value: "draft", label: "Rascunhos" },
  { value: "b2c", label: "B2C" },
  { value: "b2b", label: "B2B" },
  { value: "critical", label: "Estoque crítico" },
];

export function ProductsView({ products }: { products: AdminProduct[] }) {
  const [tab, setTab] = useState<(typeof statusTabs)[number]["value"]>("all");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => Array.from(new Set(products.map((product) => product.category))), [products]);
  const filtered = useMemo(() => products.filter((product) => {
    const matchesQuery = !query.trim() || `${product.name} ${product.sku}`.toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    const matchesTab = tab === "all" || (tab === "b2c" ? product.channels.includes("B2C") : tab === "b2b" ? product.channels.includes("B2B") : tab === "critical" ? product.status === "active" && product.stock <= product.minimumStock : product.status === tab);
    return matchesQuery && matchesCategory && matchesTab;
  }), [products, query, category, tab]);

  return (
    <>
      <div className="segment-tabs product-tabs" role="tablist" aria-label="Filtrar produtos">
        {statusTabs.map((item) => {
          const count = products.filter((product) => item.value === "all" || (item.value === "b2c" ? product.channels.includes("B2C") : item.value === "b2b" ? product.channels.includes("B2B") : item.value === "critical" ? product.status === "active" && product.stock <= product.minimumStock : product.status === item.value)).length;
          return <button key={item.value} className={tab === item.value ? "active" : ""} onClick={() => setTab(item.value)}>{item.label}<span>{count}</span></button>;
        })}
      </div>

      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar produto</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar produto..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Categoria</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">Categoria</option>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        <button className="filter-button"><Icon name="filter" size={15}/> Status</button>
        <button className="filter-button"><Icon name="store" size={15}/> Canal</button>
        {(query || category !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setCategory("all"); }}>Limpar</button> : null}
      </div>

      <div className="table-shell product-table-shell">
        <table className="data-table product-table">
          <thead><tr><th><input type="checkbox" aria-label="Selecionar todos os produtos"/></th><th>Produto</th><th>Categoria</th><th>Variantes</th><th>Preço inicial</th><th>Estoque</th><th>Canal</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead>
          <tbody>{filtered.map((product) => {
            const critical = product.status === "active" && product.stock <= product.minimumStock;
            return <tr key={product.id}><td><input type="checkbox" aria-label={`Selecionar ${product.name}`}/></td><td><div className="product-cell"><span className={`product-thumb flavor-${product.id}`}><Icon name="box" size={17}/></span><div><strong>{product.name}</strong><small>SKU: {product.sku}</small></div>{product.demo ? <StatusBadge status="demo"/> : null}</div></td><td>{product.category}</td><td>{product.variants}</td><td>{formatCurrency(product.priceCents)}</td><td><span className={critical ? "stock-value stock-critical" : "stock-value"}>{product.stock}</span></td><td>{product.channels.join(" / ")}</td><td><StatusBadge status={product.status}/></td><td><button className="row-action" aria-label={`Ações de ${product.name}`}><Icon name="more" size={17}/></button></td></tr>;
          })}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhum produto corresponde aos filtros.</div> : null}
      </div>
      <div className="table-footer"><span>Mostrando {filtered.length} de {products.length} produtos</span><div className="pagination"><button aria-label="Página anterior">‹</button><button className="active">1</button><button>2</button><button>3</button><button aria-label="Próxima página">›</button></div></div>
    </>
  );
}
