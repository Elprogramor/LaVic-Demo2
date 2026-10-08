import type { Metadata } from "next";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";
import { LeadForm } from "@/components/commerce/lead-form";

export const metadata: Metadata = { title: "Encomendas" };

export default function OrdersPage() {
  return (
    <PublicPage>
      <PageHero eyebrow="Eventos e pedidos especiais" title="LaVic para momentos fora da rotina." description="Uma rota demonstrativa para pedidos especiais, eventos, presentes corporativos e necessidades que não cabem no carrinho comum." word="ENCOMENDAS" />
      <section className="content-shell page-section editorial-grid">
        <div><h2>Conte o que você está planejando.</h2><p className="editorial-copy">A estrutura pode evoluir para orçamentos, volumes mínimos, kits personalizados e acompanhamento de solicitações.</p></div>
        <div className="checkout-card"><h2>Solicitar contato</h2><LeadForm kind="encomenda" /></div>
      </section>
    </PublicPage>
  );
}
