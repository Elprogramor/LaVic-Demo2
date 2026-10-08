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
  "apps/storefront/public/hero/lime/bottle.webp",
  "apps/storefront/public/hero/lime/lime-whole-01.webp",
  "apps/storefront/public/hero/lime/lime-wedge-01.webp",
  "apps/storefront/public/hero/lime/lime-wedge-02.webp",
  "apps/storefront/public/hero/lime/leaf-01.webp",
  "apps/storefront/public/hero/lime/leaf-02.webp",
  "apps/storefront/public/hero/lime/leaf-03.webp",
  "apps/storefront/public/hero/lime/splash-lime.svg",
  "apps/storefront/public/hero/strawberry/bottle.webp",
  "apps/storefront/public/hero/strawberry/strawberry-01.webp",
  "apps/storefront/public/hero/strawberry/strawberry-02.webp",
  "apps/storefront/public/hero/strawberry/strawberry-03.webp",
  "apps/storefront/public/hero/strawberry/leaf-01.webp",
  "apps/storefront/public/hero/strawberry/leaf-02.webp",
  "apps/storefront/public/hero/strawberry/leaf-03.webp",
  "apps/storefront/public/hero/strawberry/splash-strawberry.svg",
  "apps/storefront/public/hero/sparkling/bottle.webp",
  "apps/storefront/public/hero/sparkling/pitaya-01.webp",
  "apps/storefront/public/hero/sparkling/pitaya-02.webp",
  "apps/storefront/public/hero/sparkling/grapes-cluster-01.svg",
  "apps/storefront/public/hero/sparkling/grape-01.svg",
  "apps/storefront/public/hero/sparkling/leaf-01.webp",
  "apps/storefront/public/hero/sparkling/leaf-02.webp",
  "apps/storefront/public/hero/sparkling/petal-01.svg",
  "apps/storefront/public/hero/sparkling/splash-sparkling.svg"
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) fail(`arquivo obrigatório ausente: ${file}`);
}
if (!failed) ok("estrutura crítica e asset pack independente presentes");

const sourceFiles = walk(storefront).filter((file) => [".ts", ".tsx", ".css", ".mjs", ".json"].includes(path.extname(file)));
const sourceText = sourceFiles.map((file) => [file, fs.readFileSync(file, "utf8")]);

const forbiddenSecrets = ["DATABASE_URL", "REDIS_URL", "ADMIN_SESSION_SECRET", "API_KEY", "PRIVATE_KEY", "ACCESS_TOKEN", "PASSWORD="];
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

const heroDir = path.join(publicDir, "hero");
for (const file of walk(heroDir)) {
  const stat = fs.statSync(file);
  if (stat.size > 700 * 1024) fail(`asset do hero acima de 700 KB: ${path.relative(root, file)} (${Math.round(stat.size / 1024)} KB)`);
  if (file.endsWith(".svg")) {
    const svg = fs.readFileSync(file, "utf8");
    if (/<script\b/i.test(svg) || /(?:href|xlink:href)=["']https?:/i.test(svg)) {
      fail(`SVG do hero contém script ou recurso externo: ${path.relative(root, file)}`);
    }
  }
}
if (!failed) ok("assets do hero dentro do orçamento e SVGs sem conteúdo externo executável");

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
}
for (const label of ["LIMÃO", "MORANGO", "ESPUMANTE"]) {
  if (!heroSource.includes(`backdropLabel: "${label}"`)) fail(`backdrop ${label} ausente`);
}
if (!heroSource.includes('href: "/sabores#espumante"')) fail("CTA do Espumante não aponta para /sabores#espumante");

const artSrcs = [...heroSource.matchAll(/\bsrc:\s*["']([^"']+)["']/g)].map((match) => match[1]);
if (artSrcs.length < 20) fail(`asset pack visual pequeno demais para v0.3.3: ${artSrcs.length} assets`);
const duplicatedSrcs = artSrcs.filter((src, index) => artSrcs.indexOf(src) !== index);
if (duplicatedSrcs.length) fail(`um mesmo arquivo visual está sendo reutilizado como múltiplos objetos: ${[...new Set(duplicatedSrcs)].join(", ")}`);
if (/(ingredient\.webp|fruit-scene\.webp|foreground\.webp)/.test(heroSource)) {
  fail("hero ainda referencia composites antigos em vez de assets independentes");
}
if (!failed) ok("cada objeto visual do hero usa arquivo independente, sem composites antigos");

if (!heroComponent.includes("slide.assets.map")) fail("Hero não renderiza o asset pack por objeto");
if (!heroComponent.includes("hero-carousel__backdrop-word")) fail("palavra editorial gigante ausente");
if ((heroComponent.match(/hero-carousel__edge-arrow/g) || []).length < 2) fail("setas laterais do hero ausentes");
if (!heroComponent.includes("--hero-near-x") || !heroComponent.includes("--hero-far-x")) fail("parallax em profundidade ausente");

const opens = (css.match(/\{/g) || []).length;
const closes = (css.match(/\}/g) || []).length;
if (opens !== closes) fail(`CSS com chaves desbalanceadas: ${opens} aberturas / ${closes} fechamentos`);
else ok("CSS com chaves balanceadas");

if (!/\.hero-carousel__headline\s*\{[\s\S]*?color:\s*var\(--hero-accent-strong\)/m.test(css)) {
  fail('headline "Viva com gás." não troca integralmente de cor por tema');
}
if (!css.includes("hero-carousel__asset--lime-wedge-02") || !css.includes("filter: blur(9px)")) {
  fail("foreground desfocado do Limão ausente");
}
if (!css.includes("hero-carousel__asset--strawberry-03") || !css.includes("blur(11px)")) {
  fail("foreground desfocado do Morango ausente");
}
if (!css.includes("hero-carousel__asset--sparkling-pitaya-02") || !css.includes("blur(8px)")) {
  fail("foreground desfocado do Espumante ausente");
}
if (!failed) ok("headline temática, profundidade e foreground blur auditados");

const allowedIcons = new Set(["arrow-right", "shopping-basket"]);
for (const [, content] of sourceText.filter(([file]) => file.endsWith(".tsx"))) {
  for (const match of content.matchAll(/fi-tr-([a-z0-9-]+)/g)) {
    if (!allowedIcons.has(match[1])) fail(`ícone Flaticon não auditado: fi-tr-${match[1]}`);
  }
}

if (failed) process.exit(1);
console.log("\nLaVic storefront v0.3.3: validação estática concluída sem falhas.");
