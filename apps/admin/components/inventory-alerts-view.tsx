"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { InventoryAlert, InventoryAlertKind, InventoryAlertSeverity } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";

const kindLabels: Record<InventoryAlertKind, string> = {
  low_stock: "Estoque baixo",
  expiry: "Validade próxima",
  expired: "Vencido",
  divergence: "Divergência",
  blocked: "Bloqueio",
};

const severityLabels: Record<InventoryAlertSeverity, string> = {
  critical: "Crítico",
  warning: "Atenção",
  info: "Informativo",
};

export function InventoryAlertsView({ alerts }: { alerts: InventoryAlert[] }) {
  const [query, setQuery] = useState("");
  const [severity, setSeverity] = useState<"all" | InventoryAlertSeverity>("all");
  const [kind, setKind] = useState<"all" | InventoryAlertKind>("all");

  const filtered = useMemo(() => alerts.filter((alert) => {
    const normalized = query.trim().toLowerCase();
    const matchesQuery = !normalized || `${alert.title} ${alert.description} ${alert.productName} ${alert.lotCode ?? ""}`.toLowerCase().includes(normalized);
    return matchesQuery && (severity === "all" || alert.severity === severity) && (kind === "all" || alert.kind === kind);
  }), [alerts, query, severity, kind]);

  return (
    <>
      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar alerta</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar alerta, produto ou lote..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Severidade</span><select value={severity} onChange={(event) => setSeverity(event.target.value as "all" | InventoryAlertSeverity)}><option value="all">Todas as severidades</option>{Object.entries(severityLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        <label className="select-field"><span className="sr-only">Tipo</span><select value={kind} onChange={(event) => setKind(event.target.value as "all" | InventoryAlertKind)}><option value="all">Todos os tipos</option>{Object.entries(kindLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        {(query || severity !== "all" || kind !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setSeverity("all"); setKind("all"); }}>Limpar</button> : null}
      </div>

      <div className="alerts-stack">
        {filtered.map((alert) => (
          <article className={`inventory-alert-card severity-${alert.severity}`} key={alert.id}>
            <span className="alert-card-icon"><Icon name={alert.severity === "critical" ? "alert" : alert.kind === "expiry" ? "calendar" : alert.kind === "blocked" ? "archive" : "bell"} size={17}/></span>
            <div className="alert-card-copy">
              <div className="alert-card-meta"><span>{severityLabels[alert.severity]}</span><span>·</span><span>{kindLabels[alert.kind]}</span><span>·</span><time>{formatDateTime(alert.createdAt)}</time></div>
              <h2>{alert.title}</h2>
              <p>{alert.description}</p>
              <small>{alert.productName}{alert.lotCode ? ` · Lote ${alert.lotCode}` : ""}</small>
            </div>
            <Link className="alert-action" href={alert.href}>Analisar <Icon name="chevronRight" size={14}/></Link>
          </article>
        ))}
        {filtered.length === 0 ? <div className="alerts-empty"><Icon name="check" size={22}/><strong>Nenhum alerta neste filtro</strong><span>Não há ocorrências que correspondam aos critérios selecionados.</span></div> : null}
      </div>
    </>
  );
}
