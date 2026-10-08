import { marketingCampaigns } from "../../../data/mock-admin";
import { PageHeader } from "../../../components/page-header";
import { MarketingSubnav } from "../../../components/marketing-subnav";
import { MarketingPerformanceView } from "../../../components/marketing-performance-view";

export default function MarketingPerformancePage() {
  return <div className="page-stack"><PageHeader eyebrow="Marketing / Performance" title="Performance" description="Leia aquisição e conversão sem misturar atribuição de campanha com o financeiro oficial."/><MarketingSubnav/><MarketingPerformanceView campaigns={marketingCampaigns}/><p className="demo-note">Analytics e atribuição ainda são dados demonstrativos.</p></div>;
}
