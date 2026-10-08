import { CustomerCrmView } from "../../../components/customer-crm-view";
import { CustomersSubnav } from "../../../components/customers-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { ButtonLink } from "../../../components/ui";
import { customerInteractions, customers } from "../../../data/mock-admin";

export default function CustomerCrmPage() {
  const privateNotes = customerInteractions.filter((item) => item.private).length;
  const b2bPotential = customers.filter((customer) => customer.segments.includes("b2b_potential")).length;
  const atRisk = customers.filter((customer) => customer.segments.includes("at_risk")).length;

  return (
    <div className="page-stack customer-crm-page">
      <PageHeader eyebrow="Relacionamento / Clientes" title="CRM" description="Acompanhe o histórico de relacionamento e as próximas ações sem perder o contexto de compra." actions={<ButtonLink href="/customers" variant="secondary" icon="users">Ver clientes</ButtonLink>}/>
      <CustomersSubnav/>
      <section className="stats-grid crm-stats" aria-label="Indicadores de CRM"><StatCard label="Interações registradas" value={String(customerInteractions.length)} detail="atividade demonstrativa" icon="message" tone="green"/><StatCard label="Em risco" value={String(atRisk)} detail="reativação sugerida" icon="alert" tone="orange"/><StatCard label="Potencial B2B" value={String(b2bPotential)} detail="avaliar oportunidade" icon="handshake" tone="orange"/><StatCard label="Notas internas" value={String(privateNotes)} detail="visíveis só para equipe" icon="edit" tone="green"/></section>
      <CustomerCrmView interactions={[...customerInteractions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())} customers={customers}/>
    </div>
  );
}
