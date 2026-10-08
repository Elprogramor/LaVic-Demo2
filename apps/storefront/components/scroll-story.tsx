"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const statements = ["Naturalmente fermentada.", "Ingredientes selecionados.", "Viva.", "Refrescante.", "Com gás."];

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-2, 2]);
  return (
    <section ref={ref} className="scroll-story">
      <motion.div className="story-orb story-orb--one" style={{ y }} />
      <motion.div className="story-orb story-orb--two" style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 90]) }} />
      <div className="site-container story-grid">
        <div className="story-intro"><p className="eyebrow">O produto em movimento</p><h2>O natural ganha ritmo.</h2><p>Nesta primeira versão, a narrativa usa movimento abstrato e bolhas. O asset final poderá receber vídeo ou sequência de frames do produto real.</p></div>
        <motion.div className="story-bottle" style={{ rotate }}><div className="story-bottle__body"><span>LaVic</span><small>VIVA COM GÁS</small></div><div className="story-bottle__cap" /></motion.div>
        <div className="story-statements">{statements.map((statement, index) => <motion.p key={statement} initial={{ opacity: .18, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: index * .06 }} viewport={{ amount: .8 }}>{statement}</motion.p>)}</div>
      </div>
    </section>
  );
}
