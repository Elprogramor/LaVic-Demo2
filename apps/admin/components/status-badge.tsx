import type { InventoryHealth, InventoryLotStatus, OrderStatus, PaymentStatus, ProductStatus } from "../lib/types";

type Status = OrderStatus | PaymentStatus | ProductStatus | InventoryHealth | InventoryLotStatus | "demo";

const labels: Record<Status, string> = {
  new: "Novo",
  confirmed: "Confirmado",
  separating: "Separação",
  ready: "Pronto",
  shipped: "Enviado",
  delivered: "Entregue",
  cancelled: "Cancelado",
  approved: "Aprovado",
  pending: "Pendente",
  refunded: "Reembolsado",
  active: "Ativo",
  draft: "Rascunho",
  inactive: "Inativo",
  demo: "Demo",
  healthy: "Saudável",
  attention: "Atenção",
  critical: "Crítico",
  out: "Sem estoque",
  available: "Disponível",
  blocked: "Bloqueado",
  expired: "Vencido",
};

export function StatusBadge({ status, label }: { status: Status; label?: string }) {
  return <span className={`status-badge status-${status}`}>{label ?? labels[status]}</span>;
}
