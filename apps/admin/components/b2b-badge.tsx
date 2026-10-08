import type { B2BClientStatus, B2BLeadStage, B2BOrderStatus } from "../lib/types";
import { b2bClientStatusLabels, b2bOrderStatusLabels, b2bStageLabels } from "../lib/b2b";

type Kind = "stage" | "client" | "order";
type Value = B2BLeadStage | B2BClientStatus | B2BOrderStatus;

export function B2BBadge({ kind, value, label }: { kind: Kind; value: Value; label?: string }) {
  const resolved = label ?? (kind === "stage"
    ? b2bStageLabels[value as B2BLeadStage]
    : kind === "client"
      ? b2bClientStatusLabels[value as B2BClientStatus]
      : b2bOrderStatusLabels[value as B2BOrderStatus]);
  return <span className={`b2b-badge b2b-${kind}-${value}`}>{resolved}</span>;
}
