import Link from "next/link";
import { notFound } from "next/navigation";
import { B2BBadge } from "../../../../components/b2b-badge";
import { B2BSubnav } from "../../../../components/b2b-subnav";
import { Icon } from "../../../../components/icon";
import { ButtonLink, Panel } from "../../../../components/ui";
import { b2bClients, b2bOrders, b2bPriceTables } from "../../../../data/mock-admin";
import { formatCurrency, formatDateOnly, formatDateTime } from "../../../../lib/format";

export default async function B2BCustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = b2bClients.find((item) => item.id === id);
  if (!client) notFound();
  const table = b2bPriceTables.find((item) => item.id === client.priceTableId);
  const orders = b2bOrders.filter((order) => order.clientId === client.id).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  const average = client.orderCount ? Math.round(client.revenueCents / client.orderCount) : 0;
  return <div className="page-stack b2b-page"><div className="b2b-detail-head"><div><Link className="page-eyebrow b2b-back-link" href="/b2b/customers">← Revenda / Clientes B2B</Link><div className="b2b-title-row"><h1>{client.company}</h1><B2BBadge kind="client" value={client.status}/></div><p>{client.code} · {client.city}/{client.state} · cadastro {formatDateOnly(client.createdAt)}</p></div><div className="page-actions"><ButtonLink href="/b2b/customers" variant="secondary">Voltar</ButtonLink><ButtonLink href="/coming-soon?module=Editar%20cliente%20B2B" icon="edit">Editar condições</ButtonLink></div></div><B2BSubnav/>
    <section className="b2b-lead-summary"><div><span>Pedidos</span><strong>{client.orderCount}</strong><small>histórico acumulado</small></div><div><span>Faturamento</span><strong>{formatCurrency(client.revenueCents)}</strong><small>base demonstrativa</small></div><div><span>Ticket médio</span><strong>{formatCurrency(average)}</strong><small>por pedido B2B</small></div><div><span>Última compra</span><strong>{client.lastOrderAt ? formatDateOnly(client.lastOrderAt) : "—"}</strong><small>{client.paymentTerms}</small></div></section>
    <div className="b2b-detail-layout"><main className="b2b-detail-main"><Panel title="Pedidos recentes" action={<ButtonLink href="/b2b/orders" variant="ghost">Ver todos</ButtonLink>}><div className="b2b-client-orders">{orders.length ? orders.map((order) => <article key={order.id}><div><strong>{order.code}</strong><small>{formatDateTime(order.createdAt)} · {order.itemCount} unidades</small></div><strong>{formatCurrency(order.totalCents)}</strong><B2BBadge kind="order" value={order.status}/></article>) : <div className="table-empty">Nenhum pedido demonstrativo vinculado.</div>}</div></Panel><Panel title="Produtos autorizados"><div className="b2b-interest-products">{client.allowedProducts.map((product) => <div key={product}><span className="b2b-interest-icon"><Icon name="check" size={15}/></span><div><strong>{product}</strong><small>disponível para este parceiro</small></div></div>)}</div></Panel></main>
      <aside className="b2b-detail-aside"><Panel title="Condição comercial"><dl className="customer-contact-list"><div><dt><Icon name="tag" size={13}/>Tabela</dt><dd>{table?.name ?? "Sem tabela"}</dd></div><div><dt><Icon name="wallet" size={13}/>Pedido mínimo</dt><dd>{formatCurrency(client.minimumOrderCents)}</dd></div><div><dt><Icon name="card" size={13}/>Pagamento</dt><dd>{client.paymentTerms}</dd></div><div><dt><Icon name="archive" size={13}/>Documento</dt><dd>{client.documentMasked}</dd></div></dl></Panel><Panel title="Contato"><dl className="customer-contact-list"><div><dt><Icon name="users" size={13}/>Responsável</dt><dd>{client.contactName}</dd></div><div><dt><Icon name="phone" size={13}/>WhatsApp</dt><dd>{client.phone}</dd></div><div><dt><Icon name="mail" size={13}/>E-mail</dt><dd>{client.email}</dd></div></dl></Panel><Panel title="Regra de preço"><div className="b2b-price-policy compact"><Icon name="alert" size={15}/><p>Condições exibidas no Admin não substituem a validação de preço e permissão pela API.</p></div></Panel></aside></div><p className="demo-note">Parceiro demonstrativo. Documento, contato e valores não representam dados reais.</p>
  </div>;
}
