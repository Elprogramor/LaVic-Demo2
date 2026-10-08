"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./icon";

export function B2BNewLeadAction() {
  const [open, setOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  function close() {
    setOpen(false);
    setSaved(false);
  }

  return (
    <>
      <button className="button button-primary" onClick={() => setOpen(true)}><Icon name="plus" size={16}/><span>Novo lead</span></button>
      {open ? <div className="modal-layer" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
        <section className="modal-card b2b-lead-modal" role="dialog" aria-modal="true" aria-labelledby="new-b2b-lead-title">
          <header><div><span className="modal-eyebrow">Revenda / CRM comercial</span><h2 id="new-b2b-lead-title">Novo lead B2B</h2><p>Registre o contexto mínimo para que a próxima ação comercial já nasça organizada.</p></div><button className="icon-button" onClick={close} aria-label="Fechar"><Icon name="close" size={17}/></button></header>
          {saved ? <div className="b2b-demo-success"><span><Icon name="check" size={18}/></span><div><strong>Dados validados na interface.</strong><p>Nesta v0.4 a base é demonstrativa; a persistência será conectada à API na etapa de backend.</p></div></div> : <form onSubmit={submit}>
            <div className="form-grid two-columns">
              <label><span>Empresa *</span><input required name="company" maxLength={80} placeholder="Nome do estabelecimento"/></label>
              <label><span>Contato *</span><input required name="contact" maxLength={70} placeholder="Responsável comercial"/></label>
              <label><span>WhatsApp *</span><input required name="phone" inputMode="tel" maxLength={24} placeholder="(24) 9....-...."/></label>
              <label><span>E-mail</span><input name="email" type="email" maxLength={100} placeholder="contato@empresa.com"/></label>
              <label><span>Cidade *</span><input required name="city" maxLength={60} placeholder="Cidade"/></label>
              <label><span>Tipo de negócio *</span><select required name="business"><option value="">Selecione</option><option>Empório</option><option>Cafeteria</option><option>Mercado</option><option>Restaurante</option><option>Loja natural</option><option>Outro</option></select></label>
              <label><span>Volume estimado / mês</span><input name="volume" type="number" min="0" max="100000" step="1" placeholder="0"/></label>
              <label><span>Origem</span><select name="source"><option>Formulário de revenda</option><option>WhatsApp</option><option>Indicação</option><option>Evento</option><option>Prospecção manual</option></select></label>
            </div>
            <label className="form-field-block"><span>Contexto inicial</span><textarea name="notes" maxLength={500} rows={4} placeholder="Interesse, necessidade, frequência, observações comerciais..."/></label>
            <footer className="modal-actions"><button type="button" className="button button-secondary" onClick={close}>Cancelar</button><button type="submit" className="button button-primary"><Icon name="check" size={15}/><span>Validar lead</span></button></footer>
          </form>}
          {saved ? <footer className="modal-actions"><button className="button button-primary" onClick={close}>Concluir</button></footer> : null}
        </section>
      </div> : null}
    </>
  );
}
