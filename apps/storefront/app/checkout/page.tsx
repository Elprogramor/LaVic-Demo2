import type { Metadata } from "next";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";
import { CheckoutDemo } from "@/components/commerce/checkout-demo";

export const metadata: Metadata = { title: "Checkout" };

export default function CheckoutPage() {
  return <PublicPage><PageHero eyebrow="Etapa demonstrativa" title="Checkout" description="Uma jornada limpa para mostrar como a compra pode evoluir para entrega, pagamento e confirmação reais." word="CHECKOUT" /><CheckoutDemo /></PublicPage>;
}
