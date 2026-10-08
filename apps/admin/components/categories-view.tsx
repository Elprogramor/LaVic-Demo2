"use client";

import { useMemo, useState } from "react";
import type { CatalogCategory } from "../lib/types";
import { Icon } from "./icon";
import { CoreCommerceStatus } from "./core-commerce-status";

export function CategoriesView({ items }: { items: CatalogCategory[] }) {
  const [query, setQuery] = useState("");
  const [visibility, setVisibility] = useState("all");
  const filtered = useMemo(() => items.filter((item) => {
    const q = query.trim().toLowerCase();
    return (!q || `${item.name} ${item.slug}`.toLowerCase().includes(q)) && (visibility === "all" || (visibility === "visible" ? item.storefrontVisible : !item.storefrontVisible));
  }), [items, query, visibility]);

  return <>
    <div className="category-principles">
      <article><span><Icon name="layers" size={16}/></span><div><strong>Organização comercial</strong><p>Categorias organizam o catálogo sem alterar a identidade visual do storefront.</p></div></article>
      <article><span><Icon name="store" size={16}/></span><div><strong>Visibilidade controlada</strong><p>Ocultar uma categoria não apaga produtos nem histórico de pedidos.</p></div></article>
      <article><span><Icon name="shield" size={16}/></span><div><strong>Remoção protegida</strong><p>Categorias com vínculos devem ser migradas ou arquivadas antes de qualquer exclusão.</p></div></article>
    </div>

    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar categoria</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar categoria ou slug..." maxLength={80}/></label>
      <label className="select-field"><span className="sr-only">Visibilidade</span><select value={visibility} onChange={(event) => setVisibility(event.target.value)}><option value="all">Visibilidade</option><option value="visible">Visível</option><option value="hidden">Oculta</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || visibility !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setVisibility("all"); }}>Limpar</button> : null}
    </div>

    <div className="table-shell"><table className="data-table categories-table"><thead><tr><th>Ordem</th><th>Categoria</th><th>Slug</th><th>Produtos</th><th>Canais</th><th>Storefront</th><th>Status</th><th><span className="sr-only">Ações</span></th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><span className="category-order">{String(item.sortOrder).padStart(2, "0")}</span></td><td><div className="category-name-cell"><span className="category-icon"><Icon name="tag" size={15}/></span><div><strong>{item.name}</strong><small>{item.description}</small></div>{item.demo ? <span className="demo-note inline">DEMO</span> : null}</div></td><td><code className="slug-code">/{item.slug}</code></td><td>{item.productCount}</td><td>{item.channels.join(" / ")}</td><td><span className={`visibility-pill ${item.storefrontVisible ? "visible" : "hidden"}`}>{item.storefrontVisible ? "Visível" : "Oculta"}</span></td><td><CoreCommerceStatus status={item.status}/></td><td><button className="row-action" disabled aria-label={`Ações de ${item.name}`} title="Edição persistente entra com backend"><Icon name="more" size={16}/></button></td></tr>)}</tbody></table>{!filtered.length ? <div className="table-empty">Nenhuma categoria corresponde aos filtros.</div> : null}</div>
    <div className="table-footer"><span>Mostrando {filtered.length} de {items.length} categorias</span><span>Ordem e publicação serão persistidas pela API.</span></div>
  </>;
}
