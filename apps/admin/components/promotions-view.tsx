import type { MarketingPromotion } from "../lib/types";
import { formatCurrency, formatDateOnly } from "../lib/format";
import { Icon } from "./icon";
import { MarketingStatusBadge } from "./marketing-status";

const kindLabels = { price: "Preço", quantity: "Quantidade", bundle: "Combo", shipping: "Frete" } as const;

export function PromotionsView({ promotions }: { promotions: MarketingPromotion[] }) {
  return <section className="promotion-grid">{promotions.map((promotion) => <article className="promotion-card" key={promotion.id}>
    <header><span className="promotion-icon"><Icon name={promotion.kind === "shipping" ? "truck" : promotion.kind === "bundle" ? "layers" : "tag"} size={16}/></span><MarketingStatusBadge status={promotion.status}/></header>
    <div className="promotion-kind">{kindLabels[promotion.kind]}</div><h2>{promotion.name}</h2><p>{promotion.summary}</p>
    <dl><div><dt>Escopo</dt><dd>{promotion.scope}</dd></div><div><dt>Período</dt><dd>{formatDateOnly(promotion.startsAt)}{promotion.endsAt ? ` → ${formatDateOnly(promotion.endsAt)}` : ""}</dd></div><div><dt>Utilizações</dt><dd>{promotion.redemptions}</dd></div><div><dt>Receita atribuída</dt><dd>{formatCurrency(promotion.revenueCents)}</dd></div></dl>
    <footer><button className="text-action"><Icon name="edit" size={13}/> Editar regra</button><button className="row-action" aria-label={`Mais ações para ${promotion.name}`}><Icon name="more" size={14}/></button></footer>
  </article>)}</section>;
}
