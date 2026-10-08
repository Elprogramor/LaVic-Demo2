import Link from "next/link";
import { Icon } from "../../components/icon";
import { PageHeader } from "../../components/page-header";
import { ReportsSubnav } from "../../components/reports-subnav";
import { reportDefinitions } from "../../data/mock-admin";
import { formatDateTime } from "../../lib/format";

export default function ReportsPage() {
  return <div className="page-stack reports-page"><PageHeader eyebrow="Gestão / Relatórios" title="Relatórios" description="Uma central única para analisar vendas, produtos, clientes, estoque, marketing, B2B e canais."/><ReportsSubnav/><section className="report-catalog">{reportDefinitions.map((report) => <Link href={`/reports/${report.key}`} className="report-card" key={report.key}><header><span className={`report-card-icon report-icon-${report.tone}`}><Icon name={report.icon} size={17}/></span><Icon name="chevronRight" size={15}/></header><strong>{report.title}</strong><p>{report.description}</p><footer><span>{report.rows.length} linhas</span><span>Atualizado {formatDateTime(report.updatedAt)}</span></footer></Link>)}</section><div className="report-governance"><Icon name="check" size={15}/><div><strong>Uma fonte de verdade por relatório</strong><p>Filtros e exportações usam a mesma definição de dados da tela. Quando o backend entrar, esses relatórios deverão consumir agregações validadas pela API, não cálculos livres no navegador.</p></div></div><p className="demo-note">Relatórios utilizam dados demonstrativos nesta versão.</p></div>;
}
