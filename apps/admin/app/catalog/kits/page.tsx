import { CatalogSubnav } from "../../../components/catalog-subnav";
import { KitsView } from "../../../components/kits-view";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { Button } from "../../../components/ui";
import { catalogKits } from "../../../data/mock-admin";

function availability(components: (typeof catalogKits)[number]["components"]) { return Math.min(...components.map((item) => Math.floor(item.availableStock / item.quantity))); }

export default function KitsPage() {
  return <div className="page-stack core-commerce-page kits-page">
    <PageHeader eyebrow="Catálogo / Kits" title="Kits" description="Monte combinações vendáveis cuja disponibilidade deriva do estoque real de cada componente." actions={<Button icon="plus" disabled title="Criação persistente será ativada com a API">Novo kit</Button>}/>
    <CatalogSubnav/>
    <div className="stats-grid core-commerce-stats"><StatCard label="Kits configurados" value={String(catalogKits.length)} detail="Base demonstrativa" icon="layers"/><StatCard label="Ativos" value={String(catalogKits.filter((item) => item.status === "active").length)} detail="Prontos para canais permitidos" icon="check"/><StatCard label="Baixa disponibilidade" value={String(catalogKits.filter((item) => availability(item.components) <= 4).length)} detail="Componente limitante" icon="alert" tone="orange"/><StatCard label="B2B habilitado" value={String(catalogKits.filter((item) => item.channels.includes("B2B")).length)} detail="Condições ainda demonstrativas" icon="handshake" tone="neutral"/></div>
    <KitsView items={catalogKits}/>
  </div>;
}
