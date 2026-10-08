import Link from "next/link";
import { FinanceSubnav } from "../../components/finance-subnav";
import { FinanceStatusBadge } from "../../components/finance-status";
import { Icon } from "../../components/icon";
import { PageHeader } from "../../components/page-header";
import { StatCard } from "../../components/stat-card";
import { ButtonLink, Panel } from "../../components/ui";
import { financeDailyRevenue, financeReconciliations, financeRefunds, financeTransactions } from "../../data/mock-admin";
import { formatCurrency, formatDateOnly } from "../../lib/format";

export default function FinancePage() {
  const approved = financeTransactions.filter((item) => item.status === "approved");
  const gross = approved.reduce((sum, item) => sum + item.grossCents, 0);
  const discounts = approved.reduce((sum, item) => sum + item.discountCents, 0);
  const shipping = approved.reduce((sum, item) => sum + item.shippingCents, 0);
  const net = approved.reduce((sum, item) => sum + item.netCents, 0);
  const pending = financeTransactions.filter((item) => item.status === "pending").reduce((sum, item) => sum + item.netCents, 0);
  const refunds = financeRefunds.filter((item) => item.status === "completed").reduce((sum, item) => sum + item.amountCents, 0);
  const maxRevenue = Math.max(...financeDailyRevenue.map((item) => item.netCents));
  const methodTotals = approved.reduce<Record<string, number>>((acc, item) => { acc[item.method] = (acc[item.method] ?? 0) + item.netCents; return acc; }, {});
  const methodTotal = Object.values(methodTotals).reduce((sum, value) => sum + value, 0) || 1;

  return <div className="page-stack finance-page">
    <PageHeader eyebrow="Gestão / Financeiro" title="Financeiro" description="Acompanhe receita, recebimentos, reembolsos e conciliação da operação comercial." actions={<><ButtonLink href="/reports/sales" icon="chart" variant="secondary">Relatório de vendas</ButtonLink><ButtonLink href="/finance/receivables" icon="wallet">Ver recebimentos</ButtonLink></>}/>
    <FinanceSubnav/>
    <section className="stats-grid finance-stats">
      <StatCard label="Receita bruta" value={formatCurrency(gross)} detail="pagamentos aprovados" icon="wallet" tone="green"/>
      <StatCard label="Descontos" value={formatCurrency(discounts)} detail="cupons e condições" icon="tag" tone="orange"/>
      <StatCard label="Frete" value={formatCurrency(shipping)} detail="cobrado nos pedidos" icon="truck" tone="neutral"/>
      <StatCard label="Receita líquida" value={formatCurrency(net)} detail="visão comercial" icon="chart" tone="green"/>
      <StatCard label="A receber" value={formatCurrency(pending)} detail="pagamentos pendentes" icon="clock" tone="orange"/>
      <StatCard label="Reembolsado" value={formatCurrency(refunds)} detail="concluído no período" icon="refund" tone="neutral"/>
    </section>

    <section className="finance-main-grid">
      <Panel title="Receita líquida · últimos 7 dias" action={<span className="chart-legend"><i className="legend-sales"/>Receita líquida</span>}>
        <div className="finance-bars" aria-label="Gráfico demonstrativo de receita líquida por dia">{financeDailyRevenue.map((item) => <div key={item.date}><div className="finance-bar-track"><i style={{ height: `${Math.max(8, Math.round(item.netCents / maxRevenue * 100))}%` }}/></div><strong>{formatCurrency(item.netCents)}</strong><span>{formatDateOnly(item.date).slice(0, 5)}</span></div>)}</div>
      </Panel>
      <Panel title="Meios de pagamento">
        <div className="finance-methods">
          {[
            ["pix", "PIX"], ["credit_card", "Cartão"], ["cash", "Dinheiro"], ["manual", "Manual"],
          ].map(([key, label]) => { const value = methodTotals[key] ?? 0; const pct = value / methodTotal * 100; return <div key={key}><div><span><i className={`payment-dot payment-${key}`}/>{label}</span><strong>{formatCurrency(value)}</strong></div><div className="finance-progress"><i style={{ width: `${pct}%` }}/></div><small>{pct.toFixed(1).replace(".", ",")}% da receita aprovada</small></div>; })}
        </div>
      </Panel>
    </section>

    <section className="finance-secondary-grid">
      <Panel title="Recebimentos recentes" action={<Link className="text-link" href="/finance/receivables">Ver todos</Link>}>
        <div className="finance-recent-list">{financeTransactions.slice(0, 6).map((item) => <Link href="/finance/receivables" key={item.id}><span className="finance-recent-icon"><Icon name={item.method === "pix" ? "wallet" : "card"} size={14}/></span><div><strong>{item.orderCode} · {item.customer}</strong><small>{item.code}</small></div><strong>{formatCurrency(item.netCents)}</strong><FinanceStatusBadge status={item.status}/><Icon name="chevronRight" size={14}/></Link>)}</div>
      </Panel>
      <Panel title="Conciliação" action={<Link className="text-link" href="/finance/reconciliation">Abrir conciliação</Link>}>
        <div className="reconciliation-summary">{financeReconciliations.slice(0, 4).map((item) => <article key={item.id}><div><strong>{item.provider}</strong><small>{formatDateOnly(item.date)} · {item.orders} pedidos</small></div><div><strong className={item.differenceCents === 0 ? "finance-positive" : "finance-negative"}>{item.differenceCents === 0 ? "Sem diferença" : formatCurrency(item.differenceCents)}</strong><FinanceStatusBadge status={item.status}/></div></article>)}</div>
      </Panel>
    </section>
    <div className="finance-context-note"><Icon name="alert" size={15}/><p><strong>Financeiro operacional, não contabilidade.</strong> Esta camada consolida vendas, recebimentos e diferenças comerciais. Obrigações fiscais e contábeis permanecem fora do escopo desta versão.</p></div>
    <p className="demo-note">Valores financeiros são demonstrativos e ainda não possuem persistência ou integração com gateway.</p>
  </div>;
}
