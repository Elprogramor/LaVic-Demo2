"use client";

import { useMemo, useState } from "react";
import type { AdminAuditCategory, AdminAuditEvent, AdminAuditSeverity } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";

const categoryLabels: Record<AdminAuditCategory, string> = { auth: "Autenticação", orders: "Pedidos", inventory: "Estoque", products: "Produtos", customers: "Clientes", b2b: "B2B", marketing: "Marketing", finance: "Financeiro", team: "Equipe", security: "Segurança" };
const severityLabels: Record<AdminAuditSeverity, string> = { info: "Informação", attention: "Atenção", critical: "Crítico" };

export function AuditLogView({ events }: { events: AdminAuditEvent[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"all" | AdminAuditCategory>("all");
  const [severity, setSeverity] = useState<"all" | AdminAuditSeverity>("all");
  const [selected, setSelected] = useState<AdminAuditEvent | null>(null);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((event) => (!q || `${event.actor} ${event.action} ${event.target} ${event.summary}`.toLowerCase().includes(q)) && (category === "all" || event.category === category) && (severity === "all" || event.severity === severity));
  }, [events, query, category, severity]);

  return <>
    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar evento</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar ator, ação ou recurso..." maxLength={80}/></label>
      <label className="select-field"><span className="sr-only">Categoria</span><select value={category} onChange={(event) => setCategory(event.target.value as "all" | AdminAuditCategory)}><option value="all">Todas as categorias</option>{Object.entries(categoryLabels).map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select><Icon name="chevronDown" size={14}/></label>
      <label className="select-field"><span className="sr-only">Severidade</span><select value={severity} onChange={(event) => setSeverity(event.target.value as "all" | AdminAuditSeverity)}><option value="all">Todas as severidades</option><option value="info">Informação</option><option value="attention">Atenção</option><option value="critical">Crítico</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || category !== "all" || severity !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setCategory("all"); setSeverity("all"); }}>Limpar</button> : null}
    </div>
    <div className="governance-filter-summary"><span>{filtered.length} eventos encontrados</span><strong>Logs demonstrativos e imutáveis na interface</strong></div>
    <div className="table-shell"><table className="data-table audit-table"><thead><tr><th>Data</th><th>Ator</th><th>Categoria</th><th>Ação</th><th>Recurso</th><th>Severidade</th><th aria-label="Detalhes"/></tr></thead><tbody>{filtered.map((event) => <tr key={event.id}><td>{formatDateTime(event.createdAt)}</td><td><strong>{event.actor}</strong><small className="table-subline">{event.actorRole}</small></td><td>{categoryLabels[event.category]}</td><td className="table-primary">{event.action}</td><td>{event.target}</td><td><span className={`audit-severity audit-${event.severity}`}>{severityLabels[event.severity]}</span></td><td><button className="row-action" aria-label={`Ver detalhes do evento ${event.id}`} onClick={() => setSelected(event)}><Icon name="chevronRight" size={14}/></button></td></tr>)}</tbody></table>{filtered.length === 0 ? <div className="table-empty">Nenhum evento corresponde aos filtros.</div> : null}</div>
    {selected ? <div className="audit-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><aside className="audit-drawer" role="dialog" aria-modal="true" aria-label="Detalhes do evento de auditoria"><header><div><span>Evento {selected.id}</span><h2>{selected.action}</h2></div><button className="icon-button" onClick={() => setSelected(null)} aria-label="Fechar detalhes"><Icon name="close" size={17}/></button></header><div className="audit-drawer-body"><div className="audit-summary"><span className={`audit-severity audit-${selected.severity}`}>{severityLabels[selected.severity]}</span><p>{selected.summary}</p></div><dl className="audit-definition-list"><div><dt>Data</dt><dd>{formatDateTime(selected.createdAt)}</dd></div><div><dt>Ator</dt><dd>{selected.actor} · {selected.actorRole}</dd></div><div><dt>Categoria</dt><dd>{categoryLabels[selected.category]}</dd></div><div><dt>Recurso</dt><dd>{selected.target}</dd></div><div><dt>Origem</dt><dd>{selected.sourceLabel}</dd></div><div><dt>IP</dt><dd>{selected.ipMasked}</dd></div></dl>{selected.changes.length ? <section className="audit-changes"><h3>Alterações registradas</h3>{selected.changes.map((change) => <div key={`${selected.id}-${change.field}`}><span>{change.field}</span><code>{change.before}</code><Icon name="chevronRight" size={13}/><code>{change.after}</code></div>)}</section> : <div className="audit-no-change"><Icon name="check" size={15}/>Evento sem alteração de campos.</div>}</div></aside></div> : null}
  </>;
}
