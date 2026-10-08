import Link from "next/link";
import type { B2BLead } from "../lib/types";
import { b2bPipelineStages, b2bStageLabels } from "../lib/b2b";
import { formatCurrency, formatDateTime } from "../lib/format";
import { Icon } from "./icon";

export function B2BPipelineView({ leads }: { leads: B2BLead[] }) {
  const lost = leads.filter((lead) => lead.stage === "lost").length;
  return (
    <>
      <section className="b2b-pipeline" aria-label="Pipeline comercial B2B">
        {b2bPipelineStages.map((stage) => {
          const stageLeads = leads.filter((lead) => lead.stage === stage);
          const potential = stageLeads.reduce((sum, lead) => sum + lead.potentialCents, 0);
          return (
            <div className="b2b-pipeline-column" key={stage}>
              <header className="b2b-column-head">
                <div><span className={`b2b-stage-dot stage-${stage}`}/><strong>{b2bStageLabels[stage]}</strong><em>{stageLeads.length}</em></div>
                <small>{formatCurrency(potential)} potencial</small>
              </header>
              <div className="b2b-column-cards">
                {stageLeads.map((lead) => (
                  <Link href={`/b2b/leads/${lead.id}`} className="b2b-lead-card" key={lead.id}>
                    <div className="b2b-lead-card-top"><span>{lead.code}</span><Icon name="chevronRight" size={14}/></div>
                    <strong>{lead.company}</strong>
                    <p>{lead.businessType} · {lead.city}/{lead.state}</p>
                    <div className="b2b-volume-row"><span>{lead.estimatedMonthlyUnits} un./mês</span><strong>{formatCurrency(lead.potentialCents)}</strong></div>
                    <div className="b2b-products-inline">{lead.interestedProducts.slice(0, 2).map((product) => <span key={product}>{product.replace("LaVic ", "")}</span>)}{lead.interestedProducts.length > 2 ? <span>+{lead.interestedProducts.length - 2}</span> : null}</div>
                    <footer><span>{lead.nextActionAt ? `Próxima: ${formatDateTime(lead.nextActionAt)}` : "Sem próxima ação"}</span><small>{lead.owner}</small></footer>
                  </Link>
                ))}
                {stageLeads.length === 0 ? <div className="b2b-column-empty">Nenhuma oportunidade nesta etapa.</div> : null}
              </div>
            </div>
          );
        })}
      </section>
      {lost ? <p className="b2b-pipeline-footnote"><Icon name="archive" size={13}/> {lost} oportunidade encerrada permanece no histórico e não entra no pipeline ativo.</p> : null}
    </>
  );
}
