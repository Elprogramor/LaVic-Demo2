"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { CartDrawer } from "@/components/cart-drawer";
import { homeV10 } from "@/content/home-v10";

const NAVIGATION = [
  { label: "Início", href: "/" },
  { label: "Sabores", href: "/sabores" },
  { label: "kits", href: "/kits" },
  { label: "Revenda", href: "/revenda" },
  { label: "Sobre", href: "/sobre" },
] as const;

function ArrowCircle({ direction = "next", className = "" }: { direction?: "next" | "prev" | "up"; className?: string }) {
  return (
    <span className={`f13-arrow f13-arrow--${direction} ${className}`} aria-hidden="true">
      <span />
    </span>
  );
}

function Stars() {
  return (
    <span className="f13-stars" aria-hidden="true">
      <i>★</i><i>★</i><i>★</i><i>★</i><i>★</i>
    </span>
  );
}

function FigmaHeader() {
  const { itemCount, setOpen } = useCart();

  return (
    <header className="f13-header">
      <Link href="/" className="f13-logo" aria-label="LaVic — página inicial">
        <Image src="/brand/lavic-logo-color.png" alt="LaVic" fill priority sizes="91px" />
      </Link>

      <nav className="f13-nav" aria-label="Navegação principal">
        {NAVIGATION.map((item, index) => (
          <Link key={item.href} href={item.href} className={index === 0 ? "is-active" : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="f13-header-actions">
        <Link href="/conta" className="f13-header-icon" aria-label="Minha conta">
          <i className="fi fi-tr-circle-user" aria-hidden="true" />
        </Link>
        <button type="button" className="f13-header-icon f13-cart" onClick={() => setOpen(true)} aria-label={`Abrir carrinho (${itemCount})`}>
          <i className="fi fi-tr-shopping-basket" aria-hidden="true" />
          {itemCount > 0 ? <b>{itemCount}</b> : null}
        </button>
      </div>
    </header>
  );
}

export function HomeFigmaV13() {
  return (
    <div className="f13-page">
      <a className="skip-link" href="#f13-main">Ir para o conteúdo</a>
      <div className="f13-stage">
        <FigmaHeader />

        <main id="f13-main">
          <section className="f13-hero" aria-labelledby="f13-hero-title">
            <div className="f13-hero-badge">{homeV10.hero.badge}</div>
            <div className="f13-hero-word" aria-hidden="true">KOMBUCHA</div>

            <figure className="f13-hero-bottle">
              <Image src="/home-v09/lavic-limao-cutout.png" alt="Garrafa LaVic Kombucha Limão 1L" fill priority sizes="457px" />
            </figure>
            <div className="f13-hero-fade" aria-hidden="true" />

            <div className="f13-hero-copy">
              <h1 id="f13-hero-title">{homeV10.hero.title}</h1>
              <p>{homeV10.hero.description}</p>
            </div>

            <Link href={homeV10.hero.ctaHref} className="f13-choice-button">ESCOLHA O SEU</Link>

            <aside className="f13-hero-mini" aria-label="Produto em destaque">
              <div className="f13-hero-mini-image">
                <Image src="/home-v06/picks/discovery.webp" alt="Seleção LaVic" fill sizes="125px" />
              </div>
              <strong>{homeV10.hero.productName}</strong>
              <Stars />
              <span>{homeV10.hero.productPrice}</span>
            </aside>

            <ArrowCircle direction="next" className="f13-hero-choice-arrow" />

            <div className="f13-testimonial">
              <div className="f13-testimonial-nav">
                <h2>{homeV10.testimonial.label}</h2>
                <div className="f13-testimonial-arrows">
                  <ArrowCircle direction="prev" />
                  <ArrowCircle direction="next" />
                </div>
              </div>

              <blockquote className="f13-testimonial-copy">
                <span className="f13-testimonial-quote" aria-hidden="true">“</span>
                <p>{homeV10.testimonial.quote}</p>
                <footer>
                  <span className="f13-testimonial-avatar" aria-hidden="true">FM</span>
                  <div>
                    <strong>{homeV10.testimonial.author}</strong>
                    <small>{homeV10.testimonial.role}</small>
                  </div>
                </footer>
              </blockquote>
            </div>
          </section>

          <section className="f13-bottled" aria-labelledby="f13-bottled-title">
            <h2 id="f13-bottled-title">{homeV10.bottled.title}</h2>
            <p className="f13-bottled-subtitle">{homeV10.bottled.subtitle}</p>
            <div className="f13-bottled-arrows"><ArrowCircle direction="prev" /><ArrowCircle direction="next" /></div>

            <div className="f13-bottled-grid">
              {homeV10.bottled.items.map((item, index) => (
                <article className={`f13-bottle-card f13-bottle-card--${index + 1}`} key={item.name}>
                  <Link href={item.href} className="f13-bottle-card-image">
                    <Image src={item.image} alt={item.name} fill sizes="224px" />
                  </Link>
                  <h3>{item.name}</h3>
                  <Stars />
                  <p>{item.price}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="f13-rhythm" aria-labelledby="f13-rhythm-title">
            <div className="f13-rhythm-panel">
              <h2 id="f13-rhythm-title">{homeV10.rhythm.title}</h2>
              <div className="f13-rhythm-main-image">
                <Image src="/home-v06/kits/discovery.webp" alt="Seleção de kombuchas LaVic" fill sizes="313px" />
              </div>
              <div className="f13-rhythm-content">
                <p>{homeV10.rhythm.description}</p>
                <div className="f13-rhythm-mini f13-rhythm-mini--1"><Image src="/home-v06/flavors/lime.webp" alt="LaVic Limão" fill sizes="169px" /></div>
                <div className="f13-rhythm-mini f13-rhythm-mini--2"><Image src="/home-v06/flavors/strawberry.webp" alt="LaVic Morango" fill sizes="158px" /></div>
                <p className="f13-rhythm-detail">{homeV10.rhythm.detail}</p>
                <Link href={homeV10.rhythm.ctaHref} className="f13-rhythm-cta">{homeV10.rhythm.ctaLabel}</Link>
              </div>
            </div>
          </section>

          <section className="f13-intro" aria-labelledby="f13-intro-title">
            <h2 id="f13-intro-title">{homeV10.intro.title}</h2>
            <div className="f13-intro-content">
              <p>{homeV10.intro.description}</p>
              <div className="f13-intro-stats">
                {homeV10.intro.stats.map((stat) => (
                  <div key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>
                ))}
              </div>
            </div>
          </section>

          <section className="f13-showcase" aria-labelledby="f13-showcase-title">
            <div className="f13-showcase-outline f13-showcase-outline--right" aria-hidden="true">kombu cha</div>
            <div className="f13-showcase-outline f13-showcase-outline--left" aria-hidden="true">lavic</div>
            <h2 id="f13-showcase-title">{homeV10.showcase.title}</h2>
            <p className="f13-showcase-desc">{homeV10.showcase.description}</p>

            <figure className="f13-showcase-bottle">
              <Image src="/hero/sparkling/bottle.webp" alt="Espumante LaVic" fill sizes="426px" />
            </figure>

            <div className="f13-showcase-purchase">
              <h3>{homeV10.showcase.productName}</h3>
              <strong>R$49,98</strong>
              <div className="f13-showcase-actions">
                <Link href={homeV10.showcase.ctaHref}>{homeV10.showcase.ctaLabel}</Link>
                <button type="button" aria-label="Adicionar aos favoritos">♡</button>
              </div>
              <div className="f13-showcase-thumbs">
                {["/hero/sparkling/bottle.webp", "/hero/sparkling/fruit-scene.webp", "/home-v06/picks/sparkling.webp"].map((src) => (
                  <div key={src}><Image src={src} alt="" fill sizes="99px" /></div>
                ))}
              </div>
            </div>
          </section>

          <section className="f13-trust" aria-label="Diferenciais LaVic">
            <div className="f13-trust-grid">
              {homeV10.trust.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.copy}</p></article>)}
            </div>
          </section>

          <section className="f13-b2b" aria-labelledby="f13-b2b-title">
            <div className="f13-b2b-panel">
              <div className="f13-b2b-copy">
                <span>{homeV10.b2b.kicker}</span>
                <h2 id="f13-b2b-title">{homeV10.b2b.title}</h2>
                <p>{homeV10.b2b.description}</p>
                <Link href={homeV10.b2b.ctaHref}>{homeV10.b2b.ctaLabel}</Link>
              </div>
              <div className="f13-b2b-product f13-b2b-product--large"><Image src="/home-v09/lavic-limao-cutout.png" alt="LaVic Limão" fill sizes="218px" /></div>
              <div className="f13-b2b-product f13-b2b-product--small"><Image src="/home-v09/lavic-limao-cutout.png" alt="" fill sizes="218px" /></div>
            </div>
          </section>

          <footer className="f13-footer">
            <div className="f13-footer-subscribe">
              <h2>{homeV10.footer.headline}</h2>
              <Link href="/sabores" aria-label="Conhecer a LaVic"><ArrowCircle direction="up" /></Link>
            </div>
            <div className="f13-footer-rule" />
            <div className="f13-footer-grid">
              <div className="f13-footer-links">
                <div><h3>{homeV10.footer.helpTitle}</h3>{homeV10.footer.helpLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
                <div><h3>{homeV10.footer.aboutTitle}</h3>{homeV10.footer.aboutLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
              </div>
              <div className="f13-footer-faq">
                <h3>{homeV10.footer.faqTitle}</h3>
                {homeV10.footer.faq.map((item) => <Link key={item.label} href={item.href}><span>{item.label}</span><span>↗</span></Link>)}
              </div>
            </div>
            <div className="f13-footer-bottom">
              <div><Link href="/sobre">Terms</Link><Link href="/sobre">Privacy</Link><Link href="/sobre">Cookies</Link><Link href="/sobre">Legal</Link></div>
              <p>© 2026 LaVic. Todos os direitos reservados.</p>
              <div className="f13-footer-social" aria-label="Redes sociais"><span>f</span><span>ig</span><span>in</span><span>tt</span><span>yt</span></div>
            </div>
          </footer>
        </main>
      </div>
      <CartDrawer />
    </div>
  );
}
