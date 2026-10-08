import type { AdminReportDefinition } from "../lib/types";
import { formatDateTime } from "../lib/format";
import { Panel } from "./ui";
import { ReportExportAction } from "./report-export-action";
import { Icon } from "./icon";

export function ReportDetailView({ report }: { report: AdminReportDefinition }) {
  return <>
    <section className="report-kpi-grid">{report.metrics.map((metric) => <article key={metric.label} className={`report-kpi report-kpi-${metric.tone}`}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.detail}</small></article>)}</section>
    <section className="report-layout"><Panel title="Leitura do período"><div className="report-insights">{report.insights.map((insight, index) => <div key={insight}><span>{String(index + 1).padStart(2, "0")}</span><p>{insight}</p></div>)}</div></Panel><Panel title="Informações"><dl className="report-meta"><div><dt>Período</dt><dd>{report.period}</dd></div><div><dt>Atualização</dt><dd>{formatDateTime(report.updatedAt)}</dd></div><div><dt>Linhas</dt><dd>{report.rows.length}</dd></div><div><dt>Origem</dt><dd>Base demonstrativa do Admin</dd></div></dl></Panel></section>
    <div className="report-table-toolbar"><div><Icon name="chart" size={15}/><span>{report.title}</span></div><ReportExportAction title={report.title} columns={report.columns} rows={report.rows}/></div>
    <div className="table-shell"><table className="data-table report-data-table"><thead><tr>{report.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{report.rows.map((row) => <tr key={row.id}>{row.cells.map((cell, index) => <td className={index === 0 ? "table-primary" : ""} key={`${row.id}-${index}`}>{cell}</td>)}</tr>)}</tbody></table></div>
  </>;
}
