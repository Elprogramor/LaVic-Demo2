import { B2BLeadsView } from "../../../components/b2b-leads-view";
import { B2BNewLeadAction } from "../../../components/b2b-new-lead-action";
import { B2BSubnav } from "../../../components/b2b-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { b2bLeads } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function B2BLeadsPage() {
  const active = b2bLeads.filter((lead) => !["won", "lost"].includes(lead.stage));
  const qualified = b2bLeads.filter((lead) => ["qualified", "proposal", "negotiation"].includes(lead.stage));
  const totalPotential = active.reduce((sum, lead) => sum + lead.potentialCents, 0);
  return <div className="page-stack b2b-page"><PageHeader eyebrow="Revenda / Leads" title="Leads B2B" description="Qualifique oportunidades sem perder contexto de contato, potencial e próxima ação." actions={<B2BNewLeadAction/>}/><B2BSubnav/><section className="stats-grid b2b-stats"><StatCard label="Leads na base" value={String(b2bLeads.length)} detail={`${active.length} em andamento`} icon="users" tone="green"/><StatCard label="Qualificados+" value={String(qualified.length)} detail="qualificação concluída" icon="check" tone="orange"/><StatCard label="Potencial aberto" value={formatCurrency(totalPotential)} detail="estimativa demonstrativa" icon="chart" tone="green"/><StatCard label="Convertidos" value={String(b2bLeads.filter((lead) => lead.stage === "won").length)} detail="viraram parceiros" icon="handshake" tone="orange"/></section><B2BLeadsView leads={b2bLeads}/><p className="demo-note">Dados comerciais demonstrativos. Telefones e e-mails estão mascarados ou usam example.com.</p></div>;
}
