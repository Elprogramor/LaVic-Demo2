import type { Metadata } from "next";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";
import { ProductGrid } from "@/components/commerce/product-grid";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Sabores" };

export default function FlavorsPage() {
  return (
    <PublicPage>
      <PageHero eyebrow="Coleção LaVic" title="Sabores que têm presença." description="Uma seleção demonstrativa para mostrar como cada sabor pode ganhar identidade própria sem perder a unidade visual da marca." word="SABORES" />
      <section className="content-shell page-section"><ProductGrid products={products} /></section>
      <section className="content-shell page-section editorial-grid">
        <h2>Uma linguagem para cada sabor.</h2>
        <div className="editorial-copy"><p>Cores, imagens, notas sensoriais e ocasiões de consumo podem ser organizadas para facilitar a escolha sem transformar o catálogo em uma vitrine genérica.</p><p>Na versão comercial, disponibilidade, composição e informações de produto devem vir da fonte oficial da LaVic.</p></div>
      </section>
    </PublicPage>
  );
}
