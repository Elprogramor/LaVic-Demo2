"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { B2BLead, B2BLeadStage } from "../lib/types";
import { b2bStageLabels } from "../lib/b2b";
import { formatCurrency, formatDateTime } from "../lib/format";
import { B2BBadge } from "./b2b-badge";
import { Icon } from "./icon";

export function B2BLeadsView({ leads }: { leads: B2BLead[] }) {
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState<"all" | B2BLeadStage>("all");
  const [type, setType] = useState("all");
  const types = Array.from(new Set(leads.map((lead) => lead.businessType))).sort();
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return leads.filter((lead) => {
      const matchesQuery = !normalized || `${lead.company} ${lead.code} ${lead.contactName} ${lead.city}`.toLowerCase().includes(normalized);
      const matchesStage = stage === "all" || lead.stage === stage;
      const matchesType = type === "all" || lead.businessType === type;
      return matchesQuery && matchesStage && matchesType;
    });
  }, [leads, query, stage, type]);

  return (
    <>
      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar lead</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar empresa, código, contato ou cidade..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Etapa</span><select value={stage} onChange={(event) => setStage(event.target.value as "all" | B2BLeadStage)}><option value="all">Todas as etapas</option>{Object.entries(b2bStageLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        <label className="select-field"><span className="sr-only">Tipo de negócio</span><select value={type} onChange={(event) => setType(event.target.value)}><option value="all">Todos os negócios</option>{types.map((value) => <option value={value} key={value}>{value}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        {(query || stage !== "all" || type !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStage("all"); setType("all"); }}>Limpar</button> : null}
      </div>
      <div className="table-shell b2b-table-shell">
        <table className="data-table b2b-leads-table">
          <thead><tr><th>Empresa</th><th>Contato</th><th>Negócio</th><th>Etapa</th><th>Volume estimado</th><th>Potencial</th><th>Próxima ação</th><th>Responsável</th><th><span className="sr-only">Abrir</span></th></tr></thead>
          <tbody>{filtered.map((lead) => <tr key={lead.id}>
            <td><Link className="b2b-company-cell" href={`/b2b/leads/${lead.id}`}><span className="b2b-company-avatar">{companyInitials(lead.company)}</span><div><strong>{lead.company}</strong><small>{lead.code} · {lead.city}/{lead.state}</small></div></Link></td>
            <td><div className="contact-cell"><span>{lead.contactName}</span><small>{lead.phone}</small></div></td>
            <td>{lead.businessType}</td>
            <td><B2BBadge kind="stage" value={lead.stage}/></td>
            <td><strong>{lead.estimatedMonthlyUnits} un.</strong><small className="table-subline">/ mês</small></td>
            <td><strong>{formatCurrency(lead.potentialCents)}</strong></td>
            <td>{lead.nextActionAt ? formatDateTime(lead.nextActionAt) : "—"}</td>
            <td>{lead.owner}</td>
            <td><Link className="row-action" href={`/b2b/leads/${lead.id}`} aria-label={`Abrir ${lead.company}`}><Icon name="chevronRight" size={16}/></Link></td>
          </tr>)}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhuma oportunidade corresponde aos filtros selecionados.</div> : null}
      </div>
      <div className="table-footer"><span>Mostrando {filtered.length} de {leads.length} oportunidades demonstrativas</span><span>Pipeline comercial · dados tipados</span></div>
    </>
  );
}

function companyInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return `${parts[0]?.[0] ?? "L"}${parts.at(-1)?.[0] ?? "V"}`.toUpperCase();
}
