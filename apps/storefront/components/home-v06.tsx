"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { MotionConfig, motion } from "framer-motion";

import { homeV06Flavors, homeV06Media, homeV06Picks, homeV06Values } from "@/content/home-v06";
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

const MotionLink = motion.create(Link);

const premiumHover = (y: number) => ({
  y,
  transition: {
    duration: 0.28,
    ease: LAVIC_EASE,
  },
});

const home8Essentials = [
  {
    index: "01",
    title: "Fermentação",
    copy: "Fermentada naturalmente para preservar a identidade da categoria.",
  },
  {
    index: "02",
    title: "Ingredientes",
    copy: "Ingredientes selecionados e uma comunicação clara em cada sabor.",
  },
  {
    index: "03",
    title: "Bem gelada",
    copy: "Feita para ser mantida refrigerada e servida bem gelada.",
  },
  {
    index: "04",
    title: "Sabores",
    copy: "Perfis diferentes para acompanhar momentos diferentes.",
  },
] as const;

export function HomeV06() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="home8-hero" aria-labelledby="home8-hero-title">
        <div className="home8-hero__wordmark" aria-hidden="true">LaVic</div>

        <div className="site-container home8-hero__grid">
          <motion.div
            className="home8-hero__copy"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="home8-hero__eyebrow" variants={textReveal}>
              KOMBUCHA • FERMENTAÇÃO NATURAL
            </motion.p>
            <motion.h1 id="home8-hero-title" variants={textReveal}>
              Viva <em>com gás.</em>
            </motion.h1>
            <motion.p className="home8-hero__lead" variants={textReveal}>
              Uma experiência leve, viva e refrescante para transformar pequenos momentos do dia.
            </motion.p>
            <MotionLink className="home5-button home6-liquid-button" href="/sabores" variants={textReveal}>
              <span>Conheça os sabores</span>
              <i className="fi fi-tr-arrow-right" aria-hidden="true" />
            </MotionLink>
          </motion.div>

          <motion.figure
            className="home8-hero__product"
            variants={mediaReveal}
            initial="hidden"
            animate="visible"
          >
            <div className="home8-hero__product-frame">
              <Image
                src={homeV06Media.hero}
                alt="Garrafa LaVic Kombucha sabor Limão"
                fill
                priority
                sizes="(max-width: 900px) 82vw, 36vw"
                className="home8-hero__product-image"
              />
            </div>
            <figcaption>
              <span>Limão</span>
              <small>Kombucha • 1L</small>
            </figcaption>
          </motion.figure>

          <motion.aside
            className="home8-hero__meta"
            aria-label="Produto em destaque"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="home8-hero__index" variants={textReveal}>
              <span>01</span>
              <i aria-hidden="true" />
              <small>06</small>
            </motion.div>
            <motion.div className="home8-hero__meta-copy" variants={textReveal}>
              <p>SABOR EM DESTAQUE</p>
              <h2>Limão</h2>
              <span>Cítrica, leve e refrescante.</span>
            </motion.div>
            <MotionLink className="home8-hero__product-link" href="/produto/limao-1l" variants={textReveal}>
              Ver Limão 1L
              <i className="fi fi-tr-arrow-right" aria-hidden="true" />
            </MotionLink>
          </motion.aside>
        </div>

        <motion.div
          className="home8-hero__scroll-note"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72, ease: LAVIC_EASE }}
          aria-hidden="true"
        >
          <span>DESCUBRA A LAVIC</span>
          <i />
        </motion.div>
      </section>

      <section className="home8-alive" aria-labelledby="home8-alive-title">
        <div className="site-container">
          <motion.div
            className="home8-alive__panel"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            <div className="home8-alive__mark" aria-hidden="true">VIVA</div>

            <motion.div className="home8-alive__copy" variants={textReveal}>
              <p className="home8-alive__eyebrow">O QUE FAZ A LAVIC SER LAVIC</p>
              <h2 id="home8-alive-title">Feita para estar viva.</h2>
              <p>
                Kombucha de fermentação natural, ingredientes selecionados e sabores pensados para entrar na rotina sem perder personalidade.
              </p>
              <MotionLink href="/sobre" className="home5-button home6-liquid-button home6-liquid-button--light" variants={textReveal}>
                <span>Conhecer a LaVic</span>
                <i className="fi fi-tr-arrow-right" aria-hidden="true" />
              </MotionLink>
            </motion.div>

            <motion.div className="home8-alive__values" variants={cardContainer}>
              {home8Essentials.map((item) => (
                <motion.article key={item.index} className="home8-alive__value" variants={cardReveal}>
                  <span>{item.index}</span>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="home5-flavors" aria-labelledby="home5-flavors-title">
        <div className="site-container">
          <motion.div
            className="home5-section-head home5-section-head--flavors"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            <motion.div variants={textReveal}>
              <p className="home5-kicker">DESCUBRA SEU SABOR</p>
              <h2 id="home5-flavors-title">Cada sabor,<br />uma nova história.</h2>
            </motion.div>
            <MotionLink className="home5-text-link" href="/sabores" variants={textReveal}>
              Ver todos os sabores <i className="fi fi-tr-arrow-right" aria-hidden="true" />
            </MotionLink>
          </motion.div>

          <motion.div
            className="home5-flavor-grid"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            {homeV06Flavors.map((flavor) => (
              <MotionLink
                key={flavor.id}
                href={flavor.href}
                className="home5-flavor-card"
                style={{ "--home5-flavor-tone": flavor.tone } as CSSProperties}
                aria-label={flavor.demo ? `${flavor.name} — conceito visual de demonstração` : flavor.name}
                variants={cardReveal}
                whileHover={premiumHover(-6)}
              >
                <div className="home5-flavor-card__image">
                  <Image src={flavor.image} alt="" fill sizes="(max-width: 720px) 46vw, 16vw" />
                </div>
                <span>{flavor.name}</span>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="home5-picks" aria-labelledby="home5-picks-title">
        <div className="site-container">
          <motion.div
            className="home5-section-head home5-section-head--compact"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            <motion.div variants={textReveal}>
              <p className="home5-kicker">COMECE POR AQUI</p>
              <h2 id="home5-picks-title">Três formas de viver <strong>LaVic.</strong></h2>
            </motion.div>
          </motion.div>

          <motion.div
            className="home5-picks__grid"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            {homeV06Picks.map((pick) => (
              <MotionLink
                key={pick.title}
                href={pick.href}
                className="home5-pick"
                style={{ "--home5-pick-tone": pick.tone } as CSSProperties}
                variants={cardReveal}
                whileHover={premiumHover(-4)}
              >
                <div className="home5-pick__copy">
                  <p>{pick.eyebrow}</p>
                  <h3>{pick.title}</h3>
                  <span>{pick.copy}</span>
                  <strong>{pick.cta} <i className="fi fi-tr-arrow-right" aria-hidden="true" /></strong>
                </div>
                <div className="home5-pick__media">
                  <Image src={pick.image} alt="" fill sizes="(max-width: 760px) 42vw, 22vw" />
                </div>
              </MotionLink>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="home5-editorial" aria-labelledby="home5-editorial-title">
        <div className="home5-editorial__media" aria-hidden="true">
          <Image src={homeV06Media.editorial} alt="" fill sizes="100vw" />
        </div>
        <div className="site-container home5-editorial__inner">
          <motion.div
            className="home5-editorial__copy"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            <motion.p className="home5-kicker home5-kicker--light" variants={textReveal}>LAVIC</motion.p>
            <motion.h2 id="home5-editorial-title" variants={textReveal}>Fermentada.<br />Refrescante.<br />LaVic.</motion.h2>
            <motion.p variants={textReveal}>
              Uma bebida fermentada de chá pensada para ser servida bem gelada e acompanhar diferentes momentos.
            </motion.p>
            <MotionLink href="/sobre" className="home5-button home6-liquid-button home6-liquid-button--light" variants={textReveal}>
              <span>Conhecer a LaVic</span>
              <i className="fi fi-tr-arrow-right" aria-hidden="true" />
            </MotionLink>
          </motion.div>
        </div>
      </section>

      <section className="home5-kits" aria-labelledby="home5-kits-title">
        <motion.div
          className="site-container home5-kits__grid"
          variants={cardContainer}
          initial="hidden"
          whileInView="visible"
          viewport={LAVIC_VIEWPORT}
        >
          <motion.div className="home5-kits__intro" variants={textReveal}>
            <p className="home5-kicker">KITS LAVIC</p>
            <h2 id="home5-kits-title">Mais sabores<br />para mais momentos.</h2>
            <p>Combinações pensadas para descobrir, compartilhar e variar durante a semana.</p>
            <Link className="home5-text-link" href="/kits">Ver todos os kits <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
          </motion.div>

          <MotionLink
            className="home5-kit-card home5-kit-card--large"
            href="/kits"
            variants={cardReveal}
            whileHover={premiumHover(-5)}
          >
            <div className="home5-kit-card__copy"><strong>Kit Descoberta</strong><span>Uma seleção para começar.</span></div>
            <div className="home5-kit-card__image"><Image src={homeV06Media.kits.discovery} alt="" fill sizes="(max-width: 760px) 100vw, 35vw" /></div>
            <span className="home5-kit-card__cta">Ver kit <i className="fi fi-tr-arrow-right" aria-hidden="true" /></span>
          </MotionLink>

          <MotionLink
            className="home5-kit-card"
            href="/kits"
            variants={cardReveal}
            whileHover={premiumHover(-5)}
          >
            <div className="home5-kit-card__copy"><strong>Kit da Semana</strong><span>Mais variedade para a rotina.</span></div>
            <div className="home5-kit-card__image"><Image src={homeV06Media.kits.summer} alt="" fill sizes="(max-width: 760px) 100vw, 28vw" /></div>
            <span className="home5-kit-card__cta">Ver kit <i className="fi fi-tr-arrow-right" aria-hidden="true" /></span>
          </MotionLink>
        </motion.div>
      </section>

      <section className="home5-brand" aria-labelledby="home5-brand-title">
        <div className="home5-brand__texture" aria-hidden="true"><Image src={homeV06Media.brandTexture} alt="" fill sizes="28vw" /></div>
        <div className="site-container home5-brand__inner">
          <motion.div
            className="home5-brand__copy"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            <motion.p className="home5-kicker" variants={textReveal}>A MARCA</motion.p>
            <motion.h2 id="home5-brand-title" variants={textReveal}>Viva com gás.</motion.h2>
            <motion.p variants={textReveal}>
              Uma experiência de sabor construída com cuidado, personalidade e uma identidade feita para ser lembrada.
            </motion.p>
            <MotionLink href="/sobre" className="home5-button home5-button--small home6-liquid-button" variants={textReveal}>
              <span>Nossa história</span>
              <i className="fi fi-tr-arrow-right" aria-hidden="true" />
            </MotionLink>
          </motion.div>

          <motion.div
            className="home5-values"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            {homeV06Values.map((value, index) => (
              <motion.article key={value.title} className="home5-value" variants={cardReveal}>
                <span>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="home5-lifestyle" aria-labelledby="home5-lifestyle-title">
        <div className="site-container home5-lifestyle__grid">
          <motion.div
            className="home5-lifestyle__copy"
            variants={sectionContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            <motion.p className="home5-kicker" variants={textReveal}>LAVIC NA SUA VIDA</motion.p>
            <motion.h2 id="home5-lifestyle-title" variants={textReveal}>Momentos que<br />ficam melhores.</motion.h2>
            <motion.p variants={textReveal}>
              Do almoço tranquilo ao encontro com amigos. A LaVic entra na mesa sem roubar a cena — mas faz parte dela.
            </motion.p>
          </motion.div>

          <motion.div
            className="home5-lifestyle__gallery"
            variants={cardContainer}
            initial="hidden"
            whileInView="visible"
            viewport={LAVIC_VIEWPORT}
          >
            {homeV06Media.lifestyle.map((image, index) => (
              <motion.div
                key={image}
                className={`home5-lifestyle__image home5-lifestyle__image--${index + 1}`}
                variants={mediaReveal}
              >
                <Image src={image} alt="" fill sizes="(max-width: 760px) 100vw, 22vw" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="home5-b2b" aria-labelledby="home5-b2b-title">
        <motion.div
          className="site-container home5-b2b__grid"
          variants={sectionContainer}
          initial="hidden"
          whileInView="visible"
          viewport={LAVIC_VIEWPORT}
        >
          <motion.div variants={textReveal}>
            <p className="home5-kicker home5-kicker--light">LAVIC NO SEU NEGÓCIO</p>
            <h2 id="home5-b2b-title">Sabores que conquistam.</h2>
            <p>Uma frente comercial para restaurantes, cafeterias, mercados e parceiros interessados em levar LaVic aos seus clientes.</p>
          </motion.div>
          <MotionLink href="/revenda" className="home5-button home6-liquid-button home6-liquid-button--light" variants={textReveal}>
            <span>Quero revender LaVic</span>
            <i className="fi fi-tr-arrow-right" aria-hidden="true" />
          </MotionLink>
          <motion.div className="home5-b2b__points" aria-label="Diferenciais para parceiros" variants={textReveal}>
            <span>Condições comerciais</span>
            <span>Suporte de atendimento</span>
            <span>Mix de produtos</span>
            <span>Relacionamento de longo prazo</span>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
}
