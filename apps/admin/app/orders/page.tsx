import { PageHeader } from "../../components/page-header";
import { OrdersView } from "../../components/orders-view";
import { Button, ButtonLink } from "../../components/ui";
import { SalesSubnav } from "../../components/sales-subnav";
import { orders } from "../../data/mock-admin";

export default function OrdersPage() {
  return (
    <div className="page-stack orders-page">
      <PageHeader
        eyebrow="Vendas / Pedidos"
        title="Pedidos"
        description="Acompanhe e gerencie todas as vendas da LaVic."
        actions={<><Button variant="secondary" icon="export">Exportar</Button><ButtonLink href="/coming-soon?module=Novo%20pedido" icon="plus">Novo pedido</ButtonLink></>}
      />
      <SalesSubnav/>
      <OrdersView orders={orders}/>
    </div>
  );
}
