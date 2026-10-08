import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card" style={{ "--card-bg": product.softBackground } as React.CSSProperties}>
      <Link href={`/produto/${product.slug}`} className="product-card-media">
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 25vw" />
      </Link>
      <div className="product-card-meta">
        <span className="product-card-kicker">{product.flavor} · {product.volumeMl / 1000}L</span>
        <h3><Link href={`/produto/${product.slug}`}>{product.name}</Link></h3>
        <div className="product-card-bottom">
          <span className="product-card-price">{formatCurrency(product.priceCents)}</span>
          <span className="product-card-status">{product.available ? "Disponível" : "Em breve"}</span>
        </div>
      </div>
    </article>
  );
}
