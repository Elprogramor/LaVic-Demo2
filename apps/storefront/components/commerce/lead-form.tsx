"use client";

import { useState } from "react";

export function LeadForm({ kind = "revenda" }: { kind?: "revenda" | "encomenda" }) {
  const [sent, setSent] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form className="form-grid" onSubmit={onSubmit}>
      <div className="field"><label htmlFor="name">Nome</label><input id="name" name="name" autoComplete="name" required /></div>
      <div className="field"><label htmlFor="phone">WhatsApp</label><input id="phone" name="phone" inputMode="tel" autoComplete="tel" required /></div>
      <div className="field"><label htmlFor="email">E-mail</label><input id="email" name="email" type="email" autoComplete="email" /></div>
      <div className="field"><label htmlFor="company">{kind === "revenda" ? "Empresa / estabelecimento" : "Tipo de evento"}</label><input id="company" name="company" /></div>
      <div className="field field--wide"><label htmlFor="message">Conte um pouco sobre o que precisa</label><textarea id="message" name="message" /></div>
      <div className="field field--wide">
        <button className="button-dark" type="submit">{sent ? "Demonstração registrada" : "Enviar interesse"}</button>
        <p className="form-note">Demonstração: este formulário não envia dados para nenhum servidor. A integração final será definida com a LaVic.</p>
      </div>
    </form>
  );
}
