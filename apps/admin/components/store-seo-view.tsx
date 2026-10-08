import type { StoreSeoPage } from "../lib/types";
import { Icon } from "./icon";

export function StoreSeoView({ pages }: { pages: StoreSeoPage[] }) {
  return <>
    <section className="seo-summary"><article><span>Saudáveis</span><strong>{pages.filter(p => p.status === "healthy").length}</strong><small>Metadados completos</small></article><article><span>Precisam de atenção</span><strong>{pages.filter(p => p.status === "attention").length}</strong><small>Revisão recomendada</small></article><article><span>Não indexáveis</span><strong>{pages.filter(p => !p.indexable).length}</strong><small>Intencional ou rascunho</small></article></section>
    <div className="table-shell"><table className="data-table seo-table"><thead><tr><th>Rota</th><th>Title</th><th>Description</th><th>Indexação</th><th>Saúde</th><th/></tr></thead><tbody>{pages.map((page) => <tr key={page.id}><td className="table-primary">{page.route}</td><td><span className="seo-copy">{page.title}</span><small className="seo-count">{page.title.length} caracteres</small></td><td><span className="seo-copy seo-description">{page.description || "Sem description"}</span><small className="seo-count">{page.description.length} caracteres</small></td><td>{page.indexable ? <span className="inline-ok"><Icon name="check" size={12}/> Indexável</span> : <span className="inline-muted">Não indexar</span>}</td><td><span className={`seo-health seo-${page.status}`}>{page.status === "healthy" ? "Saudável" : page.status === "attention" ? "Atenção" : "Rascunho"}</span></td><td><button className="row-action" aria-label={`Editar SEO de ${page.route}`}><Icon name="edit" size={14}/></button></td></tr>)}</tbody></table></div>
  </>;
}
