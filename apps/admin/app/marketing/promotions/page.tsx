import { marketingPromotions } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { MarketingSubnav } from "../../../components/marketing-subnav";
import { PromotionsView } from "../../../components/promotions-view";
import { Button } from "../../../components/ui";

export default function PromotionsPage() {
  return <div className="page-stack"><PageHeader eyebrow="Marketing / Promoções" title="Promoções" description="Regras de preço, quantidade, kits e frete sem misturar promoção com cadastro do produto." actions={<Button icon="plus">Nova promoção</Button>}/><MarketingSubnav/><div className="promotion-policy"><strong>Regra de segurança comercial</strong><span>O Admin configura a intenção da promoção; a API valida preço final, disponibilidade, período e elegibilidade no fechamento do pedido.</span></div><PromotionsView promotions={marketingPromotions}/><p className="demo-note">Ações de edição permanecem demonstrativas nesta fase.</p></div>;
}
