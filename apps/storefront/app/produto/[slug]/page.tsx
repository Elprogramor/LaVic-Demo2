import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PublicPage } from "@/components/layout/public-page";
import { ProductPurchase } from "@/components/commerce/product-purchase";
import { ProductGrid } from "@/components/commerce/product-grid";
import { getProductBySlug, products } from "@/data/products";
import { formatCurrency } from "@/lib/format";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return product ? { title: product.name, description: product.shortDescription } : { title: "Produto" };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  const related = products.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <PublicPage>
      <section className="content-shell product-detail">
        <div className="product-gallery-main" style={{ "--product-bg": product.softBackground } as React.CSSProperties}>
          <Image src={product.image} alt={product.name} fill priority sizes="(max-width: 900px) 100vw, 52vw" />
        </div>
        <div className="product-info">
          <span className="eyebrow-pill">{product.badge ?? "LaVic Kombucha"}</span>
          <h1>{product.name}</h1>
          <div className="product-volume">{product.volumeMl} ml · produto demonstrativo</div>
          <div className="product-price">{formatCurrency(product.priceCents)}</div>
          <p className="product-description">{product.description}</p>
          <ProductPurchase product={product} />
          <div className="product-facts">
            <div className="product-fact"><strong>Notas</strong><span>{product.tastingNotes.join(" · ")}</span></div>
            <div className="product-fact"><strong>Serviço</strong><span>{product.servingNote}</span></div>
            <div className="product-fact"><strong>Conservação</strong><span>{product.storageNote}</span></div>
          </div>
        </div>
      </section>
      <section className="content-shell page-section">
        <div className="section-heading"><div><h2>Continue descobrindo.</h2><p>Outras expressões da coleção demonstrativa LaVic.</p></div></div>
        <ProductGrid products={related} />
      </section>
    </PublicPage>
  );
}
