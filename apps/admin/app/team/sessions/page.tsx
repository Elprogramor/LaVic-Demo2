import { Icon } from "../../../components/icon";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { TeamSessionsView } from "../../../components/team-sessions-view";
import { TeamSubnav } from "../../../components/team-subnav";
import { adminSessions } from "../../../data/mock-admin";

export default function TeamSessionsPage() {
  const active = adminSessions.filter((session) => session.status === "active");
  const users = new Set(active.map((session) => session.userId)).size;
  const current = active.filter((session) => session.current).length;
  const historical = adminSessions.filter((session) => session.status !== "active").length;
  return <div className="page-stack governance-page"><PageHeader eyebrow="Equipe / Sessões" title="Sessões" description="Visibilidade sobre dispositivos e acessos ativos antes de permitir revogações reais."/><TeamSubnav/><section className="stats-grid governance-stats"><StatCard label="Sessões ativas" value={String(active.length)} detail="no ambiente demonstrativo" icon="monitor" tone="green"/><StatCard label="Usuários conectados" value={String(users)} detail="com ao menos uma sessão" icon="users" tone="green"/><StatCard label="Sessão atual" value={String(current)} detail="marcada neste navegador" icon="lock" tone="orange"/><StatCard label="Histórico" value={String(historical)} detail="expiradas ou revogadas" icon="activity" tone="neutral"/></section><div className="security-principle-strip"><div><Icon name="lock" size={16}/><strong>Cookie HttpOnly</strong><span>sessão não exposta ao JavaScript</span></div><div><Icon name="clock" size={16}/><strong>Expiração</strong><span>idle + limite absoluto no servidor</span></div><div><Icon name="activity" size={16}/><strong>Revogação</strong><span>efeito imediato e auditado</span></div></div><TeamSessionsView sessions={adminSessions}/><p className="demo-note">Dispositivos, localização e sessões são dados demonstrativos.</p></div>;
}
