import type { CatalogCategoryStatus, CatalogKitStatus, PreorderPaymentStatus, PreorderStatus, SalesPaymentStatus } from "../lib/types";

type CoreStatus = PreorderStatus | PreorderPaymentStatus | SalesPaymentStatus | CatalogKitStatus | CatalogCategoryStatus;

const labels: Record<CoreStatus, string> = {
  requested: "Solicitada",
  awaiting_confirmation: "Aguardando confirmação",
  confirmed: "Confirmada",
  scheduled: "Programada",
  preparing: "Em preparação",
  ready: "Pronta",
  completed: "Concluída",
  cancelled: "Cancelada",
  pending: "Pendente",
  partial: "Sinal pago",
  paid: "Pago",
  refunded: "Reembolsado",
  approved: "Aprovado",
  failed: "Falhou",
  expired: "Expirado",
  active: "Ativo",
  draft: "Rascunho",
  inactive: "Inativo",
  hidden: "Oculto",
};

export function CoreCommerceStatus({ status, label }: { status: CoreStatus; label?: string }) {
  return <span className={`core-status core-status-${status}`}>{label ?? labels[status]}</span>;
}
