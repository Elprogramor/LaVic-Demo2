import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

const required = [
  "apps/admin/app/team/page.tsx",
  "apps/admin/app/team/roles/page.tsx",
  "apps/admin/app/team/sessions/page.tsx",
  "apps/admin/app/team/audit/page.tsx",
  "apps/admin/app/settings/security/page.tsx",
  "apps/admin/components/team-subnav.tsx",
  "apps/admin/components/team-status.tsx",
  "apps/admin/components/team-users-view.tsx",
  "apps/admin/components/team-sessions-view.tsx",
  "apps/admin/components/audit-log-view.tsx",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/components/icon.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/types.ts",
  "apps/admin/lib/permissions.ts",
  "apps/admin/app/styles.css",
  "docs/ADMIN_GOVERNANCE_V0_7.md",
];

const regressionFiles = [
  "apps/admin/app/page.tsx",
  "apps/admin/app/orders/page.tsx",
  "apps/admin/app/orders/[id]/page.tsx",
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
  "apps/admin/app/b2b/page.tsx",
  "apps/admin/app/b2b/leads/page.tsx",
  "apps/admin/app/b2b/leads/[id]/page.tsx",
  "apps/admin/app/b2b/customers/page.tsx",
  "apps/admin/app/b2b/customers/[id]/page.tsx",
  "apps/admin/app/b2b/orders/page.tsx",
  "apps/admin/app/b2b/pricing/page.tsx",
  "apps/admin/app/marketing/page.tsx",
  "apps/admin/app/marketing/coupons/page.tsx",
  "apps/admin/app/marketing/promotions/page.tsx",
  "apps/admin/app/marketing/campaigns/page.tsx",
  "apps/admin/app/marketing/performance/page.tsx",
  "apps/admin/app/store/page.tsx",
  "apps/admin/app/store/highlights/page.tsx",
  "apps/admin/app/store/banners/page.tsx",
  "apps/admin/app/store/flavors/page.tsx",
  "apps/admin/app/store/content/page.tsx",
  "apps/admin/app/store/seo/page.tsx",
  "apps/admin/app/finance/page.tsx",
  "apps/admin/app/finance/receivables/page.tsx",
  "apps/admin/app/finance/refunds/page.tsx",
  "apps/admin/app/finance/reconciliation/page.tsx",
  "apps/admin/app/reports/page.tsx",
  "apps/admin/app/reports/sales/page.tsx",
  "apps/admin/app/reports/products/page.tsx",
  "apps/admin/app/reports/customers/page.tsx",
  "apps/admin/app/reports/inventory/page.tsx",
  "apps/admin/app/reports/marketing/page.tsx",
  "apps/admin/app/reports/b2b/page.tsx",
  "apps/admin/app/reports/channels/page.tsx",
];

const errors = [];
const warnings = [];
for (const file of [...required, ...regressionFiles]) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`Arquivo obrigatório ausente: ${file}`);
}

const textExtensions = new Set([".ts", ".tsx", ".css", ".md", ".json", ".mjs"]);
const files = [];
function walk(relative) {
  const absolute = path.join(root, relative);
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
walk("docs/ADMIN_GOVERNANCE_V0_7.md");

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
  const source = fs.readFileSync(shellPath, "utf8");
  for (const route of ["/team", "/settings/security"]) if (!source.includes(route)) errors.push(`Navegação não referencia: ${route}`);
  for (const marker of ["teamResults", "auditResults"]) if (!source.includes(marker)) errors.push(`Busca global v0.7 incompleta: ${marker}`);
  if (source.includes("coming-soon?module=Configura")) errors.push("Configurações ainda aponta para coming-soon em vez de Segurança.");
}

const mockPath = path.join(root, "apps/admin/data/mock-admin.ts");
if (fs.existsSync(mockPath)) {
  const source = fs.readFileSync(mockPath, "utf8");
  for (const exportName of ["teamUsers", "adminRoles", "permissionCatalog", "adminSessions", "auditEvents", "securityPolicies", "securityPosture"]) {
    if (!source.includes(`export const ${exportName}`)) errors.push(`Mock v0.7 ausente: ${exportName}`);
  }
  if (!source.includes(".example")) warnings.push("Mocks de equipe não usam domínio reservado .example; revise e-mails fictícios.");
}

const typesPath = path.join(root, "apps/admin/lib/types.ts");
if (fs.existsSync(typesPath)) {
  const source = fs.readFileSync(typesPath, "utf8");
  for (const marker of ["AdminTeamUser", "AdminRole", "AdminSession", "AdminAuditEvent", "SecurityPolicy", '"security.write"', '"audit.read"', '"sessions.revoke"']) {
    if (!source.includes(marker)) errors.push(`Contrato v0.7 incompleto: ${marker}`);
  }
}

const permissionsPath = path.join(root, "apps/admin/lib/permissions.ts");
if (fs.existsSync(permissionsPath)) {
  const source = fs.readFileSync(permissionsPath, "utf8");
  for (const permission of ["team.write", "roles.manage", "sessions.read", "sessions.revoke", "audit.read", "security.read", "security.write"]) {
    if (!source.includes(`"${permission}"`)) errors.push(`Permissão ausente no perfil demo: ${permission}`);
  }
}

const stylesPath = path.join(root, "apps/admin/app/styles.css");
if (fs.existsSync(stylesPath)) {
  const css = fs.readFileSync(stylesPath, "utf8");
  for (const token of [".governance-stats", ".role-card-grid", ".permission-matrix", ".session-list", ".audit-drawer", ".security-policy-grid", ".security-posture-panel"]) {
    if (!css.includes(token)) errors.push(`CSS v0.7 incompleto: ${token}`);
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
  if (packageJson.scripts?.["validate:admin:v0.7"] !== "node tooling/validate-admin-v0.7.mjs") errors.push("Script validate:admin:v0.7 ausente ou alterado.");
  if (packageJson.scripts?.["clean:admin:cache"] !== "node tooling/clean-admin-cache.mjs") errors.push("Hotfix de limpeza de .next não foi preservado.");
}

if (errors.length) {
  console.error("\nLaVic Admin v0.7 — validação falhou:\n");
  for (const error of errors) console.error(`  ✗ ${error}`);
  if (warnings.length) { console.error("\nAvisos:"); for (const warning of warnings) console.error(`  ! ${warning}`); }
  process.exit(1);
}
console.log("\nLaVic Admin v0.7 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos de Governança/Segurança verificados`);
console.log(`  ✓ ${regressionFiles.length} rotas anteriores preservadas`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ Equipe, RBAC, sessões, auditoria e segurança conectados");
console.log("  ✓ busca global e permissões v0.7 verificadas");
console.log("  ✓ hotfix de limpeza .next preservado");
console.log("  ✓ imports relativos, CSS e padrões de segurança verificados");
if (warnings.length) { console.log("\nAvisos não bloqueantes:"); for (const warning of warnings) console.log(`  ! ${warning}`); }
