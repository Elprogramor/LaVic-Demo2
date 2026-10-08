import type { StoreContentBlock } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { StoreStatusBadge } from "./store-status";

export function StoreContentView({ blocks }: { blocks: StoreContentBlock[] }) {
  return <section className="content-admin-grid">{blocks.map((block) => <article className="content-admin-card" key={block.id}><header><span className="content-admin-icon"><Icon name="clipboard" size={15}/></span><StoreStatusBadge status={block.status}/></header><strong>{block.label}</strong><code>{block.route}</code><p>{block.summary}</p><footer><span>{block.owner} · {formatDateTime(block.updatedAt)}</span><button className="text-action"><Icon name="edit" size={13}/> Editar</button></footer></article>)}</section>;
}
