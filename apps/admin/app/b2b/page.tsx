import { B2BNewLeadAction } from "../../components/b2b-new-lead-action";
import { B2BPipelineView } from "../../components/b2b-pipeline-view";
import { B2BSubnav } from "../../components/b2b-subnav";
import { PageHeader } from "../../components/page-header";
import { StatCard } from "../../components/stat-card";
import { ButtonLink, Panel } from "../../components/ui";
import { b2bClients, b2bLeads } from "../../data/mock-admin";
import { formatCurrency, formatDateTime } from "../../lib/format";
import { Icon } from "../../components/icon";

export default function B2BPipelinePage() {
  const openLeads = b2bLeads.filter((lead) => !["won", "lost"].includes(lead.stage));
  const openPotential = openLeads.reduce((sum, lead) => sum + lead.potentialCents, 0);
  const proposalOrNegotiation = b2bLeads.filter((lead) => ["proposal", "negotiation"].includes(lead.stage)).length;
  const nextActions = openLeads.filter((lead) => lead.nextActionAt).sort((a, b) => (a.nextActionAt ?? "").localeCompare(b.nextActionAt ?? "")).slice(0, 4);
  return (
    <div className="page-stack b2b-page">
      <PageHeader eyebrow="Comercial / Revenda" title="Pipeline B2B" description="Oportunidades, próximos contatos e evolução comercial em uma única visão." actions={<><ButtonLink href="/b2b/customers" variant="secondary" icon="handshake">Ver parceiros</ButtonLink><B2BNewLeadAction/></>}/>
      <B2BSubnav/>
      <section className="stats-grid b2b-stats" aria-label="Indicadores B2B">
        <StatCard label="Oportunidades abertas" value={String(openLeads.length)} detail="pipeline em andamento" icon="handshake" tone="green"/>
        <StatCard label="Potencial aberto" value={formatCurrency(openPotential)} detail="estimativa demonstrativa" icon="chart" tone="orange"/>
        <StatCard label="Proposta / negociação" value={String(proposalOrNegotiation)} detail="pedem acompanhamento" icon="message" tone="orange"/>
        <StatCard label="Parceiros ativos" value={String(b2bClients.filter((client) => client.status === "active").length)} detail="clientes B2B ativos" icon="users" tone="green"/>
      </section>
      <div className="b2b-pipeline-layout">
        <div className="b2b-pipeline-main"><B2BPipelineView leads={b2bLeads}/></div>
        <aside className="b2b-action-sidebar">
          <Panel title="Próximas ações" action={<ButtonLink href="/b2b/leads" variant="ghost">Ver leads</ButtonLink>}>
            <div className="b2b-next-actions">{nextActions.map((lead) => <a href={`/b2b/leads/${lead.id}`} key={lead.id}><span className="b2b-action-icon"><Icon name="clock" size={14}/></span><div><strong>{lead.company}</strong><small>{lead.nextActionAt ? formatDateTime(lead.nextActionAt) : "Sem data"}</small></div><Icon name="chevronRight" size={14}/></a>)}</div>
          </Panel>
          <Panel title="Princípio comercial">
            <div className="b2b-principles"><p><Icon name="check" size={13}/>Lead e cliente B2B têm contextos separados.</p><p><Icon name="check" size={13}/>Preço comercial vem de tabela autorizada.</p><p><Icon name="check" size={13}/>Mudanças relevantes deixam histórico.</p></div>
          </Panel>
        </aside>
      </div>
      <p className="demo-note">Empresas, contatos, valores e condições nesta etapa são exclusivamente demonstrativos.</p>
    </div>
  );
}
