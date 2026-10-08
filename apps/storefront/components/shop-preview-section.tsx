import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { products } from "@/data/mocks/products";
import { formatCurrency } from "@/lib/format";

export function ShopPreviewSection() {
  return (
    <section className="shop-preview section-pad" aria-labelledby="shop-preview-title">
      <div className="site-container">
        <div className="shop-preview__heading">
          <div><p className="eyebrow">COMPRAR LAVIC</p><h2 id="shop-preview-title">Escolha pelo sabor.</h2></div>
          <Link href="/sabores" className="text-link">Ver catálogo <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link>
        </div>
        <div className="shop-preview__grid">
          {products.map((product, index) => (
            <Link key={product.id} href={`/produto/${product.slug}`} className="shop-preview-card" style={{ "--shop-accent": product.accent, "--shop-bg": product.softBackground } as CSSProperties}>
              <div className="shop-preview-card__media"><Image src={product.image} alt={`LaVic ${product.name}`} fill sizes="(max-width: 760px) 100vw, 50vw" /></div>
              <div className="shop-preview-card__copy"><span>0{index + 1} · {product.volumeMl} ml</span><h3>{product.name}</h3><p>{product.shortDescription}</p><strong>{formatCurrency(product.priceCents)}</strong></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
