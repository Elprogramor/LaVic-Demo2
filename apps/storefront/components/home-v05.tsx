import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { homeV05Flavors, homeV05Media, homeV05Picks, homeV05Values } from "@/content/home-v05";

export function HomeV05() {
  return (
    <>
      <section className="home5-hero" aria-labelledby="home5-hero-title">
        <div className="site-container home5-hero__grid">
          <div className="home5-hero__copy">
            <p className="home5-kicker">KOMBUCHA LAVIC</p>
            <h1 id="home5-hero-title">Viva com gás.</h1>
            <p className="home5-hero__lead">Sabores para transformar pequenos momentos em uma experiência LaVic.</p>
            <Link className="home5-button home5-button--orange" href="/sabores">
              Conheça os sabores <i className="fi fi-tr-arrow-right" aria-hidden="true" />
            </Link>
          </div>
          <div className="home5-hero__visual" aria-hidden="true">
            <Image src={homeV05Media.hero} alt="" fill priority sizes="(max-width: 860px) 100vw, 58vw" />
          </div>
        </div>
      </section>

      <section className="home5-flavors" aria-labelledby="home5-flavors-title">
        <div className="site-container">
          <div className="home5-section-head home5-section-head--flavors">
            <div>
              <p className="home5-kicker">DESCUBRA SEU SABOR</p>
              <h2 id="home5-flavors-title">Cada sabor,<br />uma nova história.</h2>
            </div>
            <Link className="home5-text-link" href="/sabores">Ver todos os sabores <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
          </div>
          <div className="home5-flavor-grid">
            {homeV05Flavors.map((flavor) => (
              <Link
                key={flavor.id}
                href={flavor.href}
                className="home5-flavor-card"
                style={{ "--home5-flavor-tone": flavor.tone } as CSSProperties}
                aria-label={flavor.demo ? `${flavor.name} — conceito visual de demonstração` : flavor.name}
              >
                <div className="home5-flavor-card__image">
                  <Image src={flavor.image} alt="" fill sizes="(max-width: 720px) 46vw, 16vw" />
                </div>
                <span>{flavor.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home5-picks" aria-labelledby="home5-picks-title">
        <div className="site-container">
          <div className="home5-section-head home5-section-head--compact">
            <div>
              <p className="home5-kicker">COMECE POR AQUI</p>
              <h2 id="home5-picks-title">Três formas de viver <strong>LaVic.</strong></h2>
            </div>
          </div>
          <div className="home5-picks__grid">
            {homeV05Picks.map((pick) => (
              <Link key={pick.title} href={pick.href} className="home5-pick" style={{ "--home5-pick-tone": pick.tone } as CSSProperties}>
                <div className="home5-pick__copy">
                  <p>{pick.eyebrow}</p>
                  <h3>{pick.title}</h3>
                  <span>{pick.copy}</span>
                  <strong>{pick.cta} <i className="fi fi-tr-arrow-right" aria-hidden="true" /></strong>
                </div>
                <div className="home5-pick__media"><Image src={pick.image} alt="" fill sizes="(max-width: 760px) 42vw, 22vw" /></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home5-editorial" aria-labelledby="home5-editorial-title">
        <div className="home5-editorial__media" aria-hidden="true">
          <Image src={homeV05Media.editorial} alt="" fill sizes="100vw" />
        </div>
        <div className="site-container home5-editorial__inner">
          <div className="home5-editorial__copy">
            <p className="home5-kicker home5-kicker--light">LAVIC</p>
            <h2 id="home5-editorial-title">Fermentada.<br />Refrescante.<br />LaVic.</h2>
            <p>Uma bebida fermentada de chá pensada para ser servida bem gelada e acompanhar diferentes momentos.</p>
            <Link href="/sobre" className="home5-button home5-button--cream">Conhecer a LaVic <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="home5-kits" aria-labelledby="home5-kits-title">
        <div className="site-container home5-kits__grid">
          <div className="home5-kits__intro">
            <p className="home5-kicker">KITS LAVIC</p>
            <h2 id="home5-kits-title">Mais sabores<br />para mais momentos.</h2>
            <p>Combinações pensadas para descobrir, compartilhar e variar durante a semana.</p>
            <Link className="home5-text-link" href="/kits">Ver todos os kits <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
          </div>
          <Link className="home5-kit-card home5-kit-card--large" href="/kits">
            <div className="home5-kit-card__copy"><strong>Kit Descoberta</strong><span>Uma seleção para começar.</span></div>
            <div className="home5-kit-card__image"><Image src={homeV05Media.kits.discovery} alt="" fill sizes="(max-width: 760px) 100vw, 35vw" /></div>
            <span className="home5-kit-card__cta">Ver kit <i className="fi fi-tr-arrow-right" aria-hidden="true" /></span>
          </Link>
          <Link className="home5-kit-card" href="/kits">
            <div className="home5-kit-card__copy"><strong>Kit da Semana</strong><span>Mais variedade para a rotina.</span></div>
            <div className="home5-kit-card__image"><Image src={homeV05Media.kits.summer} alt="" fill sizes="(max-width: 760px) 100vw, 28vw" /></div>
            <span className="home5-kit-card__cta">Ver kit <i className="fi fi-tr-arrow-right" aria-hidden="true" /></span>
          </Link>
        </div>
      </section>

      <section className="home5-brand" aria-labelledby="home5-brand-title">
        <div className="home5-brand__texture" aria-hidden="true"><Image src={homeV05Media.brandTexture} alt="" fill sizes="28vw" /></div>
        <div className="site-container home5-brand__inner">
          <div className="home5-brand__copy">
            <p className="home5-kicker">A MARCA</p>
            <h2 id="home5-brand-title">Viva com gás.</h2>
            <p>Uma experiência de sabor construída com cuidado, personalidade e uma identidade feita para ser lembrada.</p>
            <Link href="/sobre" className="home5-button home5-button--orange home5-button--small">Nossa história <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
          </div>
          <div className="home5-values">
            {homeV05Values.map((value, index) => (
              <article key={value.title} className="home5-value">
                <span>0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home5-lifestyle" aria-labelledby="home5-lifestyle-title">
        <div className="site-container home5-lifestyle__grid">
          <div className="home5-lifestyle__copy">
            <p className="home5-kicker">LAVIC NA SUA VIDA</p>
            <h2 id="home5-lifestyle-title">Momentos que<br />ficam melhores.</h2>
            <p>Do almoço tranquilo ao encontro com amigos. A LaVic entra na mesa sem roubar a cena — mas faz parte dela.</p>
          </div>
          <div className="home5-lifestyle__gallery">
            {homeV05Media.lifestyle.map((image, index) => (
              <div key={image} className={`home5-lifestyle__image home5-lifestyle__image--${index + 1}`}><Image src={image} alt="" fill sizes="(max-width: 760px) 100vw, 22vw" /></div>
            ))}
          </div>
        </div>
      </section>

      <section className="home5-b2b" aria-labelledby="home5-b2b-title">
        <div className="site-container home5-b2b__grid">
          <div>
            <p className="home5-kicker home5-kicker--light">LAVIC NO SEU NEGÓCIO</p>
            <h2 id="home5-b2b-title">Sabores que conquistam.</h2>
            <p>Uma frente comercial para restaurantes, cafeterias, mercados e parceiros interessados em levar LaVic aos seus clientes.</p>
          </div>
          <Link href="/revenda" className="home5-button home5-button--outline-light">Quero revender LaVic <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
          <div className="home5-b2b__points" aria-label="Diferenciais para parceiros">
            <span>Condições comerciais</span>
            <span>Suporte de atendimento</span>
            <span>Mix de produtos</span>
            <span>Relacionamento de longo prazo</span>
          </div>
        </div>
      </section>
    </>
  );
}
