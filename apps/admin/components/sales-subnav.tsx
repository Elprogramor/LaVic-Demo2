"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/orders", label: "Pedidos" },
  { href: "/sales/preorders", label: "Encomendas" },
  { href: "/sales/payments", label: "Pagamentos" },
];

export function SalesSubnav() {
  const pathname = usePathname();
  return <nav className="domain-subnav" aria-label="Navegação de vendas">{items.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href || (item.href === "/orders" && /^\/orders(?:\/|$)/.test(pathname)) ? "active" : ""}>{item.label}</Link>)}</nav>;
}
