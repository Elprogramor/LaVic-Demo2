import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { OutlineWord } from "@/components/ui/outline-word";
import { ArrowIcon } from "@/components/ui/icons";
import { ProductGrid } from "@/components/commerce/product-grid";
import { products } from "@/data/products";

export function HomePage() {
  return (
    <div className="page-frame">
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <section className="home-hero">
        <SiteHeader />
        <span className="eyebrow-pill home-hero-badge">Descubra toda nossa seleção</span>
        <OutlineWord className="home-hero-word">KOMBUCHA</OutlineWord>
        <div className="home-hero-bottle"><Image src="/products/lavic-limao-cutout.png" alt="Garrafa LaVic Kombucha Limão" fill priority sizes="457px" /></div>
        <div className="home-hero-fade" aria-hidden="true" />
        <div className="home-hero-copy">
          <h1>Seu novo ritual de todos os dias.</h1>
          <p>Uma bebida viva, refrescante e cheia de personalidade para acompanhar a rotina com leveza.</p>
        </div>
        <Link href="/sabores" className="button home-hero-cta">ESCOLHA O SEU</Link>
        <aside className="home-hero-mini" aria-label="Produto em destaque">
          <div className="home-hero-mini-media"><Image src="/products/three-lime-bottles.png" alt="Três garrafas LaVic Limão" fill sizes="145px" /></div>
          <div><strong>LaVic Limão</strong><small>leve, cítrica, viva</small><div className="home-hero-mini-price"><span>R$ 18,90</span><span>★★★★★</span></div></div>
        </aside>
      </section>

      <main id="main-content">
        <section className="home-testimonial">
          <h2>O que dizem</h2>
          <blockquote>
            <p>“Uma experiência de marca que transforma uma bebida artesanal em algo que você quer descobrir, provar e compartilhar.”</p>
            <footer><span className="testimonial-avatar">L</span><span>Demonstração de posicionamento LaVic</span></footer>
          </blockquote>
        </section>

        <section className="home-products content-shell">
          <div className="section-heading">
            <div><h2>Escolha seu sabor.</h2><p>Uma coleção demonstrativa para apresentar como a linha LaVic pode ganhar força visual e comercial em um canal próprio.</p></div>
            <Link href="/sabores" className="arrow-circle" aria-label="Ver todos os sabores"><ArrowIcon /></Link>
          </div>
          <ProductGrid products={products} />
        </section>

        <section className="rhythm-panel">
          <h2>Um novo ritmo para a sua rotina.</h2>
          <div className="rhythm-bottles"><Image src="/products/three-lime-bottles.png" alt="" fill sizes="50vw" /></div>
          <div className="rhythm-copy">
            <p>A LaVic pode ocupar mais do que um espaço na geladeira. A experiência digital ajuda a transformar produto, história, ocasião de consumo e compra em uma jornada única.</p>
            <Link href="/sobre" className="button-secondary">Conheça a LaVic</Link>
          </div>
        </section>

        <section className="content-shell intro-section">
          <h2>Uma breve introdução sobre quem somos.</h2>
          <div className="intro-copy">
            <p>A LaVic transforma fermentação natural em uma bebida contemporânea. A proposta deste storefront é levar essa mesma identidade para o digital, criando um ponto oficial para descobrir produtos, comprar, conhecer a marca e abrir novas oportunidades comerciais.</p>
            <div className="intro-stats">
              <div className="intro-stat"><strong>04</strong><span>sabores na coleção demonstrativa</span></div>
              <div className="intro-stat"><strong>1L</strong><span>formato principal desta apresentação</span></div>
            </div>
          </div>
        </section>

        <section className="sparkling-section">
          <OutlineWord className="sparkling-word-right">kombucha</OutlineWord>
          <OutlineWord className="sparkling-word-left">lavic</OutlineWord>
          <div className="content-shell sparkling-grid">
            <div className="sparkling-media"><Image src="/home/sparkling.webp" alt="Seleção especial LaVic" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="sparkling-copy">
              <span className="eyebrow-pill">Edição especial</span>
              <h2>Espumante LaVic.</h2>
              <p>Uma apresentação premium para mostrar como produtos especiais podem ganhar narrativa própria, ticket diferenciado e destaque dentro da mesma plataforma.</p>
              <div className="sparkling-price">R$ 49,98</div>
              <Link href="/encomendas" className="button">Quero saber mais</Link>
            </div>
          </div>
        </section>

        <section className="trust-strip">
          <div className="content-shell trust-grid">
            <h3>Produto vivo</h3>
            <h3>Marca própria</h3>
            <p>Um canal digital pensado para vender, contar história e criar relacionamento sem depender apenas de plataformas de terceiros.</p>
          </div>
        </section>

        <section className="content-shell b2b-section">
          <div className="b2b-panel">
            <div className="b2b-copy">
              <span>LaVic para negócios</span>
              <h2>Quer levar LaVic para o seu espaço?</h2>
              <p>Uma rota comercial dedicada para cafés, restaurantes, mercados, hotéis, academias, eventos e outros pontos de venda.</p>
              <Link href="/revenda" className="button">Conhecer revenda</Link>
            </div>
            <div className="b2b-bottle"><Image src="/products/lavic-limao-cutout.png" alt="Garrafa LaVic Limão" fill sizes="250px" /></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
