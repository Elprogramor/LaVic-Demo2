import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/mocks/products";
import { homeContent } from "@/content/home";

const flavorCopy = {
  lime: {
    label: "cítrico · leve · refrescante",
    points: ["perfil cítrico", "servir bem gelada", "para a rotina"]
  },
  strawberry: {
    label: "frutado · vivo · delicado",
    points: ["perfil frutado", "servir bem gelada", "para momentos leves"]
  }
} as const;

export function FlavorShowcase() {
  const content = homeContent.flavors;

  return (
    <section className="flavors-v2 section-pad" id="sabores-home" aria-labelledby="flavors-title">
      <div className="site-container flavors-v2__heading">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2 id="flavors-title">{content.title}</h2>
      </div>

      <div className="site-container flavors-v2__list">
        {products.map((product, index) => {
          const copy = flavorCopy[product.flavor as keyof typeof flavorCopy];
          return (
            <article className={`flavor-v2 flavor-v2--${product.flavor}`} key={product.id}>
              <div className="flavor-v2__copy">
                <span className="flavor-v2__number" aria-hidden="true">0{index + 1}</span>
                <p className="flavor-v2__label">{copy?.label}</p>
                <h3>{product.name}</h3>
                <p className="flavor-v2__description">{product.shortDescription}</p>
                <ul>
                  {copy?.points.map((point) => (
                    <li key={point}><span className="flavor-v2__tick" aria-hidden="true" />{point}</li>
                  ))}
                </ul>
                <Link className="button button--flavor" href={`/produto/${product.slug}`}>
                  Conhecer {product.name} <i className="fi fi-tr-arrow-right" aria-hidden="true" />
                </Link>
              </div>
              <div className="flavor-v2__media">
                <Image src={product.image} alt={`LaVic sabor ${product.name}`} fill sizes="(max-width: 820px) 100vw, 55vw" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
