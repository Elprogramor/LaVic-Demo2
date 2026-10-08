import { CustomersSubnav } from "../../components/customers-subnav";
import { CustomersView } from "../../components/customers-view";
import { PageHeader } from "../../components/page-header";
import { StatCard } from "../../components/stat-card";
import { ButtonLink } from "../../components/ui";
import { customers } from "../../data/mock-admin";
import type { CustomerSegmentKey } from "../../lib/types";

const allowedSegments: CustomerSegmentKey[] = ["new", "recurrent", "vip", "at_risk", "inactive", "b2b_potential"];

export default async function CustomersPage({ searchParams }: { searchParams: Promise<{ segment?: string }> }) {
  const params = await searchParams;
  const initialSegment = allowedSegments.includes(params.segment as CustomerSegmentKey) ? params.segment as CustomerSegmentKey : "all";
  const recurring = customers.filter((customer) => customer.segments.includes("recurrent")).length;
  const newCustomers = customers.filter((customer) => customer.segments.includes("new")).length;
  const atRisk = customers.filter((customer) => customer.segments.includes("at_risk")).length;
  const totalSpent = customers.reduce((sum, customer) => sum + customer.totalSpentCents, 0);

  return (
    <div className="page-stack customers-page">
      <PageHeader eyebrow="Relacionamento / Clientes" title="Clientes" description="Uma visão única de compra, relacionamento e contexto de cada cliente LaVic." actions={<><ButtonLink href="/customers/crm" variant="secondary" icon="message">Abrir CRM</ButtonLink><ButtonLink href="/coming-soon?module=Novo%20cliente" icon="plus">Novo cliente</ButtonLink></>}/>
      <CustomersSubnav/>
      <section className="stats-grid customer-stats" aria-label="Indicadores de clientes">
        <StatCard label="Clientes na base" value={String(customers.length)} detail={`${newCustomers} novos`} icon="users" tone="green"/>
        <StatCard label="Recorrentes" value={String(recurring)} detail="frequência consolidada" icon="orders" tone="orange"/>
        <StatCard label="Em risco" value={String(atRisk)} detail="pedem acompanhamento" icon="alert" tone="orange"/>
        <StatCard label="Valor acumulado" value={new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(totalSpent / 100)} detail="base demonstrativa" icon="wallet" tone="green"/>
      </section>
      <CustomersView customers={customers} initialSegment={initialSegment}/>
      <p className="demo-note">Dados demonstrativos. Nenhum contato ou endereço representa uma pessoa real.</p>
    </div>
  );
}
