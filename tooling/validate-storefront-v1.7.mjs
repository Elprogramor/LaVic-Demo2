import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/storefront/app/page.tsx',
  'apps/storefront/app/globals.css',
  'apps/storefront/components/home-figma-v17.tsx',
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
const componentPath = path.join(root, 'apps/storefront/components/home-figma-v17.tsx');
const cssPath = path.join(root, 'apps/storefront/app/globals.css');

if (fs.existsSync(pagePath) && fs.existsSync(componentPath) && fs.existsSync(cssPath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  const component = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');

  if (!page.includes('HomeFigmaV17')) fail('page.tsx não aponta para HomeFigmaV17'); else pass('HomeFigmaV17 ativa');
  if (!component.includes('Descubra Toda Nossa Seleção')) fail('badge do hero não corresponde ao Figma'); else pass('badge do hero alinhado ao Figma');
  if (!component.includes('/home-v17/francis-avatar.png')) fail('avatar visual do depoimento ausente'); else pass('avatar visual do depoimento aplicado');
  if (!component.includes('Uma breve<br />introdução<br />sobre quem<br />somos')) fail('quebra editorial do intro ausente'); else pass('quebra editorial do intro aplicada');
  if (!component.includes('f17-trust-statement')) fail('estrutura de trust strip v1.7 ausente'); else pass('trust strip v1.7 presente');

  const cssChecks = [
    ['transform: scale(1.22)', 'escala medida do hero'],
    ['object-fit: fill', 'composição completa dos cards'],
    ['scaleX(1.05) scaleY(1.90)', 'comprimento do stack horizontal'],
    ['font-size: 82px', 'preço do espumante calibrado'],
    ['f17-trust-statement', 'trust strip refinada'],
    ['-webkit-text-stroke-width: 1.35px', 'outline do KOMBUCHA reforçado'],
  ];
  for (const [needle, label] of cssChecks) {
    if (!css.includes(needle)) fail(`${label} não encontrado`); else pass(label);
  }

  const pairs = [
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ];
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

  if (/https:\/\/www\.figma\.com\/api\/mcp\/asset/i.test(component + css)) fail('URL temporária do Figma encontrada'); else pass('sem URLs temporárias do Figma');
  if (/dangerouslySetInnerHTML/.test(component)) fail('dangerouslySetInnerHTML encontrado'); else pass('sem dangerouslySetInnerHTML');
}

if (failed) process.exit(1);
console.log('\nVALIDAÇÃO ESTÁTICA V1.7: PASS');
