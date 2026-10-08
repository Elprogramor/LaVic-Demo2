import crypto from "node:crypto";
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
  if (!fs.existsSync(dir)) return result;
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
  "apps/storefront/components/hero.tsx",
  "apps/storefront/content/hero-slides.ts",
  "apps/storefront/public/hero/banners/lime-desktop.webp",
  "apps/storefront/public/hero/banners/lime-mobile.webp",
  "apps/storefront/public/hero/banners/strawberry-desktop.webp",
  "apps/storefront/public/hero/banners/strawberry-mobile.webp",
  "apps/storefront/public/hero/banners/sparkling-desktop.webp",
  "apps/storefront/public/hero/banners/sparkling-mobile.webp"
];
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`arquivo obrigatório ausente: ${file}`);
}
if (!failed) ok("estrutura crítica e seis banners art-directed presentes");

const bannerFiles = required.filter((file) => file.endsWith(".webp")).map((file) => path.join(root, file));
const hashes = new Set();
for (const file of bannerFiles) {
  if (!fs.existsSync(file)) continue;
  const stat = fs.statSync(file);
  const rel = path.relative(root, file).replaceAll("\\", "/");
  if (stat.size < 70 * 1024) fail(`banner suspeitamente pequeno: ${rel} (${Math.round(stat.size / 1024)} KB)`);
  if (stat.size > 700 * 1024) fail(`banner acima de 700 KB: ${rel} (${Math.round(stat.size / 1024)} KB)`);
  const hash = crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
  if (hashes.has(hash)) fail(`banner duplicado em bytes: ${rel}`);
  hashes.add(hash);
}
if (!failed) ok("banners únicos e dentro do orçamento de peso");

const sourceFiles = walk(storefront).filter((file) => [".ts", ".tsx", ".css", ".mjs", ".json"].includes(path.extname(file)));
const sourceText = sourceFiles.map((file) => [file, fs.readFileSync(file, "utf8")]);
const forbiddenSecrets = ["DATABASE_URL", "REDIS_URL", "ADMIN_SESSION_SECRET", "PRIVATE_KEY", "SERVICE_ROLE", "PASSWORD="];
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
    if (!allowedPublicEnv.has(match[0])) fail(`variável pública não autorizada: ${match[0]} em ${path.relative(root, file)}`);
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
if (missingAssets.size === 0) ok("todos os assets referenciados existem");

if (process.env.LAVIC_SKIP_MEDIA_CHECK !== "1") {
  for (const media of ["media/lavic-loader.webm", "media/lavic-loader.mp4"]) {
    if (!fs.existsSync(path.join(publicDir, media))) fail(`mídia do loader ausente: /${media}`);
  }
} else {
  console.warn("WARN: checagem dos vídeos do loader ignorada por LAVIC_SKIP_MEDIA_CHECK=1");
}

const heroSource = fs.readFileSync(path.join(storefront, "content/hero-slides.ts"), "utf8");
const heroComponent = fs.readFileSync(path.join(storefront, "components/hero.tsx"), "utf8");
const css = fs.readFileSync(path.join(storefront, "app/globals.css"), "utf8");

for (const theme of ["lime", "strawberry", "sparkling"]) {
  if (!heroSource.includes(`theme: "${theme}"`)) fail(`slide ${theme} ausente`);
  if (!heroSource.includes(`/hero/banners/${theme}-desktop.webp`)) fail(`banner desktop ${theme} ausente no contrato`);
  if (!heroSource.includes(`/hero/banners/${theme}-mobile.webp`)) fail(`banner mobile ${theme} ausente no contrato`);
}
if (!heroSource.includes('href: "/sabores#espumante"')) fail("CTA do Espumante não aponta para /sabores#espumante");
if ((heroSource.match(/\bid:\s*"(?:lime|strawberry|sparkling)"/g) || []).length !== 3) fail("hero deve possuir exatamente três slides");

for (const obsolete of ["bottleSrc", "backdropLabel", "assets:", "HeroArtAsset"]) {
  if (heroSource.includes(obsolete)) fail(`contrato antigo ainda presente: ${obsolete}`);
}
if (heroComponent.includes("slide.assets.map") || heroComponent.includes("hero-carousel__asset--") || heroComponent.includes("hero-carousel__bottle")) {
  fail("Hero ainda usa orquestração de PNGs/objetos da v0.3.3");
}
if (!heroComponent.includes("<picture") || !heroComponent.includes("slide.banner.mobile") || !heroComponent.includes("slide.banner.desktop")) {
  fail("Hero não usa picture responsivo com banner desktop/mobile");
}
if (!heroComponent.includes("ArrowLeft") || !heroComponent.includes("ArrowRight")) fail("navegação por teclado ausente");
if (!heroComponent.includes("SWIPE_THRESHOLD")) fail("swipe mobile ausente");
if (!failed) ok("Hero simplificado para banners completos, mantendo teclado e swipe");

const opens = (css.match(/\{/g) || []).length;
const closes = (css.match(/\}/g) || []).length;
if (opens !== closes) fail(`CSS com chaves desbalanceadas: ${opens} aberturas / ${closes} fechamentos`);
else ok("CSS com chaves balanceadas");

if (!/\.hero-carousel__headline\s*\{[\s\S]*?color:\s*var\(--hero-headline\)/m.test(css)) {
  fail('headline "Viva com gás." não troca integralmente de cor por slide');
}
if (!css.includes("hero-carousel__readability")) fail("gradiente de legibilidade do banner ausente");
if (!css.includes("hero-carousel__banner-stage")) fail("stage de banner ausente");
if (/hero-carousel__asset--|hero-carousel__backdrop-word|hero-carousel__bottle\s*\{/.test(css)) {
  fail("CSS antigo de assets individuais ainda está ativo");
}
if (!failed) ok("direção de arte por banner e legibilidade auditadas");

const allowedIcons = new Set(["arrow-right", "shopping-basket"]);
for (const [, content] of sourceText.filter(([file]) => file.endsWith(".tsx"))) {
  for (const match of content.matchAll(/fi-tr-([a-z0-9-]+)/g)) {
    if (!allowedIcons.has(match[1])) fail(`ícone Flaticon não auditado: fi-tr-${match[1]}`);
  }
}

if (failed) process.exit(1);
console.log("\nLaVic storefront v0.3.4: validação estática concluída sem falhas.");
