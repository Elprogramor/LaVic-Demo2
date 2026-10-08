import type { Metadata } from "next";
import { AdminShell } from "../components/admin-shell";
import "./styles.css";

export const metadata: Metadata = {
  title: { default: "LaVic Admin", template: "%s · LaVic Admin" },
  description: "Central operacional LaVic — vendas, estoque, clientes, revenda, financeiro e governança.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  );
}
