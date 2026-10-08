"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icon";

const items: Array<{ label: string; href: string; icon: IconName }> = [
  { label: "Visão geral", href: "/marketing", icon: "megaphone" },
  { label: "Cupons", href: "/marketing/coupons", icon: "tag" },
  { label: "Promoções", href: "/marketing/promotions", icon: "layers" },
  { label: "Campanhas", href: "/marketing/campaigns", icon: "calendar" },
  { label: "Performance", href: "/marketing/performance", icon: "chart" },
];

export function MarketingSubnav() {
  const pathname = usePathname();
  return <nav className="module-subnav" aria-label="Navegação de Marketing">{items.map((item) => {
    const active = item.href === "/marketing" ? pathname === item.href : pathname.startsWith(item.href);
    return <Link href={item.href} className={active ? "active" : ""} key={item.href}><Icon name={item.icon} size={14}/>{item.label}</Link>;
  })}</nav>;
}
