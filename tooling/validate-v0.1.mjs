import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/components/site-header.tsx",
  "apps/storefront/components/cart-provider.tsx",
  "apps/storefront/data/mocks/products.ts",
  "apps/admin/app/page.tsx",
  "apps/api/src/main.ts",
  "packages/domain/src/index.ts",
  "packages/tokens/src/index.ts",
  "packages/contracts/src/index.ts",
  "packages/validation/src/index.ts",
  "docs/ARCHITECTURE.md",
  "docs/SECURITY.md",
  "docs/DESIGN_SYSTEM.md"
];

let failed = false;
for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) {
    console.error(`MISSING: ${file}`);
    failed = true;
  }
}

const forbiddenIconImports = ["lucide-react", "@heroicons", "@mui/icons", "react-icons"];
const forbiddenPersonalNames = ["guilherme", "alonso", "ateliux teste"];
const textExtensions = new Set([".ts", ".tsx", ".js", ".mjs", ".json", ".md", ".css"]);

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", ".next", "dist"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (textExtensions.has(path.extname(entry.name))) {
      const rel = path.relative(root, full).replaceAll("\\", "/");
      const content = fs.readFileSync(full, "utf8");
      if (!rel.startsWith("tooling/")) {
        for (const bad of forbiddenIconImports) {
          if (content.includes(bad)) {
            console.error(`FORBIDDEN ICON LIBRARY (${bad}): ${rel}`);
            failed = true;
          }
        }
        const lower = content.toLowerCase();
        for (const name of forbiddenPersonalNames) {
          if (lower.includes(name)) {
            console.error(`FORBIDDEN PERSONAL NAME (${name}): ${rel}`);
            failed = true;
          }
        }
      }
    }
  }
}
walk(root);

const logo = path.join(root, "apps/storefront/public/brand/lavic-logo-forest.png");
if (!fs.existsSync(logo)) {
  console.error("MISSING: normalized LaVic logo asset");
  failed = true;
}

if (failed) process.exit(1);
console.log("OK: estrutura, assets, nomenclatura e política de ícones validados.");
