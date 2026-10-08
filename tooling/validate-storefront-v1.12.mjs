import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/storefront/app/globals.css',
  'apps/storefront/app/page.tsx',
  'apps/storefront/components/home-figma-v110.tsx',
];

let failed = false;
const fail = (msg) => { failed = true; console.error(`FAIL: ${msg}`); };
const pass = (msg) => console.log(`PASS: ${msg}`);

for (const rel of required) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) fail(`${rel} ausente ou vazio`);
  else pass(`${rel} presente`);
}

const page = fs.readFileSync(path.join(root, 'apps/storefront/app/page.tsx'), 'utf8');
const component = fs.readFileSync(path.join(root, 'apps/storefront/components/home-figma-v110.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'apps/storefront/app/globals.css'), 'utf8');

if (!page.includes('HomeFigmaV110')) fail('page.tsx não aponta para HomeFigmaV110'); else pass('HomeFigmaV110 ativa');
if (!component.includes('className="f13-hero-word"')) fail('wordmark de texto do hero ausente'); else pass('wordmark de texto do hero presente');
if (!css.includes('"Codec Pro Trial"')) fail('stack tipográfico reforçado com Codec Pro Trial não encontrado'); else pass('stack tipográfico Codec Pro reforçado');
if (!css.includes('-webkit-text-stroke: 2px #196168;')) fail('stroke principal de 2px não encontrado'); else pass('stroke principal de 2px aplicado');
if (!css.includes('text-stroke: 2px #196168;')) fail('fallback principal de 2px não encontrado'); else pass('fallback principal de 2px aplicado');
if (!css.includes('font-weight: 700 !important;')) fail('font-weight reforçado não encontrado'); else pass('font-weight reforçado presente');

const pairs = [['(', ')'], ['[', ']'], ['{', '}']];
for (const [filePath, source] of [['page.tsx', page], ['home-figma-v110.tsx', component]]) {
  for (const [open, close] of pairs) {
    const a = source.split(open).length - 1;
    const b = source.split(close).length - 1;
    if (a !== b) fail(`${filePath} desbalanceado para ${open}${close}: ${a} vs ${b}`);
  }
  pass(`${filePath} estrutura básica balanceada`);
}
const opens = (css.match(/{/g) ?? []).length;
const closes = (css.match(/}/g) ?? []).length;
if (opens !== closes) fail(`CSS desbalanceado: ${opens} { vs ${closes} }`); else pass('CSS balanceado');
if (/dangerouslySetInnerHTML/.test(component)) fail('dangerouslySetInnerHTML encontrado'); else pass('sem dangerouslySetInnerHTML');

if (failed) process.exit(1);
console.log('\nVALIDAÇÃO ESTÁTICA V1.12: PASS');
