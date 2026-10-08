import type { StoreFlavor } from "../lib/types";
import { Icon } from "./icon";
import { StoreStatusBadge } from "./store-status";

export function StoreFlavorsView({ flavors }: { flavors: StoreFlavor[] }) {
  return <div className="table-shell"><table className="data-table flavor-admin-table"><thead><tr><th>Sabor</th><th>Slug</th><th>Vínculo de produto</th><th>Destaque</th><th>Status</th><th>Regra</th><th/></tr></thead><tbody>{flavors.map((flavor) => <tr key={flavor.id}><td><div className="flavor-admin-cell"><span className={`flavor-dot ${flavor.demo ? "demo" : flavor.slug}`}/><div><strong>{flavor.name}</strong><small>{flavor.description}</small></div></div></td><td>/{flavor.slug}</td><td>{flavor.productId ?? "Sem produto"}</td><td>{flavor.featured ? <span className="inline-ok"><Icon name="check" size={12}/> Destaque</span> : "—"}</td><td><StoreStatusBadge status={flavor.status}/>{flavor.demo ? <span className="status-badge status-demo">DEMO</span> : null}</td><td>{flavor.demo ? "Nunca publicar automaticamente" : "Catálogo ativo"}</td><td><button className="row-action" aria-label={`Ações de ${flavor.name}`}><Icon name="more" size={14}/></button></td></tr>)}</tbody></table></div>;
}
