import Link from "next/link";
import type { AdminCustomer, CustomerInteraction } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon, type IconName } from "./icon";

const interactionIcons: Record<CustomerInteraction["type"], IconName> = {
  order: "orders",
  message: "message",
  coupon: "tag",
  note: "edit",
  profile: "users",
};

export function CustomerCrmView({ interactions, customers }: { interactions: CustomerInteraction[]; customers: AdminCustomer[] }) {
  const byId = new Map(customers.map((customer) => [customer.id, customer]));
  const attention = customers.filter((customer) => customer.segments.includes("at_risk") || customer.segments.includes("b2b_potential"));

  return (
    <div className="crm-layout">
      <section className="panel crm-feed-panel">
        <div className="panel-header"><h2>Atividade recente</h2><span className="crm-live-label"><i/> CRM ativo</span></div>
        <div className="crm-feed">
          {interactions.map((interaction) => {
            const customer = byId.get(interaction.customerId);
            if (!customer) return null;
            return <article className="crm-feed-item" key={interaction.id}><span className={`crm-event-icon event-${interaction.type}`}><Icon name={interactionIcons[interaction.type]} size={15}/></span><div className="crm-event-copy"><div className="crm-event-meta"><Link href={`/customers/${customer.id}`}>{customer.name}</Link><span>·</span><time>{formatDateTime(interaction.createdAt)}</time>{interaction.private ? <span className="private-label">Somente equipe</span> : null}</div><strong>{interaction.title}</strong><p>{interaction.description}</p><small>{interaction.actor}{interaction.reference ? ` · ${interaction.reference}` : ""}</small></div></article>;
          })}
        </div>
      </section>

      <aside className="crm-sidebar">
        <section className="panel crm-attention-panel">
          <div className="panel-header"><h2>Próximas ações</h2><span className="crm-count">{attention.length}</span></div>
          <div className="crm-attention-list">
            {attention.map((customer) => <Link href={`/customers/${customer.id}`} key={customer.id} className="crm-attention-row"><span className="customer-avatar">{customer.code.slice(-2)}</span><div><strong>{customer.name}</strong><small>{customer.segments.includes("at_risk") ? "Reativação sugerida" : "Avaliar oportunidade B2B"}</small></div><Icon name="chevronRight" size={14}/></Link>)}
          </div>
        </section>

        <section className="panel crm-principles-panel">
          <div className="panel-header"><h2>Contexto do relacionamento</h2></div>
          <div className="crm-principles"><p><Icon name="check" size={13}/>Interações ficam vinculadas ao cliente.</p><p><Icon name="check" size={13}/>Notas internas nunca aparecem no storefront.</p><p><Icon name="check" size={13}/>Segmentos orientam ações; não substituem consentimento.</p></div>
        </section>
      </aside>
    </div>
  );
}
