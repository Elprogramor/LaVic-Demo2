import { CatalogSubnav } from "../../../components/catalog-subnav";
import { CategoriesView } from "../../../components/categories-view";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { Button } from "../../../components/ui";
import { catalogCategories } from "../../../data/mock-admin";

export default function CategoriesPage() {
  return <div className="page-stack core-commerce-page categories-page">
    <PageHeader eyebrow="Catálogo / Categorias" title="Categorias" description="Estruture o catálogo por finalidade comercial, ordem e visibilidade sem misturar organização com produto." actions={<Button icon="plus" disabled title="Criação persistente será ativada com a API">Nova categoria</Button>}/>
    <CatalogSubnav/>
    <div className="stats-grid core-commerce-stats"><StatCard label="Categorias" value={String(catalogCategories.length)} detail="Estrutura atual" icon="tag"/><StatCard label="Visíveis na loja" value={String(catalogCategories.filter((item) => item.storefrontVisible).length)} detail="Storefront" icon="store"/><StatCard label="Produtos vinculados" value={String(catalogCategories.reduce((sum, item) => sum + item.productCount, 0))} detail="Vínculos demonstrativos" icon="box"/><StatCard label="Rascunhos" value={String(catalogCategories.filter((item) => item.status === "draft").length)} detail="Não publicados" icon="edit" tone="orange"/></div>
    <CategoriesView items={catalogCategories}/>
  </div>;
}
