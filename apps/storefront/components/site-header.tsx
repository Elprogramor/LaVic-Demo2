"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation } from "@/content/navigation";
import { useCart } from "./cart-provider";
import { CartDrawer } from "./cart-drawer";

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.5 8.5h13l-.85 11H6.35l-.85-11Z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { itemCount, setOpen } = useCart();

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 16);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const navItems = [{ label: "Início", href: "/" }, ...navigation];

  return (
    <>
      <header className={`lavic-public-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="lavic-public-header__inner">
          <Link href="/" className="lavic-public-header__logo" aria-label="LaVic — página inicial">
            <Image src="/brand/lavic-logo-color.png" alt="LaVic Kombucha" fill priority sizes="110px" />
          </Link>

          <nav className="lavic-public-nav" aria-label="Navegação principal">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return <Link key={item.href} href={item.href} className={active ? "is-active" : undefined}>{item.label}</Link>;
            })}
          </nav>

          <div className="lavic-public-header__actions">
            <Link href="/sabores" className="lavic-public-icon" aria-label="Favoritos e sabores"><HeartIcon /></Link>
            <button type="button" className="lavic-public-icon" aria-label={`Abrir carrinho (${itemCount})`} onClick={() => setOpen(true)}>
              <BagIcon />
              {itemCount > 0 ? <span>{itemCount}</span> : null}
            </button>
            <button type="button" className="lavic-public-menu" aria-expanded={menuOpen} aria-label="Abrir menu" onClick={() => setMenuOpen((value) => !value)}>
              <span /><span />
            </button>
          </div>
        </div>

        <div className={`lavic-public-mobile-nav ${menuOpen ? "is-open" : ""}`}>
          {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
          <Link href="/carrinho" onClick={() => setMenuOpen(false)}>Carrinho ({itemCount})</Link>
        </div>
      </header>
      <CartDrawer />
    </>
  );
}
