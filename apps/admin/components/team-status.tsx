import type { AdminSessionStatus, AdminUserStatus } from "../lib/types";

const userLabels: Record<AdminUserStatus, string> = { active: "Ativo", invited: "Convite pendente", disabled: "Desativado" };
const sessionLabels: Record<AdminSessionStatus, string> = { active: "Ativa", revoked: "Revogada", expired: "Expirada" };

export function TeamUserStatusBadge({ status }: { status: AdminUserStatus }) {
  return <span className={`governance-badge governance-${status}`}>{userLabels[status]}</span>;
}

export function SessionStatusBadge({ status }: { status: AdminSessionStatus }) {
  return <span className={`governance-badge governance-${status}`}>{sessionLabels[status]}</span>;
}
