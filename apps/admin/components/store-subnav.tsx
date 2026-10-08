"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icon";

const items: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Home", href: "/store", icon: "store" },
  { label: "Destaques", href: "/store/highlights", icon: "box" },
  { label: "Banners", href: "/store/banners", icon: "layers" },
  { label: "Sabores", href: "/store/flavors", icon: "tag" },
  { label: "Conteúdo", href: "/store/content", icon: "clipboard" },
  { label: "SEO", href: "/store/seo", icon: "search" },
];

export function StoreSubnav() {
  const pathname = usePathname();
  return <nav className="module-subnav" aria-label="Navegação da Loja">{items.map((item) => {
    const active = item.href === "/store" ? pathname === item.href : pathname.startsWith(item.href);
    return <Link href={item.href} className={active ? "active" : ""} key={item.href}><Icon name={item.icon} size={14}/>{item.label}</Link>;
  })}</nav>;
}
