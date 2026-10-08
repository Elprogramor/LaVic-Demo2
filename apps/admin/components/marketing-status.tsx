import type { MarketingStatus } from "../lib/types";

const labels: Record<MarketingStatus, string> = {
  active: "Ativa",
  scheduled: "Agendada",
  draft: "Rascunho",
  expired: "Encerrada",
  paused: "Pausada",
};

export function MarketingStatusBadge({ status }: { status: MarketingStatus }) {
  return <span className={`marketing-status status-${status}`}>{labels[status]}</span>;
}
