"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/products", label: "Produtos" },
  { href: "/catalog/kits", label: "Kits" },
  { href: "/catalog/categories", label: "Categorias" },
];

export function CatalogSubnav() {
  const pathname = usePathname();
  return <nav className="domain-subnav" aria-label="Navegação de catálogo">{items.map((item) => <Link key={item.href} href={item.href} className={pathname === item.href || (item.href === "/products" && /^\/products(?:\/|$)/.test(pathname)) ? "active" : ""}>{item.label}</Link>)}</nav>;
}
