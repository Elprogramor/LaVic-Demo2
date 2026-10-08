import type { StorePublishStatus } from "../lib/types";

const labels: Record<StorePublishStatus, string> = {
  published: "Publicado",
  draft: "Rascunho",
  scheduled: "Agendado",
  hidden: "Oculto",
};

export function StoreStatusBadge({ status }: { status: StorePublishStatus }) {
  return <span className={`store-status store-${status}`}>{labels[status]}</span>;
}
