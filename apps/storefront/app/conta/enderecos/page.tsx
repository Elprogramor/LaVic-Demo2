import type { Metadata } from "next";
import { AccountShell } from "@/components/account-shell";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function AccountAddressesPage() {
  return (
    <AccountShell title="Endereços salvos." intro="A versão integrada permitirá cadastrar, editar e selecionar endereços sem expor dados no frontend público.">
      <div className="account-addresses"><article><span className="account-addresses__tag">Principal</span><h2>Casa</h2><p>Rua demonstrativa · número oculto<br />Volta Redonda · RJ</p><button type="button" disabled>Editar quando integrado</button></article><article><span className="account-addresses__tag">Secundário</span><h2>Trabalho</h2><p>Endereço demonstrativo<br />Volta Redonda · RJ</p><button type="button" disabled>Editar quando integrado</button></article></div>
    </AccountShell>
  );
}
