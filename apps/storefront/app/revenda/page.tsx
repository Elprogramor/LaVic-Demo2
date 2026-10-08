import type { Metadata } from "next";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";
import { LeadForm } from "@/components/commerce/lead-form";

export const metadata: Metadata = { title: "Revenda" };

export default function WholesalePage() {
  return (
    <PublicPage>
      <PageHero eyebrow="LaVic para negócios" title="Uma porta de entrada comercial própria." description="Cafés, restaurantes, mercados, hotéis, academias, eventos e outros parceiros podem ter um caminho claro para conhecer a proposta e iniciar contato." word="REVENDA" />
      <section className="content-shell page-section editorial-grid">
        <div><h2>Mais do que um formulário de contato.</h2><div className="feature-list" style={{ marginTop: 36 }}><div className="feature-row"><strong>Qualificação</strong><span>Entender perfil, volume e tipo de estabelecimento.</span></div><div className="feature-row"><strong>Apresentação</strong><span>Centralizar posicionamento, linha e diferenciais para o parceiro.</span></div><div className="feature-row"><strong>Escala</strong><span>Criar um canal que pode evoluir para catálogo B2B, tabela e recorrência.</span></div></div></div>
        <div className="checkout-card"><h2>Quero revender LaVic</h2><LeadForm kind="revenda" /></div>
      </section>
    </PublicPage>
  );
}
