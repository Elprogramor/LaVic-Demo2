import Link from "next/link";

export default async function ComingSoonPage({ searchParams }: { searchParams: Promise<{ module?: string }> }) {
  const params = await searchParams;
  const moduleName = typeof params.module === "string" && params.module.trim() ? params.module.slice(0, 60) : "Este módulo";
  return (
    <div className="empty-page">
      <div className="empty-illustration">+</div>
      <h1>{moduleName}</h1>
      <p>Estrutura reservada para a próxima etapa do LaVic Admin.</p>
      <Link className="button button-primary" href="/">Voltar para a visão geral</Link>
    </div>
  );
}
