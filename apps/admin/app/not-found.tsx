import Link from "next/link";

export default function NotFound() {
  return <div className="empty-page"><div className="empty-illustration">404</div><h1>Registro não encontrado.</h1><p>O conteúdo pode ter sido removido ou o endereço está incorreto.</p><Link className="button button-primary" href="/">Voltar para a visão geral</Link></div>;
}
