"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { auditEvents, b2bClients, b2bLeads, catalogCategories, catalogKits, customers, financeTransactions, inventoryLots, marketingCampaigns, marketingCoupons, orders, preorders, products, reportDefinitions, salesPayments, storeBanners, teamUsers } from "../data/mock-admin";
import { Icon, type IconName } from "./icon";

type NavItem = { label: string; href?: string; icon: IconName; badge?: string };
type NavGroup = { label?: string; items: NavItem[] };

const nav: NavGroup[] = [
  { items: [{ label: "Visão geral", href: "/", icon: "home" }] },
  { label: "Vendas", items: [
    { label: "Pedidos", href: "/orders", icon: "orders" },
    { label: "Encomendas", href: "/sales/preorders", icon: "calendar" },
    { label: "Pagamentos", href: "/sales/payments", icon: "card" },
  ]},
  { label: "Catálogo", items: [
    { label: "Produtos", href: "/products", icon: "box" },
    { label: "Kits", href: "/catalog/kits", icon: "layers" },
    { label: "Categorias", href: "/catalog/categories", icon: "tag" },
  ]},
  { label: "Estoque", items: [
    { label: "Visão geral", href: "/inventory", icon: "boxes" },
    { label: "Lotes", href: "/inventory/lots", icon: "box" },
    { label: "Movimentações", href: "/inventory/movements", icon: "swap" },
    { label: "Inventário", href: "/inventory/count", icon: "clipboard" },
    { label: "Alertas", href: "/inventory/alerts", icon: "alert" },
  ]},
  { label: "Clientes", items: [
    { label: "Todos os clientes", href: "/customers", icon: "users" },
    { label: "Segmentos", href: "/customers/segments", icon: "layers" },
    { label: "CRM", href: "/customers/crm", icon: "message" },
  ]},
  { label: "Revenda", items: [
    { label: "Pipeline", href: "/b2b", icon: "chart" },
    { label: "Leads", href: "/b2b/leads", icon: "users" },
    { label: "Clientes B2B", href: "/b2b/customers", icon: "handshake" },
    { label: "Pedidos B2B", href: "/b2b/orders", icon: "orders" },
    { label: "Tabelas comerciais", href: "/b2b/pricing", icon: "tag" },
  ]},
  { label: "Crescimento", items: [
    { label: "Marketing", href: "/marketing", icon: "megaphone" },
    { label: "Loja", href: "/store", icon: "store" },
  ]},
  { label: "Gestão", items: [
    { label: "Financeiro", href: "/finance", icon: "wallet" },
    { label: "Relatórios", href: "/reports", icon: "chart" },
    { label: "Equipe", href: "/team", icon: "shield" },
  ]},
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
      if (event.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return [];
    const orderResults = orders.filter((order) => `${order.code} ${order.customerName}`.toLowerCase().includes(normalized)).slice(0, 4).map((order) => ({ label: `${order.code} · ${order.customerName}`, href: `/orders/${order.id}`, type: "Pedido" }));
    const preorderResults = preorders.filter((item) => `${item.code} ${item.customerName}`.toLowerCase().includes(normalized)).slice(0, 3).map((item) => ({ label: `${item.code} · ${item.customerName}`, href: "/sales/preorders", type: "Encomenda" }));
    const paymentResults = salesPayments.filter((item) => `${item.code} ${item.orderCode} ${item.customerName}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: `${item.code} · ${item.orderCode}`, href: "/sales/payments", type: "Pagamento" }));
    const productResults = products.filter((product) => `${product.name} ${product.sku}`.toLowerCase().includes(normalized)).slice(0, 4).map((product) => ({ label: product.name, href: "/products", type: "Produto" }));
    const kitResults = catalogKits.filter((item) => `${item.name} ${item.sku}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: `${item.name} · ${item.sku}`, href: "/catalog/kits", type: "Kit" }));
    const categoryResults = catalogCategories.filter((item) => `${item.name} ${item.slug}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: item.name, href: "/catalog/categories", type: "Categoria" }));
    const lotResults = inventoryLots.filter((lot) => `${lot.code} ${lot.productName} ${lot.sku}`.toLowerCase().includes(normalized)).slice(0, 4).map((lot) => ({ label: `${lot.code} · ${lot.productName}`, href: "/inventory/lots", type: "Lote" }));
    const customerResults = customers.filter((customer) => `${customer.name} ${customer.code} ${customer.email} ${customer.phone}`.toLowerCase().includes(normalized)).slice(0, 4).map((customer) => ({ label: `${customer.name} · ${customer.code}`, href: `/customers/${customer.id}`, type: "Cliente" }));
    const b2bLeadResults = b2bLeads.filter((lead) => `${lead.company} ${lead.code} ${lead.contactName} ${lead.city}`.toLowerCase().includes(normalized)).slice(0, 3).map((lead) => ({ label: `${lead.company} · ${lead.code}`, href: `/b2b/leads/${lead.id}`, type: "Lead B2B" }));
    const b2bClientResults = b2bClients.filter((client) => `${client.company} ${client.code} ${client.contactName} ${client.city}`.toLowerCase().includes(normalized)).slice(0, 3).map((client) => ({ label: `${client.company} · ${client.code}`, href: `/b2b/customers/${client.id}`, type: "Cliente B2B" }));
    const couponResults = marketingCoupons.filter((coupon) => `${coupon.code} ${coupon.name}`.toLowerCase().includes(normalized)).slice(0, 2).map((coupon) => ({ label: `${coupon.code} · ${coupon.name}`, href: "/marketing/coupons", type: "Cupom" }));
    const campaignResults = marketingCampaigns.filter((campaign) => campaign.name.toLowerCase().includes(normalized)).slice(0, 2).map((campaign) => ({ label: campaign.name, href: "/marketing/campaigns", type: "Campanha" }));
    const bannerResults = storeBanners.filter((banner) => `${banner.name} ${banner.headline}`.toLowerCase().includes(normalized)).slice(0, 2).map((banner) => ({ label: banner.name, href: "/store/banners", type: "Banner" }));
    const financeResults = financeTransactions.filter((item) => `${item.code} ${item.orderCode} ${item.customer}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: `${item.code} · ${item.orderCode}`, href: "/finance/receivables", type: "Financeiro" }));
    const reportResults = reportDefinitions.filter((item) => `${item.title} ${item.description}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: item.title, href: `/reports/${item.key}`, type: "Relatório" }));
    const teamResults = teamUsers.filter((item) => `${item.name} ${item.email} ${item.roleName}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: `${item.name} · ${item.roleName}`, href: "/team", type: "Equipe" }));
    const auditResults = auditEvents.filter((item) => `${item.actor} ${item.action} ${item.target} ${item.summary}`.toLowerCase().includes(normalized)).slice(0, 2).map((item) => ({ label: `${item.action} · ${item.target}`, href: "/team/audit", type: "Auditoria" }));
    return [...orderResults, ...preorderResults, ...paymentResults, ...customerResults, ...b2bLeadResults, ...b2bClientResults, ...productResults, ...kitResults, ...categoryResults, ...lotResults, ...couponResults, ...campaignResults, ...bannerResults, ...financeResults, ...reportResults, ...teamResults, ...auditResults].slice(0, 8);
  }, [query]);

  return (
    <div className="admin-shell">
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`} aria-label="Navegação principal">
        <div className="brand-lockup">
          <span className="brand-word">LaVic</span>
          <span className="brand-admin">ADMIN</span>
        </div>
        <nav className="sidebar-nav">
          {nav.map((group, index) => (
            <div className="nav-group" key={`${group.label ?? "main"}-${index}`}>
              {group.label ? <p className="nav-group-label">{group.label}</p> : null}
              {group.items.map((item) => {
                const active = item.href === "/" || item.href === "/inventory" || item.href === "/b2b"
                  ? pathname === item.href
                  : item.href === "/customers"
                    ? pathname === "/customers" || /^\/customers\/customer-/.test(pathname)
                    : Boolean(item.href && pathname.startsWith(item.href));
                if (!item.href) {
                  return <span className="nav-item nav-disabled" key={item.label} title="Disponível nas próximas etapas"><Icon name={item.icon} size={16}/><span>{item.label}</span></span>;
                }
                return <Link className={`nav-item ${active ? "nav-active" : ""}`} href={item.href} key={item.label}><Icon name={item.icon} size={16}/><span>{item.label}</span>{item.badge ? <em>{item.badge}</em> : null}</Link>;
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <Link href="/settings/security" className={`nav-item ${pathname.startsWith("/settings") ? "nav-active" : ""}`}><Icon name="settings" size={16}/><span>Configurações</span></Link>
          <div className="profile-mini">
            <span className="avatar">EL</span>
            <div><strong>Equipe LaVic</strong><span>Administrador</span></div>
            <Icon name="chevronRight" size={15}/>
          </div>
        </div>
      </aside>

      {mobileOpen ? <button className="sidebar-backdrop" aria-label="Fechar menu" onClick={() => setMobileOpen(false)} /> : null}

      <div className="admin-main">
        <header className="topbar">
          <button className="icon-button topbar-menu" aria-label="Abrir menu" onClick={() => setMobileOpen(true)}><Icon name="menu" size={19}/></button>
          <button className="global-search" onClick={() => setSearchOpen(true)} aria-label="Abrir busca global">
            <Icon name="search" size={16}/><span>Buscar no LaVic...</span><kbd>Ctrl K</kbd>
          </button>
          <div className="topbar-actions">
            <button className="icon-button" aria-label="Notificações"><Icon name="bell" size={18}/><span className="notification-dot"/></button>
            <button className="avatar avatar-button" aria-label="Abrir perfil">EL</button>
          </div>
        </header>
        <main className="page-content">{children}</main>
      </div>

      {searchOpen ? (
        <div className="command-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSearchOpen(false); }}>
          <section className="command-dialog" role="dialog" aria-modal="true" aria-label="Busca global">
            <div className="command-input-row"><Icon name="search" size={18}/><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pedido, cliente, equipe, auditoria, financeiro, produto ou lote..." maxLength={80}/><button className="icon-button" onClick={() => setSearchOpen(false)} aria-label="Fechar busca"><Icon name="close" size={17}/></button></div>
            <div className="command-results">
              {!query ? <p className="command-hint">Busque por pedido, cliente, parceiro, usuário, auditoria, transação, relatório, cupom, campanha, banner, SKU, produto ou lote.</p> : null}
              {query && results.length === 0 ? <p className="command-hint">Nenhum resultado encontrado.</p> : null}
              {results.map((result) => <button key={`${result.type}-${result.label}`} onClick={() => { setSearchOpen(false); setQuery(""); router.push(result.href); }}><span>{result.label}</span><small>{result.type}</small><Icon name="chevronRight" size={15}/></button>)}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
