import { marketingCampaigns } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { MarketingSubnav } from "../../../components/marketing-subnav";
import { CampaignsView } from "../../../components/campaigns-view";
import { Button } from "../../../components/ui";

export default function CampaignsPage() {
  return <div className="page-stack"><PageHeader eyebrow="Marketing / Campanhas" title="Campanhas" description="Organize períodos, canais, cupons relacionados e resultados em uma única linha de acompanhamento." actions={<Button icon="plus">Nova campanha</Button>}/><MarketingSubnav/><CampaignsView campaigns={marketingCampaigns}/><p className="demo-note">Métricas demonstrativas para validar a experiência antes da integração de analytics.</p></div>;
}
