import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

const options = [
  {
    index: "01",
    title: "Kits para descobrir",
    copy: "Combinações para experimentar sabores ou manter LaVic por perto durante a semana.",
    href: "/kits",
    cta: "Conhecer kits",
    image: "/demo/lime-showcase.png",
    className: "lifestyle-card--kits"
  },
  {
    index: "02",
    title: "Ocasiões especiais",
    copy: "Encomendas para eventos, presentes, encontros e pedidos em maior quantidade.",
    href: "/encomendas",
    cta: "Planejar uma encomenda",
    image: "/demo/strawberry-showcase.png",
    className: "lifestyle-card--orders"
  },
  {
    index: "03",
    title: "LaVic para negócios",
    copy: "Uma frente comercial para quem quer incluir kombucha no próprio mix de bebidas.",
    href: "/revenda",
    cta: "Conhecer a revenda",
    image: "/demo/lime-hero.png",
    className: "lifestyle-card--business"
  }
] as const;

export function LifestyleOptionsSection() {
  const content = homeContent.lifestyle;

  return (
    <section className="lifestyle section-pad" aria-labelledby="lifestyle-title">
      <div className="site-container lifestyle__title">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="lifestyle-title">{content.title}</h2>
        </div>
        <p>{content.intro}</p>
      </div>

      <div className="site-container lifestyle__grid">
        {options.map((option) => (
          <article className={`lifestyle-card ${option.className}`} key={option.title}>
            <div className="lifestyle-card__media">
              <Image src={option.image} alt="" fill sizes="(max-width: 820px) 100vw, 58vw" />
            </div>
            <div className="lifestyle-card__body">
              <span className="lifestyle-card__index" aria-hidden="true">{option.index}</span>
              <div>
                <h3>{option.title}</h3>
                <p>{option.copy}</p>
              </div>
              <Link className="text-link" href={option.href}>
                {option.cta} <i className="fi fi-tr-arrow-right" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
