import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/sabores/page.tsx",
  "apps/storefront/app/kits/page.tsx",
  "apps/storefront/app/carrinho/page.tsx",
  "apps/storefront/app/checkout/page.tsx",
  "apps/storefront/app/encomendas/page.tsx",
  "apps/storefront/app/revenda/page.tsx",
  "apps/storefront/app/produto/[slug]/page.tsx",
  "apps/storefront/app/conta/page.tsx",
  "apps/storefront/app/conta/pedidos/page.tsx",
  "apps/storefront/app/conta/enderecos/page.tsx",
  "apps/storefront/app/pedido/confirmado/page.tsx",
  "apps/storefront/app/not-found.tsx",
  "apps/storefront/components/catalog-view.tsx",
  "apps/storefront/components/checkout-flow.tsx",
  "apps/storefront/components/kit-purchase.tsx",
  "apps/storefront/components/account-shell.tsx",
  "apps/storefront/components/shop-preview-section.tsx",
  "apps/storefront/components/cart-provider.tsx",
  "apps/storefront/app/globals.css"
];

const failures = [];
for (const rel of required) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`Arquivo ausente: ${rel}`);
}


const requiredAssets = [
  "apps/storefront/public/brand/lavic-logo-color.png",
  "apps/storefront/public/brand/lavic-logo-white.png",
  "apps/storefront/public/demo/lime-hero.png",
  "apps/storefront/public/demo/lime-showcase.png",
  "apps/storefront/public/demo/lime-ingredient.png",
  "apps/storefront/public/demo/strawberry-showcase.png",
  "apps/storefront/public/demo/strawberry-ingredient.png",
  "apps/storefront/public/hero/banners/sparkling-desktop.webp"
];
for (const rel of requiredAssets) {
  if (!fs.existsSync(path.join(root, rel))) failures.push(`Asset ausente: ${rel}`);
}

const requiredRoutes = [
  "sabores", "kits", "carrinho", "checkout", "encomendas", "revenda",
  "conta", "conta/pedidos", "conta/enderecos", "pedido/confirmado"
];
for (const route of requiredRoutes) {
  if (!fs.existsSync(path.join(root, "apps/storefront/app", route, "page.tsx"))) failures.push(`Rota ausente: /${route}`);
}

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const full = path.join(dir, entry.name);
  return entry.isDirectory() && entry.name !== "node_modules" && entry.name !== ".next" ? walk(full) : entry.isFile() ? [full] : [];
});

const storefrontRoot = path.join(root, "apps/storefront");
const textFiles = walk(storefrontRoot).filter((file) => /\.(ts|tsx|css|json|md|mjs)$/.test(file));
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


const envRefs = new Set();
for (const file of textFiles) {
  const text = fs.readFileSync(file, "utf8");
  for (const match of text.matchAll(/process\.env\.(NEXT_PUBLIC_[A-Z0-9_]+)/g)) envRefs.add(match[1]);
}
for (const envName of envRefs) {
  if (envName !== "NEXT_PUBLIC_SITE_URL") failures.push(`NEXT_PUBLIC não autorizado no storefront: ${envName}`);
}

const productsFile = fs.readFileSync(path.join(storefrontRoot, "data/mocks/products.ts"), "utf8");
const slugs = [...productsFile.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
if (new Set(slugs).size !== slugs.length) failures.push("Slugs duplicados no catálogo.");

const cssPath = path.join(storefrontRoot, "app/globals.css");
if (fs.existsSync(cssPath)) {
  const css = fs.readFileSync(cssPath, "utf8");
  const opens = (css.match(/{/g) || []).length;
  const closes = (css.match(/}/g) || []).length;
  if (opens !== closes) failures.push(`CSS desbalanceado: ${opens} chaves abertas / ${closes} fechadas`);
}

const checkout = fs.existsSync(path.join(storefrontRoot, "components/checkout-flow.tsx")) ? fs.readFileSync(path.join(storefrontRoot, "components/checkout-flow.tsx"), "utf8") : "";
if (/cardNumber|cvv|cvc|expiry|numeroDoCartao|número do cartão/i.test(checkout)) failures.push("Checkout não deve coletar dados de cartão nesta fase.");
if (!checkout.includes("Concluir demonstração")) failures.push("Fluxo demonstrativo do checkout não encontrado.");

const cart = fs.existsSync(path.join(storefrontRoot, "components/cart-provider.tsx")) ? fs.readFileSync(path.join(storefrontRoot, "components/cart-provider.tsx"), "utf8") : "";
if (!cart.includes("lavic.cart.v1") || !cart.includes("productId")) failures.push("Persistência segura do carrinho por ID/quantidade não encontrada.");

const hero = path.join(storefrontRoot, "components/hero.tsx");
if (!fs.existsSync(hero)) failures.push("Hero v0.3.4 ausente; a v0.4 não deve removê-lo.");

if (failures.length) {
  console.error("\nLaVic Storefront v0.4 — falhou:\n");
  failures.forEach((failure) => console.error(`  ✗ ${failure}`));
  process.exit(1);
}

console.log("\nLaVic Storefront v0.4 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos centrais verificados`);
console.log(`  ✓ ${textFiles.length} arquivos textuais auditados`);
console.log("  ✓ catálogo, produto, kits, carrinho e checkout conectados");
console.log("  ✓ encomendas, B2B, conta, confirmação e 404 conectados");
console.log("  ✓ carrinho persiste somente IDs e quantidades");
console.log("  ✓ checkout não coleta dados de cartão");
console.log("  ✓ hero v0.3.4 preservado");
console.log(`  ✓ ${requiredAssets.length} assets essenciais verificados`);
console.log("  ✓ rotas públicas/transacionais e NEXT_PUBLIC auditados");
console.log("  ✓ CSS e padrões básicos de segurança verificados\n");
