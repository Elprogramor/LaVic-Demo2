"use client";

import { useMemo, useState } from "react";
import type { AdminSession, AdminSessionStatus } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { SessionStatusBadge } from "./team-status";

export function TeamSessionsView({ sessions }: { sessions: AdminSession[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AdminSessionStatus>("active");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return sessions.filter((session) => (!q || `${session.userName} ${session.userEmail} ${session.device} ${session.browser}`.toLowerCase().includes(q)) && (status === "all" || session.status === status));
  }, [sessions, query, status]);

  return <>
    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar sessão</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar usuário, dispositivo ou navegador..." maxLength={80}/></label>
      <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value as "all" | AdminSessionStatus)}><option value="all">Todos os status</option><option value="active">Ativas</option><option value="expired">Expiradas</option><option value="revoked">Revogadas</option></select><Icon name="chevronDown" size={14}/></label>
      {(query || status !== "active") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("active"); }}>Limpar</button> : null}
    </div>
    <div className="session-list">{filtered.map((session) => <article className={`session-row ${session.current ? "session-current" : ""}`} key={session.id}><span className="session-device-icon"><Icon name="monitor" size={17}/></span><div className="session-main"><div><strong>{session.device}</strong>{session.current ? <span className="current-session-pill">Esta sessão</span> : null}</div><span>{session.browser} · {session.locationLabel}</span><small>{session.userName} · {session.userEmail}</small></div><div className="session-time"><span>Última atividade</span><strong>{formatDateTime(session.lastSeenAt)}</strong><small>Início {formatDateTime(session.createdAt)}</small></div><SessionStatusBadge status={session.status}/><button className="button button-secondary session-revoke" disabled title="Revogação será habilitada com autenticação server-side"><Icon name="lock" size={14}/><span>{session.current ? "Encerrar" : "Revogar"}</span></button></article>)}{filtered.length === 0 ? <div className="table-empty">Nenhuma sessão corresponde aos filtros.</div> : null}</div>
  </>;
}
