import type { StoreSection } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { StoreStatusBadge } from "./store-status";

export function StoreHomeView({ sections }: { sections: StoreSection[] }) {
  return <>
    <div className="cms-guardrail"><span><Icon name="check" size={15}/></span><div><strong>CMS controlado pela identidade LaVic</strong><p>O Admin altera conteúdo, ordem e publicação. Tipografia, grid, espaçamento e componentes continuam protegidos pelo design system.</p></div></div>
    <section className="store-editor-layout"><div className="store-section-list">{sections.sort((a,b) => a.position - b.position).map((section) => <article className="store-section-row" key={section.id}><span className="section-order">{String(section.position).padStart(2, "0")}</span><span className="store-section-icon"><Icon name={section.type === "hero" ? "layers" : section.type === "b2b" ? "handshake" : section.type === "flavors" ? "tag" : "box"} size={15}/></span><div><strong>{section.label}</strong><p>{section.note}</p><small>Atualizado {formatDateTime(section.updatedAt)}</small></div><StoreStatusBadge status={section.status}/><button className="row-action" aria-label={`Ações de ${section.label}`}><Icon name="more" size={14}/></button></article>)}</div>
    <aside className="store-preview-card"><div className="browser-chrome"><i/><i/><i/><span>lavic.com.br</span></div><div className="store-mini-preview"><header><strong>LaVic</strong><span>Sabores · Sobre · Revenda</span></header><section className="mini-hero"><small>KOMBUCHA LAVIC</small><strong>Viva com gás.</strong><span>Campanha ativa</span></section><div className="mini-products"><i/><i/><i/></div><div className="mini-content-line"/><div className="mini-content-line short"/></div><footer><span>Prévia estrutural</span><small>Conteúdo real é renderizado pelo storefront.</small></footer></aside></section>
  </>;
}
