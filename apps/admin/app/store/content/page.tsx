import { storeContentBlocks } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { StoreSubnav } from "../../../components/store-subnav";
import { StoreContentView } from "../../../components/store-content-view";
import { Button } from "../../../components/ui";

export default function StoreContentPage() {
  return <div className="page-stack"><PageHeader eyebrow="Loja / Conteúdo" title="Conteúdo institucional" description="Textos e páginas da marca com estruturas pré-definidas e responsáveis claros." actions={<Button icon="plus">Novo conteúdo</Button>}/><StoreSubnav/><StoreContentView blocks={storeContentBlocks}/><p className="demo-note">O editor livre de layout não faz parte do escopo: preservamos a identidade visual no código.</p></div>;
}
