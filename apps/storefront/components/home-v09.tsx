"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MotionConfig, motion } from "framer-motion";

import { CartDrawer } from "@/components/cart-drawer";
import { useCart } from "@/components/cart-provider";
import {
  LAVIC_EASE,
  LAVIC_VIEWPORT,
  cardContainer,
  cardReveal,
  heroContainer,
  mediaReveal,
  sectionContainer,
  textReveal,
} from "@/components/motion/lavic-motion";
import { homeV09 } from "@/content/home-v09";

const MotionLink = motion.create(Link);

const NAVIGATION = [
  { label: "Início", href: "/" },
  { label: "Sabores", href: "/sabores" },
  { label: "Kits", href: "/kits" },
  { label: "Revenda", href: "/revenda" },
  { label: "Sobre", href: "/sobre" },
] as const;

function HomeV09Header() {
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
      <header className="home9-header">
        <div className="home9-shell home9-header__inner">
          <Link href="/" className="home9-brand" aria-label="LaVic — página inicial">
            <Image src="/brand/lavic-logo-color.png" alt="LaVic Kombucha" width={150} height={68} priority />
          </Link>

          <nav className="home9-nav" aria-label="Navegação principal">
            {NAVIGATION.map((item, index) => (
              <Link key={item.href} href={item.href} className={index === 0 ? "is-active" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="home9-header__actions">
            <Link className="home9-icon-button" href="/conta" aria-label="Minha conta">
              <i className="fi fi-tr-circle-user" aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="home9-cart"
              onClick={() => setOpen(true)}
              aria-label={itemCount > 0 ? `Abrir carrinho com ${itemCount} item(ns)` : "Abrir carrinho"}
            >
              <span className="home9-cart__icon"><i className="fi fi-tr-shopping-basket" aria-hidden="true" /></span>
              <span className="home9-cart__label">CARRINHO ({itemCount})</span>
            </button>
            <button
              type="button"
              className="home9-menu-button"
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="home9-mobile-menu"
              onClick={() => setMenuOpen((value) => !value)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        <nav id="home9-mobile-menu" className={`home9-mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação mobile">
          {NAVIGATION.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>
          ))}
        </nav>
      </header>
      <CartDrawer />
    </>
  );
}

function ArrowCircle({ label }: { label: string }) {
  return (
    <span className="home9-arrow-circle" aria-label={label}>
      <span aria-hidden="true">↗</span>
    </span>
  );
}

function HomeV09Footer() {
  return (
    <footer className="home9-footer">
      <div className="home9-shell">
        <motion.div
          className="home9-footer__headline"
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={LAVIC_VIEWPORT}
        >
          <motion.h2 variants={textReveal}>Viva com gás.</motion.h2>
          <MotionLink href="/sabores" aria-label="Conhecer os sabores LaVic" variants={textReveal}>
            <ArrowCircle label="Conhecer os sabores" />
          </MotionLink>
        </motion.div>

        <div className="home9-footer__rule" />

        <div className="home9-footer__grid">
          <div className="home9-footer__links">
            <div>
              <h3>Ajuda & informações</h3>
              <Link href="/conta/pedidos">Pedidos</Link>
              <Link href="/checkout">Entrega e retirada</Link>
              <Link href="/carrinho">Carrinho</Link>
              <Link href="/conta">Minha conta</Link>
            </div>
            <div>
              <h3>Sobre a LaVic</h3>
              <Link href="/sobre">Nossa história</Link>
              <Link href="/sabores">Sabores</Link>
              <Link href="/kits">Kits</Link>
              <Link href="/revenda">Revenda</Link>
            </div>
          </div>

          <div className="home9-footer__faq">
            <h3>Talvez sua dúvida já tenha uma resposta.</h3>
            <div>
              {homeV09.footer.questions.map((question) => (
                <Link key={question.label} href={question.href}>
                  <span>{question.label}</span>
                  <span aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="home9-footer__bottom">
          <div className="home9-footer__legal">
            <Link href="/sobre">Termos</Link>
            <Link href="/sobre">Privacidade</Link>
            <Link href="/sobre">Cookies</Link>
            <Link href="/sobre">Legal</Link>
          </div>
          <p>© 2026 LaVic. Todos os direitos reservados.</p>
          <div className="home9-footer__social" aria-label="Redes e canais">
            <span>IG</span><span>WA</span><span>YT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function HomeV09() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="home9-page">
        <HomeV09Header />

        <main id="conteudo-principal">
          <section className="home9-hero" aria-labelledby="home9-hero-title">
            <div className="home9-shell home9-hero__stage">
              <motion.div
                className="home9-hero__badge"
                variants={textReveal}
                initial="hidden"
                animate="visible"
              >
                {homeV09.hero.badge}
              </motion.div>

              <motion.div
                className="home9-hero__word"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.08, ease: LAVIC_EASE }}
                aria-hidden="true"
              >
                LAVIC
              </motion.div>

              <motion.figure
                className="home9-hero__bottle"
                variants={mediaReveal}
                initial="hidden"
                animate="visible"
              >
                <Image
                  src="/home-v09/lavic-limao-cutout.png"
                  alt="Garrafa LaVic Kombucha Limão 1L"
                  fill
                  priority
                  sizes="(max-width: 760px) 78vw, 32vw"
                />
              </motion.figure>

              <motion.div
                className="home9-hero__copy"
                variants={heroContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 id="home9-hero-title" variants={textReveal}>{homeV09.hero.title}</motion.h1>
                <motion.p variants={textReveal}>{homeV09.hero.description}</motion.p>
              </motion.div>

              <motion.aside
                className="home9-hero__mini"
                variants={heroContainer}
                initial="hidden"
                animate="visible"
                aria-label="Produto em destaque"
              >
                <motion.div className="home9-hero__mini-image" variants={mediaReveal}>
                  <Image src="/home-v06/flavors/lime.webp" alt="LaVic Limão" fill sizes="130px" />
                </motion.div>
                <motion.div className="home9-hero__mini-copy" variants={textReveal}>
                  <strong>{homeV09.hero.productName}</strong>
                  <span>{homeV09.hero.productMeta}</span>
                  <small>{homeV09.hero.productPrice}</small>
                </motion.div>
              </motion.aside>

              <motion.div
                className="home9-hero__manifesto"
                variants={sectionContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.div className="home9-hero__manifesto-label" variants={textReveal}>
                  <span>Viva com gás.</span>
                  <div className="home9-mini-arrows" aria-hidden="true"><i>←</i><i>→</i></div>
                </motion.div>
                <motion.blockquote variants={textReveal}>
                  <span className="home9-quote-mark" aria-hidden="true">“</span>
                  <p>{homeV09.manifesto.quote}</p>
                  <footer>
                    <strong>{homeV09.manifesto.author}</strong>
                    <small>{homeV09.manifesto.role}</small>
                  </footer>
                </motion.blockquote>
              </motion.div>

              <MotionLink
                href={homeV09.hero.productHref}
                className="home9-floating-arrow"
                aria-label="Ver produto em destaque"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <span aria-hidden="true">↓</span>
              </MotionLink>
            </div>
          </section>

          <section className="home9-benefit" aria-labelledby="home9-benefit-title">
            <div className="home9-shell">
              <motion.div
                className="home9-benefit__panel"
                variants={sectionContainer}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                <motion.h2 id="home9-benefit-title" variants={textReveal}>{homeV09.benefitPanel.title}</motion.h2>

                <motion.div className="home9-benefit__visual" variants={mediaReveal}>
                  <div className="home9-accent home9-accent--yellow" aria-hidden="true" />
                  <Image src="/home-v06/picks/discovery.webp" alt="Seleção de kombuchas LaVic" fill sizes="(max-width: 760px) 90vw, 32vw" />
                  <div className="home9-accent home9-accent--pink" aria-hidden="true" />
                </motion.div>

                <motion.div className="home9-benefit__content" variants={cardContainer}>
                  <motion.p variants={textReveal}>{homeV09.benefitPanel.description}</motion.p>
                  <motion.div className="home9-benefit__cards" variants={cardContainer}>
                    <motion.div className="home9-benefit-card" variants={cardReveal}>
                      <Image src="/home-v06/flavors/lime.webp" alt="LaVic Limão" fill sizes="220px" />
                    </motion.div>
                    <motion.div className="home9-benefit-card" variants={cardReveal}>
                      <Image src="/home-v06/flavors/strawberry.webp" alt="LaVic Morango" fill sizes="220px" />
                    </motion.div>
                  </motion.div>
                  <motion.p className="home9-benefit__detail" variants={textReveal}>{homeV09.benefitPanel.detail}</motion.p>
                  <MotionLink href="/sobre" className="home9-outline-link" variants={textReveal}>Conheça a LaVic</MotionLink>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="home9-intro" aria-labelledby="home9-intro-title">
            <div className="home9-shell home9-intro__grid">
              <motion.h2
                id="home9-intro-title"
                variants={textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                {homeV09.intro.title}
              </motion.h2>

              <motion.div
                className="home9-intro__content"
                variants={sectionContainer}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                <motion.p variants={textReveal}>{homeV09.intro.description}</motion.p>
                <motion.div className="home9-intro__stats" variants={cardContainer}>
                  {homeV09.intro.stats.map((stat) => (
                    <motion.div key={stat.value} variants={cardReveal}>
                      <strong>{stat.value}</strong>
                      <span>{stat.label}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="home9-showcase" aria-labelledby="home9-showcase-title">
            <div className="home9-showcase__marquee" aria-hidden="true">
              <span>LAVIC</span>
              <span>VIVA COM GÁS</span>
            </div>

            <div className="home9-shell home9-showcase__lead">
              <motion.h2
                id="home9-showcase-title"
                variants={textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                {homeV09.showcase.kicker}
              </motion.h2>
              <motion.p
                variants={textReveal}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                {homeV09.showcase.description}
              </motion.p>
            </div>

            <div className="home9-shell home9-showcase__product">
              <motion.div
                className="home9-showcase__image-wrap"
                variants={mediaReveal}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                <div className="home9-accent home9-accent--green" aria-hidden="true" />
                <Image src="/home-v09/lavic-limao-cutout.png" alt="LaVic Kombucha Limão 1L" fill sizes="(max-width: 760px) 80vw, 42vw" />
                <div className="home9-accent home9-accent--yellow home9-accent--showcase" aria-hidden="true" />
              </motion.div>

              <motion.div
                className="home9-showcase__purchase"
                variants={sectionContainer}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                <motion.div variants={textReveal}>
                  <span className="home9-showcase__eyebrow">Kombucha LaVic</span>
                  <h3>{homeV09.showcase.productName}</h3>
                  <strong>{homeV09.showcase.price}</strong>
                </motion.div>

                <motion.div className="home9-showcase__actions" variants={textReveal}>
                  <Link href={homeV09.showcase.href} className="home9-buy-button">Comprar agora</Link>
                  <Link href="/carrinho" className="home9-heart-button" aria-label="Ver carrinho"><i className="fi fi-tr-shopping-basket" aria-hidden="true" /></Link>
                </motion.div>

                <motion.div className="home9-showcase__thumbs" variants={cardContainer} aria-label="Variações visuais do produto">
                  {["/home-v06/flavors/lime.webp", "/home-v06/picks/lime.webp", "/home-v06/lifestyle/lifestyle-02.webp"].map((src) => (
                    <motion.div key={src} variants={cardReveal}>
                      <Image src={src} alt="" fill sizes="100px" />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section className="home9-trust" aria-label="Diferenciais LaVic">
            <motion.div
              className="home9-shell home9-trust__grid"
              variants={cardContainer}
              initial="hidden"
              whileInView="visible"
              viewport={LAVIC_VIEWPORT}
            >
              {homeV09.trust.map((item) => (
                <motion.article key={item.title} variants={cardReveal}>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </motion.article>
              ))}
            </motion.div>
          </section>

          <section className="home9-promo" aria-labelledby="home9-promo-title">
            <div className="home9-shell">
              <motion.div
                className="home9-promo__panel"
                variants={sectionContainer}
                initial="hidden"
                whileInView="visible"
                viewport={LAVIC_VIEWPORT}
              >
                <motion.div className="home9-promo__copy" variants={textReveal}>
                  <span>{homeV09.promo.kicker}</span>
                  <h2 id="home9-promo-title">{homeV09.promo.title}</h2>
                  <p>{homeV09.promo.description}</p>
                  <Link href={homeV09.promo.href} className="home9-promo__button">Ver kits</Link>
                </motion.div>

                <motion.div className="home9-promo__image" variants={mediaReveal}>
                  <div className="home9-accent home9-accent--yellow" aria-hidden="true" />
                  <Image src="/home-v06/kits/summer.webp" alt="Kit LaVic com diferentes sabores" fill sizes="(max-width: 760px) 90vw, 52vw" />
                  <div className="home9-accent home9-accent--pink" aria-hidden="true" />
                </motion.div>
              </motion.div>
            </div>
          </section>
        </main>

        <HomeV09Footer />
      </div>
    </MotionConfig>
  );
}
