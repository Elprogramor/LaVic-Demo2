import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export function PublicPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-frame">
      <a className="skip-link" href="#main-content">Ir para o conteúdo</a>
      <SiteHeader />
      <main id="main-content">{children}</main>
      <SiteFooter />
    </div>
  );
}
