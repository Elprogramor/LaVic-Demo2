import Link from "next/link";
import type { ReportKind } from "../lib/types";

const items: Array<{ href: string; label: string; key?: ReportKind }> = [
  { href: "/reports", label: "Central" },
  { href: "/reports/sales", label: "Vendas", key: "sales" },
  { href: "/reports/products", label: "Produtos", key: "products" },
  { href: "/reports/customers", label: "Clientes", key: "customers" },
  { href: "/reports/inventory", label: "Estoque", key: "inventory" },
  { href: "/reports/marketing", label: "Marketing", key: "marketing" },
  { href: "/reports/b2b", label: "B2B", key: "b2b" },
  { href: "/reports/channels", label: "Canais", key: "channels" },
];

export function ReportsSubnav({ active = "/reports" }: { active?: string }) {
  return <nav className="module-subnav reports-subnav" aria-label="Navegação de Relatórios">{items.map((item) => <Link key={item.href} className={active === item.href ? "active" : ""} href={item.href}>{item.label}</Link>)}</nav>;
}
