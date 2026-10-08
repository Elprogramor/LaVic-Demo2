import { marketingCoupons } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { MarketingSubnav } from "../../../components/marketing-subnav";
import { CouponsView } from "../../../components/coupons-view";
import { StatCard } from "../../../components/stat-card";
import { formatCurrency } from "../../../lib/format";

export default function CouponsPage() {
  const active = marketingCoupons.filter(c => c.status === "active").length;
  const uses = marketingCoupons.reduce((sum,c) => sum + c.usageCount, 0);
  const revenue = marketingCoupons.reduce((sum,c) => sum + c.revenueCents, 0);
  return <div className="page-stack"><PageHeader eyebrow="Marketing / Cupons" title="Cupons" description="Controle códigos, limites, período, elegibilidade e impacto comercial."/><MarketingSubnav/><section className="stats-grid marketing-stats"><StatCard label="Ativos" value={String(active)} detail="disponíveis agora" icon="tag" tone="green"/><StatCard label="Utilizações" value={String(uses)} detail="histórico demonstrativo" icon="check" tone="orange"/><StatCard label="Receita atribuída" value={formatCurrency(revenue)} detail="pedidos com cupom" icon="chart" tone="green"/><StatCard label="Proteção" value="API" detail="recalcula elegibilidade" icon="settings" tone="orange"/></section><CouponsView coupons={marketingCoupons}/><p className="demo-note">Criar/editar ainda é demonstração local; nenhuma regra comercial deve ser confiada apenas ao frontend.</p></div>;
}
