import type { StoreBanner } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { StoreStatusBadge } from "./store-status";

export function StoreBannersView({ banners }: { banners: StoreBanner[] }) {
  return <section className="banner-admin-grid">{banners.map((banner) => <article className="banner-admin-card" key={banner.id}>
    <div className={`banner-preview banner-${banner.id}`}><span className="banner-preview-brand">LaVic</span><div><small>{banner.placement === "hero" ? "HERO" : "CAMPANHA"}</small><strong>{banner.headline}</strong><span>{banner.ctaLabel}</span></div></div>
    <div className="banner-admin-body"><div className="banner-admin-title"><div><strong>{banner.name}</strong><small>Atualizado {formatDateTime(banner.updatedAt)}</small></div><StoreStatusBadge status={banner.status}/></div><p>{banner.description}</p><dl><div><dt>Desktop</dt><dd><Icon name="check" size={12}/>{banner.desktopAsset}</dd></div><div><dt>Mobile</dt><dd><Icon name="check" size={12}/>{banner.mobileAsset}</dd></div><div><dt>Destino</dt><dd>{banner.ctaHref}</dd></div></dl><footer><button className="text-action"><Icon name="edit" size={13}/> Editar conteúdo</button><button className="row-action" aria-label={`Mais ações de ${banner.name}`}><Icon name="more" size={14}/></button></footer></div>
  </article>)}</section>;
}
