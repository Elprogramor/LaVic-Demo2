import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "apps/admin/app/layout.tsx",
  "apps/admin/app/page.tsx",
  "apps/admin/app/orders/page.tsx",
  "apps/admin/app/orders/[id]/page.tsx",
  "apps/admin/app/products/page.tsx",
  "apps/admin/app/styles.css",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/components/orders-view.tsx",
  "apps/admin/components/products-view.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/permissions.ts",
  "docs/ADMIN_FOUNDATION_V0_1.md",
  "docs/reference/lavic-admin-max-reference.png",
];

const errors = [];
const warnings = [];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Arquivo obrigatório ausente: ${file}`);
}

const scanRoots = ["apps/admin", "docs/ADMIN_FOUNDATION_V0_1.md"];
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

for (const target of scanRoots) walk(target);

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

const stylesPath = path.join(root, "apps/admin/app/styles.css");
if (fs.existsSync(stylesPath)) {
  const css = fs.readFileSync(stylesPath, "utf8");
  for (const token of ["--green-950", "--orange-500", "--canvas", "--surface", "@media (max-width: 680px)", "prefers-reduced-motion"]) {
    if (!css.includes(token)) errors.push(`Design system incompleto: ${token} não encontrado em styles.css`);
  }
}

const shellPath = path.join(root, "apps/admin/components/admin-shell.tsx");
if (fs.existsSync(shellPath)) {
  const shell = fs.readFileSync(shellPath, "utf8");
  for (const feature of ["Ctrl", "Visão geral", "Pedidos", "Produtos", "Estoque", "Clientes", "Revenda", "Financeiro"]) {
    if (!shell.includes(feature)) warnings.push(`Shell: referência esperada não encontrada: ${feature}`);
  }
}

const refPath = path.join(root, "docs/reference/lavic-admin-max-reference.png");
if (fs.existsSync(refPath) && fs.statSync(refPath).size < 100_000) warnings.push("Imagem de referência máxima parece pequena demais; confirme o arquivo.");

if (errors.length) {
  console.error("\nLaVic Admin v0.1 — validação falhou:\n");
  for (const error of errors) console.error(`  ✗ ${error}`);
  if (warnings.length) {
    console.error("\nAvisos:");
    for (const warning of warnings) console.error(`  ! ${warning}`);
  }
  process.exit(1);
}

console.log("\nLaVic Admin v0.1 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos-base verificados`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ referência visual máxima preservada");
console.log("  ✓ sem padrões óbvios de segredo, debug ou HTML inseguro");
if (warnings.length) {
  console.log("\nAvisos não bloqueantes:");
  for (const warning of warnings) console.log(`  ! ${warning}`);
}
