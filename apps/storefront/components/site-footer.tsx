import Link from "next/link";

function ArrowUpRight() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M9 6h9v9" /></svg>;
}

function SocialMark({ label }: { label: string }) {
  return <span aria-hidden="true">{label}</span>;
}

export function SiteFooter() {
  return (
    <footer className="lavic-public-footer">
      <div className="lavic-public-footer__subscribe">
        <h2>Subscribe Us</h2>
        <Link href="/sabores" aria-label="Conhecer os sabores LaVic"><ArrowUpRight /></Link>
      </div>
      <div className="lavic-public-footer__rule" />

      <div className="lavic-public-footer__grid">
        <div className="lavic-public-footer__columns">
          <div>
            <h3>Ajuda &amp;<br />Informações</h3>
            <Link href="/carrinho">Pedidos</Link>
            <Link href="/sobre">Termos &amp; Condições</Link>
            <Link href="/encomendas">Entrega</Link>
            <Link href="/carrinho">Minha conta</Link>
          </div>
          <div>
            <h3>Sobre nós</h3>
            <Link href="/sobre">Nossa história</Link>
            <Link href="/sabores">Sabores</Link>
            <Link href="/kits">Kits</Link>
            <Link href="/revenda">Revenda</Link>
          </div>
        </div>

        <div className="lavic-public-footer__faq">
          <h3>Talvez sua dúvida já tenha uma resposta.</h3>
          <Link href="/sobre"><span>O que é a LaVic?</span><b>→</b></Link>
          <Link href="/sabores"><span>Como comprar LaVic?</span><b>→</b></Link>
          <Link href="/revenda"><span>Como levar LaVic para o meu negócio?</span><b>→</b></Link>
        </div>
      </div>

      <div className="lavic-public-footer__bottom">
        <div><Link href="/sobre">Terms</Link><Link href="/sobre">Privacy</Link><Link href="/sobre">Cookies</Link><Link href="/sobre">Legal</Link></div>
        <p>© 2026 LaVic. Todos os direitos reservados.</p>
        <div className="lavic-public-footer__social"><SocialMark label="f" /><SocialMark label="◎" /><SocialMark label="in" /><SocialMark label="♪" /><SocialMark label="▶" /></div>
      </div>
    </footer>
  );
}
