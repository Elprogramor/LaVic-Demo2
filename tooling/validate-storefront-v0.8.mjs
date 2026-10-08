import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const homePath = path.join(root, "apps/storefront/components/home-v06.tsx");
const cssPath = path.join(root, "apps/storefront/app/globals.css");
const motionPath = path.join(root, "apps/storefront/components/motion/lavic-motion.ts");

let failed = false;

function ok(message) {
  console.log(`[OK] ${message}`);
}

function fail(message) {
  failed = true;
  console.error(`[FAIL] ${message}`);
}

for (const file of [homePath, cssPath]) {
  fs.existsSync(file)
    ? ok(`Arquivo presente: ${path.relative(root, file)}`)
    : fail(`Arquivo ausente: ${path.relative(root, file)}`);
}

if (failed) process.exit(1);

const home = fs.readFileSync(homePath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");
const motion = fs.existsSync(motionPath) ? fs.readFileSync(motionPath, "utf8") : "";

const checks = [
  [home.includes('className="home8-hero"'), "Hero editorial v0.8 aplicado"],
  [home.includes('className="home8-hero__wordmark"') && home.includes('>LaVic</div>'), "Wordmark LaVic gigante presente"],
  [home.includes('className="home8-hero__product"') && home.includes('src={homeV06Media.hero}'), "Produto central utiliza o asset atual da LaVic"],
  [home.includes('className="home8-hero__copy"') && home.includes('Viva <em>com gás.</em>'), "Headline LaVic preservada no novo hero"],
  [home.includes('href="/sabores"') && home.includes('home6-liquid-button'), "CTA principal atual preservado"],
  [home.includes('href="/produto/limao-1l"'), "Acesso direto ao produto em destaque presente"],
  [home.includes('className="home8-alive"'), "Nova primeira seção verde aplicada"],
  [home.includes('id="home8-alive-title"') && home.includes('Feita para estar viva.'), "Narrativa de produto vivo aplicada"],
  [home.includes('home8Essentials.map'), "Bloco de atributos estruturado como dados reutilizáveis"],
  [(home.match(/index: "0[1-4]"/g) ?? []).length === 4, "Quatro atributos editoriais configurados"],
  [home.includes('MotionConfig reducedMotion="user"'), "Motion System v0.7 e preferência de movimento preservados"],
  [home.includes('variants={heroContainer}') && home.includes('variants={cardContainer}'), "Sequência e stagger do Motion System preservados"],
  [css.includes('.home8-hero__grid') && css.includes('grid-template-columns: minmax(0, .9fr)'), "Composição desktop em três zonas implementada"],
  [css.includes('@media (max-width: 700px)') && css.includes('flex-direction: column'), "Composição mobile redesenhada, não apenas comprimida"],
  [css.includes('.home8-alive__panel') && css.includes('border-radius: 38px'), "Painel verde editorial arredondado implementado"],
  [css.includes('@media (prefers-reduced-motion: reduce)'), "Fallback de reduced motion preservado"],
  [!home.includes('4.9') && !home.includes('★★★★★') && !home.includes('avaliaç'), "Nenhuma avaliação/prova social fictícia adicionada"],
  [!home.includes('http://') && !home.includes('https://'), "Nenhum recurso remoto novo adicionado ao componente"],
  [!home.includes('dangerouslySetInnerHTML'), "Nenhuma injeção HTML insegura introduzida"],
];

for (const [condition, message] of checks) {
  condition ? ok(message) : fail(message);
}

if (motion) {
  motion.includes('export const LAVIC_EASE')
    ? ok('Tokens de motion existentes continuam disponíveis')
    : fail('Motion System existente não encontrado/compatível');
} else {
  console.warn('[WARN] components/motion/lavic-motion.ts não está neste patch incremental; ele deve vir da v0.7 já aplicada.');
}

if (failed) {
  console.error('\nSTOREFRONT v0.8: validação estrutural falhou.');
  process.exit(1);
}

console.log('\nSTOREFRONT v0.8: validação estrutural aprovada.');
