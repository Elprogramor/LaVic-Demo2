import { PageHeader } from "../../../components/page-header";
import { ReportDetailView } from "../../../components/report-detail-view";
import { ReportsSubnav } from "../../../components/reports-subnav";
import { reportDefinitions } from "../../../data/mock-admin";

export default function ReportPage() {
  const report = reportDefinitions.find((item) => item.key === "b2b");
  if (!report) return null;
  return <div className="page-stack"><PageHeader eyebrow={`Relatórios / ${report.title}`} title={report.title} description={report.description}/><ReportsSubnav active="/reports/b2b"/><ReportDetailView report={report}/><p className="demo-note">Dados demonstrativos. Exportação CSV é local e não altera o sistema.</p></div>;
}
