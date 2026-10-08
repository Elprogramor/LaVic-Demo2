import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/storefront/app/page.tsx',
  'apps/storefront/app/globals.css',
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

const pagePath = path.join(root, 'apps/storefront/app/page.tsx');
const componentPath = path.join(root, 'apps/storefront/components/home-figma-v110.tsx');
const cssPath = path.join(root, 'apps/storefront/app/globals.css');

if (fs.existsSync(pagePath) && fs.existsSync(componentPath) && fs.existsSync(cssPath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  const component = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');

  if (!page.includes('HomeFigmaV110')) fail('page.tsx não aponta para HomeFigmaV110'); else pass('HomeFigmaV110 ativa');
  if (!component.includes('className="f13-hero-word"')) fail('wordmark de texto do hero ausente'); else pass('wordmark de texto do hero presente');
  if (component.includes('HeroWordmarkSvg')) fail('HeroWordmarkSvg ainda presente'); else pass('SVG do hero removido');
  if (!css.includes('font-family: "Codec Pro", "CodecPro", "Alexandria", Arial, sans-serif;')) fail('stack tipográfico Codec Pro não encontrado'); else pass('stack tipográfico Codec Pro presente');
  if (!css.includes('-webkit-text-stroke: 7mm')) fail('stroke de 7mm não encontrado'); else pass('stroke de 7mm aplicado');
  if (!css.includes('.f13-hero-fade {\n  z-index: 3;')) fail('fade do hero não restaurado'); else pass('fade do hero restaurado');
  if (!css.includes('transform: none;')) fail('transform:none não encontrado para a garrafa do hero'); else pass('transform:none encontrado para a garrafa do hero');

  const pairs = [['(', ')'], ['[', ']'], ['{', '}']];
  for (const [filePath, source] of [[pagePath, page], [componentPath, component]]) {
    for (const [open, close] of pairs) {
      const a = source.split(open).length - 1;
      const b = source.split(close).length - 1;
      if (a !== b) fail(`${path.basename(filePath)} desbalanceado para ${open}${close}: ${a} vs ${b}`);
    }
    pass(`${path.basename(filePath)} estrutura básica balanceada`);
  }
  const opens = (css.match(/{/g) ?? []).length;
  const closes = (css.match(/}/g) ?? []).length;
  if (opens !== closes) fail(`CSS desbalanceado: ${opens} { vs ${closes} }`); else pass('CSS balanceado');
  if (/dangerouslySetInnerHTML/.test(component)) fail('dangerouslySetInnerHTML encontrado'); else pass('sem dangerouslySetInnerHTML');
}

if (failed) process.exit(1);
console.log('\nVALIDAÇÃO ESTÁTICA V1.10: PASS');
