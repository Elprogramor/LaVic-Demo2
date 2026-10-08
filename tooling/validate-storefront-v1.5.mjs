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
  "apps/storefront/app/globals.css",
  "apps/storefront/components/home-figma-v14.tsx",
  "apps/storefront/app/page.tsx",
];
for (const file of required) exists(file) ? pass(`arquivo presente: ${file}`) : fail(`arquivo ausente: ${file}`);
if (process.exitCode) process.exit(process.exitCode);

const css = read("apps/storefront/app/globals.css");
const component = read("apps/storefront/components/home-figma-v14.tsx");
const page = read("apps/storefront/app/page.tsx");

page.includes("HomeFigmaV14") ? pass("HomeFigmaV14 permanece como home ativa") : fail("home ativa inesperada");

const checks = [
  ["outline hero sem opacity global", "-webkit-text-stroke: 1.15px rgba(15, 64, 38, .30);"],
  ["hero Alexandria 600", "font-variation-settings: \"wght\" 600;"],
  ["showcase outline extra-light", "font-variation-settings: \"wght\" 200;"],
  ["showcase stroke refinado", "-webkit-text-stroke: .9px rgba(15, 64, 38, .19);"],
  ["badge 18/22", "font-size: 18px;\n  line-height: 22px;"],
  ["CTA Inter 15px", "font-family: var(--font-inter), Arial, sans-serif;\n  font-size: 15px;"],
  ["nav Alexandria 500", ".f13-nav {\n  background: #f0f0f0;"],
  ["setas com stroke 1.05", "stroke-width: 1.05;"],
  ["font synthesis desabilitado", "font-synthesis: none;"],
];
for (const [label, needle] of checks) css.includes(needle) ? pass(label) : fail(label);

const forbidden = ["figma.com/api/mcp/asset/", "dangerouslySetInnerHTML", "javascript:"];
for (const token of forbidden) {
  !css.includes(token) && !component.includes(token) ? pass(`sem padrão temporário/inseguro: ${token}`) : fail(`padrão não permitido: ${token}`);
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

if (!process.exitCode) console.log("\nLaVic storefront v1.5 validado.");
