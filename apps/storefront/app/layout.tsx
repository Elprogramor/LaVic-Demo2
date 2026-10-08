import type { Metadata } from "next";
import { CartProvider } from "@/components/commerce/cart-provider";
import { CartDrawer } from "@/components/commerce/cart-drawer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "LaVic Kombucha — Viva com gás", template: "%s · LaVic" },
  description: "LaVic Kombucha. Uma experiência digital demonstrativa para a marca.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
