import { PageHeader } from "../../components/page-header";
import { ProductsView } from "../../components/products-view";
import { Button, ButtonLink } from "../../components/ui";
import { CatalogSubnav } from "../../components/catalog-subnav";
import { products } from "../../data/mock-admin";

export default function ProductsPage() {
  return (
    <div className="page-stack products-page">
      <PageHeader
        eyebrow="Catálogo / Produtos"
        title="Produtos"
        description="Gerencie o catálogo, canais, estoque e status dos produtos."
        actions={<><Button variant="secondary" icon="export">Exportar</Button><ButtonLink href="/coming-soon?module=Novo%20produto" icon="plus">Novo produto</ButtonLink></>}
      />
      <CatalogSubnav/>
      <ProductsView products={products}/>
    </div>
  );
}
