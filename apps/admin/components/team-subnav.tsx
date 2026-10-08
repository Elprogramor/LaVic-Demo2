"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icon";

const items: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Usuários", href: "/team", icon: "users" },
  { label: "Perfis e permissões", href: "/team/roles", icon: "shield" },
  { label: "Sessões", href: "/team/sessions", icon: "lock" },
  { label: "Auditoria", href: "/team/audit", icon: "activity" },
];

export function TeamSubnav() {
  const pathname = usePathname();
  return <nav className="module-subnav" aria-label="Navegação de Equipe e Governança">{items.map((item) => {
    const active = item.href === "/team" ? pathname === item.href : pathname.startsWith(item.href);
    return <Link href={item.href} className={active ? "active" : ""} key={item.href}><Icon name={item.icon} size={14}/>{item.label}</Link>;
  })}</nav>;
}
