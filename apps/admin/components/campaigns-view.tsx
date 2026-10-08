import type { MarketingCampaign } from "../lib/types";
import { formatCurrency, formatDateOnly } from "../lib/format";
import { MarketingStatusBadge } from "./marketing-status";
import { Icon } from "./icon";

const channelLabels = { storefront: "Loja", whatsapp: "WhatsApp", instagram: "Instagram", email: "E-mail", b2b: "B2B" } as const;

export function CampaignsView({ campaigns }: { campaigns: MarketingCampaign[] }) {
  return <div className="table-shell"><table className="data-table campaign-table"><thead><tr><th>Campanha</th><th>Canal</th><th>Período</th><th>Visitas</th><th>Pedidos</th><th>Conversão</th><th>Receita</th><th>Status</th><th/></tr></thead><tbody>{campaigns.map((campaign) => <tr key={campaign.id}>
    <td><div className="campaign-cell"><strong>{campaign.name}</strong><small>{campaign.couponCode ? `Cupom ${campaign.couponCode}` : "Sem cupom vinculado"}</small></div></td>
    <td><span className="channel-chip">{channelLabels[campaign.channel]}</span></td><td>{formatDateOnly(campaign.startsAt)}{campaign.endsAt ? <small className="cell-note"> → {formatDateOnly(campaign.endsAt)}</small> : null}</td><td>{campaign.visits.toLocaleString("pt-BR")}</td><td>{campaign.orders}</td><td><strong className="marketing-value">{campaign.conversionRate.toFixed(2).replace(".", ",")}%</strong></td><td>{formatCurrency(campaign.revenueCents)}</td><td><MarketingStatusBadge status={campaign.status}/></td><td><button className="row-action" aria-label={`Ações de ${campaign.name}`}><Icon name="more" size={14}/></button></td>
  </tr>)}</tbody></table></div>;
}
