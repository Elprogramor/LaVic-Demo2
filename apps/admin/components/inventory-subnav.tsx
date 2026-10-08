"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icon";

const items: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Visão geral", href: "/inventory", icon: "boxes" },
  { label: "Lotes", href: "/inventory/lots", icon: "box" },
  { label: "Movimentações", href: "/inventory/movements", icon: "swap" },
  { label: "Inventário", href: "/inventory/count", icon: "clipboard" },
  { label: "Alertas", href: "/inventory/alerts", icon: "alert" },
];

export function InventorySubnav() {
  const pathname = usePathname();
  return (
    <nav className="module-subnav" aria-label="Navegação de estoque">
      {items.map((item) => {
        const active = item.href === "/inventory" ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link className={active ? "active" : ""} href={item.href} key={item.href}>
            <Icon name={item.icon} size={14}/>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
