import { PageHeader } from "../../../components/page-header";
import { PreordersView } from "../../../components/preorders-view";
import { SalesSubnav } from "../../../components/sales-subnav";
import { StatCard } from "../../../components/stat-card";
import { Button } from "../../../components/ui";
import { preorders } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function PreordersPage() {
  const pendingConfirmation = preorders.filter((item) => item.status === "awaiting_confirmation").length;
  const scheduled = preorders.filter((item) => ["confirmed", "scheduled", "preparing", "ready"].includes(item.status)).length;
  const paymentAttention = preorders.filter((item) => ["pending", "partial"].includes(item.paymentStatus)).length;
  const openValue = preorders.filter((item) => !["completed", "cancelled"].includes(item.status)).reduce((sum, item) => sum + item.totalCents, 0);
  return <div className="page-stack core-commerce-page preorders-page">
    <PageHeader eyebrow="Vendas / Encomendas" title="Encomendas" description="Organize pedidos programados, confirmações, pagamentos e retirada ou entrega em uma fila própria." actions={<Button icon="plus" disabled title="Criação persistente será ativada com a API">Nova encomenda</Button>}/>
    <SalesSubnav/>
    <div className="stats-grid core-commerce-stats"><StatCard label="A confirmar" value={String(pendingConfirmation)} detail="Precisam de retorno" icon="message" tone="orange"/><StatCard label="Programadas" value={String(scheduled)} detail="Em fluxo operacional" icon="calendar"/><StatCard label="Pagamento em atenção" value={String(paymentAttention)} detail="Pendente ou parcial" icon="card" tone="orange"/><StatCard label="Valor em aberto" value={formatCurrency(openValue)} detail="Encomendas não concluídas" icon="wallet"/></div>
    <div className="core-context-note"><IconCopy/><p><strong>Encomenda não é pedido imediato.</strong> Ela mantém uma data desejada, confirmação e preparação programada. A futura API poderá convertê-la em pedido sem duplicar cliente ou itens.</p></div>
    <PreordersView items={preorders}/>
  </div>;
}

function IconCopy() { return <span className="core-context-icon">ENC</span>; }
