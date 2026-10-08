import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "apps/admin/app/inventory/page.tsx",
  "apps/admin/app/inventory/lots/page.tsx",
  "apps/admin/app/inventory/movements/page.tsx",
  "apps/admin/app/inventory/count/page.tsx",
  "apps/admin/app/inventory/alerts/page.tsx",
  "apps/admin/components/inventory-subnav.tsx",
  "apps/admin/components/inventory-lots-view.tsx",
  "apps/admin/components/inventory-movements-view.tsx",
  "apps/admin/components/inventory-count-view.tsx",
  "apps/admin/components/inventory-alerts-view.tsx",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/types.ts",
  "apps/admin/app/styles.css",
  "docs/ADMIN_INVENTORY_V0_2.md",
  "docs/reference/lavic-admin-max-reference.png",
];

const errors = [];
const warnings = [];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Arquivo obrigatório ausente: ${file}`);
}

const textExtensions = new Set([".ts", ".tsx", ".css", ".md", ".json", ".mjs"]);
const files = [];
function walk(target) {
  const absolute = path.join(root, target);
  if (!fs.existsSync(absolute)) return;
  const stat = fs.statSync(absolute);
  if (stat.isFile()) {
    if (textExtensions.has(path.extname(absolute))) files.push(absolute);
    return;
  }
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    if (["node_modules", ".next", "dist"].includes(entry.name)) continue;
    const next = path.join(absolute, entry.name);
    if (entry.isDirectory()) walk(path.relative(root, next));
    else if (textExtensions.has(path.extname(entry.name))) files.push(next);
  }
}
walk("apps/admin");
walk("docs/ADMIN_INVENTORY_V0_2.md");

const forbiddenPatterns = [
  { label: "dangerouslySetInnerHTML", regex: /dangerouslySetInnerHTML/g },
  { label: "console.log", regex: /console\.log\s*\(/g },
  { label: "segredo em NEXT_PUBLIC", regex: /NEXT_PUBLIC_[A-Z0-9_]*(SECRET|PRIVATE|TOKEN|PASSWORD|SERVICE_ROLE)/g },
  { label: "credencial hardcoded", regex: /(sk_live_|service_role\s*[:=]|DATABASE_URL\s*=\s*["'][^"']+)/gi },
  { label: "nome pessoal proibido em mock", regex: /Guilherme|Alonso/gi },
];

for (const file of files) {
  const source = fs.readFileSync(file, "utf8");
  const relative = path.relative(root, file);
  for (const pattern of forbiddenPatterns) {
    pattern.regex.lastIndex = 0;
    if (pattern.regex.test(source)) errors.push(`${relative}: encontrado ${pattern.label}`);
  }
}

const shellPath = path.join(root, "apps/admin/components/admin-shell.tsx");
if (fs.existsSync(shellPath)) {
  const shell = fs.readFileSync(shellPath, "utf8");
  for (const route of ["/inventory", "/inventory/lots", "/inventory/movements", "/inventory/count", "/inventory/alerts"]) {
    if (!shell.includes(route)) errors.push(`Sidebar/busca não referencia rota: ${route}`);
  }
}

const mockPath = path.join(root, "apps/admin/data/mock-admin.ts");
if (fs.existsSync(mockPath)) {
  const source = fs.readFileSync(mockPath, "utf8");
  for (const exportName of ["inventoryStock", "inventoryLots", "inventoryMovements", "inventoryAlerts", "inventoryCountRows"]) {
    if (!source.includes(`export const ${exportName}`)) errors.push(`Mock de estoque ausente: ${exportName}`);
  }
  for (const marker of ["M260916", "L260918", "E260920"]) {
    if (!source.includes(marker)) warnings.push(`Lote de demonstração esperado não encontrado: ${marker}`);
  }
}

const stylesPath = path.join(root, "apps/admin/app/styles.css");
if (fs.existsSync(stylesPath)) {
  const css = fs.readFileSync(stylesPath, "utf8");
  for (const token of [".module-subnav", ".inventory-stats", ".inventory-session-card", ".inventory-alert-card", ".modal-layer", "@media (max-width: 680px)"]) {
    if (!css.includes(token)) errors.push(`CSS de estoque incompleto: ${token}`);
  }
  const opens = (css.match(/{/g) ?? []).length;
  const closes = (css.match(/}/g) ?? []).length;
  if (opens !== closes) errors.push(`styles.css com chaves desbalanceadas (${opens} abre / ${closes} fecha)`);
}

const packagePath = path.join(root, "package.json");
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  if (packageJson.scripts?.["validate:admin:v0.2"] !== "node tooling/validate-admin-v0.2.mjs") errors.push("Script validate:admin:v0.2 ausente ou alterado.");
}

if (errors.length) {
  console.error("\nLaVic Admin v0.2 — validação falhou:\n");
  for (const error of errors) console.error(`  ✗ ${error}`);
  if (warnings.length) {
    console.error("\nAvisos:");
    for (const warning of warnings) console.error(`  ! ${warning}`);
  }
  process.exit(1);
}

console.log("\nLaVic Admin v0.2 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos obrigatórios verificados`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ cinco rotas de estoque conectadas à navegação");
console.log("  ✓ lotes, movimentações, inventário e alertas presentes");
console.log("  ✓ sem padrões óbvios de segredo, debug ou HTML inseguro");
if (warnings.length) {
  console.log("\nAvisos não bloqueantes:");
  for (const warning of warnings) console.log(`  ! ${warning}`);
}
