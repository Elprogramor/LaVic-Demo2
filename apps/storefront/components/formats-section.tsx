import Image from "next/image";
import Link from "next/link";
import { homeContent } from "@/content/home";

const formats = [
  {
    key: "1l",
    number: "01",
    title: "1 litro",
    copy: "Para ter na geladeira e compartilhar sem pressa.",
    image: "/demo/lime-bottle-cutout.png",
    href: "/produto/limao-1l",
    className: "format-item--one"
  },
  {
    key: "500ml",
    number: "02",
    title: "500 ml",
    copy: "Um formato pensado para acompanhar a rotina.",
    image: "/demo/lime-bottle-cutout.png",
    href: "/sabores",
    className: "format-item--small"
  },
  {
    key: "sparkling",
    number: "03",
    title: "Espumante",
    copy: "Uma apresentação especial para celebrar e presentear.",
    image: "/demo/sparkling-placeholder.png",
    href: "/encomendas",
    className: "format-item--sparkling"
  }
] as const;

export function FormatsSection() {
  const content = homeContent.formats;

  return (
    <section className="formats-v2 section-pad" id="formatos" aria-labelledby="formats-title">
      <div className="site-container formats-v2__heading">
        <div>
          <p className="eyebrow">{content.eyebrow}</p>
          <h2 id="formats-title">{content.title}</h2>
        </div>
        <p>{content.intro}</p>
      </div>

      <div className="site-container formats-v2__rail">
        {formats.map((format) => (
          <Link className={`format-item ${format.className}`} href={format.href} key={format.key}>
            <span className="format-item__index" aria-hidden="true">{format.number}</span>
            <div className="format-item__visual">
              <Image src={format.image} alt="" fill sizes="(max-width: 820px) 34vw, 16vw" />
            </div>
            <div className="format-item__copy">
              <h3>{format.title}</h3>
              <p>{format.copy}</p>
            </div>
            <span className="format-item__action" aria-hidden="true"><i className="fi fi-tr-arrow-right" /></span>
          </Link>
        ))}
      </div>
    </section>
  );
}
