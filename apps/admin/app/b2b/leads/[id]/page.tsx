import Link from "next/link";
import { notFound } from "next/navigation";
import { B2BBadge } from "../../../../components/b2b-badge";
import { B2BSubnav } from "../../../../components/b2b-subnav";
import { Icon, type IconName } from "../../../../components/icon";
import { ButtonLink, Panel } from "../../../../components/ui";
import { b2bActivities, b2bLeads, customers } from "../../../../data/mock-admin";
import { b2bPipelineStages, b2bStageLabels } from "../../../../lib/b2b";
import { formatCurrency, formatDateOnly, formatDateTime } from "../../../../lib/format";
import type { B2BActivityType } from "../../../../lib/types";

const activityIcons: Record<B2BActivityType, IconName> = { created: "plus", contact: "phone", note: "edit", proposal: "tag", stage: "swap", order: "orders" };

export default async function B2BLeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const lead = b2bLeads.find((item) => item.id === id);
  if (!lead) notFound();
  const activities = b2bActivities.filter((item) => item.leadId === lead.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const linkedCustomer = lead.customerId ? customers.find((customer) => customer.id === lead.customerId) : undefined;
  const currentStageIndex = b2bPipelineStages.indexOf(lead.stage);
  return <div className="page-stack b2b-page"><div className="b2b-detail-head"><div><Link className="page-eyebrow b2b-back-link" href="/b2b/leads">← Revenda / Leads</Link><div className="b2b-title-row"><h1>{lead.company}</h1><B2BBadge kind="stage" value={lead.stage}/></div><p>{lead.code} · {lead.businessType} · {lead.city}/{lead.state}</p></div><div className="page-actions"><ButtonLink href="/b2b/leads" variant="secondary">Voltar</ButtonLink><ButtonLink href="/coming-soon?module=Atualizar%20lead%20B2B" icon="edit">Atualizar oportunidade</ButtonLink></div></div><B2BSubnav/>
    <section className="b2b-stage-progress" aria-label="Etapas comerciais">{b2bPipelineStages.map((stage, index) => <div className={`${index <= currentStageIndex ? "done" : ""} ${stage === lead.stage ? "current" : ""}`} key={stage}><span>{index < currentStageIndex ? <Icon name="check" size={12}/> : index + 1}</span><small>{b2bStageLabels[stage]}</small></div>)}</section>
    <section className="b2b-lead-summary"><div><span>Potencial mensal</span><strong>{formatCurrency(lead.potentialCents)}</strong><small>{lead.estimatedMonthlyUnits} unidades estimadas</small></div><div><span>Último contato</span><strong>{lead.lastContactAt ? formatDateOnly(lead.lastContactAt) : "Ainda não realizado"}</strong><small>{lead.owner}</small></div><div><span>Próxima ação</span><strong>{lead.nextActionAt ? formatDateTime(lead.nextActionAt) : "Não agendada"}</strong><small>manter o pipeline acionável</small></div><div><span>Origem</span><strong>{lead.source}</strong><small>criado em {formatDateOnly(lead.createdAt)}</small></div></section>
    <div className="b2b-detail-layout"><main className="b2b-detail-main"><Panel title="Histórico comercial"><div className="b2b-activity-list">{activities.length ? activities.map((activity) => <article key={activity.id}><span className={`b2b-activity-icon activity-${activity.type}`}><Icon name={activityIcons[activity.type]} size={14}/></span><div><div className="b2b-activity-meta"><time>{formatDateTime(activity.createdAt)}</time><span>·</span><small>{activity.actor}</small></div><strong>{activity.title}</strong><p>{activity.description}</p></div></article>) : <div className="table-empty">Nenhuma atividade registrada para esta oportunidade.</div>}</div></Panel><Panel title="Produtos de interesse"><div className="b2b-interest-products">{lead.interestedProducts.map((product) => <div key={product}><span className="b2b-interest-icon"><Icon name="box" size={15}/></span><div><strong>{product}</strong><small>interesse comercial demonstrativo</small></div></div>)}</div></Panel>{lead.notes ? <Panel title="Notas comerciais"><p className="b2b-note-copy">{lead.notes}</p></Panel> : null}</main>
      <aside className="b2b-detail-aside"><Panel title="Contato"><dl className="customer-contact-list"><div><dt><Icon name="users" size={13}/>Responsável</dt><dd>{lead.contactName}</dd></div><div><dt><Icon name="phone" size={13}/>WhatsApp</dt><dd>{lead.phone}</dd></div><div><dt><Icon name="mail" size={13}/>E-mail</dt><dd>{lead.email}</dd></div><div><dt><Icon name="store" size={13}/>Negócio</dt><dd>{lead.businessType}</dd></div></dl></Panel><Panel title="Responsabilidade"><div className="b2b-owner-card"><span className="avatar">EC</span><div><strong>{lead.owner}</strong><small>responsável pela oportunidade</small></div></div></Panel>{linkedCustomer ? <Panel title="Vínculo B2C"><div className="b2b-linked-customer"><div><strong>{linkedCustomer.name}</strong><small>{linkedCustomer.code} · {linkedCustomer.orderCount} pedidos B2C</small></div><Link href={`/customers/${linkedCustomer.id}`}>Abrir perfil <Icon name="chevronRight" size={13}/></Link></div></Panel> : null}</aside></div>
    <p className="demo-note">Lead demonstrativo. Nenhum contato representa uma empresa real.</p>
  </div>;
}
