import type { Metadata } from "next";
import { PublicPage } from "@/components/layout/public-page";
import { PageHero } from "@/components/layout/page-hero";
import { CartPageContent } from "@/components/commerce/cart-page-content";

export const metadata: Metadata = { title: "Carrinho" };

export default function CartPage() {
  return <PublicPage><PageHero eyebrow="Sua seleção" title="Carrinho" description="Revise os produtos antes de seguir para a etapa demonstrativa de checkout." word="CARRINHO" /><CartPageContent /></PublicPage>;
}
