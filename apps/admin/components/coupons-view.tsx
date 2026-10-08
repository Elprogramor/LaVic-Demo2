"use client";

import { useMemo, useState } from "react";
import type { MarketingCoupon } from "../lib/types";
import { formatCurrency, formatDateOnly } from "../lib/format";
import { Icon } from "./icon";
import { MarketingStatusBadge } from "./marketing-status";
import { Button } from "./ui";

function benefit(coupon: MarketingCoupon) {
  if (coupon.kind === "percentage") return `${coupon.value}%`;
  if (coupon.kind === "fixed") return formatCurrency(coupon.value);
  return "Frete";
}

export function CouponsView({ coupons }: { coupons: MarketingCoupon[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const filtered = useMemo(() => coupons.filter((coupon) => {
    const q = query.trim().toLowerCase();
    const matchesQuery = !q || `${coupon.code} ${coupon.name}`.toLowerCase().includes(q);
    return matchesQuery && (status === "all" || coupon.status === status);
  }), [coupons, query, status]);

  return <>
    <div className="filter-bar">
      <label className="search-field"><Icon name="search" size={14}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar código ou campanha..." maxLength={60}/></label>
      <label className="select-field"><select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filtrar status"><option value="all">Todos os status</option><option value="active">Ativos</option><option value="scheduled">Agendados</option><option value="draft">Rascunhos</option><option value="paused">Pausados</option><option value="expired">Encerrados</option></select><Icon name="chevronDown" size={13}/></label>
      <Button className="filter-action" icon="plus" onClick={() => setModalOpen(true)}>Novo cupom</Button>
      {(query || status !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setStatus("all"); }}>Limpar filtros</button> : null}
    </div>

    <div className="table-shell"><table className="data-table marketing-table"><thead><tr><th>Cupom</th><th>Benefício</th><th>Regra</th><th>Uso</th><th>Receita atribuída</th><th>Período</th><th>Status</th><th/></tr></thead><tbody>{filtered.map((coupon) => <tr key={coupon.id}>
      <td><div className="coupon-cell"><span className="coupon-code">{coupon.code}</span><small>{coupon.name}</small></div></td>
      <td><strong className="marketing-value">{benefit(coupon)}</strong></td>
      <td>{coupon.minimumOrderCents ? `Mín. ${formatCurrency(coupon.minimumOrderCents)}` : "Sem mínimo"}<small className="cell-note"> · {coupon.channels.join(" + ")}</small></td>
      <td><strong>{coupon.usageCount}</strong>{coupon.usageLimit ? <small className="cell-note"> / {coupon.usageLimit}</small> : null}</td>
      <td>{formatCurrency(coupon.revenueCents)}</td>
      <td>{formatDateOnly(coupon.startsAt)}{coupon.endsAt ? <small className="cell-note"> → {formatDateOnly(coupon.endsAt)}</small> : null}</td>
      <td><MarketingStatusBadge status={coupon.status}/></td>
      <td><button className="row-action" aria-label={`Ações de ${coupon.code}`}><Icon name="more" size={14}/></button></td>
    </tr>)}{filtered.length === 0 ? <tr><td colSpan={8} className="table-empty">Nenhum cupom corresponde aos filtros.</td></tr> : null}</tbody></table></div>

    {modalOpen ? <div className="command-layer" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}><section className="marketing-modal" role="dialog" aria-modal="true" aria-label="Novo cupom">
      <header><div><span>Novo cupom</span><h2>Defina a condição comercial</h2></div><button className="icon-button" onClick={() => setModalOpen(false)} aria-label="Fechar"><Icon name="close" size={17}/></button></header>
      <div className="marketing-modal-body"><div className="form-grid two-columns">
        <label><span>Código</span><input defaultValue="LAVIC10" maxLength={24}/><small>Maiúsculas e números, sem espaços.</small></label>
        <label><span>Tipo</span><select defaultValue="percentage"><option value="percentage">Percentual</option><option value="fixed">Valor fixo</option><option value="shipping">Frete</option></select></label>
        <label><span>Valor</span><input inputMode="decimal" defaultValue="10" maxLength={8}/></label>
        <label><span>Pedido mínimo</span><input inputMode="decimal" placeholder="R$ 0,00" maxLength={12}/></label>
      </div><div className="coupon-preview"><span>Prévia</span><strong>LAVIC10</strong><p>10% de desconto · limite e elegibilidade serão validados pela API.</p></div><p className="form-disclaimer">Demonstração de interface: salvar não persiste dados nesta fase. No backend, preço e elegibilidade nunca serão confiados ao navegador.</p></div>
      <footer><Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button><Button onClick={() => setModalOpen(false)}>Salvar rascunho</Button></footer>
    </section></div> : null}
  </>;
}
