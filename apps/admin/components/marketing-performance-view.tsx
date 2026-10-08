import type { MarketingCampaign } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { Panel } from "./ui";

const trend = [42, 49, 45, 58, 62, 70, 68, 77, 73, 84, 89, 94];

export function MarketingPerformanceView({ campaigns }: { campaigns: MarketingCampaign[] }) {
  const revenue = campaigns.reduce((sum, item) => sum + item.revenueCents, 0);
  const visits = campaigns.reduce((sum, item) => sum + item.visits, 0);
  const orders = campaigns.reduce((sum, item) => sum + item.orders, 0);
  const conversion = visits ? orders / visits * 100 : 0;
  return <>
    <section className="performance-kpis"><article><span>Receita atribuída</span><strong>{formatCurrency(revenue)}</strong><small>Campanhas rastreadas</small></article><article><span>Visitas</span><strong>{visits.toLocaleString("pt-BR")}</strong><small>Origem identificada</small></article><article><span>Pedidos</span><strong>{orders}</strong><small>Com atribuição</small></article><article><span>Conversão média</span><strong>{conversion.toFixed(2).replace(".", ",")}%</strong><small>Visita → pedido</small></article></section>
    <section className="marketing-performance-grid"><Panel title="Tendência de receita atribuída"><div className="marketing-bars" aria-label="Gráfico demonstrativo de tendência">{trend.map((value, index) => <div key={index}><i style={{ height: `${value}%` }}/><span>{index + 1}</span></div>)}</div></Panel><Panel title="Leitura de atribuição"><div className="attribution-note"><strong>Rastreamento comercial, não contabilidade.</strong><p>Os números desta área medem campanhas identificadas por origem, cupom ou vínculo explícito. Receita financeira consolidada permanece no módulo Financeiro.</p><ul><li>UTM/campanha</li><li>Cupom relacionado</li><li>Origem do pedido</li></ul></div></Panel></section>
    <div className="table-shell"><table className="data-table"><thead><tr><th>Campanha</th><th>Receita</th><th>Pedidos</th><th>Visitas</th><th>Conversão</th><th>Receita/pedido</th></tr></thead><tbody>{campaigns.filter(c => c.orders > 0).map((c) => <tr key={c.id}><td className="table-primary">{c.name}</td><td>{formatCurrency(c.revenueCents)}</td><td>{c.orders}</td><td>{c.visits.toLocaleString("pt-BR")}</td><td>{c.conversionRate.toFixed(2).replace(".", ",")}%</td><td>{formatCurrency(Math.round(c.revenueCents / c.orders))}</td></tr>)}</tbody></table></div>
  </>;
}
