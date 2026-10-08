import { storeFlavors } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { StoreSubnav } from "../../../components/store-subnav";
import { StoreFlavorsView } from "../../../components/store-flavors-view";

export default function StoreFlavorsPage() {
  return <div className="page-stack"><PageHeader eyebrow="Loja / Sabores" title="Sabores" description="Controle presença editorial e vínculo com o catálogo sem transformar conceitos em produtos reais."/><StoreSubnav/><div className="demo-safety-note"><strong>Proteção de demonstração</strong><span>Sabores marcados como DEMO permanecem rascunho e nunca devem ser publicados automaticamente.</span></div><StoreFlavorsView flavors={storeFlavors}/></div>;
}
