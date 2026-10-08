import { FinanceReconciliationView } from "../../../components/finance-reconciliation-view";
import { FinanceSubnav } from "../../../components/finance-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { financeReconciliations } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function FinanceReconciliationPage() {
  const expected = financeReconciliations.reduce((sum, item) => sum + item.expectedCents, 0);
  const settled = financeReconciliations.reduce((sum, item) => sum + item.settledCents, 0);
  const differences = financeReconciliations.filter((item) => item.status !== "matched");
  return <div className="page-stack"><PageHeader eyebrow="Financeiro / Conciliação" title="Conciliação" description="Compare o valor esperado pelos pedidos com os valores liquidados por origem."/><FinanceSubnav active="/finance/reconciliation"/><section className="stats-grid reconciliation-stats"><StatCard label="Esperado" value={formatCurrency(expected)} detail="pedidos elegíveis" icon="orders" tone="neutral"/><StatCard label="Liquidado" value={formatCurrency(settled)} detail="origens conciliadas" icon="wallet" tone="green"/><StatCard label="Diferença líquida" value={formatCurrency(settled - expected)} detail="resultado demonstrativo" icon="swap" tone="orange"/><StatCard label="Pendências" value={String(differences.length)} detail="revisão necessária" icon="alert" tone="orange"/></section><div className="finance-context-note"><span className="finance-context-icon">01</span><p><strong>O sistema não corrige diferenças sozinho.</strong> Divergências entram em revisão e, na implementação real, cada ajuste deverá apontar origem, responsável e evidência.</p></div><FinanceReconciliationView rows={financeReconciliations}/><p className="demo-note">Conciliação demonstrativa, sem conexão com adquirente ou banco.</p></div>;
}
