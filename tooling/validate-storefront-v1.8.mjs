import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/storefront/app/page.tsx',
  'apps/storefront/app/globals.css',
  'apps/storefront/components/home-figma-v18.tsx',
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
const componentPath = path.join(root, 'apps/storefront/components/home-figma-v18.tsx');
const cssPath = path.join(root, 'apps/storefront/app/globals.css');

if (fs.existsSync(pagePath) && fs.existsSync(componentPath) && fs.existsSync(cssPath)) {
  const page = fs.readFileSync(pagePath, 'utf8');
  const component = fs.readFileSync(componentPath, 'utf8');
  const css = fs.readFileSync(cssPath, 'utf8');

  if (!page.includes('HomeFigmaV18')) fail('page.tsx não aponta para HomeFigmaV18'); else pass('HomeFigmaV18 ativa');
  if (!component.includes('function HeroWordmarkSvg')) fail('HeroWordmarkSvg ausente'); else pass('HeroWordmarkSvg presente');
  if (!component.includes('className="f18-hero-wordmark"')) fail('SVG do wordmark não aplicado ao hero'); else pass('SVG do wordmark aplicado');
  if (component.includes('className="f13-hero-word"')) fail('texto antigo do KOMBUCHA ainda está sendo usado'); else pass('texto antigo removido');
  if (!component.includes('Descubra Toda Nossa Seleção')) fail('badge do hero não corresponde ao Figma'); else pass('badge do hero alinhado ao Figma');

  const cssChecks = [
    ['.f18-hero-wordmark {', 'classe base do SVG do wordmark'],
    ['.f18-hero-wordmark-text {', 'classe tipográfica do SVG do wordmark'],
    ['stroke: rgba(15, 64, 38, 0.28)', 'stroke calibrado do wordmark'],
    ['font-size: 234px', 'tamanho do wordmark do hero'],
    ['letter-spacing: 0.06em', 'tracking do wordmark do hero'],
    ['top: 254px', 'posição vertical do wordmark do hero'],
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
console.log('\nVALIDAÇÃO ESTÁTICA V1.8: PASS');
