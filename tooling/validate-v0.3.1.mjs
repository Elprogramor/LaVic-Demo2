import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const storefront = path.join(root, "apps/storefront");
const publicDir = path.join(storefront, "public");
let failed = false;

function fail(message) {
  console.error(`FAIL: ${message}`);
  failed = true;
}

function ok(message) {
  console.log(`OK: ${message}`);
}

function walk(dir, result = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", "dist"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, result);
    else result.push(full);
  }
  return result;
}

const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/app/sabores/page.tsx",
  "apps/storefront/components/site-header.tsx",
  "apps/storefront/components/site-loader.tsx",
  "apps/storefront/components/hero.tsx",
  "apps/storefront/content/hero-slides.ts",
  "apps/storefront/content/home.ts",
  "apps/storefront/public/hero/lime/bottle.webp",
  "apps/storefront/public/hero/lime/ingredient.webp",
  "apps/storefront/public/hero/strawberry/bottle.webp",
  "apps/storefront/public/hero/strawberry/ingredient.webp",
  "apps/storefront/public/hero/sparkling/bottle.webp",
  "apps/storefront/public/hero/sparkling/fruit-scene.webp",
  "apps/storefront/public/hero/sparkling/foreground.webp"
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`arquivo obrigatório ausente: ${file}`);
}
if (!failed) ok("estrutura crítica e assets do Hero Carousel presentes");

const sourceFiles = walk(storefront).filter((file) => [".ts", ".tsx", ".css", ".mjs", ".json"].includes(path.extname(file)));
const sourceText = sourceFiles.map((file) => [file, fs.readFileSync(file, "utf8")]);

const forbiddenSecrets = [
  "DATABASE_URL",
  "REDIS_URL",
  "ADMIN_SESSION_SECRET",
  "API_KEY",
  "PRIVATE_KEY",
  "ACCESS_TOKEN",
  "PASSWORD="
];

for (const [file, content] of sourceText) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  for (const token of forbiddenSecrets) {
    if (content.includes(token)) fail(`possível segredo/referência server-only no frontend (${token}): ${rel}`);
  }
  if (/console\.(log|debug)\s*\(/.test(content)) fail(`console de debug no storefront: ${rel}`);
  if (/\b(?:lorem ipsum|TODO|FIXME)\b/i.test(content)) fail(`texto provisório encontrado: ${rel}`);
  if (content.includes("dangerouslySetInnerHTML") && !rel.endsWith("components/structured-data.tsx")) {
    fail(`dangerouslySetInnerHTML fora do JSON-LD permitido: ${rel}`);
  }
}
if (!failed) ok("frontend sem segredo óbvio, debug ou HTML inseguro");

const allowedPublicEnv = new Set(["NEXT_PUBLIC_SITE_URL"]);
for (const [file, content] of sourceText) {
  for (const match of content.matchAll(/NEXT_PUBLIC_[A-Z0-9_]+/g)) {
    if (!allowedPublicEnv.has(match[0])) fail(`variável pública não autorizada no frontend: ${match[0]} em ${path.relative(root, file)}`);
  }
}

const assetPattern = /["'`](\/(?:brand|demo|hero)\/[A-Za-z0-9_./-]+\.(?:png|jpg|jpeg|webp|svg))["'`]/g;
const missingAssets = new Set();
for (const [, content] of sourceText) {
  for (const match of content.matchAll(assetPattern)) {
    const diskPath = path.join(publicDir, match[1].slice(1));
    if (!fs.existsSync(diskPath)) missingAssets.add(match[1]);
  }
}
for (const asset of missingAssets) fail(`asset referenciado não existe: ${asset}`);
if (missingAssets.size === 0) ok("assets estáticos referenciados existem");

const heroAssetDir = path.join(publicDir, "hero");
for (const file of walk(heroAssetDir)) {
  const size = fs.statSync(file).size;
  if (size > 700 * 1024) fail(`asset do hero acima de 700 KB: ${path.relative(root, file)} (${Math.round(size / 1024)} KB)`);
}
if (!failed) ok("assets do hero dentro do orçamento individual de 700 KB");

if (process.env.LAVIC_SKIP_MEDIA_CHECK !== "1") {
  for (const media of ["media/lavic-loader.webm", "media/lavic-loader.mp4"]) {
    if (!fs.existsSync(path.join(publicDir, media))) fail(`mídia do loader ausente: /${media}`);
  }
} else {
  console.warn("WARN: checagem dos vídeos do loader ignorada por LAVIC_SKIP_MEDIA_CHECK=1");
}

const staticRoutes = new Set(["/", "/sabores", "/kits", "/encomendas", "/revenda", "/sobre", "/carrinho", "/checkout"]);
const productsSource = fs.readFileSync(path.join(storefront, "data/mocks/products.ts"), "utf8");
const productSlugs = new Set([...productsSource.matchAll(/slug:\s*["']([^"']+)["']/g)].map((match) => match[1]));
const hrefPattern = /href=(?:\{)?["'](\/[^"']*)["'](?:\})?/g;
for (const [file, content] of sourceText.filter(([file]) => file.endsWith(".tsx"))) {
  for (const match of content.matchAll(hrefPattern)) {
    const rawHref = match[1];
    const href = rawHref.split(/[?#]/, 1)[0] || "/";
    if (staticRoutes.has(href)) continue;
    if (href.startsWith("/produto/") && productSlugs.has(href.slice("/produto/".length))) continue;
    fail(`rota interna estática sem destino conhecido (${rawHref}): ${path.relative(root, file)}`);
  }
}

const heroSource = fs.readFileSync(path.join(storefront, "content/hero-slides.ts"), "utf8");
const heroIds = [...heroSource.matchAll(/\bid:\s*["']([^"']+)["']/g)].map((match) => match[1]);
if (heroIds.length !== 3) fail(`Hero Carousel deve conter exatamente 3 slides nesta versão; encontrados: ${heroIds.length}`);
if (new Set(heroIds).size !== heroIds.length) fail("Hero Carousel contém ids duplicados");
if (!heroSource.includes('href: "/sabores#espumante"')) fail("CTA do Espumante não aponta para /sabores#espumante");
if (!failed) ok("contrato dos 3 slides e CTA do Espumante consistentes");

const css = fs.readFileSync(path.join(storefront, "app/globals.css"), "utf8");
const opens = (css.match(/\{/g) || []).length;
const closes = (css.match(/\}/g) || []).length;
if (opens !== closes) fail(`CSS com chaves desbalanceadas: ${opens} aberturas / ${closes} fechamentos`);
else ok("CSS com chaves balanceadas");

const allowedIcons = new Set(["arrow-right", "shopping-basket"]);
for (const [, content] of sourceText.filter(([file]) => file.endsWith(".tsx"))) {
  for (const match of content.matchAll(/fi-tr-([a-z0-9-]+)/g)) {
    if (!allowedIcons.has(match[1])) fail(`ícone Flaticon não auditado: fi-tr-${match[1]}`);
  }
}
if (!failed) ok("rotas, assets e ícones auditados");

if (failed) process.exit(1);
console.log("\nLaVic storefront v0.3.1: validação estática concluída sem falhas.");
