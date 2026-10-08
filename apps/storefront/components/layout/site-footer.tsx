import Link from "next/link";
import { ArrowIcon } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="content-shell">
        <div className="site-footer-lead">
          <h2>Viva com gás.<br />Viva LaVic.</h2>
          <Link href="/sabores" className="arrow-circle" aria-label="Conhecer sabores"><ArrowIcon direction="up" /></Link>
        </div>
        <div className="site-footer-grid">
          <div>
            <h3>LaVic</h3>
            <p style={{ margin: 0, maxWidth: 430, color: "var(--lavic-muted)", lineHeight: 1.65 }}>Uma experiência digital demonstrativa para apresentar produto, marca, venda direta e relacionamento em um único canal próprio.</p>
          </div>
          <div>
            <h3>Navegação</h3>
            <div className="footer-links">
              <Link href="/sabores">Sabores</Link>
              <Link href="/kits">Kits</Link>
              <Link href="/revenda">Revenda</Link>
              <Link href="/sobre">Sobre</Link>
            </div>
          </div>
          <div>
            <h3>Ajuda</h3>
            <div className="footer-links">
              <Link href="/encomendas">Encomendas</Link>
              <Link href="/carrinho">Carrinho</Link>
              <Link href="/checkout">Checkout</Link>
            </div>
          </div>
        </div>
        <div className="site-footer-bottom">
          <span>© 2026 LaVic. Demonstração.</span>
          <span>Privacidade · Termos · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
