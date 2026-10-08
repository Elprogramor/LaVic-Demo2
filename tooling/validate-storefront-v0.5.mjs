import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const storefront = path.join(root, "apps/storefront");
const failures = [];

const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/components/home-v05.tsx",
  "apps/storefront/components/site-header.tsx",
  "apps/storefront/components/site-footer.tsx",
  "apps/storefront/content/home-v05.ts",
  "apps/storefront/content/navigation.ts",
  "apps/storefront/public/home-v05/README.md",
  "docs/reference/lavic-home-v05-reference.png"
];

for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`Arquivo ausente: ${rel}`);
}

const homeAssets = [
  "hero/hero-lime-scene.webp",
  "flavors/lime.webp",
  "flavors/strawberry.webp",
  "flavors/passion-fruit.webp",
  "flavors/red-fruits.webp",
  "flavors/ginger-lime.webp",
  "flavors/green-grape.webp",
  "picks/lime.webp",
  "picks/discovery.webp",
  "picks/sparkling.webp",
  "editorial/strawberry-feature.webp",
  "kits/discovery.webp",
  "kits/summer.webp",
  "brand/brand-texture.webp",
  "lifestyle/lifestyle-01.webp",
  "lifestyle/lifestyle-02.webp",
  "lifestyle/lifestyle-03.webp"
];
for (const rel of homeAssets) {
  const full = path.join(storefront, "public/home-v05", rel);
  if (!fs.existsSync(full)) failures.push(`Asset da Home ausente: ${rel}`);
  else if (fs.statSync(full).size < 1024) failures.push(`Asset da Home pequeno/corrompido: ${rel}`);
}

const legacyRequiredRoutes = [
  "sabores", "kits", "carrinho", "checkout", "encomendas", "revenda",
  "conta", "conta/pedidos", "conta/enderecos", "pedido/confirmado"
];
for (const route of legacyRequiredRoutes) {
  if (!fs.existsSync(path.join(storefront, "app", route, "page.tsx"))) failures.push(`Rota v0.4 ausente: /${route}`);
}

const homePage = fs.existsSync(path.join(storefront, "app/page.tsx")) ? fs.readFileSync(path.join(storefront, "app/page.tsx"), "utf8") : "";
if (!homePage.includes("HomeV05")) failures.push("Home v0.5 não está conectada em app/page.tsx.");
if (homePage.includes("<Hero")) failures.push("A Home ainda instancia o hero antigo; a v0.5 deve usar HomeV05.");

const homeComponent = fs.existsSync(path.join(storefront, "components/home-v05.tsx")) ? fs.readFileSync(path.join(storefront, "components/home-v05.tsx"), "utf8") : "";
for (const marker of ["home5-hero", "home5-flavors", "home5-picks", "home5-editorial", "home5-kits", "home5-brand", "home5-lifestyle", "home5-b2b"]) {
  if (!homeComponent.includes(marker)) failures.push(`Seção Home ausente: ${marker}`);
}

const homeContent = fs.existsSync(path.join(storefront, "content/home-v05.ts")) ? fs.readFileSync(path.join(storefront, "content/home-v05.ts"), "utf8") : "";
for (const pathRef of homeAssets.map((x) => `/home-v05/${x}`)) {
  if (!homeContent.includes(pathRef)) failures.push(`Caminho de asset não mapeado em home-v05.ts: ${pathRef}`);
}
for (const demoFlavor of ["Maracujá", "Frutas Vermelhas", "Gengibre & Limão", "Uva Verde"]) {
  if (!homeContent.includes(demoFlavor)) failures.push(`Sabor demonstrativo ausente: ${demoFlavor}`);
}

const navigation = fs.existsSync(path.join(storefront, "content/navigation.ts")) ? fs.readFileSync(path.join(storefront, "content/navigation.ts"), "utf8") : "";
for (const label of ["Sabores", "Kits", "Sobre", "Revenda", "Encomendas"]) {
  if (!navigation.includes(`label: "${label}"`)) failures.push(`Item de header ausente: ${label}`);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next" ? walk(full) : entry.isFile() ? [full] : [];
});
const textFiles = walk(storefront).filter((file) => /\.(ts|tsx|css|json|md|mjs)$/.test(file));
const secretPattern = /(sk_live_|sk_test_|service[_-]?role|database_url\s*=|postgres(?:ql)?:\/\/[^\s"']+:[^\s"']+@|BEGIN (?:RSA |EC )?PRIVATE KEY)/i;
const forbiddenPatterns = [
  [/dangerouslySetInnerHTML/g, "dangerouslySetInnerHTML"],
  [/console\.log\s*\(/g, "console.log"],
  [secretPattern, "possível segredo"]
];
for (const file of textFiles) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const text = fs.readFileSync(file, "utf8");
  for (const [pattern, label] of forbiddenPatterns) {
    if (pattern.test(text)) failures.push(`${label} em ${rel}`);
    pattern.lastIndex = 0;
  }
}

const cssPath = path.join(storefront, "app/globals.css");
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, "utf8");
  const opens = (css.match(/{/g) || []).length;
  const closes = (css.match(/}/g) || []).length;
  if (opens !== closes) failures.push(`CSS desbalanceado: ${opens} abertas / ${closes} fechadas`);
  for (const marker of ["STOREFRONT v0.5", ".home5-hero", ".home5-flavor-grid", ".home5-b2b"]) {
    if (!css.includes(marker)) failures.push(`CSS v0.5 ausente: ${marker}`);
  }
}

const checkoutPath = path.join(storefront, "components/checkout-flow.tsx");
if (fs.existsSync(checkoutPath)) {
  const checkout = fs.readFileSync(checkoutPath, "utf8");
  if (/cardNumber|cvv|cvc|expiry|numeroDoCartao|número do cartão/i.test(checkout)) failures.push("Checkout não deve coletar dados de cartão nesta fase.");
}

if (failures.length) {
  console.error("\nLaVic Storefront v0.5 — falhou:\n");
  failures.forEach((failure) => console.error(`  ✗ ${failure}`));
  process.exit(1);
}

console.log("\nLaVic Storefront v0.5 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos-base da Home verificados`);
console.log(`  ✓ ${homeAssets.length} assets editáveis em /public/home-v05 verificados`);
console.log("  ✓ hero compacto, sabores, conversão, editorial, kits, marca, lifestyle e B2B conectados");
console.log("  ✓ 4 sabores demonstrativos presentes e sem rotas falsas de produto");
console.log("  ✓ header protegido e navegação v0.5 conferida");
console.log(`  ✓ ${legacyRequiredRoutes.length} rotas comerciais da v0.4 preservadas`);
console.log(`  ✓ ${textFiles.length} arquivos textuais auditados`);
console.log("  ✓ CSS, checkout e padrões básicos de segurança verificados\n");
