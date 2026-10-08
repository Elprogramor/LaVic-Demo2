import { CustomerSegmentsView } from "../../../components/customer-segments-view";
import { CustomersSubnav } from "../../../components/customers-subnav";
import { PageHeader } from "../../../components/page-header";
import { Panel } from "../../../components/ui";
import { customerSegments } from "../../../data/mock-admin";
import { Icon } from "../../../components/icon";

export default function CustomerSegmentsPage() {
  return (
    <div className="page-stack customer-segments-page">
      <PageHeader eyebrow="Relacionamento / Clientes" title="Segmentos" description="Organize a base por comportamento sem transformar o CRM em uma coleção de listas manuais."/>
      <CustomersSubnav/>
      <CustomerSegmentsView segments={customerSegments}/>
      <Panel title="Como os segmentos devem funcionar" className="segment-guidance-panel">
        <div className="segment-guidance-grid"><div><span className="guidance-icon"><Icon name="chart" size={16}/></span><strong>Regras verificáveis</strong><p>Cada segmento explica por que o cliente entrou nele e pode ser recalculado pelo backend.</p></div><div><span className="guidance-icon"><Icon name="users" size={16}/></span><strong>Contexto, não rótulo definitivo</strong><p>Um cliente pode pertencer a mais de um segmento conforme seu comportamento muda.</p></div><div><span className="guidance-icon"><Icon name="check" size={16}/></span><strong>Consentimento preservado</strong><p>Segmentação comercial não libera comunicação em canais sem a preferência correspondente.</p></div></div>
      </Panel>
    </div>
  );
}
