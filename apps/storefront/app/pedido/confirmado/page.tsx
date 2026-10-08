import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function OrderConfirmedPage() {
  return (
    <PageShell eyebrow="Demonstração concluída" title="O fluxo funcionou até o fim." intro="Nenhum pedido foi criado e nenhum pagamento foi processado. Esta tela representa o estado final que receberá dados reais quando a API estiver conectada.">
      <div className="order-confirmed"><span className="order-confirmed__mark" aria-hidden="true">✓</span><div><p className="eyebrow">PRÓXIMA FASE</p><h2>Pedido, estoque e pagamento serão confirmados pelo servidor.</h2><p>Quando integrarmos o backend, esta página receberá um identificador seguro do pedido, instruções de pagamento quando aplicável e status inicial da operação.</p><div className="order-confirmed__actions"><Link className="button button--primary" href="/sabores">Continuar comprando</Link><Link className="button button--outline" href="/conta">Ver área do cliente</Link></div></div></div>
    </PageShell>
  );
}
