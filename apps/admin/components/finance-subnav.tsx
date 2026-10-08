import Link from "next/link";

const items = [
  { href: "/finance", label: "Visão geral" },
  { href: "/finance/receivables", label: "Recebimentos" },
  { href: "/finance/refunds", label: "Reembolsos" },
  { href: "/finance/reconciliation", label: "Conciliação" },
];

export function FinanceSubnav({ active = "/finance" }: { active?: string }) {
  return <nav className="module-subnav" aria-label="Navegação do Financeiro">{items.map((item) => <Link key={item.href} className={active === item.href ? "active" : ""} href={item.href}>{item.label}</Link>)}</nav>;
}
