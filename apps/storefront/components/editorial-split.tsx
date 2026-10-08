import Image from "next/image";
import Link from "next/link";

export function EditorialSplit() {
  return (
    <section className="editorial-split section-pad">
      <div className="site-container editorial-split__grid">
        <div className="editorial-copy"><p className="eyebrow">Nossa essência</p><h2>Natural no processo.<br />Contemporânea na experiência.</h2><p>Uma presença leve, sensorial e feita para transformar uma pausa comum em um pequeno ritual.</p><Link href="/sobre" className="text-link">Conheça a história <span>→</span></Link></div>
        <div className="editorial-image"><Image src="/demo/lime-ingredient.png" alt="Limões frescos com gotas de água" fill sizes="(max-width: 900px) 100vw, 45vw" /></div>
      </div>
    </section>
  );
}
