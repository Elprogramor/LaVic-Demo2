"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/b2b", label: "Pipeline" },
  { href: "/b2b/leads", label: "Leads" },
  { href: "/b2b/customers", label: "Clientes B2B" },
  { href: "/b2b/orders", label: "Pedidos B2B" },
  { href: "/b2b/pricing", label: "Tabelas comerciais" },
];

export function B2BSubnav() {
  const pathname = usePathname();
  return (
    <nav className="module-subnav b2b-subnav" aria-label="Navegação de revenda e B2B">
      {items.map((item) => {
        const active = item.href === "/b2b" ? pathname === item.href : pathname.startsWith(item.href);
        return <Link key={item.href} href={item.href} className={active ? "active" : ""}>{item.label}</Link>;
      })}
    </nav>
  );
}
