import { InventoryCountView } from "../../../components/inventory-count-view";
import { InventorySubnav } from "../../../components/inventory-subnav";
import { PageHeader } from "../../../components/page-header";
import { inventoryCountRows } from "../../../data/mock-admin";

export default function InventoryCountPage() {
  return (
    <div className="page-stack inventory-page">
      <PageHeader eyebrow="Estoque / Inventário" title="Inventário" description="Confronte o saldo físico com o sistema antes de gerar qualquer ajuste de estoque." />
      <InventorySubnav/>
      <InventoryCountView rows={inventoryCountRows}/>
      <p className="demo-note">Contagem demonstrativa e sem persistência. A conclusão real exigirá autorização, motivo e registro de auditoria.</p>
    </div>
  );
}
