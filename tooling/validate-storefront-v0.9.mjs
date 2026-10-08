import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const files = {
  page: path.join(root, "apps/storefront/app/page.tsx"),
  home: path.join(root, "apps/storefront/components/home-v09.tsx"),
  content: path.join(root, "apps/storefront/content/home-v09.ts"),
  css: path.join(root, "apps/storefront/app/globals.css"),
  asset: path.join(root, "apps/storefront/public/home-v09/lavic-limao-cutout.png"),
  motion: path.join(root, "apps/storefront/components/motion/lavic-motion.ts"),
};

let failed = false;
const ok = (message) => console.log(`[OK] ${message}`);
const fail = (message) => { failed = true; console.error(`[FAIL] ${message}`); };

for (const [name, file] of Object.entries(files)) {
  if (name === "motion" && !fs.existsSync(file)) {
    console.warn("[WARN] Motion System v0.7 não está no patch incremental; ele deve existir no projeto-base v0.8.");
    continue;
  }
  fs.existsSync(file) ? ok(`Arquivo presente: ${path.relative(root, file)}`) : fail(`Arquivo ausente: ${path.relative(root, file)}`);
}

if (failed) process.exit(1);

const page = fs.readFileSync(files.page, "utf8");
const home = fs.readFileSync(files.home, "utf8");
const content = fs.readFileSync(files.content, "utf8");
const css = fs.readFileSync(files.css, "utf8");
const assetSize = fs.statSync(files.asset).size;

const sections = [
  "home9-hero",
  "home9-benefit",
  "home9-intro",
  "home9-showcase",
  "home9-trust",
  "home9-promo",
  "home9-footer",
];

const checks = [
  [page.includes('import { HomeV09 }') && page.includes('<HomeV09 />'), "Home utiliza o componente v0.9 isolado"],
  [home.includes('className="home9-header"') && home.includes('className="home9-nav"'), "Header editorial com navegação em pill aplicado"],
  [home.includes('className="home9-hero__word"') && home.includes('LAVIC'), "Wordmark outline gigante presente no hero"],
  [home.includes('/home-v09/lavic-limao-cutout.png'), "Garrafa LaVic recortada usada como produto protagonista"],
  [home.includes('className="home9-hero__mini"'), "Card lateral de produto do hero presente"],
  [home.includes('className="home9-hero__manifesto"'), "Bloco editorial inferior do hero presente"],
  [home.includes('className="home9-benefit__panel"') && home.includes('home9-benefit__cards'), "Grande painel verde com mídia e cards aplicado"],
  [home.includes('className="home9-intro__stats"'), "Seção de introdução com métricas factuais aplicada"],
  [home.includes('className="home9-showcase__marquee"') && home.includes('home9-showcase__purchase'), "Showcase de produto com tipografia outline e preço aplicado"],
  [home.includes('home9-trust__grid'), "Faixa de três diferenciais aplicada"],
  [home.includes('className="home9-promo__panel"'), "Banner promocional arredondado aplicado"],
  [home.includes('className="home9-footer__headline"') && home.includes('home9-footer__faq'), "Headline final e FAQ editorial aplicados"],
  [sections.every((section) => css.includes(`.${section}`)), "CSS cobre todos os blocos principais da referência"],
  [css.includes('#fefefe') && css.includes('#1f3e25') && css.includes('#7e9583'), "Paleta-base da referência adaptada à LaVic"],
  [css.includes('@media (max-width: 900px)') && css.includes('@media (max-width: 640px)'), "Home possui composições responsivas dedicadas"],
  [home.includes('MotionConfig reducedMotion="user"'), "Preferência de redução de movimento respeitada"],
  [home.includes('variants={heroContainer}') && home.includes('variants={cardContainer}') && home.includes('variants={mediaReveal}'), "Motion System LaVic preservado"],
  [!home.includes('12,382') && !home.includes('150K') && !home.includes('99%') && !home.includes('★★★★★'), "Números e avaliações fictícias da referência não foram copiados"],
  [content.includes('02') && content.includes('1L'), "Métricas exibidas correspondem ao catálogo atual do storefront"],
  [!home.includes('dangerouslySetInnerHTML') && !content.includes('dangerouslySetInnerHTML'), "Nenhuma injeção HTML insegura introduzida"],
  [!home.includes('http://') && !home.includes('https://'), "Nenhum recurso remoto novo introduzido"],
  [assetSize > 100_000, "Asset principal da garrafa possui conteúdo não vazio"],
];

for (const [condition, message] of checks) condition ? ok(message) : fail(message);

if (failed) {
  console.error("\nSTOREFRONT v0.9: validação estrutural falhou.");
  process.exit(1);
}

console.log("\nSTOREFRONT v0.9: validação estrutural aprovada.");
