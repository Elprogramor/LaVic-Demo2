import type { Metadata } from "next";
import Link from "next/link";
import { AccountShell } from "@/components/account-shell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AccountPage() {
  return (
    <AccountShell title="Sua relação com a LaVic, em um só lugar." intro="Estrutura preparada para pedidos, endereços e preferências quando a autenticação real estiver conectada.">
      <div className="account-stat-grid"><article><span>Pedidos</span><strong>3</strong><small>demonstração</small></article><article><span>Última compra</span><strong>18 set</strong><small>demonstração</small></article><article><span>Endereços</span><strong>2</strong><small>demonstração</small></article></div>
      <div className="account-card-grid"><article><p className="eyebrow">PEDIDOS</p><h2>Acompanhe o que você comprou.</h2><p>Status, itens, pagamento e recebimento ficarão disponíveis aqui.</p><Link className="text-link" href="/conta/pedidos">Ver pedidos <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link></article><article><p className="eyebrow">ENDEREÇOS</p><h2>Entrega sem repetir dados.</h2><p>Endereços salvos poderão ser selecionados com segurança no checkout.</p><Link className="text-link" href="/conta/enderecos">Ver endereços <i className="fi fi-tr-arrow-right" aria-hidden="true" /></Link></article></div>
    </AccountShell>
  );
}
