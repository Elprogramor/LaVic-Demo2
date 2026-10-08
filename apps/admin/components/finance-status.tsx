import type { FinanceRefundStatus, FinanceTransactionStatus, ReconciliationStatus } from "../lib/types";

type Value = FinanceTransactionStatus | FinanceRefundStatus | ReconciliationStatus;

const labels: Record<Value, string> = {
  approved: "Aprovado",
  pending: "Pendente",
  refunded: "Reembolsado",
  cancelled: "Cancelado",
  requested: "Solicitado",
  processing: "Processando",
  completed: "Concluído",
  rejected: "Recusado",
  matched: "Conciliado",
  difference: "Divergência",
  review: "Revisão",
};

export function FinanceStatusBadge({ status }: { status: Value }) {
  return <span className={`finance-status finance-status-${status}`}>{labels[status]}</span>;
}
