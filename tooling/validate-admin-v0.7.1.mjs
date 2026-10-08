import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const required = [
  "apps/admin/app/sales/preorders/page.tsx",
  "apps/admin/app/sales/payments/page.tsx",
  "apps/admin/app/catalog/kits/page.tsx",
  "apps/admin/app/catalog/categories/page.tsx",
  "apps/admin/app/orders/page.tsx",
  "apps/admin/app/products/page.tsx",
  "apps/admin/components/sales-subnav.tsx",
  "apps/admin/components/catalog-subnav.tsx",
  "apps/admin/components/preorders-view.tsx",
  "apps/admin/components/sales-payments-view.tsx",
  "apps/admin/components/kits-view.tsx",
  "apps/admin/components/categories-view.tsx",
  "apps/admin/components/core-commerce-status.tsx",
  "apps/admin/components/admin-shell.tsx",
  "apps/admin/data/mock-admin.ts",
  "apps/admin/lib/types.ts",
  "apps/admin/lib/permissions.ts",
  "apps/admin/app/styles.css",
  "docs/ADMIN_CORE_COMPLETENESS_V0_7_1.md",
];
const regressionFiles = [
  "apps/admin/app/page.tsx", "apps/admin/app/orders/[id]/page.tsx", "apps/admin/app/inventory/page.tsx", "apps/admin/app/customers/page.tsx", "apps/admin/app/b2b/page.tsx", "apps/admin/app/marketing/page.tsx", "apps/admin/app/store/page.tsx", "apps/admin/app/finance/page.tsx", "apps/admin/app/reports/page.tsx", "apps/admin/app/team/page.tsx", "apps/admin/app/settings/security/page.tsx",
];
const errors=[]; const warnings=[];
for (const file of [...required, ...regressionFiles]) if (!fs.existsSync(path.join(root,file))) errors.push(`Arquivo obrigatório ausente: ${file}`);
const textExtensions=new Set([".ts",".tsx",".css",".md",".json",".mjs"]); const files=[];
function walk(relative){ const absolute=path.join(root,relative); if(!fs.existsSync(absolute)) return; const stat=fs.statSync(absolute); if(stat.isFile()){ if(textExtensions.has(path.extname(absolute))) files.push(absolute); return; } for(const entry of fs.readdirSync(absolute,{withFileTypes:true})){ if(["node_modules",".next","dist"].includes(entry.name)) continue; const next=path.join(absolute,entry.name); if(entry.isDirectory()) walk(path.relative(root,next)); else if(textExtensions.has(path.extname(entry.name))) files.push(next); }}
walk("apps/admin"); walk("docs/ADMIN_CORE_COMPLETENESS_V0_7_1.md");
const forbidden=[
  ["dangerouslySetInnerHTML",/dangerouslySetInnerHTML/g], ["console.log",/console\.log\s*\(/g], ["segredo em NEXT_PUBLIC",/NEXT_PUBLIC_[A-Z0-9_]*(SECRET|PRIVATE|TOKEN|PASSWORD|SERVICE_ROLE)/g], ["credencial hardcoded",/(sk_live_|service_role\s*[:=]|DATABASE_URL\s*=\s*["'][^"']+)/gi], ["nome pessoal proibido em mock",/Guilherme|Alonso/gi]
];
for(const file of files){ const source=fs.readFileSync(file,"utf8"); const relative=path.relative(root,file); for(const [label,regex] of forbidden){ regex.lastIndex=0; if(regex.test(source)) errors.push(`${relative}: encontrado ${label}`); }}
const shell=fs.readFileSync(path.join(root,"apps/admin/components/admin-shell.tsx"),"utf8");
for(const route of ["/sales/preorders","/sales/payments","/catalog/kits","/catalog/categories"]) if(!shell.includes(route)) errors.push(`Navegação não referencia ${route}`);
for(const marker of ["preorderResults","paymentResults","kitResults","categoryResults"]) if(!shell.includes(marker)) errors.push(`Busca global v0.7.1 incompleta: ${marker}`);
for(const disabled of ['{ label: "Encomendas", icon:', '{ label: "Pagamentos", icon:', '{ label: "Kits", icon:', '{ label: "Categorias", icon:']) if(shell.includes(disabled)) errors.push(`Item ainda bloqueado na navegação: ${disabled}`);
const mock=fs.readFileSync(path.join(root,"apps/admin/data/mock-admin.ts"),"utf8");
for(const name of ["preorders","salesPayments","catalogKits","catalogCategories"]) if(!mock.includes(`export const ${name}`)) errors.push(`Mock v0.7.1 ausente: ${name}`);
const types=fs.readFileSync(path.join(root,"apps/admin/lib/types.ts"),"utf8");
for(const marker of ["AdminPreorder","SalesPayment","CatalogKit","CatalogCategory",'"preorders.read"','"payments.read"','"kits.read"','"categories.read"']) if(!types.includes(marker)) errors.push(`Contrato v0.7.1 incompleto: ${marker}`);
const permissions=fs.readFileSync(path.join(root,"apps/admin/lib/permissions.ts"),"utf8");
for(const marker of ["preorders.read","preorders.write","payments.read","payments.write","kits.read","kits.write","categories.read","categories.write"]) if(!permissions.includes(`"${marker}"`)) errors.push(`Permissão demo ausente: ${marker}`);
const css=fs.readFileSync(path.join(root,"apps/admin/app/styles.css"),"utf8");
for(const token of [".domain-subnav",".preorder-schedule-strip",".payment-method-strip",".kit-layout",".category-principles",".core-status"]) if(!css.includes(token)) errors.push(`CSS v0.7.1 incompleto: ${token}`);
const opens=(css.match(/{/g)??[]).length, closes=(css.match(/}/g)??[]).length; if(opens!==closes) errors.push(`styles.css com chaves desbalanceadas (${opens} abre / ${closes} fecha)`);
for(const file of files.filter((item)=>[".ts",".tsx"].includes(path.extname(item)))){ const source=fs.readFileSync(file,"utf8"); for(const match of source.matchAll(/from\s+["'](\.{1,2}\/[^"']+)["']/g)){ const spec=match[1]; const base=path.resolve(path.dirname(file),spec); const candidates=[base,`${base}.ts`,`${base}.tsx`,path.join(base,"index.ts"),path.join(base,"index.tsx")]; if(!candidates.some((candidate)=>fs.existsSync(candidate))) errors.push(`${path.relative(root,file)}: import relativo sem destino: ${spec}`); }}
const pkg=JSON.parse(fs.readFileSync(path.join(root,"package.json"),"utf8")); if(pkg.scripts?.["validate:admin:v0.7.1"]!=="node tooling/validate-admin-v0.7.1.mjs") errors.push("Script validate:admin:v0.7.1 ausente ou alterado."); if(pkg.scripts?.["clean:admin:cache"]!=="node tooling/clean-admin-cache.mjs") errors.push("Hotfix de limpeza .next não foi preservado.");
if(errors.length){ console.error("\nLaVic Admin v0.7.1 — validação falhou:\n"); for(const error of errors) console.error(`  ✗ ${error}`); if(warnings.length) for(const warning of warnings) console.error(`  ! ${warning}`); process.exit(1); }
console.log("\nLaVic Admin v0.7.1 — validação estática aprovada.");
console.log(`  ✓ ${required.length} arquivos Core Completeness verificados`);
console.log(`  ✓ ${regressionFiles.length} pontos de regressão preservados`);
console.log(`  ✓ ${files.length} arquivos textuais auditados`);
console.log("  ✓ Encomendas, Pagamentos, Kits e Categorias conectados");
console.log("  ✓ busca global, RBAC, CSS e navegação v0.7.1 verificados");
console.log("  ✓ hotfix de limpeza .next preservado");
console.log("  ✓ imports relativos e padrões de segurança verificados");
