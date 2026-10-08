import Link from "next/link";
import { notFound } from "next/navigation";
import { CustomerNoteComposer } from "../../../components/customer-note-composer";
import { Icon } from "../../../components/icon";
import { StatusBadge } from "../../../components/status-badge";
import { ButtonLink, Panel } from "../../../components/ui";
import { customerInteractions, customers, orders } from "../../../data/mock-admin";
import { formatCurrency, formatDateOnly, formatDateTime } from "../../../lib/format";
import type { CustomerInteractionType, CustomerOrigin, CustomerSegmentKey } from "../../../lib/types";

const segmentLabels: Record<CustomerSegmentKey, string> = { new: "Novo", recurrent: "Recorrente", vip: "VIP", at_risk: "Em risco", inactive: "Inativo", b2b_potential: "Potencial B2B" };
const originLabels: Record<CustomerOrigin, string> = { storefront: "Loja online", whatsapp: "WhatsApp", event: "Evento", manual: "Manual" };
const eventIcons: Record<CustomerInteractionType, "orders" | "message" | "tag" | "edit" | "users"> = { order: "orders", message: "message", coupon: "tag", note: "edit", profile: "users" };

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = customers.find((item) => item.id === id);
  if (!customer) notFound();
  const history = customerInteractions.filter((item) => item.customerId === customer.id).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const customerOrders = orders.filter((order) => order.customerName === customer.name).slice(0, 5);

  return (
    <div className="page-stack customer-detail-page">
      <div className="detail-breadcrumb"><Link href="/customers">← Clientes</Link><span>/</span><span>{customer.code}</span></div>
      <header className="customer-profile-header">
        <div className="customer-profile-identity"><span className="customer-profile-avatar">{customer.code.slice(-2)}</span><div><div className="customer-profile-title"><h1>{customer.name}</h1><StatusBadge status={customer.status}/></div><p>{customer.code} · cliente desde {formatDateOnly(customer.createdAt)}</p><div className="segment-list">{customer.segments.map((segment) => <span className={`segment-pill segment-${segment}`} key={segment}>{segmentLabels[segment]}</span>)}</div></div></div>
        <div className="page-actions"><ButtonLink href="/orders" variant="secondary" icon="orders">Ver pedidos</ButtonLink><ButtonLink href="/coming-soon?module=Novo%20pedido" icon="plus">Novo pedido</ButtonLink></div>
      </header>

      <section className="customer-profile-metrics" aria-label="Resumo do cliente"><div><span>Pedidos</span><strong>{customer.orderCount}</strong></div><div><span>Total gasto</span><strong>{formatCurrency(customer.totalSpentCents)}</strong></div><div><span>Ticket médio</span><strong>{formatCurrency(customer.averageTicketCents)}</strong></div><div><span>Última compra</span><strong>{customer.lastOrderAt ? formatDateOnly(customer.lastOrderAt) : "—"}</strong></div></section>

      <div className="customer-detail-layout">
        <div className="customer-detail-main">
          <Panel title="Timeline do relacionamento" action={<span className="private-context">Contexto unificado</span>}>
            <div className="customer-timeline">
              {history.length ? history.map((item) => <article className="customer-timeline-item" key={item.id}><span className={`customer-timeline-icon event-${item.type}`}><Icon name={eventIcons[item.type]} size={15}/></span><div><div className="customer-timeline-meta"><time>{formatDateTime(item.createdAt)}</time>{item.private ? <span className="private-label">Somente equipe</span> : null}</div><strong>{item.title}</strong><p>{item.description}</p><small>{item.actor}{item.reference ? ` · ${item.reference}` : ""}</small></div></article>) : <div className="customer-empty-section"><Icon name="message" size={18}/><strong>Nenhuma interação registrada</strong><span>As próximas compras e contatos aparecerão aqui.</span></div>}
            </div>
          </Panel>

          <Panel title="Pedidos recentes" action={<Link className="text-link" href="/orders">Ver todos</Link>}>
            {customerOrders.length ? <div className="customer-orders-list">{customerOrders.map((order) => <Link href={`/orders/${order.id}`} key={order.id}><div><strong>{order.code}</strong><span>{formatDateTime(order.createdAt)} · {order.itemCount} itens</span></div><strong>{formatCurrency(order.totalCents)}</strong><StatusBadge status={order.status}/><Icon name="chevronRight" size={14}/></Link>)}</div> : <div className="customer-empty-section compact"><strong>Nenhum pedido carregado nesta demonstração.</strong></div>}
          </Panel>

          <Panel title="Nova nota interna" action={<span className="private-label">Somente equipe</span>}><CustomerNoteComposer/></Panel>
        </div>

        <aside className="customer-detail-aside">
          <Panel title="Contato"><dl className="customer-contact-list"><div><dt><Icon name="phone" size={14}/>Telefone</dt><dd>{customer.phone}</dd></div><div><dt><Icon name="mail" size={14}/>E-mail</dt><dd>{customer.email}</dd></div><div><dt><Icon name="store" size={14}/>Origem</dt><dd>{originLabels[customer.origin]}</dd></div></dl></Panel>
          <Panel title="Preferências de contato"><div className="contact-preferences"><div><span>WhatsApp</span><strong className={customer.acceptsWhatsapp ? "allowed" : "blocked"}>{customer.acceptsWhatsapp ? "Autorizado" : "Não autorizado"}</strong></div><div><span>E-mail</span><strong className={customer.acceptsEmail ? "allowed" : "blocked"}>{customer.acceptsEmail ? "Autorizado" : "Não autorizado"}</strong></div></div></Panel>
          <Panel title="Endereços"><div className="customer-addresses">{customer.addresses.map((address) => <article key={address.id}><div><strong>{address.label}</strong>{address.primary ? <span>Principal</span> : null}</div><p>{address.address}<br/>{address.city} · {address.state}</p></article>)}</div></Panel>
          <Panel title="Preferência de produto"><div className="favorite-product"><span className="favorite-product-icon"><Icon name="box" size={16}/></span><div><strong>{customer.favoriteProduct ?? "Sem preferência definida"}</strong><span>baseado no histórico demonstrativo</span></div></div></Panel>
        </aside>
      </div>
    </div>
  );
}
