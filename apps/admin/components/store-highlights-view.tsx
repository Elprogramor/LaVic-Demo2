import type { AdminProduct } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { Icon } from "./icon";

export function StoreHighlightsView({ products }: { products: AdminProduct[] }) {
  const selected = products.filter((p) => !p.demo).slice(0, 4);
  return <><div className="cms-guardrail compact"><span><Icon name="check" size={15}/></span><div><strong>Seleção editorial, não duplicação de produto</strong><p>Preço, disponibilidade e estoque continuam vindo do catálogo. Aqui controlamos apenas presença e ordem no storefront.</p></div></div><section className="highlight-list">{selected.map((product, index) => <article key={product.id}><span className="section-order">{String(index + 1).padStart(2, "0")}</span><span className={`product-thumb flavor-${product.id}`}><Icon name="box" size={15}/></span><div><strong>{product.name}</strong><small>{product.sku} · {formatCurrency(product.priceCents)}</small></div><span className="highlight-stock">{product.stock} em estoque</span><span className="status-badge status-active">Ativo</span><button className="row-action" aria-label={`Ações de ${product.name}`}><Icon name="more" size={14}/></button></article>)}</section></>;
}
