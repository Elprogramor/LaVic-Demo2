import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const homePath = path.join(root, "apps/storefront/components/home-v06.tsx");
const motionPath = path.join(root, "apps/storefront/components/motion/lavic-motion.ts");
const storefrontPackagePath = path.join(root, "apps/storefront/package.json");

function fail(message) {
  console.error(`[FAIL] ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`[OK] ${message}`);
}

for (const file of [homePath, motionPath]) {
  if (!fs.existsSync(file)) fail(`Arquivo ausente: ${path.relative(root, file)}`);
}

if (process.exitCode) process.exit(process.exitCode);

const home = fs.readFileSync(homePath, "utf8");
const motion = fs.readFileSync(motionPath, "utf8");

const checks = [
  [home.startsWith('"use client";'), "Home motion isolada como Client Component"],
  [home.includes('MotionConfig reducedMotion="user"'), "prefers-reduced-motion respeitado via MotionConfig"],
  [home.includes("motion.create(Link)"), "Links preservam navegação Next.js com Motion"],
  [home.includes("variants={heroContainer}"), "Hero usa sequência coordenada"],
  [home.includes('className="home5-flavor-grid"') && home.includes("variants={cardContainer}"), "Sabores usam stagger coordenado"],
  [home.includes('className="home5-picks__grid"'), "Cards de destaques mantidos"],
  [home.includes("home5-kits__grid"), "Cards de kits mantidos"],
  [home.includes('className="home5-values"'), "Valores da marca animados"],
  [home.includes("home6-liquid-button"), "CTA líquido atual preservado"],
  [motion.includes("staggerChildren: 0.075"), "Stagger curto e consistente"],
  [motion.includes("duration: 0.58"), "Timing de texto definido"],
  [motion.includes("duration: 0.62"), "Timing de cards definido"],
  [!home.includes("repeat: Infinity") && !motion.includes("repeat: Infinity"), "Sem animação contínua"],
  [!home.includes("rotate:") && !motion.includes("rotate:"), "Sem rotação decorativa"],
  [!home.includes("bounce") && !motion.includes("bounce"), "Sem bounce"],
];

for (const [condition, message] of checks) {
  condition ? ok(message) : fail(message);
}

if (fs.existsSync(storefrontPackagePath)) {
  const pkg = JSON.parse(fs.readFileSync(storefrontPackagePath, "utf8"));
  if (pkg.dependencies?.["framer-motion"]) {
    ok(`framer-motion disponível (${pkg.dependencies["framer-motion"]})`);
  } else {
    fail("framer-motion não encontrado em apps/storefront/package.json");
  }
} else {
  console.warn("[WARN] apps/storefront/package.json não está neste patch isolado; valide a dependência no projeto completo.");
}

if (!process.exitCode) {
  console.log("\nSTOREFRONT v0.7 Motion System: validação estrutural concluída com sucesso.");
}
