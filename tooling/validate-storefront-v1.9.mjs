import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/storefront/app/page.tsx',
  'apps/storefront/app/globals.css',
  'apps/storefront/components/home-figma-v19.tsx',
  'apps/storefront/public/home-v17/francis-avatar.png',
  'apps/storefront/public/home-v16/three-lime-bottles.png',
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
const componentPath = path.join(root, 'apps/storefront/components/home-figma-v19.tsx');
const cssPath = path.join(root, 'apps/storefront/app/globals.css');

if (fs.existsSync(pagePath) && fs.existsSync(componentPath) && fs.existsSync(cssPath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  const component = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');

  if (!page.includes('HomeFigmaV19')) fail('page.tsx não aponta para HomeFigmaV19'); else pass('HomeFigmaV19 ativa');
  if (!component.includes('function HeroWordmarkSvg')) fail('HeroWordmarkSvg ausente'); else pass('HeroWordmarkSvg presente');
  if (!css.includes('font-family: "Codec Pro", "CodecPro", "Alexandria", Arial, sans-serif;')) fail('stack tipográfico do wordmark não atualizado'); else pass('wordmark com stack tipográfico novo');
  if (!css.includes('transform: scale(1.08)')) fail('recalibração da garrafa do hero ausente'); else pass('garrafa do hero recalibrada');
  if (!css.includes('.f13-hero-fade {\n  z-index: 1;')) fail('fade do hero não recalibrado'); else pass('fade do hero recalibrado');
  if (!css.includes('stroke: rgba(15, 64, 38, 0.24)')) fail('stroke do wordmark não recalibrado'); else pass('stroke do wordmark recalibrado');

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
console.log('\nVALIDAÇÃO ESTÁTICA V1.9: PASS');
