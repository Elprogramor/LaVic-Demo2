import { products } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { StoreSubnav } from "../../../components/store-subnav";
import { StoreHighlightsView } from "../../../components/store-highlights-view";
import { Button } from "../../../components/ui";

export default function StoreHighlightsPage() {
  return <div className="page-stack"><PageHeader eyebrow="Loja / Destaques" title="Produtos em destaque" description="Defina a seleção editorial da home sem duplicar preço, estoque ou cadastro." actions={<Button icon="plus">Adicionar produto</Button>}/><StoreSubnav/><StoreHighlightsView products={products}/><p className="demo-note">Ordem e seleção são demonstrativas até a conexão com a API de conteúdo.</p></div>;
}
