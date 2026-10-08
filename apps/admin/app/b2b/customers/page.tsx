import { B2BCustomersView } from "../../../components/b2b-customers-view";
import { B2BSubnav } from "../../../components/b2b-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { ButtonLink } from "../../../components/ui";
import { b2bClients, b2bPriceTables } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function B2BCustomersPage() {
  const active = b2bClients.filter((client) => client.status === "active").length;
  const revenue = b2bClients.reduce((sum, client) => sum + client.revenueCents, 0);
  const orders = b2bClients.reduce((sum, client) => sum + client.orderCount, 0);
  return <div className="page-stack b2b-page"><PageHeader eyebrow="Revenda / Parceiros" title="Clientes B2B" description="Condições comerciais, histórico e relacionamento dos pontos de venda aprovados." actions={<ButtonLink href="/b2b/pricing" variant="secondary" icon="tag">Tabelas comerciais</ButtonLink>}/><B2BSubnav/><section className="stats-grid b2b-stats"><StatCard label="Parceiros" value={String(b2bClients.length)} detail={`${active} ativos`} icon="handshake" tone="green"/><StatCard label="Pedidos acumulados" value={String(orders)} detail="base demonstrativa" icon="orders" tone="orange"/><StatCard label="Faturamento acumulado" value={formatCurrency(revenue)} detail="histórico dos parceiros" icon="wallet" tone="green"/><StatCard label="Tabelas em uso" value={String(b2bPriceTables.filter((table) => table.clientCount > 0).length)} detail="condições comerciais" icon="tag" tone="orange"/></section><B2BCustomersView clients={b2bClients} priceTables={b2bPriceTables}/><p className="demo-note">Clientes e condições B2B nesta versão são dados de demonstração.</p></div>;
}
