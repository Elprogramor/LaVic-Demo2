import { AuditLogView } from "../../../components/audit-log-view";
import { PageHeader } from "../../../components/page-header";
import { StatCard } from "../../../components/stat-card";
import { TeamSubnav } from "../../../components/team-subnav";
import { auditEvents } from "../../../data/mock-admin";

export default function TeamAuditPage() {
  const critical = auditEvents.filter((event) => event.severity === "critical").length;
  const attention = auditEvents.filter((event) => event.severity === "attention").length;
  const actors = new Set(auditEvents.map((event) => event.actor)).size;
  return <div className="page-stack governance-page"><PageHeader eyebrow="Equipe / Auditoria" title="Auditoria" description="Rastreie ações sensíveis com contexto suficiente para investigar mudanças e acessos."/><TeamSubnav/><section className="stats-grid governance-stats"><StatCard label="Eventos" value={String(auditEvents.length)} detail="na amostra atual" icon="activity" tone="green"/><StatCard label="Atenção" value={String(attention)} detail="merecem revisão" icon="alert" tone="orange"/><StatCard label="Críticos" value={String(critical)} detail="ações de alto impacto" icon="shield" tone="orange"/><StatCard label="Atores" value={String(actors)} detail="identidades registradas" icon="users" tone="neutral"/></section><div className="audit-immutability-note"><span>LOG</span><div><strong>Auditoria é append-only.</strong><p>Quando o backend entrar, eventos não poderão ser editados pela interface. Retenção, integridade e acesso serão controlados por política.</p></div></div><AuditLogView events={auditEvents}/><p className="demo-note">Eventos e endereços de rede são demonstrativos e mascarados.</p></div>;
}
