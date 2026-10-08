"use client";

import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import type { InventoryLot, InventoryMovement, InventoryMovementType } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Icon } from "./icon";
import { Button } from "./ui";

const typeLabels: Record<InventoryMovementType, string> = {
  production: "Produção",
  sale: "Venda",
  damage: "Avaria",
  sample: "Degustação",
  adjustment: "Ajuste",
  release: "Liberação de reserva",
};

export function InventoryMovementsView({ movements: initialMovements, lots }: { movements: InventoryMovement[]; lots: InventoryLot[] }) {
  const [movements, setMovements] = useState(initialMovements);
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"all" | InventoryMovementType>("all");
  const [direction, setDirection] = useState<"all" | "in" | "out">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!dialogOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDialogOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialogOpen]);

  const filtered = useMemo(() => movements.filter((movement) => {
    const normalized = query.trim().toLowerCase();
    const matchesQuery = !normalized || `${movement.productName} ${movement.sku} ${movement.lotCode} ${movement.reason} ${movement.reference ?? ""}`.toLowerCase().includes(normalized);
    return matchesQuery && (type === "all" || movement.type === type) && (direction === "all" || movement.direction === direction);
  }), [movements, query, type, direction]);

  const totals = useMemo(() => ({
    incoming: movements.filter((item) => item.direction === "in").reduce((sum, item) => sum + item.quantity, 0),
    outgoing: movements.filter((item) => item.direction === "out").reduce((sum, item) => sum + item.quantity, 0),
    losses: movements.filter((item) => item.type === "damage" || item.type === "sample").reduce((sum, item) => sum + item.quantity, 0),
    adjustments: movements.filter((item) => item.type === "adjustment").length,
  }), [movements]);

  function registerMovement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const lotCode = String(form.get("lotCode") ?? "");
    const lot = lots.find((item) => item.code === lotCode);
    const quantity = Number(form.get("quantity"));
    const movementType = String(form.get("type")) as InventoryMovementType;
    const movementDirection = String(form.get("direction")) as "in" | "out";
    const reason = String(form.get("reason") ?? "").trim();
    if (!lot || !Number.isFinite(quantity) || quantity < 1 || quantity > 9999 || !reason) return;

    const next: InventoryMovement = {
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      type: movementType,
      productId: lot.productId,
      productName: lot.productName,
      sku: lot.sku,
      lotCode: lot.code,
      quantity,
      direction: movementDirection,
      reason: reason.slice(0, 80),
      actor: "Equipe LaVic",
    };
    setMovements((current) => [next, ...current]);
    setDialogOpen(false);
    setFeedback("Movimentação adicionada à demonstração desta sessão.");
    event.currentTarget.reset();
  }

  return (
    <>
      <section className="movement-summary-grid" aria-label="Resumo das movimentações">
        <article><span>Entradas</span><strong className="qty-in">+{totals.incoming}</strong><small>unidades registradas</small></article>
        <article><span>Saídas</span><strong className="qty-out">−{totals.outgoing}</strong><small>unidades registradas</small></article>
        <article><span>Perdas / uso</span><strong>{totals.losses}</strong><small>avaria e degustação</small></article>
        <article><span>Ajustes</span><strong>{totals.adjustments}</strong><small>conferências manuais</small></article>
      </section>

      {feedback ? <div className="inline-feedback"><Icon name="check" size={15}/><span>{feedback}</span><button onClick={() => setFeedback("")} aria-label="Fechar aviso"><Icon name="close" size={14}/></button></div> : null}

      <div className="filter-bar">
        <label className="search-field"><Icon name="search" size={16}/><span className="sr-only">Buscar movimentação</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Produto, lote, motivo ou referência..." maxLength={80}/></label>
        <label className="select-field"><span className="sr-only">Tipo</span><select value={type} onChange={(event) => setType(event.target.value as "all" | InventoryMovementType)}><option value="all">Todos os tipos</option>{Object.entries(typeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><Icon name="chevronDown" size={14}/></label>
        <label className="select-field"><span className="sr-only">Direção</span><select value={direction} onChange={(event) => setDirection(event.target.value as "all" | "in" | "out")}><option value="all">Entradas e saídas</option><option value="in">Entradas</option><option value="out">Saídas</option></select><Icon name="chevronDown" size={14}/></label>
        <Button icon="plus" onClick={() => setDialogOpen(true)} className="filter-action">Registrar movimentação</Button>
        {(query || type !== "all" || direction !== "all") ? <button className="clear-filters" onClick={() => { setQuery(""); setType("all"); setDirection("all"); }}>Limpar</button> : null}
      </div>

      <div className="table-shell inventory-table-shell">
        <table className="data-table movements-table">
          <thead><tr><th>Data</th><th>Movimentação</th><th>Produto / lote</th><th>Quantidade</th><th>Motivo</th><th>Responsável</th><th>Referência</th></tr></thead>
          <tbody>{filtered.map((movement) => (
            <tr key={movement.id}>
              <td>{formatDateTime(movement.createdAt)}</td>
              <td><span className={`movement-type type-${movement.type}`}><Icon name={movement.direction === "in" ? "plus" : "swap"} size={13}/>{typeLabels[movement.type]}</span></td>
              <td><div className="movement-product"><strong>{movement.productName}</strong><small>{movement.lotCode} · {movement.sku}</small></div></td>
              <td><strong className={`movement-qty qty-${movement.direction}`}>{movement.direction === "in" ? "+" : "−"}{movement.quantity}</strong></td>
              <td>{movement.reason}</td>
              <td>{movement.actor}</td>
              <td>{movement.reference ?? "—"}</td>
            </tr>
          ))}</tbody>
        </table>
        {filtered.length === 0 ? <div className="table-empty">Nenhuma movimentação corresponde aos filtros.</div> : null}
      </div>
      <div className="table-footer"><span>{filtered.length} movimentações exibidas</span><span>Histórico imutável na arquitetura final</span></div>

      {dialogOpen ? (
        <div className="modal-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialogOpen(false); }}>
          <section className="modal-card inventory-movement-modal" role="dialog" aria-modal="true" aria-labelledby="movement-dialog-title">
            <header className="modal-header"><div><p>Estoque</p><h2 id="movement-dialog-title">Registrar movimentação</h2><span>Informe lote, direção e motivo da alteração.</span></div><button className="icon-button" aria-label="Fechar" onClick={() => setDialogOpen(false)}><Icon name="close" size={17}/></button></header>
            <form className="inventory-form" onSubmit={registerMovement}>
              <div className="form-grid-two">
                <label><span>Tipo</span><select name="type" required defaultValue="production" autoFocus>{Object.entries(typeLabels).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
                <label><span>Direção</span><select name="direction" required defaultValue="in"><option value="in">Entrada</option><option value="out">Saída</option></select></label>
              </div>
              <label><span>Lote</span><select name="lotCode" required defaultValue=""><option value="" disabled>Selecione um lote</option>{lots.filter((lot) => lot.status !== "expired").map((lot) => <option value={lot.code} key={lot.id}>{lot.code} · {lot.productName}</option>)}</select></label>
              <div className="form-grid-two">
                <label><span>Quantidade</span><input name="quantity" type="number" min="1" max="9999" inputMode="numeric" required placeholder="0"/></label>
                <label><span>Motivo</span><input name="reason" maxLength={80} required placeholder="Ex.: entrada de produção"/></label>
              </div>
              <div className="form-helper"><Icon name="alert" size={14}/><span>Nesta versão de frontend, o registro permanece somente nesta sessão. A persistência será responsabilidade da API.</span></div>
              <footer className="modal-actions"><Button type="button" variant="secondary" onClick={() => setDialogOpen(false)}>Cancelar</Button><Button type="submit" icon="check">Registrar</Button></footer>
            </form>
          </section>
        </div>
      ) : null}
    </>
  );
}
