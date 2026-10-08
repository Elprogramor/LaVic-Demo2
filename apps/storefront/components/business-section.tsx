import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

export function BusinessSection() {
  const content = homeContent.business;

  return (
    <section className="business-v2" aria-labelledby="business-title">
      <div className="business-v2__media">
        <Image src="/demo/lime-showcase.png" alt="Apresentação de produtos LaVic" fill sizes="(max-width: 820px) 100vw, 50vw" />
      </div>
      <div className="business-v2__copy">
        <div className="business-v2__copy-inner">
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="business-title">{content.title}</h2>
          <p>{content.body}</p>
          <Link href="/revenda" className="button button--light">
            Conversar sobre revenda <i className="fi fi-tr-arrow-right" aria-hidden="true" />
          </Link>
        </div>
        <p className="business-v2__aside">cafés · restaurantes · mercados · eventos</p>
      </div>
    </section>
  );
}
