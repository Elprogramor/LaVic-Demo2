import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "apps/admin/app/b2b/page.tsx",
  "apps/admin/app/b2b/leads/page.tsx",
  "apps/admin/app/b2b/leads/[id]/page.tsx",
  "apps/admin/app/b2b/customers/page.tsx",
  "apps/admin/app/b2b/customers/[id]/page.tsx",
  "apps/admin/app/b2b/orders/page.tsx",
  "apps/admin/app/b2b/pricing/page.tsx",
  "apps/admin/components/b2b-subnav.tsx",
  "apps/admin/components/b2b-pipeline-view.tsx",
  "apps/admin/components/b2b-leads-view.tsx",
  "apps/admin/components/b2b-new-lead-action.tsx",
  "apps/admin/components/b2b-customers-view.tsx",
  "apps/admin/components/b2b-orders-view.tsx",
  "apps/admin/components/b2b-pricing-view.tsx",
  "apps/admin/components/b2b-badge.tsx",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/types.ts",
  "apps/admin/lib/b2b.ts",
  "apps/admin/lib/permissions.ts",
  "apps/admin/app/styles.css",
  "docs/ADMIN_B2B_V0_4.md",
  "docs/reference/lavic-admin-max-reference.png",
];

const regressionFiles = [
  "apps/admin/app/page.tsx",
  "apps/admin/app/orders/page.tsx",
  "apps/admin/app/products/page.tsx",
  "apps/admin/app/inventory/page.tsx",
  "apps/admin/app/inventory/lots/page.tsx",
  "apps/admin/app/inventory/movements/page.tsx",
  "apps/admin/app/inventory/count/page.tsx",
  "apps/admin/app/inventory/alerts/page.tsx",
  "apps/admin/app/customers/page.tsx",
  "apps/admin/app/customers/segments/page.tsx",
  "apps/admin/app/customers/crm/page.tsx",
  "apps/admin/app/customers/[id]/page.tsx",
];

const errors = [];
const warnings = [];
for (const file of [...required, ...regressionFiles]) {
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
walk("docs/ADMIN_B2B_V0_4.md");

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
  for (const route of ["/b2b", "/b2b/leads", "/b2b/customers", "/b2b/orders", "/b2b/pricing"]) {
    if (!shell.includes(route)) errors.push(`Sidebar não referencia rota B2B: ${route}`);
  }
  for (const marker of ["b2bLeadResults", "b2bClientResults"]) {
    if (!shell.includes(marker)) errors.push(`Busca global B2B incompleta: ${marker}`);
  }
}

const mockPath = path.join(root, "apps/admin/data/mock-admin.ts");
if (fs.existsSync(mockPath)) {
  const source = fs.readFileSync(mockPath, "utf8");
  for (const exportName of ["b2bLeads", "b2bActivities", "b2bClients", "b2bOrders", "b2bPriceTables"]) {
    if (!source.includes(`export const ${exportName}`)) errors.push(`Mock B2B ausente: ${exportName}`);
  }
  const leadIds = [...source.matchAll(/id: "b2b-lead-(\d+)"/g)].map((match) => match[1]);
  const clientIds = [...source.matchAll(/id: "b2b-client-(\d+)"/g)].map((match) => match[1]);
  if (new Set(leadIds).size < 8) errors.push(`Esperados ao menos 8 leads B2B; encontrados ${new Set(leadIds).size}.`);
  if (new Set(clientIds).size < 4) errors.push(`Esperados ao menos 4 clientes B2B; encontrados ${new Set(clientIds).size}.`);
  for (const stage of ["new", "contact", "qualified", "proposal", "negotiation", "won", "lost"]) {
    if (!source.includes(`stage: "${stage}"`)) errors.push(`Etapa B2B demonstrativa ausente: ${stage}`);
  }
  if (!source.includes("example.com") || !source.includes("••.•••.•••/••••-••")) warnings.push("Confirme que contatos/documentos demonstrativos continuam mascarados.");
}

const typesPath = path.join(root, "apps/admin/lib/types.ts");
if (fs.existsSync(typesPath)) {
  const source = fs.readFileSync(typesPath, "utf8");
  for (const marker of ["B2BLead", "B2BClient", "B2BOrder", "B2BPriceTable", '"b2b.pricing.write"', '"b2b.orders.write"']) {
    if (!source.includes(marker)) errors.push(`Contrato B2B incompleto: ${marker}`);
  }
}

const permissionsPath = path.join(root, "apps/admin/lib/permissions.ts");
if (fs.existsSync(permissionsPath)) {
  const source = fs.readFileSync(permissionsPath, "utf8");
  for (const permission of ["b2b.read", "b2b.write", "b2b.orders.write", "b2b.pricing.read", "b2b.pricing.write"]) {
    if (!source.includes(`"${permission}"`)) errors.push(`Permissão B2B ausente: ${permission}`);
  }
}

const dashboardPath = path.join(root, "apps/admin/app/page.tsx");
if (fs.existsSync(dashboardPath) && !fs.readFileSync(dashboardPath, "utf8").includes(': "/b2b"')) errors.push("Alerta B2B da Dashboard não aponta para o pipeline.");

const stylesPath = path.join(root, "apps/admin/app/styles.css");
if (fs.existsSync(stylesPath)) {
  const css = fs.readFileSync(stylesPath, "utf8");
  for (const token of [".b2b-pipeline", ".b2b-lead-card", ".b2b-badge", ".b2b-detail-layout", ".b2b-pricing-layout", ".b2b-lead-modal", "@media (max-width: 680px)"]) {
    if (!css.includes(token)) errors.push(`CSS B2B incompleto: ${token}`);
  }
  const opens = (css.match(/{/g) ?? []).length;
  const closes = (css.match(/}/g) ?? []).length;
  if (opens !== closes) errors.push(`styles.css com chaves desbalanceadas (${opens} abre / ${closes} fecha)`);
}

for (const file of files.filter((item) => [".ts", ".tsx"].includes(path.extname(item)))) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/from\s+["'](\.{1,2}\/[^"']+)["']/g)) {
    const spec = match[1];
    const base = path.resolve(path.dirname(file), spec);
    const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
    if (!candidates.some((candidate) => fs.existsSync(candidate))) errors.push(`${path.relative(root, file)}: import relativo sem destino: ${spec}`);
  }
}

const packagePath = path.join(root, "package.json");
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));
  if (packageJson.scripts?.["validate:admin:v0.4"] !== "node tooling/validate-admin-v0.4.mjs") errors.push("Script validate:admin:v0.4 ausente ou alterado.");
}

if (errors.length) {
  console.error("\nLaVic Admin v0.4 — validação falhou:\n");
  for (const error of errors) console.error(`  ✗ ${error}`);
  if (warnings.length) { console.error("\nAvisos:"); for (const warning of warnings) console.error(`  ! ${warning}`); }
  process.exit(1);
}
console.log("\nLaVic Admin v0.4 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos do módulo B2B verificados`);
console.log(`  ✓ ${regressionFiles.length} rotas anteriores preservadas`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ pipeline, leads, parceiros, pedidos e tabelas comerciais conectados");
console.log("  ✓ busca global e Dashboard integradas ao B2B");
console.log("  ✓ permissões B2B granulares presentes");
console.log("  ✓ imports relativos, CSS e padrões de segurança verificados");
if (warnings.length) { console.log("\nAvisos não bloqueantes:"); for (const warning of warnings) console.log(`  ! ${warning}`); }
