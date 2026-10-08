import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const cssPath = 'apps/storefront/app/globals.css';
const componentPath = 'apps/storefront/components/home-v10.tsx';

const required = [
  [cssPath, [
    'LaVic Storefront v1.2 — Figma CSS fidelity pass',
    'width: 1542px;',
    'height: 285px;',
    'font-size: 234px;',
    'line-height: 285px;',
    'letter-spacing: .06em;',
    'opacity: .5;',
    '-webkit-text-stroke: 1px #0f4026;',
    'left: calc(50% - 662px);',
    'width: 1409px;',
    'left: calc(50% - 228px);',
    'width: 457px;',
    'height: 686px;',
    'linear-gradient(178.76deg, rgba(254,254,254,0) 1.64%, #fefefe 45.83%)',
    'left: 119px;',
    'grid-template-columns: repeat(4, 282px);',
    'left: 19px;',
    'width: 1401px;',
    'border-radius: 46px;',
    'top: 2669px;',
    'left: 89px;',
    'top: 2978px;',
    'left: 203px;',
    'width: 425.638px;',
    'top: 3856px;',
    'width: 1260.06px;',
    'top: 4104px;',
    'width: 1394px;',
    'transform: rotate(37.6deg);',
    'transform: rotate(-.18deg);',
    'top: 4621px;',
    'width: 806.36px;',
    'top: -32px;',
    'width: 1260.11px;',
  ]],
  [componentPath, [
    'className="home10-hero__word"',
    'className="home10-bottled__grid"',
    'className="home10-rhythm__panel"',
    'className="home10-showcase__purchase"',
    'className="home10-b2b__panel"',
    'className="home10-footer__bottom"',
  ]],
];

let failed = false;
for (const [file, needles] of required) {
  if (!fs.existsSync(file)) {
    console.error(`[FAIL] arquivo ausente: ${file}`);
    failed = true;
    continue;
  }
  const src = fs.readFileSync(file, 'utf8');
  for (const needle of needles) {
    if (!src.includes(needle)) {
      console.error(`[FAIL] ${file}: não encontrou ${JSON.stringify(needle)}`);
      failed = true;
    }
  }
}

if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, 'utf8');
  let balance = 0;
  for (const ch of css) {
    if (ch === '{') balance += 1;
    if (ch === '}') balance -= 1;
    if (balance < 0) break;
  }
  if (balance !== 0) {
    console.error(`[FAIL] CSS com chaves desbalanceadas: ${balance}`);
    failed = true;
  }

  for (const forbidden of [
    'figma.com/api/mcp/asset/',
    'javascript:',
    'expression(',
  ]) {
    if (css.toLowerCase().includes(forbidden.toLowerCase())) {
      console.error(`[FAIL] CSS contém referência proibida: ${forbidden}`);
      failed = true;
    }
  }
}

if (fs.existsSync(componentPath)) {
  const component = fs.readFileSync(componentPath, 'utf8');
  for (const forbidden of ['dangerouslySetInnerHTML', 'figma.com/api/mcp/asset/']) {
    if (component.includes(forbidden)) {
      console.error(`[FAIL] componente contém referência proibida: ${forbidden}`);
      failed = true;
    }
  }
}

if (failed) process.exit(1);
console.log('[OK] auditoria estrutural v1.2');

const staticOnly = process.argv.includes('--static');
if (staticOnly) {
  console.log('[OK] modo --static: typecheck/build não executados.');
  process.exit(0);
}

for (const [label, args] of [
  ['typecheck', ['run', 'typecheck', '-w', '@lavic/storefront']],
  ['build', ['run', 'build', '-w', '@lavic/storefront']],
]) {
  console.log(`\n[RUN] npm ${args.join(' ')}`);
  const r = spawnSync('npm', args, { stdio: 'inherit', shell: process.platform === 'win32' });
  if (r.status !== 0) {
    console.error(`[FAIL] ${label}`);
    process.exit(r.status ?? 1);
  }
  console.log(`[OK] ${label}`);
}

console.log('\n[OK] LaVic storefront v1.2 validado.');
