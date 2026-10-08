import Link from "next/link";
import { storeBanners, storeFlavors, storeSections, storeSeoPages } from "../../data/mock-admin";
import { PageHeader } from "../../components/page-header";
import { StoreSubnav } from "../../components/store-subnav";
import { StoreHomeView } from "../../components/store-home-view";
import { StatCard } from "../../components/stat-card";
import { ButtonLink } from "../../components/ui";

export default function StorePage() {
  const published = storeSections.filter(item => item.status === "published").length;
  const draftBanners = storeBanners.filter(item => item.status === "draft").length;
  const liveFlavors = storeFlavors.filter(item => item.status === "published").length;
  const seoIssues = storeSeoPages.filter(item => item.status === "attention").length;
  return <div className="page-stack"><PageHeader eyebrow="Crescimento / Loja" title="Loja" description="Gerencie conteúdo e publicação sem quebrar o design system do storefront." actions={<><ButtonLink href="/store/banners" icon="edit">Editar banners</ButtonLink><ButtonLink href="/store/seo" variant="secondary">Revisar SEO</ButtonLink></>}/><StoreSubnav/><section className="stats-grid store-stats"><StatCard label="Seções publicadas" value={`${published}/${storeSections.length}`} detail="home ativa" icon="store" tone="green"/><StatCard label="Banners em rascunho" value={String(draftBanners)} detail="aguardando revisão" icon="layers" tone="orange"/><StatCard label="Sabores publicados" value={String(liveFlavors)} detail="vinculados ao catálogo" icon="tag" tone="green"/><StatCard label="SEO em atenção" value={String(seoIssues)} detail="revisão recomendada" icon="search" tone="orange"/></section><StoreHomeView sections={[...storeSections]}/><p className="demo-note">O Admin controla conteúdo; o storefront continua responsável por layout, tipografia e componentes.</p></div>;
}
