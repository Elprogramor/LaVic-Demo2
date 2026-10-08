import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const storefront = path.join(root, "apps/storefront");
const failures = [];

const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/components/home-v06.tsx",
  "apps/storefront/components/site-header.tsx",
  "apps/storefront/components/site-footer.tsx",
  "apps/storefront/content/home-v06.ts",
  "apps/storefront/content/navigation.ts",
  "apps/storefront/public/home-v06/README.md",
  "docs/STOREFRONT_V0_6.md"
];

for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`Arquivo ausente: ${rel}`);
}

const homeAssets = [
  "hero/hero-lime-minimal.webp",
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
  const full = path.join(storefront, "public/home-v06", rel);
  if (!fs.existsSync(full)) failures.push(`Asset v0.6 ausente: ${rel}`);
  else if (fs.statSync(full).size < 1024) failures.push(`Asset v0.6 pequeno/corrompido: ${rel}`);
}

const expectedRoutes = [
  "sabores", "kits", "carrinho", "checkout", "encomendas", "revenda",
  "conta", "conta/pedidos", "conta/enderecos", "pedido/confirmado"
];
for (const route of expectedRoutes) {
  if (!fs.existsSync(path.join(storefront, "app", route, "page.tsx"))) failures.push(`Rota comercial ausente: /${route}`);
}

const read = (rel) => fs.existsSync(path.join(root, rel)) ? fs.readFileSync(path.join(root, rel), "utf8") : "";
const page = read("apps/storefront/app/page.tsx");
if (!page.includes("HomeV06")) failures.push("HomeV06 não está conectada em app/page.tsx.");
if (page.includes("HomeV05")) failures.push("app/page.tsx ainda referencia HomeV05.");

const home = read("apps/storefront/components/home-v06.tsx");
for (const marker of ["home5-hero", "home5-flavors", "home5-picks", "home5-editorial", "home5-kits", "home5-brand", "home5-lifestyle", "home5-b2b"]) {
  if (!home.includes(marker)) failures.push(`Seção ausente na Home v0.6: ${marker}`);
}
if (home.includes("KOMBUCHA LAVIC")) failures.push("Hero v0.6 ainda contém o kicker 'KOMBUCHA LAVIC'.");
if (!home.includes("<span>Comprar agora</span>")) failures.push("CTA 'Comprar agora' ausente no hero.");
if (!home.includes('href="/sabores"')) failures.push("CTA do hero não mantém destino /sabores.");
if ((home.match(/home6-liquid-button/g) || []).length < 4) failures.push("Sistema de botões líquidos não foi aplicado aos CTAs estruturais.");

const content = read("apps/storefront/content/home-v06.ts");
for (const ref of homeAssets.map((item) => `/home-v06/${item}`)) {
  if (!content.includes(ref)) failures.push(`Caminho de imagem não mapeado: ${ref}`);
}
for (const demoFlavor of ["Maracujá", "Frutas Vermelhas", "Gengibre & Limão", "Uva Verde"]) {
  if (!content.includes(demoFlavor)) failures.push(`Sabor demonstrativo ausente: ${demoFlavor}`);
}

const css = read("apps/storefront/app/globals.css");
for (const marker of [
  "STOREFRONT v0.6 — HOME REFINEMENT",
  ".home6-liquid-button",
  ".site-header:not(.site-header--scrolled)",
  "font-family: var(--font-brand)",
  "object-fit: contain"
]) {
  if (!css.includes(marker)) failures.push(`Regra CSS v0.6 ausente: ${marker}`);
}
if (!/\.site-header:not\(\.site-header--scrolled\)[\s\S]*?background:\s*transparent;/.test(css)) failures.push("Header no topo não está explicitamente transparente.");
if (!/\.site-header--scrolled[\s\S]*?backdrop-filter:\s*blur\(/.test(css)) failures.push("Header glass ao scroll não foi encontrado.");
if (!/\.desktop-nav a:hover[\s\S]*?var\(--home5-orange\)/.test(css)) failures.push("Hover laranja do header não foi encontrado.");

const opens = (css.match(/{/g) || []).length;
const closes = (css.match(/}/g) || []).length;
if (opens !== closes) failures.push(`CSS desbalanceado: ${opens} abertas / ${closes} fechadas`);

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next" ? walk(full) : entry.isFile() ? [full] : [];
});
const textFiles = fs.existsSync(storefront) ? walk(storefront).filter((file) => /\.(ts|tsx|css|json|md|mjs)$/.test(file)) : [];
const forbidden = [
  [/dangerouslySetInnerHTML/g, "dangerouslySetInnerHTML"],
  [/console\.log\s*\(/g, "console.log"],
  [/(sk_live_|sk_test_|service[_-]?role|database_url\s*=|postgres(?:ql)?:\/\/[^\s"']+:[^\s"']+@|BEGIN (?:RSA |EC )?PRIVATE KEY)/i, "possível segredo"]
];
for (const file of textFiles) {
  const rel = path.relative(root, file).replaceAll("\\", "/");
  const text = fs.readFileSync(file, "utf8");
  for (const [pattern, label] of forbidden) {
    if (pattern.test(text)) failures.push(`${label} em ${rel}`);
    pattern.lastIndex = 0;
  }
}

const checkout = read("apps/storefront/components/checkout-flow.tsx");
if (checkout && /cardNumber|cvv|cvc|expiry|numeroDoCartao|número do cartão/i.test(checkout)) failures.push("Checkout não deve coletar dados sensíveis de cartão nesta fase.");

if (failures.length) {
  console.error("\nLaVic Storefront v0.6 — falhou:\n");
  failures.forEach((failure) => console.error(`  ✗ ${failure}`));
  process.exit(1);
}

console.log("\nLaVic Storefront v0.6 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos-base verificados`);
console.log(`  ✓ ${homeAssets.length} imagens editáveis em /public/home-v06`);
console.log("  ✓ header transparente + glass ao scroll conferidos");
console.log("  ✓ hover laranja do header conferido");
console.log("  ✓ hero sem kicker, CTA 'Comprar agora' e font-brand conferidos");
console.log("  ✓ CTAs outline com preenchimento líquido conferidos");
console.log("  ✓ sabores demo, rotas e caminhos de imagem conferidos");
console.log(`  ✓ ${textFiles.length} arquivos textuais auditados`);
console.log("  ✓ CSS e padrões básicos de segurança verificados\n");
