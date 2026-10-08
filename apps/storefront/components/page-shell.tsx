import type { PropsWithChildren } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function PageShell({ eyebrow, title, intro, children, word = "lavic" }: PropsWithChildren<{ eyebrow: string; title: string; intro: string; word?: string }>) {
  return (
    <>
      <SiteHeader />
      <main className="lavic-inner-page">
        <header className="lavic-inner-hero">
          <div className="lavic-inner-hero__word" aria-hidden="true">{word}</div>
          <div className="lavic-inner-hero__content">
            <p className="lavic-kicker">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{intro}</p>
          </div>
          <div className="lavic-inner-hero__line" />
        </header>
        <section className="lavic-inner-content">{children}</section>
      </main>
      <SiteFooter />
    </>
  );
}
