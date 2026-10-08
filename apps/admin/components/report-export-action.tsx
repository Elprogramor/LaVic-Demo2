"use client";

import { Button } from "./ui";

export function ReportExportAction({ title, columns, rows }: { title: string; columns: string[]; rows: Array<{ id: string; cells: string[] }> }) {
  function exportCsv() {
    const escape = (value: string) => `"${value.replaceAll('"', '""')}"`;
    const content = [columns.map(escape).join(";"), ...rows.map((row) => row.cells.map(escape).join(";"))].join("\r\n");
    const blob = new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "relatorio"}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }
  return <Button icon="export" variant="secondary" onClick={exportCsv}>Exportar CSV</Button>;
}
