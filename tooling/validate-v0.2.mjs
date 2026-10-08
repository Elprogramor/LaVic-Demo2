import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const required = [
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/components/site-loader.tsx",
  "apps/storefront/components/hero.tsx",
  "apps/storefront/components/formats-section.tsx",
  "apps/storefront/components/lifestyle-options-section.tsx",
  "apps/storefront/components/flavor-showcase.tsx",
  "apps/storefront/components/brand-story-section.tsx",
  "apps/storefront/components/business-section.tsx",
  "apps/storefront/components/final-cta.tsx",
  "apps/storefront/public/media/README.md",
  "apps/storefront/public/fonts/README.md",
  "apps/admin/app/page.tsx",
  "apps/api/src/main.ts",
  "packages/domain/src/index.ts",
  "packages/tokens/src/index.ts",
  "packages/contracts/src/index.ts",
  "packages/validation/src/index.ts",
  "docs/ARCHITECTURE.md",
  "docs/SECURITY.md",
  "docs/DESIGN_SYSTEM.md",
  "docs/MOTION.md"
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

const logo = path.join(root, "apps/storefront/public/brand/lavic-logo-color.png");
if (!fs.existsSync(logo)) {
  console.error("MISSING: official LaVic logo asset");
  failed = true;
}

const packageJson = JSON.parse(fs.readFileSync(path.join(root, "apps/storefront/package.json"), "utf8"));
if (packageJson.dependencies?.["@flaticon/flaticon-uicons"] !== "3.3.1") {
  console.error("INVALID: @flaticon/flaticon-uicons must stay pinned to 3.3.1");
  failed = true;
}

if (failed) process.exit(1);
console.log("OK: LaVic v0.2 — estrutura, assets, nomenclatura e política de ícones validados.");
