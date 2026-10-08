import { InventoryAlertsView } from "../../../components/inventory-alerts-view";
import { InventorySubnav } from "../../../components/inventory-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { inventoryAlerts } from "../../../data/mock-admin";

export default function InventoryAlertsPage() {
  const critical = inventoryAlerts.filter((item) => item.severity === "critical").length;
  const warning = inventoryAlerts.filter((item) => item.severity === "warning").length;
  const info = inventoryAlerts.filter((item) => item.severity === "info").length;
  const expiry = inventoryAlerts.filter((item) => item.kind === "expiry" || item.kind === "expired").length;

  return (
    <div className="page-stack inventory-page">
      <PageHeader eyebrow="Estoque / Alertas" title="Alertas de estoque" description="Centralize rupturas, validade, divergências e bloqueios que exigem acompanhamento da equipe." />
      <InventorySubnav/>
      <section className="stats-grid inventory-alert-stats" aria-label="Resumo dos alertas">
        <StatCard label="Críticos" value={String(critical)} detail="ação prioritária" icon="alert" tone="orange" />
        <StatCard label="Atenção" value={String(warning)} detail="acompanhar hoje" icon="bell" tone="orange" />
        <StatCard label="Informativos" value={String(info)} detail="sem bloqueio imediato" icon="check" tone="neutral" />
        <StatCard label="Validade" value={String(expiry)} detail="próximos + vencidos" icon="calendar" tone="orange" />
      </section>
      <InventoryAlertsView alerts={inventoryAlerts}/>
      <p className="demo-note">Alertas demonstrativos. Regras reais de validade, mínimo e quarentena devem ser parametrizadas no backend.</p>
    </div>
  );
}
