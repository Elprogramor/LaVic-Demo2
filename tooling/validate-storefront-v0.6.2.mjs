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
  [component.includes("home6-liquid-button"), "CTAs líquidos conectados"],
  [component.includes("Comprar agora"), "CTA Comprar agora preservado"],
  [css.includes("--home6-liquid-duration: 640ms"), "timing do preenchimento refinado"],
  [css.includes("top: 110%"), "estado inicial totalmente limpo"],
  [css.includes("top: -175%"), "massa arredondada completa o preenchimento"],
  [css.includes("width: 142%"), "frente circular cobre o pill sem laterais vazias"],
  [css.includes("border-radius: 50%"), "frente arredondada estilo referência"],
  [css.includes("color 170ms ease 150ms"), "troca de cor do texto acompanha o preenchimento"],
  [css.includes("prefers-reduced-motion: reduce"), "reduced motion preservado"],
  [!component.includes("KOMBUCHA LAVIC"), "hero sem kicker redundante"],
];
for (const [pass, label] of checks) pass ? ok(label) : fail(label);

const open = (css.match(/{/g) ?? []).length;
const close = (css.match(/}/g) ?? []).length;
if (open === close) ok(`CSS balanceado (${open}/${close})`); else fail(`CSS desbalanceado (${open}/${close})`);

for (const pattern of ["dangerouslySetInnerHTML", "console.log(", "NEXT_PUBLIC_SECRET", "NEXT_PUBLIC_PRIVATE"]) {
  if (component.includes(pattern) || css.includes(pattern)) fail(`padrão proibido encontrado: ${pattern}`);
}

if (!process.exitCode) console.log("\nLaVic Storefront v0.6.2 — validação estática aprovada.");
