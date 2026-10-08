import type { FinanceReconciliation } from "../lib/types";
import { formatCurrency, formatDateOnly } from "../lib/format";
import { FinanceStatusBadge } from "./finance-status";

export function FinanceReconciliationView({ rows }: { rows: FinanceReconciliation[] }) {
  return <div className="table-shell"><table className="data-table finance-table"><thead><tr><th>Data</th><th>Origem</th><th>Pedidos</th><th>Esperado</th><th>Liquidado</th><th>Diferença</th><th>Status</th></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td>{formatDateOnly(item.date)}</td><td className="table-primary">{item.provider}</td><td>{item.orders}</td><td>{formatCurrency(item.expectedCents)}</td><td>{formatCurrency(item.settledCents)}</td><td><strong className={item.differenceCents === 0 ? "finance-positive" : "finance-negative"}>{item.differenceCents === 0 ? "R$ 0,00" : formatCurrency(item.differenceCents)}</strong></td><td><FinanceStatusBadge status={item.status}/></td></tr>)}</tbody></table></div>;
}
