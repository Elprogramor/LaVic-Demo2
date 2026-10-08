import type { Metadata } from "next";
import { AccountShell } from "@/components/account-shell";
import { formatCurrency } from "@/lib/format";

const demoOrders = [
  { id: "LAV-0183", date: "18/09/2026", status: "Entregue", items: "2 itens", total: 3880 },
  { id: "LAV-0141", date: "02/09/2026", status: "Entregue", items: "3 itens", total: 5390 },
  { id: "LAV-0108", date: "16/08/2026", status: "Entregue", items: "2 itens", total: 3780 }
];

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AccountOrdersPage() {
  return (
    <AccountShell title="Seus pedidos." intro="Histórico demonstrativo para validar a futura experiência autenticada.">
      <div className="account-orders">{demoOrders.map((order) => <article key={order.id}><div><span>{order.id}</span><small>{order.date}</small></div><div><span>{order.items}</span><strong>{formatCurrency(order.total)}</strong></div><span className="account-order-status">{order.status}</span></article>)}</div>
    </AccountShell>
  );
}
