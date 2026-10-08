"use client";

import { useState, type FormEvent } from "react";
import { Button } from "./ui";
import { Icon } from "./icon";

export function CustomerNoteComposer() {
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!note.trim()) return;
    setSaved(true);
    setNote("");
    window.setTimeout(() => setSaved(false), 2600);
  }

  return (
    <form className="customer-note-compose" onSubmit={submit}>
      <label><span className="sr-only">Nova nota interna</span><textarea value={note} onChange={(event) => { setNote(event.target.value); setSaved(false); }} placeholder="Registrar contexto importante para a equipe..." maxLength={500}/></label>
      <div className="customer-note-actions"><span>{note.length}/500 · somente equipe</span><Button type="submit" disabled={!note.trim()}>Salvar nota</Button></div>
      {saved ? <div className="inline-feedback customer-note-feedback" role="status"><Icon name="check" size={14}/><span>Nota registrada nesta demonstração.</span></div> : null}
    </form>
  );
}
