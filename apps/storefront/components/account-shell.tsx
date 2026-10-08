import Link from "next/link";
import type { PropsWithChildren } from "react";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

const links = [
  { href: "/conta", label: "Visão geral" },
  { href: "/conta/pedidos", label: "Pedidos" },
  { href: "/conta/enderecos", label: "Endereços" }
] as const;

export function AccountShell({ title, intro, children }: PropsWithChildren<{ title: string; intro: string }>) {
  return (
    <>
      <SiteHeader />
      <main id="conteudo-principal" className="account-page">
        <div className="site-container account-layout">
          <aside className="account-nav">
            <p className="eyebrow">MINHA LAVIC</p>
            <div className="account-nav__identity"><span aria-hidden="true">LT</span><div><strong>Cliente teste</strong><small>visualização demonstrativa</small></div></div>
            <nav aria-label="Área do cliente">{links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}</nav>
            <p className="account-nav__note">Autenticação e dados reais serão conectados na fase de backend.</p>
          </aside>
          <section className="account-content">
            <header><p className="eyebrow">CONTA</p><h1>{title}</h1><p>{intro}</p></header>
            <div className="account-demo-banner">Modo demonstração · nenhuma informação pessoal está sendo carregada.</div>
            {children}
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
