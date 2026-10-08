import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (relative) => fs.readFileSync(path.join(root, relative), "utf8");
const exists = (relative) => fs.existsSync(path.join(root, relative));

const required = [
  "apps/storefront/components/home-v10.tsx",
  "apps/storefront/content/home-v10.ts",
  "apps/storefront/app/page.tsx",
  "apps/storefront/app/layout.tsx",
  "apps/storefront/app/globals.css",
  "apps/storefront/public/home-v09/lavic-limao-cutout.png",
  "apps/storefront/public/hero/sparkling/bottle.webp",
  "apps/storefront/public/home-v06/kits/discovery.webp",
  "apps/storefront/public/home-v06/flavors/lime.webp",
  "apps/storefront/public/home-v06/flavors/strawberry.webp",
  "apps/storefront/public/home-v06/flavors/passion-fruit.webp",
  "apps/storefront/public/home-v06/flavors/green-grape.webp",
];

const failures = [];
const pass = (label) => console.log(`[OK] ${label}`);
const fail = (label) => failures.push(label);

for (const file of required) {
  exists(file) ? pass(`arquivo presente: ${file}`) : fail(`arquivo ausente: ${file}`);
}

if (!failures.length) {
  const component = read("apps/storefront/components/home-v10.tsx");
  const content = read("apps/storefront/content/home-v10.ts");
  const page = read("apps/storefront/app/page.tsx");
  const layout = read("apps/storefront/app/layout.tsx");
  const css = read("apps/storefront/app/globals.css");

  const checks = [
    [page.includes('HomeV10'), "home aponta para HomeV10"],
    [!page.includes('HomeV09'), "home não aponta para HomeV09"],
    [component.includes('home10-hero'), "hero Figma presente"],
    [component.includes('home10-bottled'), "sabores engarrafados presente"],
    [component.includes('home10-rhythm'), "painel verde presente"],
    [component.includes('home10-intro'), "introdução presente"],
    [component.includes('home10-showcase'), "showcase espumante presente"],
    [component.includes('home10-trust'), "faixa de confiança presente"],
    [component.includes('home10-b2b'), "banner B2B presente"],
    [component.includes('home10-footer'), "footer Figma presente"],
    [css.includes('height: 5230px'), "altura desktop segue frame Figma 5230px"],
    [css.includes('top: 1852px'), "painel verde ancorado no Y do Figma"],
    [css.includes('top: 2669px'), "intro ancorada no Y do Figma"],
    [css.includes('top: 2978px'), "showcase ancorado no Y do Figma"],
    [css.includes('top: 3856px'), "trust strip ancorada no Y do Figma"],
    [css.includes('top: 4104px'), "B2B ancorado no Y do Figma"],
    [css.includes('top: 4621px'), "subscribe/footer ancorado no Y do Figma"],
    [css.includes('#7e9583') && css.includes('#809786'), "verdes estruturais do Figma preservados"],
    [css.includes('#d97400'), "accent laranja do Figma preservado"],
    [layout.includes('Alexandria') && layout.includes('Poppins') && layout.includes('Inter'), "famílias tipográficas equivalentes carregadas"],
    [content.includes('Viva Com Gás.'), "copy principal LaVic preservada"],
    [content.includes('A kombucha que acompanha o seu ritmo.'), "copy painel verde preservada"],
    [content.includes('LaVic no seu negócio.'), "copy B2B preservada"],
    [!content.includes('RIDGED'), "nenhuma copy RIDGED permaneceu"],
    [!content.includes('best energy drink'), "descrições antigas da referência removidas"],
    [!component.includes('dangerouslySetInnerHTML'), "sem dangerouslySetInnerHTML"],
    [!component.includes('eval(') && !component.includes('new Function'), "sem execução dinâmica insegura"],
    [!component.includes('figma.com/api/mcp/asset'), "sem URL temporária do Figma em produção"],
  ];

  for (const [condition, label] of checks) condition ? pass(label) : fail(label);
}

if (failures.length) {
  console.error("\nVALIDAÇÃO V1.0 FALHOU:");
  for (const failure of failures) console.error(` - ${failure}`);
  process.exit(1);
}

console.log("\nVALIDAÇÃO ESTRUTURAL V1.0 OK");
