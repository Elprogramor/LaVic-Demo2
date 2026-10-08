import { storeSeoPages } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { StoreSubnav } from "../../../components/store-subnav";
import { StoreSeoView } from "../../../components/store-seo-view";

export default function StoreSeoPage() {
  return <div className="page-stack"><PageHeader eyebrow="Loja / SEO" title="SEO" description="Revise títulos, descriptions e indexação das páginas públicas sem expor configurações sensíveis."/><StoreSubnav/><StoreSeoView pages={storeSeoPages}/><p className="demo-note">Sitemap, robots e metadata técnica continuam sob controle do storefront.</p></div>;
}
