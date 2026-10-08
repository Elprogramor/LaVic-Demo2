import Link from "next/link";
import { marketingCampaigns, marketingCoupons, marketingPromotions } from "../../data/mock-admin";
import { PageHeader } from "../../components/page-header";
import { MarketingSubnav } from "../../components/marketing-subnav";
import { MarketingStatusBadge } from "../../components/marketing-status";
import { StatCard } from "../../components/stat-card";
import { ButtonLink, Panel } from "../../components/ui";
import { formatCurrency, formatDateOnly } from "../../lib/format";
import { Icon } from "../../components/icon";

export default function MarketingPage() {
  const activeCampaigns = marketingCampaigns.filter((item) => item.status === "active");
  const activeCoupons = marketingCoupons.filter((item) => item.status === "active");
  const revenue = marketingCampaigns.reduce((sum, item) => sum + item.revenueCents, 0);
  const orders = marketingCampaigns.reduce((sum, item) => sum + item.orders, 0);
  return <div className="page-stack">
    <PageHeader eyebrow="Crescimento / Marketing" title="Marketing" description="Campanhas, cupons e promoções com regras claras e rastreáveis." actions={<><ButtonLink href="/marketing/coupons" icon="plus">Novo cupom</ButtonLink><ButtonLink href="/marketing/campaigns" variant="secondary">Ver campanhas</ButtonLink></>}/>
    <MarketingSubnav/>
    <section className="stats-grid marketing-stats"><StatCard label="Campanhas ativas" value={String(activeCampaigns.length)} detail="em execução" icon="megaphone" tone="green"/><StatCard label="Cupons ativos" value={String(activeCoupons.length)} detail="publicados" icon="tag" tone="orange"/><StatCard label="Pedidos atribuídos" value={String(orders)} detail="campanhas rastreadas" icon="orders" tone="green"/><StatCard label="Receita atribuída" value={formatCurrency(revenue)} detail="não substitui financeiro" icon="chart" tone="orange"/></section>
    <section className="marketing-overview-grid"><Panel title="Campanhas em execução" action={<Link className="text-link" href="/marketing/campaigns">Todas as campanhas</Link>}><div className="marketing-campaign-list">{activeCampaigns.map((campaign) => <article key={campaign.id}><span className="campaign-icon"><Icon name="megaphone" size={14}/></span><div><strong>{campaign.name}</strong><small>{campaign.channel} · até {campaign.endsAt ? formatDateOnly(campaign.endsAt) : "sem término"}</small></div><div className="campaign-metric"><strong>{formatCurrency(campaign.revenueCents)}</strong><small>{campaign.orders} pedidos</small></div><MarketingStatusBadge status={campaign.status}/></article>)}</div></Panel><Panel title="Próximas ações"><div className="marketing-action-list"><Link href="/marketing/coupons"><span><Icon name="tag" size={14}/></span><div><strong>Revisar KITLAVIC15</strong><small>Cupom agendado para a próxima campanha.</small></div><Icon name="chevronRight" size={14}/></Link><Link href="/marketing/promotions"><span><Icon name="layers" size={14}/></span><div><strong>Promoção de quantidade</strong><small>Regra preparada, aguardando período ativo.</small></div><Icon name="chevronRight" size={14}/></Link><Link href="/marketing/performance"><span><Icon name="chart" size={14}/></span><div><strong>Ver atribuição</strong><small>Compare visitas, pedidos e receita rastreada.</small></div><Icon name="chevronRight" size={14}/></Link></div></Panel></section>
    <Panel title="Promoções configuradas" action={<Link className="text-link" href="/marketing/promotions">Gerenciar</Link>}><div className="marketing-mini-promos">{marketingPromotions.map((promo) => <article key={promo.id}><div><strong>{promo.name}</strong><small>{promo.scope}</small></div><MarketingStatusBadge status={promo.status}/><strong>{promo.redemptions} usos</strong></article>)}</div></Panel>
    <p className="demo-note">Dados demonstrativos. Regras comerciais serão validadas pela API na implementação de backend.</p>
  </div>;
}
