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
  "apps/storefront/components/home-figma-v14.tsx",
  ...(!staticOnly ? ["apps/storefront/content/home-v10.ts"] : []),
];
for (const file of required) exists(file) ? pass(`arquivo presente: ${file}`) : fail(`arquivo ausente: ${file}`);
if (process.exitCode) process.exit(process.exitCode);

const page = read("apps/storefront/app/page.tsx");
const component = read("apps/storefront/components/home-figma-v14.tsx");
const css = read("apps/storefront/app/globals.css");

page.includes("HomeFigmaV14") ? pass("home aponta para HomeFigmaV14") : fail("page.tsx não aponta para HomeFigmaV14");
component.includes("function HeartIcon") ? pass("ícone vetorial de coração presente") : fail("ícone de coração ausente");
component.includes("function BagIcon") ? pass("ícone vetorial de sacola presente") : fail("ícone de sacola ausente");
component.includes("function StarIcon") ? pass("estrelas vetoriais presentes") : fail("estrelas vetoriais ausentes");
component.includes("function SocialIcon") ? pass("ícones sociais substituem placeholders textuais") : fail("ícones sociais ausentes");
!component.includes("fi-tr-circle-user") && !component.includes("fi-tr-shopping-basket") ? pass("header não depende mais dos glifos antigos") : fail("glifos antigos ainda presentes no header");

const cssChecks = [
  ["canvas Figma preservado", ".f13-stage { position: relative; width: 1440px; height: 5230px;"],
  ["badge 18px", "font-size: 18px;\n  line-height: 22px;"],
  ["seta hero 28px", "width: 28px;\n  height: 28px;"],
  ["estrelas amarelas", "color: #ffc800;"],
  ["estrela 20×19", "width: 20px;\n  height: 19px;"],
  ["preço showcase 96px", "font-size: 96px;\n  line-height: 114px;"],
  ["ícones sociais SVG", ".f13-footer-social svg"],
  ["heart showcase", ".f13-showcase-actions button .f14-icon-svg"],
];
for (const [label, needle] of cssChecks) css.includes(needle) ? pass(label) : fail(label);

const dangerous = ["figma.com/api/mcp/asset/", "dangerouslySetInnerHTML", "javascript:"];
for (const token of dangerous) {
  !component.includes(token) && !css.includes(token) ? pass(`sem padrão inseguro/temporário: ${token}`) : fail(`padrão não permitido encontrado: ${token}`);
}

if (!staticOnly) {
  const assetRefs = [...component.matchAll(/src="(\/[^"]+)"/g)].map((m) => m[1]);
  for (const asset of [...new Set(assetRefs)]) {
    const local = path.join(root, "apps/storefront/public", asset.slice(1));
    fs.existsSync(local) && fs.statSync(local).size > 0 ? pass(`asset presente: ${asset}`) : fail(`asset ausente: ${asset}`);
  }
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

if (!process.exitCode) console.log("\nLaVic storefront v1.4 validado.");
