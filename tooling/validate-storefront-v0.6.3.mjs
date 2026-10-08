import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const componentPath = path.join(root, "apps/storefront/components/home-v06.tsx");
const cssPath = path.join(root, "apps/storefront/app/globals.css");
const fail = (message) => { console.error(`✗ ${message}`); process.exitCode = 1; };
const ok = (message) => console.log(`  ✓ ${message}`);

for (const [label, file] of [["Home v0.6", componentPath], ["CSS global", cssPath]]) {
  if (!fs.existsSync(file)) fail(`${label} ausente: ${path.relative(root, file)}`);
}
if (process.exitCode) process.exit(process.exitCode);

const component = fs.readFileSync(componentPath, "utf8");
const css = fs.readFileSync(cssPath, "utf8");

const checks = [
  [component.includes("home6-liquid-button"), "CTAs líquidos continuam conectados"],
  [component.includes("Comprar agora"), "CTA Comprar agora preservado"],
  [css.includes("STOREFRONT v0.6.3 — CLEAN WATER-FILL CTA"), "override v0.6.3 presente"],
  [css.includes("top: 100%"), "água começa 100% fora do botão"],
  [css.includes("top: 0;"), "água termina preenchendo 100% do botão"],
  [css.includes("width: 100%") && css.includes("height: 100%"), "camada de água usa exatamente a área do CTA"],
  [css.includes("transition: top var(--home6-liquid-duration) ease-in-out"), "movimento vertical suave configurado"],
  [css.includes("--home6-liquid: var(--home5-green-deep)"), "verde institucional aplicado ao preenchimento"],
  [css.includes("--home6-liquid: #fff8ea"), "variante clara preservada em fundos verdes"],
  [css.includes("prefers-reduced-motion: reduce"), "acessibilidade de movimento preservada"],
  [!css.includes("top: -175%"), "massa circular antiga removida"],
  [!css.includes("width: 142%"), "geometria circular antiga removida"],
];
for (const [pass, label] of checks) pass ? ok(label) : fail(label);

const open = (css.match(/{/g) ?? []).length;
const close = (css.match(/}/g) ?? []).length;
open === close ? ok(`CSS balanceado (${open}/${close})`) : fail(`CSS desbalanceado (${open}/${close})`);

for (const pattern of ["dangerouslySetInnerHTML", "console.log(", "NEXT_PUBLIC_SECRET", "NEXT_PUBLIC_PRIVATE"]) {
  if (component.includes(pattern) || css.includes(pattern)) fail(`padrão proibido encontrado: ${pattern}`);
}

if (!process.exitCode) console.log("\nLaVic Storefront v0.6.3 — validação estática aprovada.");
