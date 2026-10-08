import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const checks = [
  ['apps/storefront/components/home-v10.tsx', [
    'home10-round-arrow__glyph',
    'className={`home10-round-arrow home10-round-arrow--${direction}`}',
  ]],
  ['apps/storefront/app/globals.css', [
    'LaVic Storefront v1.1 — pixel refinement: header + hero',
    'left: 113.9515px;',
    'left: 427.9515px;',
    'left: 1118.9515px;',
    'left: -51px;',
    'width: 1542px;',
    'font-size: 234px;',
    'letter-spacing: 14.04px;',
    'left: 492px;',
    'width: 457px;',
    'height: 686px;',
    'left: 297px;',
    'width: 846px;',
  ]],
  ['CAPTURAR_HOME_1440.ps1', ['--window-size=1440,5230', '--force-device-scale-factor=1']],
];

let failed = false;
for (const [file, needles] of checks) {
  if (!fs.existsSync(file)) {
    console.error(`[FAIL] arquivo ausente: ${file}`);
    failed = true;
    continue;
  }
  const source = fs.readFileSync(file, 'utf8');
  for (const needle of needles) {
    if (!source.includes(needle)) {
      console.error(`[FAIL] ${file}: não encontrou ${JSON.stringify(needle)}`);
      failed = true;
    }
  }
}

const css = fs.readFileSync('apps/storefront/app/globals.css', 'utf8');
const component = fs.readFileSync('apps/storefront/components/home-v10.tsx', 'utf8');

for (const forbidden of ['figma.com/api/mcp/asset/', 'dangerouslySetInnerHTML']) {
  if (css.includes(forbidden) || component.includes(forbidden)) {
    console.error(`[FAIL] referência proibida encontrada: ${forbidden}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('[OK] auditoria estrutural v1.1');

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

console.log('\n[OK] LaVic storefront v1.1 validado.');
