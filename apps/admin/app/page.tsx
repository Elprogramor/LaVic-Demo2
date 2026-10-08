import Link from "next/link";
import { dashboardAlerts, products, salesSeries } from "../data/mock-admin";
import { PageHeader } from "../components/page-header";
import { StatCard } from "../components/stat-card";
import { ButtonLink, Panel } from "../components/ui";
import { Icon } from "../components/icon";
import { formatCurrency } from "../lib/format";

const topProducts = products.filter((item) => !item.demo).slice(0, 4);

export default function DashboardPage() {
  return (
    <div className="page-stack dashboard-page">
      <PageHeader
        eyebrow="Quinta-feira, 25 de setembro"
        title="Bom dia, Equipe LaVic"
        description="Aqui está o que merece atenção na operação hoje."
        actions={<><ButtonLink href="/orders" icon="plus">Criar pedido</ButtonLink><ButtonLink href="/products" icon="plus" variant="secondary">Cadastrar produto</ButtonLink></>}
      />

      <section className="stats-grid dashboard-stats" aria-label="Indicadores principais">
        <StatCard label="Vendas hoje" value="R$ 2.480,00" trend="↑ 12%" tone="green" />
        <StatCard label="Pedidos" value="24" detail="4 pendentes" icon="orders" tone="orange" />
        <StatCard label="Ticket médio" value="R$ 103,30" trend="↑ 8%" tone="green" />
        <StatCard label="Clientes" value="18" detail="5 novos" icon="users" tone="orange" />
        <StatCard label="Estoque crítico" value="1" detail="produto requer ação" icon="alert" tone="orange" />
        <StatCard label="Lotes próximos da validade" value="3" detail="prioridade FEFO" icon="calendar" tone="orange" />
        <StatCard label="Leads B2B" value="5" detail="sem retorno" icon="handshake" tone="orange" />
        <StatCard label="Receita no mês" value="R$ 38.420,00" trend="↑ 16%" tone="green" />
      </section>

      <section className="dashboard-grid dashboard-grid-main">
        <Panel title="Precisa da sua atenção" action={<Link className="text-link" href="/orders">Ver todos</Link>}>
          <div className="attention-list">
            {dashboardAlerts.map((alert) => <Link href={alert.id === "a1" || alert.id === "a2" ? "/orders" : alert.id === "a3" ? "/inventory/lots" : alert.id === "a4" ? "/inventory/alerts" : "/b2b"} className={`attention-row tone-${alert.tone}`} key={alert.id}><span className="attention-icon"><Icon name={alert.tone === "danger" ? "alert" : alert.id === "a3" ? "calendar" : alert.id === "a5" ? "handshake" : "orders"} size={15}/></span><span>{alert.count} {alert.label}</span><strong>{alert.count}</strong></Link>)}
          </div>
        </Panel>

        <Panel title="Vendas dos últimos 7 dias" action={<span className="chart-legend"><i className="legend-sales"/> Vendas <i className="legend-orders"/> Pedidos</span>}>
          <div className="sales-chart" aria-label="Gráfico demonstrativo de vendas dos últimos sete dias">
            <div className="chart-tooltip"><strong>R$ 2.480,00</strong><span>24 pedidos</span></div>
            {salesSeries.map((item) => <div className="chart-day" key={item.day}><div className="chart-bars"><i className="sales-bar" style={{ height: `${item.sales}%` }}/><i className="orders-bar" style={{ height: `${item.orders}%` }}/></div><span>{item.day}</span></div>)}
          </div>
        </Panel>
      </section>

      <section className="dashboard-grid dashboard-grid-secondary">
        <Panel title="Produtos mais vendidos" action={<Link className="text-link" href="/products">Ver catálogo</Link>}>
          <div className="top-products">
            {topProducts.map((product, index) => <div className="top-product-row" key={product.id}><span className={`product-thumb flavor-${product.id}`}><Icon name="box" size={16}/></span><div><strong>{product.name}</strong><small>{product.sku}</small></div><span className="top-product-units">{128 - index * 24} un.</span></div>)}
          </div>
        </Panel>

        <Panel title="Canais de venda" action={<Link className="text-link" href="/coming-soon?module=Relat%C3%B3rio%20de%20canais">Ver detalhes</Link>}>
          <div className="channels-card">
            <div className="donut" aria-label="68% loja online, 18% WhatsApp, 10% revenda B2B, 4% outros"><div><strong>100%</strong><span>vendas</span></div></div>
            <div className="channel-legend">
              <div><span><i className="channel-dot online"/>Loja online</span><strong>68%</strong></div>
              <div><span><i className="channel-dot whatsapp"/>WhatsApp</span><strong>18%</strong></div>
              <div><span><i className="channel-dot b2b"/>Revenda/B2B</span><strong>10%</strong></div>
              <div><span><i className="channel-dot other"/>Outros</span><strong>4%</strong></div>
            </div>
          </div>
        </Panel>
      </section>

      <p className="demo-note">Dados demonstrativos para validação visual e funcional da fundação do Admin.</p>
    </div>
  );
}
