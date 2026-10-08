import Link from "next/link";
import type { CustomerSegmentDefinition } from "../lib/types";
import { Icon } from "./icon";

export function CustomerSegmentsView({ segments }: { segments: CustomerSegmentDefinition[] }) {
  return (
    <div className="customer-segments-grid">
      {segments.map((segment) => (
        <article className={`customer-segment-card tone-${segment.tone}`} key={segment.key}>
          <div className="customer-segment-top"><span className="customer-segment-icon"><Icon name={segment.key === "b2b_potential" ? "handshake" : segment.key === "at_risk" ? "alert" : "users"} size={17}/></span><strong>{segment.count}</strong></div>
          <h2>{segment.label}</h2>
          <p>{segment.description}</p>
          <div className="segment-rule"><span>Regra</span><strong>{segment.rule}</strong></div>
          <Link href={`/customers?segment=${segment.key}`} className="segment-link">Ver clientes <Icon name="chevronRight" size={13}/></Link>
        </article>
      ))}
    </div>
  );
}
