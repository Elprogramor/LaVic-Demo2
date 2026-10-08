"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";

import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";
import {
  LAVIC_VIEWPORT,
  cardContainer,
  cardReveal,
  mediaReveal,
  sectionContainer,
  textReveal,
} from "@/components/motion/lavic-motion";
import { homeV10 } from "@/content/home-v10";

const MotionLink = motion.create(Link);

const NAVIGATION = [
  { label: "Início", href: "/" },
  { label: "Sabores", href: "/sabores" },
  { label: "kits", href: "/kits" },
  { label: "Revenda", href: "/revenda" },
  { label: "Sobre", href: "/sobre" },
] as const;

function RoundArrow({ direction = "next" }: { direction?: "next" | "prev" | "up" }) {
  return (
    <span className={`home10-round-arrow home10-round-arrow--${direction}`} aria-hidden="true">
      <span className="home10-round-arrow__glyph" />
    </span>
  );
}

function HomeV10Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setOpen } = useCart();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <a className="skip-link" href="#conteudo-principal">Ir para o conteúdo</a>
      <header className="home10-header">
        <div className="home10-header__inner">
          <Link href="/" className="home10-logo" aria-label="LaVic — página inicial">
            <Image src="/brand/lavic-logo-color.png" alt="LaVic" width={180} height={90} priority />
          </Link>

          <nav className="home10-nav" aria-label="Navegação principal">
            {NAVIGATION.map((item, index) => (
              <Link key={item.href} href={item.href} className={index === 0 ? "is-active" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="home10-header__actions">
            <Link href="/conta" className="home10-icon" aria-label="Minha conta">
              <i className="fi fi-tr-circle-user" aria-hidden="true" />
            </Link>
            <button type="button" className="home10-icon home10-cart" onClick={() => setOpen(true)} aria-label={`Abrir carrinho (${itemCount})`}>
              <i className="fi fi-tr-shopping-basket" aria-hidden="true" />
              {itemCount > 0 ? <span>{itemCount}</span> : null}
            </button>
            <button
              type="button"
              className="home10-menu"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="home10-mobile-nav"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
        <nav id="home10-mobile-nav" className={`home10-mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação mobile">
          {NAVIGATION.map((item) => <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>
      </header>
      <CartDrawer />
    </>
  );
}

function DecorativeMarks() {
  return <div className="home10-product-marks" aria-hidden="true"><i>★</i><i>★</i><i>★</i><i>★</i><i>★</i></div>;
}

export function HomeV10() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="home10-page">
        <HomeV10Header />

        <main id="conteudo-principal" className="home10-desktop-canvas">
          <section className="home10-hero" aria-labelledby="home10-hero-title">
            <motion.div className="home10-hero__badge" variants={textReveal} initial="hidden" animate="visible">
              {homeV10.hero.badge}
            </motion.div>

            <div className="home10-hero__word" aria-hidden="true">KOMBUCHA</div>

            <motion.figure className="home10-hero__bottle" variants={mediaReveal} initial="hidden" animate="visible">
              <Image src="/home-v09/lavic-limao-cutout.png" alt="Garrafa LaVic Kombucha Limão 1L" fill priority sizes="457px" />
            </motion.figure>

            <motion.div className="home10-hero__copy" variants={sectionContainer} initial="hidden" animate="visible">
              <motion.h1 id="home10-hero-title" variants={textReveal}>{homeV10.hero.title}</motion.h1>
              <motion.p variants={textReveal}>{homeV10.hero.description}</motion.p>
            </motion.div>

            <MotionLink href={homeV10.hero.ctaHref} className="home10-hero__cta" variants={textReveal} initial="hidden" animate="visible">
              {homeV10.hero.ctaLabel}
            </MotionLink>

            <motion.aside className="home10-hero__mini" variants={mediaReveal} initial="hidden" animate="visible" aria-label="Produto em destaque">
              <div className="home10-hero__mini-image">
                <Image src="/home-v06/picks/discovery.webp" alt="Seleção LaVic" fill sizes="125px" />
              </div>
              <strong>{homeV10.hero.productName}</strong>
              <DecorativeMarks />
              <span>{homeV10.hero.productPrice}</span>
            </motion.aside>

            <span className="home10-hero__choice">ESCOLHA O SEU</span>
            <RoundArrow direction="next" />

            <motion.div className="home10-testimonial" variants={sectionContainer} initial="hidden" animate="visible">
              <div className="home10-testimonial__nav">
                <h2>{homeV10.testimonial.label}</h2>
                <div><RoundArrow direction="prev" /><RoundArrow direction="next" /></div>
              </div>
              <blockquote>
                <span className="home10-testimonial__quote" aria-hidden="true">“</span>
                <p>{homeV10.testimonial.quote}</p>
                <footer>
                  <span className="home10-testimonial__avatar" aria-hidden="true">FM</span>
                  <div><strong>{homeV10.testimonial.author}</strong><small>{homeV10.testimonial.role}</small></div>
                </footer>
              </blockquote>
            </motion.div>
          </section>

          <section className="home10-bottled" aria-labelledby="home10-bottled-title">
            <div className="home10-bottled__head">
              <div>
                <h2 id="home10-bottled-title">{homeV10.bottled.title}</h2>
                <p>{homeV10.bottled.subtitle}</p>
              </div>
              <div className="home10-bottled__arrows"><RoundArrow direction="prev" /><RoundArrow direction="next" /></div>
            </div>
            <motion.div className="home10-bottled__grid" variants={cardContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              {homeV10.bottled.items.map((item) => (
                <motion.article key={item.name} className="home10-bottle-card" variants={cardReveal}>
                  <Link href={item.href} className="home10-bottle-card__image">
                    <Image src={item.image} alt={item.name} fill sizes="224px" />
                  </Link>
                  <h3>{item.name}</h3>
                  <DecorativeMarks />
                  <p>{item.price}</p>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section className="home10-rhythm" aria-labelledby="home10-rhythm-title">
            <motion.div className="home10-rhythm__panel" variants={sectionContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              <motion.h2 id="home10-rhythm-title" variants={textReveal}>{homeV10.rhythm.title}</motion.h2>
              <motion.div className="home10-rhythm__main-image" variants={mediaReveal}>
                <Image src="/home-v06/kits/discovery.webp" alt="Seleção de kombuchas LaVic" fill sizes="313px" />
              </motion.div>
              <motion.div className="home10-rhythm__content" variants={sectionContainer}>
                <motion.p variants={textReveal}>{homeV10.rhythm.description}</motion.p>
                <motion.div className="home10-rhythm__mini-grid" variants={cardContainer}>
                  <motion.div variants={cardReveal}><Image src="/home-v06/flavors/lime.webp" alt="LaVic Limão" fill sizes="160px" /></motion.div>
                  <motion.div variants={cardReveal}><Image src="/home-v06/flavors/strawberry.webp" alt="LaVic Morango" fill sizes="160px" /></motion.div>
                </motion.div>
                <motion.p className="home10-rhythm__detail" variants={textReveal}>{homeV10.rhythm.detail}</motion.p>
                <MotionLink href={homeV10.rhythm.ctaHref} className="home10-rhythm__cta" variants={textReveal}>{homeV10.rhythm.ctaLabel}</MotionLink>
              </motion.div>
            </motion.div>
          </section>

          <section className="home10-intro" aria-labelledby="home10-intro-title">
            <motion.h2 id="home10-intro-title" variants={textReveal} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>{homeV10.intro.title}</motion.h2>
            <motion.div className="home10-intro__content" variants={sectionContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              <motion.p variants={textReveal}>{homeV10.intro.description}</motion.p>
              <motion.div className="home10-intro__stats" variants={cardContainer}>
                {homeV10.intro.stats.map((stat) => <motion.div key={stat.value} variants={cardReveal}><strong>{stat.value}</strong><span>{stat.label}</span></motion.div>)}
              </motion.div>
            </motion.div>
          </section>

          <section className="home10-showcase" aria-labelledby="home10-showcase-title">
            <div className="home10-showcase__outline home10-showcase__outline--right" aria-hidden="true">kombu cha</div>
            <div className="home10-showcase__outline home10-showcase__outline--left" aria-hidden="true">lavic</div>
            <motion.h2 id="home10-showcase-title" variants={textReveal} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>{homeV10.showcase.title}</motion.h2>
            <motion.p className="home10-showcase__desc" variants={textReveal} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>{homeV10.showcase.description}</motion.p>

            <motion.figure className="home10-showcase__bottle" variants={mediaReveal} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              <Image src="/hero/sparkling/bottle.webp" alt="Espumante LaVic" fill sizes="426px" />
            </motion.figure>

            <motion.div className="home10-showcase__purchase" variants={sectionContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              <motion.div variants={textReveal}>
                <h3>{homeV10.showcase.productName}</h3>
                <strong>{homeV10.showcase.price}</strong>
              </motion.div>
              <motion.div className="home10-showcase__actions" variants={textReveal}>
                <Link href={homeV10.showcase.ctaHref}>{homeV10.showcase.ctaLabel}</Link>
                <button type="button" aria-label="Adicionar aos favoritos">♡</button>
              </motion.div>
              <motion.div className="home10-showcase__thumbs" variants={cardContainer}>
                {["/hero/sparkling/bottle.webp", "/hero/sparkling/fruit-scene.webp", "/home-v06/picks/sparkling.webp"].map((src) => (
                  <motion.div key={src} variants={cardReveal}><Image src={src} alt="" fill sizes="99px" /></motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          <section className="home10-trust" aria-label="Diferenciais LaVic">
            <motion.div className="home10-trust__grid" variants={cardContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              {homeV10.trust.map((item) => <motion.article key={item.title} variants={cardReveal}><h3>{item.title}</h3><p>{item.copy}</p></motion.article>)}
            </motion.div>
          </section>

          <section className="home10-b2b" aria-labelledby="home10-b2b-title">
            <motion.div className="home10-b2b__panel" variants={sectionContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              <motion.div className="home10-b2b__copy" variants={textReveal}>
                <span>{homeV10.b2b.kicker}</span>
                <h2 id="home10-b2b-title">{homeV10.b2b.title}</h2>
                <p>{homeV10.b2b.description}</p>
                <Link href={homeV10.b2b.ctaHref}>{homeV10.b2b.ctaLabel}</Link>
              </motion.div>
              <motion.div className="home10-b2b__product home10-b2b__product--large" variants={mediaReveal}>
                <Image src="/home-v09/lavic-limao-cutout.png" alt="LaVic Limão" fill sizes="372px" />
              </motion.div>
              <motion.div className="home10-b2b__product home10-b2b__product--small" variants={mediaReveal}>
                <Image src="/home-v09/lavic-limao-cutout.png" alt="" fill sizes="220px" />
              </motion.div>
            </motion.div>
          </section>

          <footer className="home10-footer">
            <motion.div className="home10-footer__subscribe" variants={sectionContainer} initial="hidden" whileInView="visible" viewport={LAVIC_VIEWPORT}>
              <motion.h2 variants={textReveal}>{homeV10.footer.headline}</motion.h2>
              <MotionLink href="/sabores" variants={textReveal} aria-label="Conhecer a LaVic"><RoundArrow direction="up" /></MotionLink>
            </motion.div>
            <div className="home10-footer__rule" />
            <div className="home10-footer__grid">
              <div className="home10-footer__links">
                <div><h3>{homeV10.footer.helpTitle}</h3>{homeV10.footer.helpLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
                <div><h3>{homeV10.footer.aboutTitle}</h3>{homeV10.footer.aboutLinks.map((item) => <Link key={item.label} href={item.href}>{item.label}</Link>)}</div>
              </div>
              <div className="home10-footer__faq">
                <h3>{homeV10.footer.faqTitle}</h3>
                {homeV10.footer.faq.map((item) => <Link key={item.label} href={item.href}><span>{item.label}</span><span>↗</span></Link>)}
              </div>
            </div>
            <div className="home10-footer__bottom">
              <div><Link href="/sobre">Terms</Link><Link href="/sobre">Privacy</Link><Link href="/sobre">Cookies</Link><Link href="/sobre">Legal</Link></div>
              <p>© 2026 LaVic. Todos os direitos reservados.</p>
              <div className="home10-footer__social" aria-label="Redes sociais"><span>f</span><span>ig</span><span>in</span><span>tt</span><span>yt</span></div>
            </div>
          </footer>
        </main>
      </div>
    </MotionConfig>
  );
}
