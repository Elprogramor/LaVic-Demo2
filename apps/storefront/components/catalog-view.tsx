"use client";

import { useMemo, useState } from "react";
import type { StoreProduct } from "@/data/mocks/products";
import { ProductGrid } from "./product-grid";

type Filter = "all" | "lime" | "strawberry";

export function CatalogView({ products }: { products: StoreProduct[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const term = query.trim().toLocaleLowerCase("pt-BR");
    return products.filter((product) => {
      const matchesFlavor = filter === "all" || product.flavor === filter;
      const matchesQuery = term.length === 0 || `${product.name} ${product.shortDescription}`.toLocaleLowerCase("pt-BR").includes(term);
      return matchesFlavor && matchesQuery;
    });
  }, [filter, products, query]);

  return (
    <div className="catalog-experience">
      <div className="catalog-toolbar" aria-label="Filtros do catálogo">
        <div className="catalog-search">
          <i className="fi fi-tr-search-alt" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value.slice(0, 80))}
            placeholder="Buscar sabor"
            aria-label="Buscar sabor"
            maxLength={80}
          />
        </div>
        <div className="catalog-filters" role="group" aria-label="Filtrar por sabor">
          {([
            ["all", "Todos"],
            ["lime", "Limão"],
            ["strawberry", "Morango"]
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              className={filter === value ? "is-active" : ""}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
            >
              {label}
            </button>
          ))}
        </div>
        <span className="catalog-count">{visible.length} {visible.length === 1 ? "produto" : "produtos"}</span>
      </div>

      {visible.length > 0 ? (
        <ProductGrid products={visible} />
      ) : (
        <div className="commerce-empty" role="status">
          <p className="eyebrow">Nenhum resultado</p>
          <h2>Não encontramos esse sabor.</h2>
          <p>Tente outro termo ou volte para todos os produtos.</p>
          <button type="button" className="button button--outline" onClick={() => { setFilter("all"); setQuery(""); }}>Limpar filtros</button>
        </div>
      )}
    </div>
  );
}
