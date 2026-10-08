"use client";

import { useState, type FormEvent } from "react";

export function LeadForm({ kind }: { kind: "b2b" | "special" }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }

  if (sent) {
    return (
      <div className="lavic-form-success">
        <span>✓</span>
        <p className="lavic-kicker">Solicitação recebida</p>
        <h2>Obrigado por falar com a LaVic.</h2>
        <p>Esta demonstração não envia dados reais. Na versão conectada, o contato seguirá para o fluxo comercial da marca.</p>
      </div>
    );
  }

  return (
    <form className="lavic-lead-form" onSubmit={submit}>
      <div className="lavic-lead-form__heading">
        <p className="lavic-kicker">{kind === "b2b" ? "Vamos conversar" : "Conte o que você imagina"}</p>
        <h2>{kind === "b2b" ? "Leve LaVic para o seu negócio." : "Crie um momento especial com LaVic."}</h2>
      </div>
      <div className="lavic-form-grid">
        <label><span>Seu nome</span><input required name="name" placeholder="Nome e sobrenome" /></label>
        {kind === "b2b" && <label><span>Nome do negócio</span><input required name="business" placeholder="Empresa ou estabelecimento" /></label>}
        <label><span>WhatsApp</span><input required name="whatsapp" placeholder="(00) 00000-0000" /></label>
        {kind === "b2b" ? <>
          <label><span>Cidade</span><input required name="city" placeholder="Cidade" /></label>
          <label><span>Tipo de negócio</span><input required name="type" placeholder="Café, mercado, restaurante..." /></label>
        </> : <>
          <label><span>Ocasião</span><input required name="occasion" placeholder="Evento, presente, empresa..." /></label>
          <label><span>Quantidade estimada</span><input type="number" min="1" name="quantity" placeholder="Ex.: 30" /></label>
        </>}
        <label className="lavic-form-grid__wide"><span>Mensagem</span><textarea name="message" rows={5} placeholder="Conte um pouco sobre o que precisa." /></label>
      </div>
      <div className="lavic-lead-form__footer">
        <button className="lavic-pill-button lavic-pill-button--dark" type="submit">Enviar solicitação <span>→</span></button>
        <p>Formulário demonstrativo: nenhum dado é enviado ou armazenado.</p>
      </div>
    </form>
  );
}
