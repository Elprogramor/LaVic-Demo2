import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

const facts = [
  ["01", "Fermentação", "Tempo e cultura fazem parte do processo."],
  ["02", "Ingredientes", "Sabores construídos com uma direção simples e fresca."],
  ["03", "Experiência", "Uma bebida pensada para chegar à mesa bem gelada."]
] as const;

export function BrandStorySection() {
  const content = homeContent.story;

  return (
    <section className="brand-story section-pad" aria-labelledby="story-title">
      <div className="site-container brand-story__grid">
        <div className="brand-story__visual">
          <div className="brand-story__image">
            <Image src="/demo/lime-ingredient.png" alt="Limões que representam o sabor cítrico da LaVic" fill sizes="(max-width: 820px) 100vw, 44vw" />
          </div>
          <p className="brand-story__caption">limão · frescor · tempo</p>
        </div>

        <div className="brand-story__copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="story-title">{content.title}</h2>
          <p>{content.body}</p>

          <div className="brand-story__facts">
            {facts.map(([number, title, copy]) => (
              <article key={number}>
                <span aria-hidden="true">{number}</span>
                <strong>{title}</strong>
                <p>{copy}</p>
              </article>
            ))}
          </div>

          <Link className="text-link" href="/sobre">
            Conhecer a história <i className="fi fi-tr-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
