import { InventoryMovementsView } from "../../../components/inventory-movements-view";
import { InventorySubnav } from "../../../components/inventory-subnav";
import { PageHeader } from "../../../components/page-header";
import { inventoryLots, inventoryMovements } from "../../../data/mock-admin";

export default function InventoryMovementsPage() {
  return (
    <div className="page-stack inventory-page">
      <PageHeader eyebrow="Estoque / Movimentações" title="Movimentações" description="Rastreie cada entrada, saída, ajuste, perda e liberação de reserva do estoque." />
      <InventorySubnav/>
      <InventoryMovementsView movements={inventoryMovements} lots={inventoryLots}/>
      <p className="demo-note">A interface simula novos registros localmente; a versão com backend deverá criar eventos auditáveis e nunca sobrescrever histórico.</p>
    </div>
  );
}
