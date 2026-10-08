import { PageHeader } from "../../components/page-header";
import { StatCard } from "../../components/stat-card";
import { TeamSubnav } from "../../components/team-subnav";
import { TeamUsersView } from "../../components/team-users-view";
import { Button } from "../../components/ui";
import { teamUsers } from "../../data/mock-admin";

export default function TeamPage() {
  const active = teamUsers.filter((user) => user.status === "active").length;
  const invited = teamUsers.filter((user) => user.status === "invited").length;
  const mfa = teamUsers.filter((user) => user.mfaEnabled).length;
  const sessions = teamUsers.reduce((sum, user) => sum + user.activeSessions, 0);
  return <div className="page-stack governance-page"><PageHeader eyebrow="Gestão / Equipe" title="Equipe" description="Gerencie acessos, perfis e postura de segurança da operação LaVic." actions={<Button icon="plus" disabled title="Convites serão habilitados com autenticação e backend">Convidar usuário</Button>}/><TeamSubnav/><section className="stats-grid governance-stats"><StatCard label="Usuários" value={String(teamUsers.length)} detail="cadastrados no ambiente" icon="users" tone="green"/><StatCard label="Ativos" value={String(active)} detail="com acesso autorizado" icon="check" tone="green"/><StatCard label="Convites" value={String(invited)} detail="aguardando aceite" icon="mail" tone="orange"/><StatCard label="MFA" value={`${mfa}/${teamUsers.length}`} detail="usuários configurados" icon="shield" tone="orange"/><StatCard label="Sessões" value={String(sessions)} detail="ativas no momento" icon="monitor" tone="neutral"/></section><div className="governance-context-note"><span className="governance-context-icon">01</span><div><strong>Acesso é uma regra de servidor.</strong><p>Esta versão apresenta a experiência e a matriz de governança. Convites, alteração de perfil, MFA e revogação só serão executados quando autenticação e API estiverem conectadas.</p></div></div><TeamUsersView users={teamUsers}/><p className="demo-note">Usuários e acessos exibidos são dados demonstrativos.</p></div>;
}
