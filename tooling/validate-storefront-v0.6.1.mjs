import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "apps/storefront/components/home-v06.tsx",
  "apps/storefront/app/globals.css",
];

const fail = (message) => { console.error(`✗ ${message}`); process.exitCode = 1; };
const ok = (message) => console.log(`  ✓ ${message}`);

for (const file of required) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) fail(`arquivo ausente: ${file}`);
}
if (process.exitCode) process.exit(process.exitCode);

const component = fs.readFileSync(path.join(root, required[0]), "utf8");
const css = fs.readFileSync(path.join(root, required[1]), "utf8");

const checks = [
  [component.includes("home6-hero__media"), "hero full-bleed conectado"],
  [component.includes('sizes="100vw"'), "imagem do hero dimensionada para viewport"],
  [!component.includes('className="home5-hero__visual"'), "coluna antiga do hero removida"],
  [css.includes("transform: translate3d(0, 112%, 0)"), "CTA começa totalmente vazio"],
  [css.includes("--home6-liquid-duration: 980ms"), "enchimento líquido desacelerado"],
  [css.includes("object-position: 56% center"), "enquadramento desktop controlado"],
  [css.includes("object-position: 76% center"), "enquadramento mobile controlado"],
  [css.includes(".home6-hero__veil"), "gradiente de legibilidade presente"],
  [!component.includes("KOMBUCHA LAVIC"), "hero sem kicker redundante"],
  [component.includes("Comprar agora"), "CTA Comprar agora preservado"],
];
for (const [pass, label] of checks) pass ? ok(label) : fail(label);

const open = (css.match(/{/g) ?? []).length;
const close = (css.match(/}/g) ?? []).length;
if (open === close) ok(`CSS balanceado (${open}/${close})`); else fail(`CSS desbalanceado (${open}/${close})`);

for (const pattern of ["dangerouslySetInnerHTML", "console.log(", "NEXT_PUBLIC_SECRET", "NEXT_PUBLIC_PRIVATE"]) {
  if (component.includes(pattern) || css.includes(pattern)) fail(`padrão proibido encontrado: ${pattern}`);
}
if (!process.exitCode) {
  console.log("\nLaVic Storefront v0.6.1 — validação estática aprovada.");
}
