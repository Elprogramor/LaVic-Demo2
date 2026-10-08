import { B2BOrdersView } from "../../../components/b2b-orders-view";
import { B2BSubnav } from "../../../components/b2b-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { ButtonLink } from "../../../components/ui";
import { b2bOrders } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function B2BOrdersPage() {
  const open = b2bOrders.filter((order) => !["delivered", "cancelled"].includes(order.status));
  const revenue = b2bOrders.reduce((sum, order) => sum + order.totalCents, 0);
  const units = b2bOrders.reduce((sum, order) => sum + order.itemCount, 0);
  const awaiting = b2bOrders.filter((order) => order.status === "awaiting_approval").length;
  return <div className="page-stack b2b-page"><PageHeader eyebrow="Revenda / Pedidos B2B" title="Pedidos B2B" description="Acompanhe volume, condição comercial e execução dos pedidos de parceiros." actions={<ButtonLink href="/coming-soon?module=Novo%20pedido%20B2B" icon="plus">Novo pedido B2B</ButtonLink>}/><B2BSubnav/><section className="stats-grid b2b-stats"><StatCard label="Pedidos em fluxo" value={String(open.length)} detail={`${awaiting} aguardando aprovação`} icon="orders" tone="orange"/><StatCard label="Volume listado" value={`${units} un.`} detail="base demonstrativa" icon="boxes" tone="green"/><StatCard label="Valor listado" value={formatCurrency(revenue)} detail="pedidos exibidos" icon="wallet" tone="green"/><StatCard label="Entregues" value={String(b2bOrders.filter((order) => order.status === "delivered").length)} detail="fluxo concluído" icon="check" tone="orange"/></section><B2BOrdersView orders={b2bOrders}/><p className="demo-note">Pedidos B2B demonstrativos. A API futura recalculará preços e condições antes de confirmar cada venda.</p></div>;
}
