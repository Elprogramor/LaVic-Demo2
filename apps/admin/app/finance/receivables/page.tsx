import { FinanceReceivablesView } from "../../../components/finance-receivables-view";
import { FinanceSubnav } from "../../../components/finance-subnav";
import { PageHeader } from "../../../components/page-header";
import { financeTransactions } from "../../../data/mock-admin";

export default function FinanceReceivablesPage() {
  return <div className="page-stack"><PageHeader eyebrow="Financeiro / Recebimentos" title="Recebimentos" description="Consulte pagamentos por pedido, meio, status e valor líquido."/><FinanceSubnav active="/finance/receivables"/><FinanceReceivablesView transactions={financeTransactions}/><p className="demo-note">Dados demonstrativos. A confirmação financeira será autoridade do backend e do provedor de pagamento.</p></div>;
}
