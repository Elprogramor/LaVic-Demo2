import Link from "next/link";
import { PublicPage } from "@/components/layout/public-page";

export default function NotFound() {
  return (
    <PublicPage>
      <section className="content-shell page-section" style={{ textAlign: "center", maxWidth: 720 }}>
        <span className="eyebrow-pill">404</span>
        <h1 style={{ fontFamily: "var(--lavic-font-display)", fontSize: 64, lineHeight: 1, margin: "24px 0 14px" }}>Essa página não borbulhou.</h1>
        <p style={{ color: "var(--lavic-muted)", lineHeight: 1.7 }}>Volte para a coleção e continue explorando a experiência LaVic.</p>
        <Link href="/" className="button-dark">Voltar ao início</Link>
      </section>
    </PublicPage>
  );
}
