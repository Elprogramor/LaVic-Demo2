import { OutlineWord } from "@/components/ui/outline-word";

export function PageHero({ eyebrow, title, description, word }: { eyebrow: string; title: string; description: string; word: string }) {
  return (
    <section className="page-hero">
      <OutlineWord>{word}</OutlineWord>
      <div className="content-shell page-hero-copy">
        <span className="eyebrow-pill">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
