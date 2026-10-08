import { storeBanners } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { StoreSubnav } from "../../../components/store-subnav";
import { StoreBannersView } from "../../../components/store-banners-view";
import { Button } from "../../../components/ui";

export default function StoreBannersPage() {
  return <div className="page-stack"><PageHeader eyebrow="Loja / Banners" title="Banners" description="Conteúdo, CTA, ativos desktop/mobile e publicação em uma estrutura controlada." actions={<Button icon="plus">Novo banner</Button>}/><StoreSubnav/><StoreBannersView banners={storeBanners}/><p className="demo-note">Caminhos de assets são demonstrativos e devem ser validados contra o storefront na integração final.</p></div>;
}
