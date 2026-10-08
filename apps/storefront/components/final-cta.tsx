import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

export function FinalCta() {
  const content = homeContent.finalCta;

  return (
    <section className="final-cta section-pad" aria-labelledby="final-cta-title">
      <div className="site-container final-cta__panel">
        <div className="final-cta__copy">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="final-cta-title">{content.title}</h2>
          <p>{content.body}</p>
          <Link className="button button--primary" href="/sabores">
            Ver sabores <i className="fi fi-tr-arrow-right" aria-hidden="true" />
          </Link>
        </div>
        <div className="final-cta__media">
          <Image src="/demo/lime-hero.png" alt="LaVic sabor limão" fill sizes="(max-width: 820px) 100vw, 48vw" />
        </div>
      </div>
    </section>
  );
}
