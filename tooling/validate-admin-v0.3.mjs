import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "apps/admin/app/customers/page.tsx",
  "apps/admin/app/customers/segments/page.tsx",
  "apps/admin/app/customers/crm/page.tsx",
  "apps/admin/app/customers/[id]/page.tsx",
  "apps/admin/components/customers-subnav.tsx",
  "apps/admin/components/customers-view.tsx",
  "apps/admin/components/customer-segments-view.tsx",
  "apps/admin/components/customer-crm-view.tsx",
  "apps/admin/components/customer-note-composer.tsx",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/types.ts",
  "apps/admin/lib/permissions.ts",
  "apps/admin/app/styles.css",
  "docs/ADMIN_CUSTOMERS_CRM_V0_3.md",
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
walk("docs/ADMIN_CUSTOMERS_CRM_V0_3.md");

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
  for (const route of ["/customers", "/customers/segments", "/customers/crm"]) {
    if (!shell.includes(route)) errors.push(`Sidebar/busca não referencia rota: ${route}`);
  }
  if (!shell.includes("customerResults")) errors.push("Busca global não inclui clientes.");
}

const mockPath = path.join(root, "apps/admin/data/mock-admin.ts");
if (fs.existsSync(mockPath)) {
  const source = fs.readFileSync(mockPath, "utf8");
  for (const exportName of ["customers", "customerSegments", "customerInteractions"]) {
    if (!source.includes(`export const ${exportName}`)) errors.push(`Mock de clientes ausente: ${exportName}`);
  }
  const customerIds = [...source.matchAll(/id: "customer-(\d+)"/g)].map((match) => match[1]);
  if (new Set(customerIds).size < 21) errors.push(`Base demonstrativa esperava ao menos 21 clientes únicos; encontrados ${new Set(customerIds).size}.`);
  for (const marker of ["vip", "recurrent", "at_risk", "inactive", "b2b_potential"]) {
    if (!source.includes(`"${marker}"`)) errors.push(`Segmento obrigatório ausente: ${marker}`);
  }
}

const typesPath = path.join(root, "apps/admin/lib/types.ts");
if (fs.existsSync(typesPath)) {
  const source = fs.readFileSync(typesPath, "utf8");
  for (const marker of ["AdminCustomer", "CustomerInteraction", "CustomerSegmentDefinition", '"customers.write"']) {
    if (!source.includes(marker)) errors.push(`Contrato de clientes incompleto: ${marker}`);
  }
}

const permissionsPath = path.join(root, "apps/admin/lib/permissions.ts");
if (fs.existsSync(permissionsPath)) {
  const source = fs.readFileSync(permissionsPath, "utf8");
  for (const permission of ["customers.read", "customers.write"]) {
    if (!source.includes(`"${permission}"`)) errors.push(`Permissão ausente: ${permission}`);
  }
}

const orderDetailPath = path.join(root, "apps/admin/app/orders/[id]/page.tsx");
if (fs.existsSync(orderDetailPath)) {
  const source = fs.readFileSync(orderDetailPath, "utf8");
  if (!source.includes("customerProfile") || !source.includes("/customers/${customerProfile.id}")) errors.push("Detalhe do pedido não está integrado ao perfil do cliente.");
}

const stylesPath = path.join(root, "apps/admin/app/styles.css");
if (fs.existsSync(stylesPath)) {
  const css = fs.readFileSync(stylesPath, "utf8");
  for (const token of [".customer-stats", ".customer-segments-grid", ".crm-layout", ".customer-profile-header", ".customer-detail-layout", ".customer-note-compose", "@media (max-width: 680px)"]) {
    if (!css.includes(token)) errors.push(`CSS de Clientes/CRM incompleto: ${token}`);
  }
  const opens = (css.match(/{/g) ?? []).length;
  const closes = (css.match(/}/g) ?? []).length;
  if (opens !== closes) errors.push(`styles.css com chaves desbalanceadas (${opens} abre / ${closes} fecha)`);
}

// Verify relative TS/TSX imports point to a real file when they target this workspace.
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
  if (packageJson.scripts?.["validate:admin:v0.3"] !== "node tooling/validate-admin-v0.3.mjs") errors.push("Script validate:admin:v0.3 ausente ou alterado.");
}

if (errors.length) {
  console.error("\nLaVic Admin v0.3 — validação falhou:\n");
  for (const error of errors) console.error(`  ✗ ${error}`);
  if (warnings.length) {
    console.error("\nAvisos:");
    for (const warning of warnings) console.error(`  ! ${warning}`);
  }
  process.exit(1);
}

console.log("\nLaVic Admin v0.3 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos de Clientes/CRM verificados`);
console.log(`  ✓ ${regressionFiles.length} rotas anteriores preservadas`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ Clientes, segmentos, CRM e perfil 360º conectados");
console.log("  ✓ busca global e detalhe de pedido integrados ao CRM");
console.log("  ✓ customers.read / customers.write presentes");
console.log("  ✓ imports relativos, CSS e padrões de segurança verificados");
if (warnings.length) {
  console.log("\nAvisos não bloqueantes:");
  for (const warning of warnings) console.log(`  ! ${warning}`);
}
