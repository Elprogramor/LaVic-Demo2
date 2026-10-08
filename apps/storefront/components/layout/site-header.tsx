"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BagIcon, HeartIcon, MenuIcon } from "@/components/ui/icons";
import { useCart } from "@/components/commerce/cart-provider";

const nav = [
  { label: "Início", href: "/" },
  { label: "Sabores", href: "/sabores" },
  { label: "Kits", href: "/kits" },
  { label: "Revenda", href: "/revenda" },
  { label: "Sobre", href: "/sobre" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { itemCount, setOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo" aria-label="LaVic — início">LaVic</Link>
        <nav className="site-nav" aria-label="Navegação principal">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>
        <div className="site-actions">
          <button type="button" className="icon-button" aria-label="Favoritos"><HeartIcon /></button>
          <button type="button" className="icon-button" onClick={() => setOpen(true)} aria-label={`Abrir carrinho com ${itemCount} itens`}>
            <BagIcon />
            {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
          </button>
          <button type="button" className="icon-button mobile-nav-toggle" aria-label="Abrir menu" onClick={() => setMobileOpen((value) => !value)}><MenuIcon /></button>
        </div>
      </header>
      {mobileOpen ? (
        <nav aria-label="Navegação mobile" style={{ padding: "0 16px 16px", display: "grid", gap: 6 }}>
          {nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="button-secondary">{item.label}</Link>)}
        </nav>
      ) : null}
    </>
  );
}
