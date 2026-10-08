import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const root = process.cwd();
let failed = false;
const pass = (message) => console.log(`PASS: ${message}`);
const fail = (message) => { failed = true; console.error(`FAIL: ${message}`); };

const required = [
  "package.json",
  "apps/storefront/package.json",
  "apps/storefront/app/layout.tsx",
  "apps/storefront/app/page.tsx",
  "apps/storefront/styles/tokens.css",
  "apps/storefront/styles/base.css",
  "apps/storefront/styles/components.css",
  "apps/storefront/styles/pages.css",
  "apps/storefront/components/sections/home-page.tsx",
  "apps/storefront/components/layout/site-header.tsx",
  "apps/storefront/components/layout/site-footer.tsx",
  "apps/storefront/components/commerce/cart-provider.tsx",
  "apps/storefront/app/sabores/page.tsx",
  "apps/storefront/app/kits/page.tsx",
  "apps/storefront/app/revenda/page.tsx",
  "apps/storefront/app/sobre/page.tsx",
  "apps/storefront/app/carrinho/page.tsx",
  "apps/storefront/app/checkout/page.tsx",
  "apps/storefront/app/encomendas/page.tsx",
  "apps/storefront/app/produto/[slug]/page.tsx",
  "apps/admin/app/layout.tsx",
  "apps/admin/app/page.tsx",
  "docs/admin-preserved-sha256.txt",
];

for (const rel of required) {
  const p = path.join(root, rel);
  if (!fs.existsSync(p) || !fs.statSync(p).isFile() || fs.statSync(p).size === 0) fail(`${rel} ausente ou vazio`);
  else pass(`${rel} presente`);
}

const storefrontRoot = path.join(root, "apps/storefront");
const sourceFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else sourceFiles.push(full);
  }
}
walk(storefrontRoot);

const textFiles = sourceFiles.filter((file) => /\.(ts|tsx|css|json|md)$/.test(file));
const legacyPatterns = [/home-figma-v\d+/i, /f13-/, /f14-/, /f16-/, /f17-/, /v1\.\d+ override/i];
for (const file of textFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of legacyPatterns) {
    if (pattern.test(source)) fail(`legado detectado em ${path.relative(root, file)}: ${pattern}`);
  }
}
if (!failed) pass("storefront sem nomenclaturas legadas v1.x/f13/f14/f16/f17");

const cssFiles = sourceFiles.filter((file) => file.endsWith(".css"));
for (const file of cssFiles) {
  const source = fs.readFileSync(file, "utf8");
  const opens = (source.match(/{/g) ?? []).length;
  const closes = (source.match(/}/g) ?? []).length;
  if (opens !== closes) fail(`${path.relative(root, file)} com CSS desbalanceado (${opens}/${closes})`);
}
pass("checagem estrutural de CSS concluída");

const manifestPath = path.join(root, "docs/admin-preserved-sha256.txt");
if (fs.existsSync(manifestPath)) {
  const rows = fs.readFileSync(manifestPath, "utf8").trim().split(/\r?\n/).filter(Boolean);
  for (const row of rows) {
    const [expected, ...rest] = row.split(/\s+/);
    const rel = rest.join(" ");
    const file = path.join(root, "apps/admin", rel);
    if (!fs.existsSync(file)) { fail(`admin preservado ausente: ${rel}`); continue; }
    const actual = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
    if (actual !== expected) fail(`admin alterado: ${rel}`);
  }
  if (!failed) pass(`admin preservado validado por SHA-256 (${rows.length} arquivos-fonte)`);
}

const forbiddenSecrets = [/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/, /sk-[A-Za-z0-9]{20,}/, /DATABASE_URL\s*=\s*[^\s]+/];
for (const file of textFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const pattern of forbiddenSecrets) {
    if (pattern.test(source)) fail(`possível segredo detectado em ${path.relative(root, file)}`);
  }
}
if (!failed) pass("nenhum segredo óbvio detectado no storefront");

const routes = ["sabores", "kits", "revenda", "sobre", "carrinho", "checkout", "encomendas"];
for (const route of routes) {
  const p = path.join(root, "apps/storefront/app", route, "page.tsx");
  if (!fs.existsSync(p)) fail(`rota pública ausente: /${route}`);
}
if (fs.existsSync(path.join(root, "apps/storefront/app/produto/[slug]/page.tsx"))) pass("rota dinâmica de produto presente");

if (failed) process.exit(1);
console.log("\nVALIDAÇÃO V3 CLEAN: PASS");
