"use client";

import { useMemo, useState } from "react";
import type { AdminTeamUser, AdminUserStatus } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { TeamUserStatusBadge } from "./team-status";

export function TeamUsersView({ users }: { users: AdminTeamUser[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"all" | AdminUserStatus>("all");
  const [role, setRole] = useState("all");
  const roles = useMemo(() => Array.from(new Set(users.map((user) => user.roleName))), [users]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return users.filter((user) => (!q || `${user.name} ${user.email} ${user.roleName}`.toLowerCase().includes(q)) && (status === "all" || user.status === status) && (role === "all" || user.roleName === role));
  }, [users, query, status, role]);

  return <>
    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar usuário</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar nome, e-mail ou perfil..." maxLength={80}/></label>
      <label className="select-field"><span className="sr-only">Status</span><select value={status} onChange={(event) => setStatus(event.target.value as "all" | AdminUserStatus)}><option value="all">Todos os status</option><option value="active">Ativos</option><option value="invited">Convites pendentes</option><option value="disabled">Desativados</option></select><Icon name="chevronDown" size={14}/></label>
      <label className="select-field"><span className="sr-only">Perfil</span><select value={role} onChange={(event) => setRole(event.target.value)}><option value="all">Todos os perfis</option>{roles.map((item) => <option value={item} key={item}>{item}</option>)}</select><Icon name="chevronDown" size={14}/></label>
      {(query || status !== "all" || role !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); setRole("all"); }}>Limpar</button> : null}
    </div>
    <div className="governance-filter-summary"><span>{filtered.length} usuários na seleção</span><strong>{filtered.filter((item) => item.mfaEnabled).length} com MFA configurado</strong></div>
    <div className="table-shell"><table className="data-table team-table"><thead><tr><th>Usuário</th><th>Perfil</th><th>Status</th><th>MFA</th><th>Sessões</th><th>Último acesso</th><th aria-label="Ações"/></tr></thead><tbody>{filtered.map((user) => <tr key={user.id}><td><div className="team-user-cell"><span className="team-avatar">{user.initials}</span><div><strong>{user.name}</strong><small>{user.email}</small></div></div></td><td><span className="role-pill">{user.roleName}</span></td><td><TeamUserStatusBadge status={user.status}/></td><td>{user.mfaEnabled ? <span className="security-positive"><Icon name="shield" size={13}/>Configurado</span> : <span className="security-muted">Não configurado</span>}</td><td>{user.activeSessions}</td><td>{user.lastAccessAt ? formatDateTime(user.lastAccessAt) : "—"}</td><td><button className="row-action" title="Ações de usuário serão habilitadas com autenticação e backend" aria-label={`Ações de ${user.name}`} disabled><Icon name="more" size={14}/></button></td></tr>)}</tbody></table>{filtered.length === 0 ? <div className="table-empty">Nenhum usuário corresponde aos filtros.</div> : null}</div>
  </>;
}
