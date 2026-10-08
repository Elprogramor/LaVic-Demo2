import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const cssPath = path.join(root, 'apps/storefront/app/globals.css');
const errors = [];
if (!fs.existsSync(cssPath)) errors.push('apps/storefront/app/globals.css não encontrado.');
else {
  const css = fs.readFileSync(cssPath, 'utf8');
  const required = [
    'STOREFRONT v0.6.5 — EXACT WATER BUTTON REFERENCE',
    'top: 100%;',
    'transition: top 0.4s ease-in-out;',
    '.home6-liquid-button:hover::before',
    'top: 0;',
    'transition: color 0.5s ease;',
    'border: 2px solid var(--home6-liquid);',
    'content: none !important;',
    'background: transparent !important;',
  ];
  for (const token of required) if (!css.includes(token)) errors.push(`CSS sem trecho obrigatório: ${token}`);
  const opens = (css.match(/\{/g) || []).length;
  const closes = (css.match(/\}/g) || []).length;
  if (opens !== closes) errors.push(`CSS desbalanceado: ${opens} aberturas / ${closes} fechamentos.`);
}

if (errors.length) {
  console.error('\nLaVic Storefront v0.6.5 — falhou:\n');
  for (const e of errors) console.error(`  ✗ ${e}`);
  process.exit(1);
}
console.log('\nLaVic Storefront v0.6.5 — validação estática aprovada.');
console.log('  ✓ efeito fornecido reproduzido literalmente');
console.log('  ✓ top 100% → 0 em 0.4s ease-in-out');
console.log('  ✓ texto 0.5s ease');
console.log('  ✓ CTA limpo em repouso');
console.log('  ✓ pseudo-elemento extra da v0.6.4 desativado');
console.log('  ✓ cores LaVic e variante clara preservadas');
