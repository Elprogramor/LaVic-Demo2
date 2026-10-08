import { B2BPricingView } from "../../../components/b2b-pricing-view";
import { B2BSubnav } from "../../../components/b2b-subnav";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { ButtonLink } from "../../../components/ui";
import { b2bPriceTables } from "../../../data/mock-admin";
import { formatCurrency } from "../../../lib/format";

export default function B2BPricingPage() {
  const minimum = Math.min(...b2bPriceTables.map((table) => table.minimumOrderCents));
  const clients = b2bPriceTables.reduce((sum, table) => sum + table.clientCount, 0);
  return <div className="page-stack b2b-page"><PageHeader eyebrow="Revenda / Condições" title="Tabelas comerciais" description="Centralize preço B2B, pedido mínimo e condições autorizadas sem misturar regras do varejo." actions={<ButtonLink href="/coming-soon?module=Nova%20tabela%20B2B" icon="plus">Nova tabela</ButtonLink>}/><B2BSubnav/><section className="stats-grid b2b-stats"><StatCard label="Tabelas ativas" value={String(b2bPriceTables.filter((table) => table.status === "active").length)} detail="condições disponíveis" icon="tag" tone="green"/><StatCard label="Parceiros vinculados" value={String(clients)} detail="com tabela atribuída" icon="handshake" tone="orange"/><StatCard label="Menor pedido mínimo" value={formatCurrency(minimum)} detail="entre tabelas atuais" icon="orders" tone="green"/><StatCard label="Produtos precificados" value={String(new Set(b2bPriceTables.flatMap((table) => table.entries.map((entry) => entry.productId))).size)} detail="SKUs comerciais" icon="box" tone="orange"/></section><B2BPricingView tables={b2bPriceTables}/><p className="demo-note">Valores de revenda nesta versão servem apenas para validar UI e regras de arquitetura.</p></div>;
}
