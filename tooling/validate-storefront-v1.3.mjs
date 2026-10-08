import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = process.cwd();
const staticOnly = process.argv.includes("--static");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const exists = (p) => fs.existsSync(path.join(root, p));
const pass = (msg) => console.log(`PASS — ${msg}`);
const fail = (msg) => { console.error(`FAIL — ${msg}`); process.exitCode = 1; };

const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/components/home-figma-v13.tsx",
  "apps/storefront/content/home-v10.ts",
];
for (const file of required) exists(file) ? pass(`arquivo presente: ${file}`) : fail(`arquivo ausente: ${file}`);

if (process.exitCode) process.exit(process.exitCode);

const page = read("apps/storefront/app/page.tsx");
const component = read("apps/storefront/components/home-figma-v13.tsx");
const css = read("apps/storefront/app/globals.css");

page.includes("HomeFigmaV13") ? pass("home aponta para HomeFigmaV13") : fail("page.tsx não aponta para HomeFigmaV13");
!component.includes("framer-motion") ? pass("desktop exato sem transformações Framer Motion") : fail("HomeFigmaV13 ainda usa Framer Motion");
(component.match(/ESCOLHA O SEU/g) || []).length === 1 ? pass("CTA do hero não está duplicado") : fail("CTA do hero aparece mais de uma vez");
component.includes("f13-testimonial-quote") && component.includes("f13-testimonial-copy") ? pass("depoimento usa estrutura isolada") : fail("estrutura isolada do depoimento ausente");
component.includes("R$49,98") ? pass("preço do espumante usa linha única controlada") : fail("preço controlado do espumante ausente");

const cssChecks = [
  ["stage 1440×5230", ".f13-stage { position: relative; width: 1440px; height: 5230px;"],
  ["KOMBUCHA 1542px", "width: 1542px; height: 285px;"],
  ["KOMBUCHA 234px", "font-size: 234px; line-height: 285px;"],
  ["hero bottle 457×686", "width: 457px; height: 686px;"],
  ["fade y426", "top: 426px; left: 0; width: 1440px; height: 430px;"],
  ["copy x90 y530", "top: 530px; left: 90px; width: 407px;"],
  ["CTA x85 y672", "top: 672px; left: 85px; width: 167px; height: 46px;"],
  ["testimonial x297 y704", "top: 704px; left: 297px; width: 846px; height: 409px;"],
  ["bottled y1253", ".f13-bottled { position: absolute; top: 1253px;"],
  ["green panel y1852", ".f13-rhythm { position: absolute; top: 1852px;"],
  ["intro y2669", ".f13-intro { position: absolute; top: 2669px;"],
  ["showcase y2978", ".f13-showcase { position: absolute; top: 2978px;"],
  ["trust y3856", ".f13-trust { position: absolute; top: 3856px;"],
  ["B2B y4104", ".f13-b2b { position: absolute; top: 4104px;"],
  ["footer y4621", ".f13-footer { position: absolute; top: 4621px;"],
  ["price nowrap", "white-space: nowrap;"],
];
for (const [label, needle] of cssChecks) css.includes(needle) ? pass(label) : fail(label);

const dangerous = ["figma.com/api/mcp/asset/", "dangerouslySetInnerHTML", "javascript:"];
for (const token of dangerous) {
  !component.includes(token) && !css.includes(token) ? pass(`sem padrão inseguro/temporário: ${token}`) : fail(`padrão não permitido encontrado: ${token}`);
}

const assetRefs = [...component.matchAll(/src=\"(\/[^\"]+)\"/g)].map((m) => m[1]);
const uniqueAssets = [...new Set(assetRefs)];
for (const asset of uniqueAssets) {
  const local = path.join(root, "apps/storefront/public", asset.slice(1));
  fs.existsSync(local) && fs.statSync(local).size > 0 ? pass(`asset presente: ${asset}`) : fail(`asset ausente: ${asset}`);
}

if (!staticOnly && !process.exitCode) {
  const commands = [
    ["npm", ["run", "typecheck", "-w", "@lavic/storefront"]],
    ["npm", ["run", "build", "-w", "@lavic/storefront"]],
  ];
  for (const [cmd, args] of commands) {
    const result = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
    if (result.status === 0) pass(`${cmd} ${args.join(" ")}`);
    else { fail(`${cmd} ${args.join(" ")}`); break; }
  }
}

if (!process.exitCode) console.log("\nLaVic storefront v1.3 validado.");
