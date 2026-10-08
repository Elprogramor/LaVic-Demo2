import type { Product } from "@lavic/domain";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";

function Arrow() { return <span aria-hidden="true">→</span>; }

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="lavic-product-grid">
      {products.map((product, index) => (
        <article className="lavic-product-card" key={product.id}>
          <Link href={`/produto/${product.slug}`} className="lavic-product-card__visual" style={{ background: product.softBackground }}>
            <span className="lavic-product-card__index">0{index + 1}</span>
            <Image src={product.image} alt={`LaVic ${product.name}`} fill sizes="(max-width: 800px) 92vw, 42vw" />
          </Link>
          <div className="lavic-product-card__body">
            <div>
              <p>{product.volumeMl} ml</p>
              <h2>LaVic {product.name}</h2>
              <span>{product.shortDescription}</span>
            </div>
            <div className="lavic-product-card__footer">
              <strong>{formatCurrency(product.priceCents)}</strong>
              <Link href={`/produto/${product.slug}`}>Ver produto <Arrow /></Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
