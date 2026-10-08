import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";
import { kits } from "@/data/kits";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = { title: "Kits" };

export default function KitsPage() {
  return (
    <PublicPage>
      <PageHero eyebrow="Para compartilhar" title="Kits que transformam ocasião em experiência." description="Combinações pensadas para descoberta, presente, eventos e aumento de ticket médio." word="KITS" />
      <section className="content-shell page-section kit-grid">
        {kits.map((kit) => (
          <article className="kit-card" key={kit.id}>
            <div className="kit-card-media"><Image src={kit.image} alt={kit.name} fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
            <div className="kit-card-copy"><h2>{kit.name}</h2><p>{kit.description}</p><p><strong>{formatCurrency(kit.priceCents)}</strong></p><Link href="/sabores" className="button">Explorar composição</Link></div>
          </article>
        ))}
      </section>
    </PublicPage>
  );
}
