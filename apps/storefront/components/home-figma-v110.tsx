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

function ArrowGlyph({ direction = "next" }: { direction?: "next" | "prev" | "up" }) {
  const rotate = direction === "prev" ? 180 : direction === "up" ? -45 : 0;
  return (
    <svg className="f14-arrow-glyph" viewBox="0 0 24 24" aria-hidden="true" style={{ transform: `rotate(${rotate}deg)` }}>
      <path d="M4.75 12h13.5" />
      <path d="m13.75 6.75 5.25 5.25-5.25 5.25" />
    </svg>
  );
}

function ArrowCircle({ direction = "next", className = "" }: { direction?: "next" | "prev" | "up"; className?: string }) {
  return (
    <span className={`f13-arrow f13-arrow--${direction} ${className}`} aria-hidden="true">
      <ArrowGlyph direction={direction} />
    </span>
  );
}

function HeartIcon() {
  return (
    <svg className="f14-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg className="f14-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5.5 8.5h13l-.85 11H6.35l-.85-11Z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m12 2.8 2.75 5.57 6.15.9-4.45 4.33 1.05 6.12L12 16.83l-5.5 2.89 1.05-6.12L3.1 9.27l6.15-.9L12 2.8Z" />
    </svg>
  );
}

function Stars() {
  return (
    <span className="f13-stars" aria-hidden="true">
      <StarIcon /><StarIcon /><StarIcon /><StarIcon /><StarIcon />
    </span>
  );
}

function SocialIcon({ kind }: { kind: "facebook" | "instagram" | "linkedin" | "tiktok" | "youtube" }) {
  if (kind === "instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.4"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.4" cy="6.8" r=".9" className="is-filled"/></svg>;
  }
  if (kind === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.1 9.2v8.7M6.1 6.2v.15M10.1 17.9V9.2m0 3.7c.8-2.4 5.8-3.1 5.8.8v4.2"/></svg>;
  }
  if (kind === "youtube") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="6.3" width="17" height="11.4" rx="3.2"/><path d="m10 9.1 5 2.9-5 2.9V9.1Z" className="is-filled"/></svg>;
  }
  if (kind === "tiktok") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 5v9.3a3.7 3.7 0 1 1-3.7-3.7M13.5 5c.8 2.1 2.2 3.3 4.5 3.6"/></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.2 20v-7h2.5l.4-3h-2.9V8.1c0-.9.3-1.6 1.7-1.6h1.6V3.8c-.4-.1-1.4-.2-2.6-.2-2.6 0-4.3 1.6-4.3 4.5V10H7v3h2.6v7h3.6Z" className="is-filled"/></svg>;
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
        <button type="button" className="f13-header-icon f14-favorite" aria-label="Favoritos">
          <HeartIcon />
        </button>
        <button type="button" className="f13-header-icon f13-cart" onClick={() => setOpen(true)} aria-label={`Abrir carrinho (${itemCount})`}>
          <BagIcon />
          {itemCount > 0 ? <b>{itemCount}</b> : null}
        </button>
      </div>
    </header>
  );
}

export function HomeFigmaV110() {
  return (
    <div className="f13-page">
      <a className="skip-link" href="#f13-main">Ir para o conteúdo</a>
      <div className="f13-stage">
        <FigmaHeader />

        <main id="f13-main">
          <section className="f13-hero" aria-labelledby="f13-hero-title">
            <div className="f13-hero-badge">Descubra Toda Nossa Seleção</div>
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
                <Image src="/home-v16/three-lime-bottles.png" alt="LaVic Limão" fill sizes="125px" />
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
                  <span className="f13-testimonial-avatar"><Image src="/home-v17/francis-avatar.png" alt="" fill sizes="67px" /></span>
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
              {[0, 1, 2, 3].map((index) => (
                <article className={`f13-bottle-card f13-bottle-card--${index + 1}`} key={index}>
                  <Link href="/produto/limao-1l" className="f13-bottle-card-image">
                    <Image src="/home-v16/three-lime-bottles.png" alt="Kit LaVic Limão" fill sizes="224px" />
                  </Link>
                  <h3>LaVic Limão</h3>
                  <Stars />
                  <p>R$ 18,90</p>
                </article>
              ))}
            </div>
          </section>

          <section className="f13-rhythm" aria-labelledby="f13-rhythm-title">
            <div className="f13-rhythm-panel">
              <h2 id="f13-rhythm-title">{homeV10.rhythm.title}</h2>
              <div className="f16-rhythm-stack" aria-label="Kit LaVic Limão">
                <span className="f16-stack-bottle f16-stack-bottle--1"><Image src="/home-v09/lavic-limao-cutout.png" alt="" fill sizes="210px" /></span>
                <span className="f16-stack-bottle f16-stack-bottle--2"><Image src="/home-v09/lavic-limao-cutout.png" alt="" fill sizes="210px" /></span>
                <span className="f16-stack-bottle f16-stack-bottle--3"><Image src="/home-v09/lavic-limao-cutout.png" alt="" fill sizes="210px" /></span>
              </div>
              <div className="f13-rhythm-content">
                <p>{homeV10.rhythm.description}</p>
                <div className="f16-rhythm-mini f16-rhythm-mini--1">
                  <span><Image src="/home-v09/lavic-limao-cutout.png" alt="LaVic Limão" fill sizes="150px" /></span>
                </div>
                <div className="f16-rhythm-mini f16-rhythm-mini--2">
                  <span className="f16-mini-pair f16-mini-pair--large"><Image src="/home-v09/lavic-limao-cutout.png" alt="LaVic Limão 1L" fill sizes="110px" /></span>
                  <span className="f16-mini-pair f16-mini-pair--small"><Image src="/home-v09/lavic-limao-cutout.png" alt="LaVic Limão 500ml" fill sizes="85px" /></span>
                </div>
                <p className="f13-rhythm-detail">Descubra como a LaVic transforma a rotina com uma bebida viva, naturalmente fermentada e refrescante. Dos sabores engarrafados aos kits para compartilhar, cada detalhe foi pensado para tornar a escolha simples e especial.</p>
                <Link href={homeV10.rhythm.ctaHref} className="f13-rhythm-cta">{homeV10.rhythm.ctaLabel}</Link>
              </div>
            </div>
          </section>

          <section className="f13-intro" aria-labelledby="f13-intro-title">
            <h2 id="f13-intro-title">Uma breve<br />introdução<br />sobre quem<br />somos</h2>
            <div className="f13-intro-content">
              <p>A LaVic transforma fermentação natural em uma bebida contemporânea, feita para acompanhar diferentes momentos com frescor, identidade e simplicidade.</p>
              <div className="f13-intro-stats">
                <div><strong>04</strong><span>sabores na coleção atual</span></div>
                <div><strong>1L + 500ml</strong><span>formatos engarrafados</span></div>
              </div>
            </div>
          </section>

          <section className="f13-showcase" aria-labelledby="f13-showcase-title">
            <div className="f13-showcase-outline f13-showcase-outline--right" aria-hidden="true">kombu cha</div>
            <div className="f13-showcase-outline f13-showcase-outline--left" aria-hidden="true">lavic</div>
            <h2 id="f13-showcase-title">{homeV10.showcase.title}</h2>
            <p className="f13-showcase-desc">Uma combinação de presença, frescor e personalidade. O Espumante LaVic foi pensado para transformar um brinde simples em uma experiência marcante, leve e cheia de identidade.</p>

            <figure className="f13-showcase-bottle">
              <Image src="/hero/sparkling/bottle.webp" alt="Espumante LaVic" fill sizes="426px" />
            </figure>

            <div className="f13-showcase-purchase">
              <h3>{homeV10.showcase.productName}</h3>
              <strong>R$49,98</strong>
              <div className="f13-showcase-actions">
                <Link href={homeV10.showcase.ctaHref}>{homeV10.showcase.ctaLabel}</Link>
                <button type="button" aria-label="Adicionar aos favoritos"><HeartIcon /></button>
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
              <article><h3>{homeV10.trust[0].title}</h3></article>
              <article><h3>{homeV10.trust[1].title}</h3></article>
              <article className="f17-trust-statement"><p>{homeV10.trust[2].copy}</p></article>
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
                {homeV10.footer.faq.map((item) => <Link key={item.label} href={item.href}><span>{item.label}</span><ArrowGlyph direction="next" /></Link>)}
              </div>
            </div>
            <div className="f13-footer-bottom">
              <div><Link href="/sobre">Terms</Link><Link href="/sobre">Privacy</Link><Link href="/sobre">Cookies</Link><Link href="/sobre">Legal</Link></div>
              <p>© 2026 LaVic. Todos os direitos reservados.</p>
              <div className="f13-footer-social" aria-label="Redes sociais"><SocialIcon kind="facebook" /><SocialIcon kind="instagram" /><SocialIcon kind="linkedin" /><SocialIcon kind="tiktok" /><SocialIcon kind="youtube" /></div>
            </div>
          </footer>
        </main>
      </div>
      <CartDrawer />
    </div>
  );
}
