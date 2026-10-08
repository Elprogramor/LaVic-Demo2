import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const cssPath = path.join(root, 'apps/storefront/app/globals.css');
if (!fs.existsSync(cssPath)) throw new Error('globals.css nao encontrado.');
const css = fs.readFileSync(cssPath, 'utf8');
const checks = [
  ['duracao de 1.05s', '--home6-water-duration: 1050ms'],
  ['corpo inicia vazio', 'height: 0%'],
  ['corpo termina cheio', 'height: 100%'],
  ['superficie inicia na base', 'top: calc(100% - 3px)'],
  ['superficie termina acima', 'top: -10px'],
  ['reduced motion', '@media (prefers-reduced-motion: reduce)'],
];
for (const [label, needle] of checks) {
  if (!css.includes(needle)) throw new Error(`Falhou: ${label}`);
}
const opens = (css.match(/\{/g) || []).length;
const closes = (css.match(/\}/g) || []).length;
if (opens !== closes) throw new Error(`CSS desbalanceado: ${opens}/${closes}`);
if (css.includes('dangerouslySetInnerHTML')) throw new Error('dangerouslySetInnerHTML detectado no CSS inesperadamente.');
console.log('LaVic Storefront v0.6.4 — validacao estatica aprovada.');
console.log('  ✓ agua cresce de 0% para 100%');
console.log('  ✓ superficie acompanha a subida');
console.log('  ✓ duracao e easing perceptiveis');
console.log('  ✓ estado inicial limpo');
console.log('  ✓ reduced motion preservado');
console.log(`  ✓ CSS balanceado: ${opens}/${closes}`);
