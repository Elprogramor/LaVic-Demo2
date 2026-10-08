import { FinanceRefundsView } from "../../../components/finance-refunds-view";
import { FinanceSubnav } from "../../../components/finance-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { financeRefunds } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function FinanceRefundsPage() {
  const total = financeRefunds.reduce((sum, item) => sum + item.amountCents, 0);
  const completed = financeRefunds.filter((item) => item.status === "completed");
  const open = financeRefunds.filter((item) => item.status === "requested" || item.status === "processing");
  return <div className="page-stack"><PageHeader eyebrow="Financeiro / Reembolsos" title="Reembolsos" description="Acompanhe solicitações e preserve rastreabilidade sobre devoluções financeiras."/><FinanceSubnav active="/finance/refunds"/><section className="stats-grid finance-refund-stats"><StatCard label="Solicitações" value={String(financeRefunds.length)} detail="base demonstrativa" icon="refund" tone="neutral"/><StatCard label="Em aberto" value={String(open.length)} detail="exigem acompanhamento" icon="clock" tone="orange"/><StatCard label="Concluídos" value={String(completed.length)} detail="processados" icon="check" tone="green"/><StatCard label="Valor envolvido" value={formatCurrency(total)} detail="todas as solicitações" icon="wallet" tone="orange"/></section><div className="finance-policy-note"><strong>Regra de segurança</strong><span>Reembolso real deve exigir permissão específica, motivo obrigatório, confirmação e registro de auditoria.</span></div><FinanceRefundsView refunds={financeRefunds}/><p className="demo-note">Nenhum reembolso desta tela executa movimentação real nesta fase.</p></div>;
}
