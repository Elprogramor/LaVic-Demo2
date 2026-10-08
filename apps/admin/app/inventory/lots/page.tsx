import { InventoryLotsView } from "../../../components/inventory-lots-view";
import { InventorySubnav } from "../../../components/inventory-subnav";
import { PageHeader } from "../../../components/page-header";
import { ButtonLink } from "../../../components/ui";
import { inventoryLots } from "../../../data/mock-admin";

export default function InventoryLotsPage() {
  return (
    <div className="page-stack inventory-page">
      <PageHeader
        eyebrow="Estoque / Lotes"
        title="Lotes"
        description="Acompanhe produção, validade, disponibilidade e bloqueios com prioridade FEFO."
        actions={<><ButtonLink href="/inventory/count" variant="secondary" icon="clipboard">Conferir estoque</ButtonLink><ButtonLink href="/inventory/movements" icon="plus">Registrar entrada</ButtonLink></>}
      />
      <InventorySubnav/>
      <InventoryLotsView lots={inventoryLots}/>
      <p className="demo-note">Lotes e datas são demonstrativos. Informações reais de produção e validade devem ser validadas na operação.</p>
    </div>
  );
}
