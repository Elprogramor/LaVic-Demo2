import { PageHeader } from "../../../components/page-header";
import { SalesPaymentsView } from "../../../components/sales-payments-view";
import { SalesSubnav } from "../../../components/sales-subnav";
import { StatCard } from "../../../components/stat-card";
import { ButtonLink } from "../../../components/ui";
import { salesPayments } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function SalesPaymentsPage() {
  const approved = salesPayments.filter((item) => item.status === "approved");
  const pending = salesPayments.filter((item) => item.status === "pending").length;
  const exceptions = salesPayments.filter((item) => ["failed", "expired"].includes(item.status)).length;
  const approvedValue = approved.reduce((sum, item) => sum + item.amountCents, 0);
  return <div className="page-stack core-commerce-page sales-payments-page">
    <PageHeader eyebrow="Vendas / Pagamentos" title="Pagamentos" description="Acompanhe se cada venda foi paga e identifique tentativas que exigem ação operacional." actions={<ButtonLink href="/finance" variant="secondary" icon="wallet">Abrir Financeiro</ButtonLink>}/>
    <SalesSubnav/>
    <div className="stats-grid core-commerce-stats"><StatCard label="Aprovado" value={formatCurrency(approvedValue)} detail={`${approved.length} pagamentos`} icon="check"/><StatCard label="Pendentes" value={String(pending)} detail="Aguardando confirmação" icon="clock" tone="orange"/><StatCard label="Falhas / expirados" value={String(exceptions)} detail="Exigem revisão do pedido" icon="alert" tone="orange"/><StatCard label="Reembolsados" value={String(salesPayments.filter((item) => item.status === "refunded").length)} detail="Histórico operacional" icon="refund" tone="neutral"/></div>
    <div className="core-split-note"><div><strong>Pagamentos</strong><span>Responde: o pedido foi pago?</span></div><span className="split-arrow">→</span><div><strong>Financeiro</strong><span>Responde: o valor foi liquidado e conciliado?</span></div></div>
    <SalesPaymentsView items={salesPayments}/>
  </div>;
}
