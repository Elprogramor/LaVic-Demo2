import Link from "next/link";
import { notFound } from "next/navigation";
import { customers, orders } from "../../../data/mock-admin";
import { formatCurrency, formatShortDate } from "../../../lib/format";
import { StatusBadge } from "../../../components/status-badge";
import { Button } from "../../../components/ui";
import { Icon } from "../../../components/icon";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = orders.find((item) => item.id === id);
  if (!order) notFound();
  const customerProfile = customers.find((customer) => customer.name === order.customerName);

  return (
    <div className="page-stack order-detail-page">
      <div className="detail-breadcrumb"><Link href="/orders">← Pedidos</Link><span>/</span><span>#{order.code}</span></div>

      <header className="detail-header">
        <div><div className="detail-title-row"><h1>Pedido #{order.code}</h1><StatusBadge status={order.status}/></div><p>Criado em {formatShortDate(order.createdAt)}</p></div>
        <div className="page-actions"><Button variant="secondary">Alterar status <Icon name="chevronDown" size={14}/></Button><Button variant="secondary" icon="edit">Editar pedido</Button><button className="row-action detail-more" aria-label="Mais ações"><Icon name="more" size={18}/></button></div>
      </header>

      <div className="order-detail-layout">
        <div className="order-detail-main">
          <section className="panel detail-panel">
            <div className="panel-header"><h2>Informações do pedido</h2>{customerProfile ? <Link href={`/customers/${customerProfile.id}`} className="text-link">Ver perfil</Link> : null}</div>
            <dl className="detail-definition-grid">
              <div><dt>Cliente</dt><dd>{order.customerName}</dd></div>
              <div><dt>Contato</dt><dd>(24) 99999-1234</dd></div>
              <div><dt>Entrega</dt><dd>{order.deliveryMode === "pickup" ? "Retirada" : order.address ?? "Entrega local"}</dd></div>
              <div><dt>Canal</dt><dd>{channelLabel(order.channel)}</dd></div>
              <div><dt>Pagamento</dt><dd>{order.paymentMethod} · <span className={order.paymentStatus === "approved" ? "inline-success" : "inline-warning"}>{order.paymentStatus === "approved" ? "aprovado" : "pendente"}</span></dd></div>
              <div><dt>Valor total</dt><dd><strong>{formatCurrency(order.totalCents)}</strong></dd></div>
              <div className="full"><dt>Observações</dt><dd>{order.notes ?? "—"}</dd></div>
            </dl>
          </section>

          <section className="panel detail-panel">
            <div className="panel-header"><h2>Itens</h2></div>
            <div className="table-shell detail-items-shell"><table className="data-table detail-items-table"><thead><tr><th>Produto</th><th>Quantidade</th><th>Preço unitário</th><th>Total</th></tr></thead><tbody>{order.items.map((item) => <tr key={item.id}><td><div className="product-cell"><span className="product-thumb"><Icon name="box" size={15}/></span><div><strong>{item.name}</strong><small>SKU: {item.sku}</small></div></div></td><td>{item.quantity}</td><td>{formatCurrency(item.unitPriceCents)}</td><td>{formatCurrency(item.unitPriceCents * item.quantity)}</td></tr>)}</tbody></table></div>
          </section>

          <section className="panel detail-panel internal-note-panel">
            <div className="panel-header"><h2>Observações internas</h2><span className="private-label">Somente equipe</span></div>
            <div className="note-compose"><textarea placeholder="Adicionar uma observação..." maxLength={500}/><Button>Salvar</Button></div>
          </section>
        </div>

        <aside className="order-detail-aside">
          <section className="panel summary-panel">
            <div className="panel-header"><h2>Resumo</h2><button className="small-action"><Icon name="print" size={14}/> Imprimir</button></div>
            <div className="summary-list"><div><span>{order.itemCount} itens</span><strong/></div><div><span>Subtotal</span><strong>{formatCurrency(order.subtotalCents)}</strong></div><div><span>Frete</span><strong>{formatCurrency(order.shippingCents)}</strong></div><div><span>Desconto</span><strong>{formatCurrency(order.discountCents)}</strong></div><div className="summary-total"><span>Total</span><strong>{formatCurrency(order.totalCents)}</strong></div></div>
          </section>

          <section className="panel timeline-panel">
            <div className="panel-header"><h2>Timeline</h2></div>
            <div className="timeline">
              <TimelineItem time="14:32" title="Pedido confirmado" description="Pagamento aprovado (PIX)" active/>
              <TimelineItem time="14:30" title="Pagamento aprovado" description="Comprovante recebido"/>
              <TimelineItem time="14:28" title="Pedido criado" description="Cliente finalizou a compra"/>
            </div>
          </section>

          <section className="panel action-panel">
            <div className="panel-header"><h2>Ações</h2></div>
            <div className="action-list"><button><Icon name="message" size={15}/>Enviar mensagem para o cliente</button><button className="danger"><Icon name="close" size={15}/>Cancelar pedido</button><button className="danger"><Icon name="refund" size={15}/>Reembolsar pagamento</button><button><Icon name="archive" size={15}/>Arquivar pedido</button></div>
          </section>
        </aside>
      </div>
    </div>
  );
}

function TimelineItem({ time, title, description, active = false }: { time: string; title: string; description: string; active?: boolean }) {
  return <div className={`timeline-item ${active ? "active" : ""}`}><span className="timeline-dot"><Icon name="check" size={10}/></span><time>{time}</time><div><strong>{title}</strong><p>{description}</p></div></div>;
}

function channelLabel(channel: (typeof orders)[number]["channel"]) {
  return { storefront: "Loja online", whatsapp: "WhatsApp", b2b: "Revenda/B2B", manual: "Pedido manual" }[channel];
}
