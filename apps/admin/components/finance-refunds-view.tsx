import type { FinanceRefund } from "../lib/types";
import { formatCurrency, formatDateTime } from "../lib/format";
import { FinanceStatusBadge } from "./finance-status";

export function FinanceRefundsView({ refunds }: { refunds: FinanceRefund[] }) {
  return <div className="table-shell"><table className="data-table finance-table"><thead><tr><th>Reembolso</th><th>Pedido</th><th>Cliente</th><th>Solicitado em</th><th>Valor</th><th>Motivo</th><th>Responsável</th><th>Status</th></tr></thead><tbody>{refunds.map((item) => <tr key={item.id}><td className="table-primary">{item.code}</td><td>{item.orderCode}</td><td>{item.customer}</td><td>{formatDateTime(item.createdAt)}</td><td><strong>{formatCurrency(item.amountCents)}</strong></td><td><span className="finance-reason">{item.reason}</span></td><td>{item.actor}</td><td><FinanceStatusBadge status={item.status}/></td></tr>)}</tbody></table></div>;
}
