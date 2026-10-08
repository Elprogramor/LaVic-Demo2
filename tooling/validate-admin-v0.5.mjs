import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
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
  "apps/admin/components/marketing-subnav.tsx",
  "apps/admin/components/store-subnav.tsx",
  "apps/admin/components/coupons-view.tsx",
  "apps/admin/components/promotions-view.tsx",
  "apps/admin/components/campaigns-view.tsx",
  "apps/admin/components/marketing-performance-view.tsx",
  "apps/admin/components/store-home-view.tsx",
  "apps/admin/components/store-banners-view.tsx",
  "apps/admin/components/store-highlights-view.tsx",
  "apps/admin/components/store-flavors-view.tsx",
  "apps/admin/components/store-content-view.tsx",
  "apps/admin/components/store-seo-view.tsx",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/types.ts",
  "apps/admin/lib/permissions.ts",
  "apps/admin/app/styles.css",
  "docs/ADMIN_MARKETING_STORE_V0_5.md",
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
  "apps/admin/app/b2b/page.tsx",
  "apps/admin/app/b2b/leads/page.tsx",
  "apps/admin/app/b2b/customers/page.tsx",
  "apps/admin/app/b2b/orders/page.tsx",
  "apps/admin/app/b2b/pricing/page.tsx",
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
walk("docs/ADMIN_MARKETING_STORE_V0_5.md");

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
  for (const route of ["/marketing", "/store"]) if (!source.includes(`href: "${route}"`)) errors.push(`Sidebar não referencia: ${route}`);
  for (const marker of ["couponResults", "campaignResults", "bannerResults"]) if (!source.includes(marker)) errors.push(`Busca global v0.5 incompleta: ${marker}`);
}

const mockPath = path.join(root, "apps/admin/data/mock-admin.ts");
if (fs.existsSync(mockPath)) {
  const source = fs.readFileSync(mockPath, "utf8");
  for (const exportName of ["marketingCoupons", "marketingPromotions", "marketingCampaigns", "storeSections", "storeBanners", "storeFlavors", "storeContentBlocks", "storeSeoPages"]) {
    if (!source.includes(`export const ${exportName}`)) errors.push(`Mock v0.5 ausente: ${exportName}`);
  }
  if (!source.includes('demo: true')) errors.push("Sabores de demonstração não estão explicitamente marcados como DEMO.");
  if (!source.includes('status: "draft", productId: "p5"') || !source.includes('status: "draft", productId: "p6"')) warnings.push("Revise se todos os sabores conceituais continuam em rascunho.");
}

const typesPath = path.join(root, "apps/admin/lib/types.ts");
if (fs.existsSync(typesPath)) {
  const source = fs.readFileSync(typesPath, "utf8");
  for (const marker of ["MarketingCoupon", "MarketingPromotion", "MarketingCampaign", "StoreSection", "StoreBanner", "StoreFlavor", "StoreSeoPage", '"marketing.write"', '"content.write"']) {
    if (!source.includes(marker)) errors.push(`Contrato v0.5 incompleto: ${marker}`);
  }
}

const permissionsPath = path.join(root, "apps/admin/lib/permissions.ts");
if (fs.existsSync(permissionsPath)) {
  const source = fs.readFileSync(permissionsPath, "utf8");
  for (const permission of ["marketing.read", "marketing.write", "content.read", "content.write"]) if (!source.includes(`"${permission}"`)) errors.push(`Permissão ausente: ${permission}`);
}

const stylesPath = path.join(root, "apps/admin/app/styles.css");
if (fs.existsSync(stylesPath)) {
  const css = fs.readFileSync(stylesPath, "utf8");
  for (const token of [".marketing-overview-grid", ".promotion-grid", ".marketing-performance-grid", ".store-editor-layout", ".banner-admin-grid", ".seo-table", "@media (max-width: 680px)"]) {
    if (!css.includes(token)) errors.push(`CSS v0.5 incompleto: ${token}`);
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
  if (packageJson.scripts?.["validate:admin:v0.5"] !== "node tooling/validate-admin-v0.5.mjs") errors.push("Script validate:admin:v0.5 ausente ou alterado.");
}

if (errors.length) {
  console.error("\nLaVic Admin v0.5 — validação falhou:\n");
  for (const error of errors) console.error(`  ✗ ${error}`);
  if (warnings.length) { console.error("\nAvisos:"); for (const warning of warnings) console.error(`  ! ${warning}`); }
  process.exit(1);
}
console.log("\nLaVic Admin v0.5 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos de Marketing/Loja verificados`);
console.log(`  ✓ ${regressionFiles.length} rotas anteriores preservadas`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ Marketing, cupons, promoções, campanhas e performance conectados");
console.log("  ✓ Loja, destaques, banners, sabores, conteúdo e SEO conectados");
console.log("  ✓ busca global e permissões v0.5 verificadas");
console.log("  ✓ imports relativos, CSS e padrões de segurança verificados");
if (warnings.length) { console.log("\nAvisos não bloqueantes:"); for (const warning of warnings) console.log(`  ! ${warning}`); }
