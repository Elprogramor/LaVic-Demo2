"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icon";

const items: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Todos os clientes", href: "/customers", icon: "users" },
  { label: "Segmentos", href: "/customers/segments", icon: "layers" },
  { label: "CRM", href: "/customers/crm", icon: "message" },
];

export function CustomersSubnav() {
  const pathname = usePathname();
  return (
    <nav className="module-subnav" aria-label="Navegação de clientes">
      {items.map((item) => {
        const active = item.href === "/customers" ? pathname === item.href || /^\/customers\/customer-/.test(pathname) : pathname.startsWith(item.href);
        return <Link key={item.href} href={item.href} className={active ? "active" : ""}><Icon name={item.icon} size={14}/><span>{item.label}</span></Link>;
      })}
    </nav>
  );
}
