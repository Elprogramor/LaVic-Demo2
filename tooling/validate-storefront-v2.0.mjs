import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'apps/storefront/app/globals.css',
  'apps/storefront/app/sabores/page.tsx',
  'apps/storefront/app/kits/page.tsx',
  'apps/storefront/app/revenda/page.tsx',
  'apps/storefront/app/sobre/page.tsx',
  'apps/storefront/app/carrinho/page.tsx',
  'apps/storefront/app/checkout/page.tsx',
  'apps/storefront/app/encomendas/page.tsx',
  'apps/storefront/app/produto/[slug]/page.tsx',
  'apps/storefront/components/site-header.tsx',
  'apps/storefront/components/site-footer.tsx',
  'apps/storefront/components/page-shell.tsx',
  'apps/storefront/components/product-grid.tsx',
  'apps/storefront/components/product-purchase.tsx',
  'apps/storefront/components/lead-form.tsx',
  'apps/storefront/components/cart-drawer.tsx',
];

let failed = false;
const fail = (msg) => { failed = true; console.error(`FAIL: ${msg}`); };
const pass = (msg) => console.log(`PASS: ${msg}`);

for (const rel of required) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) fail(`${rel} ausente ou vazio`);
  else pass(`${rel} presente`);
}

const cssPath = path.join(root, 'apps/storefront/app/globals.css');
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf8');
  const checks = [
    ['LaVic Storefront v2.0', 'bloco visual v2.0'],
    ['.lavic-public-header', 'header público'],
    ['.lavic-inner-hero', 'hero editorial interno'],
    ['.lavic-product-grid', 'grid editorial de produtos'],
    ['.lavic-kit-card', 'cards de kits'],
    ['.lavic-b2b-showcase', 'showcase B2B'],
    ['.lavic-product-hero', 'detalhe de produto'],
    ['.lavic-cart-page', 'carrinho'],
    ['.lavic-checkout-grid', 'checkout'],
    ['.lavic-public-footer', 'footer público'],
    ['.lavic-drawer', 'drawer do carrinho'],
  ];
  for (const [needle, label] of checks) {
    if (!css.includes(needle)) fail(`${label} não encontrado`); else pass(label);
  }
  const opens = (css.match(/{/g) ?? []).length;
  const closes = (css.match(/}/g) ?? []).length;
  if (opens !== closes) fail(`CSS desbalanceado: ${opens} { vs ${closes} }`); else pass('CSS balanceado');
}

const publicFiles = required.filter((x) => x.endsWith('.tsx'));
for (const rel of publicFiles) {
  const src = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const [open, close] of [['(', ')'], ['[', ']'], ['{', '}']]) {
    const a = src.split(open).length - 1;
    const b = src.split(close).length - 1;
    if (a !== b) fail(`${rel} desbalanceado para ${open}${close}: ${a} vs ${b}`);
  }
  if (/dangerouslySetInnerHTML/.test(src)) fail(`${rel}: dangerouslySetInnerHTML encontrado`);
  else pass(`${rel}: estrutura básica segura`);
}

const packageFiles = fs.readdirSync(root, { recursive: true });
if (packageFiles.some((x) => String(x).replaceAll('\\','/').startsWith('apps/admin/'))) fail('pacote contém apps/admin, que deve permanecer intocado');
else pass('apps/admin não está no pacote');

if (failed) process.exit(1);
console.log('\nVALIDAÇÃO ESTÁTICA STOREFRONT V2.0: PASS');
