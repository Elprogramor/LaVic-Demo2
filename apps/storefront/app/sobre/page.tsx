import type { Metadata } from "next";
import Image from "next/image";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = { title: "Sobre" };

export default function AboutPage() {
  return (
    <PublicPage>
      <PageHero eyebrow="Nossa essência" title="Uma marca viva também no digital." description="A página institucional foi pensada para transformar história, processo e identidade em percepção de valor — sem competir com a experiência de compra." word="LAVIC" />
      <section className="content-shell page-section editorial-grid">
        <h2>Fermentação natural. Linguagem contemporânea.</h2>
        <div className="editorial-copy"><p>A narrativa desta demonstração parte do princípio de que a LaVic não precisa ser apresentada apenas como uma bebida. Produto, cuidado, processo, ocasiões de consumo e identidade visual podem trabalhar juntos para construir confiança e desejo.</p><p>Antes da publicação comercial, história, origem, ingredientes, processo produtivo e claims devem ser revisados diretamente com a marca.</p></div>
      </section>
      <section className="content-shell page-section">
        <div style={{ position: "relative", minHeight: 520, borderRadius: 32, overflow: "hidden", background: "#f1f2ed" }}><Image src="/home/lifestyle-01.webp" alt="Atmosfera visual LaVic" fill sizes="100vw" style={{ objectFit: "cover" }} /></div>
      </section>
    </PublicPage>
  );
}
