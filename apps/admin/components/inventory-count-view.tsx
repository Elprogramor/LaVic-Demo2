"use client";

import { useMemo, useState } from "react";
import type { InventoryCountRow } from "../lib/types";
import { Icon } from "./icon";
import { Button } from "./ui";

export function InventoryCountView({ rows }: { rows: InventoryCountRow[] }) {
  const [counts, setCounts] = useState<Record<string, string>>({});
  const [reviewing, setReviewing] = useState(false);

  const summary = useMemo(() => {
    let checked = 0;
    let divergenceRows = 0;
    let absoluteDifference = 0;
    for (const row of rows) {
      const raw = counts[row.id];
      if (raw === undefined || raw === "") continue;
      checked += 1;
      const counted = Number(raw);
      if (!Number.isFinite(counted)) continue;
      const difference = counted - row.expected;
      if (difference !== 0) divergenceRows += 1;
      absoluteDifference += Math.abs(difference);
    }
    return { checked, divergenceRows, absoluteDifference, complete: checked === rows.length };
  }, [counts, rows]);

  function updateCount(id: string, value: string) {
    if (value === "" || /^\d{0,4}$/.test(value)) {
      setCounts((current) => ({ ...current, [id]: value }));
      setReviewing(false);
    }
  }

  return (
    <>
      <section className="inventory-session-card">
        <div className="inventory-session-head">
          <div><span className="session-kicker">Inventário de conferência</span><h2>Câmaras frias · 25 set 2026</h2><p>Conte fisicamente cada lote. As diferenças são calculadas automaticamente antes de qualquer ajuste.</p></div>
          <span className="session-status"><i/>Em andamento</span>
        </div>
        <div className="inventory-session-progress">
          <div><strong>{summary.checked}/{rows.length}</strong><span>lotes conferidos</span></div>
          <div><strong>{summary.divergenceRows}</strong><span>divergências</span></div>
          <div><strong>{summary.absoluteDifference}</strong><span>unidades de diferença</span></div>
          <div className="progress-track"><i style={{ width: `${Math.round((summary.checked / rows.length) * 100)}%` }}/></div>
        </div>
      </section>

      <div className="table-shell inventory-table-shell">
        <table className="data-table inventory-count-table">
          <thead><tr><th>Produto</th><th>Lote</th><th>Local</th><th>Saldo sistema</th><th>Contagem física</th><th>Diferença</th><th>Status</th></tr></thead>
          <tbody>{rows.map((row) => {
            const raw = counts[row.id] ?? "";
            const hasCount = raw !== "";
            const counted = hasCount ? Number(raw) : undefined;
            const difference = counted === undefined ? undefined : counted - row.expected;
            return (
              <tr key={row.id}>
                <td><div className="product-cell"><span className="product-thumb"><Icon name="box" size={16}/></span><div><strong>{row.productName}</strong><small>{row.sku}</small></div></div></td>
                <td><strong className="lot-code">{row.lotCode}</strong></td>
                <td>{row.location}</td>
                <td>{row.expected}</td>
                <td><label className="count-input"><span className="sr-only">Contagem física de {row.lotCode}</span><input inputMode="numeric" min="0" max="9999" value={raw} onChange={(event) => updateCount(row.id, event.target.value)} placeholder="—"/></label></td>
                <td>{difference === undefined ? <span className="muted-value">—</span> : <strong className={difference === 0 ? "difference-zero" : "difference-alert"}>{difference > 0 ? `+${difference}` : difference}</strong>}</td>
                <td>{!hasCount ? <span className="count-status pending"><Icon name="clock" size={12}/>Pendente</span> : difference === 0 ? <span className="count-status ok"><Icon name="check" size={12}/>Conferido</span> : <span className="count-status divergence"><Icon name="alert" size={12}/>Divergência</span>}</td>
              </tr>
            );
          })}</tbody>
        </table>
      </div>

      <div className="inventory-count-actions">
        <div><strong>Finalize somente após revisar todas as divergências.</strong><span>Na arquitetura final, ajustes gerados pelo inventário exigem permissão e ficam na auditoria.</span></div>
        <Button variant="secondary" onClick={() => setCounts({})}>Limpar contagem</Button>
        <Button icon="check" disabled={!summary.complete} onClick={() => setReviewing(true)}>Revisar inventário</Button>
      </div>

      {reviewing ? (
        <section className={`inventory-review ${summary.divergenceRows ? "has-divergence" : "is-balanced"}`}>
          <span className="inventory-review-icon"><Icon name={summary.divergenceRows ? "alert" : "check"} size={18}/></span>
          <div><strong>{summary.divergenceRows ? `${summary.divergenceRows} divergência(s) precisam de revisão` : "Inventário sem divergências"}</strong><p>{summary.divergenceRows ? `Há ${summary.absoluteDifference} unidade(s) de diferença absoluta. Nenhum saldo foi alterado nesta demonstração.` : "Todos os lotes conferem com o saldo registrado no sistema."}</p></div>
        </section>
      ) : null}
    </>
  );
}
