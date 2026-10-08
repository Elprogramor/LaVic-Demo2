import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const root = process.cwd();
const required = [
  'apps/storefront/app/page.tsx',
  'apps/storefront/app/globals.css',
  'apps/storefront/components/home-figma-v16.tsx',
  'apps/storefront/public/home-v16/three-lime-bottles.png',
];

const fail = (msg) => { console.error(`FAIL: ${msg}`); process.exitCode = 1; };
const pass = (msg) => console.log(`PASS: ${msg}`);

for (const rel of required) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p) || fs.statSync(p).size === 0) fail(`${rel} ausente ou vazio`);
  else pass(`${rel} presente`);
}

const page = fs.readFileSync(path.join(root, 'apps/storefront/app/page.tsx'), 'utf8');
const component = fs.readFileSync(path.join(root, 'apps/storefront/components/home-figma-v16.tsx'), 'utf8');
const css = fs.readFileSync(path.join(root, 'apps/storefront/app/globals.css'), 'utf8');

if (!page.includes('HomeFigmaV16')) fail('page.tsx não aponta para HomeFigmaV16'); else pass('HomeFigmaV16 ativa');
if (!component.includes('/home-v16/three-lime-bottles.png')) fail('asset de 3 garrafas não está aplicado'); else pass('asset de 3 garrafas aplicado');
if ((component.match(/three-lime-bottles\.png/g) ?? []).length < 2) fail('asset de referência não foi reutilizado no hero e rail'); else pass('asset reutilizado no hero e sabores');
if (!component.includes('f16-rhythm-stack')) fail('stack horizontal do painel verde ausente'); else pass('stack horizontal do painel verde presente');
if (!component.includes('f16-rhythm-mini--1') || !component.includes('f16-rhythm-mini--2')) fail('composições de produto do painel verde ausentes'); else pass('composições do painel verde presentes');
if (!css.includes('scale(1.105)')) fail('escala visual do hero não aplicada'); else pass('escala visual do hero aplicada');
if (!css.includes('-webkit-text-stroke-color: rgba(15, 64, 38, .34)')) fail('outline do hero não refinado'); else pass('outline do hero refinado');
if (/https:\/\/www\.figma\.com\/api\/mcp\/asset/i.test(component + css)) fail('URL temporária do Figma encontrada'); else pass('sem URLs temporárias do Figma');
if (/dangerouslySetInnerHTML/.test(component)) fail('dangerouslySetInnerHTML encontrado'); else pass('sem dangerouslySetInnerHTML');

try {
  execFileSync(process.execPath, ['--check', path.join(root, 'tooling/validate-storefront-v1.6.mjs')], { stdio: 'pipe' });
  pass('validador tem sintaxe Node válida');
} catch {
  fail('validador com sintaxe inválida');
}

if (!process.exitCode) console.log('\nVALIDAÇÃO ESTÁTICA V1.6: PASS');
